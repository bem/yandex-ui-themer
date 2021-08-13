import React, { FC, MouseEventHandler } from 'react'
import { cn } from '@bem-react/classname'

import './IconBack.css'

export const cnIconBack = cn('IconBack')

export const IconBack: FC<{
  onClick: MouseEventHandler<HTMLSpanElement>
  className?: string
}> = ({ onClick, className }) => (
  <span onClick={onClick} className={cnIconBack(null, [className])}>
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        d="M3.713 9a.75.75 0 0 1-.697-1.026l1.862-4.705a.75.75 0 0 1 1.318-.145l.9 1.328a9 9 0 1 1-3.939 9.234 1 1 0 0 1 1.966-.373 7 7 0 1 0 3.096-7.205l1.167 1.721A.75.75 0 0 1 8.766 9H3.712z"
        fill="currentColor"
      />
    </svg>
  </span>
)
