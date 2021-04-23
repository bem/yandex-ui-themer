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

import { ThemeType, ThemeNames } from '../types'

export const changeThemeEvent = createEvent<ThemeNames>()

export const $themes = createStore<Record<string, ThemeType>>({
  default: {
    tokens: stylesDataDefault,
    mappings: mappingsDataDefault,
    preset: themeDefault,
  },
  inverse: {
    tokens: stylesDataInverse,
    mappings: mappingsDataInverse,
    preset: themeInverse,
  },
  brand: {
    tokens: stylesDataBrand,
    mappings: mappingsDataBrand,
    preset: themeBrand,
  },
})

export const $themesNames = $themes.map((themes) => Object.keys(themes))

export const $theme = createStore<ThemeType>($themes.getState().default)

export const $themeName = createStore<string>('default')

$theme.on(changeThemeEvent, (_, themeName) => $themes.getState()[themeName])

$themeName.on(changeThemeEvent, (_, themeName) => themeName)
