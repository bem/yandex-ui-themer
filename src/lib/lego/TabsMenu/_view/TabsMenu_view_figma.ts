import { withBemMod } from '@bem-react/core'

import './TabsMenu_view_figma.css'

export type TabsMenuViewFigmaProps = {
  /**
   * Стилевое оформление тултипа.
   */
  view?: 'figma'
}

/**
 * Модификатор, отвечающий за внешний вид тултипа.
 * @param {TabsMenuViewFigmaProps} props
 */
export const withViewFigma = withBemMod<TabsMenuViewFigmaProps>('TabsMenu', {
  view: 'figma',
})
