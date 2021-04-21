import React, { FC } from 'react'
import { Button, IButtonProps as ButtonProps } from '@yandex/ui/Button/desktop/bundle'
import { useCopyToClipboard } from 'react-use'
import { toast } from 'react-toastify'

export const Share: FC<ButtonProps> = (props) => {
  const [, copyToClipboard] = useCopyToClipboard()

  const handleClick = () => {
    copyToClipboard(window.location.href)
    toast.success('Ссылка успешно скопирована в буфер обмена')
  }

  return (
    <Button {...props} view="action" size="m" onClick={handleClick}>
      Поделиться
    </Button>
  )
}
