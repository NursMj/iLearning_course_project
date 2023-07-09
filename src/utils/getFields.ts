export default function getFields(fields: any) {
  let readyFields: any = {}
  Object.keys(fields).map((type) => {
    if (fields[type].length === 0) return
    fields[type].forEach((value: any, i: number) => {
      const key = `${type}Field${i + 1}_name`
      readyFields[key] = value
    })
  })
  return readyFields
}
