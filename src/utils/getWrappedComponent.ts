import React, { createElement } from 'react'
import { ComponentWrapper } from '../pages/componentsPage/components/ComponentWrapper/ComponentWrapper'
import { AllComponentsNames, AllComponentsTypes } from './getComponentByName'

// function getWrappedComponent<T extends AllComponentsNames>(name: T) => (props: AllComponentsTypes[T]) => React.FC<unknown>

export function getWrappedComponent<T extends AllComponentsNames>(
  name: T,
): React.FC<AllComponentsTypes[T]> {
  return (props, ref) =>
    createElement(
      ComponentWrapper,
      // @ts-ignore
      { ...props, __name: name, ref },
    )
}
