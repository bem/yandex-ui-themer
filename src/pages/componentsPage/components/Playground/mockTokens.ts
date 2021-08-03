import { TokenInfoType } from '../../../../types'

export type MockTokensType = Record<string, TokenInfoType & { type: 'text' | 'color' }>

export const mockTokens: MockTokensType = {
  'attach-font-family': {
    value: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    path: ['attach', 'fontFamily'],
    type: 'text',
  },
  'attach-typo-color': {
    value: '#000',
    path: ['attach', 'typoColor'],
    type: 'color',
  },
  'attach-reset-width': {
    value: '12px',
    path: ['attach', 'reset', 'width'],
    type: 'text',
  },
  'attach-reset-height': {
    value: '12px',
    path: ['attach', 'reset', 'height'],
    type: 'text',
  },
  'attach-reset-indentLeft': {
    value: '5px',
    path: ['attach', 'reset', 'indentLeft'],
    type: 'text',
  },
}
