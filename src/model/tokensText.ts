import { attach, createStore, createEffect, createEvent, forward } from 'effector'
import { toast } from 'react-toastify'

import { $theme } from './themes'
import { variablesChangeBatch } from './designTokens'
import { downloadTheme } from '../api/downloadTheme'
import { $yamlText } from './yaml'
import { ThemeType } from '../types'

type UploadRawTokensFxPropsType = {
  theme: ThemeType
  tokens: string
}

export const rawTokensUpload = createEvent()

// TODO: Вынести вынести логику с загрузкой в yaml.ts
export const $tokensText = $yamlText.map((value) => value)

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
  toast.success('Tokens successfully uploaded')
})

uploadRawTokensFx.failData.watch((error) => toast.error(error.message, { autoClose: 5000 }))

forward({
  from: rawTokensUpload,
  to: uploadRawTokensFx,
})
