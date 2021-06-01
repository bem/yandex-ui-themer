import { combine, Store } from 'effector'
import deepmerge from 'deepmerge'
import YAML from 'yaml'

import { $designTokens } from '../../../model/tokens'
import { $theme } from '../../../model/themes'
import { $tokenMappings, $invertedTokenMappings } from '../../../model/mappings'
import { $cssVariables } from '../../../model/cssVariables'
import { toDeepToken } from '../../../utils/toDeepToken'
import { transformMappings } from '../../../utils/transformers'
import { extractParams } from '../../../utils/resolveTokens'
import { DesignTokensType, ParamsType } from '../../../types'
import { PARAM_DOT_RE } from '../../../utils/constants'

export const $cssText = $cssVariables.map((variables) => {
  const cssText = Object.keys(variables).reduce(
    (acc: string, v: string) => `${acc}  ${v}: ${variables[v]};\n`,
    '',
  )
  return `:root {\n${cssText}}`
})

const $dotSepDesignTokens: Store<DesignTokensType> = combine(
  $designTokens,
  $tokenMappings,
  (designTokens, mappings) =>
    Object.entries(designTokens).reduce(
      (acc, [name, { value, ...token }]) => ({
        ...acc,
        [name]: {
          ...token,
          value: transformMappings(value, mappings),
        },
      }),
      {},
    ),
)

export const $yamlText = combine(
  { designTokens: $dotSepDesignTokens, mappings: $invertedTokenMappings, theme: $theme },
  ({ designTokens, mappings, theme: { allTokens } }) => {
    // Make object for yaml from designTokens
    const yml = Object.values(designTokens).reduce((acc, { changed, path, value, rawValue }) => {
      if (rawValue) {
        acc.push(toDeepToken(path, { value: rawValue }))
      } else if (changed) {
        acc.push(toDeepToken(path, { value }))
      }

      return acc
    }, [] as any)

    // Get all params from designTokens values
    const params = Object.values(designTokens).reduce<ParamsType[]>(
      (acc, { value, rawValue }) => [
        ...acc,
        ...(extractParams(rawValue || value, PARAM_DOT_RE) || []),
      ],
      [],
    )

    // If param is in the theme and it was not redefined then add theme's value to the yaml
    params
      .map(({ token }) => mappings[token] || token)
      .filter((token) => !(token in designTokens))
      .forEach((token) => {
        if (allTokens[token]) {
          const { path, value } = allTokens[token]
          yml.push(toDeepToken(path, { value }))
        }
      })

    const deepmergedYml = deepmerge.all(yml)
    return YAML.stringify(deepmergedYml)
  },
)
