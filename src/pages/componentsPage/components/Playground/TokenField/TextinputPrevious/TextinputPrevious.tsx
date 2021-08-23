import React, { FC } from 'react'
import { cn } from '@bem-react/classname'

import { TextinputBase, TextinputBaseProps } from '../../../../../../components/Textinput'
import { toHEXA } from '../../../../../../utils/color'

import './TextinputPrevious.css'

export const cnTextinputPrevious = cn('TextinputPrevious')

export type TextinputPreviousProps = Omit<TextinputBaseProps, 'label'> & {
  color: string
  handleClick: () => void
}

export const TextinputPrevious: FC<TextinputPreviousProps> = ({ color, handleClick, ...props }) => {
  const [hex, alpha] = toHEXA(color)

  return (
    <TextinputBase
      label="initial value"
      className={cnTextinputPrevious()}
      onClick={handleClick}
      {...props}
    >
      <div className={cnTextinputPrevious('Body')}>
        <span className={cnTextinputPrevious('Hex')}>{hex}</span>
        <span className={cnTextinputPrevious('Alpha')}>{alpha}</span>
      </div>
    </TextinputBase>
  )
}
