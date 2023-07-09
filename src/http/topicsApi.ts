import { $authHost, $host } from './index'

const createTopic = async (name: string) => {
  const {data} = await $authHost.post('api/topic', {name})
  return data
}

const fetchTopics = async () => {
  const {data} = await $host.get('api/topic')
  return data
}

const deleteTopic = async (id: number) => {
  const {data} = await $authHost.delete(`api/user/${id}`)
  return data
}

export { createTopic, fetchTopics, deleteTopic }
