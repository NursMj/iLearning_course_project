import { $authHost, $host } from './index'

export const createCollection = async (formData: any) => {
  const { data } = await $authHost.post('api/collection', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const updateCollection = async (formData: any, id: any) => {
  const { data } = await $authHost.put(`api/collection/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const fetchCollections = async () => {
  const { data } = await $host.get('api/collection')
  return data
}

export const fetchUserCollections = async (id: number) => {
  const { data } = await $host.get(`api/collection/user/${id}`)
  return data
}

export const fetchLargestCollections = async () => {
  const { data } = await $host.get('api/collection/largest')
  return data
}

export const fetchOneCollection = async (id: number) => {
  const { data } = await $host.get(`api/collection/${id}`)
  // console.log(data)
  return data
}

export const deleteCollection = async ({ id, userId }: any) => {
  const { data } = await $authHost.delete(`api/collection/${id}`, {
    data: { userId },
  })
  return data
}
