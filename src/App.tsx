import React, { useState } from 'react'
import { useGate } from 'effector-react'
import { configureRootTheme } from '@yandex/ui/Theme'
import { TabsPanes } from '@yandex/ui/TabsPanes/desktop/bundle'
import { theme } from '@yandex/ui/Theme/presets/default'

import 'react-toastify/dist/ReactToastify.min.css'
import '@fontsource/inter'

import { Header, ActiveTabType } from './components/Header'
import { Divider } from './lib/lego/Divider'

import { ComponentsPage } from './pages/componentsPage'
import { ChangesPage } from './pages/changesPage'

import { variablesInitializationGate } from './model/designTokens'

import './App.css'

configureRootTheme({ theme })

export default () => {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('components')

  useGate(variablesInitializationGate)

  // useEffect(() => {
  //   window.onbeforeunload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault(
  //     return ''
  //   }
  // }, [])

  return (
    <div className="Site">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <Divider />
      <TabsPanes
        activePane={activeTab}
        panes={[
          { id: 'components', content: <ComponentsPage /> },
          { id: 'changes', content: <ChangesPage /> },
        ]}
      />
    </div>
  )
}
