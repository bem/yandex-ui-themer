import { addLayersToFrame, defaultFont, getDropOffset } from 'html-figma/figma';
import {
    FigmaMessageType,
    FigmaMessages,
    FigmaPluginMessages,
} from '../../src/FigmaMessageType';
import { Token, TokenValue, TokenValueKeys } from '../../src/TokenTypes';
import { setTokenToNode } from './setTokenToNode';

//@ts-ignore
figma.showUI(__html__, {
    width: 750,
    height: 600,
});

const postMessage = (data: FigmaPluginMessages) => {
    figma.ui.postMessage(data);
};

const getPluginData = (node: SceneNode) => {
    const tokens = node.getPluginData('tokens');
    const componentData = node.getPluginData('componentData');

    return {
        tokens: tokens ? JSON.parse(tokens) : null,
        componentData: componentData ? JSON.parse(componentData) : null,
    };
};

interface setPluginDataPayload {
    tokens?: Token[];
    componentData?: { name: string; props: unknown };
}

const setPluginData = (node: SceneNode, payload: setPluginDataPayload) => {
    const { tokens, componentData } = payload;

    tokens && node.setPluginData('tokens', JSON.stringify(tokens));
    componentData &&
        node.setPluginData('componentData', JSON.stringify(componentData));
};

const setTokens = (nodeId: SceneNode['id'], tokens: Token[]) => {
    const node = figma.currentPage.findOne((node) => node.id === nodeId);

    if (!node) {
        console.error(`Can't find NodeId: ${nodeId}`);
        return;
    }

    for (const token of tokens) {
        setTokenToNode(node, token);
    }
    setPluginData(node, { tokens });
};

const updateTokensOnNode = (
    node: SceneNode,
    nodeTokens: Token[],
    allTokens: Record<string, string>
) => {
    const newTokens = nodeTokens.map((token) => {
        const newValue = allTokens[token.name];
        if (typeof newValue !== 'undefined') {
            const keys = Object.keys(token.value) as TokenValueKeys[];
            for (const key of keys) {
                if (token.value[key] !== newValue) {
                    // @ts-expect-error
                    token.value[key] = newValue;
                }
            }
        }

        return token;
    });

    setTokens(node.id, newTokens);
};

figma.on('selectionchange', () => {
    const nodes = figma.currentPage.selection;
    if (!nodes.length) {
        postMessage({ type: FigmaMessageType.CLEAR_SELECTION });
        return;
    } else {
        postMessage({
            type: FigmaMessageType.SELECT_NODE,
            data: {
                nodes: nodes.map((n) => ({
                    nodeId: n.id,
                    ...getPluginData(n),
                })),
            },
        });
    }
});

const getVarinatNameFromProps = (props: Record<string, string>) => {
    return Object.keys(props)
        .filter((key) => key !== 'children')
        .map((key) => `${key}=${props[key]}`)
        .join(', ');
};

figma.ui.onmessage = async (msg: FigmaMessages) => {
    if (msg.type === FigmaMessageType.IMPORT_VARIANTS) {
        await figma.loadFontAsync(defaultFont);
        const {
            data: { layers, componentsData },
        } = msg;

        let baseFrame: PageNode | FrameNode = figma.currentPage;
        const { x, y } = figma.viewport.center;

        layers[0].x = x;
        layers[0].y = y;
        let offsetTop = 0;

        for (const layer of layers) {
            layer.x = x;
            layer.y = y + offsetTop;

            offsetTop += (layer?.height || 100) + 10;
        }
        let nodes: SceneNode[] = [];
        const componentLayers = layers.map((layer) => ({
            ...layer,
            type: 'COMPONENT',
        }));
        // @ts-expect-error
        await addLayersToFrame(componentLayers, baseFrame, ({ node, parent }) => {
            if (!parent) {
                nodes.push(node);
            }
        });

        const componentNode = figma.combineAsVariants(nodes as ComponentNode[], baseFrame);
        componentNode.name = componentsData[0].name;

        for (let i = 0; i < nodes.length; i++) {
            // @ts-expect-error
            nodes[i].name = getVarinatNameFromProps(componentsData[i].props);
        }
    }

    if (msg.type === FigmaMessageType.IMPORT) {
        await figma.loadFontAsync(defaultFont);

        const { data } = msg;

        let { layers, position, name, props } = data;

        let baseFrame: PageNode | FrameNode = figma.currentPage;

        const { x, y } = getDropOffset(position);
        // let currentNode = figma.currentPage.findOne(n => n.name === name);

        // if (currentNode) {
        //     x = currentNode.x;
        //     y = currentNode.y;
        // }

        layers.x = x;
        layers.y = y;

        await addLayersToFrame([layers], baseFrame, ({ node, parent }) => {
            if (!parent) {
                setPluginData(node, { componentData: { name, props } });
            }
        });
    }

    if (msg.type === FigmaMessageType.APPLY_TOKEN) {
        const { data } = msg;

        for (let node of data.nodes) {
            setTokens(node.nodeId, node.tokens || []);
        }
    }

    if (msg.type === FigmaMessageType.APPLY_TOKENS) {
        const { data } = msg;
        const allNodes = figma.currentPage.findAll((_) => true);
        const nodesWithTokens = allNodes
            .map((node) => ({ tokens: getPluginData(node).tokens, node }))
            .filter(({ tokens }) => tokens);

        for (let { tokens, node } of nodesWithTokens) {
            updateTokensOnNode(node, tokens, data.tokens);
        }
    }
};
