import { attach, createEffect, createEvent, forward } from 'effector'
import { toast } from 'react-toastify'

import { $theme } from '../../../model/themes'
import { variablesChangedBatchEvent } from '../../../model/tokens'
import { downloadTheme } from '../../../api/downloadTheme'
import { ThemeType } from '../../../types'

type UploadRawTokensFxPropsType = {
  content: string
  theme: ThemeType
}

export const uploadRawTokensEvent = createEvent<string>()

export const uploadRawTokensFx = attach({
  source: $theme,
  mapParams: (content, theme) =>
    ({
      content,
      theme,
    } as UploadRawTokensFxPropsType),
  effect: createEffect(async ({ content, theme }: UploadRawTokensFxPropsType) => {
    return await downloadTheme(content, theme.mappings)
  }),
})

export const uploadRawTokensLoading = uploadRawTokensFx.pending

uploadRawTokensFx.doneData.watch((tokens) => {
  variablesChangedBatchEvent(tokens)
  toast.success('Токены успешно загружены')
})

uploadRawTokensFx.failData.watch((error) => toast.error(error.message, { autoClose: 5000 }))

forward({
  from: uploadRawTokensEvent,
  to: uploadRawTokensFx,
})
