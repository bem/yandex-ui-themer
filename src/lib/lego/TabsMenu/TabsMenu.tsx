import { compose, composeU } from '@bem-react/core'

// base
import { TabsMenu as TabsMenuCommon } from '@yandex/ui/TabsMenu'
// _layout
import { withLayoutHoriz } from '@yandex/ui/TabsMenu/_layout/TabsMenu_layout_horiz'
// _size
import { withSizeM } from '@yandex/ui/TabsMenu/_size/TabsMenu_size_m'
import { withSizeS } from '@yandex/ui/TabsMenu/_size/TabsMenu_size_s'
// _view
import { withViewFigma } from './_view/TabsMenu_view_figma'
// _adaptive
import { withAdaptive } from '@yandex/ui/TabsMenu/_adaptive/TabsMenu_adaptive@desktop'

export * from '@yandex/ui/TabsMenu/desktop/bundle'

export const TabsMenu = compose(
  withLayoutHoriz,
  withViewFigma,
  withAdaptive,
  composeU(withSizeM, withSizeS),
)(TabsMenuCommon)

TabsMenu.defaultProps = {
  view: 'figma',
  layout: 'horiz',
  size: 'm',
}
