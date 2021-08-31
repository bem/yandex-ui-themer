import convertOpacityToFigma, {
    convertTypographyNumberToFigma,
    transformSize,
    transformSpace,
    transformValue,
} from './helpers/transformValue';
import { convertToFigmaColor } from './helpers/colors';
import { convertStringToFigmaGradient } from './helpers/gradients';
import { Token } from '../../src/TokenTypes';

export async function setFont(target: TextNode, token: Token) {
    try {
        const { value, description } = token;
        const {
            fontFamily,
            fontWeight,
            fontSize,
            lineHeight,
            letterSpacing,
            paragraphSpacing,
        } = value;
        // @ts-expect-error
        const family = fontFamily || target.fontName.family;
        // @ts-expect-error
        const style = fontWeight || target.fontName.style;
        await figma.loadFontAsync({ family, style });

        if (fontFamily && fontWeight) {
            target.fontName = {
                family,
                style,
            };
        }

        if (fontSize) {
            target.fontSize = transformValue(fontSize, 'fontSize') as number;
        }
        if (lineHeight) {
            target.lineHeight = transformValue(
                lineHeight,
                'lineHeight'
            ) as LineHeight;
        }
        if (letterSpacing) {
            target.letterSpacing = transformValue(
                letterSpacing,
                'letterSpacing'
            ) as LetterSpacing;
        }
        if (paragraphSpacing) {
            target.paragraphSpacing = transformValue(
                paragraphSpacing,
                'paragraphSpacing'
            ) as number;
        }
        if (description) {
            // @ts-expect-error
            target.description = description;
        }
    } catch (e) {
        console.log('Error setting font on target', target, token, e);
    }
}

export function setColorValuesOnTarget(
    target: SceneNode,
    value: string,
    description?: string,
    key: 'fills' | 'paints' = 'paints'
) {
    try {
        if (value.startsWith('linear-gradient')) {
            const {
                gradientStops,
                gradientTransform,
            } = convertStringToFigmaGradient(value);
            const newPaint = {
                type: 'GRADIENT_LINEAR',
                gradientTransform,
                gradientStops,
            };
            // @ts-expect-error
            target[key] = [newPaint];
        } else {
            const { color, opacity } = convertToFigmaColor(value);
            // @ts-expect-error
            target[key] = [{ color, opacity, type: 'SOLID' }];
        }

        if (description) {
            // @ts-expect-error
            target.description = description;
        }
    } catch (e) {
        console.error('Error setting color', e);
    }
}

export const setFillToNode = (node: FrameNode, token: Token) => {
    // FILL
    if (token.value.fill && typeof token.value.fill === 'string') {
        if (typeof node.fills !== 'undefined') {
            setColorValuesOnTarget(node, token.value.fill, token.description, 'fills');
        }
    }
};

export const setBorderColor = (node: FrameNode, token: Token) => {
    const { value } = token;

    if (typeof value.borderColor !== 'undefined') {
        if (typeof node.strokes !== 'undefined') {
            const { color, opacity } = convertToFigmaColor(value.borderColor);

            node.strokes = [{ type: 'SOLID', color, opacity }];
        }
    }
};

export const setBorderRadius = (node: FrameNode, token: Token) => {
    const { value } = token;

    // BORDER RADIUS
    // if (
    //     typeof value.borderRadius !== 'undefined' &&
    //     typeof node.cornerRadius !== 'undefined'
    // ) {
    //     node.cornerRadius = convertTypographyNumberToFigma(value.borderRadius);
    // }
    if (
        typeof value.borderRadiusTopLeft !== 'undefined' &&
        typeof node.topLeftRadius !== 'undefined'
    ) {
        node.topLeftRadius = convertTypographyNumberToFigma(
            value.borderRadiusTopLeft
        );
    }
    if (
        typeof value.borderRadiusTopRight !== 'undefined' &&
        typeof node.topRightRadius !== 'undefined'
    ) {
        node.topRightRadius = convertTypographyNumberToFigma(
            value.borderRadiusTopRight
        );
    }
    if (
        typeof value.borderRadiusBottomRight !== 'undefined' &&
        typeof node.bottomRightRadius !== 'undefined'
    ) {
        node.bottomRightRadius = convertTypographyNumberToFigma(
            value.borderRadiusBottomRight
        );
    }
    if (
        typeof value.borderRadiusBottomLeft !== 'undefined' &&
        typeof node.bottomLeftRadius !== 'undefined'
    ) {
        node.bottomLeftRadius = convertTypographyNumberToFigma(
            value.borderRadiusBottomLeft
        );
    }
};

