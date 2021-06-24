import { $resolvedTokens } from './resolvedTokens'

export const $cssVariables = $resolvedTokens.map<Record<string, string>>((tokens) => {
  return Object.entries(tokens).reduce(
    (acc, [name, { value }]) => ({
      ...acc,
      [`--${name}`]: value,
    }),
    {},
  )
})

export const $cssText = $cssVariables.map((variables) => {
  const cssText = Object.keys(variables).reduce(
    (acc: string, v: string) => `${acc}  ${v}: ${variables[v]};\n`,
    '',
  )
  return `:root {\n${cssText}}`
})
