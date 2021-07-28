import React, { FC } from 'react'

import { Showcases } from './Showcases'

export type ShowcaseProps = {
  component: string
  className: string
}

export const Showcase: FC<ShowcaseProps> = ({ className, component }) => (
  // @ts-ignore
  <div className={className}>{Showcases[component]?.()}</div>
)
