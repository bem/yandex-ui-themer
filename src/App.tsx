import React, { useState } from 'react'
import { configureRootTheme } from '@yandex/ui/Theme'
import { theme } from '@yandex/ui/Theme/presets/default'
import { Select } from '@yandex/ui/Select/desktop/bundle'

import stylesDataDefault from './themes/presets/example/root.json'
import stylesDataInverse from './themes/presets/example-inverse/root.json'
import stylesDataBrand from './themes/presets/example-brand/root.json'
import stylesDataTurbo from './themes/presets/example-turbo/root.json'

import { Sandbox } from './components/Sandbox/Sandbox'

import { theme as themeDefault} from '@yandex/ui/Theme/presets/default'
import { theme as themeInverse} from '@yandex/ui/Theme/presets/inverse'
import { theme as themeBrand} from '@yandex/ui/Theme/presets/brand'
import { theme as themeTurbo} from '@yandex/ui/Theme/presets/turbo'

configureRootTheme({ theme })

const themes: Record<string, any> = {
    default: { tokens: stylesDataDefault, preset: themeDefault },
    inverse: { tokens: stylesDataInverse, preset: themeInverse },
    brand: { tokens: stylesDataBrand, preset: themeBrand },
    turbo: { tokens: stylesDataTurbo, preset: themeTurbo },
}

export default () => {
    const themesNames = Object.keys(themes);
    const [theme, chooseTheme] = useState('default')

    const menuItems = themesNames.map(val => ({
        value: val,
        content: themes[val].name || `${val}`,
    }))

    return (
        <>
            <div>
                <div className="Tumbler-Wrapper">
                    <Select
                        size="m"
                        view="default"
                        options={menuItems}
                        value={theme}
                        onChange={(event: any) => {
                            console.log('ya tyt', event.target.value);
                            chooseTheme(event.target.value)
                            if (event.target.value === 'custom') {
                                console.log('>>> custom')
                            }
                    }}/>
                </div>
        </div>
            <div>
                <Sandbox theme={themes[theme].preset} globals={themes[theme].tokens.globals} components={themes[theme].tokens.components} />
            </div>
        </>
    )
}
