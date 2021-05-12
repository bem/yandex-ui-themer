import React, { useState, FC, ChangeEvent } from 'react'
import { useStore } from 'effector-react'
import { cn } from '@bem-react/classname'

import { TextareaWithAutoResize } from '@yandex/ui/Textarea/desktop/bundle'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Spacer } from '@yandex/ui/Spacer/desktop'

import { uploadRawTokensEvent, $uploadRawTokensLoading } from './model'

const tokensDefault = `button:
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
`

export const cnCustomThemeDownloader = cn('CustomThemeDownloader')

export const CustomThemeDownloader: FC = () => {
  const progress = useStore($uploadRawTokensLoading)
  const [value, setValue] = useState(tokensDefault)

  const handleClick = () => uploadRawTokensEvent(value)
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)

  return (
    <form className={cnCustomThemeDownloader()}>
      Токены:
      <Spacer all={10} />
      <TextareaWithAutoResize
        view="default"
        size="m"
        value={value}
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
