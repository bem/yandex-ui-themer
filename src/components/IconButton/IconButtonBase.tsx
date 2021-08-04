import React, { FC, HTMLProps, useRef } from 'react'
import { useButton, UseButtonProps } from 'web-platform-alpha'
import { cn } from '@bem-react/classname'

import './IconButtonBase.css'

export type IconButtonBaseProps = HTMLProps<HTMLButtonElement> &
  UseButtonProps & {
    /**
     * @default false
     */
    dark?: boolean
  }

export const cnIconButtonBase = cn('IconButtonBase')

export const IconButtonBase: FC<IconButtonBaseProps> = ({
  className,
  children,
  dark,
  ...props
}) => {
  const ref = useRef(null)
  const { buttonProps } = useButton(props, ref)

  return (
    <button {...buttonProps} ref={ref} className={cnIconButtonBase({ dark }, [className])}>
      {children}
    </button>
  )
}
