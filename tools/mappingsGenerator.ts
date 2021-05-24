const fg = require('fast-glob')
const fs = require('fs')
const yaml = require('yaml')

type Path = string
type ThemeName = string
type TokenKey = string
type TokenMapping = string

console.log(`> theme configs loading...`)

const configs: Path[] = fg.sync('src/themes/*.theme.json')

console.log(`> found ${configs.length} theme paths: \n\t${configs.join('\n\t')}\n`)

const mappers = configs.reduce<Record<ThemeName, Path[]>>((acc, path) => {
  // "src/themes/example.theme.json" -> "example"
  const name = path.match(/(?!.*\/)([^.]+)/)?.[0]
  const paths: Path[] = JSON.parse(fs.readFileSync(path, 'utf8')).mappers

  if (name) {
    return { ...acc, [name]: paths }
  }

  return acc
}, {})

const mappersLenght = Object.values(mappers).reduce((acc, mapper) => [...acc, ...mapper], []).length
const mappersView = Object.entries(mappers)
  .map(([key, value]) => `${key}:\n\t\t${value.join('\n\t\t')}`)
  .join('\n\t')
console.log(`> loaded ${mappersLenght} mappers: \n\t${mappersView}\n`)

for (const [name, paths] of Object.entries(mappers)) {
  const mappings = fg.sync(paths).reduce(
    (acc: Record<TokenKey, TokenMapping>, path: string) => ({
      ...acc,
      ...yaml.parse(fs.readFileSync(path, 'utf8')),
    }),
    {} as Record<TokenKey, TokenMapping>,
  )

  fs.writeFileSync(`src/themes/presets/${name}/mappings.json`, JSON.stringify(mappings, null, 2))
}

const configsNames = configs.map((config) => config.match(/(?!.*\/)([^.]+)/)?.[0])
const mappingsPaths = configsNames.map((name) => `src/themes/presets/${name}/mappings.json`)
console.log(`> created ${configs.length} mappings files: \n\t${mappingsPaths.join('\n\t')}\n`)
