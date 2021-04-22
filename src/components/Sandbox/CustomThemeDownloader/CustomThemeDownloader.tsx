import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { TextareaWithAutoResize } from '@yandex/ui/Textarea/desktop/bundle'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Spacer } from '@yandex/ui/Spacer/desktop'

import { variablesChangedBatchEvent } from '../../../state/tokens'
import { downloadTheme } from '../../../api/downloadTheme'
import { MappingsType, VariablesType } from '../../../types'

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

export const CustomThemeDownloader: React.FC<{ mappings: MappingsType }> = ({ mappings }) => {
  const [value, setValue] = useState(tokensDefault)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(false)

  const tokenProcessing = () => {
    setProgress(true)
    setError('')

    const onError = (error: string) => {
      setProgress(false)
      toast.error(error, { autoClose: 5000 })
      setError(error)
    }

    const onSuccess = (tokens: VariablesType[]) => {
      variablesChangedBatchEvent(tokens)
      toast.success('Токены успешно загружены')
      setProgress(false)
    }

    downloadTheme(value, mappings, onError, onSuccess)
  }

  return (
    <form
      style={{
        margin: '0 14px 0 0',
      }}
    >
      Токены:
      <Spacer all={10} />
      <TextareaWithAutoResize
        state={error ? 'error' : undefined}
        hint={error}
        view="default"
        size="m"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Spacer all={10} />
      <Button view="action" size="m" progress={progress} onClick={tokenProcessing}>
        Загрузить
      </Button>
    </form>
  )
}
