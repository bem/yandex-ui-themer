import { createStore, createEvent, createEffect, forward, combine, Store } from 'effector'
import { createGate } from 'effector-react'
import { toast } from 'react-toastify'

import { downloadTokens } from '../api/downloadTokens'
import { getQueryParameter } from '../utils/queryParameters'
import { themeChange } from './themes'
import { tokensQueryParameterUpdate } from './query'
import { VariablesType, ThemeNamesType, DesignTokensType, ListDesignTokensType } from '../types'
import { transformMappings } from '../utils/transformers'
import { $tokenMappings } from './mappings'

export const variablesInitialization = createEvent()
export const variablesChange = createEvent<VariablesType>()
export const variablesChangeBatch = createEvent<VariablesType[]>()
export const variablesReset = createEvent()

export const tokensUpload = createEvent()

export const $designTokens = createStore<DesignTokensType>({})

export const $listDesignTokens = $designTokens.map<ListDesignTokensType>((tokens) =>
  Object.values(tokens).map((token) => ({ ...token })),
)

export const $dotSepDesignTokens: Store<DesignTokensType> = combine(
  $designTokens,
  $tokenMappings,
  (designTokens, mappings) =>
    Object.entries(designTokens).reduce(
      (acc, [name, { value, ...token }]) => ({
        ...acc,
        [name]: {
          ...token,
          value: transformMappings(value, mappings),
        },
      }),
      {},
    ),
)

export const variablesInitializationGate = createGate()

export const initializeVariables = createEffect(async () => {
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

    themeChange(theme as ThemeNamesType)
    variablesChangeBatch(tokens)
    tokensQueryParameterUpdate(tokensHash)
    toast.success('Тема успешно загружена')
  } catch (err) {
    toast.error('Не удалось загрузить тему, проверьте ссылку')
  }
})

// TODO: Удалять значение из стора если change=false.
$designTokens
  .on(variablesChange, (state, token) => ({ ...state, [token.name]: token }))
  .on(variablesChangeBatch, (state, tokens) => {
    const ret: Record<string, any> = {}
    tokens.forEach((v) => (ret[v.name] = v))
    return { ...state, ...ret }
  })
  .reset(variablesReset)

variablesReset.watch(() => tokensQueryParameterUpdate())

forward({
  from: variablesInitializationGate.open,
  to: initializeVariables,
})
