import axios from "axios"
import  store from '../store/index'
import jsonBig from 'json-bigint'


const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/",
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }] // 基础路径
})

request.interceptors.request.use(config => {
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})
export default request
