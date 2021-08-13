import React from 'react'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

const Radiobox = getWrappedComponent('Radiobox')

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
