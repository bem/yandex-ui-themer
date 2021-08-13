import React from 'react'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

const Link = getWrappedComponent('Link')

export const LinkShowcase = () => {
  return (
    <>
      <Headline>Link</Headline>
      <div className="Showcase-Item">
        <Link href="https://ya.ru" view="default">
          Ссылка
        </Link>
        <br />
        <Link view="default" pseudo>
          Ссылка
        </Link>
        <br />
        <Link href="https://ya.ru" view="default" disabled>
          Ссылка
        </Link>
      </div>
    </>
  )
}
