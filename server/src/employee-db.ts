import { EventEmitter } from 'events';
import { existsSync, promises as fs } from 'fs';
import { Employee } from './employee';

const DB_FILE = 'db.json';

export interface LndNode {
    token: string;
    host: string;
    cert: string;
    macaroon: string;
    pubkey: string;
}

export interface Transaction {
    id: number;
    employeeId: number;
    timeCreated: number;
    timePaid: number;
    isPaid: boolean;
    description: string;
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

    async createTransaction(
        employeeId: number,
        timeCreated: number,
        timePaid: number,
        isPaid: boolean,
        description: string
    ) {
        // calculate the highest numeric id
        const maxId = Math.max(0, ...this._data.transactions.map(p => p.id));

        const transaction: Transaction = {
            id: maxId + 1,
            employeeId,
            timeCreated,
            timePaid,
            isPaid,
            description,
        };
        this._data.transactions.push(transaction);

        await this.persist();
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

    getEmployees() {
        return this._data.employees
            .sort(function(a, b) { return (a.name > b.name ? 1 : (a.name === b.name ? 0 : -1)) })
    }

    async createEmployee(
        name: string,
        payInSatoshi: number,
        paymentScheduleRate: string,
        publicKey: string,
    ) {
        // calculate the highest numeric id
        const maxId = Math.max(0, ...this._data.employees.map(p => p.id));

        const employee: Employee = {
            id: maxId + 1,
            name,
            payInSatoshi,
            paymentScheduleRate,
            publicKey,
        };
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
}

export default new EmployeeDb();