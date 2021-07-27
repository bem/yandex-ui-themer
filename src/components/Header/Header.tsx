import React, { FC } from 'react'

import { TabsMenu } from '../../lib/lego/TabsMenu'

import './Header.css'

export type ActiveTabType = 'components' | 'tokens'

export type HeaderProps = {
  activeTab: ActiveTabType
  setActiveTab: (newActiveTab: ActiveTabType) => void
}

export const Header: FC<HeaderProps> = ({ activeTab, setActiveTab }) => (
  <div className="Header">
    <TabsMenu
      activeTab={activeTab}
      tabs={[
        { id: 'components', onClick: () => setActiveTab('components'), content: 'Components' },
        { id: 'tokens', onClick: () => setActiveTab('tokens'), content: 'Design Tokens' },
      ]}
    />
  </div>
)
