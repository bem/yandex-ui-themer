import React, { FC } from 'react'

import { IconButtonBase, cnIconButtonBase, IconButtonBaseProps } from '../IconButtonBase'
import { CloseEyeIcon, OpenEyeIcon } from '../../../icons'

export const EyeIconButton: FC<IconButtonBaseProps & { close?: boolean }> = ({
  close,
  dark,
  ...props
}) => {
  const type = dark ? 'black' : 'white'
  const tip = close ? 'Show changes' : 'Hide changes'

  return (
    <IconButtonBase dark={dark} tip={tip} {...props}>
      {close ? (
        <CloseEyeIcon type={type} className={cnIconButtonBase('Icon')} />
      ) : (
        <OpenEyeIcon type={type} className={cnIconButtonBase('Icon')} />
      )}
    </IconButtonBase>
  )
}
