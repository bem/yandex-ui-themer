import { createStore, createEvent } from 'effector'
import { Token, TokenValueKeys } from '../TokenTypes'
import { applyTokenToFigma } from '../utils/figma'

interface currentFigmaNode {
    nodeId: string;
    name?: string;
    tokens?: Token[];
    componentData?: unknown;
}
export const $currentNodes = createStore<currentFigmaNode[]>([])

export const setCurrentNodes = createEvent<currentFigmaNode[]>()
export const setCurrentNodesToken = createEvent<Token>()

$currentNodes.on(setCurrentNodes, (_, payload) => payload);

$currentNodes.on(setCurrentNodesToken, (nodes, payload) => {
    const valueKeys = Object.keys(payload.value) as TokenValueKeys[];

    return nodes.map((node) => {
        const tokens = node.tokens || [];
        let exists = false;
        const newTokens = tokens.map((token) => {
            if (token.name === payload.name) {
                exists = true;
                return { ...token, value: payload.value }
            } else {
                let tokenValue = {...token.value};
                for (const key of valueKeys) {
                    if (tokenValue[key]) {
                        delete tokenValue[key];
                    }
                }

                return { ...token, value: tokenValue }
            }
        }).filter((token) => Object.keys(token.value).length > 0);
        if (!exists) {
            newTokens.push(payload);
        }

        return {
            ...node,
            tokens: newTokens 
        }
    });
});

$currentNodes.watch(setCurrentNodesToken, state => {
    applyTokenToFigma({ nodes: state.map(n => ({ nodeId: n.nodeId, tokens: n.tokens })) });
});