import { createStore, createEvent } from 'effector'

export const componentChange = createEvent<string>()

// Current selected component to be shown
export const $component = createStore<string>('overview')

$component.on(componentChange, (_, component) => component)
