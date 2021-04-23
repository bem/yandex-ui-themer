import React from 'react'
import { useGate } from 'effector-react'
import { configureRootTheme } from '@yandex/ui/Theme'
import { theme } from '@yandex/ui/Theme/presets/default'

import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { Header } from './components/Header'
import { Sandbox } from './components/Sandbox/Sandbox'

import { variablesInitializationGate } from './model/tokens'

import './App.css'

configureRootTheme({ theme })

export default () => {
  useGate(variablesInitializationGate)

  return (
    <div className="Site">
      <Header />
      <div className="Content">
        <Sandbox />
      </div>
      <ToastContainer transition={Slide} autoClose={2000} position="bottom-right" />
    </div>
  )
}
