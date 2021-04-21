import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { useCopyToClipboard } from 'react-use'
import { useStore } from 'effector-react'

import { $tokensQueryParameter } from '../../state/tokens'

export function Share() {
  const [disabled, setDisabled] = useState(true)
  const firstUpdate = useRef(true)
  const tokensQueryParameter = useStore($tokensQueryParameter)
  const [, copyToClipboard] = useCopyToClipboard()

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    setDisabled(false)
  }, [tokensQueryParameter])

  const handleClick = () => {
    copyToClipboard(window.location.href)
  }

  return (
    <Button view="action" size="m" onClick={handleClick} disabled={disabled}>
      Поделиться
    </Button>
  )
}
