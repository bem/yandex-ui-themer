import { setQueryParameter, deleteQueryParameter } from '../utils/queryParameters'

export const TOKENS_QUERY_PARAMETER = 'tokens'

export const updateTokensQueryParameterEvent = (tokens?: string) => {
  if (!tokens) {
    deleteQueryParameter(TOKENS_QUERY_PARAMETER)
    return
  }

  setQueryParameter(TOKENS_QUERY_PARAMETER, tokens)
}
