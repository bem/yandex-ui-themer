import React, { FC } from 'react'

import { IconProps } from './types'

export type BackIconProps = IconProps

export const BackIcon: FC<BackIconProps> = ({ ...props }) => (
  <svg
    {...props}
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.70718 5.00004L5.35363 7.64648L4.64652 8.35359L1.14652 4.85359L0.792969 4.50004L1.14652 4.14648L4.64652 0.646484L5.35363 1.35359L2.70718 4.00004H6.50008C10.0762 4.00004 13.0001 6.9239 13.0001 10.5L13.0001 12H12.0001L12.0001 10.5C12.0001 7.47618 9.52393 5.00004 6.50008 5.00004H2.70718Z"
      fill="black"
      fillOpacity="0.8"
    />
  </svg>
)
