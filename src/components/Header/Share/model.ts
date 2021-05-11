import { attach, createEffect, createEvent, forward } from 'effector'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'

import { $themeName } from '../../../model/themes'
import { $listDesignTokens } from '../../../model/tokens'
import { updateTokensQueryParameterEvent } from '../../../model/query'
import { uploadTokens } from '../../../api/uploadTokens'

import { ThemeNamesType, VariablesType } from '../../../types'

type ShareTokensFxPropsType = {
  themeName: ThemeNamesType
  tokens: VariablesType[]
}

export const shareTokensEvent = createEvent()

export const shareTokensFx = attach({
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

export const $shareTokensLoading = shareTokensFx.pending

shareTokensFx.doneData.watch((tokensHash) => {
  updateTokensQueryParameterEvent(tokensHash)
  copy(window.location.href)
  toast.success('Ссылка успешно скопирована в буфер обмена')
})

shareTokensFx.failData.watch((error) => toast.error(error, { autoClose: 5000 }))

forward({
  from: shareTokensEvent,
  to: shareTokensFx,
})
