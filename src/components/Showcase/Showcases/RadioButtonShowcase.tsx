import React from 'react'
import { RadioButton } from '@yandex/ui/RadioButton/desktop/bundle'

import { Headline } from '../../Headline'

export const RadioButtonShowcase = () => {
  const options = [
    { value: 'a', children: 'Option A' },
    { value: 'b', children: 'Option B' },
    { value: 'c', children: 'Option C' },
  ]

  return (
    <>
      <Headline>RadioButton</Headline>
      <div className="Showcase-Item">
        <RadioButton size="l" view="default" value="a" options={options} />
        <br />
        <br />
        <RadioButton size="m" view="default" value="a" options={options} />
        <br />
        <br />
        <RadioButton size="s" view="default" value="a" options={options} />
      </div>
    </>
  )
}
