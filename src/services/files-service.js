import axios from './axios-config'

export default class filesService {
    static getFiles(studentId) {
        return axios.get('files', {
            _studentId: studentId
        });
    }

    static uploadFile(file, studentId) {
        let newFile = new FormData();
        Object.keys(file).forEach((key) => {
            newStudent.append(key, file[key]);
        });
        return axios.post('files', newFile);
    }
}