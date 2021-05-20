import { $theme } from './themes'

/**
 * Object for design tokens mappings storing
 *
 * @example
 *
 * {
 *  'button-view-action-fill-color-base': 'button.viewAction.fillColor.base.value',
 * }
 */
export const $tokenMappings = $theme.map(({ allTokens }) =>
  Object.entries(allTokens).reduce((acc, [name, { path }]) => {
    const mappedName = [...path, 'value'].join('.')
    return { ...acc, [name]: mappedName }
  }, {}),
)
