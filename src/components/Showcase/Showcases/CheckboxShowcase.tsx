import React from 'react';
import { Checkbox } from '@yandex/ui/Checkbox/desktop/bundle';

import { Headline } from '../../Headline/Headline';

export const CheckboxShowcase = () => {
  return (
    <>
      <Headline>Checkbox</Headline>
      <div className="Showcase-Item">
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
        <br />
        <br />
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
      </div>
    </>
  )
}
