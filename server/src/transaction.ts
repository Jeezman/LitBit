export interface Transaction {
    id: number;
    employeeId: number;
    timeCreated: number;
    timePaid: number;
    isPaid: boolean,
    description: string
}

export const SocketEvents = {
    employeeUpdated: 'transaction-updated',
    invoicePaid: 'invoice-paid',
};