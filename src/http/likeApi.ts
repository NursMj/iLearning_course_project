import { $authHost } from './index'

export const createlike = async ({
  itemId,
  userId,
}: any) => {
  const { data } = await $authHost.post('api/like', {
    itemId,
    userId,
  })
  return data
}

export const deleteLike = async (id: number) => {
  const { data } = await $authHost.delete(`api/like/${id}`)
  return data
}
