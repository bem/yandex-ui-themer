import React from 'react'
import { Link } from '@yandex/ui/Link/desktop/bundle'

import { Headline } from '../../../pages/componentsPage/components/Showcase/Showcases/Overview/Headline'

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
