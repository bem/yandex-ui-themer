import { useStore } from 'effector-react';
import React, { FC, useState } from 'react';
import { cn } from '@bem-react/classname';

import { TokenField } from '../TokenField';
import { ExpandButton } from '../ExpandButton';
import { $tokens, $tokensGrouped, TokenType } from '../../model/tokens';

import './Tokens.css';

export type TokensProps = {
    onTokenClick?: (token: Partial<TokenType>) => void;
};

const cnTokens = cn('Tokens');

const AMOUNT_TO_HIDE = 4;

const prettyLabelName = (token: TokenType, group: string) => {
    if (group === token.label) {
        const parts = token.label.split('-');
        return parts[parts.length - 1];
    }

    return token.label.replace(group + '-', '');
};

export const Tokens: FC<TokensProps> = ({ onTokenClick }) => {
    const tokensGroups = useStore($tokensGrouped);
    const groups = Object.keys(tokensGroups);
    const [opened, setOpened] = useState<Array<boolean>>(
        Array(groups.length).fill(false)
    );

    const handleOpen = (index: number) => {
        setOpened((prev) => prev.map((val, i) => (i === index ? true : val)));
    };

    return (
        <>
            {groups.map((name, groupIndex) => (
                <div className={cnTokens('Section')}>
                    <h4 className={cnTokens('SectionHeader')}>{name}</h4>

                    <div>
                        {tokensGroups[name].map((token, tokenIndex) => {
                            if (!opened[groupIndex] && tokenIndex > 2) {
                                return <></>;
                            }

                            return (
                                <TokenField
                                    {...token}
                                    onClick={onTokenClick}
                                    key={token.label}
                                    name={token.label}
                                    label={prettyLabelName(token, name)}
                                />
                            );
                        })}
                        {!opened[groupIndex] &&
                            tokensGroups[name].length >= AMOUNT_TO_HIDE && (
                                <ExpandButton
                                    amount={tokensGroups[name].length}
                                    onPress={() => handleOpen(groupIndex)}
                                />
                            )}
                    </div>
                </div>
            ))}
        </>
    );
};
