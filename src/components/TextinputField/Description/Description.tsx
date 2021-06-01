import React, { FC } from 'react'
import { Badge } from '@yandex/ui/Badge'

import './Description.css'

export type DescriptionProps = {
  description: string
}

export const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="Description-Wrapper">
      <Badge className="Description-Trigger" content="?" textColor="#fff" color="#535353" />
      <span className="Description-Popover">{description}</span>
    </div>
  )
}
