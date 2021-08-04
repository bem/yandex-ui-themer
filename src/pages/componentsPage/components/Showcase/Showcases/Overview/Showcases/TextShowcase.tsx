import React from 'react'
import { Text } from '@yandex/ui/Text/desktop/bundle'

import { Headline } from '../Headline'

export const TextShowcase = () => {
  return (
    <>
      <Headline>Text</Headline>
      <div className="Showcase-Item">
        <Text as="div" style={{ whiteSpace: 'normal' }}>
          Миссия Яндекса — помогать людям решать задачи и достигать своих целей в жизни.
        </Text>
      </div>
    </>
  )
}
