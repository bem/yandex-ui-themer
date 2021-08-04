import React, { FC } from 'react'

import { IconProps } from './types'

export type CloseEyeIconProps = IconProps & { type: 'white' | 'black' }

export const CloseEyeIcon: FC<CloseEyeIconProps> = ({ type, ...props }) => (
  <svg
    {...props}
    width="20"
    height="10"
    viewBox="0 0 20 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.6347 3.24478C18.4044 2.51355 19.0692 1.67306 19.6041 0.748291H17.9623C16.208 3.26336 13.2941 4.90725 9.99726 4.90725C6.70037 4.90725 3.78656 3.26336 2.03219 0.748291H0.390405C0.925582 1.67349 1.59073 2.51435 2.36092 3.24582L0.150391 5.45643L1.13071 6.43671L3.4279 4.13943C4.41331 4.86503 5.52317 5.43164 6.71961 5.80126L5.86431 8.88033L7.20008 9.25138L8.06813 6.1264C8.69462 6.23629 9.33923 6.2936 9.99726 6.2936C10.6558 6.2936 11.301 6.23619 11.9279 6.12612L12.7961 9.25138L14.1318 8.88033L13.2764 5.8008C14.4728 5.43102 15.5825 4.86426 16.5678 4.13852L18.8661 6.43672L19.8464 5.45641L17.6347 3.24478Z"
      fill={type === 'white' ? 'white' : '#222222'}
    />
  </svg>
)
