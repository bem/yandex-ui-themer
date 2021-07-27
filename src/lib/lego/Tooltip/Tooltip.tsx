import { compose } from '@bem-react/core'

// base
import {
  Tooltip as TooltipDesktop,
  TooltipStateful as TooltipStatefulDesktop,
} from '@yandex/ui/Tooltip/Tooltip@desktop'

// _size
import { withSizeS } from '@yandex/ui/Tooltip/_size/Tooltip_size_s'
// _view
import { withViewDefault } from '@yandex/ui/Tooltip/_view/Tooltip_view_default'

import './Tooltip_view_default.css'

export * from '@yandex/ui/Tooltip/Tooltip@desktop'

const enhance = compose(withViewDefault, withSizeS)

export const Tooltip = enhance(TooltipDesktop)
export const TooltipStateful = enhance(TooltipStatefulDesktop)

Tooltip.defaultProps = {
  hasTail: true,
  view: 'default',
  size: 's',
  direction: 'left',
}

TooltipStateful.defaultProps = {
  hasTail: true,
  view: 'default',
  size: 's',
  direction: 'left',
}
