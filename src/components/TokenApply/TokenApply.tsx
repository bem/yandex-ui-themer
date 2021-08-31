import { cn } from '@bem-react/classname';
import React, { FC, useCallback } from 'react';
import { TokenKeys, TokenValue, TokenValueKeys } from '../../TokenTypes';

import './TokenApply.css';
import { TokenApplyType } from './TokenApplyType';

interface TokenApplyProps {
    name: string;
    value: string;
    values: TokenValue;
    description?: string;
    onChange: (newValue: TokenValueKeys[]) => void;
}

type TokenTypes = keyof typeof TokenKeys;

const getTokenTypes = (
    name: string,
    value: string
): TokenTypes[] | undefined => {
    console.log(/px$/.test(value), value);
    if (Number.isFinite(Number(value)) || /px$/.test(value)) {
        return ['size', 'spacing', 'border', 'font'];
    }

    if (name.includes('color')) {
        return ['color'];
    }

    if (typeof name === 'string') {
        return ['fontFamily'];
    }
};

const cnTokenApply = cn('TokenApply');

export const TokenApply: FC<TokenApplyProps> = ({
    name,
    value,
    values,
    description,
    onChange,
}) => {
    const applyHandler = useCallback(
        (key: TokenValueKeys | TokenValueKeys[]) => {
            // @ts-expect-error
            onChange([].concat(key));
        },
        [value, onChange]
    );

    return (
        <div className={cnTokenApply()}>
            <h3 className={cnTokenApply('Name')}>
                {name}
                {description ? (
                    <div className={cnTokenApply('Description')}>
                        {description}
                    </div>
                ) : null}
            </h3>
            {getTokenTypes(name, value)?.map((group) => {
                return (
                    <div className={cnTokenApply('Group')}>
                        <h4 className={cnTokenApply('GroupName')}>{group}</h4>
                        <div className={cnTokenApply('Values')}>
                            {
                                TokenKeys[group].map((key) => (
                                    <TokenApplyType
                                        tokenKey={key}
                                        value={value}
                                        values={values}
                                        onClick={applyHandler}
                                    />
                                ))
                                // <button onClick={() => applyHandler(key)}>
                                //     {key}
                                // </button>
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
