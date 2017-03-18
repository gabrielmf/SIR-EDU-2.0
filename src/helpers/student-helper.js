export default function studentHelper(method, payload) {
    console.log('student', method, payload);
    return fetch('http://localhost:3000/api/students', {  
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...payload
        })
    })
}