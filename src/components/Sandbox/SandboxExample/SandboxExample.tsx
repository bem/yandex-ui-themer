import React, { FC, useState, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import deepmerge from 'deepmerge'
import YAML from 'yaml'
import { cnTheme } from '@yandex/ui/Theme';

import { TabsMenu } from '@yandex/ui/TabsMenu/TabsMenu.bundle/desktop'
import { Tumbler } from '@yandex/ui/Tumbler/Tumbler.bundle/desktop'

import { toDeepToken } from '../../../utils/toDeepToken'
import { Showcase } from '../../Showcase/Showcase'
import { metricaGoal } from '../../YaMetrika/YaMetrika'

import { $cssVariables, $designTokens } from '../Sandbox.model';

export const SandboxExample: FC<any> = ({ includes, theme }) => {
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
                                    {
                                        id: 'jsx', onClick: () => {
                                            setActiveTab('jsx');
                                            metricaGoal('jsx');
                                        }, content: 'JSX'
                                    },
                                    {
                                        id: 'yml', onClick: () => {
                                            setActiveTab('yml');
                                            metricaGoal('yml');
                                        }, content: 'YML'
                                    },
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
                            className={cnTheme(theme, ['Sandbox-ContentWrapper'])}
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