import {API_URL}  from './variableService'
import  axios from 'axios' 

const REGISTER_HARVEST_URL = '/harvest'
const GET_ALL_HARVEST_URL = '/harvests'

export const registerHarvest = async (harvest) => {
    const {code, start_date, end_date, selected_mill_id} = harvest

    return axios.post(`${API_URL}${REGISTER_HARVEST_URL}`, { code: parseInt(code), start_at: start_date, ended_at: end_date, mill_code: parseInt(selected_mill_id) })
}

export const getAllHarvests = async () => {
    return axios.get(`${API_URL}${GET_ALL_HARVEST_URL}`)
}