const { Api } = require('@yandex/themekit');

const componentsList = [
  "attach",
  "badge",
  "button",
  "checkbox",
  "divider",
  "icon",
  "image",
  "layerManager",
  "link",
  "listTile",
  "menu",
  "messageBox",
  "modal",
  "popup",
  "progress",
  "radioButton",
  "radiobox",
  "select",
  "showcase",
  "spacer",
  "spin",
  "tabsMenu",
  "tabsPanes",
  "text",
  "textarea",
  "textinput",
  "theme",
  "tooltip",
  "tumbler",
  "userPic",
  "slider",
]

Api.registerFormat({
  name: 'json/extended',
  formatter(dict) {
    const globals = {}
    const components = {};

    for (const prop of dict.allProperties) {
      if (componentsList.includes(prop.path[0])) {
        if (components[prop.path[0]] === undefined) {
          components[prop.path[0]] = {}
        }
        components[prop.path[0]] = {
          ...components[prop.path[0]],
          [prop.name]: {
            value: prop.value,
            path: prop.path,
            description: prop.comment,
          }
        }
      } else {
        globals[prop.name] = {
          value: prop.value,
          path: prop.path,
          description: prop.comment,
        }
      }
    }

    return JSON.stringify({
      globals,
      components,
    }, null, 2)
  },
})

module.exports = {
  "entry": {
    "example": "./src/themes/example.theme.json",
    "example-inverse": "./src/themes/example-inverse.theme.json",
    "example-brand": "./src/themes/example-brand.theme.json",
    "example-turbo": "./src/themes/example-turbo.theme.json"
  },
  "output": {
    "css": {
      "transforms": ["name/cti/kebab", "name/mapper"],
      "buildPath": "./src/themes/presets",
      "actions": ["process-color"],
      "files": [
        {
          "destination": "[entry]/root.json",
          "format": "json/extended"
        }
      ]
    }
  }
}
