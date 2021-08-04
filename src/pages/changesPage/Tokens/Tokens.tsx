import { useStore } from 'effector-react'
import React, { ChangeEvent, FC, useState } from 'react'
import { Button, Switch, Textarea } from 'react-figma-components'
import { $cssText } from '../../../model/css'

import { rawTokensUpload, tokensUpdate, $tokensText } from '../../../model/tokensText'
import { tokensShare, $shareTokensDisabled } from '../../../model/share-tokens'

import './Tokens.css'

export type TokensProps = {}

export const Tokens: FC<TokensProps> = (props) => {
  const [format, setFormat] = useState<'yaml' | 'css'>('yaml')
  const tokensText = useStore($tokensText)
  const cssText = useStore($cssText)
  const shareDisabled = useStore($shareTokensDisabled)

  const handleSwitchChange = () =>
    setFormat((format) => {
      switch (format) {
        case 'yaml':
          return 'css'
        case 'css':
          return 'yaml'
        default:
          return 'css'
      }
    })

  const handleTextareaChange = (event: ChangeEvent<HTMLInputElement>) => {
    tokensUpdate(event.target.value)
  }

  const handleUploadClick = () => {
    rawTokensUpload()
  }

  const handlePushToCanvasClick = () => {}

  return (
    <div className="Tokens">
      <div className="Tokens-Header">
        <span>View code:</span> YAML
        <Switch
          checked={format !== 'yaml'}
          onChange={handleSwitchChange}
          className="Tokens-Switch"
        />
        CSS
      </div>
      <Textarea
        value={format === 'yaml' ? tokensText : cssText}
        onChange={handleTextareaChange}
        className="Tokens-Textinput"
        placeholder="Tokens"
      />
      <div className="Tokens-Buttons">
        <Button
          view="tertiary"
          onClick={tokensShare}
          disabled={shareDisabled}
          onPress={tokensShare}
          data-testid="share=button"
        >
          Share Theme
        </Button>
        <Button view="secondary" onPress={handleUploadClick}>
          Upload Theme
        </Button>
        <Button view="primary" onPress={handlePushToCanvasClick}>
          Push all to canvas
        </Button>
      </div>
    </div>
  )
}
