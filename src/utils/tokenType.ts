import { isColor } from './color'
import { hasParams } from '../utils/extractParams'

export const getType = (token: string) => {
  if (isColor(token)) {
    return 'color'
  }

  if (typeof token === 'string' && hasParams(token)) {
    return 'link'
  }

  return 'text'
}
