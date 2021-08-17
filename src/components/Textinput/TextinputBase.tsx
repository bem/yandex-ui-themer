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
  onClick?: () => void
}

export const TextinputBase: FC<TextinputBaseProps> = ({
  children,
  className,
  tip,
  label,
  onClick,
}) => {
  return (
    <div className={cnTextinput({ has_tip: Boolean(tip) }, [className])} onClick={onClick}>
      <div className={cnTextinput('Tip')}>
        {tip && (
          <TooltipStateful content={tip}>
            <span>
              <TipIcon className={cnTextinput('TipIcon')} />
            </span>
          </TooltipStateful>
        )}
        <span className={cnTextinput('Label')}>{label}</span>
      </div>
      <div className={cnTextinput('Body')}>{children}</div>
    </div>
  )
}
