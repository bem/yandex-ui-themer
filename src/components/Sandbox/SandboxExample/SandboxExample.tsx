import React, { FC, useState } from 'react'
import { useStore } from 'effector-react'
import { cnTheme } from '@yandex/ui/Theme'

import { TabsMenu } from '@yandex/ui/TabsMenu/TabsMenu.bundle/desktop'
import { Tumbler } from '@yandex/ui/Tumbler/Tumbler.bundle/desktop'

import { Overview } from '../../Overview'
import { metricaGoal } from '../../YaMetrika'

import { $cssText, $cssVariables } from '../../../model/css'
import { $yamlText } from '../../../model/yaml'

const JSX = 'JSX'
const YAML = 'YAML'
const CSS = 'CSS'

const tabsNames = [JSX, YAML, CSS]

export const SandboxExample: FC<any> = ({ includes, theme }) => {
  const [activeTab, setActiveTab] = useState(JSX)

  const cssVariables: Record<string, string> = useStore($cssVariables)
  const cssText = useStore($cssText)
  const yamlText = useStore($yamlText)
  const [shownDiff, setDiff] = useState(true)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    metricaGoal(tab)
  }

  const handleDiffChange = () => {
    setDiff((prev) => !prev)
    metricaGoal('show-hide-changes')
  }

  const tabs = tabsNames.map((tab) => ({
    id: tab,
    onClick: () => {
      handleTabChange(tab)
    },
    content: tab,
  }))

  return (
    <div className="Sandbox-Examples">
      <div>
        <div className="Sandbox-Showcase">
          <div className="Sandbox-Content">
            <div className="Sandbox-Tabs">
              <TabsMenu size="m" view="default" layout="horiz" activeTab={activeTab} tabs={tabs} />
              <div className="Tumbler-Wrapper">
                <Tumbler
                  size="m"
                  view="default"
                  checked={shownDiff}
                  onChange={handleDiffChange}
                  labelAfter={'Показать изменения'}
                />
              </div>
            </div>
            <div
              className={cnTheme(theme, ['Sandbox-ContentWrapper'])}
              style={shownDiff ? cssVariables : {}}
            >
              {activeTab === JSX && <Overview includes={includes} />}
              {activeTab === CSS && (
                <div className="Sandbox-ContentWrapper-YML">
                  <pre>
                    <code>{cssText}</code>
                  </pre>
                </div>
              )}
              {activeTab === YAML && (
                <div className="Sandbox-ContentWrapper-YML">
                  <pre>
                    <code>{yamlText}</code>
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
