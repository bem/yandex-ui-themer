import React, { FC } from 'react'
import { Button, IButtonProps as ButtonProps } from '@yandex/ui/Button/desktop/bundle'
import { useStore } from 'effector-react'

import { uploadTokensEvent, $loadingTokens } from '../../../model/tokens'

export const Share: FC<ButtonProps> = (props) => {
  const loading = useStore($loadingTokens)

  return (
    <Button {...props} view="action" size="m" onClick={uploadTokensEvent} progress={loading}>
      Поделиться
    </Button>
  )
}
