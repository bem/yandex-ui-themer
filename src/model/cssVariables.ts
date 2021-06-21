import { combine } from 'effector'
import { toast } from 'react-toastify'

import { $theme } from './themes'
import { $designTokens } from './tokens'
import { $invertedTokenMappings } from './mappings'

import { resolveTokens } from '../utils/resolveTokens'
import { transformColors } from '../utils/transformers'

export const $resolvedTokens = combine(
  $designTokens,
  $theme,
  $invertedTokenMappings,
  (designTokens, theme, mappings) => {
    try {
      return resolveTokens(designTokens, mappings, theme)
    } catch (e) {
      toast.error(e.message)
    }

    return {}
  },
)

export const $transformedTokens = $resolvedTokens.map(transformColors)

export const $cssVariables = $transformedTokens.map<Record<string, string>>((tokens) => {
  return Object.entries(tokens).reduce(
    (acc, [name, value]) => ({
      ...acc,
      [`--${name}`]: value,
    }),
    {},
  )
})
