import React, { FC } from 'react'

import { IconButtonBase, cnIconButtonBase, IconButtonBaseProps } from '../IconButtonBase'
import { SunIcon } from '../../../icons'

export const SunIconButton: FC<IconButtonBaseProps> = ({ dark, ...props }) => {
  const type = dark ? 'black' : 'white'
  const tip = dark ? 'Lighten background' : 'Darkent background'

  return (
    <IconButtonBase dark={dark} tip={tip} {...props}>
      <SunIcon type={type} className={cnIconButtonBase('Icon')} />
    </IconButtonBase>
  )
}
