export function toDeepToken(path: string[], prop: any): any {
  const chunks = [...path].reverse()
  let result: any = prop
  for (let chunk of chunks) {
    result = { [chunk]: result }
  }
  return result
}
