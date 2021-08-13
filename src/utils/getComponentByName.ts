import { ExtractProps } from '@bem-react/core'
import { allComponents } from './allComponents'

type ComponentReactTypes = typeof allComponents
export type AllComponentsNames = keyof ComponentReactTypes
export type AllComponentsTypes = {
  [K in AllComponentsNames]: ExtractProps<ComponentReactTypes[K]>
}
export type AllComponentsValues = AllComponentsTypes[AllComponentsNames]

export const getComponentByName = (name: keyof ComponentReactTypes) => {
  return allComponents[name]
}
