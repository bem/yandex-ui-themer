import React, { FC, ReactNode, useRef } from 'react'
import { cn } from '@bem-react/classname'

import { TipIcon } from '../../icons'
import { TooltipStateful } from '../../lib/lego/Tooltip'

import './Textinput.css'

const cnTextinput = cn('Textinput')

export type TextinputProps = {
  label: string
  children?: ReactNode
  className?: string
  tip?: string
}

export const Textinput: FC<TextinputProps> = ({ children, className, tip, label }) => {
  const iconRef = useRef<SVGSVGElement>(null)

  return (
    <div className={cnTextinput({ has_tip: Boolean(tip) }, [className])}>
      {tip && (
        <TooltipStateful content={tip}>
          <span>
            <TipIcon className={cnTextinput('TipIcon')} />
          </span>
        </TooltipStateful>
      )}
      <span className={cnTextinput('Label')}>{label}</span>
      <div className={cnTextinput('Body')}>{children}</div>
    </div>
  )
}
