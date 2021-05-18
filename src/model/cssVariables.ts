import { combine } from 'effector'
import { toast } from 'react-toastify'

import { $theme } from './themes'
import { $designTokens } from './tokens'

import { resolveTokens } from '../utils/resolveTokens'
import { transformColors } from '../utils/transformers'

export const $resolvedTokens = combine($designTokens, $theme, (designTokens, theme) => {
  try {
    return resolveTokens(designTokens, theme)
  } catch (e) {
    toast.error(e.message)
  }
})

let memoCssVariables = {}
export const $cssVariables = $resolvedTokens.map((tokens) => {
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
