import React, { useState } from 'react'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

const Textarea = getWrappedComponent('Textarea')

export const TextareaShowcase = () => {
  const [value1, setValue1] = useState('')

  return (
    <>
      <Headline>Textarea</Headline>
      <div className="Showcase-Item">
        <Textarea
          hasClear
          size="m"
          view="default"
          value={value1}
          // @ts-expect-error
          onChange={(event) => setValue1(event.target.value)}
          onClearClick={() => setValue1('')}
        />
        <br />
        <br />
        <Textarea
          hasClear
          size="s"
          view="default"
          value={value1}
          // @ts-expect-error
          onChange={(event) => setValue1(event.target.value)}
          onClearClick={() => setValue1('')}
        />
        <br />
        <br />
        <Textarea
          hasClear
          size="s"
          view="default"
          value={value1}
          // @ts-expect-error
          onChange={(event) => setValue1(event.target.value)}
          onClearClick={() => setValue1('')}
          state="error"
          hint="Error message"
        />
      </div>
    </>
  )
}
