import React, { useState } from 'react'
import { Select } from '@yandex/ui/Select/Select.bundle/desktop'
import { Textinput } from '@yandex/ui/Textinput/Textinput.bundle/desktop'

import { TextinputField } from '../TextinputField/TextinputField'
import { metricaGoal } from '../YaMetrika/YaMetrika'

import { SandboxExample } from './SandboxExample/SandboxExample';
import './Sandbox.css'

type SandboxProps = {
  globals?: any
  components?: any
}

export const Sandbox: React.FC<SandboxProps> = ({ components, globals }) => {
  const tabs = ['globals', ...Object.keys(components)]
  const [activeTab, setActiveTab] = useState('globals')
  const values = activeTab === 'globals' ? globals : components[activeTab]
  const [filter, setFilter] = useState('')

  return (
    <div className="Sandbox">
      <SandboxExample includes={activeTab === 'globals' ? Object.keys(components) : [activeTab]} />
      <div className="Sandbox-Tokens">
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
              path={groupTokens.path}
              description={groupTokens.description}
            />
          ))}
      </div>
    </div>
  )
}
