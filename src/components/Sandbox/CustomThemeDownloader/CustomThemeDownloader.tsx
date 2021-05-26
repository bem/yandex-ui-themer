import React, { FC, ChangeEvent } from 'react'
import { useStore } from 'effector-react'

import { TextareaWithAutoResize } from '@yandex/ui/Textarea/desktop/bundle'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Spacer } from '@yandex/ui/Spacer/desktop'

import { rawTokensUpload, $uploadRawTokensLoading, $tokensText, tokensUpdate } from './model'

export const CustomThemeDownloader: FC = () => {
  const progress = useStore($uploadRawTokensLoading)
  const tokens = useStore($tokensText)

  const handleClick = () => rawTokensUpload()
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => tokensUpdate(event.target.value)

  return (
    <form className="CustomThemeDownloader">
      Токены:
      <Spacer all={10} />
      <TextareaWithAutoResize
        view="default"
        size="m"
        value={tokens}
        onChange={handleChange}
        data-testid="tokens-textarea"
      />
      <Spacer all={10} />
      <Button
        view="action"
        size="m"
        progress={progress}
        onClick={handleClick}
        data-testid="tokens-upload-button"
      >
        Загрузить
      </Button>
    </form>
  )
}
