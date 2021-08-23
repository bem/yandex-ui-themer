import { compose, composeU } from '@bem-react/core'

// base
import { TabsMenu as TabsMenuCommon } from '@yandex-lego/components/TabsMenu'
// _layout
import { withLayoutHoriz } from '@yandex-lego/components/TabsMenu/_layout/TabsMenu_layout_horiz'
// _size
import { withSizeM } from '@yandex-lego/components/TabsMenu/_size/TabsMenu_size_m'
import { withSizeS } from '@yandex-lego/components/TabsMenu/_size/TabsMenu_size_s'
// _view
import { withViewFigma } from './_view/TabsMenu_view_figma'
// _adaptive
import { withAdaptive } from '@yandex-lego/components/TabsMenu/_adaptive/TabsMenu_adaptive@desktop'

export * from '@yandex-lego/components/TabsMenu/desktop/bundle'

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
