import React, { Fragment } from 'react'
import { Button } from '@yandex-lego/components/Button/desktop/bundle'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

// const ButtonGroup = getWrappedComponent('ButtonGroup')

export const ButtonGroupShowcase = () => {
  const gaps = [undefined, 's', 'm', 'l', 'xl'] as ('s' | 'm' | 'l' | 'xl')[]
  const pins = ['circle', 'round'] as ('circle' | 'round')[]

  return (
    <>
      <Headline>ButtonGroup</Headline>
      <div className="Showcase-Item">
        {gaps.map((gap, index) => (
          <Fragment key={`${gap}-${index}`}>
            {index !== 0 && (
              <>
                {' '}
                <br /> <br />{' '}
              </>
            )}
            <p> Gap: {gap || 'no gap'} </p>
            {/* <ButtonGroup gap={gap}>
              <Button view="default" size="m">
                Button 1
              </Button>
              <Button view="default" size="m">
                Button 2
              </Button>
              <Button view="default" size="m">
                Button 3
              </Button>
            </ButtonGroup> */}
          </Fragment>
        ))}

        {pins.map((pin) => (
          <Fragment key={`${pin}`}>
            <br /> <br />
            <p> Pin: {pin} </p>
            {/* <ButtonGroup pin={pin} key={pin}>
              <Button view="default" size="m">
                Button 1
              </Button>
              <Button view="default" size="m">
                Button 2
              </Button>
            </ButtonGroup> */}
          </Fragment>
        ))}
      </div>
    </>
  )
}
