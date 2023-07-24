import extractItemFields from './extractItemFields'

const getItemsData = (items: any) => {
  return items.map((item: any) => {
    const itemData: any = {}
    if (item.myLike !== undefined) itemData.myLike = item.myLike
    itemData.id = item.id
    itemData.collection = item.Collection.name
    itemData.author = item.Collection?.User?.name || 'user has been deleted'
    itemData.likesCount = item.likesCount || item?.Likes?.length || 0
    const fieldNames = extractItemFields(item.Collection)
    const fieldValues = extractItemFields(item)
    Object.entries(fieldNames).map(([key, name]) => {
      itemData[name as any] = fieldValues[`${key.replace('_name', '_value')}`]
    })

    return itemData
  })
}

export default getItemsData
