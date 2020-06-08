import axios from 'axios'
import { message } from 'antd';

const httpRequest = axios.create({
  timeout: 1000 * 60,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 响应拦截
 */
httpRequest.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error === undefined || error.code === 'ECONNABORTED') {
    message.warning('服务请求超时')
  }
  const { response } = error
  if (response.status === 401) { // 401, token失效
    message.error(response.data.error_msg || '登录失败')
  } else if (response.status !== 200) { // 非200, 请求失败
    message.error(response.data.error_msg || '请求失败')
  }
  return Promise.reject(error)
})

export default httpRequest