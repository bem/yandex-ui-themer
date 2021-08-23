import React, { FC, useEffect } from 'react'

import { Tokens } from './Tokens'
import { isVariablesChangedReset } from '../../model/designTokens'

import './ChangesPage.css'

export type ChangesPageProps = {}

export const ChangesPage: FC<ChangesPageProps> = () => {
  useEffect(isVariablesChangedReset, [])

  return (
    <div className="ChangesPage">
      <Tokens />
    </div>
  )
}
