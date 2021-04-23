import { createStore, createEvent } from 'effector'

import { setQueryParameter, deleteQueryParameter } from '../utils/queryParameters'

export const TOKENS_QUERY_PARAMETER = 'tokens'

export const updateTokensQueryParameterEvent = createEvent<string>()
export const $tokensQueryParameter = createStore<string>('')

$tokensQueryParameter.on(updateTokensQueryParameterEvent, (_, tokens) => tokens)

updateTokensQueryParameterEvent.watch((tokens) => {
  if (tokens === '') {
    deleteQueryParameter(TOKENS_QUERY_PARAMETER)
    return
  }

  setQueryParameter(TOKENS_QUERY_PARAMETER, tokens)
})
