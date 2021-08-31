import { htmlToFigma } from "html-figma/browser";
import React from 'react';
import ReactDOMServer from "react-dom/server";
import { PluginMessageEvent, FigmaMessageType } from "./FigmaMessageType";
import { pluginMessage } from "./utils/figma";
import { getComponentByName, AllComponentsNames } from "./utils/getComponentByName";

const body = document.body;

export const ComponentRendererInit = (el: HTMLElement) => {
    const handler = (e: PluginMessageEvent) => {
        const message = e.data;

        if (message.type === FigmaMessageType.RENDER_TOKENS_SYNC) {
            const tokens = message.data;
            for (const key of Object.keys(tokens)) {
                body.style.setProperty(key, tokens[key])
            }
        }

        if (message.type === FigmaMessageType.RENDER) {
            const components = message.data.type === 'variants' ?
                message.data.blocks :
                [message.data.block]

            const html = ReactDOMServer.renderToStaticMarkup(
                // @ts-ignore
                components.map(block => {
                    const component = getComponentByName(block.name as AllComponentsNames);
                    // @ts-expect-error
                    const { children, ...props } = block.props || {};
                    // @ts-expect-error
                    return React.createElement(component, props, children);
                }),
            )
            el.innerHTML = html;
            const layers = htmlToFigma(el as HTMLElement);
            
            el.innerHTML = '';

            if (message.data.type === 'variants') {
                pluginMessage({
                    type: FigmaMessageType.IMPORT_VARIANTS,
                    data: { 
                        layers: layers.children,
                        componentsData: message.data.blocks
                    }
                },
                true);
            } else {
                const layer = layers.children[0];
                const { name, props } = message.data.block;
                layer.name = name;

                pluginMessage({
                    type: FigmaMessageType.IMPORT,
                    data: {
                        layers: layers.children[0],
                        position: message.data.position,
                        name,
                        props
                    }
                },
                true);
            }
        }
    };

    window.addEventListener('message', handler);
}