import React, { useState, FC, createElement, useEffect } from 'react';
import { useStore } from 'effector-react';
import { cnTheme } from '@yandex-lego/components/Theme';

import { useRef } from 'react';
import { cn } from '@bem-react/classname';
import './Showcase.css';

export type ShowcaseFrameProps = {
    data: unknown;
};

const cnShowcaseFrame = cn('ShowcaseFrame');

export const ShowcaseFrame: FC<ShowcaseFrameProps> = ({ data }) => {
    const ref = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        ref?.current?.contentWindow?.postMessage(data, '*');
    }, [data]);

    return (
        <iframe ref={ref} title="Playground" className={cnShowcaseFrame()} src="/?playground-frame" />
    );
};
