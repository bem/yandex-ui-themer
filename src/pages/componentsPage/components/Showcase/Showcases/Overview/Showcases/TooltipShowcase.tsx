import React, { useState, useRef } from 'react'
import { Button } from '@yandex-lego/components/Button/desktop/bundle'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

const Tooltip = getWrappedComponent('Tooltip')

export const TooltipShowcase = () => {
  const [visible1, setVisible1] = useState(true)
  const [visible2, setVisible2] = useState(true)
  const [visible3, setVisible3] = useState(true)
  const [visible4, setVisible4] = useState(true)
  const [visible5, setVisible5] = useState(true)
  const [visible6, setVisible6] = useState(true)
  const anchorRef1 = useRef<HTMLDivElement>(null)
  const anchorRef2 = useRef<HTMLDivElement>(null)
  const anchorRef3 = useRef<HTMLDivElement>(null)
  const anchorRef4 = useRef<HTMLDivElement>(null)
  const anchorRef5 = useRef<HTMLDivElement>(null)
  const anchorRef6 = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Headline>Tooltip</Headline>
      <div className="Showcase-Item">
        <div
          style={{
            position: 'relative',
            display: 'flex',
            height: 96,
          }}
          ref={scopeRef}
        >
          <div style={{ marginRight: 32 }}>
            <Button
              innerRef={anchorRef1}
              size="m"
              view="default"
              onClick={() => setVisible1(!visible1)}
            >
              Target
            </Button>
          </div>
          <div style={{ marginRight: 32 }}>
            <Button
              innerRef={anchorRef2}
              size="m"
              view="default"
              onClick={() => setVisible2(!visible2)}
            >
              Target
            </Button>
          </div>
          <div style={{ marginRight: 32 }}>
            <Button
              innerRef={anchorRef3}
              size="m"
              view="default"
              onClick={() => setVisible3(!visible3)}
            >
              Target
            </Button>
          </div>
          <Tooltip
            hasTail
            direction="bottom"
            view="default"
            size="s"
            anchor={anchorRef1}
            scope={scopeRef}
            visible={visible1}
          >
            Size small
          </Tooltip>
          <Tooltip
            hasTail
            direction="bottom"
            view="default"
            size="m"
            anchor={anchorRef2}
            scope={scopeRef}
            visible={visible2}
          >
            Size medium
          </Tooltip>
          <Tooltip
            hasTail
            direction="bottom"
            view="default"
            size="l"
            anchor={anchorRef3}
            scope={scopeRef}
            visible={visible3}
          >
            Size large
          </Tooltip>
        </div>
      </div>
      <div className="Showcase-Item">
        <div
          style={{
            position: 'relative',
            display: 'flex',
            height: 96,
          }}
          ref={scopeRef}
        >
          <div style={{ marginRight: 32 }}>
            <Button
              innerRef={anchorRef4}
              size="m"
              view="default"
              onClick={() => setVisible4(!visible4)}
            >
              Target
            </Button>
          </div>
          <div style={{ marginRight: 32 }}>
            <Button
              innerRef={anchorRef5}
              size="m"
              view="default"
              onClick={() => setVisible5(!visible5)}
            >
              Target
            </Button>
          </div>
          <div style={{ marginRight: 32 }}>
            <Button
              innerRef={anchorRef6}
              size="m"
              view="default"
              onClick={() => setVisible6(!visible6)}
            >
              Target
            </Button>
          </div>
          <Tooltip
            hasTail
            direction="bottom"
            view="default"
            size="s"
            state="warning"
            anchor={anchorRef4}
            scope={scopeRef}
            visible={visible4}
          >
            Size small
          </Tooltip>
          <Tooltip
            hasTail
            direction="bottom"
            view="default"
            size="m"
            state="success"
            anchor={anchorRef5}
            scope={scopeRef}
            visible={visible5}
          >
            Size medium
          </Tooltip>
          <Tooltip
            hasTail
            direction="bottom"
            view="default"
            size="l"
            state="alert"
            anchor={anchorRef6}
            scope={scopeRef}
            visible={visible6}
          >
            Size large
          </Tooltip>
        </div>
      </div>
    </>
  )
}
