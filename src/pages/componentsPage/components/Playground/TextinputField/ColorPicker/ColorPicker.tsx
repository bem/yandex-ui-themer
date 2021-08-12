import React, { useState, useRef, useCallback, FC } from 'react'
import { ChromePicker } from 'react-color'
import { Popup } from '@yandex/ui/Popup/desktop/bundle'

import { metricaGoal } from '../../../../../../components/YaMetrika'

import './ColorPicker.css'

export type ColorPickerProps = {
  color: string
  onColorChange?: (color: string) => void
  shape?: 'circle' | 'square'
}

export const ColorPicker: FC<ColorPickerProps> = ({ color, onColorChange, shape = 'circle' }) => {
  const [visible, setVisible] = useState(false)

  const scopeRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    if (!onColorChange) {
      return
    }

    setVisible(true)
    metricaGoal('picker')
  }, [onColorChange])

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [])

  const handleColorChange = useCallback(
    (event) => {
      onColorChange?.(event)
      metricaGoal('change-tokens')
    },
    [onColorChange],
  )

  return (
    <div ref={scopeRef} className="ColorPicker">
      <div
        ref={anchorRef}
        onClick={handleClick}
        className={`ColorPicker-Preview ColorPicker-Preview_shape_${shape}`}
        style={{ background: color }}
      />
      <Popup
        direction="bottom-end"
        target="anchor"
        anchor={anchorRef}
        view="default"
        visible={visible}
        scope={scopeRef}
        onClose={handleClose}
      >
        <ChromePicker color={color} onChangeComplete={handleColorChange} />
      </Popup>
    </div>
  )
}
