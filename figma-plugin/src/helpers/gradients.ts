import {figmaRGBToHex} from './colors';
import {convertToFigmaColor, RGBA} from './colors';

type Matrix = number[][];

function getTx(deg: number) {
    if (deg >= 120) {
        if (deg >= 180) {
            return 1;
        }
        return 0.5;
    }
    return 0;
}
// Gets a Matrix for a degree value
// If you read this and know math (unlike me), PLEASE fix this D:
export function getMatrixForDegrees(deg: string) {
    const rad = parseFloat(deg) * (Math.PI / 180);

    const a = Math.round(Math.cos(rad) * 100) / 100;
    const b = Math.round(Math.sin(rad) * 100) / 100;
    const c = -Math.round(Math.sin(rad) * 100) / 100;
    const d = Math.round(Math.cos(rad) * 100) / 100;
    const degNumber = Number(deg);
    const tx = getTx(degNumber);
    const ty = degNumber >= 120 ? 1 : 0;

    return [
        [a, b, tx],
        [c, d, ty],
    ];
}

function convertToDegrees(matrix: Matrix) {
    const values = [...matrix[0], ...matrix[1]];
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
}

export function getDegreesForMatrix(matrix: Matrix) {
    const degrees = convertToDegrees(matrix) || 0;
    return `${degrees}deg`;
}

export function convertDegreeToNumber(degree: string) {
    return degree.split('deg').join('');
}

export function convertFigmaGradientToString(paint: GradientPaint) {
    const {gradientTransform, gradientStops} = paint;
    const gradientStopsString = gradientStops
        .map((stop) => `${figmaRGBToHex(stop.color)} ${Math.round(stop.position * 100 * 100) / 100}%`)
        .join(', ');
    const gradientTransformString = getDegreesForMatrix(gradientTransform);
    return `linear-gradient(${gradientTransformString}, ${gradientStopsString})`;
}

export function convertStringToFigmaGradient(value: string) {
    const [gradientDegrees, ...colorStops] = value
        .substring(value.indexOf('(') + 1, value.lastIndexOf(')'))
        .split(', ');
    const degrees = convertDegreeToNumber(gradientDegrees);
    const gradientTransform = getMatrixForDegrees(degrees);

    const gradientStops = colorStops.map((stop) => {
        const seperatedStop = stop.split(' ');
        const {color, opacity} = convertToFigmaColor(seperatedStop[0]);
        const gradientColor = color as RGBA;
        gradientColor.a = opacity;
        return {
            color: gradientColor,
            position: parseFloat(seperatedStop[1]) / 100,
        };
    });

    return {gradientStops, gradientTransform};
}