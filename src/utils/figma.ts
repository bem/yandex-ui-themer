import { htmlToFigma } from 'html-figma/browser'

interface SendToFigmaParams {
  id?: string
  props: unknown
  name: string
  elem: HTMLElement
  position: {
    dropPosition: { clientX: number; clientY: number }
    offset: {
      x: number
      y: number
    }
    windowSize: { width: number; height: number }
  }
}

export const sendToFigma = ({ id, props = {}, name, elem, position }: SendToFigmaParams) => {
  const result = elem ? htmlToFigma(elem) : null

  window.parent.postMessage(
    {
      pluginMessage: {
        type: 'import',
        figmaId: id,
        data: {
          // @ts-ignore
          layers: result,
          props,
          name,
          position,
        },
      },
    },
    '*',
  )
}
