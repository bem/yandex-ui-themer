import { PlainLayerNode } from 'html-figma/types';
import { Token } from './TokenTypes';

export enum FigmaMessageType {
    IMPORT,
    RENDER,
    IMPORT_VARIANTS,
    APPLY_TOKEN,
    APPLY_TOKENS,
    SELECT_NODE,
    CLEAR_SELECTION,
    RENDER_TOKENS_SYNC
}

type LayerPosition = {
    dropPosition: { clientX: number; clientY: number };
    offset: {
        x: number;
        y: number;
    };
    windowSize: { width: number; height: number };
};

export interface FigmaImportMessage {
    type: FigmaMessageType.IMPORT;
    data: {
        layers: PlainLayerNode;
        position: LayerPosition;
        name: string;
        props: unknown;
    };
}

export interface FigmaImportVariantsMessage {
    type: FigmaMessageType.IMPORT_VARIANTS;
    data: {
        layers: PlainLayerNode[];
        componentsData: { name: string; props: unknown; }[];
    };
}


export interface FigmaRenderMessage {
    type: FigmaMessageType.RENDER;
    data: {
        blocks: { name: string, props: unknown }[];
        type: 'variants'
    } | { 
        block: { name: string, props: unknown }
        type: 'single',
        position: LayerPosition
    };
}

export interface FigmaRenderTokenSyncMessage {
    type: FigmaMessageType.RENDER_TOKENS_SYNC;
    data: Record<string, string>
}

export interface FigmaSelectNodeMessagePayload {
    nodes: { nodeId: string; tokens: Token[]; componentData: unknown | null }[];
}

export interface FigmaSelectNodeMessage {
    type: FigmaMessageType.SELECT_NODE;
    data: FigmaSelectNodeMessagePayload;
}

export interface FigmaApplyTokenMessagePayload {
    nodes: { nodeId: string; tokens?: Token[] }[];
}

export interface FigmaApplyTokenMessage {
    type: FigmaMessageType.APPLY_TOKEN;
    data: FigmaApplyTokenMessagePayload;
}

export interface FigmaApplyAllTokensMessagePayload {
    tokens: Record<string, string>;
}

export interface FigmaApplyAllTokensMessage {
    type: FigmaMessageType.APPLY_TOKENS;
    data: FigmaApplyAllTokensMessagePayload;
}

export interface FigmaClearSelectionMessage {
    type: FigmaMessageType.CLEAR_SELECTION;
}

export type FigmaMessages =
    | FigmaImportMessage
    | FigmaImportVariantsMessage
    | FigmaApplyTokenMessage
    | FigmaApplyAllTokensMessage
    | FigmaRenderMessage
    | FigmaRenderTokenSyncMessage;

export type FigmaPluginMessages =
    | FigmaSelectNodeMessage
    | FigmaClearSelectionMessage;

export interface PluginMessageEvent extends MessageEvent {
    data: FigmaMessages;
}

export interface FigmaMessageEvent extends MessageEvent {
    data: FigmaPluginMessages;
}
