import { Popup } from '@yandex-lego/components/Popup/desktop/bundle';
import React, { useCallback, FC, useMemo, useState, useRef } from 'react';

import { TextinputBase } from '../../components/Textinput';
import { metricaGoal } from '../../components/YaMetrika';
import { variablesChange } from '../../model/designTokens';
import { /*tokenChange,*/ TokenType } from '../../model/tokens';
import { TokenValue, TokenValueKeys } from '../../TokenTypes';
import { Text, Color, Link } from './Inputs';
import { TokenPrevious } from './TokenPrevious';
import { TokenApply } from '../TokenApply/TokenApply';
import { $currentNodes, setCurrentNodesToken } from '../../model/figma';
import { useStore } from 'effector-react';

export type TokenProps = TokenType & {
    onClick?: (token: Partial<TokenType>) => void;
    value?: string | number;
};

export const TokenField: FC<TokenProps> = (props) => {
    const {
        label,
        description,
        type,
        path,
        defaultValue,
        changed,
        name,
        onClick,
    } = props;

    const handleTextChange = useCallback(
        (event) => {
            variablesChange({
                path,
                name,
                value: event.target.value,
                changed: event.target.value !== defaultValue,
                type,
            });
            metricaGoal('change-tokens');
        },
        [defaultValue, path, type, name]
    );

    const handleColorChange = useCallback(
        (color) => {
            variablesChange({
                path,
                name,
                value: color,
                changed: color !== defaultValue,
                type: 'color',
            });
        },
        [defaultValue, path, name]
    );

    const handleLink = (token: string) => {
        // tokenChange(token)
    };

    const handleClear = useCallback(() => {
        variablesChange({
            path,
            name,
            value: defaultValue,
            changed: false,
            type: 'color',
        });
    }, [defaultValue, name, path]);

    const inner = useMemo(() => {
        switch (props.type) {
            case 'text':
                return <Text handleChange={handleTextChange} {...props} />;
            case 'color':
                return (
                    <Color
                        handleLink={handleLink}
                        handleColorChange={handleColorChange}
                        {...props}
                    />
                );
            case 'link':
                return <Link handleLink={handleLink} {...props} />;
        }
    }, [props, handleTextChange, handleColorChange]);

    const [showApplyToken, setShowApplyToken] = useState(false);
    const labelRef = useRef(null);

    const onLabelClickHandler = useCallback(() => {
        // onClick?.({
        //     name,
        //     label,
        //     description,
        //     // @ts-expect-error
        //     value: props.value
        // });
        setShowApplyToken((v) => !v);
    }, []);

    const nodes = useStore($currentNodes);
    const { tokens, nodeId } = nodes[0] || {};

    const selectedNodeToken = tokens
        ? tokens.find((t) => t.name === name)
        : null;
    const tokenValues = selectedNodeToken?.value || {};

    const onTokenApply = useCallback(
        (key: TokenValueKeys[]) => {
            const tokenValue = key.reduce<TokenValue>(
                (res, key) => {
                    if (typeof res[key] === 'undefined') {
                        // @ts-expect-error
                        res[key] = props.value;
                    } else {
                        delete res[key];
                    }
                    return res;
                },
                { ...tokenValues }
            );
            console.log();
            setCurrentNodesToken({ name, value: tokenValue });
        },
        [name, props.value, tokenValues]
    );

    return (
        <>
            <TextinputBase
                labelRef={labelRef}
                onLabelClick={onLabelClickHandler}
                label={label}
                tip={description}
            >
                {inner}
            </TextinputBase>
            <Popup
                visible={showApplyToken}
                onClose={onLabelClickHandler}
                hasTail
                target="anchor"
                anchor={labelRef}
                view="default"
            >
                {nodeId ? (
                    <TokenApply
                        name={name}
                        value={props.value as string}
                        description={description}
                        values={tokenValues}
                        onChange={onTokenApply}
                    />
                ) : null}
            </Popup>
            {type === 'color' && changed && (
                <TokenPrevious color={defaultValue} handleClick={handleClear} />
            )}
        </>
    );
};
