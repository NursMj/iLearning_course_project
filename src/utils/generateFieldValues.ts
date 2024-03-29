import getValueFromFieldName from './getValueFromFieldName'

export default function generateFieldValues(filteredFields: any) {
  return Object.keys(filteredFields).reduce((acc: any, key) => {
    if (!key.includes('_name')) return acc
    const newKey = getValueFromFieldName(key)
    if (newKey.includes('boolean')) {
      acc[newKey] = false
    } else {
      acc[newKey] = ''
    }
    return acc
  }, {})
}
