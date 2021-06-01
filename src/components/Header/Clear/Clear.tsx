import React, { FC } from 'react'
import { Button, IButtonProps as ButtonProps } from '@yandex/ui/Button/desktop/bundle'

import { variablesReset } from '../../../model/tokens'

export const Clear: FC<ButtonProps> = (props) => {
  return (
    <Button {...props} view="clear" size="m" onClick={variablesReset}>
      Сбросить
    </Button>
  )
}
