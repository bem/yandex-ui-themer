import { createStore, createEvent, combine } from 'effector'

import groupBy from 'lodash.groupby'

import { $designTokens } from '../../model/designTokens'
import { $invertedTokenMappings } from '../../model/mappings'
import { $resolvedTokens } from '../../model/resolvedTokens'
import { $theme } from '../../model/themes'
import { toHEXA } from '../../utils/color'
import { extractParams } from '../../utils/extractParams'
import { getType } from '../../utils/tokenType'
import { transformMappings } from '../../utils/transformers'
import { getComponentMetaByName } from '../../utils/getComponentByName'
import { DesignTokensType } from '../../types'

export type TokenBase = {
  label: string
  groups: string[]
  path: string[]
  description: string
  defaultValue: string
  rawValue: string
  changed: boolean
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

export const componentChange = createEvent<string>()
export const tokenChange = createEvent<string>()
export const tokenReset = createEvent()
export const activeTabChange = createEvent<string>()
export const currentPropsChange = createEvent<{
  name: string
  value: unknown
}>()
export const currentCombinedPropsChange = createEvent<{
  name: string
  value: unknown
}>()

export interface Prop {
  name: string
  description: string
  type: {
    required: boolean
    name: 'node' | 'boolean' | 'string' | 'number' | 'enum' | 'array' | 'object'
  }
  options?: string[]
  defaultValue: unknown
}
interface IComponent {
  block: string
  props: Prop[]
}

interface ComponentState {
  allProps: Prop[]
  currentProps: Record<string, unknown>
  currentCombinedProps: Record<string, unknown>
}

// Current selected component to be shown
export const $component = createStore<string>('overview')
export const $componentProps = createStore<ComponentState>({
  allProps: [],
  currentProps: {},
  currentCombinedProps: {},
})

// Current selected token to be edited
export const $token = createStore<string>('')
export const $tokenPresent = $token.map((token) => token.length > 0)

const getTokenGroups = (name: string) => {
  const parts = name.split('-')

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

    const preparedTokens = Object.entries(tokens).map<TokenType>(([tokenName, token]) => {
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

    const groupsCount = preparedTokens.reduce<Record<string, number>>((res, { label, groups }) => {
      for (const group of groups) {
        res[group] = res[group] ? res[group] + 1 : 1
      }

      return res
    }, {})

    return groupBy(preparedTokens, ({ groups }) => {
      return groups.find((group) => groupsCount[group] >= 3) || groups[0]
    })
  },
)

// Current tab to show
export const $activeTab = createStore<string>('')

$component.on(componentChange, (_, component) => component)
$componentProps.on(componentChange, (_, component) => {
  // @ts-expect-error
  const currentComponent = getComponentMetaByName(component)
  console.log(currentComponent)
  return {
    allProps: currentComponent.argTypes,
    currentProps: currentComponent.args,
    currentCombinedProps: {},
  }
})
$componentProps.on(
  currentPropsChange,
  ({ allProps, currentProps, currentCombinedProps }, newProp) => {
    const newState = { ...currentProps }
    newState[newProp.name] = newProp.value

    return { allProps, currentProps: newState, currentCombinedProps }
  },
)

$componentProps.on(
  currentCombinedPropsChange,
  ({ allProps, currentProps, currentCombinedProps }, newProp) => {
    const newState = { ...currentCombinedProps }
    newState[newProp.name] = newProp.value

    return { allProps, currentCombinedProps: newState, currentProps }
  },
)

$token.on(tokenChange, (_, token) => token).reset(tokenReset)

$activeTab.on(activeTabChange, (_, activeTab) => activeTab)
