import React, { useState, FC, createElement } from 'react';
import { useStore } from 'effector-react';
import { cnTheme } from '@yandex/ui/Theme';

import { $cssVariables } from '../../../../model/css';

import { Showcases } from './Showcases';
import { $theme } from '../../../../model/themes';
import { $dark, darkToggle } from '../../../../model/dark';
import { $component, $componentProps } from '../../model';

import {
    EyeIconButton,
    SunIconButton,
} from '../../../../components/IconButton';
import { ComponentWrapper } from '../ComponentWrapper/ComponentWrapper';
import { AllComponentsNames } from '../../../../utils/getComponentByName';
import { cn } from '@bem-react/classname';
import './Showcase.css';

export type ShowcaseProps = {
    className: string;
};

const cnShowcase = cn('Showcase');

export const Showcase: FC<ShowcaseProps> = ({ className }) => {
    const [showDiff, setShowDiff] = useState(true);

    const { preset } = useStore($theme);
    const cssVariables = useStore($cssVariables);
    const component = useStore($component);
    const { currentProps } = useStore($componentProps);

    const dark = useStore($dark);

    const handleSunIconClick = darkToggle;
    const handleEyeIconClick = () => setShowDiff((prev) => !prev);
    const componentNormalizedName =
        component[0].toUpperCase() + component.slice(1);

    return (
        <>
            <div
                className={cnTheme({ ...preset, dark }, [className])}
                style={showDiff ? cssVariables : {}}
            >
                {/* @ts-ignore */}
                {component === 'overview' ? (
                    createElement(Showcases[component])
                ) : (
                    <div className={cnShowcase('Preview')}>
                        {// @ts-ignore
                        <ComponentWrapper
                            __name={componentNormalizedName as AllComponentsNames}
                            {...currentProps}
                        />
                        }
                    </div>
                )}
            </div>
            <SunIconButton
                dark={dark}
                onPress={handleSunIconClick}
                className="SunIcon"
            />
            <EyeIconButton
                dark={dark}
                onPress={handleEyeIconClick}
                close={!showDiff}
                className="EyeIcon"
            />
        </>
    );
};
