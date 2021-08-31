import React, { useState, FC, useEffect, MouseEvent, useCallback } from 'react'
import { useStore } from 'effector-react'
import { cn } from '@bem-react/classname'
import { Icon, Button } from 'react-figma-components'

import { TabsMenu } from '../../../../lib/lego/TabsMenu'
import { Divider } from '../../../../lib/lego/Divider'

import { Settings } from './Settings'
import { Tokens } from '../../../../components/Tokens/Tokens'
import { Code } from './Code'

import { $component, $activeTab, activeTabChange, $componentProps } from '../../model'
import { $isCombine, isCombineChange, isCombineReset } from '../../../../model/combine'

import './Playground.css'
import { getVariantsFromProps } from '../../../../utils/combinations'
import { rendererVariantsMessage } from '../../../../utils/figma'

const cnPlayground = cn('Playground')

export type PlaygroundProps = {
  className: string
}

export const Playground: FC<PlaygroundProps> = ({ className }) => {
  const component = useStore($component)
  const combine = useStore($isCombine)
  const activeTab = useStore($activeTab)
  const { currentProps, currentCombinedProps } = useStore($componentProps)

  const handleCombineChange = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    isCombineChange()
  }

  useEffect(() => {
    if (component === 'overview') {
      activeTabChange('tokens')
    }
  }, [component])

  useEffect(() => isCombineReset, [component, activeTab])

  const combineVariantsHandler = useCallback(() => {
    const combinedVariants = getVariantsFromProps(currentProps, currentCombinedProps);

    const blocks = combinedVariants?.flat();
    const componentNormalizedName = component[0].toUpperCase() + component.slice(1)

    rendererVariantsMessage(blocks.map(props => ({ name: componentNormalizedName, props })));

  }, [component, currentCombinedProps, currentProps]);

  return (
    <div className={cnPlayground(null, [className])}>
      <TabsMenu
        activeTab={activeTab}
        tabs={[
          // Overview page should not have settings tab
          ...(component !== 'overview'
            ? [
                {
                  id: 'settings',
                  onClick: () => activeTabChange('settings'),
                  content: 'Settings',
                },
              ]
            : []),
          {
            id: 'tokens',
            onClick: () => activeTabChange('tokens'),
            content: component === 'overview' ? 'Global Tokens' : 'Design Tokens',
          },
          // { id: 'code', onClick: () => setActiveTab('code'), content: 'Code' },
        ]}
        className={cnPlayground('Header')}
      />
      <Divider />
      <div className={cnPlayground('Body')}>
        {component !== 'overview' && activeTab === 'settings' && <Settings combine={combine} />}
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
                  <Button view="primary" disabled={!combine} onClick={combineVariantsHandler}>
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
