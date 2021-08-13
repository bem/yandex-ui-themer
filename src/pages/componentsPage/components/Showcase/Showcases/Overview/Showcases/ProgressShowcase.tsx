import React from 'react'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

const Progress = getWrappedComponent('Progress')

export const ProgressShowcase = () => {
  return (
    <>
      <Headline>Progres</Headline>
      <div className="Showcase-Item">
        <Progress timing="linear" value={50} maxValue={100} />
      </div>
    </>
  )
}
