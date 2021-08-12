import { addLayersToFrame, defaultFont, getDropOffset } from 'html-figma/figma';
import { PlainLayerNode } from 'html-figma/types';

//@ts-ignore
figma.showUI(__html__, {
    width: 750,
    height: 600,
});


interface MsgData {
    layers: PlainLayerNode;
    position: {
        dropPosition: { clientX: number; clientY: number }
        offset: {
          x: number
          y: number
        }
        windowSize: { width: number; height: number }
      }
}

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'import') {
        await figma.loadFontAsync(defaultFont);

        const { data } = msg;

        let { layers, position } = data as MsgData;

        let baseFrame: PageNode | FrameNode = figma.currentPage;

        const { x, y } = getDropOffset(position);
        // let currentNode = figma.currentPage.findOne(n => n.name === name);

        // if (currentNode) {
        //     x = currentNode.x;
        //     y = currentNode.y;
        // }
        
        layers.x = x;
        layers.y = y;

        await addLayersToFrame([layers], baseFrame);

        // currentNode?.remove();
    }
};
