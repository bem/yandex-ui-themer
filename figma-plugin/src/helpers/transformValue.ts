export function convertNumberToFigma(value: string) {
    return parseInt(value, 10);
}

export function fakeZeroForFigma(value: string | number) {
    return Number(value) === 0 ? 0.001 : Number(value);
}

export function convertTypographyNumberToFigma(value: string | number) {
    const baseFontSize = 16;
    if (
        typeof value === 'string' &&
        (value.endsWith('em') || value.endsWith('rem'))
    ) {
        return parseFloat(value) * baseFontSize;
    }
    return typeof value === 'string' ? parseFloat(value) : value;
}

export function convertLetterSpacingToFigma(inputValue: string | number) {
    let letterSpacing;
    const value = inputValue.toString();
    const numbers = /^-?\d+(\.\d+)?$/;
    if (
        value.trim().slice(-1) === '%' &&
        value.trim().slice(0, -1).match(numbers)
    ) {
        letterSpacing = {
            unit: 'PERCENT',
            value: Number(value.slice(0, -1)),
        } as LetterSpacing;
    } else if (value.match(numbers) || value.endsWith('px')) {
        letterSpacing = {
            unit: 'PIXELS',
            value: convertTypographyNumberToFigma(value),
        } as LetterSpacing;
    }
    return letterSpacing;
}

export function convertFigmaToLetterSpacing(inputValue: LetterSpacing) {
    const { unit, value } = inputValue;
    if (unit === 'PERCENT') {
        return `${+value.toFixed(2)}%`;
    }
    return +value.toFixed(2);
}

export function convertLineHeightToFigma(inputValue: string | number) {
    let lineHeight;
    const value = inputValue.toString();
    const numbers = /^\d+(\.\d+)?$/;
    if (value.match(numbers) || value.endsWith('px')) {
        lineHeight = {
            unit: 'PIXELS',
            value: convertTypographyNumberToFigma(value),
        };
    } else if (
        value.trim().slice(-1) === '%' &&
        value.trim().slice(0, -1).match(numbers)
    ) {
        lineHeight = {
            unit: 'PERCENT',
            value: Number(value.slice(0, -1)),
        };
    } else {
        lineHeight = {
            unit: 'AUTO',
        };
    }
    return lineHeight;
}

export function convertFigmaToLineHeight(
    inputValue: LineHeight
): string | number {
    // @ts-expect-error
    const { unit, value } = inputValue;
    if (unit === 'PIXELS') {
        return +value.toFixed(2);
    }
    if (unit === 'PERCENT') {
        return `${+value.toFixed(2)}%`;
    }
    return 'AUTO';
}

export default function convertOpacityToFigma(value: string | number) {
    const matchedPercent = value.toString().match(/(\d+%)/);
    // Matches 50%, 100%, etc.
    if (matchedPercent && matchedPercent.length) {
        return Number(matchedPercent[0].slice(0, -1)) / 100;
    }
    return Number(value);
}

export const transformSize = (value: string | number) => fakeZeroForFigma(convertTypographyNumberToFigma(value));
export const transformSpace = (value: string | number) => convertTypographyNumberToFigma(value);

export function transformValue(value: string | number, type: string) {
    switch (type) {
        case 'borderWidth':
        case 'width':
        case 'height':
        case 'sizing':
            return fakeZeroForFigma(convertTypographyNumberToFigma(value));
        case 'borderRadius':
        case 'borderRadiusTopLeft':
        case 'borderRadiusTopRight':
        case 'borderRadiusBottomRight':
        case 'borderRadiusBottomLeft':
        case 'spacing':
        case 'horizontalPadding':
        case 'verticalPadding':
        case 'paddingTop':
        case 'paddingRight':
        case 'paddingBottom':
        case 'paddingLeft':
        case 'itemSpacing':
        case 'boxShadow':
        case 'paragraphSpacing':
        case 'fontSize':
            return convertTypographyNumberToFigma(value);
        case 'letterSpacing':
            return convertLetterSpacingToFigma(value);
        case 'lineHeight':
            return convertLineHeightToFigma(value);
        case 'opacity':
            return convertOpacityToFigma(value.toString());
        default:
            return value;
    }
}
