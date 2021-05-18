import cssColorFn from 'css-color-function'

export type TokensType = Record<string, string>

export function transformColors(tokens: TokensType) {
  return Object.entries(tokens).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: cssColorFn.convert(value) }),
    {},
  )
}
