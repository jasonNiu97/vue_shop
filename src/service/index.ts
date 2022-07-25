import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'https://lianghj.top:8888/api/private/v1/'
})

export default request
