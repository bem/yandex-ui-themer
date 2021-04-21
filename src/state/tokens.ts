import { createStore, createEvent } from 'effector'

import { uploadTokens } from '../api/uploadTokens'
import { downloadTokens } from '../api/downloadTokens'
import { getQueryParameter, setQueryParameter } from '../utils/queryParameters'
import { VariablesType } from '../types'

export const variablesInitialization = createEvent()
export const variablesChanged = createEvent<VariablesType>()
export const variablesChangedBatch = createEvent<VariablesType[]>()

export const updateTokensQueryParameter = createEvent<string>()

export const $cssVariables = createStore({})
export const $designTokens = createStore<any>({})
export const $tokensQueryParameter = createStore<string>('')
export const $listDesignTokens = $designTokens.map((tokens) =>
  Object.values<VariablesType>(tokens).map((token) => ({ ...token })),
)

// TODO: Удалять значение из стора если change=false.
$designTokens
  .on(variablesInitialization, () => {
    const init = async () => {
      const tokens = await downloadTokens(getQueryParameter('tokens'))
      variablesChangedBatch(tokens)
      updateTokensQueryParameter(tokens)
    }

    init()
  })
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

// При обновлении токенов сохранить их в Cloud и удалить предыдущий файл из Cloud
$listDesignTokens.watch((tokens) => {
  if (tokens.length === 0) {
    return
  }

  const updateLink = async () => {
    const tokensHash = await uploadTokens(tokens, $tokensQueryParameter.getState())
    updateTokensQueryParameter(tokensHash)
  }

  updateLink()
})

$tokensQueryParameter.on(updateTokensQueryParameter, (state, tokens) => {
  if (getQueryParameter('tokens') === tokens) {
    return state
  }

  setQueryParameter('tokens', tokens)
  return tokens
})
