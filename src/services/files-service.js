import axios from './axios-config'

export default class filesService {
    static getAll(studentId) {
        return axios.get('files', {
            params: { _studentId: studentId }
        });
    }

    static get(fileId) {
        return axios.get('files/' + fileId);
    }

    static uploadFile(file) {
        let newFile = new FormData();

        Object.keys(file).forEach((key) => {
            newFile.append(key, file[key]);
        });

        return axios.post('files', newFile);
    }
}