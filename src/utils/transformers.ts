import { PARAM_DASH_RE, PARAM_DOT_RE } from './constants'
import { extractParams } from './extractParams'
import { MappingsType } from '../types'

export type TokensType = Record<string, string>

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
