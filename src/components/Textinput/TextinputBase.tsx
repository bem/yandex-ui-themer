import React, { FC, ReactNode } from 'react'
import { cn } from '@bem-react/classname'

import { TipIcon } from '../../icons'
import { TooltipStateful } from '../../lib/lego/Tooltip'

import './TextinputBase.css'

export const cnTextinput = cn('Textinput')

export type TextinputBaseProps = {
  label: string
  children?: ReactNode
  className?: string
  tip?: string
}

export const TextinputBase: FC<TextinputBaseProps> = ({ children, className, tip, label }) => {
  return (
    <div className={cnTextinput({ has_tip: Boolean(tip) }, [className])}>
      <TooltipStateful content={tip}>
        <div className={cnTextinput('Tip')}>
          {tip && (
            <span>
              <TipIcon className={cnTextinput('TipIcon')} />
            </span>
          )}
          <span className={cnTextinput('Label')}>{label}</span>
        </div>
      </TooltipStateful>
      <div className={cnTextinput('Body')}>{children}</div>
    </div>
  )
}
