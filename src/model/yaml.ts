import { combine } from 'effector'
import deepmerge from 'deepmerge'
import YAML from 'yaml'

import { ParamsType } from '../types'
import { PARAM_DOT_RE } from '../utils/constants'
import { extractParams } from '../utils/extractParams'
import { toDeepToken } from '../utils/toDeepToken'
import { $invertedTokenMappings } from './mappings'
import { $theme } from './themes'
import { $dotSepDesignTokens } from './designTokens'

export const $yamlText = combine(
  {
    designTokens: $dotSepDesignTokens,
    mappings: $invertedTokenMappings,
    theme: $theme,
  },
  ({ designTokens, mappings, theme: { allTokens } }) => {
    if (Object.keys(designTokens).length === 0) {
      return ''
    }

    // Make object for yaml from designTokens
    const yml = Object.values(designTokens).reduce((acc, { path, value, rawValue }) => {
      if (rawValue) {
        acc.push(toDeepToken(path, { value: rawValue }))
      } else {
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
