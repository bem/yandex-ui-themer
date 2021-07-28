import React from 'react'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { ButtonGroup } from '@yandex/ui/ButtonGroup/desktop/bundle'

import { Headline } from '../Headline'

export const ButtonGroupShowcase = () => {
  const gaps = [undefined, 's', 'm', 'l', 'xl'] as ('s' | 'm' | 'l' | 'xl')[]
  const pins = ['circle', 'round'] as ('circle' | 'round')[]

  return (
    <>
      <Headline>ButtonGroup</Headline>
      <div className="Showcase-Item">
        {gaps.map((gap, index) => (
          <>
            {index !== 0 && (
              <>
                {' '}
                <br /> <br />{' '}
              </>
            )}
            <p> Gap: {gap || 'no gap'} </p>
            <ButtonGroup gap={gap}>
              <Button view="default" size="m">
                Button 1
              </Button>
              <Button view="default" size="m">
                Button 2
              </Button>
              <Button view="default" size="m">
                Button 3
              </Button>
            </ButtonGroup>
          </>
        ))}

        {pins.map((pin) => (
          <>
            <br /> <br />
            <p> Pin: {pin} </p>
            <ButtonGroup pin={pin}>
              <Button view="default" size="m">
                Button 1
              </Button>
              <Button view="default" size="m">
                Button 2
              </Button>
            </ButtonGroup>
          </>
        ))}
      </div>
    </>
  )
}
