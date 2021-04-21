import React, { useState } from 'react'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { useCopyToClipboard } from 'react-use'
import { useStore } from 'effector-react'

import { $listDesignTokens } from '../../state/tokens'

export function LinkGenerator() {
  const [loading, setLoading] = useState(false)
  const [, copyToClipboard] = useCopyToClipboard()
  const listDesignTokens = useStore($listDesignTokens)

  const handleLinkGeneration = () => {
    const uploadTokens = async () => {
      setLoading(true)

      const response = await fetch('https://functions.yandexcloud.net/d4emk05t1v8gvek4q8l0', {
        method: 'POST',
        body: JSON.stringify({
          tokens: listDesignTokens,
        }),
      })

      const json = await response.json()

      const locationNoQueryParams = window.location.href.replace(window.location.search, '')

      const queryParams = new URLSearchParams(window.location.search)
      queryParams.set('tokensHash', json.tokensHash)

      copyToClipboard(`${locationNoQueryParams}?${queryParams.toString()}`)
      setLoading(false)
    }

    uploadTokens()
  }

  return (
    <Button view="action" size="m" onClick={handleLinkGeneration} progress={loading}>
      Сгенерировать ссылку
    </Button>
  )
}
