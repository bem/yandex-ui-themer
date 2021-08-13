import React, { useState } from 'react'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

const Menu = getWrappedComponent('Menu')

export const MenuShowcase = () => {
  const items = [
    { value: 'a', content: 'Каждый' },
    { value: 'b', content: 'Охотник' },
    {
      items: [
        { value: 'c', content: 'Желает', disabled: true },
        { value: 'd', content: 'Знать' },
        { value: 'e', content: 'Где' },
      ],
    },
  ]

  const [value, setValue] = useState('a')

  return (
    <>
      <Headline>Menu</Headline>
      <div className="Showcase-Item">
        <Menu
          size="m"
          theme="normal"
          items={items}
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
        />
        <Menu
          size="s"
          theme="normal"
          items={items}
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
        />
      </div>
      <div className="Showcase-Item">
        <Menu
          size="m"
          view="default"
          items={items}
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
        />
        <Menu
          size="s"
          view="default"
          items={items}
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
        />
      </div>
    </>
  )
}
