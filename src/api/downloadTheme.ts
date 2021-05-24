import { MappingsType } from '../types'

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
      actions: ['process-color'],
    },
  },
}

export const downloadTheme = async (content: any, mappings: MappingsType) => {
  const body = JSON.stringify({
    config: themeboxConfig,
    tokens: {
      language: 'yaml',
      content: content,
    },
    mappings,
  })

  const response = await fetch('https://themebox.now.sh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.error)
  }

  const res = JSON.parse(json.data[0].content)
  const tokens = Object.entries(res).map(([_, item]: any) => ({
    path: item.path,
    name: item.name,
    value: item.value,
    rawValue: item.rawValue,
    changed: true,
  }))

  return tokens
}
