import { $authHost, $host } from './index'

export const createComment = async ({ itemId, text }: any) => {
  const { data } = await $authHost.post('api/comment', {
    itemId,
    text,
  })
  return data
}

export const fetchItemComments = async (itemId: number) => {
  const { data } = await $host.get(`api/comment/${itemId}`)
  return data
}

export const deleteComment = async (id: number) => {
  const { data } = await $authHost.delete(`api/comment/${id}`)
  return data
}
