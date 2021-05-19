import cssColorFn from 'css-color-function'

import { DesignTokensType } from '../types'
import { COLOR_RE, PARAM_RE, BRACES_REMOVAL_RE } from './regex'

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

export const toDotSeparatedString = (value: string) => {
  const matches = value.match(PARAM_RE)

  if (!matches) {
    return value
  }

  const tokens = matches.map((match) => match.replace(BRACES_REMOVAL_RE, ''))

  return tokens.reduce(
    (acc, match) =>
      acc.replace(match, [...match.replace(BRACES_REMOVAL_RE, '').split('-'), 'value'].join('.')),
    value,
  )
}

export function transformTokens(tokens: DesignTokensType) {
  return Object.entries(tokens).reduce(
    (acc, [key, token]) => ({
      ...acc,
      [key]: {
        ...token,
        value: toDotSeparatedString(token.value),
      },
    }),
    {},
  )
}
