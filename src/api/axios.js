import axios from 'axios'

axios.defaults.baseURL =
  "mongodb+srv://tarqymuhammadal:3qv6kRT5BxHKTdml@usercollection.ig7qnm1.mongodb.net/";

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    const authorization = token || '' ;
    config.headers.Authorization = authorization
    return config
})

export default axios