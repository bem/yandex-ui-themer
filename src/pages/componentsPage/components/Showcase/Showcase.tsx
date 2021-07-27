import React, { FC } from 'react'

export type ShowcaseProps = {
  className: string
}

export const Showcase: FC<ShowcaseProps> = ({ className }) => <div className={className}></div>
