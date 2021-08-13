import { withBemMod } from '@bem-react/core'

import './Modal_view_figma.css'

export type ModalViewFigmaProps = {
  /**
   * Стилевое оформление тултипа.
   */
  view?: 'figma'
}

/**
 * Модификатор, отвечающий за внешний вид модала.
 * @param {ModalViewFigmaProps} props
 */
export const withViewFigma = withBemMod<ModalViewFigmaProps>('Modal', {
  view: 'figma',
})
