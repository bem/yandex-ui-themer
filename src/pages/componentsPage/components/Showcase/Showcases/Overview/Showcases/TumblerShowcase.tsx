import React, { useState } from 'react'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

const Tumbler = getWrappedComponent('Tumbler')

export const TumblerShowcase = () => {
  const [checked1, setChecked1] = useState(true)
  const [checked2, setChecked2] = useState(false)

  return (
    <>
      <Headline>Tumbler</Headline>
      <div className="Showcase-Item">
        <>
          <div style={{ marginBottom: 8 }}>
            <Tumbler
              size="m"
              view="default"
              checked={checked1}
              onChange={() => setChecked1(!checked1)}
              labelBefore="labelBefore"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <Tumbler
              size="m"
              view="default"
              checked
              disabled
              onChange={() => {}}
              labelAfter="disabled check"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <Tumbler
              size="s"
              view="default"
              checked={checked2}
              onChange={() => setChecked2(!checked2)}
              labelAfter="labelAfter"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <Tumbler
              size="l"
              view="default"
              checked={false}
              disabled
              onChange={() => {}}
              labelBefore={
                <svg
                  aria-label="labelBefore"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 7.003a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H12v-2a4 4 0 0 0-8 0v2h-.5zm2.5-2a2 2 0 1 1 4 0V7H6V5.003z"
                    fill="currentColor"
                  />
                </svg>
              }
              labelAfter="disabled"
            />
          </div>
        </>
      </div>
    </>
  )
}
