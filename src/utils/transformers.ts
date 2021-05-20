import cssColorFn from 'css-color-function'

import { COLOR_RE } from './constants'
import { extractParams } from './resolveTokens'

export type TokensType = Record<string, string>

export function transformColors(tokens: TokensType) {
  return Object.entries(tokens).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value.match(COLOR_RE) ? `"${cssColorFn.convert(value)}"` : value,
    }),
    {},
  )
}

export function transformMappings(token: string, mappings: Record<string, string>) {
  const params = extractParams(token)

  if (!params) {
    return token
  }

  return params.reduce((acc, { token }) => {
    const value = mappings[token] || token
    return acc.replace(token, value)
  }, token)
}
