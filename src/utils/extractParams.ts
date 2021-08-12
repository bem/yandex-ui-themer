import { ParamsType } from '../types'
import { PARAM_DASH_RE, BRACES_REMOVAL_RE } from './constants'

/**
 * Get parameters from string.
 *
 * @param value {string} String from which parameters should be retrieved
 * @returns {ParamsType[] | undefined}
 *
 * @example
 *
 * extractParams('{button-bg-color}') // [ { template: '{button-bg-color}', token: 'button-bg-color'} ]
 * extractParams('{width} {height}') // [ {template: '{width}', token: 'width'}, { template: '{height}', token: 'height'} ]
 */
export const extractParams = (
  value: string,
  template: RegExp = PARAM_DASH_RE,
): ParamsType[] | undefined => {
  const params = String(value).match(template)

  if (!params) {
    return
  }

  return params.reduce<ParamsType[]>(
    (acc, el) => [...acc, { template: el, token: el.replace(BRACES_REMOVAL_RE, '') }],
    [],
  )
}

export const hasParams = (value: string, template: RegExp = PARAM_DASH_RE): boolean => {
  const params = value.match(template)
  return Boolean(params)
}
