import axios from './axios-config'

export default class studentService {
    static getStudents() {
        return axios.get('students');
    }

    static saveStudent(student) {
        let newStudent = new FormData();
        Object.keys(student).forEach((key)=>{
            if(student[key].constructor !== Array) {
                newStudent.append(key, student[key]);
            }
            else {
                newStudent.append(key, JSON.stringify(student[key]));
            }
        });
        return axios.post('students', newStudent);
    }
}