import React, { FC, ChangeEvent } from 'react'
import { useStore } from 'effector-react'
import { cn } from '@bem-react/classname'

import { TextareaWithAutoResize } from '@yandex/ui/Textarea/desktop/bundle'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Spacer } from '@yandex/ui/Spacer/desktop'

import {
  uploadRawTokensEvent,
  $uploadRawTokensLoading,
  $tokensText,
  updateTokensEvent,
} from './model'

export const cnCustomThemeDownloader = cn('CustomThemeDownloader')

export const CustomThemeDownloader: FC = () => {
  const progress = useStore($uploadRawTokensLoading)
  const tokens = useStore($tokensText)

  const handleClick = () => uploadRawTokensEvent()
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    updateTokensEvent(event.target.value)

  return (
    <form className={cnCustomThemeDownloader()}>
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
