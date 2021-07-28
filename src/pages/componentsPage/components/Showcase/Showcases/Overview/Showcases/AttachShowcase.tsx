import React from 'react'
import { Attach } from '@yandex/ui/Attach/desktop/bundle'

import { Headline } from '../Headline'

export const AttachShowcase = () => {
  return (
    <>
      <Headline>Attach</Headline>
      <div className="Showcase-Item">
        <Attach size="l" view="default">
          Select file
        </Attach>
        <Attach size="m" view="default">
          Select file
        </Attach>
        <Attach size="s" view="default">
          Select file
        </Attach>
      </div>
    </>
  )
}
