import axios from 'axios';

const api = axios.create({
    baseURL: 'http://13.60.56.112/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
    }
});

export default api;
