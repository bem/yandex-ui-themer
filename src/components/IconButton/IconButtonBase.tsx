import React, { FC, HTMLProps, useRef } from 'react'
import { useButton, UseButtonProps } from 'web-platform-alpha'
import { cn } from '@bem-react/classname'
import { TooltipStateful } from '../../lib/lego/Tooltip'

import './IconButtonBase.css'

export type IconButtonBaseProps = HTMLProps<HTMLButtonElement> &
  UseButtonProps & {
    /**
     * @default false
     */
    dark?: boolean

    /**
     * Tip for tooltip
     */
    tip?: string
  }

export const cnIconButtonBase = cn('IconButtonBase')

export const IconButtonBase: FC<IconButtonBaseProps> = ({
  className,
  children,
  dark,
  tip,
  ...props
}) => {
  const ref = useRef(null)
  const { buttonProps } = useButton(props, ref)

  return (
    <TooltipStateful content={tip} dark={dark}>
      <button {...buttonProps} ref={ref} className={cnIconButtonBase({ dark }, [className])}>
        {children}
      </button>
    </TooltipStateful>
  )
}
