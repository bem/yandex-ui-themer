import React, { FC } from 'react'

import { IconProps } from './types'

export const TrashIcon: FC<IconProps> = (props) => (
  <svg
    {...props}
    width="12"
    height="16"
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 1.5C4.44772 1.5 4 1.94772 4 2.5H8C8 1.94772 7.55228 1.5 7 1.5H5ZM9 2.5C9 1.39543 8.10457 0.5 7 0.5H5C3.89543 0.5 3 1.39543 3 2.5H1.5H0L0 3.5H1V13.5C1 14.6046 1.89543 15.5 3 15.5H9C10.1046 15.5 11 14.6046 11 13.5V3.5H12V2.5H10.5H9ZM10 3.5H8.5H3.5H2V13.5C2 14.0523 2.44772 14.5 3 14.5H9C9.55228 14.5 10 14.0523 10 13.5V3.5ZM4 10.5V6.5H5V10.5H4ZM7 10.5V6.5H8V10.5H7Z"
      fill="black"
    />
  </svg>
)
