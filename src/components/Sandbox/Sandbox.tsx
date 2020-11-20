import React, { FC, useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import deepmerge from 'deepmerge'
import YAML from 'yaml'
import { TabsMenu } from '@yandex/ui/TabsMenu/TabsMenu.bundle/desktop'
import { Select } from '@yandex/ui/Select/Select.bundle/desktop'
import { Tumbler } from '@yandex/ui/Tumbler/Tumbler.bundle/desktop'
import { Textinput } from '@yandex/ui/Textinput/Textinput.bundle/desktop'

import { toDeepToken } from '../../utils/toDeepToken'
import { TextinputField } from '../TextinputField/TextinputField'
import { Showcase } from '../Showcase/Showcase'

import { metricaGoal } from '../YaMetrika/YaMetrika'

import { $cssVariables, $designTokens } from './Sandbox.model'
import './Sandbox.css'

type SandboxProps = {
  globals?: any
  components?: any
}

const SandboxExample: FC<any> = ({ includes }) => {
  const [activeTab, setActiveTab] = useState('jsx')

  const cssVariables = useStore($cssVariables)
  const designTokens = useStore($designTokens)

  const [yml, setYml] = useState('')
  const [shownDiff, setDiff] = useState(true)

  useEffect(() => {
    if (activeTab === 'yml') {
      createYaml()
    }
  }, [activeTab, designTokens])

  const createYaml = () => {
    const yml = Object.entries(designTokens).reduce((acc, value: any) => {
      if (value[1].changed) {
        acc.push(toDeepToken(value[1].path, { value: value[1].value }))
      }
      return acc
    }, [] as any)

    const c = deepmerge.all(yml)
    const text = YAML.stringify(c)

    setYml(text)
  }

  return (
    <div className="Sandbox-Examples">
      <div>
        <div className="Sandbox-Showcase">
          <div className="Sandbox-Content">
            <div className="Sandbox-Tabs">
              <TabsMenu
                size="m"
                view="default"
                layout="horiz"
                activeTab={activeTab}
                tabs={[
                  { id: 'jsx', onClick: () => {
                    setActiveTab('jsx');
                    metricaGoal('jsx');
                  }, content: 'JSX' },
                  { id: 'yml', onClick: () => {
                    setActiveTab('yml');
                    metricaGoal('yml');
                  }, content: 'YML' },
                ]}
              />
              <div className="Tumbler-Wrapper">
                <Tumbler
                  size="m"
                  view="default"
                  checked={shownDiff}
                  onChange={() => {
                    setDiff(!shownDiff)
                    metricaGoal('show-hide-changes')
                  }}
                  labelAfter={'Показать изменения'}
                />
              </div>
            </div>
            <div
              className="Sandbox-ContentWrapper Theme Theme_color_yandex-default Theme_root_default"
              style={shownDiff ? cssVariables : {}}
            >
              {activeTab === 'jsx' && <Showcase includes={includes} />}
              {activeTab === 'yml' && (
                <div className="Sandbox-ContentWrapper-YML">
                  <pre>
                    <code>{yml}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
