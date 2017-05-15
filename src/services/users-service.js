import axios from './axios-config'

export default class UserService {
    static register(user) {
        return axios.post('register', {
            ...user
        });
    }
}