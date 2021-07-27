import React, { FC } from 'react'
import { Panel } from '../../../components/Panel'

export type PanelsProps = {
  className: string
  panels: string[]
  activePanel: string
  onPanelSelect: (panel: string) => void
}

export const Panels: FC<PanelsProps> = ({ className, panels, activePanel, onPanelSelect }) => (
  <div className={className}>
    {panels.map((panel) => (
      <Panel key={panel} active={activePanel === panel} onClick={() => onPanelSelect(panel)}>
        {panel}
      </Panel>
    ))}
  </div>
)
