import React, { useCallback, FC, useMemo } from 'react'

import { TextinputBase } from '../../../../../components/Textinput'
import { metricaGoal } from '../../../../../components/YaMetrika'
import { variablesChange } from '../../../../../model/designTokens'
import { tokenChange, TokenType } from '../../../model'
import { Text, Color, Link } from './Inputs'
import { TextinputPrevious } from './TextinputPrevious'
import { throttle } from 'lodash';

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

  const inner = useMemo(() => {
    switch (props.type) {
        case 'text':
          return <Text handleChange={handleTextChange} {...props} />
        case 'color':
          return <Color handleLink={handleLink} handleColorChange={handleColorChange} {...props} />
        case 'link':
          return <Link handleLink={handleLink} {...props} />
      }
      // @ts-expect-error
  }, [props.type, props.defaultValue, props.color, props.colorValue, props.value]);

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
