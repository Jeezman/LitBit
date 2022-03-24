import { EventEmitter } from 'events';


export interface Employee {
    id: number;
    time: number;
    name: string;
    payInSatoshi: number;
    paymentScheduleRate: string;
    hasPaid: boolean;
};

class EmployeesManager {
    employees: Employee[] = [];

    // Add a new employee to the list
    addEmployee(name: string, payInSatoshi: number, paymentScheduleRate: string): Employee {
        const employee = {
            name,
            payInSatoshi,
            paymentScheduleRate,
            id: Math.floor(Math.random() * 100000000) + 1000,
            time: Date.now(),
            hasPaid: false,
        };
        this.employees.push(employee);
        return employee;
    }

    // Gets a particular employee given an ID
    getEmployee(id: number): Employee | undefined {
        return this.employees.find(p => p.id === id);
    }

    // Mark a employee as paid
    markEmployeePaid(id: number) {
        let updatedEmployee;
        this.employees = this.employees.map(p => {
            if (p.id === id) {
                updatedEmployee = { ...p, hasPaid: true };
                return updatedEmployee;
            }
            return p;
        });

        // if (updatedEmployee) {
        //     this.emit('employee', updatedEmployee);
        // }
    }

    // Return Employees that have been paid for in id order
    getPaidEmployees() {
        return this.employees
            .filter(p => !!p.hasPaid)
            .sort((a, b) => b.id - a.id);
    }

    // Return all Employees id order
    getEmployees() {
        return this.employees
            .sort(function(a, b) { return (a.name > b.name ? 1 : (a.name === b.name ? 0 : -1)) })
    }
}

export default new EmployeesManager();