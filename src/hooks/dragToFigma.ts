import { useEffect } from 'react'
import { sendToFigma } from '../utils/figma'

interface ComponentParams {
  name: string
  props: unknown
}

const fixYOffset = 44

export const useDragToFigma = (
  elementRef: React.RefObject<HTMLElement>,
  dragRef: React.RefObject<HTMLElement>,
  params: ComponentParams,
) => {
  useEffect(() => {
    let offsetX = 0
    let offsetY = 0
    let iframeX = 0
    let iframeY = 0

    if (!dragRef?.current || !elementRef?.current) return

    const dragElem = dragRef.current

    const dragStartHandler = (e: DragEvent) => {
      // const { offsetX, offsetY } = e.nativeEvent;
      //@ts-ignore
      e.dataTransfer.effectAllowed = 'copyMove'
      //@ts-ignore
      e.dataTransfer.setData('text/plain', e.currentTarget?.innerHTML)
      //@ts-ignore
      e.dataTransfer.dropEffect = 'copy'
      // Getting the offset position (The position of the cursor relative to the top-left corner of item being dragged)

      offsetX = e.offsetX
      offsetY = e.offsetY
      iframeX = e.screenX - e.clientX
      iframeY = e.screenY - e.clientY
    }

    const dragEndHandler = (e: DragEvent) => {
      // Don't proceed if the item was dropped inside the plugin window.
      // if (e.view?.length === 0) return;

      // Getting the size of the app/browser window.
      const windowSize = {
        width: window.outerWidth,
        height: window.outerHeight,
      }

      // Getting the position of the cursor relative to the top-left corner of the browser page (Where the hamburger icon is)
      const dropPosition = {
        clientX: iframeX + e.clientX - window.screenLeft,
        clientY: iframeY + e.clientY - window.screenTop - fixYOffset,
      }

      // These are the offsets set from the dragstart event.
      const offset = {
        x: offsetX,
        y: offsetY,
      }
      sendToFigma({
        position: { offset, dropPosition, windowSize },
        elem: elementRef.current as HTMLElement,
        name: params.name,
        props: params.props || {},
        // props: {},
      })
    }

    dragElem?.addEventListener('dragstart', dragStartHandler)
    dragElem?.addEventListener('dragend', dragEndHandler)

    return () => {
      dragElem?.removeEventListener('dragstart', dragStartHandler)
      dragElem?.removeEventListener('dragend', dragEndHandler)
    }
  }, [dragRef, elementRef, params.props, params.name])
}
