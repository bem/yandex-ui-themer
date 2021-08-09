import React, { useState } from 'react'
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'

import { Headline } from '../Headline'

export const TextinputShowcase = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState('')
  const [value5, setValue5] = useState('')
  const [value6, setValue6] = useState('')

  return (
    <>
      <Headline>Textinput</Headline>
      <div className="Showcase-Item" style={{ whiteSpace: 'normal' }}>
        <div style={{ padding: 4 }}>
          <Textinput
            hasClear
            size="m"
            view="default"
            value={value1}
            onChange={(event) => setValue1(event.target.value)}
            onClearClick={() => setValue1('')}
          />
        </div>
        <div style={{ padding: 4 }}>
          <Textinput
            hasClear
            size="s"
            view="default"
            value={value2}
            onChange={(event) => setValue2(event.target.value)}
            onClearClick={() => setValue2('')}
          />
        </div>
        <div style={{ padding: 4 }}>
          <Textinput
            hasClear
            size="s"
            view="default"
            value={value3}
            onChange={(event) => setValue3(event.target.value)}
            onClearClick={() => setValue3('')}
            state="error"
            hint="Error message"
          />
        </div>
      </div>
      <div style={{ padding: 4 }}>
        <Textinput
          hasClear
          size="s"
          label="Label"
          view="material"
          value={value4}
          onChange={(event) => setValue4(event.target.value)}
          onClearClick={() => setValue4('')}
        />
      </div>
      <div style={{ padding: 4 }}>
        <Textinput
          hasClear
          label="Label"
          size="m"
          view="material"
          value={value5}
          onChange={(event) => setValue5(event.target.value)}
          onClearClick={() => setValue5('')}
        />
      </div>
      <div style={{ padding: 4 }}>
        <Textinput
          hasClear
          label="Label"
          size="m"
          view="material"
          value={value6}
          onChange={(event) => setValue6(event.target.value)}
          onClearClick={() => setValue6('')}
          state="error"
          hint="Error message"
        />
      </div>
    </>
  )
}
