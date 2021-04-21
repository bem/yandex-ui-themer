import { VariablesType } from '../types'

export const downloadTokens = async (tokensHash: string | null) => {
  if (!tokensHash) {
    return
  }

  const response = await fetch('https://functions.yandexcloud.net/d4eg1ughq5da8rgfonij', {
    method: 'POST',
    body: JSON.stringify({
      tokensHash,
    }),
  })

  const rawData = await response.json()
  return JSON.parse(rawData) as { tokens: VariablesType[]; theme: string }
}
