import React, { useState } from 'react'

import { variablesChangedBatch } from '../../Sandbox/Sandbox.model'

import { TextareaWithAutoResize } from '@yandex/ui/Textarea/desktop/bundle'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Spacer } from '@yandex/ui/Spacer/desktop'

export const CustomThemeDownloader: React.FC<any> = () => {
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
          value: "#ecb6ea"`

    const [value, setValue] = useState(tokensDefault)
    const [error, setError] = useState('')
    const [progress, setProgress] = useState(false)

    const tokenProcessing = () => {
      setProgress(true)
      setError('')

      const body = JSON.stringify({
        config: {
          output: {
            css: {
              transforms: ['name/cti/kebab'],
              buildPath: './themes',
              files: [
                {
                  destination: 'tokens.json',
                  format: 'json/extended',
                },
              ],
            },
          },
        },
        tokens: {
          language: 'yaml',
          content: value
        }
      })

      fetch('https://themebox.now.sh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
        .then(response => response.json())
        .then(response => {
          if (response.error) {
            setProgress(false)
            setError(response.error)
            return
          }

          const res = JSON.parse(response.data[0].content)
          const tokens = Object.entries(res).map(([_, item]:any) => {
            return {
                path: item.path,
                name: item.name,
                value: item.value,
                changed: true,
              }
          })

          variablesChangedBatch(tokens)
          setProgress(false)
        });
    }

    return (
      <form style={{
        margin: '0 14px 0 0'
      }}>
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
        <Button view="action" size="m" progress={progress} onClick={tokenProcessing}>Загрузить</Button>
      </form>
    )
  }
