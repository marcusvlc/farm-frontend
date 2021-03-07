import API_URL  from './variableService'
import  axios from 'axios' 

REGISTER_FARM_URL = '/farm'

export const registerFarm = (field) => {
    const { code, name } = field 
    return axios.post(`${API_URL}${REGISTER_FARM_URL}`, {code, name, harvest_id: field.selected_harvest_id})
}