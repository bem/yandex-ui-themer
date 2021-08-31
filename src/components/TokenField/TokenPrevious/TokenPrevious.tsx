import React, { FC } from 'react'
import { cn } from '@bem-react/classname'

import { TextinputBase, TextinputBaseProps } from '../../../components/Textinput'
import { toHEXA } from '../../../utils/color'

import './TokenPrevious.css'

export const cnTokenPrevious = cn('TokenPrevious')

export type TokenPreviousProps = Omit<TextinputBaseProps, 'label'> & {
  color: string
  handleClick: () => void
}

export const TokenPrevious: FC<TokenPreviousProps> = ({ color, handleClick, ...props }) => {
  const [hex, alpha] = toHEXA(color)

  return (
    <TextinputBase
      label="initial value"
      className={cnTokenPrevious()}
      onClick={handleClick}
      {...props}
    >
      <div className={cnTokenPrevious('Body')}>
        <span className={cnTokenPrevious('Hex')}>{hex}</span>
        <span className={cnTokenPrevious('Alpha')}>{alpha}</span>
      </div>
    </TextinputBase>
  )
}
