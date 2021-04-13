import React, { useState } from 'react'
import { Select } from '@yandex/ui/Select/Select.bundle/desktop'
import { Textinput } from '@yandex/ui/Textinput/Textinput.bundle/desktop'
import { TabsMenu } from '@yandex/ui/TabsMenu/TabsMenu.bundle/desktop'
import { TabsPanes } from '@yandex/ui/TabsPanes/TabsPanes.bundle/desktop'
import { Theme } from '@yandex/ui/Theme'

import { TextinputField } from '../TextinputField/TextinputField'
import { metricaGoal } from '../YaMetrika/YaMetrika'

import { SandboxExample } from './SandboxExample/SandboxExample'
import { CustomThemeDownloader } from './CustomThemeDownloader/CustomThemeDownloader'
import { $designTokens } from '../Sandbox/Sandbox.model'

import './Sandbox.css'
import { useStore } from 'effector-react'

type SandboxProps = {
  globals?: any
  components?: any
  mappings?: Record<string, string>,
  theme?: Theme
}

export const Sandbox: React.FC<SandboxProps> = ({ components, globals, theme, mappings }) => {
  const designTokens = useStore($designTokens)
  const tabs = ['globals', ...Object.keys(components)]
  const [activeTab, setActiveTab] = useState('globals')
  const [activeTab1, setActiveTab1] = useState('tokens')
  const values = activeTab === 'globals' ? globals : components[activeTab]
  const [filter, setFilter] = useState('')

  const tokensTab = (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-beetwen',
          marginRight: 20,
          marginBottom: 20,
        }}
      >
        <Select
          style={{ width: 150, marginRight: 20 }}
          size="m"
          view="default"
          onChange={(event) => {
            setActiveTab(event.target.value)
            metricaGoal('select')
          }}
          value={activeTab}
          options={tabs.map((tab) => ({ value: tab, content: tab }))}
        />
        <Textinput
          debounceTimeout={500}
          hasClear
          onChange={(event) => {
            setFilter(event.target.value)
            metricaGoal('search')
          }}
          view="default"
          size="m"
          placeholder="Поиск по токенам"
          value={filter}
        />
      </div>
      {Object.entries(values)
        .filter(([groupName]) => groupName.includes(filter))
        .map(([groupName, groupTokens]: any, index) => (
          <TextinputField
            key={index}
            label={groupName}
            value={groupTokens.value}
            customTokens={(designTokens[groupName] || {}).value}
            path={groupTokens.path}
            description={groupTokens.description}
          />
        ))}
    </>
  )

  return (
    <div className="Sandbox">
      <SandboxExample theme={theme} includes={activeTab === 'globals' ? Object.keys(components) : [activeTab]} />
      <div className="Sandbox-Tokens">
        <div className="Sandbox-Tokens-Tabs">
          <TabsMenu
            view="default"
            layout="horiz"
            size="m"
            activeTab={activeTab1}
            tabs={[
              { id: 'custom', onClick: () => setActiveTab1('custom'), content: 'Загрузить тему' },
              { id: 'tokens', onClick: () => setActiveTab1('tokens'), content: 'Токены' },
            ]}
          />
        </div>
        <TabsPanes
          activePane={activeTab1}
          panes={[
            { id: 'custom', content: <CustomThemeDownloader mappings={mappings} /> },
            { id: 'tokens', content: tokensTab }
          ]}
        />
      </div>
    </div>
  )
}
