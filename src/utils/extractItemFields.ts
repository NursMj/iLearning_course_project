export function extractNotEmptyFields(itemFields: any) {
  return Object.entries(itemFields).reduce((acc: any, [key, value]) => {
    if (value != '') acc[key] = value
    return acc
  }, {})
}

export default function extractItemFields(allFields: any) {
  const itemFields = Object.entries(allFields).reduce((acc: any, [key, value]) => {
    const otherFilds = [
      'id',
      'updatedAt',
      'createdAt',
      'UserId',
      'name',
      'desc',
      'img',
      'TopicId',
      'Topic'
    ]
    if (otherFilds.includes(key)) return acc
    acc[key] = value
    return acc
  }, {})

  return extractNotEmptyFields(itemFields)
}
