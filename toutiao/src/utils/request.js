import axios from "axios"
import  store from '../store/index'


const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/" // 基础路径
})

request.interceptors.request.use(config => {
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})
export default request
