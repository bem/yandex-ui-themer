import { createStore, createEvent } from 'effector'

import { VariablesType } from '../types'

export const variablesChanged = createEvent<VariablesType>()

export const variablesChangedBatch = createEvent<VariablesType[]>()

export const $cssVariables = createStore({})
export const $designTokens = createStore<any>({})
export const $listDesignTokens = $designTokens.map((tokens) =>
  Object.values<VariablesType>(tokens).map((token) => ({ ...token })),
)

// TODO: Удалять значение из стора если change=false.
$designTokens
  .on(variablesChanged, (state, token) => ({ ...state, [token.name]: token }))
  .on(variablesChangedBatch, (state, tokens) => {
    const ret: Record<string, any> = {}
    tokens.forEach((v) => (ret[v.name] = v))
    return { ...state, ...ret }
  })

// TODO: Удалять значение из стора если change=false.
$cssVariables
  .on(variablesChanged, (state, { name, value }) => ({ ...state, [`--${name}`]: value }))
  .on(variablesChangedBatch, (state, tokens) => {
    const ret: Record<string, any> = {}
    tokens.forEach((v) => (ret[`--${v.name}`] = v.value))
    return { ...state, ...ret }
  })

$designTokens.watch((r) => console.log(r))
$listDesignTokens.watch((r) => console.log(r))
