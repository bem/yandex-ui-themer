import React, { FC } from 'react'

import { IconButtonBase, cnIconButtonBase, IconButtonBaseProps } from '../IconButtonBase'
import { CloseEyeIcon, OpenEyeIcon } from '../../../icons'

export const EyeIconButton: FC<IconButtonBaseProps & { close?: boolean }> = ({
  close,
  dark,
  ...props
}) => {
  return (
    <IconButtonBase dark={dark} tip={close ? 'Show changes' : 'Hide changes'} {...props}>
      {close ? (
        <CloseEyeIcon type={dark ? 'black' : 'white'} className={cnIconButtonBase('Icon')} />
      ) : (
        <OpenEyeIcon type={dark ? 'black' : 'white'} className={cnIconButtonBase('Icon')} />
      )}
    </IconButtonBase>
  )
}
