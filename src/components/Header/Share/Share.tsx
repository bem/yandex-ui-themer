import React, { FC } from 'react'
import { Button, IButtonProps as ButtonProps } from '@yandex/ui/Button/desktop/bundle'
import { useStore } from 'effector-react'

import { shareTokensEvent, $shareTokensLoading } from './model'

export const Share: FC<ButtonProps> = (props) => {
  const loading = useStore($shareTokensLoading)

  return (
    <Button {...props} view="action" size="m" onClick={shareTokensEvent} progress={loading}>
      Поделиться
    </Button>
  )
}
