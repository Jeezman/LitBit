import { EventEmitter } from 'events';
import { existsSync, promises as fs } from 'fs';
import {node} from "./node";
import e, {response} from "express";
import nodeManager from "./node-manager";
import {SendRequest} from "@radar/lnrpc/types/lnrpc";

const cron = require('node-cron');
const DB_FILE = '../db.json';

export interface Employee {
    id: number;
    name: string;
    payInSatoshi: number;
    paymentScheduleRate: string;
    publicKey: string,
}

export const SocketEvents = {
    employeeUpdated: 'employee-updated',
    invoicePaid: 'invoice-paid',
};

export interface LndNode {
    token: string;
    host: string;
    cert: string;
    macaroon: string;
    pubkey: string;
    channelBalance: string;
}

export interface Transaction {
    id: number;
    employeeId: number;
    timeCreated: Date;
    timePaid: Date;
    isPaid: boolean;
    description: string;
    paymentRequest: string;
    paymentHash: string;
    amount: number;
}

export interface DbData {
    employees: Employee[];
    nodes: LndNode[];
    transactions: Transaction[];
}

/**
 * The list of events emitted by the EmployeeDb
 */
export const EmployeeEvents = {
    updated: 'employee-updated',
};

export const TransactionEvents = {
    transactionUpdated: 'transaction-updated',
};

/**
 * A very simple file-based DB to store the Employees
 */
class EmployeeDb extends EventEmitter {
    // in-memory database
    private _data: DbData = {
        employees: [],
        nodes: [],
        transactions: [],
    };

    //
    // Transaction
    //
    // Gets a particular employee given an ID
    getTransationById(id: number): Transaction | undefined {
        return this._data.transactions.find(p => p.id === id);
    }

    getTransationByHash(hash: string): Transaction | undefined {
        return this._data.transactions.find(p => p.paymentHash === hash);
    }

    getTransationByEmployeeId(employeeId: number) {
        return this._data.transactions.find(a => a.employeeId === employeeId);
    }

    getTransationByIsPaidAndEmployeeId(employeeId: number, isPaid: boolean) {
        return this._data.transactions.find(a => a.employeeId === employeeId && isPaid);
    }


    getTransations() {
        return this._data.transactions
            .sort(function(a, b) { return (a.id > b.id ? 1 : (a.id === b.id ? 0 : -1)) })
    }

