import { ThemeType, DesignTokensType, ParamsType } from '../types'

import { PARAM_DASH_RE, BRACES_REMOVAL_RE } from './constants'

/**
 * Get parameters from string.
 *
 * @param value {string} String from which parameters should be retrieved
 * @returns {ParamsType[] | undefined}
 *
 * @example
 *
 * extractParams('{button-bg-color}') // [ { template: '{button-bg-color}', token: 'button-bg-color'} ]
 * extractParams('{width} {height}') // [ {template: '{width}', token: 'width'}, { template: '{height}', token: 'height'} ]
 */
export const extractParams = (
  value: string,
  template: RegExp = PARAM_DASH_RE,
): ParamsType[] | undefined => {
  const params = value.match(template)

  if (!params) {
    return
  }

  return params.reduce<ParamsType[]>(
    (acc, el) => [...acc, { template: el, token: el.replace(BRACES_REMOVAL_RE, '') }],
    [],
  )
}

/**
 * Resolves dependencies in tokens.
 *
 * @param tokens {DesignTokensType} Design tokens which need to be resolved
 * @param theme {ThemeType} Theme based on which values resolving should be done
 * @returns {Record<string, string>}
 *
 * @example
 *
 * const exampleTokens = {
 *   'color.project': '#fc0',
 *   'color.bg.action': 'color({color.project} l(+15%))',
 *   'color.bg.alert': '{color.bg.action}',
 *   'space-x': '2px',
 *   'space-y': '4px',
 *   padding: '{space-y} {space-x}',
 * };
 *
 * resolveTokens(exampleTokens);
 *
 * // Result
 * {
 *   'color.project': '#fc0',
 *   'color.bg.action': 'color(#fc0 l(+15%))',
 *   'color.bg.alert': '#fc0',
 *   'space-x': '2px',
 *   'space-y': '4px',
 *   'padding': '4px 2px',
 * };
 *
 */
export function resolveTokens(tokens: DesignTokensType, theme: ThemeType): Record<string, string> {
  const resolved: Record<string, string> = {}
  const seen: Set<string> = new Set()

  function resolveToken(token: string, value: string): string {
    if (resolved[token]) {
      return resolved[token]
    }

    // When we don't override token and it is in the the theme, get its value
    if (theme.allTokens[token] && !(token in tokens)) {
      resolved[token] = theme.allTokens[token].value.toString()
      return resolved[token]
    }

    // If we see token more than once, it means that there is cycle dependency in tokens
    // and we should terminate the algorithm
    if (seen.has(token)) {
      throw new Error(`Cycle dependence. Token: '{token}'`)
    }

    seen.add(token)

    const params = extractParams(value)

    if (!params) {
      return value
    }

    // Change params in the string to resolved tokens
    return params.reduce((acc, { template, token }) => {
      let value
      if (token in tokens) {
        value = tokens[token].name
      } else if (token in theme.allTokens) {
        value = theme.allTokens[token].value.toString()
      } else {
        throw new Error(`No such token \`${token}\``)
      }

      return acc.replace(template, resolveToken(token, value))
    }, value)
  }

  for (let [token, { value }] of Object.entries(tokens)) {
    resolved[token] = resolveToken(token, value)
  }

  return resolved
}
