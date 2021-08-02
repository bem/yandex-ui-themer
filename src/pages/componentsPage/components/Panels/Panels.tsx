import React, { FC, useState } from 'react'
import { Input, Icon } from 'react-figma-components'
import { cn } from '@bem-react/classname'

import { Panel } from '../../../../components/Panel'
import { Divider } from '../../../../lib/lego/Divider'

import './Panels.css'

export const cnPanels = cn('Panels')

export type PanelsProps = {
  className: string
  panels: string[]
  activePanel: string
  onPanelSelect: (panel: string) => void
}

export const Panels: FC<PanelsProps> = ({ className, panels, activePanel, onPanelSelect }) => {
  const [search, setSearch] = useState('')

  return (
    <div className={cnPanels(null, [className])}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        renderIcon={<Icon name="search" color="black" />}
        placeholder="Search"
        className={cnPanels('Input')}
      />
      <Divider />
      <div className={cnPanels('Content')}>
        {panels
          .filter((panel) => panel.includes(search.toLocaleLowerCase()))
          .map((panel) => (
            <Panel key={panel} active={activePanel === panel} onClick={() => onPanelSelect(panel)}>
              {panel}
            </Panel>
          ))}
      </div>
    </div>
  )
}
