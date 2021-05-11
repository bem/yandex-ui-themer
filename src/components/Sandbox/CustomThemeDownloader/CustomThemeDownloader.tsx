import React, { useState, FC } from 'react'
import { useStore } from 'effector-react'

import { TextareaWithAutoResize } from '@yandex/ui/Textarea/desktop/bundle'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Spacer } from '@yandex/ui/Spacer/desktop'

import { uploadRawTokensEvent, uploadRawTokensLoading } from './model'

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

export const CustomThemeDownloader: FC = () => {
  const progress = useStore(uploadRawTokensLoading)
  const [value, setValue] = useState(tokensDefault)

  const handleClick = () => uploadRawTokensEvent(value)

  return (
    <form
      style={{
        margin: '0 14px 0 0',
      }}
    >
      Токены:
      <Spacer all={10} />
      <TextareaWithAutoResize
        view="default"
        size="m"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Spacer all={10} />
      <Button view="action" size="m" progress={progress} onClick={handleClick}>
        Загрузить
      </Button>
    </form>
  )
}
