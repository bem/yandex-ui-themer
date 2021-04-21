import { MappingsType, VariablesType } from '../types'

export const themeboxConfig = {
  output: {
    css: {
      transforms: ['name/cti/kebab', 'json/extended/mapper'],
      buildPath: './themes',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/extended',
        },
      ],
    },
  },
}

export const downloadTheme = (
  content: any,
  mappings?: MappingsType,
  onError?: (err: string) => void,
  onSuccess?: (tokens: VariablesType[]) => void,
) => {
  const body = JSON.stringify({
    config: themeboxConfig,
    tokens: {
      language: 'yaml',
      content: content,
    },
    mappings,
  })

  fetch('https://themebox.now.sh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        onError?.(response.error)
        return
      }

      const res = JSON.parse(response.data[0].content)
      const tokens = Object.entries(res).map(([_, item]: any) => ({
        path: item.path,
        name: item.name,
        value: item.value,
        changed: true,
      }))

      onSuccess?.(tokens)
    })
}
