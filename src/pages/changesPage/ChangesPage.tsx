import React, { FC } from 'react'

import { Tokens } from './Tokens'

import './ChangesPage.css'

export type ChangesPageProps = {}

export const ChangesPage: FC<ChangesPageProps> = () => {
  return (
    <div className="ChangesPage">
      <Tokens />
    </div>
  )
}
