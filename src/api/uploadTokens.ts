import { VariablesType } from '../types'

export const uploadTokens = async (tokens: VariablesType[], tokensToDelete?: string | null) => {
  const response = await fetch('https://functions.yandexcloud.net/d4emk05t1v8gvek4q8l0', {
    method: 'POST',
    body: JSON.stringify({
      tokens,
      tokensToDelete,
    }),
  })

  const json = await response.json()
  return json.tokensHash
}
