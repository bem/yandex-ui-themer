import { createStore, createEvent } from 'effector'

import { theme as themeDefault } from '@yandex/ui/Theme/presets/default'
import { theme as themeInverse } from '@yandex/ui/Theme/presets/inverse'
import { theme as themeBrand } from '@yandex/ui/Theme/presets/brand'

import stylesDataDefault from '../themes/presets/example/root.json'
import stylesDataInverse from '../themes/presets/example-inverse/root.json'
import stylesDataBrand from '../themes/presets/example-brand/root.json'

import mappingsDataDefault from '../themes/presets/example/mappings.json'
import mappingsDataInverse from '../themes/presets/example-inverse/mappings.json'
import mappingsDataBrand from '../themes/presets/example-brand/mappings.json'

import { ThemeType, ThemeNamesType, TokensType } from '../types'

const themeToAllTokens = (theme: TokensType) => ({
  ...theme.globals,
  ...Object.values(theme.components).reduce((acc, val) => ({ ...acc, ...val })),
})

export const themeChange = createEvent<ThemeNamesType>()

export const $themes = createStore<Record<string, ThemeType>>({
  default: {
    tokens: stylesDataDefault,
    mappings: mappingsDataDefault,
    preset: themeDefault,
    allTokens: themeToAllTokens(stylesDataDefault),
  },
  inverse: {
    tokens: stylesDataInverse,
    mappings: mappingsDataInverse,
    preset: themeInverse,
    allTokens: themeToAllTokens(stylesDataInverse),
  },
  brand: {
    tokens: stylesDataBrand,
    mappings: mappingsDataBrand,
    preset: themeBrand,
    allTokens: themeToAllTokens(stylesDataBrand),
  },
})

export const $themesNames = $themes.map((themes) => Object.keys(themes))

export const $theme = createStore<ThemeType>($themes.getState().default)

export const $themeName = createStore<ThemeNamesType>('default')

$theme.on(themeChange, (_, themeName) => $themes.getState()[themeName])

$themeName.on(themeChange, (_, themeName) => themeName)
