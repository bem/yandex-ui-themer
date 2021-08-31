import React, { useState, useRef, useCallback, FC, useMemo } from 'react'
import { ChromePicker } from 'react-color'
import { Popup } from '@yandex-lego/components/Popup/desktop/bundle'

import { metricaGoal } from '../../../components/YaMetrika'

import './ColorPicker.css'

export type ColorPickerProps = {
  color: string
  onChange?: (color: string) => void
  shape?: 'circle' | 'square'
  className?: string
}

export const ColorPicker: FC<ColorPickerProps> = ({
  color,
  onChange,
  shape = 'circle',
  className,
}) => {
  const [visible, setVisible] = useState(false)

  const scopeRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    if (!onChange) {
      return
    }

    setVisible(true)
    metricaGoal('picker')
  }, [onChange])

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [])

  const handleColorChange = useCallback(
    (event) => {
      onChange?.(event)
      metricaGoal('change-tokens')
    },
    [onChange],
  )

  const backgroundColorStyle = useMemo(() => ({ background: color }), [color])

  return (
    <div ref={scopeRef} className={`ColorPicker ${className ? className : ''}`}>
      <div
        ref={anchorRef}
        onClick={handleClick}
        className={`ColorPicker-Preview ColorPicker-Preview_shape_${shape}`}
        style={backgroundColorStyle}
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
        <ChromePicker color={color} onChange={handleColorChange} />
      </Popup>
    </div>
  )
}
