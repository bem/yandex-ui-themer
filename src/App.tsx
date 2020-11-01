import React from 'react'
import { configureRootTheme } from '@yandex/ui/Theme'
import { theme } from '@yandex/ui/Theme/presets/default'

import stylesData from './themes/presets/example/root.json'
import { Sandbox } from './components/Sandbox/Sandbox'

configureRootTheme({ theme })

export default () => <Sandbox globals={stylesData.globals} components={stylesData.components} />
