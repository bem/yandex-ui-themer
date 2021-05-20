import { combine } from 'effector'
import deepmerge from 'deepmerge'
import YAML from 'yaml'

import { $designTokens } from '../../../model/tokens'
import { $theme } from '../../../model/themes'
import { $tokenMappings } from '../../../model/mappings'
import { $cssVariables } from '../../../model/cssVariables'
import { toDeepToken } from '../../../utils/toDeepToken'
import { transformMappings } from '../../../utils/transformers'
import { extractParams } from '../../../utils/resolveTokens'
import { ParamsType } from '../../../types'

export const $cssText = combine({ cssVariables: $cssVariables }, ({ cssVariables }) => {
  const cssText = Object.keys(cssVariables).reduce(
    (acc: string, v: string) =>
      //@ts-ignore
      `${acc}  ${v}: ${cssVariables[v]};\n`,
    '',
  )
  return `:root {\n${cssText}}`
})

export const $yamlText = combine(
  { designTokens: $designTokens, mappings: $tokenMappings, theme: $theme },
  ({ designTokens, mappings, theme: { allTokens } }) => {
    const params: ParamsType[] = []
    const seen = new Set<string>()
    const addedTokens = new Set<string>()

    const yml = Object.entries(designTokens).reduce(
      (acc, [name, { changed, path, value }]: any) => {
        addedTokens.add(name)

        if (changed) {
          const mappedValue = transformMappings(value.toString(), mappings)
          acc.push(toDeepToken(path, { value: mappedValue }))

          const paramsToAdd = (extractParams(value) || []).filter(({ token }) => {
            const hasSeen = seen.has(token)
            seen.add(token)
            return !hasSeen
          })
          params.push(...paramsToAdd)
        }
        return acc
      },
      [] as any,
    )

    params
      .filter(({ token }) => !addedTokens.has(token))
      .forEach(({ token }) => {
        if (allTokens[token]) {
          const { path, value } = allTokens[token]
          yml.push(toDeepToken(path, { value }))
        }
      })

    const deepmergedYml = deepmerge.all(yml)
    return YAML.stringify(deepmergedYml)
  },
)
