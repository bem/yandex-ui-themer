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
