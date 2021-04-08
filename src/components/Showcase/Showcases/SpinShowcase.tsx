import React from 'react';
import { Spin } from '@yandex/ui/Spin/desktop/bundle';

import { Headline } from '../../Headline/Headline';

export const SpinShowcase = () => {
  return (
    <>
      <Headline>Spin</Headline>
      <div className="Showcase-Item">
        <Spin progress view="default" size="l" />
        <Spin progress view="default" size="m" />
        <Spin progress view="default" size="s" />
        <Spin progress view="default" size="xs" />
        <Spin progress view="default" size="xxs" />
      </div>
    </>
  )
}
