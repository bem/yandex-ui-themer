import React, { useState, FC, createElement } from 'react'
import { useStore } from 'effector-react'

import { cnTheme } from '@yandex-lego/components/Theme'

import { $cssVariables } from '../../../../model/css'

import { Showcases } from './Showcases'
import { $theme } from '../../../../model/themes'
import { $dark, darkToggle } from '../../../../model/dark'
import { $component, $componentProps } from '../../model'

import { EyeIconButton, SunIconButton } from '../../../../components/IconButton'
import { ComponentWrapper } from '../ComponentWrapper/ComponentWrapper'
import { AllComponentsNames } from '../../../../utils/getComponentByName'
import { cn } from '@bem-react/classname'
import './Showcase.css'
import { $isCombine } from '../../../../model/combine'
import { getVariantsFromProps } from '../../../../utils/combinations'

export type ShowcaseProps = {
  className: string
}

const cnShowcase = cn('Showcase')

export const Showcase: FC<ShowcaseProps> = ({ className }) => {
  const [showDiff, setShowDiff] = useState(true)

  const { preset } = useStore($theme)
  const cssVariables = useStore($cssVariables)
  const component = useStore($component)
  const { currentProps, currentCombinedProps } = useStore($componentProps)
  const combine = useStore($isCombine)

  const dark = useStore($dark)

  const handleSunIconClick = darkToggle
  const handleEyeIconClick = () => setShowDiff((prev) => !prev)
  const componentNormalizedName = component[0].toUpperCase() + component.slice(1)

  const combinedVariants = combine ? getVariantsFromProps(currentProps, currentCombinedProps) : null

  return (
    <>
      <div
        className={cnTheme({ ...preset, dark }, [className])}
        style={showDiff ? cssVariables : {}}
      >
        {/* @ts-ignore */}
        {component === 'overview' ? (
          createElement(Showcases[component])
        ) : (
          <div className={cnShowcase('Preview')}>
            {combine ? (
              combinedVariants?.map((group) => {
                return (
                  <div className={cnShowcase('PreviewRow')}>
                    {group.map((variantProps) => {
                      return (
                        // @ts-ignore
                        <ComponentWrapper
                          __name={componentNormalizedName as AllComponentsNames}
                          {...variantProps}
                        />
                      )
                    })}
                  </div>
                )
              })
            ) : (
              // @ts-ignore
              <ComponentWrapper
                __name={componentNormalizedName as AllComponentsNames}
                {...currentProps}
              />
            )}
          </div>
        )}
      </div>
      <SunIconButton dark={dark} onPress={handleSunIconClick} className="SunIcon" />
      <EyeIconButton
        dark={dark}
        onPress={handleEyeIconClick}
        close={!showDiff}
        className="EyeIcon"
      />
    </>
  )
}
