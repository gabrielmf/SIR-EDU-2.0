import axios from './axios-config'

export default class studentService {
    static getStudents() {
        return axios.get('students');
    }

    static saveStudent(student) {
        return axios.post('students', student);
    }
}