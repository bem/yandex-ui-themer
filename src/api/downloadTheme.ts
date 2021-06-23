import { MappingsType } from '../types'
import { build } from '@yandex/themekit/lib/core/build'
import { parseContent } from '@yandex/themekit/lib/core/parseContent'

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
  const res = await build([
    {
      mapper: mappings,
      whitepaper: {},
      entry: 'browser',
      platform: 'desktop',
      properties: parseContent(content, 'yaml') as object,
      ...themeboxConfig,
    },
  ])

  const properties = res['css'].dictionary.allProperties

  const tokens = Object.entries(properties).map(([_, item]: any) => ({
    path: item.path,
    name: item.name,
    value: item.value,
    rawValue: item.original.value,
    changed: true,
  }))

  return tokens
}
