import { compose } from '@bem-react/core'

// base
import { Modal as ModalDesktop, withThemeNormal } from '@yandex-lego/components/Modal'
// _view
import { withViewFigma } from './_view/Modal_view_figma'
// _view

export * from '../Modal'

export const Modal = compose(withViewFigma, withThemeNormal)(ModalDesktop)

Modal.defaultProps = {
  view: 'figma',
}
