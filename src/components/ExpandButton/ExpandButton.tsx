import React, { FC, useRef } from 'react'
import { UseButtonProps, useButton } from 'web-platform-alpha'
import { cn } from '@bem-react/classname'

import { EllipsesIcon } from '../../icons'

import './ExpandButton.css'

type ExpandButtonProps = UseButtonProps & {
  amount: number
  className?: string
}

export const cnExpandButton = cn('ExpandButton')

export const ExpandButton: FC<ExpandButtonProps> = ({ className, amount, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(props, ref)

  return (
    <button {...buttonProps} ref={ref} className={cnExpandButton(null, [className])}>
      <EllipsesIcon className={cnExpandButton('Icon')} />
      <span className={cnExpandButton('Text')}> See all {amount} tokens </span>
    </button>
  )
}
