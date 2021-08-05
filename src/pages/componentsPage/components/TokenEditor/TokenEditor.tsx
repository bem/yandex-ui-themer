import React, { FC } from 'react'
import { cn } from '@bem-react/classname'
import { Icon, Input, Textarea } from 'react-figma-components'

import { Divider } from '../../../../lib/lego/Divider'
import './TokenEditor.css'

export const cnTokenEditor = cn('TokenEditor')

export type TokenEditorProps = {
  className?: string
}

export const TokenEditor: FC<TokenEditorProps> = ({ className, ...props }) => {
  return (
    <div className={cnTokenEditor(null, [className])} {...props}>
      <div className={cnTokenEditor('Header')}>
        <span>Edit token</span>
        <button>
          <Icon />
        </button>
      </div>
      <Divider />
      <div className={cnTokenEditor('Body')}>
        <Input />
        <Textarea />
        <Divider />
      </div>
    </div>
  )
}
