import axios from 'axios'
const AxiosInstance = axios.create({
    baseURL: 'http://getenvest.com/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


export default AxiosInstance