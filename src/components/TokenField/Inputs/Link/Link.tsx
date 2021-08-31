import React, { FC } from 'react'
import { cnTextinput } from '@yandex-lego/components/Textinput/Textinput'
import { IconButton } from 'react-figma-components'

import { ColorPicker } from '../../ColorPicker'
import { TokenType } from '../../../../model/tokens'

import './Link.css'

export type LinkProps = TokenType & {
  handleLink: (token: string) => void
  type: 'link'
}

export const Link: FC<LinkProps> = ({ label, link, isColor, colorValue, handleLink }) => {
  return (
    <div className={cnTextinput({ type_link: true })}>
      {isColor && <ColorPicker color={colorValue} shape="circle" className="Textinput-Picker" />}
      <span>{link}</span>
      <IconButton name="break" onPress={() => handleLink(label)} className="Textinput-BreakIcon" />
    </div>
  )
}
