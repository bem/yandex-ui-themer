export function toDeepToken(path: string[], prop: any): any {
  const chunks = [...path].reverse()
  let result: any = prop
  for (let i = 0; i < chunks.length; i++) {
    result = { [chunks[i]]: result }
  }
  return result
}
