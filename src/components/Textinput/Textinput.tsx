import React, { ChangeEvent, FC } from 'react'
import { Select, Input, Item, Switch } from 'react-figma-components'

import { TextinputBase, TextinputBaseProps, cnTextinput } from '.'

export type TextinputProps = TextinputBaseProps & {
  type: 'select' | 'boolean' | 'text'
  options?: Array<{
    value: string
    label: string
  }>
  value?: string
  onChange?: (event: ChangeEvent) => void
}

export const Textinput: FC<TextinputProps> = ({
  value,
  type,
  options = [],
  onChange,
  ...props
}) => {
  let Component: FC

  if (type === 'select' && options.length === 0) {
    throw new Error('select type should have options prop')
  }

  switch (type) {
    case 'select':
      Component = Select
      break
    case 'boolean':
      Component = Switch
      break
    case 'text':
      Component = Input
      break
    default:
      throw new Error('component type is not defined')
  }

  return (
    <TextinputBase {...props} className={cnTextinput({ [`type_${type}`]: Boolean(type) })}>
      {
        // @ts-ignore
        <Component onChange={onChange} value={value}>
          {type === 'select'
            ? options.map(({ value, label }) => <Item value={value}>{label}</Item>)
            : null}
        </Component>
      }
    </TextinputBase>
  )
}
