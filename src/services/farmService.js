import {API_URL}  from './variableService'
import  axios from 'axios' 

const REGISTER_FARM_URL = '/farm'
const GET_ALL_FARMS_URL = '/farms'

export const registerFarm = (field) => {
    const { code, name } = field 
    return axios.post(`${API_URL}${REGISTER_FARM_URL}`, {code: parseInt(code), name, harvest_code: parseInt(field.selected_harvest_id)})
}

export const getAllFarms = () => { 
    return axios.get(`${API_URL}${GET_ALL_FARMS_URL}`)
}