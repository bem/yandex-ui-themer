export function isColor(value: string): boolean {
  return Boolean(String(value).match(/^(#|hsla?|rgba?)/))
}
