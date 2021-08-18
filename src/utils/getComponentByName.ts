import { ExtractProps } from '@bem-react/core';
import  * as allComponents from '@yandex-lego/components/figma';

// import { allComponents } from './allComponents';

type ComponentReactTypes = typeof allComponents
export type AllComponentsNames = keyof ComponentReactTypes
export type AllComponentsTypes = {
    [K in AllComponentsNames]: any
}
// export type AllComponentsValues = AllComponentsTypes[AllComponentsNames];

export const getComponentByName = (name: keyof ComponentReactTypes) => {
    // console.log(allComponents[name]);

    return allComponents[name].default.component;
};

export const getComponentMetaByName = (name: keyof ComponentReactTypes) => {
    // console.log(allComponents[name]);
    const uppercasedName = name[0].toUpperCase() + name.slice(1);
    // @ts-expect-error
    return allComponents[uppercasedName].default;
};
