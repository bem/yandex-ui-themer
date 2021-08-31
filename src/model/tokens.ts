import { createStore, combine } from 'effector'

import groupBy from 'lodash.groupby'

import { $designTokens } from './designTokens'
import { $invertedTokenMappings } from './mappings'
import { $resolvedTokens } from './resolvedTokens'
import { $theme } from './themes'
import { toHEXA } from '../utils/color'
import { extractParams } from '../utils/extractParams'
import { getType } from '../utils/tokenType'
import { transformMappings } from '../utils/transformers'
import lodashMerge from 'lodash.merge';

export type TokenBase = {
  label: string
  groups: string[]
  path: string[]
  description: string
  defaultValue: string
  rawValue: string
  changed: boolean
  name: string
}

export type TokenType = TokenBase &
  (
    | { type: 'text'; value: string }
    | {
        type: 'color'
        hex: string
        alpha: string
        color: string
      }
    | {
        type: 'link'
        link: string
        isColor: boolean
        colorValue: string
      }
  )

// Current selected component to be shown
export const $component = createStore<string>('overview')

// Current selected token to be edited
export const $token = createStore<string>('')
export const $tokenPresent = $token.map((token) => token.length > 0)

const getTokenGroups = (name: string) => {
  const parts = name.split('-');

  return parts.map((_, index) => parts.slice(0, index + 1).join('-')).reverse()
}

// Tokens of the component
export const $tokens = combine(
  {
    theme: $theme,
    mappings: $invertedTokenMappings,
    selectedComponent: $component,
    resolvedChanges: $resolvedTokens,
    changes: $designTokens,
  },
  ({
    theme: {
      tokens: { globals, components },
    },
    changes,
    resolvedChanges,
    mappings,
    selectedComponent,
  }) => {
    const tokens = selectedComponent === 'overview' ? globals : components[selectedComponent]
    const mergedTokens = lodashMerge(tokens, resolvedChanges);

    return Object.entries(mergedTokens).map<TokenType>(([tokenName, token]) => {
      // Initial type of the token
      const baseType = getType(String(token.value))
      const tokenChanged = typeof resolvedChanges[tokenName]?.value !== 'undefined'
      const value = tokenChanged ? resolvedChanges[tokenName].value : String(token.value)

      // Current type of the token (can become link)
      const rawValue = transformMappings((changes[tokenName] || {}).rawValue || '', mappings, true)
      const type = getType(rawValue || value)
      const changed = value !== token.value

      let resultToken: any
      switch (type) {
        case 'text':
          resultToken = { value }
          break
        case 'color':
          const [hex, alpha] = toHEXA(value)
          resultToken = { hex, alpha, color: value }
          break
        case 'link':
          const params = extractParams(rawValue)

          // TODO: добавить поддержку для нескольких ссылок
          // Пример: padding: {size-l} {size-l}
          // Сейчас оно работает только для одной ссылки
          if (params) {
            resultToken = {
              link: params[0].token,
              isColor: baseType === 'color',
              colorValue: value,
            }
          }
      }

      return {
        ...token,
        ...resultToken,
        label: tokenName,
        groups: getTokenGroups(tokenName),
        type,
        defaultValue: token.value,
        rawValue,
        changed,
      }
    })
  },
)

export const $tokensGrouped = combine(
    {
      tokens: $tokens,
    },
    ({
        tokens,
    }) => {
      const groupsCount = tokens.reduce<Record<string, number>>((res, { label, groups }) => {
        for (const group of groups) {
          res[group] = res[group] ? res[group] + 1 : 1
        }
  
        return res
      }, {})
  
      return groupBy(tokens, ({ groups }) => {
          return groups.find(group => groupsCount[group] >= 3) || groups[0];
      })
    },
  )
