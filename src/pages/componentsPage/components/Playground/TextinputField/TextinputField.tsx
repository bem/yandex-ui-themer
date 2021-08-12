import React, { useState, useEffect, useCallback } from 'react'
import { useStore } from 'effector-react'
import { withDebounceInput } from '@yandex/ui/withDebounceInput'
import { Input, IconButton } from 'react-figma-components'
import { useHover } from 'web-platform-alpha'

import { isColor, convertColorObj, toHEXA } from '../../../../../utils/color'
import { getType } from '../../../../../utils/tokenType'
import { variablesChange } from '../../../../../model/designTokens'
import { TextinputBase, cnTextinput } from '../../../../../components/Textinput'
import { ColorPicker } from './ColorPicker'

import { metricaGoal } from '../../../../../components/YaMetrika'
import { $resolvedTokens } from '../../../../../model/resolvedTokens'

import './TextinputField.css'
import { tokenChange } from '../../../model'

const DebouncedInput = withDebounceInput(Input)

export const TextinputField: React.FC<{
  label: string
  defaultValue: string
  path: string[]
  description: string
  customTokens: string
  rawValue?: string
}> = ({ label, defaultValue, path, description, customTokens, rawValue }) => {
  const { isHovered, hoverProps } = useHover({ disabled: false })
  const resolvedTokens = useStore($resolvedTokens)
  const [value, setValue] = useState(customTokens)
  const token = resolvedTokens[label]?.value

  const isColorValue = isColor(token) || isColor(defaultValue)
  const colorValue = typeof token === 'string' ? token : defaultValue
  const [hex, alpha] = toHEXA(colorValue)
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
      const colorValue = convertColorObj(color)

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

  const handleLink = (token: string) => {
    tokenChange(token)
  }

  return (
    <TextinputBase
      label={label}
      tip={description}
      className={cnTextinput({ has_color: isColorValue })}
    >
      <div className={`TextinputField-Control ${isHovered ? 'isHovered' : ''}`} {...hoverProps}>
        {type === 'link' && (
          <div className={cnTextinput({ type_link: true })}>
            {isColorValue && <ColorPicker color={colorValue} shape="circle" />}
            <span>{label}</span>
            {isHovered && (
              <IconButton
                name="break"
                onPress={() => handleLink(label)}
                className="Textinput-BreakIcon"
              />
            )}
          </div>
        )}
        {type === 'color' && (
          <div className={cnTextinput({ type_color: true })}>
            <ColorPicker color={colorValue} onColorChange={handleColorChange} shape="square" />
            <span className="Textinput-Hex">{hex}</span>
            <span className="Textinput-Alpha">{alpha}</span>
            {isHovered && (
              <IconButton
                name="hyperlink"
                onPress={() => handleLink(label)}
                className="Textinput-BreakIcon"
              />
            )}
          </div>
        )}
        {type === 'text' && (
          <div className={cnTextinput({ type_text: true })}>
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
        )}
      </div>
    </TextinputBase>
  )
}
