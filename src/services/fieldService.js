import {API_URL}  from './variableService'
import  axios from 'axios' 

const REGISTER_FIELD_URL = '/field'
const GET_ALL_FIELDS_URL = '/fields'

export const registerField = (field) => {
    const { code, latitude, longitude } = field
    return axios.post(`${API_URL}${REGISTER_FIELD_URL}`, {code: parseInt(code), latitude, longitude, farm_code: field.selected_farm_id})
}

export const getAllFields = () => {
    return axios.get(`${API_URL}${GET_ALL_FIELDS_URL}`)
}