import React from 'react'
import { Radiobox } from '@yandex/ui/Radiobox/desktop/bundle'

import { Headline } from '../../Headline'

export const RadioboxShowcase = () => {
  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C (disabled)', value: 'c', disabled: true },
  ]

  return (
    <>
      <Headline>Radiobox</Headline>
      <div className="Showcase-Item">
        <Radiobox size="m" view="default" value="a" options={options} />
        <br />
        <Radiobox size="s" view="default" value="a" options={options} />
      </div>
      <div className="Showcase-Item">
        <Radiobox size="m" view="outline" value="a" options={options} />
        <br />
        <Radiobox size="s" view="outline" value="a" options={options} />
      </div>
    </>
  )
}
