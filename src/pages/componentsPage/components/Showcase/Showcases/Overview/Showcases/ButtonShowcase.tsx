import React, { Fragment } from 'react'
import { useStore } from 'effector-react'
import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

import { $isFigma } from '../../../../../../../model/view'
import { Headline } from '../Headline'

const Button = getWrappedComponent('Button')

export const ButtonShowcase = () => {
  const isFigma = useStore($isFigma)
  const view = ['default', 'action', 'pseudo', 'link', 'clear', 'raised']
  const size = ['s', 'm', 'l']

  return (
    <>
      <Headline>Button</Headline>
      {view.map((view: any) => (
        <Fragment key={view}>
          <p>View: {view}</p>
          <div
            className="Showcase-Item"
            style={{
              display: 'flex',
              width: 250,
              marginBottom: 30,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: isFigma ? 'column' : 'row',
                alignItems: isFigma ? 'flex-start' : 'center',
                flexBasis: '50%',
                marginRight: isFigma ? 0 : 40,
              }}
            >
              {size.map((size: any) => (
                <div style={{ marginBottom: 16 }} key={`${view}-${size}`}>
                  <Button view={view} size={size}>
                    Button
                  </Button>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: isFigma ? 'flex-start' : 'center',
                flexDirection: isFigma ? 'column' : 'row',
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <Button view={view} size="s" disabled>
                  Button
                </Button>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Button view={view} size="m" checked>
                  Button
                </Button>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Button view={view} size="l" progress>
                  Button
                </Button>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  )
}
