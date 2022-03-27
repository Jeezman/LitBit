import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api/'

/**
 * @param {{ name: string, payInSatoshi: string, paymentScheduleRate: string }} params
 */
export const createEmployee = (data) => {
    return axios.post('employees', data)
}

export const getEmployees = () => {
    return axios.get('employees')
}

export const getEmployeeById = (id) => {
    return axios.get(`employees/${id}`)
}