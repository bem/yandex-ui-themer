import React, { createElement, useRef } from 'react'
import { cn } from '@bem-react/classname'


import './ComponentWrapper.css';
import { useDragToFigma } from '../../../../hooks/dragToFigma';
import { AllComponentsNames, getComponentByName } from '../../../../utils/getComponentByName';

const cnComponentWrapper = cn('ComponentWrapper')

export const ComponentWrapper: React.FC<{
  __name: AllComponentsNames
  props: unknown
}> = React.forwardRef((props, ref) => {
  const { __name, ...componentProps } = props
  const component = getComponentByName(__name);
  const componentRef = useRef<HTMLElement>(null)
  const dragRef = useRef(null)

  useDragToFigma(dragRef, dragRef, { name: __name, props: componentProps })

  return (
    <div ref={dragRef} draggable className={cnComponentWrapper()}>
      <div className={cnComponentWrapper('Element')}>
        {
          // @ts-expect-error
          createElement(component, {
            ...componentProps,
            // ref
          })
        }
      </div>
    </div>
  )
})
