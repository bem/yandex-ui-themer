import { useList } from 'effector-react'
import React, { FC } from 'react'

import { TextinputField } from './TextinputField'
import { $tokens } from '../../model'

import { mockTokens } from './mockTokens'

export type TokensProps = {}

export const Tokens: FC<TokensProps> = () =>
  useList($tokens, (props) => {
    return <TextinputField {...props} />
  })
