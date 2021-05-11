import { createStore, createEvent, createEffect, forward, Store } from 'effector'
import { createGate } from 'effector-react'
import { toast } from 'react-toastify'

import { downloadTokens } from '../api/downloadTokens'
import { getQueryParameter } from '../utils/queryParameters'
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

forward({
  from: variablesInitializationGate.open,
  to: variablesInitializationFx,
})
