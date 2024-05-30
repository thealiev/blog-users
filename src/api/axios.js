import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_URI

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    const authorization = token || '' ;
    config.headers.Authorization = authorization
    return config
})

export default axios