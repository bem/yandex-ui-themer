// import {hexToFigmaRGB, webRGBToFigmaRGB} from '@figma-plugin/helpers';

export interface RGBA {
    r: number;
    g: number;
    b: number;
    a?: number;
}

export type webRGBA = number[];

const namesRGB = ['r', 'g', 'b']

export function figmaRGBToWebRGB(color: RGBA): any {
	const rgb = []

	namesRGB.forEach((e, i) => {
        // @ts-expect-error
		rgb[i] = Math.round(color[e] * 255)
	})

	if (color['a'] !== undefined) rgb[3] = Math.round(color['a'] * 100) / 100
	return rgb
}

export function figmaRGBToHex(color: RGB | RGBA): string {
	let hex = '#'

	const rgb = figmaRGBToWebRGB(color) as webRGBA
	hex += ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)

	if (rgb[3] !== undefined) {
		const a = Math.round(rgb[3] * 255).toString(16)
		if (a.length == 1) {
			hex += '0' + a
		} else {
			if (a !== 'ff') hex += a
		}
	}
	return hex
}

export function webRGBToFigmaRGB(color: number[]): any {
	const rgb: RGBA = { r: 0, g: 0, b: 0 }

	namesRGB.forEach((e, i) => {
        // @ts-expect-error
		rgb[e] = color[i] / 255
	})

	if (color[3] !== undefined) rgb['a'] = color[3]
	return rgb
}

export function hexToFigmaRGB(color: string): RGB | RGBA {
	let opacity = ''

	color = color.toLowerCase()

	if (color[0] === '#') color = color.slice(1)
	if (color.length === 3) {
		color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3')
	} else if (color.length === 8) {
		const arr = color.match(/(.{6})(.{2})/)
        // @ts-expect-error
		color = arr[1]
        // @ts-expect-error
		opacity = arr[2]
	}

	const num = parseInt(color, 16)
	const rgb = [num >> 16, (num >> 8) & 255, num & 255]

	if (opacity) {
		rgb.push(parseInt(opacity, 16) / 255)
		return webRGBToFigmaRGB(rgb as webRGBA)
	} else {
		return webRGBToFigmaRGB(rgb as webRGBA)
	}
}

export function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

export function RGBAToHexA(red: string, green: string, blue: string, alpha: string) {
    const r = parseInt(red, 10);
    const g = parseInt(green, 10);
    const b = parseInt(blue, 10);
    const a = Number(parseFloat(alpha).toFixed(2));

    const outParts = [
        r.toString(16),
        g.toString(16),
        b.toString(16),
        Math.round(a * 255)
            .toString(16)
            .substring(0, 2),
    ];

    // Pad single-digit output values
    outParts.forEach((part, i) => {
        if (part.length === 1) {
            outParts[i] = `0${part}`;
        }
    });

    return `#${outParts.join('')}`;
}

export function hslaToRgba(hslaValues: number[]) {
    const h = hslaValues[0];
    let s = hslaValues[1];
    let l = hslaValues[2];
    let a = 1;

    if (hslaValues[3]) {
        a = hslaValues[3];
    }

    // Must be fractions of 1
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b, a];
}

export function convertToFigmaColor(input: string) {
    let color;
    let opacity;
    if (input.startsWith('rgb')) {
        const rgbValues = input.replace(/^rgba?\(|\s+|\)$/g, '').split(',').map(n => Number(n));
        // @ts-ignore
        const {r, g, b, a = 1} = webRGBToFigmaRGB(rgbValues);
        color = {r, g, b};
        opacity = Number(a);
    } else if (input.startsWith('hsl')) {
        const hslValues = input.replace(/^hsla?\(|\s+|%|\)$/g, '').split(',').map(n => Number(n));;
        const rgbValues: any = hslaToRgba(hslValues);
        const {r, g, b, a = 1} = webRGBToFigmaRGB(rgbValues);
        color = {r, g, b};
        opacity = Number(a);
    } else {
        const {r, g, b, a = 1}: RGBA = hexToFigmaRGB(input);
        color = {r, g, b};
        opacity = Number(a);
    }

    return {
        color,
        opacity,
    };
}