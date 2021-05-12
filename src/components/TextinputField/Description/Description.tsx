import React, { FC } from 'react'
import { cn } from '@bem-react/classname'
import { Badge } from '@yandex/ui/Badge'

import './Description.css'

export type DescriptionProps = {
  description: string
}

export const cnDescription = cn('Description')

export const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <div className={cnDescription('Wrapper')}>
      <Badge className={cnDescription('Trigger')} content="?" textColor="#fff" color="#535353" />
      <span className={cnDescription('Popover')}>{description}</span>
    </div>
  )
}
