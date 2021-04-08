import React, { useState } from 'react';
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle';

import { Headline } from '../../Headline/Headline';

export const TextinputShowcase = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState('')

  return (
    <>
      <Headline>Textinput</Headline>
      <div className="Showcase-Item">
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
      </div>
      <div className="Showcase-Item">
        <div style={{ padding: 4 }}>
          <Textinput
            hasClear
            size="s"
            label="Label"
            view="material"
            value={value3}
            onChange={(event) => setValue3(event.target.value)}
            onClearClick={() => setValue2('')}
          />
        </div>
        <div style={{ padding: 4 }}>
          <Textinput
            hasClear
            label="Label"
            size="m"
            view="material"
            value={value4}
            onChange={(event) => setValue4(event.target.value)}
            onClearClick={() => setValue2('')}
          />
        </div>
      </div>
    </>
  )
}
