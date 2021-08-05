import React, { useState, FC, useEffect, MouseEvent } from 'react'
import { useStore } from 'effector-react'
import { cn } from '@bem-react/classname'
import { Icon, Button } from 'react-figma-components'

import { TabsMenu } from '../../../../lib/lego/TabsMenu'
import { Divider } from '../../../../lib/lego/Divider'

import { Settings } from './Settings'
import { Tokens } from './Tokens'
import { Code } from './Code'

import { $component } from '../../model'
import { $isCombine, isCombineChange, isCombineReset } from '../../../../model/combine'

import './Playground.css'

const cnPlayground = cn('Playground')

export type PlaygroundProps = {
  className: string
}

export const Playground: FC<PlaygroundProps> = ({ className }) => {
  const component = useStore($component)
  const combine = useStore($isCombine)
  const [activeTab, setActiveTab] = useState('tokens')

  const handleCombineChange = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    isCombineChange()
  }

  useEffect(() => {
    setActiveTab(component === 'overview' ? 'tokens' : 'settings')
  }, [component])

  useEffect(() => isCombineReset, [component, activeTab])

  return (
    <div className={cnPlayground(null, [className])}>
      <TabsMenu
        activeTab={activeTab}
        tabs={[
          // Overview page should not have settings tab
          ...(component !== 'overview'
            ? [{ id: 'settings', onClick: () => setActiveTab('settings'), content: 'Settings' }]
            : []),
          {
            id: 'tokens',
            onClick: () => setActiveTab('tokens'),
            content: component === 'overview' ? 'Global Tokens' : 'Design Tokens',
          },
          { id: 'code', onClick: () => setActiveTab('code'), content: 'Code' },
        ]}
        className={cnPlayground('Header')}
      />
      <Divider />
      <div className={cnPlayground('Body')}>
        {component !== 'overview' && activeTab === 'settings' && <Settings />}
        {activeTab === 'tokens' && <Tokens />}
        {activeTab === 'code' && <Code />}
      </div>
      {component !== 'overview' && activeTab === 'settings' && (
        <>
          <Divider />
          <div className={cnPlayground('Footer', { active: combine })}>
            <div
              className={cnPlayground('Footer-Header')}
              onClick={(e) => !combine && handleCombineChange(e)}
            >
              <div className={cnPlayground('Footer-Header-Title')}>Combine mode </div>
              <div className={cnPlayground('Footer-Header-Button')}>
                <Icon
                  name={combine ? 'minus' : 'plus'}
                  color={combine ? 'black' : 'black3'}
                  onClick={handleCombineChange}
                />
              </div>
            </div>
            {combine && (
              <>
                <p>
                  Option Menu are multiselect now. Choose needed props and generate variants to
                  Figma canvas
                </p>
                <div className={cnPlayground('Footer-Buttons')}>
                  <Button view="secondary" disabled={!combine}>
                    Reset Selection
                  </Button>
                  <Button view="primary" disabled={!combine}>
                    Generate Variants
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
