import React, { useState } from 'react'
import { useGate } from 'effector-react'
import { configureRootTheme } from '@yandex/ui/Theme'
import { TabsPanes } from '@yandex/ui/TabsPanes/desktop/bundle'
import { theme } from '@yandex/ui/Theme/presets/default'

import { ToastContainer, cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import 'animate.css'
import '@fontsource/inter'

import { Header, ActiveTabType } from './components/Header'
import { Divider } from './lib/lego/Divider'

import { ComponentsPage } from './pages/componentsPage'
import { ChangesPage } from './pages/changesPage'

import { variablesInitializationGate } from './model/designTokens'
import { viewInitializationGate } from './model/view'

import './App.css'
import './Toastify.css'

configureRootTheme({ theme })

const Fade = cssTransition({
  enter: 'animate__animated animate__fadeIn',
  exit: 'animate__animated animate__fadeOut',
})

export default () => {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('components')

  useGate(variablesInitializationGate)
  useGate(viewInitializationGate)

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
      <ToastContainer
        transition={Fade}
        autoClose={2000}
        position="bottom-center"
        // closeOnClick={false}
        closeButton={false}
        limit={1}
        hideProgressBar={true}
      />
    </div>
  )
}
