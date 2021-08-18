import React, { FC, ReactNode, useCallback } from 'react';
import { Select, Input, Item, Switch } from 'react-figma-components';

import { TextinputBase, TextinputBaseProps, cnTextinput } from '.';

export type TextinputProps = TextinputBaseProps & {
    type:
        | 'enum'
        | 'array'
        | 'select'
        | 'boolean'
        | 'node'
        | 'number'
        | 'string'
        | 'object'
        | 'text'
        | 'children';
    options?: string[];
    value?: string;
    onChange?: (value: string | boolean | string[], label: string) => void;
};

export const Textinput: FC<TextinputProps> = ({
    value,
    type,
    options = [],
    onChange = () => {},
    label,
    ...props
}) => {
    let Component: ReactNode;

    const onChangeSelectHandler = useCallback(
        (v) => {
            onChange(v[0]?.value, label);
        },
        [onChange, label]
    );
    const onChangeCheckHandler = useCallback(
        (v) => {
            onChange(v?.target.checked, label);
        },
        [onChange, label]
    );
    const onChangeTextHandler = useCallback(
        (v) => {
            onChange(v?.target.value, label);
        },
        [onChange, label]
    );

    switch (type) {
        case 'select':
        case 'enum':
            const selected = options.find((v) => v === value);
            const optionsMapped = options.map((o) => ({
                value: o,
                label: o,
            }));
            optionsMapped.unshift({ value: '-1', label: '--' });

            Component = (
                <Select onChange={onChangeSelectHandler} selected={[{ option: selected, value: selected, }]}>
                    {optionsMapped.map(({ value, label }) => (
                        <Item value={value} key={`${label}-${value}`}>
                            {label}
                        </Item>
                    ))}
                </Select>
            );

            break;
        case 'boolean':
            Component = <Switch onChange={onChangeCheckHandler} checked={Boolean(value)} />;
            break;
        case 'children':
        case 'text':
        case 'object':
        case 'node':
        case 'number':
        case 'string':
        case 'array':
            Component = <Input onChange={onChangeTextHandler} value={value} />;
            break;
        default:
            throw new Error('component type is not defined');
    }

    return (
        <TextinputBase
            {...props}
            label={label}
            className={cnTextinput({ [`type_${type}`]: Boolean(type) })}
        >
            {Component}
        </TextinputBase>
    );
};
