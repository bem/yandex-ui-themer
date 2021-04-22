import { createStore, createEvent } from 'effector'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'

import { uploadTokens } from '../api/uploadTokens'
import { downloadTokens } from '../api/downloadTokens'
import { getQueryParameter, setQueryParameter } from '../utils/queryParameters'
import { VariablesType } from '../types'

export const variablesInitializationEvent = createEvent()
export const variablesChangedEvent = createEvent<VariablesType>()
export const variablesChangedBatchEvent = createEvent<VariablesType[]>()

export const updateTokensQueryParameterEvent = createEvent<string>()

export const uploadTokensEvent = createEvent()

export const loadingTokensEvent = createEvent<boolean>()

export const $cssVariables = createStore({})
export const $designTokens = createStore<any>({})

export const $listDesignTokens = $designTokens.map((tokens) =>
  Object.values<VariablesType>(tokens).map((token) => ({ ...token })),
)
export const $tokensQueryParameter = createStore<string>('')
export const $loadingTokens = createStore<boolean>(false)

// TODO: Удалять значение из стора если change=false.
$designTokens
  .on(variablesInitializationEvent, () => {
    const tokensHash = getQueryParameter('tokens')
    if (!tokensHash) {
      return
    }

    const init = async () => {
      const tokens = await downloadTokens(tokensHash)
      variablesChangedBatchEvent(tokens)
      updateTokensQueryParameterEvent(tokensHash)
    }

    init()
  })
  .on(variablesChangedEvent, (state, token) => ({ ...state, [token.name]: token }))
  .on(variablesChangedBatchEvent, (state, tokens) => {
    const ret: Record<string, any> = {}
    tokens.forEach((v) => (ret[v.name] = v))
    return { ...state, ...ret }
  })

// TODO: Удалять значение из стора если change=false.
$cssVariables
  .on(variablesChangedEvent, (state, { name, value }) => ({ ...state, [`--${name}`]: value }))
  .on(variablesChangedBatchEvent, (state, tokens) => {
    const ret: Record<string, any> = {}
    tokens.forEach((v) => (ret[`--${v.name}`] = v.value))
    return { ...state, ...ret }
  })

// При обновлении токенов сохранить их в Cloud и удалить предыдущий файл из Cloud
$listDesignTokens.on(uploadTokensEvent, (tokens) => {
  if (tokens.length === 0) {
    return
  }

  const updateLink = async () => {
    loadingTokensEvent(true)

    const tokensHash = await uploadTokens(tokens, $tokensQueryParameter.getState())
    updateTokensQueryParameterEvent(tokensHash)
    copy(window.location.href)
    toast.success('Ссылка успешно скопирована в буфер обмена')

    loadingTokensEvent(false)
  }

  updateLink()
})

$loadingTokens.on(loadingTokensEvent, (_, payload) => payload)

$tokensQueryParameter.on(updateTokensQueryParameterEvent, (state, tokens) => {
  if (getQueryParameter('tokens') === tokens) {
    return state
  }

  setQueryParameter('tokens', tokens)
  return tokens
})
