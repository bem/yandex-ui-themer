import { useStore } from 'effector-react';
import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Button, Switch, Textarea } from 'react-figma-components';
import { $cssText } from '../../../model/css';
import { $isFigma } from '../../../model/view';
import { Tokens as TokensList } from '../../../components/Tokens/Tokens';

import {
    rawTokensUpload,
    tokensUpdate,
    $tokensText,
} from '../../../model/tokensText';
import { tokensShare, $shareTokensDisabled } from '../../../model/share-tokens';
import { $tokens, TokenType } from '../../../model/tokens';

import './Tokens.css';
import { applyAllTokensToFigma } from '../../../utils/figma';

export type TokensProps = {
    onTokenClick?: (token: Partial<TokenType>) => void;
};

export const Tokens: FC<TokensProps> = ({ onTokenClick }) => {
    const [format, setFormat] = useState<'yaml' | 'css'>('yaml');
    const tokensText = useStore($tokensText);
    const cssText = useStore($cssText);
    const isFigma = useStore($isFigma);
    const tokens = useStore($tokens);
    const shareDisabled = useStore($shareTokensDisabled);

    const [showTokensCode, setShowTokensCode] = useState(false);

    const switchToCodeHandler = useCallback(() => {
        setShowTokensCode((v) => !v);
    }, []);

    const handleSwitchChange = () =>
        setFormat((format) => {
            switch (format) {
                case 'yaml':
                    return 'css';
                case 'css':
                    return 'yaml';
                default:
                    return 'css';
            }
        });

    const handleTextareaChange = (event: ChangeEvent<HTMLInputElement>) => {
        tokensUpdate(event.target.value);
    };

    const handleUploadClick = () => {
        rawTokensUpload();
    };

    const handlePushToCanvasClick = useCallback(() => {
        const tokensRecord = tokens.reduce<Record<string, string>>((res, t) => {
            // @ts-expect-error
            res[t.name] = t.value;

            return res;
        }, {});
        applyAllTokensToFigma({ tokens: tokensRecord });
    }, [tokens]);

    return (
        <div className="Tokens">
            <div className="Tokens-Header">
                <div className="Tokens-HeaderItem">
                    <Switch
                        checked={showTokensCode}
                        onChange={switchToCodeHandler}
                        className="Tokens-Switch"
                    />
                    Code
                </div>
                {showTokensCode ? (
                    <div className="Tokens-HeaderItem">
                        YAML
                        <Switch
                            checked={format !== 'yaml'}
                            onChange={handleSwitchChange}
                            className="Tokens-Switch"
                        />
                        CSS
                    </div>
                ) : null}
            </div>
            {!showTokensCode ? (
                <TokensList onTokenClick={onTokenClick} />
            ) : (
                <Textarea
                    value={format === 'yaml' ? tokensText : cssText}
                    onChange={handleTextareaChange}
                    className="Tokens-Textinput"
                    placeholder="Tokens"
                />
            )}
            <div className="Tokens-Buttons">
                <Button
                    view="tertiary"
                    onClick={tokensShare}
                    disabled={shareDisabled}
                    onPress={tokensShare}
                    data-testid="share=button"
                >
                    Share Theme
                </Button>
                <Button view="secondary" onPress={handleUploadClick}>
                    Save
                </Button>
                {isFigma && (
                    <Button view="primary" onPress={handlePushToCanvasClick}>
                        Apply to Figma
                    </Button>
                )}
            </div>
        </div>
    );
};
