import React, { useState, useEffect, useCallback } from 'react'
import { useStore } from 'effector-react'
import { withDebounceInput } from '@yandex/ui/withDebounceInput'
import { Input } from 'react-figma-components'

import { isColor } from '../../utils/isColor'
import { getType } from '../../utils/tokenType'
import { variablesChange } from '../../model/designTokens'
import { TextinputBase, cnTextinput } from '../Textinput'
import { ColorPicker } from './ColorPicker'

import { metricaGoal } from '../YaMetrika'
import { $resolvedTokens } from '../../model/resolvedTokens'

import './TextinputField.css'

const DebouncedInput = withDebounceInput(Input)

export const TextinputField: React.FC<{
  label: string
  defaultValue: string
  path: string[]
  description: string
  customTokens: string
  rawValue?: string
}> = ({ label, defaultValue, path, description, customTokens, rawValue }) => {
  const resolvedTokens = useStore($resolvedTokens)
  const [value, setValue] = useState(customTokens)
  const token = resolvedTokens[label]?.value

  const isColorValue = isColor(token) || isColor(defaultValue)
  const colorValue = typeof token === 'string' ? token : defaultValue
  const isChanged = defaultValue !== value
  const type = getType(value)

  // Update internal value when showcase is changed.
  useEffect(() => {
    setValue(rawValue || customTokens || defaultValue)
  }, [defaultValue, customTokens, rawValue])

  const handleClearClick = useCallback(() => {
    setValue(defaultValue)
    variablesChange({
      path,
      name: label,
      value: defaultValue,
      changed: false,
      type: getType(defaultValue),
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

      setValue(colorValue)
      variablesChange({
        path,
        name: label,
        value: colorValue,
        changed: colorValue !== defaultValue,
        type: 'color',
      })
    },
    [path, defaultValue, label],
  )

  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value)
      variablesChange({
        path,
        name: label,
        value: event.target.value,
        changed: event.target.value !== defaultValue,
        type: getType(event.target.value),
      })
      metricaGoal('change-tokens')
    },
    [path, defaultValue, label],
  )

  return (
    <TextinputBase
      label={label}
      tip={description}
      className={cnTextinput({ has_color: isColorValue })}
    >
      <div className="TextinputField-Control">
        {isColorValue && (
          <ColorPicker
            color={colorValue}
            onColorChange={handleColorChange}
            shape={type === 'link' ? 'circle' : 'square'}
          />
        )}
        <DebouncedInput
          onChange={handleChange}
          value={value}
          debounceTimeout={500}
          forceNotifyByEnter
          forceNotifyOnBlur
          data-testid={label}
          className="TextinputField-Input"
        />
      </div>
    </TextinputBase>
  )
}
