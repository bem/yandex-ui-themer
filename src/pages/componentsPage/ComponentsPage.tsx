import React, { useState, FC } from 'react'
import { useStore } from 'effector-react'
import { cn } from '@bem-react/classname'

import { $theme } from '../../model/themes'

import './ComponentsPage.css'
import { Panels } from './components/Panels'
import { Playground } from './components/Playground'
import { Showcase } from './components/Showcase'

const cnComponentsPage = cn('ComponentsPage')

export const ComponentsPage = () => {
  const {
    preset,
    tokens: { globals, components },
  } = useStore($theme)
  const [selectedComponent, setSelectedComponent] = useState('overview')

  const panels = ['overview', ...Object.keys(components)]
  const handlePanelSelection = (panel: string) => {
    setSelectedComponent(panel)
  }

  return (
    <div className={cnComponentsPage()}>
      <Panels
        className={cnComponentsPage('Panels')}
        panels={panels}
        activePanel={selectedComponent}
        onPanelSelect={handlePanelSelection}
      />
      <Showcase className={cnComponentsPage('Showcase')} />
      <Playground className={cnComponentsPage('Playground')} />
    </div>
  )
}
