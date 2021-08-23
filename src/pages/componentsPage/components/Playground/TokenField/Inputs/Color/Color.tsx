import React, { FC, useEffect, useState, useCallback } from 'react'
import { cnTextinput } from '@yandex-lego/components/Textinput/Textinput'
import { withDebounceInput } from '@yandex-lego/components/withDebounceInput'
import { IconButton, Input } from 'react-figma-components'
import { debounce } from 'lodash'

import { convertColorObj } from '../../../../../../../utils/color'
import { ColorPicker } from '../../ColorPicker'
import { TokenType } from '../../../../../model'
import { combineHexAndAlpha } from '../../../../../../../utils/color'

import './Color.css'

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
  const [_color, setColor] = useState(color)

  const handleColorChangeDebounced = useCallback(debounce(handleColorChange, 100), [
    handleColorChange,
  ])

  useEffect(() => {
    if (hex) {
      setHex(hex)
    }
    if (alpha) {
      setAlpha(alpha)
    }
    if (color) {
      setColor(color)
    }
  }, [hex, alpha, color])

  const handleInputChange = useCallback(
    (hex: string, alpha: string) => {
      const color = combineHexAndAlpha(hex, alpha.replace('%', ''))
      handleColorChange(color)
    },
    [handleColorChange],
  )

  const _handleColorChange = useCallback(
    (color: any) => {
      const _color = convertColorObj(color)

      setColor(_color)
      handleColorChangeDebounced(_color)
    },
    [handleColorChangeDebounced],
  )

  const handleLinkHandler = useCallback(() => handleLink(label), [label, handleLink])
  const hexChangeHandler = useCallback((event) => handleInputChange(event.target.value, _alpha), [
    _alpha,
    handleInputChange,
  ])
  const alphaChangeHandler = useCallback((event) => handleInputChange(_hex, event.target.value), [
    _hex,
    handleInputChange,
  ])

  return (
    <>
      <div className={cnTextinput({ type_color: true })}>
        <ColorPicker color={_color} onChange={_handleColorChange} className="Textinput-Picker" />
        <DebounceInput
          className="Textinput-Hex"
          value={_hex}
          debounceTimeout={500}
          onChange={hexChangeHandler}
          maxLength={6}
        />
        <DebounceInput
          className="Textinput-Alpha"
          value={_alpha}
          debounceTimeout={500}
          onChange={alphaChangeHandler}
          maxLength={4}
        />
        <IconButton name="hyperlink" onPress={handleLinkHandler} className="Textinput-BreakIcon" />
      </div>
    </>
  )
}
