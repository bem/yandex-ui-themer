import React, { useState, useRef, useCallback, FC } from 'react'
import { ChromePicker } from 'react-color'
import { Popup } from '@yandex/ui/Popup/desktop/bundle'
import { cn } from '@bem-react/classname'

import { metricaGoal } from '../../YaMetrika'

import './ColorPicker.css'

export type ColorPickerProps = {
  color: string
  onColorChange: (color: string) => void
}

export const cnColorPicker = cn('ColorPicker')

export const ColorPicker: FC<ColorPickerProps> = ({ color, onColorChange }) => {
  const [visible, setVisible] = useState(false)

  const scopeRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    setVisible(true)
    metricaGoal('picker')
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [])

  const handleColorChange = useCallback(
    (event) => {
      onColorChange(event)
      metricaGoal('change-tokens')
    },
    [onColorChange],
  )

  return (
    <div ref={scopeRef} className={cnColorPicker()}>
      <div
        ref={anchorRef}
        onClick={handleClick}
        className={cnColorPicker('Preview')}
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
