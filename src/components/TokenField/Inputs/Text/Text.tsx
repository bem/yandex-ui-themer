import React, { ChangeEventHandler, FC, FocusEventHandler } from 'react'
import { withDebounceInput } from '@yandex-lego/components/withDebounceInput'
import { Input } from 'react-figma-components'

import { TokenBase } from '../../../../model/tokens'
import { cnTextinput } from '../../../../components/Textinput'

export type TextProps = TokenBase & {
  handleChange: ChangeEventHandler<HTMLInputElement>
  value: string
}

const DebounceInput = withDebounceInput(Input)

export const Text: FC<TextProps> = ({ label, value, handleChange }) => {
  const selectTextOnFocus: FocusEventHandler = (event) => {
    // @ts-ignore
    event.target.setSelectionRange(0, event.target.value.length)
  }
  return (
    <div className={cnTextinput({ type_text: true })}>
      <DebounceInput
        onChange={handleChange}
        onFocus={selectTextOnFocus}
        value={value}
        debounceTimeout={500}
        forceNotifyByEnter
        forceNotifyOnBlur
        data-testid={label}
        className="TextinputField-Input"
      />
    </div>
  )
}
