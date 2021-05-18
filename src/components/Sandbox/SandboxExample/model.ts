import { combine } from 'effector'
import deepmerge from 'deepmerge'
import YAML from 'yaml'

import { $designTokens } from '../../../model/tokens'
import { $cssVariables } from '../../../model/cssVariables'
import { toDeepToken } from '../../../utils/toDeepToken'

export const $cssText = combine(
  { cssVariables: $cssVariables, designTokens: $designTokens },
  ({ cssVariables, designTokens }) => {
    const cssText = Object.keys(cssVariables).reduce((acc: string, v: string) => {
      if (designTokens[v.replace('--', '')].changed) {
        //@ts-ignore
        acc += `  ${v}: ${cssVariables[v]};\n`
      }
      return acc
    }, '')
    return `:root {\n${cssText}}`
  },
)

export const $yamlText = combine({ designTokens: $designTokens }, ({ designTokens }) => {
  const yml = Object.entries(designTokens).reduce((acc, value: any) => {
    if (value[1].changed) {
      acc.push(toDeepToken(value[1].path, { value: value[1].value }))
    }
    return acc
  }, [] as any)

  const deepmergedYml = deepmerge.all(yml)
  return YAML.stringify(deepmergedYml)
})
