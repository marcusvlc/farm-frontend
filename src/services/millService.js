import API_URL  from './variableService'
import  axios from 'axios' 

const REGISTER_MILL_URL = '/mill'
const GET_ALL_MILLS_URL = '/mills'

export const registerMill = async mill => {
    const { name } = mill

    return axios.post(`${API_URL}${REGISTER_MILL_URL}`, { name })
}

export const getAllMills = async => {
    return axios.get(`${API_URL}${GET_ALL_MILLS_URL}`)
}