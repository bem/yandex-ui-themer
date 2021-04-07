# yandex-ui-themer

A simple way to create your theme for [@yandex/ui](https://github.com/bem/yandex-ui) with [Themekit](https://github.com/yarastqt/themekit)

![](https://user-images.githubusercontent.com/6236209/97804446-11bdf800-1c61-11eb-8382-9b7d78e2f773.gif)

## How to add new component to Theme Constructor

1. Update *@yandex/ui* to version where the component is introduced

```bash
npm i @yandex/ui@latest
```

2. Rebuild theme tokens

```bash
npm ci
npm run tokens:build
```

3. Add new component into *componentList* in *themekit.config.js*

> **_NOTE:_**  It is better to add components in alphabetical order.

```javascript
const componentsList = [
  "attach",
  "badge",
  ...,
  "componentName"
  ...
]
```

4. Add the showcase for the component in *src/components/Showcase/Showcases/ComponentShowcase.tsx*

> **_NOTE:_** Showcase should cover all possible tokens of the component. Otherwise, designers could not tune all of the tokens in Theme Constructor.

```javascript
import React from 'react';
import { Component } from '@yandex/ui/Component/desktop/bundle';

import { Headline } from '../../Headline/Headline';

export const ComponentShowcase = () => {
    return (
        <Headline>ComponentName</Headline>
        <div className="Showcase-Item">
            <Component />
        </div>
    )
}
```

5. Add the component showcase to *componentsMap* in *src/components/Showcase/Showcase.tsx*

```javascript
import { ComponentShowcase } from './Showcases/ComponentShowcase';

const componentsMap: Record<string, ComponentType> = {
    button: ButtonShowcase,
    buttonGroup: ButtonGroupShowcase,
    ...,
    component: ComponentShowcase,
    ...
}
```

## License

[MPL-2.0](https://github.com/bem/yandex-ui-themer/blob/master/LICENSE.md)
