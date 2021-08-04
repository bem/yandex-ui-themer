import React, { CSSProperties } from 'react'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Icon } from '@yandex/ui/Icon/Icon.bundle/desktop'
import { Text } from '@yandex/ui/Text/Text.bundle/desktop'

import { Headline } from '../Headline'

export const ButtonShowcase = () => {
  const view = ['default', 'action', 'pseudo', 'link', 'clear', 'raised']
  const size = ['s', 'm', 'l']

  return (
    <>
      <Headline>Button</Headline>
      {view.map((view: any) => (
        <>
          <p>View: {view}</p>
          <div className="Showcase-Item" style={{ display: 'flex', width: 250 }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '50%' }}>
              {size.map((size: any) => (
                <div style={{ marginBottom: 16 }}>
                  <Button view={view} size={size}>
                    Button
                  </Button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        </>
      ))}
    </>
  )
}
