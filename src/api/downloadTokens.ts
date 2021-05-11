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

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.errorMessage)
  }

  return JSON.parse(json) as { tokens: VariablesType[]; theme: string }
}
