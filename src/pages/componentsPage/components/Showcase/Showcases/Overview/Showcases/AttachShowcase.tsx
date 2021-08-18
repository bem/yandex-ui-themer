import React from 'react'
import { useStore } from 'effector-react'

import { $isFigma } from '../../../../../../../model/view'
import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

// const Attach = getWrappedComponent('Attach');

export const AttachShowcase = () => {
  const isFigma = useStore($isFigma)

  return (
    <>
      <Headline>Attach</Headline>
      {isFigma ? (
        <>
          {/* <div className="Showcase-Item">
            <Attach size="s" view="default">
              Select file
            </Attach>
          </div>
          <div className="Showcase-Item">
            <Attach size="m" view="default">
              Select file
            </Attach>
          </div>
          <div className="Showcase-Item">
            <Attach size="l" view="default">
              Select file
            </Attach>
          </div> */}
        </>
      ) : (
        <>
          {/* <div className="Showcase-Item Showcase-Attach">
            <Attach size="s" view="default">
              Select file
            </Attach>
            <Attach size="m" view="default">
              Select file
            </Attach>
            <Attach size="l" view="default">
              Select file
            </Attach>
          </div> */}
        </>
      )}
    </>
  )
}
