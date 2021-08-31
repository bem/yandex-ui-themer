import { cn } from '@bem-react/classname';
import React, { FC, useCallback, useRef, useState } from 'react';
import { TokenValue } from '../../TokenTypes';
import { useClickAway } from 'react-use';

import { Icon } from 'react-figma-components';
import { ReactComponent as LineHeightIcon } from './icons/lineHeight.svg';
import { ReactComponent as LetterSpacingIcon } from './icons/letterSpacing.svg';
import { ReactComponent as ParagraphSpacingIcon } from './icons/paragraphSpacing.svg';
import { ReactComponent as PaddingIcon } from './icons/padding.svg';
import { ReactComponent as FontSizeIcon } from './icons/fontSize.svg';

const cnTokenApply = cn('TokenApply');

type TokenKey = keyof TokenValue;

interface TokenApplyType {
    tokenKey: TokenKey;
    value: string;
    values: TokenValue;
    active?: boolean;
    onClick: (key: TokenKey | TokenKey[]) => void;
}

const isActive = (values: TokenValue, key: TokenKey | TokenKey[]) => {
    if (Array.isArray(key)) {
        return key.some(k => typeof values[k] !== 'undefined')
    }
    return typeof values[key] !== 'undefined';
};

export const TokenApplyButton: FC<{
    className?: string;
    title: string;
    icon?: boolean;
    active?: boolean;
    checked?: boolean;
    onClick?: () => void;
}> = ({
    title,
    children,
    active,
    onClick,
    className,
    checked,
    icon = false,
}) => {
    return (
        <button
            title={title}
            onClick={onClick}
            className={cnTokenApply('ValueButton', { active, icon, checked }, [
                className,
            ])}
        >
            {children}
        </button>
    );
};

const ItemSpaceIcon: FC<{}> = () => {
    return (
        <svg
            className="svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11 13v-2H1v2H0v-3h12v3h-1zm1-10H0V0h1v2h10V0h1v3zM9 7V6H3v1h6z"
                fillRule="nonzero"
                fillOpacity="1"
                fill="#000"
                stroke="none"
            ></path>
        </svg>
    );
};

const ArrowIcon: FC<{ direction: 'top' | 'right' | 'bottom' | 'left' }> = ({
    direction,
}) => {
    const degs = {
        left: '90deg',
        right: '-90deg',
        top: '180deg',
        bottom: '0deg',
    };

    return (
        <svg
            className="svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${degs[direction]})` }}
        >
            <path
                d="M.646 3.354l.708-.708L4 5.293l2.646-2.647.708.708L4 6.707.646 3.354z"
                fillRule="nonzero"
                fill="rgba(51,51,51)"
                stroke="none"
            ></path>
        </svg>
    );
};

const BorderIcon: FC<{ direction: 'top' | 'right' | 'bottom' | 'left' }> = ({
    direction,
}) => {
    const degs = {
        left: '0deg',
        right: '90deg',
        top: '180deg',
        bottom: '-90deg',
    };

    return (
        <Icon
            color="black"
            style={{ transform: `rotate(${degs[direction]})` }}
            name="corner-radius"
        />
    );
};

