import React, { FC } from 'react'
import { cn } from '@bem-react/classname'

import { TabsMenu } from '../../lib/lego/TabsMenu'
import { Controls } from './Controls'

import './Header.css'

export type ActiveTabType = 'components' | 'tokens'

export type HeaderProps = {
  activeTab: ActiveTabType
  setActiveTab: (newActiveTab: ActiveTabType) => void
}

export const cnHeader = cn('Header')

export const Header: FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={cnHeader()}>
      <TabsMenu
        activeTab={activeTab}
        tabs={[
          { id: 'components', onClick: () => setActiveTab('components'), content: 'Components' },
          { id: 'tokens', onClick: () => setActiveTab('tokens'), content: 'Design Tokens' },
        ]}
      />
      <Controls className={cnHeader('Controls')} />
    </div>
  )
}
