import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'
import { ListTile } from '@yandex/ui/ListTile/desktop'
import { Text } from '@yandex/ui/Text/bundle'
import { cn } from '@bem-react/classname'

import { isColor } from '../../utils/isColor'
import { variablesChangedEvent } from '../../model/tokens'
import { IconBack } from '../IconBack'
import { ColorPicker } from './ColorPicker'
import { Description } from './Description'

import { metricaGoal } from '../YaMetrika'

import './TextinputField.css'

export const cnTextinputField = cn('TextinputField')

export const TextinputField: React.FC<{
  label: string
  value: string
  path: string[]
  description: string
  customTokens: string
}> = ({ label, value, path, description, customTokens }) => {
  const [val, setVal] = useState(customTokens)

  const isColorValue = isColor(value)
  const isChanged = value !== val

  // Update internal value when showcase is changed.
  useEffect(() => {
    setVal(customTokens || value)
  }, [value, customTokens])

  const handleClearClick = useCallback(() => {
    setVal(value)
    variablesChangedEvent({
      path,
      name: label,
      value: value,
      changed: false,
    })
    metricaGoal('clear-textinput')
  }, [value, label, path])

  const handleColorChange = useCallback(
    (color) => {
      let colorValue = ''

      // TODO: Move to util.
      if (color.source === 'rgb') {
        colorValue = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      } else if (color.source === 'hsl') {
        colorValue = `hsla(${color.hsl.h}, ${color.hsl.s}, ${color.hsl.l}, ${color.hsl.a})`
      } else {
        colorValue = color.hex
      }

      setVal(colorValue)
      variablesChangedEvent({
        path,
        name: label,
        value: colorValue,
        changed: colorValue !== value,
      })
    },
    [path, value, label],
  )

  const handleChange = useCallback(
    (event) => {
      setVal(event.target.value)
      variablesChangedEvent({
        path,
        name: label,
        value: event.target.value,
        changed: event.target.value !== value,
      })
      metricaGoal('change-tokens')
    },
    [path, value, label],
  )

  return (
    <ListTile
      leftSpace="m"
      rightSpace="m"
      alignItems="center"
      leading={
        <div className={cnTextinputField('Label')}>
          <Text typography="control-m" color="secondary">
            {label}:{' '}
          </Text>
          {description && <Description description={description} />}
        </div>
      }
    >
      <div className={cnTextinputField('Control')}>
        <Textinput
          debounceTimeout={500}
          onChange={handleChange}
          iconRight={isChanged ? <IconBack onClick={handleClearClick} /> : <></>}
          view="default"
          size="s"
          value={val}
          hint={isChanged ? `Оригинальное значение - ${value}` : ''}
          className={cnTextinputField('Input')}
        />
        {isColorValue && <ColorPicker color={val} onColorChange={handleColorChange} />}
      </div>
    </ListTile>
  )
}