const TokenApplyPadding: FC<{
    onClick: (
        key: TokenApplyType['tokenKey'] | TokenApplyType['tokenKey'][]
    ) => void;
    values: TokenValue;
}> = ({ onClick, values }) => {
    const onClickLeftHandler = useCallback(() => {
        onClick('paddingLeft');
    }, [onClick]);
    const onClickRightHandler = useCallback(() => {
        onClick('paddingRight');
    }, [onClick]);
    const onClickBottomHandler = useCallback(() => {
        onClick('paddingBottom');
    }, [onClick]);
    const onClickTopHandler = useCallback(() => {
        onClick('paddingTop');
    }, [onClick]);
    const onClickAllHandler = useCallback(() => {
        onClick(['paddingTop', 'paddingLeft', 'paddingBottom', 'paddingRight']);
    }, [onClick]);

    const [visible, setVisible] = useState(false);
    const togglePopup = useCallback(() => {
        setVisible((v) => !v);
    }, []);
    const elementRef = useRef<HTMLDivElement>(null);
    useClickAway(elementRef, () => {
        setVisible(false);
    });

    return (
        <div ref={elementRef} className={cnTokenApply('padding')}>
            <TokenApplyButton
                title={'padding'}
                className={cnTokenApply('paddingTrigger')}
                onClick={togglePopup}
                icon
                checked={visible}
                active={isActive(values, [
                    'paddingLeft',
                    'paddingRight',
                    'paddingTop',
                    'paddingBottom',
                ])}
            >
                <PaddingIcon />
            </TokenApplyButton>
            <div className={cnTokenApply('MiniPopup', { visible })}>
                <div
                    ref={elementRef}
                    className={cnTokenApply('paddingContainer')}
                >
                    <TokenApplyButton
                        title={'padding'}
                        className={cnTokenApply('paddingAll')}
                        onClick={onClickAllHandler}
                        
                    >
                        <PaddingIcon />
                    </TokenApplyButton>
                    <TokenApplyButton
                        title={'paddingLeft'}
                        className={cnTokenApply('paddingLeft')}
                        onClick={onClickLeftHandler}
                        active={isActive(values, 'paddingLeft')}
                    >
                        <ArrowIcon direction="left" />
                    </TokenApplyButton>
                    <TokenApplyButton
                        title={'paddingRight'}
                        className={cnTokenApply('paddingRight')}
                        onClick={onClickRightHandler}
                        active={isActive(values, 'paddingRight')}
                    >
                        <ArrowIcon direction="right" />
                    </TokenApplyButton>
                    <TokenApplyButton
                        title={'paddingTop'}
                        className={cnTokenApply('paddingTop')}
                        onClick={onClickTopHandler}
                        active={isActive(values, 'paddingTop')}
                    >
                        <ArrowIcon direction="top" />
                    </TokenApplyButton>
                    <TokenApplyButton
                        title={'paddingBottom'}
                        className={cnTokenApply('paddingBottom')}
                        onClick={onClickBottomHandler}
                        active={isActive(values, 'paddingBottom')}
                    >
                        <ArrowIcon direction="bottom" />
                    </TokenApplyButton>
                </div>
            </div>
        </div>
    );
};

const TokenApplyBorderRadius: FC<{
    onClick: (
        key: TokenApplyType['tokenKey'] | TokenApplyType['tokenKey'][]
    ) => void;
    values: TokenValue;
}> = ({ onClick, values }) => {
    const onClickBottomLeftHandler = useCallback(() => {
        onClick('borderRadiusBottomLeft');
    }, [onClick]);
    const onClickBottomRightHandler = useCallback(() => {
        onClick('borderRadiusBottomRight');
    }, [onClick]);
    const onClickTopRightHandler = useCallback(() => {
        onClick('borderRadiusTopRight');
    }, [onClick]);
    const onClickTopLeftHandler = useCallback(() => {
        onClick('borderRadiusTopLeft');
    }, [onClick]);
    const onClickAllHandler = useCallback(() => {
        onClick([
            'borderRadiusTopRight',
            'borderRadiusTopLeft',
            'borderRadiusBottomRight',
            'borderRadiusBottomLeft',
        ]);
    }, [onClick]);

    const [visible, setVisible] = useState(false);
    const togglePopup = useCallback(() => {
        setVisible((v) => !v);
    }, []);
    const elementRef = useRef<HTMLDivElement>(null);
    useClickAway(elementRef, () => {
        setVisible(false);
    });

    return (
        <div ref={elementRef} className={cnTokenApply('borderRadius')}>
            <TokenApplyButton
                title={'borderRadius'}
                className={cnTokenApply('borderRadiusTrigger')}
                onClick={togglePopup}
                icon
                checked={visible}
                active={isActive(values, [
                    'borderRadiusTopLeft',
                    'borderRadiusTopRight',
                    'borderRadiusBottomRight',
                    'borderRadiusBottomLeft',
                ])}
            >
                <BorderIcon direction="left" />
            </TokenApplyButton>
            <div className={cnTokenApply('MiniPopup', { visible })}>
                <div className={cnTokenApply('borderRadiusContainer')}>
                    <TokenApplyButton
                        title={'borderRadius'}
                        className={cnTokenApply('borderRadiusAll')}
                        onClick={onClickAllHandler}
                    ></TokenApplyButton>
                    <TokenApplyButton
                        title={'borderRadiusTopLeft'}
                        className={cnTokenApply('borderRadiusTopLeft')}
                        onClick={onClickTopLeftHandler}
                        active={isActive(values, 'borderRadiusTopLeft')}
                    >
                        <BorderIcon direction="left" />
                    </TokenApplyButton>
                    <TokenApplyButton
                        title={'borderRadiusTopRight'}
                        className={cnTokenApply('borderRadiusTopRight')}
                        onClick={onClickTopRightHandler}
                        active={isActive(values, 'borderRadiusTopRight')}
                    >
                        <BorderIcon direction="right" />
                    </TokenApplyButton>
                    <TokenApplyButton
                        title={'borderRadiusBottomRight'}
                        className={cnTokenApply('borderRadiusBottomRight')}
                        onClick={onClickBottomRightHandler}
                        active={isActive(values, 'borderRadiusBottomRight')}
                    >
                        <BorderIcon direction="top" />
                    </TokenApplyButton>
                    <TokenApplyButton
                        title={'borderRadiusBottomLeft'}
                        className={cnTokenApply('borderRadiusBottomLeft')}
                        onClick={onClickBottomLeftHandler}
                        active={isActive(values, 'borderRadiusBottomLeft')}
                    >
                        <BorderIcon direction="bottom" />
                    </TokenApplyButton>
                </div>
            </div>
        </div>
    );
};

