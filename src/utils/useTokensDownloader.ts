import { useEffect } from 'react'

import { variablesChangedBatch } from '../state/tokens'

export function useTokensDownloader(tokensHash: string) {
  useEffect(() => {
    if (!tokensHash) {
      return
    }

    const fetchTokens = async () => {
      const response = await fetch('https://functions.yandexcloud.net/d4eg1ughq5da8rgfonij', {
        method: 'POST',
        body: JSON.stringify({
          tokensHash,
        }),
      })

      const rawData = await response.json()
      const tokens = JSON.parse(rawData)
      variablesChangedBatch(tokens)
    }

    fetchTokens()
  }, [tokensHash])
}
