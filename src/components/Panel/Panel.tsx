import React, { ReactNode, FC, MouseEventHandler, useRef } from 'react'
import { cn } from '@bem-react/classname'

import { UnionIcon } from '../../icons'

import './Panel.css'
import { useFocusable, UseFocusableProps } from 'web-platform-alpha'

export const cnPanel = cn('Panel')

export type PanelProps = UseFocusableProps & {
  className?: string
  onClick?: MouseEventHandler
  active?: boolean
}

export const Panel: FC<PanelProps> = (props) => {
  const { children, className, active, ...restProps } = props
  const ref = useRef<HTMLButtonElement>(null)
  const { focusableProps } = useFocusable(props, ref)

  return (
    <button
      className={cnPanel({ active }, [className])}
      ref={ref}
      {...focusableProps}
      {...restProps}
    >
      <UnionIcon className={cnPanel('Icon')} />
      <span className={cnPanel('Label')}>{children}</span>
    </button>
  )
}
