import axios from './axios-config'

export default class judgementService {

    static getAll(studentId) {
        return axios.get('judgment', {
            params: { _studentId: studentId }
        });
    }

    static save(newJudgement) {
        return axios.post('judgement', newJudgement);
    }
}