import React, { useCallback, FC } from 'react'

import { TextinputBase } from '../../../../../components/Textinput'
import { metricaGoal } from '../../../../../components/YaMetrika'
import { variablesChange } from '../../../../../model/designTokens'
import { tokenChange, TokenType } from '../../../model'
import { Text, Color, Link } from './Inputs'
import { TextinputPrevious } from './TextinputPrevious'

export type TextinputProps = TokenType & {}

export const TextinputField: FC<TextinputProps> = (props) => {
  const { label, description, type, path, defaultValue, changed } = props

  const handleTextChange = useCallback(
    (event) => {
      variablesChange({
        path,
        name: label,
        value: event.target.value,
        changed: event.target.value !== defaultValue,
        type,
      })
      metricaGoal('change-tokens')
    },
    [defaultValue, label, path, type],
  )

  const handleColorChange = useCallback(
    (color) => {
      variablesChange({
        path,
        name: label,
        value: color,
        changed: color !== defaultValue,
        type: 'color',
      })
    },
    [defaultValue, label, path],
  )

  const handleLink = (token: string) => {
    tokenChange(token)
  }

  const handleClear = useCallback(() => {
    variablesChange({
      path,
      name: label,
      value: defaultValue,
      changed: false,
      type: 'color',
    })
  }, [defaultValue, label, path])

  let inner
  switch (props.type) {
    case 'text':
      inner = <Text handleChange={handleTextChange} {...props} />
      break
    case 'color':
      inner = <Color handleLink={handleLink} handleColorChange={handleColorChange} {...props} />
      break
    case 'link':
      inner = <Link handleLink={handleLink} {...props} />
      break
  }

  return (
    <>
      <TextinputBase label={label} tip={description}>
        {inner}
      </TextinputBase>
      {type === 'color' && changed && (
        <TextinputPrevious color={defaultValue} handleClick={handleClear} />
      )}
    </>
  )
}
