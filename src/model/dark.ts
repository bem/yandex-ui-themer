import { createEvent, createStore } from 'effector'

export const darkToggle = createEvent()

export const $dark = createStore(false)

$dark.on(darkToggle, (state, _) => !state)
