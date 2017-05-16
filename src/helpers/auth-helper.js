import axios from 'services/axios-config'

export default function loginUser(credentials) {
    return axios.post('authenticate', {  
        ...credentials
    })
}