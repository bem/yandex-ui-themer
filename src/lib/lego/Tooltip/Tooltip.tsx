import { compose } from '@bem-react/core'

// base
import {
  Tooltip as TooltipDesktop,
  TooltipStateful as TooltipStatefulDesktop,
} from '@yandex-lego/components/Tooltip/Tooltip@desktop'

// _size
import { withSizeS } from '@yandex-lego/components/Tooltip/_size/Tooltip_size_s'
// _view
import { withViewFigma } from './_view/Tooltip_view_figma'

import { withDark } from './_dark/Tooltip_dark'

export * from '@yandex-lego/components/Tooltip/Tooltip@desktop'

const enhance = compose(withViewFigma, withDark, withSizeS)

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
