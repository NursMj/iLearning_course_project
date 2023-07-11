import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

const registration = async (name: string, email: string, password: string) => {
  const {data} = await $host.post('api/user/registration', {
    name,
    email,
    password,
    role: 'USER',
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

const login = async (email: string, password: string) => {
  const {data} = await $host.post('api/user/login', {
    email,
    password,
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

const check = async () => {
  const {data} = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  console.log(jwt_decode(data.token))
  return jwt_decode(data.token)
}

export { registration, login, check }
