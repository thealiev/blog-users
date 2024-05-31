import axios from 'axios'

axios.defaults.baseURL = "https://blog-user-backend.onrender.com";

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    const authorization = token || '' ;
    config.headers.Authorization = authorization
    return config
})

export default axios