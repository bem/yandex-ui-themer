import React from 'react'
import { useStore } from 'effector-react'
import { cn } from '@bem-react/classname'

import { $theme } from '../../model/themes'

import './ComponentsPage.css'
import { Panels } from './components/Panels'
import { Playground } from './components/Playground'
import { TokenEditor } from './components/TokenEditor'
import { Showcase } from './components/Showcase'
import { $component, $tokenPresent, componentChange } from './model'

const cnComponentsPage = cn('ComponentsPage')

export const ComponentsPage = () => {
  const {
    tokens: { components },
  } = useStore($theme)
  const component = useStore($component)
  const showTokenEditor = useStore($tokenPresent)

  const panels = ['overview', ...Object.keys(components)]
  const handlePanelSelection = (panel: string) => {
    componentChange(panel)
  }

  return (
    <div className={cnComponentsPage()}>
      <Panels
        className={cnComponentsPage('Panels')}
        panels={panels}
        activePanel={component}
        onPanelSelect={handlePanelSelection}
      />
      <Showcase className={cnComponentsPage('Showcase')} />
      {!showTokenEditor ? (
        <TokenEditor className={cnComponentsPage('TokenEditor')} />
      ) : (
        <Playground className={cnComponentsPage('Playground')} />
      )}
    </div>
  )
}
