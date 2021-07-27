import React, { FC } from 'react'

import { IconProps } from './types'

export const UnionIcon: FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.74279 2.74819L6.00006 0.500244L8.25733 2.74819L6.00006 4.99614L3.74279 2.74819ZM2.74819 8.25731L0.500244 6.00004L2.74819 3.74278L4.99614 6.00004L2.74819 8.25731ZM8.25731 9.25191L6.00004 11.4999L3.74278 9.25191L6.00004 7.00396L8.25731 9.25191ZM11.4999 6.00006L9.25191 3.74279L7.00396 6.00006L9.25191 8.25733L11.4999 6.00006Z"
      fill="#7B61FF"
    />
  </svg>
)
