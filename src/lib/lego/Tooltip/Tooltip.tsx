import { compose } from '@bem-react/core'

// base
import {
  Tooltip as TooltipDesktop,
  TooltipStateful as TooltipStatefulDesktop,
} from '@yandex/ui/Tooltip/Tooltip@desktop'

// _size
import { withSizeS } from '@yandex/ui/Tooltip/_size/Tooltip_size_s'
// _view
import { withViewFigma } from './_view/Tooltip_view_figma'

export * from '@yandex/ui/Tooltip/Tooltip@desktop'

const enhance = compose(withViewFigma, withSizeS)

export const Tooltip = enhance(TooltipDesktop)
export const TooltipStateful = enhance(TooltipStatefulDesktop)

Tooltip.defaultProps = {
  hasTail: true,
  view: 'figma',
  size: 's',
  direction: 'left',
}

TooltipStateful.defaultProps = {
  hasTail: true,
  view: 'figma',
  size: 's',
  direction: 'left',
}
