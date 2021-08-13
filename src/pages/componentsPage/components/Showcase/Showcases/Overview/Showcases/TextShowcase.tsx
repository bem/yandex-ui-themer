import React from 'react'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

const Text = getWrappedComponent('Text')

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
