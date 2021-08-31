import { htmlToFigma } from 'html-figma/browser';
import { LayerNode } from 'html-figma/types';
import {
    FigmaApplyAllTokensMessagePayload,
    FigmaApplyTokenMessagePayload,
    FigmaMessages,
    FigmaMessageType,
    FigmaRenderMessage
} from '../FigmaMessageType';
import { Token } from '../TokenTypes';

interface SendToFigmaParams {
    id?: string;
    props: unknown;
    name: string;
    elem: HTMLElement;
    position: {
        dropPosition: { clientX: number; clientY: number };
        offset: {
            x: number;
            y: number;
        };
        windowSize: { width: number; height: number };
    };
}

export const pluginMessage = (data: FigmaMessages, parent = false) => {
    const handlerWindow = window.parent;
    (parent ? handlerWindow.parent : handlerWindow).postMessage(
        {
            pluginMessage: data,
        },
        '*'
    );
};

export const rendererMessage = (data: FigmaMessages) => {
    // @ts-expect-error
    const frame = document?.getElementById('renderer-frame')?.contentWindow;

    frame?.postMessage(data, '*');
};

export const rendererVariantsMessage = (blocks: { name: string, props: unknown }[]) => {
    rendererMessage({
        type: FigmaMessageType.RENDER,
        data: {
            blocks: blocks,
            type: 'variants',
        }
     });
};

export const rendererSyncThemeMessage = (cssTokens: Record<string, string>) => {
    rendererMessage({
        type: FigmaMessageType.RENDER_TOKENS_SYNC,
        data: cssTokens,
    })
}

export const sendToFigma = ({
    id,
    props = {},
    name,
    elem,
    position,
}: SendToFigmaParams) => {
    // const result = elem ? htmlToFigma(elem) : null;

    rendererMessage({
        type: FigmaMessageType.RENDER,
        data: {
            block: { name, props },
            position,
            type: 'single',
        },
    });
};

export const applyTokenToFigma = (payload: FigmaApplyTokenMessagePayload) => {
    pluginMessage({
        type: FigmaMessageType.APPLY_TOKEN,
        data: payload,
    });
};

export const applyAllTokensToFigma = (
    payload: FigmaApplyAllTokensMessagePayload
) => {
    pluginMessage({
        type: FigmaMessageType.APPLY_TOKENS,
        data: payload,
    });
};
