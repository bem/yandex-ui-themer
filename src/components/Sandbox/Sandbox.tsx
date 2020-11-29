import React, { useState } from 'react'
import { Select } from '@yandex/ui/Select/Select.bundle/desktop'
import { Textinput } from '@yandex/ui/Textinput/Textinput.bundle/desktop'
import { TabsMenu } from '@yandex/ui/TabsMenu/TabsMenu.bundle/desktop'
import { TabsPanes } from '@yandex/ui/TabsPanes/TabsPanes.bundle/desktop'

import { TextareaWithAutoResize } from '@yandex/ui/Textarea/desktop/bundle'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Spacer } from '@yandex/ui/Spacer/desktop'

import { TextinputField } from '../TextinputField/TextinputField'
import { metricaGoal } from '../YaMetrika/YaMetrika'

import { SandboxExample } from './SandboxExample/SandboxExample';
import { $designTokens, variablesChangedBatch } from '../Sandbox/Sandbox.model'
import './Sandbox.css'
import { useStore } from 'effector-react'

type SandboxProps = {
  globals?: any
  components?: any
  theme?: string
}

const CustomThemeDownloader: React.FC<any> = () => {
  const tokensDefault = `button:
  viewAction:
    fillColor:
      base:
        value: "#C728B3"
      progress:
        base:
          value: "#C728B3"
        process:
          value: "#de1258"
  viewDefault:
    fillColor:
      base:
        value: "#ecb6ea"`

  const [value1, setValue1] = useState(tokensDefault)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(false)

  const tokenProcessing = () => {
    setProgress(true)
    setError('')

    const body = JSON.stringify({
      config: {
        output: {
          css: {
            transforms: ['name/cti/kebab'],
            buildPath: './themes',
            files: [
              {
                destination: 'tokens.json',
                format: 'json/extended',
              },
            ],
          },
        },
      },
      tokens: {
        language: 'yaml',
        content: value1
      }
    });

    fetch('https://themebox.now.sh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          setProgress(false)
          setError(response.error)
          return;
        }

        const res = JSON.parse(response.data[0].content);
        const tokens = Object.entries(res).map(([_, item]:any) => {
          return {
              path: item.path,
              name: item.name,
              value: item.value,
              changed: true,
            }
        })

        variablesChangedBatch(tokens)
        setProgress(false)
      });
  }

  return (
    <form style={{
      margin: '0 14px 0 0'
    }}>
      Токены:
      <Spacer all={10} />
      <TextareaWithAutoResize
        state={error ? 'error' : undefined}
        hint={error}
        view="default"
        size="m"
        value={value1}
        onChange={(event) => setValue1(event.target.value)}
      />
      <Spacer all={10} />
      <Button view="action" size="m" progress={progress} onClick={tokenProcessing}>Загрузить</Button>
    </form>
  )
}

export const Sandbox: React.FC<SandboxProps> = ({ components, globals, theme }) => {
  const designTokens = useStore($designTokens)
  const tabs = ['globals', ...Object.keys(components)]
  const [activeTab, setActiveTab] = useState('globals')
  const [activeTab1, setActiveTab1] = useState('tokens')
  const values = activeTab === 'globals' ? globals : components[activeTab]
  const [filter, setFilter] = useState('')

  const tab1 = (
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
            { id: 'custom', content: <CustomThemeDownloader /> },
            { id: 'tokens', content: tab1 }
          ]}
        />
      </div>
    </div>
  )
}
