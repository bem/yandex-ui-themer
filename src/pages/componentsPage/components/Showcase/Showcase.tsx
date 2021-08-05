import React, { useState, FC, createElement } from 'react'
import { useStore } from 'effector-react'
import { cnTheme } from '@yandex/ui/Theme'

import { $cssVariables } from '../../../../model/css'

import { Showcases } from './Showcases'
import { $theme } from '../../../../model/themes'
import { $dark, darkToggle } from '../../../../model/dark'
import { $component } from '../../model'

import { EyeIconButton, SunIconButton } from '../../../../components/IconButton'

export type ShowcaseProps = {
  className: string
}

export const Showcase: FC<ShowcaseProps> = ({ className }) => {
  const [showDiff, setShowDiff] = useState(true)

  const { preset } = useStore($theme)
  const cssVariables = useStore($cssVariables)
  const component = useStore($component)
  const dark = useStore($dark)

  const handleSunIconClick = darkToggle
  const handleEyeIconClick = () => setShowDiff((prev) => !prev)

  return (
    <div className={cnTheme({ ...preset, dark }, [className])} style={showDiff ? cssVariables : {}}>
      <div className="Showcase-Content">
        {/* @ts-ignore */}
        {Showcases[component] && createElement(Showcases[component])}
      </div>
      <SunIconButton dark={dark} onPress={handleSunIconClick} className="Showcase-SunIcon" />
      <EyeIconButton
        dark={dark}
        onPress={handleEyeIconClick}
        close={!showDiff}
        className="Showcase-EyeIcon"
      />
    </div>
  )
}
