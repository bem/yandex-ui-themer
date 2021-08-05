import { createStore, createEvent } from 'effector'

export const componentChange = createEvent<string>()
export const tokenChange = createEvent<string>()
export const tokenReset = createEvent()

// Current selected component to be shown
export const $component = createStore<string>('overview')

// Current selected token to be edited
export const $token = createStore<string>('')
export const $tokenPresent = $token.map((token) => token.length > 0)

$component.on(componentChange, (_, component) => component)

$token.on(tokenChange, (_, token) => token).reset(tokenReset)
