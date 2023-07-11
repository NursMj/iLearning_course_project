export default function getValueFromFieldName(fieldName: string): string {
  const valueFieldName = fieldName.replace('_name', '_value')
  return valueFieldName
}
