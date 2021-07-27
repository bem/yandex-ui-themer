import React, { useState, FC } from 'react'
import { cn } from '@bem-react/classname'

import { TabsMenu } from '../../../../lib/lego/TabsMenu'
import { Divider } from '../../../../lib/lego/Divider'
import { Textinput } from '../../../../components/Textinput'

import './Playground.css'

const cnPlayground = cn('Playground')

export type PlaygroundProps = {
  className: string
}

export const Playground: FC<PlaygroundProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('settings')
  return (
    <div className={cnPlayground(null, [className])}>
      <TabsMenu
        activeTab={activeTab}
        tabs={[
          { id: 'settings', onClick: () => setActiveTab('settings'), content: 'Settings' },
          { id: 'tokens', onClick: () => setActiveTab('tokens'), content: 'Design Tokens' },
          { id: 'code', onClick: () => setActiveTab('code'), content: 'Code' },
        ]}
        className={cnPlayground('Header')}
      />
      <Divider />
      <div className={cnPlayground('Body')}>
        {Array(10)
          .fill('1')
          .map(() => (
            <Textinput label="blabla" tip="it is used for blabla" />
          ))}
      </div>
    </div>
  )
}
