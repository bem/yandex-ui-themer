import React, { FC, useCallback } from 'react';

import { Textinput } from '../../../../components/Textinput';
import { $componentProps, Prop, currentPropsChange } from '../../model';

import { useStore } from 'effector-react';

export type SettingsProps = {};

export type SettingsItemProps = {
    prop: Prop;
    value: unknown;
    onChange: ({ name, value }: { name: string; value: unknown }) => void;
};

export const Settings: FC<SettingsProps> = () => {
    const { allProps, currentProps } = useStore($componentProps);

    const onChangeProp = useCallback((value: unknown, name) => {
        currentPropsChange({ name, value });
    }, []);

    return (
        <>
            {Object.keys(allProps).map((name) => {
                const prop = allProps[name];
                const required = prop.type.required;
                const type = prop.type.name;
                
                return (
                    <Textinput
                        key={name}
                        label={prop.name}
                        tip={prop.description}
                        type={type}
                        value={currentProps[prop.name] as string}
                        onChange={onChangeProp}
                        options={prop.options}
                    />
                );
            })}
        </>
    );
};
