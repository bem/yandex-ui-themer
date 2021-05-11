import { VariablesType } from '../types'

export const uploadTokens = async (theme: string, tokens: VariablesType[]) => {
  const response = await fetch('https://functions.yandexcloud.net/d4emk05t1v8gvek4q8l0', {
    method: 'POST',
    body: JSON.stringify({
      theme,
      tokens,
    }),
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.errorMessage)
  }

  return json.tokensHash
}
