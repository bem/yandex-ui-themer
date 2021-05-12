import React from 'react'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Icon } from '@yandex/ui/Icon/Icon.bundle/desktop'
import { Text } from '@yandex/ui/Text/Text.bundle/desktop'

import { Headline } from '../../Headline'

export const ButtonShowcase = () => {
  const view = ['default', 'action', 'pseudo', 'link', 'clear', 'raised']

  return (
    <>
      <Headline>Button</Headline>
      {view.map((view: any) => {
        return (
          <>
            <p>View {view}</p>
            <div className="Showcase-Item">
              <Button view={view} size="l">
                Button
              </Button>
              <Button view={view} size="m">
                Button
              </Button>
              <Button view={view} size="s">
                Button
              </Button>
              <Button view={view} size="s" disabled>
                Button
              </Button>
              <Button view={view} size="s" checked>
                Button
              </Button>
              <Button view={view} size="s" progress>
                Button
              </Button>
              <Button
                view={view}
                size="s"
                iconLeft={(className: string) => (
                  <Icon size="s" type="arrow" direction="left" className={className} />
                )}
                iconRight={(className: string) => (
                  <Icon size="s" type="arrow" direction="left" className={className} />
                )}
              >
                Button
              </Button>
              <Button
                view={view}
                size="s"
                icon={(className: string) => (
                  <Icon size="s" type="arrow" direction="left" className={className} />
                )}
              />
            </div>
          </>
        )
      })}
      <div className="Showcase-Item" style={{ whiteSpace: 'normal' }}>
        <Button view="default" size="m">
          Button
        </Button>
        <Text>Любя, съешь щипцы, — вздохнёт мэр, — кайф жгуч.</Text>
        <Text>
          Шеф взъярён тчк щипцы с эхом гудбай Жюль. Эй, жлоб! Где туз? Прячь юных съёмщиц в шкаф.
          Экс-граф? Плюш изъят. Бьём чуждый цен хвощ!
        </Text>
        <Button view="action" size="m">
          Button
        </Button>
      </div>
    </>
  )
}
