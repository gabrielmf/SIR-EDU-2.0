export default function loginUser(credentials) {
    console.log(credentials);
    return fetch('http://localhost:3000/api/authenticate', {  
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...credentials
        })
    })
}