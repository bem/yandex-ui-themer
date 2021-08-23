import { useList, useStore } from 'effector-react'
import React, { FC } from 'react'

import { TextinputField } from '../TokenField'
import { $tokens, TokenType } from '../../../model'
import { cn } from '@bem-react/classname'

import './Tokens.css';

export type TokensProps = {}
const cnTokens = cn('Tokens');

const prettyLabelName = (token: TokenType, group: string) => {
    if (group === token.label) {
        const parts = token.label.split('-');
        return parts[parts.length - 1];
    }

    return token.label.replace(group + '-', '')
}

export const Tokens: FC<TokensProps> = () => {
    const tokensGroups = useStore($tokens);

    const groups = Object.keys(tokensGroups);

    return (
        <>
            {groups.map((name) => (
                <div className={cnTokens('Section')}>
                    <h4 className={cnTokens('SectionHeader')}>{name}</h4>
                    
                    <div>
                        {tokensGroups[name].map(token => <TextinputField {...token} key={token.label} label={prettyLabelName(token, name)} />)}
                    </div>
                </div>
            ))}
        </>
    )
}