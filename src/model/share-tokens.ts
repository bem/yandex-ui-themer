import { attach, createEffect, createEvent, forward } from 'effector'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'

import { $themeName } from './themes'
import { $listDesignTokens } from './designTokens'
import { tokensQueryParameterUpdate } from './query'
import { uploadTokens } from '../api/uploadTokens'

import { ThemeNamesType, VariablesType } from '../types'

type ShareTokensFxPropsType = {
  themeName: ThemeNamesType
  tokens: VariablesType[]
}

export const tokensShare = createEvent()

export const shareTokens = attach({
  source: {
    themeName: $themeName,
    tokens: $listDesignTokens,
  },
  mapParams: (_: any, { themeName, tokens }) => ({
    themeName,
    tokens,
  }),
  effect: createEffect(({ themeName, tokens }: ShareTokensFxPropsType) => {
    if (tokens.length === 0) {
      return
    }

    return uploadTokens(themeName, tokens)
  }),
})

export const $shareTokensLoading = shareTokens.pending
export const $shareTokensDisabled = $listDesignTokens.map((tokens) => tokens.length === 0)

shareTokens.doneData.watch((tokensHash) => {
  if (!tokensHash) {
    return
  }

  tokensQueryParameterUpdate(tokensHash)
  copy(window.location.href)
  toast.success('Link successfully copied to clipboard')
})

shareTokens.failData.watch((error) => toast.error(error, { autoClose: 5000 }))

forward({
  from: tokensShare,
  to: shareTokens,
})
