import { $authHost, $host } from './index'

const createCollection = async ({ name, desc, topicId, userId, itemFields }: any) => {
  const { data } = await $authHost.post('api/collection', {
    name,
    desc,
    topicId,
    userId,
    itemFields
  })
  return data
}

const fetchCollections = async () => {
  const { data } = await $host.get('api/collection')
  return data
}

const fetchOneCollection = async (id: number) => {
  const { data } = await $host.get(`api/collection/${id}`)
  return data
}

const deleteCollection = async (id: number) => {
  const { data } = await $authHost.delete(`api/collection/${id}`)
  return data
}

export {
  createCollection,
  fetchCollections,
  fetchOneCollection,
  deleteCollection,
}
