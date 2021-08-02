const { Api } = require('@yandex/themekit')

const componentsList = [
  "attach",
  "badge",
  "button",
  "buttonGroup",
  "checkbox",
  "divider",
  // "dropdown", // У дропдауна нет никаких токенов
  "header",
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
  "slider",
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
]

// List of components that should not be shown 
const excludeComponentsList = [
  "calendar",
]

const isColor = (value) => {
  return Boolean(String(value).match(/^(#|hsla?|rgba?)/))
}

const getType = (value) => {
  if (isColor(value)) {
    return 'color'
  } else {
    return 'text'
  }
}

Api.registerFormat({
  name: 'json/extended',
  formatter(dict) {
    const globals = {}
    const components = {};

    for (const prop of dict.allProperties) {
      if (excludeComponentsList.includes(prop.path[0])) {
        continue
      }

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
            type: getType(prop.value)
          }
        }
      } else {
        globals[prop.name] = {
          value: prop.value,
          path: prop.path,
          description: prop.comment,
          type: getType(prop.value)
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
