import { attach, createStore, createEffect, createEvent, forward } from 'effector'
import { toast } from 'react-toastify'

import { $theme } from '../../../model/themes'
import { variablesChangedBatchEvent } from '../../../model/tokens'
import { downloadTheme } from '../../../api/downloadTheme'
import { ThemeType } from '../../../types'

type UploadRawTokensFxPropsType = {
  theme: ThemeType
  tokens: string
}

export const uploadRawTokensEvent = createEvent()

export const $tokensText = createStore<string>(`button:
  viewAction:
    fillColor:
      base:
        value: "#C728B3"
      progress:
        base:
          value: "#C728B3"
        process:
          value: "#de1258"
  viewDefault:
    fillColor:
      base:
        value: "#ecb6ea"
`)

export const uploadRawTokensFx = attach({
  source: {
    theme: $theme,
    tokens: $tokensText,
  },
  mapParams: (_, { theme, tokens }) =>
    ({
      theme,
      tokens,
    } as UploadRawTokensFxPropsType),
  effect: createEffect(({ tokens, theme: { mappings } }: UploadRawTokensFxPropsType) => {
    return downloadTheme(tokens, mappings)
  }),
})

export const $uploadRawTokensLoading = uploadRawTokensFx.pending

export const updateTokensEvent = createEvent<string>()

$tokensText.on(updateTokensEvent, (_, payload) => payload)

uploadRawTokensFx.doneData.watch((tokens) => {
  variablesChangedBatchEvent(tokens)
  toast.success('Токены успешно загружены')
})

uploadRawTokensFx.failData.watch((error) => toast.error(error.message, { autoClose: 5000 }))

forward({
  from: uploadRawTokensEvent,
  to: uploadRawTokensFx,
})
