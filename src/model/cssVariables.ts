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

let memoCssVariables = {}
export const $cssVariables = $resolvedTokens.map<Record<string, string>>((tokens) => {
  if (!tokens) {
    return memoCssVariables
  }

  const transformedTokens = transformColors(tokens)

  memoCssVariables = Object.entries(transformedTokens).reduce(
    (acc, [name, value]) => ({
      ...acc,
      [`--${name}`]: value,
    }),
    {},
  )

  return memoCssVariables
})

$cssVariables.watch((variables) => console.log(variables))

$resolvedTokens.watch((tokens) => console.log(tokens))
