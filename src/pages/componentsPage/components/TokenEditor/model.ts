import { combine } from 'effector'
import { $theme } from '../../../../model/themes'
import { $token, tokenReset } from '../../model'

export type SelectedTokenType = {}

export const closeEditor = tokenReset

export const $selectedToken = combine(
  { token: $token, theme: $theme },
  ({ token, theme: { allTokens } }) => ({
    token,
    description: allTokens[token]?.description,
  }),
)
