import { $theme } from './themes'
import { MappingsType } from '../types'

/**
 * Object for design tokens mappings storing
 *
 * @example
 *
 * {
 *  'button-view-action-fill-color-base': 'button.viewAction.fillColor.base.value',
 * }
 */
export const $tokenMappings = $theme.map<MappingsType>(({ allTokens }) =>
  Object.entries(allTokens).reduce((acc, [name, { path }]) => {
    const mappedName = [...path, 'value'].join('.')
    return { ...acc, [name]: mappedName }
  }, {}),
)

/**
 * Object for design tokens mappings storing
 *
 * @example
 *
 * {
 *  'button.viewAction.fillColor.base.value': 'button-view-action-fill-color-base',
 * }
 */
export const $invertedTokenMappings = $theme.map<MappingsType>(({ allTokens }) =>
  Object.entries(allTokens).reduce((acc, [name, { path }]) => {
    const mappedName = [...path, 'value'].join('.')
    return { ...acc, [mappedName]: name }
  }, {}),
)
