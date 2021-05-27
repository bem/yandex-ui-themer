import cssColorFn from 'css-color-function'

import { COLOR_RE, PARAM_DASH_RE, PARAM_DOT_RE } from './constants'
import { extractParams } from './resolveTokens'
import { MappingsType } from '../types'

export type TokensType = Record<string, string>

export function transformColors(tokens: TokensType): TokensType {
  return Object.entries(tokens).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value.match(COLOR_RE) ? cssColorFn.convert(value) : value,
    }),
    {},
  )
}

export function transformMappings(
  token: string,
  mappings: MappingsType,
  inverted: boolean = false,
): string {
  const template = !inverted ? PARAM_DASH_RE : PARAM_DOT_RE
  const params = extractParams(token, template)

  if (!params) {
    return token
  }

  return params.reduce((acc, { token }) => {
    const value = mappings[token] || token
    return acc.replace(token, value)
  }, token)
}
