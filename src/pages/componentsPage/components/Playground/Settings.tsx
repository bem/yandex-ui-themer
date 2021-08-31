import React, { FC, useCallback } from 'react';

import { Textinput } from '../../../../components/Textinput';
import { $componentProps, Prop, currentPropsChange, currentCombinedPropsChange } from '../../model';

import { useStore } from 'effector-react';

export type SettingsProps = {
    combine: boolean;
};

export type SettingsItemProps = {
    prop: Prop;
    value: unknown;
    onChange: ({ name, value }: { name: string; value: unknown }) => void;
};

export const Settings: FC<SettingsProps> = ({ combine }) => {
    const { allProps, currentProps, currentCombinedProps } = useStore($componentProps);
    const onChangeProp = useCallback((value: unknown, name) => {
        const handler = combine ? currentCombinedPropsChange : currentPropsChange;

        handler({ name, value });
    }, [combine]);

    const props = combine ? { ...currentProps, ...currentCombinedProps } : currentProps;

    return (
        <>
            {allProps.map((prop) => {
                const required = prop.type.required;
                const type = prop.type.name;
                const name = prop.name;

                return (
                    <Textinput
                        key={name}
                        multiple={combine}
                        label={prop.name}
                        tip={prop.description}
                        type={type}
                        value={props[prop.name] as string}
                        onChange={onChangeProp}
                        options={prop.options}
                    />
                );
            })}
        </>
    );
};
