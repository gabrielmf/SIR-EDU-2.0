import axios from 'axios'

export default function loginUser(credentials) {
    return axios.post('http://localhost:3000/api/authenticate', {  
        ...credentials
    })
}