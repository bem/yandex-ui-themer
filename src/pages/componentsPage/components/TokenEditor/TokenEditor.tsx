import React, { FC } from 'react'
import { useStore } from 'effector-react'
import { cn } from '@bem-react/classname'
import { Button, Icon, Input, Switch, Textarea } from 'react-figma-components'

import { Divider } from '../../../../lib/lego/Divider'
import { TooltipStateful } from '../../../../lib/lego/Tooltip'
import { $token, tokenReset } from '../../model'
import { TipIcon } from '../../../../icons'
import './TokenEditor.css'

export const cnTokenEditor = cn('TokenEditor')

export type TokenEditorProps = {
  className?: string
}

export const TokenEditor: FC<TokenEditorProps> = ({ className, ...props }) => {
  const token = useStore($token)

  return (
    <div className={cnTokenEditor(null, [className])} {...props}>
      <div className={cnTokenEditor('Header')}>
        <span>Edit token</span>
        <Icon
          name="close"
          color="black"
          onClick={tokenReset}
          className={cnTokenEditor('CloseIcon')}
        />
      </div>
      <Divider />
      <div className={cnTokenEditor('Description')}>
        <Input value={token} readOnly />
        <Textarea readOnly />
      </div>
      <Divider />
      <div className={cnTokenEditor('Controls')}>
        <div className={cnTokenEditor('Header')}>
          <span>Properties</span>
          <div className={cnTokenEditor('Switch')}>
            <Switch />
            <span>Inheritance</span>
            <TooltipStateful content="You can use formulas in “color{} h{} s{} l{} a{}” format ">
              <span>
                <TipIcon className="" />
              </span>
            </TooltipStateful>
          </div>
        </div>
        <div className={cnTokenEditor('Input')}></div>
        <div className={cnTokenEditor('Actions')}>
          <Button view="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
