import React, { ReactNode, FC, MouseEventHandler } from 'react'
import { cn } from '@bem-react/classname'

import { UnionIcon } from '../../icons'

import './Panel.css'

export const cnPanel = cn('Panel')

export type PanelProps = {
  children?: ReactNode
  className?: string
  onClick?: MouseEventHandler
  active?: boolean
}

export const Panel: FC<PanelProps> = ({ children, className, active, ...props }) => (
  <div className={cnPanel({ active }, [className])} {...props}>
    <UnionIcon className={cnPanel('Icon')} />
    <span className={cnPanel('Label')}>{children}</span>
  </div>
)