export const TokenApplyType: FC<TokenApplyType> = ({
    tokenKey,
    value,
    onClick,
    values,
}) => {
    const onClickHandler = useCallback(() => {
        onClick(tokenKey);
    }, [tokenKey, onClick]);

    const active = typeof values[tokenKey] !== 'undefined';

    switch (tokenKey) {
        case 'fill':
            return (
                <TokenApplyButton
                    active={active}
                    title={tokenKey}
                    onClick={onClickHandler}
                >
                    <div
                        style={{ background: value }}
                        className={cnTokenApply('fill')}
                    />
                </TokenApplyButton>
            );
        case 'borderColor':
            return (
                <TokenApplyButton
                    active={active}
                    title={tokenKey}
                    onClick={onClickHandler}
                >
                    <div
                        style={{ borderColor: value }}
                        className={cnTokenApply('border')}
                    />
                </TokenApplyButton>
            );
        case 'width':
            return (
                <TokenApplyButton
                    active={active}
                    title={tokenKey}
                    onClick={onClickHandler}
                >
                    <div
                        style={{ borderColor: value }}
                        className={cnTokenApply('sizing')}
                    >
                        <span className={cnTokenApply('sizingLabel')}>W</span>
                        {value}
                    </div>
                </TokenApplyButton>
            );
        case 'height':
            return (
                <TokenApplyButton
                    active={active}
                    title={tokenKey}
                    onClick={onClickHandler}
                >
                    <div
                        style={{ borderColor: value }}
                        className={cnTokenApply('sizing')}
                    >
                        <span className={cnTokenApply('sizingLabel')}>H</span>
                        {value}
                    </div>
                </TokenApplyButton>
            );
        case 'paddingLeft':
            return <TokenApplyPadding values={values} onClick={onClick} />;
        case 'paddingRight':
        case 'paddingTop':
        case 'paddingBottom':
            return null;
        case 'itemSpacing':
            return (
                <TokenApplyButton
                    active={active}
                    title={'itemSpacing'}
                    onClick={onClickHandler}
                    icon
                >
                    <Icon color="black" name="spacing" />
                </TokenApplyButton>
            );
        case 'borderRadiusTopLeft':
            return <TokenApplyBorderRadius values={values} onClick={onClick} />;
        case 'borderRadiusTopRight':
        case 'borderRadiusBottomRight':
        case 'borderRadiusBottomLeft':
            return null;
        case 'borderWidth':
            return (
                <TokenApplyButton
                    active={active}
                    title={'itemSpacing'}
                    onClick={onClickHandler}
                    icon
                >
                    <Icon color="black" name="stroke-weight" />
                    {/* <BorderWidthIcon className={cnTokenApply('BigIcon')} /> */}
                </TokenApplyButton>
            );
        case 'fontFamily':
            return (
                <TokenApplyButton
                    active={active}
                    onClick={onClickHandler}
                    title={tokenKey}
                >
                    Family
                </TokenApplyButton>
            );
        case 'fontSize':
            return (
                <TokenApplyButton
                    active={active}
                    onClick={onClickHandler}
                    title={'fontSize'}
                    icon
                >
                    <FontSizeIcon />
                </TokenApplyButton>
            );
        case 'fontWeight':
            return Number(value) % 100 === 0 ? (
                <TokenApplyButton
                    active={active}
                    onClick={onClickHandler}
                    title={tokenKey}
                >
                    {value}
                </TokenApplyButton>
            ) : null;
        case 'lineHeight':
            return (
                <TokenApplyButton
                    active={active}
                    onClick={onClickHandler}
                    title={tokenKey}
                    icon
                >
                    <LineHeightIcon />
                </TokenApplyButton>
            );
        case 'paragraphSpacing':
            return (
                <TokenApplyButton
                    active={active}
                    onClick={onClickHandler}
                    title={tokenKey}
                    icon
                >
                    <ParagraphSpacingIcon />
                </TokenApplyButton>
            );
        case 'letterSpacing':
            return (
                <TokenApplyButton
                    active={active}
                    onClick={onClickHandler}
                    title={tokenKey}
                    icon
                >
                    <LetterSpacingIcon />
                </TokenApplyButton>
            );
    }
    return null;
};
