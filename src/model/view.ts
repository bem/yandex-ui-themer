import { createEffect, createEvent, createStore, forward } from 'effector'
import { createGate } from 'effector-react'
import { getQueryParameter } from '../utils/queryParameters'

export type ViewType = 'figma' | 'web'

export const viewChange = createEvent<ViewType>()

export const $view = createStore<ViewType>('figma')
export const $isFigma = $view.map((state) => state === 'figma')

export const initializeView = createEffect(async () => {
  const isFigma = getQueryParameter('figma')
  viewChange(isFigma === 'true' ? 'figma' : 'web')
})

export const viewInitializationGate = createGate()

$view.on(viewChange, (_, payload) => payload)

forward({
  from: viewInitializationGate.open,
  to: initializeView,
})
