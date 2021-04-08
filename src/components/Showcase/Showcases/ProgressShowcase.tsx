import React from 'react';
import { Progress } from '@yandex/ui/Progress/desktop/bundle';

import { Headline } from '../../Headline/Headline';

export const ProgressShowcase = () => {
  return (
    <>
      <Headline>Progres</Headline>
      <div className="Showcase-Item">
        <Progress timing="linear" value={50} maxValue={100} />
      </div>
    </>
  )
}
