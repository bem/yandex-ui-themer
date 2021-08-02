import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { cnTheme } from '@yandex/ui/Theme'

import { $cssVariables } from '../../../../model/css'

import { Showcases } from './Showcases'
import { $theme } from '../../../../model/themes'
import { $component } from '../../model'

export type ShowcaseProps = {
  className: string
}

export const Showcase: FC<ShowcaseProps> = ({ className }) => {
  const { preset } = useStore($theme)
  const cssVariables = useStore($cssVariables)
  const component = useStore($component)

  return (
    <div className={cnTheme(preset, [className])} style={cssVariables}>
      {/* @ts-ignore  */}
      {Showcases[component]?.()}
    </div>
  )
}
