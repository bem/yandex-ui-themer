import React from 'react'
import { useStore } from 'effector-react'

import { $dark } from '../../../../../../../model/dark'
import './Headline.css'

export const Headline: React.FC = ({ children }) => {
  const dark = useStore($dark)
  return <div className={`Headline ${dark && 'Headline_dark'}`}>{children}</div>
}
