import React from 'react'
import { Button } from '@yandex-lego/components/Button/desktop/bundle'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

// const Badge = getWrappedComponent('Badge');

const IconTwo = () => (
  <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
    <path d="M4.5 18a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0-3a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5zm11 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0-3a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5zM19 4H5.78L4.97.758A.998.998 0 0 0 4 0H1a1 1 0 0 0 0 2h2.22l.805 3.222.01.042 1.995 7.98a1 1 0 0 0 1.135.743l11.017-1.837c1.02-.17 1.818-1.11 1.818-2.14V5a1 1 0 0 0-1-1zm-1 6.01c0 .05-.085.157-.146.167L7.746 11.862 6.28 6H18v4.01z" />
  </svg>
)

export const BadgeShowcase = () => {
  return (
    <>
      <Headline>Badge</Headline>
      <div
        className="Showcase-Item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 250,
        }}
      >
        {/* <Badge />

        <Badge content="?" />

        <Badge content={5}>
          <IconTwo />
        </Badge>

        <Button view="default" size="m">
          Закладка
          <Badge color="#0679ff" outlineColor="#0679ff" content={5} style={{ marginLeft: 5 }} />
        </Button> */}
      </div>
    </>
  )
}
