import { createStore, createEvent } from 'effector'

export const componentChange = createEvent<string>()
export const tokenChange = createEvent<string>()
export const tokenReset = createEvent()
export const activeTabChange = createEvent<string>()

// Current selected component to be shown
export const $component = createStore<string>('overview')

// Current selected token to be edited
export const $token = createStore<string>('')
export const $tokenPresent = $token.map((token) => token.length > 0)

// Current tab to show
export const $activeTab = createStore<string>('')

$component.on(componentChange, (_, component) => component)

$token.on(tokenChange, (_, token) => token).reset(tokenReset)

$activeTab.on(activeTabChange, (_, activeTab) => activeTab)
