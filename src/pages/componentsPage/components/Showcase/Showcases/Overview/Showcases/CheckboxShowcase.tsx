import React from 'react'
import { useStore } from 'effector-react'

import { $isFigma } from '../../../../../../../model/view'
import { Headline } from '../Headline'
import { Fragment } from 'react'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

const Checkbox = getWrappedComponent('Checkbox')

export const CheckboxShowcase = () => {
  const isFigma = useStore($isFigma)
  const view = ['outline', 'default']
  const size = ['s', 'm']

  return (
    <>
      <Headline>Checkbox</Headline>
      {!isFigma &&
        view.map((view: any) => (
          <Fragment key={view}>
            <p>View: {view}</p>
            <div className="Showcase-Item" style={{ display: 'flex', width: 250 }}>
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
                  <div
                    style={{
                      marginBottom: 16,
                      marginRight: 20,
                    }}
                    key={`${view}-${size}`}
                  >
                    <Checkbox view={view} size={size} label="Label" />
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
                <div
                  style={{
                    marginBottom: 16,
                    marginRight: 20,
                  }}
                >
                  <Checkbox view={view} size="s" label="Label" disabled />
                </div>
                <div
                  style={{
                    marginBottom: 16,
                    marginRight: 20,
                  }}
                >
                  <Checkbox view={view} size="m" label="Label" indeterminate />
                </div>
                <div
                  style={{
                    marginBottom: 16,
                    marginRight: 20,
                  }}
                >
                  <Checkbox view={view} size="m" label="Label" checked />
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      {isFigma && (
        <div className="Showcase-Item">
          <p>View: Outline </p>
          <Checkbox size="s" view="outline" label="Label" checked />
          <Checkbox size="s" view="outline" label="Label" />
          <Checkbox size="s" view="outline" label="Label" disabled />
          <Checkbox size="s" view="outline" label="Label" indeterminate />
          <br />
          <br />
          <Checkbox size="m" view="outline" label="Label" checked />
          <Checkbox size="m" view="outline" label="Label" />
          <Checkbox size="m" view="outline" label="Label" disabled />
          <Checkbox size="m" view="outline" label="Label" indeterminate />
          <br />
          <br />
          <p>View: Default </p>
          <Checkbox size="m" view="default" label="Label" checked />
          <Checkbox size="m" view="default" label="Label" />
          <Checkbox size="m" view="default" label="Label" disabled />
          <Checkbox size="m" view="default" label="Label" indeterminate />
          <br />
          <br />
          <Checkbox size="s" view="default" label="Label" checked />
          <Checkbox size="s" view="default" label="Label" />
          <Checkbox size="s" view="default" label="Label" disabled />
          <Checkbox size="s" view="default" label="Label" indeterminate />
        </div>
      )}
    </>
  )
}
