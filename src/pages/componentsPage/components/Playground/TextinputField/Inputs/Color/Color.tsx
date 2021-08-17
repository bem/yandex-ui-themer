import React, { FC, useEffect, useState } from 'react'
import { cnTextinput } from '@yandex/ui/Textinput/Textinput'
import { withDebounceInput } from '@yandex/ui/withDebounceInput'
import { IconButton, Input } from 'react-figma-components'

import { convertColorObj } from '../../../../../../../utils/color'
import { ColorPicker } from '../../ColorPicker'
import { TokenType } from '../../../../../model'
import { combineHexAndAlpha } from '../../../../../../../utils/color'

export type ColorProps = TokenType & {
  handleLink: (token: string) => void
  handleColorChange: (color: string) => void
  type: 'color'
}

const DebounceInput = withDebounceInput(Input)

export const Color: FC<ColorProps> = ({
  label,
  handleLink,
  handleColorChange,
  color,
  hex,
  alpha,
  changed,
}) => {
  const [_hex, setHex] = useState(hex)
  const [_alpha, setAlpha] = useState(alpha)

  useEffect(() => {
    if (hex) {
      setHex(hex)
    }
    if (alpha) {
      setAlpha(alpha)
    }
  }, [hex, alpha])

  const handleInputChange = (hex: string, alpha: string) => {
    const color = combineHexAndAlpha(hex, alpha.replace('%', ''))
    handleColorChange(color)
  }

  const _handleColorChange = (color: any) => {
    const _color = convertColorObj(color)
    handleColorChange(_color)
  }

  return (
    <>
      <div className={cnTextinput({ type_color: true })}>
        <ColorPicker color={color} onColorChange={_handleColorChange} shape="square" />
        <DebounceInput
          className="Textinput-Hex"
          value={_hex}
          debounceTimeout={500}
          onChange={(event) => handleInputChange(event.target.value, _alpha)}
          maxLength={6}
        />
        <DebounceInput
          className="Textinput-Alpha"
          value={_alpha}
          debounceTimeout={500}
          onChange={(event) => handleInputChange(_hex, event.target.value)}
          maxLength={4}
        />
        <IconButton
          name="hyperlink"
          onPress={() => handleLink(label)}
          className="Textinput-BreakIcon"
        />
      </div>
    </>
  )
}
