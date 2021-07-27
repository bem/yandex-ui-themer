import { compose, composeU } from '@bem-react/core'

// base
import { TabsMenu as TabsMenuCommon } from '@yandex/ui/TabsMenu'
// _layout
import { withLayoutHoriz } from '@yandex/ui/TabsMenu/_layout/TabsMenu_layout_horiz'
// _size
import { withSizeM } from '@yandex/ui/TabsMenu/_size/TabsMenu_size_m'
import { withSizeS } from '@yandex/ui/TabsMenu/_size/TabsMenu_size_s'
// _view
import { withViewDefault } from '@yandex/ui/TabsMenu/_view/TabsMenu_view_default@desktop'
// _adaptive
import { withAdaptive } from '@yandex/ui/TabsMenu/_adaptive/TabsMenu_adaptive@desktop'

import './TabsMenu_view_default@desktop.css'

export * from '@yandex/ui/TabsMenu/desktop/bundle'

export const TabsMenu = compose(
  withLayoutHoriz,
  withViewDefault,
  withAdaptive,
  composeU(withSizeM, withSizeS),
)(TabsMenuCommon)

TabsMenu.defaultProps = {
  view: 'default',
  layout: 'horiz',
  size: 'm',
}
