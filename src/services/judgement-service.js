import axios from './axios-config'

export default class judgementService {

    static getAll(studentId) {
        return axios.get('judgement', {
            params: { studentId }
        });
    }

    static save(newJudgement) {
        return axios.post('judgement', newJudgement);
    }
}