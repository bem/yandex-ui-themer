type Color =
  | { source: 'rgb'; rgb: { r: number; g: number; b: number; a: number } }
  | { source: 'hsl'; hsl: { h: number; s: number; l: number; a: number } }
  | { source: 'hex'; hex: string }

export function isColor(value: string): boolean {
  return Boolean(String(value).match(/^(#|hsla?|rgba?)/))
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `${f(0)}${f(8)}${f(4)}`
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    (r | (1 << 8)).toString(16).slice(1) +
    (g | (1 << 8)).toString(16).slice(1) +
    (b | (1 << 8)).toString(16).slice(1)
  )
}

function clamp(number: number, min: number, max: number) {
  return Math.max(Math.min(number, max), min)
}

export function convertColorObj(color: Color): string {
  let colorValue = ''

  // TODO: Move to util.
  if (color.source === 'rgb') {
    colorValue = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
  } else if (color.source === 'hsl') {
    colorValue = `hsla(${color.hsl.h}, ${color.hsl.s}, ${color.hsl.l}, ${color.hsl.a})`
  } else {
    colorValue = color.hex
  }

  return colorValue
}

export function toHEXA(color: string) {
  const _color = String(color)
  let hex, a

  if (_color.match(/(rgb|hsl)/)) {
    const extract = _color.match(/\((.*)\)/)

    if (!extract) {
      throw new Error('Wrong color value. Empty rgb/hsl body')
    }

    // Parameters depends on the applied function
    //     r   g   b   alpha
    //     h   s   l   alpha
    const [a1, a2, a3, alpha] = extract[0]
      .slice(1, extract[0].length - 1)
      .split(',')
      .map((el) => Number(el.trim()))

    hex = _color.match(/rgb/) ? rgbToHex(a1, a2, a3) : hslToHex(a1, a2, a3)
    a = alpha ?? 1
  } else {
    let fullForm = _color.slice(1)
    if (_color.length === 4 || _color.length === 5) {
      const r = _color[1],
        g = _color[2],
        b = _color[3]
      fullForm = r + r + g + g + b + b + (_color.length === 5 ? color[4] + color[4] : '')
    }

    if (fullForm.length === 8) {
      // _______ <- color part
      // #FFFFFF00
      //        -- <- alpha part
      hex = fullForm.slice(0, -2)
      a = parseInt(fullForm.slice(fullForm.length - 2, fullForm.length), 16) / 100
    } else {
      hex = fullForm
      a = 1
    }
  }

  a = clamp(a, 0, 1)
  return [hex.toUpperCase(), `${Math.round(a * 100)}%`]
}

export function combineHexAndAlpha(hex: string, alpha: string): string {
  return '#' + hex + clamp(Number(alpha), 0, 100).toString(16).padStart(2, '0')
}
