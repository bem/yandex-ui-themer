import { createEvent, createStore } from 'effector'

export const isCombineChange = createEvent()
export const isCombineReset = createEvent()

export const $isCombine = createStore(false)

$isCombine.on(isCombineChange, (state) => !state).reset(isCombineReset)
