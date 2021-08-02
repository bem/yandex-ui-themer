import React, { FC } from 'react'
import { useStore } from 'effector-react'

import { $isCombine } from '../../../model/combine'
import { variablesReset } from '../../../model/designTokens'

import { TrashIcon } from '../../../icons'

export type ControlsProps = { className: string }

export const Controls: FC<ControlsProps> = (props) => {
  const isCombine = useStore($isCombine)

  return (
    <div {...props}>
      {!isCombine && (
        <div className="Control" onClick={variablesReset}>
          <TrashIcon className="Reset-Icon" />
          Reset all changes
        </div>
      )}
    </div>
  )
}
