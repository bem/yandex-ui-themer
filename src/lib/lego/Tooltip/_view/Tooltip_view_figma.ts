import { withBemMod } from '@bem-react/core'

import './Tooltip_view_figma.css'

export type TooltipViewFigmaProps = {
  /**
   * Стилевое оформление тултипа.
   */
  view?: 'figma'
}

/**
 * Модификатор, отвечающий за внешний вид тултипа.
 * @param {TooltipViewFigmaProps} props
 */
export const withViewFigma = withBemMod<TooltipViewFigmaProps>('Tooltip', {
  view: 'figma',
})
