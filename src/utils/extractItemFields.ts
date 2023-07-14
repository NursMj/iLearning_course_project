export function extractNotEmptyFields(itemFields: any) {
  return Object.entries(itemFields).reduce((acc: any, [key, value]) => {
    if (value != '') acc[key] = value
    return acc
  }, {})
}

export default function extractItemFields(allFields: any) {
  const itemFields = Object.entries(allFields).reduce((acc: any, [key, value]) => {
    if (!key.includes("_name") && !key.includes("_value")) return acc
    acc[key] = value
    return acc
  }, {})

  return extractNotEmptyFields(itemFields)
}
