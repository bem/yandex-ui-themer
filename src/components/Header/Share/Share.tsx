import React, { FC } from 'react'
import { Button, IButtonProps as ButtonProps } from '@yandex/ui/Button/desktop/bundle'
import { useStore } from 'effector-react'

import { tokensShare, $shareTokensLoading, $shareTokensDisabled } from './model'

export const Share: FC<ButtonProps> = (props) => {
  const loading = useStore($shareTokensLoading)
  const disabled = useStore($shareTokensDisabled)

  return (
    <Button
      {...props}
      view="action"
      size="m"
      onClick={tokensShare}
      progress={loading}
      disabled={disabled}
      data-testid="share-button"
    >
      Поделиться
    </Button>
  )
}
