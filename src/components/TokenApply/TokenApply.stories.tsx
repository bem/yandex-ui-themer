import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TokenApply } from './TokenApply';
import { TokenValue, TokenValueKeys } from '../../TokenTypes';

export default {
    title: 'Tokens/ApplToken',
    component: TokenApply,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof TokenApply>;

const Template: ComponentStory<typeof TokenApply> = (args) => {
    const [values, setValues] = useState({});
    const value = args.value;
    const onChange = (keys: TokenValueKeys[]) => {
        setValues((v) => {
            return keys.reduce<TokenValue>((res, key) => {
                if (typeof res[key] === 'undefined') {
                    // @ts-expect-error
                    res[key] = value
                } else {
                    delete res[key];
                }
                return res;
            }, {...v});
        });
    };

    return (
        <TokenApply
            {...args}
            values={{ ...args.values, ...values }}
            onChange={onChange}
        />
    );
};

export const Color = Template.bind({});
Color.args = {
    name: 'color-base',
    value: '#000000',
    values: { fill: '#000000' },
    description: 'Цвет',
};

export const Size = Template.bind({});
Size.args = {
    name: 'size-token-name',
    value: '13px',
    values: { width: 13 },
    description: 'Размер',
};

export const FontWeight = Template.bind({});
FontWeight.args = {
    name: 'font-weight',
    value: '400',
    values: {},
    description: 'Шрифт',
};
