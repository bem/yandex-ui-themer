import React, { FC } from 'react'
import { cn } from '@bem-react/classname'

import { TextinputBase, TextinputBaseProps } from '../../../../../../components/Textinput'
import { toHEXA } from '../../../../../../utils/color'

import './TextinputPrevious.css'

export const cnTextinputPrevious = cn('TextinputPrevious')

export type TextinputPreviousProps = Omit<TextinputBaseProps, 'label'> & {
  color: string
}

export const TextinputPrevious: FC<TextinputPreviousProps> = ({ color, ...props }) => {
  const [hex, alpha] = toHEXA(color)

  return (
    <TextinputBase label="initial value" className={cnTextinputPrevious()}>
      <div className={cnTextinputPrevious('Body')}>
        <span className={cnTextinputPrevious('Hex')}>{hex}</span>
        <span className={cnTextinputPrevious('Alpha')}>{alpha}</span>
      </div>
    </TextinputBase>
  )
}
