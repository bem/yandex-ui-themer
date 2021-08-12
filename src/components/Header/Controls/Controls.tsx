import React, { FC, useRef, useState } from 'react'
import { useStore } from 'effector-react'

import { Modal } from '../../../lib/lego/Modal'
import { $isCombine } from '../../../model/combine'
import { variablesReset, $hasTokens } from '../../../model/designTokens'

import { TrashIcon } from '../../../icons'
import { Button, Icon } from 'react-figma-components'

import './Controls.css'

export type ControlsProps = { className: string }

export const Controls: FC<ControlsProps> = (props) => {
  const scopeRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const isCombine = useStore($isCombine)
  const changesPresent = useStore($hasTokens)

  const handleClick = () => {
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  const handleSubmit = () => {
    variablesReset()
    setVisible(false)
  }

  return (
    <div {...props} ref={scopeRef}>
      {!isCombine && changesPresent && (
        <div className="Control" onClick={handleClick}>
          <TrashIcon className="Reset-Icon" />
          Reset all changes
        </div>
      )}
      <Modal theme="normal" visible={visible} scope={scopeRef} onClose={handleClose}>
        <div className="Reset-Modal">
          <div className="Title">
            <span>Do you want to reset all changes?</span>
            <Icon name="close" color="black" onClick={handleClose} className="CloseIcon" />
          </div>
          <div className="Buttons">
            <Button view="secondary" onPress={handleClose}>
              Cancel
            </Button>
            <Button view="primary" destructive onPress={handleSubmit}>
              Reset changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