export const setPadding = (node: FrameNode, token: Token) => {
    const { value } = token;
    // SPACING
    // if (
    //     typeof value.spacing !== 'undefined' &&
    //     typeof node.paddingLeft !== 'undefined'
    // ) {
    //     node.paddingLeft = transformSpace(value.spacing);
    //     node.paddingRight = transformSpace(value.spacing);
    //     node.paddingTop = transformSpace(value.spacing);
    //     node.paddingBottom = transformSpace(value.spacing);
    //     node.itemSpacing = transformSpace(value.spacing);
    // }

    if (
        typeof value.itemSpacing !== 'undefined' &&
        typeof node.itemSpacing !== 'undefined'
    ) {
        node.itemSpacing = transformSpace(value.itemSpacing);
    }

    if (
        typeof value.paddingTop !== 'undefined' &&
        typeof node.paddingTop !== 'undefined'
    ) {
        node.paddingTop = transformSpace(value.paddingTop);
    }
    if (
        typeof value.paddingRight !== 'undefined' &&
        typeof node.paddingRight !== 'undefined'
    ) {
        node.paddingRight = transformSpace(value.paddingRight);
    }
    if (
        typeof value.paddingBottom !== 'undefined' &&
        typeof node.paddingBottom !== 'undefined'
    ) {
        node.paddingBottom = transformSpace(value.paddingBottom);
    }
    if (
        typeof value.paddingLeft !== 'undefined' &&
        typeof node.paddingLeft !== 'undefined'
    ) {
        node.paddingLeft = transformSpace(value.paddingLeft);
    }
};

export const setBorderWidth = (node: SceneNode, token: Token) => {
    // BORDER WIDTH
    if (
        typeof token.value.borderWidth !== 'undefined' &&
        typeof (node as FrameNode).strokeWeight !== 'undefined'
    ) {
        (node as FrameNode).strokeWeight = transformSize(
            token.value.borderWidth
        );
    }
};

export const setOpacity = (node: SceneNode, token: Token) => {
    if (
        typeof token.value.opacity !== 'undefined' &&
        typeof (node as FrameNode).opacity !== 'undefined'
    ) {
        (node as FrameNode).opacity = convertOpacityToFigma(
            token.value.opacity
        );
    }
};

export const setSize = (node: SceneNode, token: Token) => {
    // SIZING: BOTH
    if (
        typeof token.value.sizing !== 'undefined' &&
        typeof node.resize !== 'undefined'
    ) {
        node.resize(
            transformSize(token.value.sizing),
            transformSize(token.value.sizing)
        );
    }

    // SIZING: WIDTH
    if (
        typeof token.value.width !== 'undefined' &&
        typeof node.resize !== 'undefined'
    ) {
        node.resize(transformSize(token.value.width), node.height);
    }

    // SIZING: HEIGHT
    if (
        typeof token.value.height !== 'undefined' &&
        typeof node.resize !== 'undefined'
    ) {
        node.resize(node.width, transformSize(token.value.height));
    }
};

export const setBoxShadow = (node: FrameNode, token: Token) => {
    const { value } = token;
    if (
        typeof value.boxShadow !== 'undefined' &&
        typeof node.effects !== 'undefined'
    ) {
        // get all effects, but remove DROP_SHADOW, since we're about to add it
        const effects = node.effects.filter(
            (effect) => effect.type !== 'DROP_SHADOW'
        );
        const { x, y, spread, color, blur } = value.boxShadow;
        const {
            color: { r, g, b },
            opacity,
        } = convertToFigmaColor(color);

        const effect: ShadowEffect = {
            type: 'DROP_SHADOW',
            visible: true,
            blendMode: 'NORMAL',
            color: { r, g, b, a: opacity },
            offset: {
                x: transformValue(x, 'boxShadow') as number,
                y: transformValue(y, 'boxShadow') as number,
            },
            radius: transformValue(blur, 'boxShadow') as number,
            spread: transformValue(spread, 'boxShadow') as number,
        };

        effects.push(effect);
        node.effects = effects;
    }
};

export async function setTokenToNode(node: SceneNode, token: Token) {
    try {
        setFillToNode(node as FrameNode, token);
        setBorderRadius(node as FrameNode, token);
        setBoxShadow(node as FrameNode, token);
        setOpacity(node, token);
        setSize(node, token);

        if (node.type === 'TEXT') {
            setFont(node, token);
        }

        setBorderWidth(node, token);
        setBorderColor(node as FrameNode, token);
        setPadding(node as FrameNode, token);
    } catch (e) {
        console.log('Error setting data on node', e);
    }
}