    async updateTransaction(transaction: Transaction) {
        const employee = this._data.transactions.find(p => p.id === transaction.employeeId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        await this.persist();
        this.emit(TransactionEvents.transactionUpdated, transaction);
    }

    createTransaction(employeeId: number, description: string) {
        // calculate the highest numeric id
        const maxId = Math.max(0, ...this._data.transactions.map(p => p.id));

        const transaction: Transaction = {
            id: maxId + 1,
            employeeId: employeeId,
            timeCreated: new Date(),
            timePaid: new Date(0),
            isPaid: false,
            description: description,
            paymentRequest: "",
            paymentHash: "",
            amount: 0
        };
        this._data.transactions.push(transaction);

        this.persist();
        this.emit(EmployeeEvents.updated, transaction);
        return transaction;
    }

    //
    // Employees
    //

    // Gets a particular employee given an ID
    getEmployee(id: number): Employee | undefined {
        return this._data.employees.find(p => p.id === id);
    }

    // Gets a particular employee given an ID
    getEmployeeByPaymentScheduleRate(paymentScheduleRate: string): Employee[] {
        return this._data.employees.filter(p => p.paymentScheduleRate === paymentScheduleRate);
    }

    getEmployees() {
        return this._data.employees
            .sort(function(a, b) { return (a.name > b.name ? 1 : (a.name === b.name ? 0 : -1)) })
    }

    async createEmployee(name: string, payInSatoshi: number, paymentScheduleRate: string, publicKey: string) {
        // calculate the highest numeric id
        const maxId = Math.max(0, ...this._data.employees.map(p => p.id));

        const employee: Employee = {id: maxId + 1, name, payInSatoshi, paymentScheduleRate, publicKey};
        this._data.employees.push(employee);

        await this.persist();
        this.emit(EmployeeEvents.updated, employee);
        return employee;
    }

    async updateEmployee(employeeId: number) {
        const employee = this._data.employees.find(p => p.id === employeeId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        // post.votes++;
        await this.persist();
        this.emit(EmployeeEvents.updated, employee);
    }

    async updateEmployeePublickKey(employeeId: number, publicKey: string) {
        const employee = this._data.employees.find(p => p.id === employeeId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        employee.publicKey = publicKey;
        await this.persist();
        this.emit(EmployeeEvents.updated, employee);
    }

    async verifyEmployee(employeeId: number) {
        const employee = this._data.employees.find(p => p.id === employeeId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        // employee.verified = true;
        await this.persist();
        this.emit(EmployeeEvents.updated, employee);
    }

    //
    // Nodes
    //

    getAllNodes() {
        return this._data.nodes;
    }

    getNodeByPubkey(pubkey: string) {
        return this.getAllNodes().find(node => node.pubkey === pubkey);
    }

    getNodeByToken(token: string) {
        return this.getAllNodes().find(node => node.token === token);
    }

    async addNode(node: LndNode) {
        this._data.nodes = [
            // add new node
            node,
            // exclude existing nodes with the same server
            ...this._data.nodes.filter(n => n.host !== node.host),
        ];
        await this.persist();
    }

    //
    // HACK! Persist data to a JSON file to keep it when the server restarts.
    // Do not do this in a production app. This is just for convenience when
    // developing this sample app locally.
    //

    async persist() {
        await fs.writeFile(DB_FILE, JSON.stringify(this._data, null, 2));
    }

    async restore() {
        if (!existsSync(DB_FILE)) return;

        const contents = await fs.readFile(DB_FILE);
        if (contents) {
            this._data = JSON.parse(contents.toString());
            if (!this._data.nodes) this._data.nodes = [];
            console.log(`Loaded ${this._data.employees.length} employees`);
        }
    }

    async createInvoice(transaction: Transaction, employee: Employee, amount: number ){
        try{
            // find the node that made this Employee
            const node = this.getNodeByPubkey(employee.publicKey);
            if (!node) throw new Error('Node not found for this Employee');

            // create an invoice on the Employee's node
            const rpc = nodeManager.getRpc(node.token);
            const inv = await rpc.addInvoice({ value: amount.toString(), memo: 'LitBit ' + employee.paymentScheduleRate + ' Pay', expiry: '60' });
            transaction.paymentHash = (inv.rHash as Buffer).toString('base64');
            transaction.paymentRequest = inv.paymentRequest;
            transaction.amount = employee.payInSatoshi
            this.updateTransaction(transaction)

            return transaction;

        } catch(err) {
            console.log("Error creating Invoice for transaction ID: ", employee.id)
            console.log(err)
        }
    }

    payInvoice(transaction: Transaction, employee: Employee){
        try{
            let request = <SendRequest> {
                paymentRequest: transaction.paymentRequest
            }
            node.sendPaymentSync(request);
            transaction.timePaid = new Date()
            this.updateTransaction(transaction)
        } catch(err) {
            console.log(err)
            console.log("Error paying Invoice");
        }
    }

    async queryInvoice(hash: string){
        try{
            // find the node that made this Employee
            let transationByHash = this.getTransationByHash(hash);
            if (!transationByHash) throw new Error('Transaction with hash is not found');
            transationByHash.isPaid = true;
            this.updateTransaction(transationByHash)
        } catch(err) {
            console.log(err)
            console.log("Error Updating Invoice");
        }
    }

    doTransaction(schedule: string){
        let employees = employeeDb.getEmployeeByPaymentScheduleRate(schedule);
        if(employees.length > 0){
            for (let i = 0; i < employees.length; i++) {
                let employee = employees[i];
                try{
                    const employeeNode = this.getNodeByPubkey(employee.publicKey);
                    if (!employeeNode) throw new Error('Node not found for this Employee');
                    let channelBalance = node.channelBalance();
                    channelBalance.then((response) => {
                        if(parseInt(response.balance) >= employee.payInSatoshi ){
                            let createdTransaction = employeeDb.createTransaction(employee.id, "Transaction for employId " + employee.paymentScheduleRate + " at " + new Date().toLocaleString())
                            console.log("creating employee's invoice every minute");
                            let transactionPromise = employeeDb.createInvoice(createdTransaction, employee, employee.payInSatoshi);
                            transactionPromise.then((response) => {
                                if (createdTransaction.paymentRequest && createdTransaction.paymentHash) {
                                    console.log("===>>>>", createdTransaction)
                                    employeeDb.payInvoice(createdTransaction, employee)
                                    console.log(schedule + " transaction for employee ID: "+ employee.id + " processed successfully")
                                }
                                console.log("=====================================================");
                            }).catch ((err) => {
                                console.log("Error creating "+schedule+" transaction for employee ID: ", employee.id)
                                console.log(err)
                            })
                        }else {
                            console.log("Channel Balance is low")
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                } catch (err){
                    console.log("Error creating " +schedule+" transaction for employee ID: ", employee.id)
                }
            }
        }
    }


}


let employeeDb = new EmployeeDb();
export default employeeDb;
cron.schedule("1 * * * * *", () => {
    console.log("Minute Cron Job Start");
    employeeDb.doTransaction('MINUTES');
});

// cron.schedule("0 59 0/1 1/1 * *", () => {
//     console.log("Hourly Cron Job Start");
//     employeeDb.doTransaction('HOURLY');
// });

// cron.schedule("0 59 23 * * *", () => {
//     console.log("Daily Cron Job Start");
//     employeeDb.doTransaction('DAILY');
// });

// cron.schedule("0 59 23 * * 7", () => {
//     console.log("Weekly Cron Job Start");
//     employeeDb.doTransaction('WEEKLY');
// });


// cron.schedule("0 59 23 25 * *", () => {
//     console.log("Monthly Cron Job Start");
//     employeeDb.doTransaction('MONTHLY');
// });



