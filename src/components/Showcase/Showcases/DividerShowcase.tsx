import React from 'react'
import { Divider } from '@yandex/ui/Divider'

import { Headline } from '../../Headline'

export const DividerShowcase = () => {
  return (
    <>
      <Headline>Divider</Headline>
      <div className="Showcase-Item">
        <p>Content</p>
        <Divider style={{ margin: '8px 0' }}>
          <p>Section</p>
        </Divider>
        <p>Content</p>
      </div>
    </>
  )
}
