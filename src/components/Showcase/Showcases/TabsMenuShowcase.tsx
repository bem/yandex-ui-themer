import React from 'react';
import { TabsMenu } from '@yandex/ui/TabsMenu/desktop/bundle';

import { Headline } from '../../Headline/Headline';

export const TabsMenuShowcase = () => {
  return (
    <>
      <Headline>TabsMenu</Headline>
      <div className="Showcase-Item">
        <TabsMenu
          size="m"
          view="default"
          layout="horiz"
          tabs={[
            { id: 'search', content: 'Поиск' },
            { id: 'images', content: 'Картинки' },
            { id: 'video', content: 'Видео' },
          ]}
          activeTab={'search'}
        />

        <br />
        <TabsMenu
          size="s"
          view="default"
          layout="horiz"
          tabs={[
            { id: 'search', content: 'Поиск' },
            { id: 'images', content: 'Картинки' },
            { id: 'video', content: 'Видео' },
          ]}
          activeTab={'search'}
        />
      </div>
    </>
  )
}
