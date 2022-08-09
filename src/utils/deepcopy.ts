export default function deepCopy(value: any) {
  /* 深拷贝 */
  let result: any
  if (typeof value !== 'object' || value == null) return value
  if (Array.isArray(value)) result = []
  else result = {}
  for (let key in value) {
    result[key] = deepCopy(value[key])
  }
  return result
}
