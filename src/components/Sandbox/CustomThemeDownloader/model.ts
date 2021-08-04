import { attach, createStore, createEffect, createEvent, forward } from 'effector'
import { toast } from 'react-toastify'

import { $theme } from '../../../model/themes'
import { variablesChangeBatch } from '../../../model/designTokens'
import { downloadTheme } from '../../../api/downloadTheme'
import { ThemeType } from '../../../types'

type UploadRawTokensFxPropsType = {
  theme: ThemeType
  tokens: string
}

export const rawTokensUpload = createEvent()

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
        value: "color({button.viewAction.fillColor.base.value} a(20%))"
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

export const tokensUpdate = createEvent<string>()

$tokensText.on(tokensUpdate, (_, payload) => payload)

uploadRawTokensFx.doneData.watch((tokens) => {
  variablesChangeBatch(tokens)
  toast.success('Theme successfully uploaded')
})

uploadRawTokensFx.failData.watch((error) => toast.error(error.message, { autoClose: 5000 }))

forward({
  from: rawTokensUpload,
  to: uploadRawTokensFx,
})
