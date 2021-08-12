import { withBemMod } from '@bem-react/core'

import './Tooltip_dark.css'

export type TooltipDarkProps = {
  /**
   * Стилевое оформление тултипа.
   */
  dark?: boolean
}

/**
 * Модификатор, отвечающий за внешний вид тултипа.
 * @param {TooltipDarkProps} props
 */
export const withDark = withBemMod<TooltipDarkProps>('Tooltip', { dark: true })
