import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3002'

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    const authorization = token || '' ;
    config.headers.Authorization = authorization
    return config
})

export default axios