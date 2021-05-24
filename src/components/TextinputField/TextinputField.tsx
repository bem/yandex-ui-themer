import React, { useState, useEffect, useCallback } from 'react'
import { useStore } from 'effector-react'
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
import { $resolvedTokens } from '../../model/cssVariables'

import './TextinputField.css'
import { extractParams } from '../../utils/resolveTokens'

export const cnTextinputField = cn('TextinputField')

export const TextinputField: React.FC<{
  label: string
  defaultValue: string
  path: string[]
  description: string
  customTokens: string
  rawValue?: string
}> = ({ label, defaultValue, path, description, customTokens, rawValue }) => {
  const resolvedTokens = useStore($resolvedTokens)
  const [val, setVal] = useState(customTokens)
  const token = resolvedTokens[label]

  const isColorValue = isColor(token) || isColor(defaultValue)
  const colorValue = token || defaultValue
  const isChanged = defaultValue !== val

  // Update internal value when showcase is changed.
  useEffect(() => {
    console.log(rawValue)
    setVal(rawValue || customTokens || defaultValue)
  }, [defaultValue, customTokens, rawValue])

  const handleClearClick = useCallback(() => {
    setVal(defaultValue)
    variablesChangedEvent({
      path,
      name: label,
      value: defaultValue,
      changed: false,
    })
    metricaGoal('clear-textinput')
  }, [defaultValue, label, path])

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
        changed: colorValue !== defaultValue,
      })
    },
    [path, defaultValue, label],
  )

  const handleChange = useCallback(
    (event) => {
      setVal(event.target.value)
      variablesChangedEvent({
        path,
        name: label,
        value: event.target.value,
        changed: event.target.value !== defaultValue,
      })
      metricaGoal('change-tokens')
    },
    [path, defaultValue, label],
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
          hint={isChanged ? `Оригинальное значение - ${defaultValue}` : ''}
          className={cnTextinputField('Input')}
        />
        {isColorValue && <ColorPicker color={colorValue} onColorChange={handleColorChange} />}
      </div>
    </ListTile>
  )
}
