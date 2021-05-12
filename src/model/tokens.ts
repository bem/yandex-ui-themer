import { createStore, createEvent, createEffect, forward, combine, Store } from 'effector'
import { createGate } from 'effector-react'
import { toast } from 'react-toastify'
import deepmerge from 'deepmerge'
import YAML from 'yaml'

import { downloadTokens } from '../api/downloadTokens'
import { getQueryParameter } from '../utils/queryParameters'
import { toDeepToken } from '../utils/toDeepToken'
import { changeThemeEvent } from './themes'
import { updateTokensQueryParameterEvent } from './query'
import { VariablesType, ThemeNamesType } from '../types'

export const variablesInitializationEvent = createEvent()
export const variablesChangedEvent = createEvent<VariablesType>()
export const variablesChangedBatchEvent = createEvent<VariablesType[]>()
export const variablesResetEvent = createEvent()

export const uploadTokensEvent = createEvent()

export const loadingTokensEvent = createEvent<boolean>()

export const $cssVariables = createStore({})
export const $designTokens = createStore<any>({})

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

export const $listDesignTokens: Store<VariablesType[]> = $designTokens.map((tokens) =>
  Object.values<VariablesType>(tokens).map((token) => ({ ...token })),
)

export const variablesInitializationGate = createGate()

export const variablesInitializationFx = createEffect(async () => {
  const tokensHash = getQueryParameter('tokens')

  if (!tokensHash) {
    return
  }

  try {
    const response = await downloadTokens(tokensHash)

    if (!response) {
      throw new Error('No response')
    }

    const { tokens, theme } = response

    changeThemeEvent(theme as ThemeNamesType)
    variablesChangedBatchEvent(tokens)
    updateTokensQueryParameterEvent(tokensHash)
    toast.success('Тема успешно загружена')
  } catch (err) {
    toast.error('Не удалось загрузить тему, проверьте ссылку')
  }
})

// TODO: Удалять значение из стора если change=false.
$designTokens
  .on(variablesChangedEvent, (state, token) => ({ ...state, [token.name]: token }))
  .on(variablesChangedBatchEvent, (state, tokens) => {
    const ret: Record<string, any> = {}
    tokens.forEach((v) => (ret[v.name] = v))
    return { ...state, ...ret }
  })
  .reset(variablesResetEvent)

// TODO: Удалять значение из стора если change=false.
$cssVariables
  .on(variablesChangedEvent, (state, { name, value }) => ({ ...state, [`--${name}`]: value }))
  .on(variablesChangedBatchEvent, (state, tokens) => {
    const ret: Record<string, any> = {}
    tokens.forEach((v) => (ret[`--${v.name}`] = v.value))
    return { ...state, ...ret }
  })
  .reset(variablesResetEvent)

variablesResetEvent.watch(() => updateTokensQueryParameterEvent())

forward({
  from: variablesInitializationGate.open,
  to: variablesInitializationFx,
})
