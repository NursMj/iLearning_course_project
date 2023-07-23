import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (
  name: string,
  email: string,
  password: string,
  actionType: string = 'register'
) => {
  const { data } = await $host.post('api/user/registration', {
    name,
    email,
    password,
    role: 'USER',
  })
  if (actionType !== 'add-user') {
    localStorage.setItem('token', data.token)
  }
  return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/login', {
    email,
    password,
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const fetchAllUsers = async () => {
  const { data } = await $authHost.get('api/user/')
  return data
}

export const deleteUser = async (id: number) => {
  const { data } = await $authHost.delete(`api/user/${id}`)
  return data
}

export const updateUserRole = async ({ id, role }: any) => {
  const { data } = await $authHost.put(`api/user/update-by-admin/${id}`, {
    role,
  })
  return data
}

export const updateUserStatus = async ({ id, blocked }: any) => {
  const { data } = await $authHost.put(`api/user/update-by-admin/${id}`, {
    blocked,
  })
  return data
}

export const updateUserDarkMode = async ({ id, darkMode }: any) => {
  const { data } = await $authHost.put(`api/user/update-by-user/${id}`, {
    darkMode,
  })
  return data
}

export const updateUserLanguage = async ({ id, language }: any) => {
  const { data } = await $authHost.put(`api/user/update-by-user/${id}`, {
    language,
  })
  return data
}

export const updateUser = async () => {
  const { data } = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
