import request from './index'
import { UserLoginData } from '@/interface/interface'

export const loginAPI = (data:UserLoginData) => {
  return request.post('login', data)
}
