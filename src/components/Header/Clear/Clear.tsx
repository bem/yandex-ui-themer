import React, { FC } from 'react'
import { Button, IButtonProps as ButtonProps } from '@yandex/ui/Button/desktop/bundle'

import { variablesResetEvent } from '../../../model/tokens'

export const Clear: FC<ButtonProps> = (props) => {
  return (
    <Button {...props} view="clear" size="m" onClick={variablesResetEvent}>
      Сбросить
    </Button>
  )
}
