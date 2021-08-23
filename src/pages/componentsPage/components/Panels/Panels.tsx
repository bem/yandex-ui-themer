import React, { FC, Fragment, useState } from 'react'
import { Input, Icon, Disclosure } from 'react-figma-components'
import { cn } from '@bem-react/classname'

import { Panel } from '../../../../components/Panel'
import { Divider } from '../../../../lib/lego/Divider'
import * as allComponents from '@yandex-lego/components/figma'
// import { panelsTree } from './constants'

import './Panels.css'

export const cnPanels = cn('Panels')

export type PanelsProps = {
  className: string
  panels: string[]
  activePanel: string
  onPanelSelect: (panel: string) => void
}

const panelsTree = {
  components: Object.keys(allComponents).map((component) => component.toLocaleLowerCase()),
}

// By default all disclosures are open
const defaultSections = Array(Object.keys(panelsTree).length).fill(true)

const includes = (component: string, search: string) =>
  component.toLowerCase().includes(search.toLowerCase())

export const Panels: FC<PanelsProps> = ({ className, panels, activePanel, onPanelSelect }) => {
  const [search, setSearch] = useState('')
  const [sections, setSections] = useState(defaultSections)

  const handleSectionChange = (index: number) => {
    setSections((prev) => prev.map((el, i) => (i === index ? !el : el)))
  }

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
        {/* Overview is not belong to any class */}
        {includes('overview', search) && (
          <Panel
            key="overview"
            active={activePanel === 'overview'}
            onClick={() => onPanelSelect('overview')}
          >
            overview
          </Panel>
        )}

        {Object.entries(panelsTree).map(([section, components], index) => {
          if (!components.some((component) => includes(component, search))) {
            return <Fragment key={section} />
          }

          return (
            <Disclosure
              label={section}
              checked={sections[index]}
              onChange={() => handleSectionChange(index)}
              className="Panels-Disclosure"
              key={section}
            >
              {components
                .filter((component) => includes(component, search))
                .map((component) => (
                  <Panel
                    key={component}
                    active={activePanel === component}
                    onClick={() => onPanelSelect(component)}
                  >
                    {component}
                  </Panel>
                ))}
            </Disclosure>
          )
        })}
      </div>
    </div>
  )
}
