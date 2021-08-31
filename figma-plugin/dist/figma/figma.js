/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../html-to-figma/build/figma/dropOffset.js":
/*!*****************************************************!*\
  !*** ../../html-to-figma/build/figma/dropOffset.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDropOffset": function() { return /* binding */ getDropOffset; }
/* harmony export */ });
function getDropOffset(payload) {
    const { dropPosition, windowSize, offset } = payload;
    const { bounds, zoom } = figma.viewport;
    const hasUI = Math.abs((bounds.width * zoom) / windowSize.width) < 0.99;
    const leftPaneWidth = windowSize.width - bounds.width * zoom - 240;
    const xFromCanvas = hasUI
        ? dropPosition.clientX - leftPaneWidth
        : dropPosition.clientX;
    const yFromCanvas = hasUI ? dropPosition.clientY - 40 : dropPosition.clientY;
    return {
        x: bounds.x + xFromCanvas / zoom - offset.x,
        y: bounds.y + yFromCanvas / zoom - offset.y
    };
}


/***/ }),

/***/ "../../html-to-figma/build/figma/getFont.js":
/*!**************************************************!*\
  !*** ../../html-to-figma/build/figma/getFont.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultFont": function() { return /* binding */ defaultFont; },
/* harmony export */   "getMatchingFont": function() { return /* binding */ getMatchingFont; }
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fontCache = {};
const normalizeName = (str) => str.toLowerCase().replace(/[^a-z]/gi, '');
const defaultFont = { family: 'Roboto', style: 'Regular' };
let cachedAvailableFonts = null;
const getAvailableFontNames = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedAvailableFonts) {
        return cachedAvailableFonts;
    }
    else {
        return (yield figma.listAvailableFontsAsync()).filter((font) => font.fontName.style === 'Regular');
    }
});
// TODO: keep list of fonts not found
function getMatchingFont(fontStr) {
    return __awaiter(this, void 0, void 0, function* () {
        const cached = fontCache[fontStr];
        if (cached) {
            return cached;
        }
        const availableFonts = yield getAvailableFontNames();
        const familySplit = fontStr.split(/\s*,\s*/);
        for (const family of familySplit) {
            const normalized = normalizeName(family);
            for (const availableFont of availableFonts) {
                const normalizedAvailable = normalizeName(availableFont.fontName.family);
                if (normalizedAvailable === normalized) {
                    const cached = fontCache[normalizedAvailable];
                    if (cached) {
                        return cached;
                    }
                    yield figma.loadFontAsync(availableFont.fontName);
                    fontCache[fontStr] = availableFont.fontName;
                    fontCache[normalizedAvailable] = availableFont.fontName;
                    return availableFont.fontName;
                }
            }
        }
        return defaultFont;
    });
}


/***/ }),

/***/ "../../html-to-figma/build/figma/helpers.js":
/*!**************************************************!*\
  !*** ../../html-to-figma/build/figma/helpers.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assign": function() { return /* binding */ assign; },
/* harmony export */   "cloneObject": function() { return /* binding */ cloneObject; }
/* harmony export */ });
const allPropertyNames = [
    'id',
    'width',
    'height',
    'currentPage',
    'cancel',
    'origin',
    'onmessage',
    'center',
    'zoom',
    'fontName',
    'name',
    'visible',
    'locked',
    'constraints',
    'relativeTransform',
    'x',
    'y',
    'rotation',
    'constrainProportions',
    'layoutAlign',
    'layoutGrow',
    'opacity',
    'blendMode',
    'isMask',
    'effects',
    'effectStyleId',
    'expanded',
    'backgrounds',
    'backgroundStyleId',
    'fills',
    'strokes',
    'strokeWeight',
    'strokeMiterLimit',
    'strokeAlign',
    'strokeCap',
    'strokeJoin',
    'dashPattern',
    'fillStyleId',
    'strokeStyleId',
    'cornerRadius',
    'cornerSmoothing',
    'topLeftRadius',
    'topRightRadius',
    'bottomLeftRadius',
    'bottomRightRadius',
    'exportSettings',
    'overflowDirection',
    'numberOfFixedChildren',
    'description',
    'layoutMode',
    'primaryAxisSizingMode',
    'counterAxisSizingMode',
    'primaryAxisAlignItems',
    'counterAxisAlignItems',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'itemSpacing',
    'layoutGrids',
    'gridStyleId',
    'clipsContent',
    'guides',
    'guides',
    'selection',
    'selectedTextRange',
    'backgrounds',
    'arcData',
    'pointCount',
    'pointCount',
    'innerRadius',
    'vectorNetwork',
    'vectorPaths',
    'handleMirroring',
    'textAlignHorizontal',
    'textAlignVertical',
    'textAutoResize',
    'paragraphIndent',
    'paragraphSpacing',
    'autoRename',
    'textStyleId',
    'fontSize',
    'fontName',
    'textCase',
    'textDecoration',
    'letterSpacing',
    'lineHeight',
    'characters',
    'mainComponent',
    'scaleFactor',
    'booleanOperation',
    'expanded',
    'name',
    'type',
    'paints',
    'type',
    'fontSize',
    'textDecoration',
    'fontName',
    'letterSpacing',
    'lineHeight',
    'paragraphIndent',
    'paragraphSpacing',
    'textCase',
    'type',
    'effects',
    'type',
    'layoutGrids',
];
function assign(a, b) {
    for (const key in b) {
        const value = b[key];
        if (key === 'data' && value && typeof value === 'object') {
            const currentData = JSON.parse(a.getSharedPluginData('builder', 'data') || '{}') ||
                {};
            const newData = value;
            const mergedData = Object.assign({}, currentData, newData);
            // TODO merge plugin data
            a.setSharedPluginData('builder', 'data', JSON.stringify(mergedData));
        }
        else if (typeof value != 'undefined' &&
            ['width', 'height', 'type', 'ref', 'children', 'svg'].indexOf(key) === -1) {
            try {
                a[key] = b[key];
            }
            catch (err) {
                console.warn(`Assign error for property "${key}"`, a, b, err);
            }
        }
    }
}
// The Figma nodes are hard to inspect at a glance because almost all properties are non enumerable
// getters. This removes that wrapping for easier inspecting
const cloneObject = (obj, valuesSet = new Set()) => {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    const newObj = Array.isArray(obj) ? [] : {};
    for (const property of allPropertyNames) {
        const value = obj[property];
        if (value !== undefined && typeof value !== 'symbol') {
            newObj[property] = obj[property];
        }
    }
    return newObj;
};


/***/ }),

/***/ "../../html-to-figma/build/figma/images.js":
/*!*************************************************!*\
  !*** ../../html-to-figma/build/figma/images.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processImages": function() { return /* binding */ processImages; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../html-to-figma/build/utils.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function processImages(layer) {
    return __awaiter(this, void 0, void 0, function* () {
        const images = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getImageFills)(layer);
        return (images &&
            Promise.all(images.map((image) => __awaiter(this, void 0, void 0, function* () {
                if (image && image.intArr) {
                    image.imageHash = yield figma.createImage(image.intArr)
                        .hash;
                    delete image.intArr;
                }
            }))));
    });
}


/***/ }),

/***/ "../../html-to-figma/build/figma/index.js":
/*!************************************************!*\
  !*** ../../html-to-figma/build/figma/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLayersToFrame": function() { return /* binding */ addLayersToFrame; },
/* harmony export */   "defaultFont": function() { return /* reexport safe */ _getFont__WEBPACK_IMPORTED_MODULE_2__.defaultFont; },
/* harmony export */   "getMatchingFont": function() { return /* reexport safe */ _getFont__WEBPACK_IMPORTED_MODULE_2__.getMatchingFont; },
/* harmony export */   "getDropOffset": function() { return /* reexport safe */ _dropOffset__WEBPACK_IMPORTED_MODULE_3__.getDropOffset; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../html-to-figma/build/utils.js");
/* harmony import */ var _processLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processLayer */ "../../html-to-figma/build/figma/processLayer.js");
/* harmony import */ var _getFont__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getFont */ "../../html-to-figma/build/figma/getFont.js");
/* harmony import */ var _dropOffset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropOffset */ "../../html-to-figma/build/figma/dropOffset.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function addLayersToFrame(layers, baseFrame, onLayerProcess) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const rootLayer of layers) {
            yield (0,_utils__WEBPACK_IMPORTED_MODULE_0__.traverseAsync)(rootLayer, (layer, parent) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const node = yield (0,_processLayer__WEBPACK_IMPORTED_MODULE_1__.processLayer)(layer, parent, baseFrame);
                    onLayerProcess === null || onLayerProcess === void 0 ? void 0 : onLayerProcess({ node, layer, parent });
                }
                catch (err) {
                    console.warn('Error on layer:', layer, err);
                }
            }));
        }
    });
}




/***/ }),

/***/ "../../html-to-figma/build/figma/processLayer.js":
/*!*******************************************************!*\
  !*** ../../html-to-figma/build/figma/processLayer.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processLayer": function() { return /* binding */ processLayer; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../html-to-figma/build/utils.js");
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images */ "../../html-to-figma/build/figma/images.js");
/* harmony import */ var _getFont__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getFont */ "../../html-to-figma/build/figma/getFont.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "../../html-to-figma/build/figma/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const processDefaultElement = (layer, node) => {
    node.x = layer.x;
    node.y = layer.y;
    node.resize(layer.width || 1, layer.height || 1);
    (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.assign)(node, layer);
    // rects.push(frame);
    return node;
};
const createNodeFromLayer = (layer) => {
    if (layer.type === 'FRAME' || layer.type === 'GROUP') {
        return figma.createFrame();
    }
    if (layer.type === 'SVG' && layer.svg) {
        return figma.createNodeFromSvg(layer.svg);
    }
    if (layer.type === 'RECTANGLE') {
        return figma.createRectangle();
    }
    if (layer.type === 'TEXT') {
        return figma.createText();
    }
    if (layer.type === 'COMPONENT') {
        return figma.createComponent();
    }
};
const SIMPLE_TYPES = ['FRAME', 'GROUP', 'SVG', 'RECTANGLE', 'COMPONENT'];
const processLayer = (layer, parent, baseFrame) => __awaiter(void 0, void 0, void 0, function* () {
    const parentFrame = (parent === null || parent === void 0 ? void 0 : parent.ref) || baseFrame;
    if (typeof layer.x !== 'number' || typeof layer.y !== 'number') {
        throw Error('Layer coords not defined');
    }
    const node = createNodeFromLayer(layer);
    if (!node) {
        throw Error(`${layer.type} not implemented`);
    }
    if (SIMPLE_TYPES.includes(layer.type)) {
        parentFrame.appendChild(processDefaultElement(layer, node));
    }
    // @ts-expect-error
    layer.ref = node;
    if (layer.type === 'RECTANGLE') {
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getImageFills)(layer)) {
            yield (0,_images__WEBPACK_IMPORTED_MODULE_1__.processImages)(layer);
        }
    }
    if (layer.type === 'TEXT') {
        const text = node;
        if (layer.fontFamily) {
            text.fontName = yield (0,_getFont__WEBPACK_IMPORTED_MODULE_2__.getMatchingFont)(layer.fontFamily);
            delete layer.fontFamily;
        }
        (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.assign)(text, layer);
        text.resize(layer.width || 1, layer.height || 1);
        text.textAutoResize = 'HEIGHT';
        let adjustments = 0;
        if (layer.lineHeight) {
            text.lineHeight = layer.lineHeight;
        }
        // Adjust text width
        while (typeof layer.height === 'number' &&
            text.height > layer.height) {
            if (adjustments++ > 5) {
                console.warn('Too many font adjustments', text, layer);
                break;
            }
            try {
                text.resize(text.width + 1, text.height);
            }
            catch (err) {
                console.warn('Error on resize text:', layer, text, err);
            }
        }
        parentFrame.appendChild(text);
    }
    return node;
});


/***/ }),

/***/ "../../html-to-figma/build/utils.js":
/*!******************************************!*\
  !*** ../../html-to-figma/build/utils.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasChildren": function() { return /* binding */ hasChildren; },
/* harmony export */   "traverse": function() { return /* binding */ traverse; },
/* harmony export */   "traverseMap": function() { return /* binding */ traverseMap; },
/* harmony export */   "traverseAsync": function() { return /* binding */ traverseAsync; },
/* harmony export */   "size": function() { return /* binding */ size; },
/* harmony export */   "capitalize": function() { return /* binding */ capitalize; },
/* harmony export */   "getRgb": function() { return /* binding */ getRgb; },
/* harmony export */   "fastClone": function() { return /* binding */ fastClone; },
/* harmony export */   "toNum": function() { return /* binding */ toNum; },
/* harmony export */   "toPercent": function() { return /* binding */ toPercent; },
/* harmony export */   "parseUnits": function() { return /* binding */ parseUnits; },
/* harmony export */   "parseBoxShadowValue": function() { return /* binding */ parseBoxShadowValue; },
/* harmony export */   "getOpacity": function() { return /* binding */ getOpacity; },
/* harmony export */   "parseBoxShadowValues": function() { return /* binding */ parseBoxShadowValues; },
/* harmony export */   "getImageFills": function() { return /* binding */ getImageFills; },
/* harmony export */   "defaultPlaceholderColor": function() { return /* binding */ defaultPlaceholderColor; }
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const hasChildren = (node) => 
// @ts-expect-error
node && Array.isArray(node.children);
function traverse(layer, cb, parent = null) {
    if (layer) {
        cb(layer, parent);
        if (hasChildren(layer)) {
            // @ts-expect-error
            layer.children.forEach((child) => traverse(child, cb, layer));
        }
    }
}
function traverseMap(layer, cb, parent = null) {
    var _a;
    if (layer) {
        const newLayer = cb(layer, parent);
        // @ts-expect-error
        if ((_a = newLayer === null || newLayer === void 0 ? void 0 : newLayer.children) === null || _a === void 0 ? void 0 : _a.length) {
            // @ts-expect-error
            newLayer.children = newLayer.children.map((child) => traverseMap(child, cb, layer));
        }
        return newLayer;
    }
}
function traverseAsync(layer, cb, parent = null) {
    return __awaiter(this, void 0, void 0, function* () {
        if (layer) {
            yield cb(layer, parent);
            if (hasChildren(layer)) {
                // @ts-ignore
                for (let child of layer.children.reverse()) {
                    yield traverseAsync(child, cb, layer);
                }
            }
        }
    });
}
function size(obj) {
    return Object.keys(obj).length;
}
const capitalize = (str) => str[0].toUpperCase() + str.substring(1);
function getRgb(colorString) {
    if (!colorString) {
        return null;
    }
    const [_1, r, g, b, _2, a] = (colorString.match(/rgba?\(([\d\.]+), ([\d\.]+), ([\d\.]+)(, ([\d\.]+))?\)/) || []);
    const none = a && parseFloat(a) === 0;
    if (r && g && b && !none) {
        return {
            r: parseInt(r) / 255,
            g: parseInt(g) / 255,
            b: parseInt(b) / 255,
            a: a ? parseFloat(a) : 1,
        };
    }
    return null;
}
const fastClone = (data) => typeof data === 'symbol' ? null : JSON.parse(JSON.stringify(data));
const toNum = (v) => {
    // if (!/px$/.test(v) && v !== '0') return v;
    if (!/px$/.test(v) && v !== '0')
        return 0;
    const n = parseFloat(v);
    // return !isNaN(n) ? n : v;
    return !isNaN(n) ? n : 0;
};
const toPercent = (v) => {
    // if (!/px$/.test(v) && v !== '0') return v;
    if (!/%$/.test(v) && v !== '0')
        return 0;
    const n = parseInt(v);
    // return !isNaN(n) ? n : v;
    return !isNaN(n) ? n / 100 : 0;
};
const parseUnits = (str, relative) => {
    if (!str) {
        return null;
    }
    let value = toNum(str);
    if (relative && !value) {
        const percent = toPercent(str);
        if (!percent)
            return null;
        value = relative * percent;
    }
    // const match = str.match(/([\d\.]+)px/);
    // const val = match && match[1];
    if (value) {
        return {
            unit: 'PIXELS',
            value,
        };
    }
    return null;
};
const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;
const isLength = (v) => v === '0' || LENGTH_REG.test(v);
const parseMultipleCSSValues = (str) => {
    const parts = [];
    let lastSplitIndex = 0;
    let skobka = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ',' && !skobka) {
            parts.push(str.slice(lastSplitIndex, i));
            lastSplitIndex = i + 1;
        }
        else if (str[i] === '(') {
            skobka = true;
        }
        else if (str[i] === ')') {
            skobka = false;
        }
    }
    parts.push(str.slice(lastSplitIndex));
    return parts.map(s => s.trim());
};
const parseBoxShadowValue = (str) => {
    // TODO: this is broken for multiple box shadows
    if (str.startsWith('rgb')) {
        // Werid computed style thing that puts the color in the front not back
        const colorMatch = str.match(/(rgba?\(.+?\))(.+)/);
        if (colorMatch) {
            str = (colorMatch[2] + ' ' + colorMatch[1]).trim();
        }
    }
    const PARTS_REG = /\s(?![^(]*\))/;
    const parts = str.split(PARTS_REG);
    const inset = parts.includes('inset');
    const last = parts.slice(-1)[0];
    const color = !isLength(last) ? last : 'rgba(0, 0, 0, 1)';
    const nums = parts
        .filter((n) => n !== 'inset')
        .filter((n) => n !== color)
        .map(toNum);
    const [offsetX, offsetY, blurRadius, spreadRadius] = nums;
    const parsedColor = getRgb(color);
    if (!parsedColor) {
        console.error('Parse color error: ' + color);
    }
    return {
        inset,
        offsetX,
        offsetY,
        blurRadius,
        spreadRadius,
        color: parsedColor || { r: 0, g: 0, b: 0, a: 1 },
    };
};
const getOpacity = (styles) => {
    return Number(styles.opacity);
};
const parseBoxShadowValues = (str) => {
    const values = parseMultipleCSSValues(str);
    return values.map(s => parseBoxShadowValue(s));
};
function getImageFills(layer) {
    const images = Array.isArray(layer.fills) &&
        layer.fills.filter((item) => item.type === 'IMAGE');
    return images;
}
const defaultPlaceholderColor = getRgb('rgba(178, 178, 178, 1)');


/***/ }),

/***/ "./src/helpers/colors.ts":
/*!*******************************!*\
  !*** ./src/helpers/colors.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "figmaRGBToWebRGB": function() { return /* binding */ figmaRGBToWebRGB; },
/* harmony export */   "figmaRGBToHex": function() { return /* binding */ figmaRGBToHex; },
/* harmony export */   "webRGBToFigmaRGB": function() { return /* binding */ webRGBToFigmaRGB; },
/* harmony export */   "hexToFigmaRGB": function() { return /* binding */ hexToFigmaRGB; },
/* harmony export */   "hexToRgb": function() { return /* binding */ hexToRgb; },
/* harmony export */   "RGBAToHexA": function() { return /* binding */ RGBAToHexA; },
/* harmony export */   "hslaToRgba": function() { return /* binding */ hslaToRgba; },
/* harmony export */   "convertToFigmaColor": function() { return /* binding */ convertToFigmaColor; }
/* harmony export */ });
// import {hexToFigmaRGB, webRGBToFigmaRGB} from '@figma-plugin/helpers';
const namesRGB = ['r', 'g', 'b'];
function figmaRGBToWebRGB(color) {
    const rgb = [];
    namesRGB.forEach((e, i) => {
        // @ts-expect-error
        rgb[i] = Math.round(color[e] * 255);
    });
    if (color['a'] !== undefined)
        rgb[3] = Math.round(color['a'] * 100) / 100;
    return rgb;
}
function figmaRGBToHex(color) {
    let hex = '#';
    const rgb = figmaRGBToWebRGB(color);
    hex += ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    if (rgb[3] !== undefined) {
        const a = Math.round(rgb[3] * 255).toString(16);
        if (a.length == 1) {
            hex += '0' + a;
        }
        else {
            if (a !== 'ff')
                hex += a;
        }
    }
    return hex;
}
function webRGBToFigmaRGB(color) {
    const rgb = { r: 0, g: 0, b: 0 };
    namesRGB.forEach((e, i) => {
        // @ts-expect-error
        rgb[e] = color[i] / 255;
    });
    if (color[3] !== undefined)
        rgb['a'] = color[3];
    return rgb;
}
function hexToFigmaRGB(color) {
    let opacity = '';
    color = color.toLowerCase();
    if (color[0] === '#')
        color = color.slice(1);
    if (color.length === 3) {
        color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3');
    }
    else if (color.length === 8) {
        const arr = color.match(/(.{6})(.{2})/);
        // @ts-expect-error
        color = arr[1];
        // @ts-expect-error
        opacity = arr[2];
    }
    const num = parseInt(color, 16);
    const rgb = [num >> 16, (num >> 8) & 255, num & 255];
    if (opacity) {
        rgb.push(parseInt(opacity, 16) / 255);
        return webRGBToFigmaRGB(rgb);
    }
    else {
        return webRGBToFigmaRGB(rgb);
    }
}
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}
function RGBAToHexA(red, green, blue, alpha) {
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
function hslaToRgba(hslaValues) {
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
    }
    else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return [r, g, b, a];
}
function convertToFigmaColor(input) {
    let color;
    let opacity;
    if (input.startsWith('rgb')) {
        const rgbValues = input.replace(/^rgba?\(|\s+|\)$/g, '').split(',').map(n => Number(n));
        // @ts-ignore
        const { r, g, b, a = 1 } = webRGBToFigmaRGB(rgbValues);
        color = { r, g, b };
        opacity = Number(a);
    }
    else if (input.startsWith('hsl')) {
        const hslValues = input.replace(/^hsla?\(|\s+|%|\)$/g, '').split(',').map(n => Number(n));
        ;
        const rgbValues = hslaToRgba(hslValues);
        const { r, g, b, a = 1 } = webRGBToFigmaRGB(rgbValues);
        color = { r, g, b };
        opacity = Number(a);
    }
    else {
        const { r, g, b, a = 1 } = hexToFigmaRGB(input);
        color = { r, g, b };
        opacity = Number(a);
    }
    return {
        color,
        opacity,
    };
}


/***/ }),

/***/ "./src/helpers/gradients.ts":
/*!**********************************!*\
  !*** ./src/helpers/gradients.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMatrixForDegrees": function() { return /* binding */ getMatrixForDegrees; },
/* harmony export */   "getDegreesForMatrix": function() { return /* binding */ getDegreesForMatrix; },
/* harmony export */   "convertDegreeToNumber": function() { return /* binding */ convertDegreeToNumber; },
/* harmony export */   "convertFigmaGradientToString": function() { return /* binding */ convertFigmaGradientToString; },
/* harmony export */   "convertStringToFigmaGradient": function() { return /* binding */ convertStringToFigmaGradient; }
/* harmony export */ });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./src/helpers/colors.ts");


function getTx(deg) {
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
function getMatrixForDegrees(deg) {
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
function convertToDegrees(matrix) {
    const values = [...matrix[0], ...matrix[1]];
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
}
function getDegreesForMatrix(matrix) {
    const degrees = convertToDegrees(matrix) || 0;
    return `${degrees}deg`;
}
function convertDegreeToNumber(degree) {
    return degree.split('deg').join('');
}
function convertFigmaGradientToString(paint) {
    const { gradientTransform, gradientStops } = paint;
    const gradientStopsString = gradientStops
        .map((stop) => `${(0,_colors__WEBPACK_IMPORTED_MODULE_0__.figmaRGBToHex)(stop.color)} ${Math.round(stop.position * 100 * 100) / 100}%`)
        .join(', ');
    const gradientTransformString = getDegreesForMatrix(gradientTransform);
    return `linear-gradient(${gradientTransformString}, ${gradientStopsString})`;
}
function convertStringToFigmaGradient(value) {
    const [gradientDegrees, ...colorStops] = value
        .substring(value.indexOf('(') + 1, value.lastIndexOf(')'))
        .split(', ');
    const degrees = convertDegreeToNumber(gradientDegrees);
    const gradientTransform = getMatrixForDegrees(degrees);
    const gradientStops = colorStops.map((stop) => {
        const seperatedStop = stop.split(' ');
        const { color, opacity } = (0,_colors__WEBPACK_IMPORTED_MODULE_0__.convertToFigmaColor)(seperatedStop[0]);
        const gradientColor = color;
        gradientColor.a = opacity;
        return {
            color: gradientColor,
            position: parseFloat(seperatedStop[1]) / 100,
        };
    });
    return { gradientStops, gradientTransform };
}


/***/ }),

/***/ "./src/helpers/transformValue.ts":
/*!***************************************!*\
  !*** ./src/helpers/transformValue.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertNumberToFigma": function() { return /* binding */ convertNumberToFigma; },
/* harmony export */   "fakeZeroForFigma": function() { return /* binding */ fakeZeroForFigma; },
/* harmony export */   "convertTypographyNumberToFigma": function() { return /* binding */ convertTypographyNumberToFigma; },
/* harmony export */   "convertLetterSpacingToFigma": function() { return /* binding */ convertLetterSpacingToFigma; },
/* harmony export */   "convertFigmaToLetterSpacing": function() { return /* binding */ convertFigmaToLetterSpacing; },
/* harmony export */   "convertLineHeightToFigma": function() { return /* binding */ convertLineHeightToFigma; },
/* harmony export */   "convertFigmaToLineHeight": function() { return /* binding */ convertFigmaToLineHeight; },
/* harmony export */   "default": function() { return /* binding */ convertOpacityToFigma; },
/* harmony export */   "transformSize": function() { return /* binding */ transformSize; },
/* harmony export */   "transformSpace": function() { return /* binding */ transformSpace; },
/* harmony export */   "transformValue": function() { return /* binding */ transformValue; }
/* harmony export */ });
function convertNumberToFigma(value) {
    return parseInt(value, 10);
}
function fakeZeroForFigma(value) {
    return Number(value) === 0 ? 0.001 : Number(value);
}
function convertTypographyNumberToFigma(value) {
    const baseFontSize = 16;
    if (typeof value === 'string' &&
        (value.endsWith('em') || value.endsWith('rem'))) {
        return parseFloat(value) * baseFontSize;
    }
    return typeof value === 'string' ? parseFloat(value) : value;
}
function convertLetterSpacingToFigma(inputValue) {
    let letterSpacing;
    const value = inputValue.toString();
    const numbers = /^-?\d+(\.\d+)?$/;
    if (value.trim().slice(-1) === '%' &&
        value.trim().slice(0, -1).match(numbers)) {
        letterSpacing = {
            unit: 'PERCENT',
            value: Number(value.slice(0, -1)),
        };
    }
    else if (value.match(numbers) || value.endsWith('px')) {
        letterSpacing = {
            unit: 'PIXELS',
            value: convertTypographyNumberToFigma(value),
        };
    }
    return letterSpacing;
}
function convertFigmaToLetterSpacing(inputValue) {
    const { unit, value } = inputValue;
    if (unit === 'PERCENT') {
        return `${+value.toFixed(2)}%`;
    }
    return +value.toFixed(2);
}
function convertLineHeightToFigma(inputValue) {
    let lineHeight;
    const value = inputValue.toString();
    const numbers = /^\d+(\.\d+)?$/;
    if (value.match(numbers) || value.endsWith('px')) {
        lineHeight = {
            unit: 'PIXELS',
            value: convertTypographyNumberToFigma(value),
        };
    }
    else if (value.trim().slice(-1) === '%' &&
        value.trim().slice(0, -1).match(numbers)) {
        lineHeight = {
            unit: 'PERCENT',
            value: Number(value.slice(0, -1)),
        };
    }
    else {
        lineHeight = {
            unit: 'AUTO',
        };
    }
    return lineHeight;
}
function convertFigmaToLineHeight(inputValue) {
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
function convertOpacityToFigma(value) {
    const matchedPercent = value.toString().match(/(\d+%)/);
    // Matches 50%, 100%, etc.
    if (matchedPercent && matchedPercent.length) {
        return Number(matchedPercent[0].slice(0, -1)) / 100;
    }
    return Number(value);
}
const transformSize = (value) => fakeZeroForFigma(convertTypographyNumberToFigma(value));
const transformSpace = (value) => convertTypographyNumberToFigma(value);
function transformValue(value, type) {
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


/***/ }),

/***/ "./src/setTokenToNode.ts":
/*!*******************************!*\
  !*** ./src/setTokenToNode.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setFont": function() { return /* binding */ setFont; },
/* harmony export */   "setColorValuesOnTarget": function() { return /* binding */ setColorValuesOnTarget; },
/* harmony export */   "setFillToNode": function() { return /* binding */ setFillToNode; },
/* harmony export */   "setBorderColor": function() { return /* binding */ setBorderColor; },
/* harmony export */   "setBorderRadius": function() { return /* binding */ setBorderRadius; },
/* harmony export */   "setPadding": function() { return /* binding */ setPadding; },
/* harmony export */   "setBorderWidth": function() { return /* binding */ setBorderWidth; },
/* harmony export */   "setOpacity": function() { return /* binding */ setOpacity; },
/* harmony export */   "setSize": function() { return /* binding */ setSize; },
/* harmony export */   "setBoxShadow": function() { return /* binding */ setBoxShadow; },
/* harmony export */   "setTokenToNode": function() { return /* binding */ setTokenToNode; }
/* harmony export */ });
/* harmony import */ var _helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/transformValue */ "./src/helpers/transformValue.ts");
/* harmony import */ var _helpers_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/colors */ "./src/helpers/colors.ts");
/* harmony import */ var _helpers_gradients__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/gradients */ "./src/helpers/gradients.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function setFont(target, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { value, description } = token;
            const { fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, paragraphSpacing, } = value;
            // @ts-expect-error
            const family = fontFamily || target.fontName.family;
            // @ts-expect-error
            const style = fontWeight || target.fontName.style;
            yield figma.loadFontAsync({ family, style });
            if (fontFamily && fontWeight) {
                target.fontName = {
                    family,
                    style,
                };
            }
            if (fontSize) {
                target.fontSize = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(fontSize, 'fontSize');
            }
            if (lineHeight) {
                target.lineHeight = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(lineHeight, 'lineHeight');
            }
            if (letterSpacing) {
                target.letterSpacing = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(letterSpacing, 'letterSpacing');
            }
            if (paragraphSpacing) {
                target.paragraphSpacing = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(paragraphSpacing, 'paragraphSpacing');
            }
            if (description) {
                // @ts-expect-error
                target.description = description;
            }
        }
        catch (e) {
            console.log('Error setting font on target', target, token, e);
        }
    });
}
function setColorValuesOnTarget(target, value, description, key = 'paints') {
    try {
        if (value.startsWith('linear-gradient')) {
            const { gradientStops, gradientTransform, } = (0,_helpers_gradients__WEBPACK_IMPORTED_MODULE_2__.convertStringToFigmaGradient)(value);
            const newPaint = {
                type: 'GRADIENT_LINEAR',
                gradientTransform,
                gradientStops,
            };
            // @ts-expect-error
            target[key] = [newPaint];
        }
        else {
            const { color, opacity } = (0,_helpers_colors__WEBPACK_IMPORTED_MODULE_1__.convertToFigmaColor)(value);
            // @ts-expect-error
            target[key] = [{ color, opacity, type: 'SOLID' }];
        }
        if (description) {
            // @ts-expect-error
            target.description = description;
        }
    }
    catch (e) {
        console.error('Error setting color', e);
    }
}
const setFillToNode = (node, token) => {
    // FILL
    if (token.value.fill && typeof token.value.fill === 'string') {
        if (typeof node.fills !== 'undefined') {
            setColorValuesOnTarget(node, token.value.fill, token.description, 'fills');
        }
    }
};
const setBorderColor = (node, token) => {
    const { value } = token;
    if (typeof value.borderColor !== 'undefined') {
        if (typeof node.strokes !== 'undefined') {
            const { color, opacity } = (0,_helpers_colors__WEBPACK_IMPORTED_MODULE_1__.convertToFigmaColor)(value.borderColor);
            node.strokes = [{ type: 'SOLID', color, opacity }];
        }
    }
};
const setBorderRadius = (node, token) => {
    const { value } = token;
    // BORDER RADIUS
    // if (
    //     typeof value.borderRadius !== 'undefined' &&
    //     typeof node.cornerRadius !== 'undefined'
    // ) {
    //     node.cornerRadius = convertTypographyNumberToFigma(value.borderRadius);
    // }
    if (typeof value.borderRadiusTopLeft !== 'undefined' &&
        typeof node.topLeftRadius !== 'undefined') {
        node.topLeftRadius = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.convertTypographyNumberToFigma)(value.borderRadiusTopLeft);
    }
    if (typeof value.borderRadiusTopRight !== 'undefined' &&
        typeof node.topRightRadius !== 'undefined') {
        node.topRightRadius = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.convertTypographyNumberToFigma)(value.borderRadiusTopRight);
    }
    if (typeof value.borderRadiusBottomRight !== 'undefined' &&
        typeof node.bottomRightRadius !== 'undefined') {
        node.bottomRightRadius = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.convertTypographyNumberToFigma)(value.borderRadiusBottomRight);
    }
    if (typeof value.borderRadiusBottomLeft !== 'undefined' &&
        typeof node.bottomLeftRadius !== 'undefined') {
        node.bottomLeftRadius = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.convertTypographyNumberToFigma)(value.borderRadiusBottomLeft);
    }
};
const setPadding = (node, token) => {
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
    if (typeof value.itemSpacing !== 'undefined' &&
        typeof node.itemSpacing !== 'undefined') {
        node.itemSpacing = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.itemSpacing);
    }
    if (typeof value.paddingTop !== 'undefined' &&
        typeof node.paddingTop !== 'undefined') {
        node.paddingTop = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.paddingTop);
    }
    if (typeof value.paddingRight !== 'undefined' &&
        typeof node.paddingRight !== 'undefined') {
        node.paddingRight = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.paddingRight);
    }
    if (typeof value.paddingBottom !== 'undefined' &&
        typeof node.paddingBottom !== 'undefined') {
        node.paddingBottom = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.paddingBottom);
    }
    if (typeof value.paddingLeft !== 'undefined' &&
        typeof node.paddingLeft !== 'undefined') {
        node.paddingLeft = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.paddingLeft);
    }
};
const setBorderWidth = (node, token) => {
    // BORDER WIDTH
    if (typeof token.value.borderWidth !== 'undefined' &&
        typeof node.strokeWeight !== 'undefined') {
        node.strokeWeight = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.borderWidth);
    }
};
const setOpacity = (node, token) => {
    if (typeof token.value.opacity !== 'undefined' &&
        typeof node.opacity !== 'undefined') {
        node.opacity = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.default)(token.value.opacity);
    }
};
const setSize = (node, token) => {
    // SIZING: BOTH
    if (typeof token.value.sizing !== 'undefined' &&
        typeof node.resize !== 'undefined') {
        node.resize((0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.sizing), (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.sizing));
    }
    // SIZING: WIDTH
    if (typeof token.value.width !== 'undefined' &&
        typeof node.resize !== 'undefined') {
        node.resize((0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.width), node.height);
    }
    // SIZING: HEIGHT
    if (typeof token.value.height !== 'undefined' &&
        typeof node.resize !== 'undefined') {
        node.resize(node.width, (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.height));
    }
};
const setBoxShadow = (node, token) => {
    const { value } = token;
    if (typeof value.boxShadow !== 'undefined' &&
        typeof node.effects !== 'undefined') {
        // get all effects, but remove DROP_SHADOW, since we're about to add it
        const effects = node.effects.filter((effect) => effect.type !== 'DROP_SHADOW');
        const { x, y, spread, color, blur } = value.boxShadow;
        const { color: { r, g, b }, opacity, } = (0,_helpers_colors__WEBPACK_IMPORTED_MODULE_1__.convertToFigmaColor)(color);
        const effect = {
            type: 'DROP_SHADOW',
            visible: true,
            blendMode: 'NORMAL',
            color: { r, g, b, a: opacity },
            offset: {
                x: (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(x, 'boxShadow'),
                y: (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(y, 'boxShadow'),
            },
            radius: (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(blur, 'boxShadow'),
            spread: (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(spread, 'boxShadow'),
        };
        effects.push(effect);
        node.effects = effects;
    }
};
function setTokenToNode(node, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            setFillToNode(node, token);
            setBorderRadius(node, token);
            setBoxShadow(node, token);
            setOpacity(node, token);
            setSize(node, token);
            if (node.type === 'TEXT') {
                setFont(node, token);
            }
            setBorderWidth(node, token);
            setBorderColor(node, token);
            setPadding(node, token);
        }
        catch (e) {
            console.log('Error setting data on node', e);
        }
    });
}


/***/ }),

/***/ "../src/FigmaMessageType.ts":
/*!**********************************!*\
  !*** ../src/FigmaMessageType.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FigmaMessageType": function() { return /* binding */ FigmaMessageType; }
/* harmony export */ });
var FigmaMessageType;
(function (FigmaMessageType) {
    FigmaMessageType[FigmaMessageType["IMPORT"] = 0] = "IMPORT";
    FigmaMessageType[FigmaMessageType["RENDER"] = 1] = "RENDER";
    FigmaMessageType[FigmaMessageType["IMPORT_VARIANTS"] = 2] = "IMPORT_VARIANTS";
    FigmaMessageType[FigmaMessageType["APPLY_TOKEN"] = 3] = "APPLY_TOKEN";
    FigmaMessageType[FigmaMessageType["APPLY_TOKENS"] = 4] = "APPLY_TOKENS";
    FigmaMessageType[FigmaMessageType["SELECT_NODE"] = 5] = "SELECT_NODE";
    FigmaMessageType[FigmaMessageType["CLEAR_SELECTION"] = 6] = "CLEAR_SELECTION";
    FigmaMessageType[FigmaMessageType["RENDER_TOKENS_SYNC"] = 7] = "RENDER_TOKENS_SYNC";
})(FigmaMessageType || (FigmaMessageType = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/figma.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var html_figma_figma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-figma/figma */ "../../html-to-figma/build/figma/index.js");
/* harmony import */ var _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/FigmaMessageType */ "../src/FigmaMessageType.ts");
/* harmony import */ var _setTokenToNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setTokenToNode */ "./src/setTokenToNode.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



//@ts-ignore
figma.showUI(__html__, {
    width: 750,
    height: 600,
});
const postMessage = (data) => {
    figma.ui.postMessage(data);
};
const getPluginData = (node) => {
    const tokens = node.getPluginData('tokens');
    const componentData = node.getPluginData('componentData');
    return {
        tokens: tokens ? JSON.parse(tokens) : null,
        componentData: componentData ? JSON.parse(componentData) : null,
    };
};
const setPluginData = (node, payload) => {
    const { tokens, componentData } = payload;
    tokens && node.setPluginData('tokens', JSON.stringify(tokens));
    componentData &&
        node.setPluginData('componentData', JSON.stringify(componentData));
};
const setTokens = (nodeId, tokens) => {
    const node = figma.currentPage.findOne((node) => node.id === nodeId);
    if (!node) {
        console.error(`Can't find NodeId: ${nodeId}`);
        return;
    }
    for (const token of tokens) {
        (0,_setTokenToNode__WEBPACK_IMPORTED_MODULE_2__.setTokenToNode)(node, token);
    }
    setPluginData(node, { tokens });
};
const updateTokensOnNode = (node, nodeTokens, allTokens) => {
    const newTokens = nodeTokens.map((token) => {
        const newValue = allTokens[token.name];
        if (typeof newValue !== 'undefined') {
            const keys = Object.keys(token.value);
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
        postMessage({ type: _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.CLEAR_SELECTION });
        return;
    }
    else {
        postMessage({
            type: _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.SELECT_NODE,
            data: {
                nodes: nodes.map((n) => (Object.assign({ nodeId: n.id }, getPluginData(n)))),
            },
        });
    }
});
const getVarinatNameFromProps = (props) => {
    return Object.keys(props)
        .filter((key) => key !== 'children')
        .map((key) => `${key}=${props[key]}`)
        .join(', ');
};
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.IMPORT_VARIANTS) {
        yield figma.loadFontAsync(html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.defaultFont);
        const { data: { layers, componentsData }, } = msg;
        let baseFrame = figma.currentPage;
        const { x, y } = figma.viewport.center;
        layers[0].x = x;
        layers[0].y = y;
        let offsetTop = 0;
        for (const layer of layers) {
            layer.x = x;
            layer.y = y + offsetTop;
            offsetTop += ((layer === null || layer === void 0 ? void 0 : layer.height) || 100) + 10;
        }
        let nodes = [];
        const componentLayers = layers.map((layer) => (Object.assign(Object.assign({}, layer), { type: 'COMPONENT' })));
        // @ts-expect-error
        yield (0,html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.addLayersToFrame)(componentLayers, baseFrame, ({ node, parent }) => {
            if (!parent) {
                nodes.push(node);
            }
        });
        const componentNode = figma.combineAsVariants(nodes, baseFrame);
        componentNode.name = componentsData[0].name;
        for (let i = 0; i < nodes.length; i++) {
            // @ts-expect-error
            nodes[i].name = getVarinatNameFromProps(componentsData[i].props);
        }
    }
    if (msg.type === _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.IMPORT) {
        yield figma.loadFontAsync(html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.defaultFont);
        const { data } = msg;
        let { layers, position, name, props } = data;
        let baseFrame = figma.currentPage;
        const { x, y } = (0,html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.getDropOffset)(position);
        // let currentNode = figma.currentPage.findOne(n => n.name === name);
        // if (currentNode) {
        //     x = currentNode.x;
        //     y = currentNode.y;
        // }
        layers.x = x;
        layers.y = y;
        yield (0,html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.addLayersToFrame)([layers], baseFrame, ({ node, parent }) => {
            if (!parent) {
                setPluginData(node, { componentData: { name, props } });
            }
        });
    }
    if (msg.type === _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.APPLY_TOKEN) {
        const { data } = msg;
        for (let node of data.nodes) {
            setTokens(node.nodeId, node.tokens || []);
        }
    }
    if (msg.type === _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.APPLY_TOKENS) {
        const { data } = msg;
        const allNodes = figma.currentPage.findAll((_) => true);
        const nodesWithTokens = allNodes
            .map((node) => ({ tokens: getPluginData(node).tokens, node }))
            .filter(({ tokens }) => tokens);
        for (let { tokens, node } of nodesWithTokens) {
            updateTokensOnNode(node, tokens, data.tokens);
        }
    }
});

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHFCQUFxQiwwRUFBdUI7QUFDNUMsa0NBQWtDLHlEQUFXO0FBQzdDLGdCQUFnQixPQUFPO0FBQ3ZCLGNBQWMsZ0NBQWdDO0FBQzlDO0FBQ0EsZ0JBQWdCLE9BQU8sRUFBRSwrREFBYTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsa0VBQWdCLHlCQUF5QixjQUFjO0FBQ3JFO0FBQ0Esc0NBQXNDLGlCQUFpQixlQUFlO0FBQ3RFO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCLCtFQUE0QjtBQUNqRCxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnRkFBNkI7QUFDbEQsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLDhCQUE4QiwwQ0FBMEM7QUFDeEUsdUJBQXVCLFFBQVE7QUFDL0IsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uLi8uLi9odG1sLXRvLWZpZ21hL2J1aWxkL2ZpZ21hL2Ryb3BPZmZzZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4uLy4uL2h0bWwtdG8tZmlnbWEvYnVpbGQvZmlnbWEvZ2V0Rm9udC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi4vLi4vaHRtbC10by1maWdtYS9idWlsZC9maWdtYS9oZWxwZXJzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uLi8uLi9odG1sLXRvLWZpZ21hL2J1aWxkL2ZpZ21hL2ltYWdlcy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi4vLi4vaHRtbC10by1maWdtYS9idWlsZC9maWdtYS9pbmRleC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi4vLi4vaHRtbC10by1maWdtYS9idWlsZC9maWdtYS9wcm9jZXNzTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4uLy4uL2h0bWwtdG8tZmlnbWEvYnVpbGQvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4vc3JjL2hlbHBlcnMvY29sb3JzLnRzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uL3NyYy9oZWxwZXJzL2dyYWRpZW50cy50cyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi9zcmMvaGVscGVycy90cmFuc2Zvcm1WYWx1ZS50cyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi9zcmMvc2V0VG9rZW5Ub05vZGUudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4uL3NyYy9GaWdtYU1lc3NhZ2VUeXBlLnRzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uL3NyYy9maWdtYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0RHJvcE9mZnNldChwYXlsb2FkKSB7XG4gICAgY29uc3QgeyBkcm9wUG9zaXRpb24sIHdpbmRvd1NpemUsIG9mZnNldCB9ID0gcGF5bG9hZDtcbiAgICBjb25zdCB7IGJvdW5kcywgem9vbSB9ID0gZmlnbWEudmlld3BvcnQ7XG4gICAgY29uc3QgaGFzVUkgPSBNYXRoLmFicygoYm91bmRzLndpZHRoICogem9vbSkgLyB3aW5kb3dTaXplLndpZHRoKSA8IDAuOTk7XG4gICAgY29uc3QgbGVmdFBhbmVXaWR0aCA9IHdpbmRvd1NpemUud2lkdGggLSBib3VuZHMud2lkdGggKiB6b29tIC0gMjQwO1xuICAgIGNvbnN0IHhGcm9tQ2FudmFzID0gaGFzVUlcbiAgICAgICAgPyBkcm9wUG9zaXRpb24uY2xpZW50WCAtIGxlZnRQYW5lV2lkdGhcbiAgICAgICAgOiBkcm9wUG9zaXRpb24uY2xpZW50WDtcbiAgICBjb25zdCB5RnJvbUNhbnZhcyA9IGhhc1VJID8gZHJvcFBvc2l0aW9uLmNsaWVudFkgLSA0MCA6IGRyb3BQb3NpdGlvbi5jbGllbnRZO1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IGJvdW5kcy54ICsgeEZyb21DYW52YXMgLyB6b29tIC0gb2Zmc2V0LngsXG4gICAgICAgIHk6IGJvdW5kcy55ICsgeUZyb21DYW52YXMgLyB6b29tIC0gb2Zmc2V0LnlcbiAgICB9O1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jb25zdCBmb250Q2FjaGUgPSB7fTtcbmNvbnN0IG5vcm1hbGl6ZU5hbWUgPSAoc3RyKSA9PiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtel0vZ2ksICcnKTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0Rm9udCA9IHsgZmFtaWx5OiAnUm9ib3RvJywgc3R5bGU6ICdSZWd1bGFyJyB9O1xubGV0IGNhY2hlZEF2YWlsYWJsZUZvbnRzID0gbnVsbDtcbmNvbnN0IGdldEF2YWlsYWJsZUZvbnROYW1lcyA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGlmIChjYWNoZWRBdmFpbGFibGVGb250cykge1xuICAgICAgICByZXR1cm4gY2FjaGVkQXZhaWxhYmxlRm9udHM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKHlpZWxkIGZpZ21hLmxpc3RBdmFpbGFibGVGb250c0FzeW5jKCkpLmZpbHRlcigoZm9udCkgPT4gZm9udC5mb250TmFtZS5zdHlsZSA9PT0gJ1JlZ3VsYXInKTtcbiAgICB9XG59KTtcbi8vIFRPRE86IGtlZXAgbGlzdCBvZiBmb250cyBub3QgZm91bmRcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRjaGluZ0ZvbnQoZm9udFN0cikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGZvbnRDYWNoZVtmb250U3RyXTtcbiAgICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhdmFpbGFibGVGb250cyA9IHlpZWxkIGdldEF2YWlsYWJsZUZvbnROYW1lcygpO1xuICAgICAgICBjb25zdCBmYW1pbHlTcGxpdCA9IGZvbnRTdHIuc3BsaXQoL1xccyosXFxzKi8pO1xuICAgICAgICBmb3IgKGNvbnN0IGZhbWlseSBvZiBmYW1pbHlTcGxpdCkge1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZU5hbWUoZmFtaWx5KTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXZhaWxhYmxlRm9udCBvZiBhdmFpbGFibGVGb250cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBdmFpbGFibGUgPSBub3JtYWxpemVOYW1lKGF2YWlsYWJsZUZvbnQuZm9udE5hbWUuZmFtaWx5KTtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZEF2YWlsYWJsZSA9PT0gbm9ybWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZWQgPSBmb250Q2FjaGVbbm9ybWFsaXplZEF2YWlsYWJsZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgeWllbGQgZmlnbWEubG9hZEZvbnRBc3luYyhhdmFpbGFibGVGb250LmZvbnROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgZm9udENhY2hlW2ZvbnRTdHJdID0gYXZhaWxhYmxlRm9udC5mb250TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZm9udENhY2hlW25vcm1hbGl6ZWRBdmFpbGFibGVdID0gYXZhaWxhYmxlRm9udC5mb250TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF2YWlsYWJsZUZvbnQuZm9udE5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZhdWx0Rm9udDtcbiAgICB9KTtcbn1cbiIsImNvbnN0IGFsbFByb3BlcnR5TmFtZXMgPSBbXG4gICAgJ2lkJyxcbiAgICAnd2lkdGgnLFxuICAgICdoZWlnaHQnLFxuICAgICdjdXJyZW50UGFnZScsXG4gICAgJ2NhbmNlbCcsXG4gICAgJ29yaWdpbicsXG4gICAgJ29ubWVzc2FnZScsXG4gICAgJ2NlbnRlcicsXG4gICAgJ3pvb20nLFxuICAgICdmb250TmFtZScsXG4gICAgJ25hbWUnLFxuICAgICd2aXNpYmxlJyxcbiAgICAnbG9ja2VkJyxcbiAgICAnY29uc3RyYWludHMnLFxuICAgICdyZWxhdGl2ZVRyYW5zZm9ybScsXG4gICAgJ3gnLFxuICAgICd5JyxcbiAgICAncm90YXRpb24nLFxuICAgICdjb25zdHJhaW5Qcm9wb3J0aW9ucycsXG4gICAgJ2xheW91dEFsaWduJyxcbiAgICAnbGF5b3V0R3JvdycsXG4gICAgJ29wYWNpdHknLFxuICAgICdibGVuZE1vZGUnLFxuICAgICdpc01hc2snLFxuICAgICdlZmZlY3RzJyxcbiAgICAnZWZmZWN0U3R5bGVJZCcsXG4gICAgJ2V4cGFuZGVkJyxcbiAgICAnYmFja2dyb3VuZHMnLFxuICAgICdiYWNrZ3JvdW5kU3R5bGVJZCcsXG4gICAgJ2ZpbGxzJyxcbiAgICAnc3Ryb2tlcycsXG4gICAgJ3N0cm9rZVdlaWdodCcsXG4gICAgJ3N0cm9rZU1pdGVyTGltaXQnLFxuICAgICdzdHJva2VBbGlnbicsXG4gICAgJ3N0cm9rZUNhcCcsXG4gICAgJ3N0cm9rZUpvaW4nLFxuICAgICdkYXNoUGF0dGVybicsXG4gICAgJ2ZpbGxTdHlsZUlkJyxcbiAgICAnc3Ryb2tlU3R5bGVJZCcsXG4gICAgJ2Nvcm5lclJhZGl1cycsXG4gICAgJ2Nvcm5lclNtb290aGluZycsXG4gICAgJ3RvcExlZnRSYWRpdXMnLFxuICAgICd0b3BSaWdodFJhZGl1cycsXG4gICAgJ2JvdHRvbUxlZnRSYWRpdXMnLFxuICAgICdib3R0b21SaWdodFJhZGl1cycsXG4gICAgJ2V4cG9ydFNldHRpbmdzJyxcbiAgICAnb3ZlcmZsb3dEaXJlY3Rpb24nLFxuICAgICdudW1iZXJPZkZpeGVkQ2hpbGRyZW4nLFxuICAgICdkZXNjcmlwdGlvbicsXG4gICAgJ2xheW91dE1vZGUnLFxuICAgICdwcmltYXJ5QXhpc1NpemluZ01vZGUnLFxuICAgICdjb3VudGVyQXhpc1NpemluZ01vZGUnLFxuICAgICdwcmltYXJ5QXhpc0FsaWduSXRlbXMnLFxuICAgICdjb3VudGVyQXhpc0FsaWduSXRlbXMnLFxuICAgICdwYWRkaW5nTGVmdCcsXG4gICAgJ3BhZGRpbmdSaWdodCcsXG4gICAgJ3BhZGRpbmdUb3AnLFxuICAgICdwYWRkaW5nQm90dG9tJyxcbiAgICAnaXRlbVNwYWNpbmcnLFxuICAgICdsYXlvdXRHcmlkcycsXG4gICAgJ2dyaWRTdHlsZUlkJyxcbiAgICAnY2xpcHNDb250ZW50JyxcbiAgICAnZ3VpZGVzJyxcbiAgICAnZ3VpZGVzJyxcbiAgICAnc2VsZWN0aW9uJyxcbiAgICAnc2VsZWN0ZWRUZXh0UmFuZ2UnLFxuICAgICdiYWNrZ3JvdW5kcycsXG4gICAgJ2FyY0RhdGEnLFxuICAgICdwb2ludENvdW50JyxcbiAgICAncG9pbnRDb3VudCcsXG4gICAgJ2lubmVyUmFkaXVzJyxcbiAgICAndmVjdG9yTmV0d29yaycsXG4gICAgJ3ZlY3RvclBhdGhzJyxcbiAgICAnaGFuZGxlTWlycm9yaW5nJyxcbiAgICAndGV4dEFsaWduSG9yaXpvbnRhbCcsXG4gICAgJ3RleHRBbGlnblZlcnRpY2FsJyxcbiAgICAndGV4dEF1dG9SZXNpemUnLFxuICAgICdwYXJhZ3JhcGhJbmRlbnQnLFxuICAgICdwYXJhZ3JhcGhTcGFjaW5nJyxcbiAgICAnYXV0b1JlbmFtZScsXG4gICAgJ3RleHRTdHlsZUlkJyxcbiAgICAnZm9udFNpemUnLFxuICAgICdmb250TmFtZScsXG4gICAgJ3RleHRDYXNlJyxcbiAgICAndGV4dERlY29yYXRpb24nLFxuICAgICdsZXR0ZXJTcGFjaW5nJyxcbiAgICAnbGluZUhlaWdodCcsXG4gICAgJ2NoYXJhY3RlcnMnLFxuICAgICdtYWluQ29tcG9uZW50JyxcbiAgICAnc2NhbGVGYWN0b3InLFxuICAgICdib29sZWFuT3BlcmF0aW9uJyxcbiAgICAnZXhwYW5kZWQnLFxuICAgICduYW1lJyxcbiAgICAndHlwZScsXG4gICAgJ3BhaW50cycsXG4gICAgJ3R5cGUnLFxuICAgICdmb250U2l6ZScsXG4gICAgJ3RleHREZWNvcmF0aW9uJyxcbiAgICAnZm9udE5hbWUnLFxuICAgICdsZXR0ZXJTcGFjaW5nJyxcbiAgICAnbGluZUhlaWdodCcsXG4gICAgJ3BhcmFncmFwaEluZGVudCcsXG4gICAgJ3BhcmFncmFwaFNwYWNpbmcnLFxuICAgICd0ZXh0Q2FzZScsXG4gICAgJ3R5cGUnLFxuICAgICdlZmZlY3RzJyxcbiAgICAndHlwZScsXG4gICAgJ2xheW91dEdyaWRzJyxcbl07XG5leHBvcnQgZnVuY3Rpb24gYXNzaWduKGEsIGIpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBiKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYltrZXldO1xuICAgICAgICBpZiAoa2V5ID09PSAnZGF0YScgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGEgPSBKU09OLnBhcnNlKGEuZ2V0U2hhcmVkUGx1Z2luRGF0YSgnYnVpbGRlcicsICdkYXRhJykgfHwgJ3t9JykgfHxcbiAgICAgICAgICAgICAgICB7fTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0RhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBjdXJyZW50RGF0YSwgbmV3RGF0YSk7XG4gICAgICAgICAgICAvLyBUT0RPIG1lcmdlIHBsdWdpbiBkYXRhXG4gICAgICAgICAgICBhLnNldFNoYXJlZFBsdWdpbkRhdGEoJ2J1aWxkZXInLCAnZGF0YScsIEpTT04uc3RyaW5naWZ5KG1lcmdlZERhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIFsnd2lkdGgnLCAnaGVpZ2h0JywgJ3R5cGUnLCAncmVmJywgJ2NoaWxkcmVuJywgJ3N2ZyddLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQXNzaWduIGVycm9yIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiYCwgYSwgYiwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIFRoZSBGaWdtYSBub2RlcyBhcmUgaGFyZCB0byBpbnNwZWN0IGF0IGEgZ2xhbmNlIGJlY2F1c2UgYWxtb3N0IGFsbCBwcm9wZXJ0aWVzIGFyZSBub24gZW51bWVyYWJsZVxuLy8gZ2V0dGVycy4gVGhpcyByZW1vdmVzIHRoYXQgd3JhcHBpbmcgZm9yIGVhc2llciBpbnNwZWN0aW5nXG5leHBvcnQgY29uc3QgY2xvbmVPYmplY3QgPSAob2JqLCB2YWx1ZXNTZXQgPSBuZXcgU2V0KCkpID0+IHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBjb25zdCBuZXdPYmogPSBBcnJheS5pc0FycmF5KG9iaikgPyBbXSA6IHt9O1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgYWxsUHJvcGVydHlOYW1lcykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtwcm9wZXJ0eV07XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICAgIG5ld09ialtwcm9wZXJ0eV0gPSBvYmpbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdPYmo7XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBnZXRJbWFnZUZpbGxzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0ltYWdlcyhsYXllcikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGltYWdlcyA9IGdldEltYWdlRmlsbHMobGF5ZXIpO1xuICAgICAgICByZXR1cm4gKGltYWdlcyAmJlxuICAgICAgICAgICAgUHJvbWlzZS5hbGwoaW1hZ2VzLm1hcCgoaW1hZ2UpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2UgJiYgaW1hZ2UuaW50QXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLmltYWdlSGFzaCA9IHlpZWxkIGZpZ21hLmNyZWF0ZUltYWdlKGltYWdlLmludEFycilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNoO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaW1hZ2UuaW50QXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKSkpO1xuICAgIH0pO1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyB0cmF2ZXJzZUFzeW5jIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcHJvY2Vzc0xheWVyIH0gZnJvbSAnLi9wcm9jZXNzTGF5ZXInO1xuZXhwb3J0IGZ1bmN0aW9uIGFkZExheWVyc1RvRnJhbWUobGF5ZXJzLCBiYXNlRnJhbWUsIG9uTGF5ZXJQcm9jZXNzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgZm9yIChjb25zdCByb290TGF5ZXIgb2YgbGF5ZXJzKSB7XG4gICAgICAgICAgICB5aWVsZCB0cmF2ZXJzZUFzeW5jKHJvb3RMYXllciwgKGxheWVyLCBwYXJlbnQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlID0geWllbGQgcHJvY2Vzc0xheWVyKGxheWVyLCBwYXJlbnQsIGJhc2VGcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIG9uTGF5ZXJQcm9jZXNzID09PSBudWxsIHx8IG9uTGF5ZXJQcm9jZXNzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvbkxheWVyUHJvY2Vzcyh7IG5vZGUsIGxheWVyLCBwYXJlbnQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdFcnJvciBvbiBsYXllcjonLCBsYXllciwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCAqIGZyb20gJy4vZ2V0Rm9udCc7XG5leHBvcnQgKiBmcm9tICcuL2Ryb3BPZmZzZXQnO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBnZXRJbWFnZUZpbGxzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBwcm9jZXNzSW1hZ2VzIH0gZnJvbSBcIi4vaW1hZ2VzXCI7XG5pbXBvcnQgeyBnZXRNYXRjaGluZ0ZvbnQgfSBmcm9tIFwiLi9nZXRGb250XCI7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5jb25zdCBwcm9jZXNzRGVmYXVsdEVsZW1lbnQgPSAobGF5ZXIsIG5vZGUpID0+IHtcbiAgICBub2RlLnggPSBsYXllci54O1xuICAgIG5vZGUueSA9IGxheWVyLnk7XG4gICAgbm9kZS5yZXNpemUobGF5ZXIud2lkdGggfHwgMSwgbGF5ZXIuaGVpZ2h0IHx8IDEpO1xuICAgIGFzc2lnbihub2RlLCBsYXllcik7XG4gICAgLy8gcmVjdHMucHVzaChmcmFtZSk7XG4gICAgcmV0dXJuIG5vZGU7XG59O1xuY29uc3QgY3JlYXRlTm9kZUZyb21MYXllciA9IChsYXllcikgPT4ge1xuICAgIGlmIChsYXllci50eXBlID09PSAnRlJBTUUnIHx8IGxheWVyLnR5cGUgPT09ICdHUk9VUCcpIHtcbiAgICAgICAgcmV0dXJuIGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgfVxuICAgIGlmIChsYXllci50eXBlID09PSAnU1ZHJyAmJiBsYXllci5zdmcpIHtcbiAgICAgICAgcmV0dXJuIGZpZ21hLmNyZWF0ZU5vZGVGcm9tU3ZnKGxheWVyLnN2Zyk7XG4gICAgfVxuICAgIGlmIChsYXllci50eXBlID09PSAnUkVDVEFOR0xFJykge1xuICAgICAgICByZXR1cm4gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4gICAgfVxuICAgIGlmIChsYXllci50eXBlID09PSAnVEVYVCcpIHtcbiAgICAgICAgcmV0dXJuIGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICB9XG4gICAgaWYgKGxheWVyLnR5cGUgPT09ICdDT01QT05FTlQnKSB7XG4gICAgICAgIHJldHVybiBmaWdtYS5jcmVhdGVDb21wb25lbnQoKTtcbiAgICB9XG59O1xuY29uc3QgU0lNUExFX1RZUEVTID0gWydGUkFNRScsICdHUk9VUCcsICdTVkcnLCAnUkVDVEFOR0xFJywgJ0NPTVBPTkVOVCddO1xuZXhwb3J0IGNvbnN0IHByb2Nlc3NMYXllciA9IChsYXllciwgcGFyZW50LCBiYXNlRnJhbWUpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHBhcmVudEZyYW1lID0gKHBhcmVudCA9PT0gbnVsbCB8fCBwYXJlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudC5yZWYpIHx8IGJhc2VGcmFtZTtcbiAgICBpZiAodHlwZW9mIGxheWVyLnggIT09ICdudW1iZXInIHx8IHR5cGVvZiBsYXllci55ICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBFcnJvcignTGF5ZXIgY29vcmRzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVOb2RlRnJvbUxheWVyKGxheWVyKTtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYCR7bGF5ZXIudHlwZX0gbm90IGltcGxlbWVudGVkYCk7XG4gICAgfVxuICAgIGlmIChTSU1QTEVfVFlQRVMuaW5jbHVkZXMobGF5ZXIudHlwZSkpIHtcbiAgICAgICAgcGFyZW50RnJhbWUuYXBwZW5kQ2hpbGQocHJvY2Vzc0RlZmF1bHRFbGVtZW50KGxheWVyLCBub2RlKSk7XG4gICAgfVxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICBsYXllci5yZWYgPSBub2RlO1xuICAgIGlmIChsYXllci50eXBlID09PSAnUkVDVEFOR0xFJykge1xuICAgICAgICBpZiAoZ2V0SW1hZ2VGaWxscyhsYXllcikpIHtcbiAgICAgICAgICAgIHlpZWxkIHByb2Nlc3NJbWFnZXMobGF5ZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChsYXllci50eXBlID09PSAnVEVYVCcpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IG5vZGU7XG4gICAgICAgIGlmIChsYXllci5mb250RmFtaWx5KSB7XG4gICAgICAgICAgICB0ZXh0LmZvbnROYW1lID0geWllbGQgZ2V0TWF0Y2hpbmdGb250KGxheWVyLmZvbnRGYW1pbHkpO1xuICAgICAgICAgICAgZGVsZXRlIGxheWVyLmZvbnRGYW1pbHk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzaWduKHRleHQsIGxheWVyKTtcbiAgICAgICAgdGV4dC5yZXNpemUobGF5ZXIud2lkdGggfHwgMSwgbGF5ZXIuaGVpZ2h0IHx8IDEpO1xuICAgICAgICB0ZXh0LnRleHRBdXRvUmVzaXplID0gJ0hFSUdIVCc7XG4gICAgICAgIGxldCBhZGp1c3RtZW50cyA9IDA7XG4gICAgICAgIGlmIChsYXllci5saW5lSGVpZ2h0KSB7XG4gICAgICAgICAgICB0ZXh0LmxpbmVIZWlnaHQgPSBsYXllci5saW5lSGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkanVzdCB0ZXh0IHdpZHRoXG4gICAgICAgIHdoaWxlICh0eXBlb2YgbGF5ZXIuaGVpZ2h0ID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdGV4dC5oZWlnaHQgPiBsYXllci5oZWlnaHQpIHtcbiAgICAgICAgICAgIGlmIChhZGp1c3RtZW50cysrID4gNSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVG9vIG1hbnkgZm9udCBhZGp1c3RtZW50cycsIHRleHQsIGxheWVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGV4dC5yZXNpemUodGV4dC53aWR0aCArIDEsIHRleHQuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIG9uIHJlc2l6ZSB0ZXh0OicsIGxheWVyLCB0ZXh0LCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhcmVudEZyYW1lLmFwcGVuZENoaWxkKHRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn0pO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5leHBvcnQgY29uc3QgaGFzQ2hpbGRyZW4gPSAobm9kZSkgPT4gXG4vLyBAdHMtZXhwZWN0LWVycm9yXG5ub2RlICYmIEFycmF5LmlzQXJyYXkobm9kZS5jaGlsZHJlbik7XG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2UobGF5ZXIsIGNiLCBwYXJlbnQgPSBudWxsKSB7XG4gICAgaWYgKGxheWVyKSB7XG4gICAgICAgIGNiKGxheWVyLCBwYXJlbnQpO1xuICAgICAgICBpZiAoaGFzQ2hpbGRyZW4obGF5ZXIpKSB7XG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgICAgICBsYXllci5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gdHJhdmVyc2UoY2hpbGQsIGNiLCBsYXllcikpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlTWFwKGxheWVyLCBjYiwgcGFyZW50ID0gbnVsbCkge1xuICAgIHZhciBfYTtcbiAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgY29uc3QgbmV3TGF5ZXIgPSBjYihsYXllciwgcGFyZW50KTtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICBpZiAoKF9hID0gbmV3TGF5ZXIgPT09IG51bGwgfHwgbmV3TGF5ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5ld0xheWVyLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgICAgICBuZXdMYXllci5jaGlsZHJlbiA9IG5ld0xheWVyLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHRyYXZlcnNlTWFwKGNoaWxkLCBjYiwgbGF5ZXIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3TGF5ZXI7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlQXN5bmMobGF5ZXIsIGNiLCBwYXJlbnQgPSBudWxsKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICB5aWVsZCBjYihsYXllciwgcGFyZW50KTtcbiAgICAgICAgICAgIGlmIChoYXNDaGlsZHJlbihsYXllcikpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgbGF5ZXIuY2hpbGRyZW4ucmV2ZXJzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRyYXZlcnNlQXN5bmMoY2hpbGQsIGNiLCBsYXllcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2l6ZShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGg7XG59XG5leHBvcnQgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+IHN0clswXS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cmluZygxKTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZ2IoY29sb3JTdHJpbmcpIHtcbiAgICBpZiAoIWNvbG9yU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBbXzEsIHIsIGcsIGIsIF8yLCBhXSA9IChjb2xvclN0cmluZy5tYXRjaCgvcmdiYT9cXCgoW1xcZFxcLl0rKSwgKFtcXGRcXC5dKyksIChbXFxkXFwuXSspKCwgKFtcXGRcXC5dKykpP1xcKS8pIHx8IFtdKTtcbiAgICBjb25zdCBub25lID0gYSAmJiBwYXJzZUZsb2F0KGEpID09PSAwO1xuICAgIGlmIChyICYmIGcgJiYgYiAmJiAhbm9uZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogcGFyc2VJbnQocikgLyAyNTUsXG4gICAgICAgICAgICBnOiBwYXJzZUludChnKSAvIDI1NSxcbiAgICAgICAgICAgIGI6IHBhcnNlSW50KGIpIC8gMjU1LFxuICAgICAgICAgICAgYTogYSA/IHBhcnNlRmxvYXQoYSkgOiAxLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydCBjb25zdCBmYXN0Q2xvbmUgPSAoZGF0YSkgPT4gdHlwZW9mIGRhdGEgPT09ICdzeW1ib2wnID8gbnVsbCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuZXhwb3J0IGNvbnN0IHRvTnVtID0gKHYpID0+IHtcbiAgICAvLyBpZiAoIS9weCQvLnRlc3QodikgJiYgdiAhPT0gJzAnKSByZXR1cm4gdjtcbiAgICBpZiAoIS9weCQvLnRlc3QodikgJiYgdiAhPT0gJzAnKVxuICAgICAgICByZXR1cm4gMDtcbiAgICBjb25zdCBuID0gcGFyc2VGbG9hdCh2KTtcbiAgICAvLyByZXR1cm4gIWlzTmFOKG4pID8gbiA6IHY7XG4gICAgcmV0dXJuICFpc05hTihuKSA/IG4gOiAwO1xufTtcbmV4cG9ydCBjb25zdCB0b1BlcmNlbnQgPSAodikgPT4ge1xuICAgIC8vIGlmICghL3B4JC8udGVzdCh2KSAmJiB2ICE9PSAnMCcpIHJldHVybiB2O1xuICAgIGlmICghLyUkLy50ZXN0KHYpICYmIHYgIT09ICcwJylcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgY29uc3QgbiA9IHBhcnNlSW50KHYpO1xuICAgIC8vIHJldHVybiAhaXNOYU4obikgPyBuIDogdjtcbiAgICByZXR1cm4gIWlzTmFOKG4pID8gbiAvIDEwMCA6IDA7XG59O1xuZXhwb3J0IGNvbnN0IHBhcnNlVW5pdHMgPSAoc3RyLCByZWxhdGl2ZSkgPT4ge1xuICAgIGlmICghc3RyKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgdmFsdWUgPSB0b051bShzdHIpO1xuICAgIGlmIChyZWxhdGl2ZSAmJiAhdmFsdWUpIHtcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IHRvUGVyY2VudChzdHIpO1xuICAgICAgICBpZiAoIXBlcmNlbnQpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFsdWUgPSByZWxhdGl2ZSAqIHBlcmNlbnQ7XG4gICAgfVxuICAgIC8vIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC8oW1xcZFxcLl0rKXB4Lyk7XG4gICAgLy8gY29uc3QgdmFsID0gbWF0Y2ggJiYgbWF0Y2hbMV07XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1bml0OiAnUElYRUxTJyxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5jb25zdCBMRU5HVEhfUkVHID0gL15bMC05XStbYS16QS1aJV0rPyQvO1xuY29uc3QgaXNMZW5ndGggPSAodikgPT4gdiA9PT0gJzAnIHx8IExFTkdUSF9SRUcudGVzdCh2KTtcbmNvbnN0IHBhcnNlTXVsdGlwbGVDU1NWYWx1ZXMgPSAoc3RyKSA9PiB7XG4gICAgY29uc3QgcGFydHMgPSBbXTtcbiAgICBsZXQgbGFzdFNwbGl0SW5kZXggPSAwO1xuICAgIGxldCBza29ia2EgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc3RyW2ldID09PSAnLCcgJiYgIXNrb2JrYSkge1xuICAgICAgICAgICAgcGFydHMucHVzaChzdHIuc2xpY2UobGFzdFNwbGl0SW5kZXgsIGkpKTtcbiAgICAgICAgICAgIGxhc3RTcGxpdEluZGV4ID0gaSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RyW2ldID09PSAnKCcpIHtcbiAgICAgICAgICAgIHNrb2JrYSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RyW2ldID09PSAnKScpIHtcbiAgICAgICAgICAgIHNrb2JrYSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhcnRzLnB1c2goc3RyLnNsaWNlKGxhc3RTcGxpdEluZGV4KSk7XG4gICAgcmV0dXJuIHBhcnRzLm1hcChzID0+IHMudHJpbSgpKTtcbn07XG5leHBvcnQgY29uc3QgcGFyc2VCb3hTaGFkb3dWYWx1ZSA9IChzdHIpID0+IHtcbiAgICAvLyBUT0RPOiB0aGlzIGlzIGJyb2tlbiBmb3IgbXVsdGlwbGUgYm94IHNoYWRvd3NcbiAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoJ3JnYicpKSB7XG4gICAgICAgIC8vIFdlcmlkIGNvbXB1dGVkIHN0eWxlIHRoaW5nIHRoYXQgcHV0cyB0aGUgY29sb3IgaW4gdGhlIGZyb250IG5vdCBiYWNrXG4gICAgICAgIGNvbnN0IGNvbG9yTWF0Y2ggPSBzdHIubWF0Y2goLyhyZ2JhP1xcKC4rP1xcKSkoLispLyk7XG4gICAgICAgIGlmIChjb2xvck1hdGNoKSB7XG4gICAgICAgICAgICBzdHIgPSAoY29sb3JNYXRjaFsyXSArICcgJyArIGNvbG9yTWF0Y2hbMV0pLnRyaW0oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBQQVJUU19SRUcgPSAvXFxzKD8hW14oXSpcXCkpLztcbiAgICBjb25zdCBwYXJ0cyA9IHN0ci5zcGxpdChQQVJUU19SRUcpO1xuICAgIGNvbnN0IGluc2V0ID0gcGFydHMuaW5jbHVkZXMoJ2luc2V0Jyk7XG4gICAgY29uc3QgbGFzdCA9IHBhcnRzLnNsaWNlKC0xKVswXTtcbiAgICBjb25zdCBjb2xvciA9ICFpc0xlbmd0aChsYXN0KSA/IGxhc3QgOiAncmdiYSgwLCAwLCAwLCAxKSc7XG4gICAgY29uc3QgbnVtcyA9IHBhcnRzXG4gICAgICAgIC5maWx0ZXIoKG4pID0+IG4gIT09ICdpbnNldCcpXG4gICAgICAgIC5maWx0ZXIoKG4pID0+IG4gIT09IGNvbG9yKVxuICAgICAgICAubWFwKHRvTnVtKTtcbiAgICBjb25zdCBbb2Zmc2V0WCwgb2Zmc2V0WSwgYmx1clJhZGl1cywgc3ByZWFkUmFkaXVzXSA9IG51bXM7XG4gICAgY29uc3QgcGFyc2VkQ29sb3IgPSBnZXRSZ2IoY29sb3IpO1xuICAgIGlmICghcGFyc2VkQ29sb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignUGFyc2UgY29sb3IgZXJyb3I6ICcgKyBjb2xvcik7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGluc2V0LFxuICAgICAgICBvZmZzZXRYLFxuICAgICAgICBvZmZzZXRZLFxuICAgICAgICBibHVyUmFkaXVzLFxuICAgICAgICBzcHJlYWRSYWRpdXMsXG4gICAgICAgIGNvbG9yOiBwYXJzZWRDb2xvciB8fCB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IDEgfSxcbiAgICB9O1xufTtcbmV4cG9ydCBjb25zdCBnZXRPcGFjaXR5ID0gKHN0eWxlcykgPT4ge1xuICAgIHJldHVybiBOdW1iZXIoc3R5bGVzLm9wYWNpdHkpO1xufTtcbmV4cG9ydCBjb25zdCBwYXJzZUJveFNoYWRvd1ZhbHVlcyA9IChzdHIpID0+IHtcbiAgICBjb25zdCB2YWx1ZXMgPSBwYXJzZU11bHRpcGxlQ1NTVmFsdWVzKHN0cik7XG4gICAgcmV0dXJuIHZhbHVlcy5tYXAocyA9PiBwYXJzZUJveFNoYWRvd1ZhbHVlKHMpKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VGaWxscyhsYXllcikge1xuICAgIGNvbnN0IGltYWdlcyA9IEFycmF5LmlzQXJyYXkobGF5ZXIuZmlsbHMpICYmXG4gICAgICAgIGxheWVyLmZpbGxzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50eXBlID09PSAnSU1BR0UnKTtcbiAgICByZXR1cm4gaW1hZ2VzO1xufVxuZXhwb3J0IGNvbnN0IGRlZmF1bHRQbGFjZWhvbGRlckNvbG9yID0gZ2V0UmdiKCdyZ2JhKDE3OCwgMTc4LCAxNzgsIDEpJyk7XG4iLCIvLyBpbXBvcnQge2hleFRvRmlnbWFSR0IsIHdlYlJHQlRvRmlnbWFSR0J9IGZyb20gJ0BmaWdtYS1wbHVnaW4vaGVscGVycyc7XG5jb25zdCBuYW1lc1JHQiA9IFsncicsICdnJywgJ2InXTtcbmV4cG9ydCBmdW5jdGlvbiBmaWdtYVJHQlRvV2ViUkdCKGNvbG9yKSB7XG4gICAgY29uc3QgcmdiID0gW107XG4gICAgbmFtZXNSR0IuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgIHJnYltpXSA9IE1hdGgucm91bmQoY29sb3JbZV0gKiAyNTUpO1xuICAgIH0pO1xuICAgIGlmIChjb2xvclsnYSddICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJnYlszXSA9IE1hdGgucm91bmQoY29sb3JbJ2EnXSAqIDEwMCkgLyAxMDA7XG4gICAgcmV0dXJuIHJnYjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaWdtYVJHQlRvSGV4KGNvbG9yKSB7XG4gICAgbGV0IGhleCA9ICcjJztcbiAgICBjb25zdCByZ2IgPSBmaWdtYVJHQlRvV2ViUkdCKGNvbG9yKTtcbiAgICBoZXggKz0gKCgxIDw8IDI0KSArIChyZ2JbMF0gPDwgMTYpICsgKHJnYlsxXSA8PCA4KSArIHJnYlsyXSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xuICAgIGlmIChyZ2JbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBhID0gTWF0aC5yb3VuZChyZ2JbM10gKiAyNTUpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgaWYgKGEubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIGhleCArPSAnMCcgKyBhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGEgIT09ICdmZicpXG4gICAgICAgICAgICAgICAgaGV4ICs9IGE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhleDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3ZWJSR0JUb0ZpZ21hUkdCKGNvbG9yKSB7XG4gICAgY29uc3QgcmdiID0geyByOiAwLCBnOiAwLCBiOiAwIH07XG4gICAgbmFtZXNSR0IuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgIHJnYltlXSA9IGNvbG9yW2ldIC8gMjU1O1xuICAgIH0pO1xuICAgIGlmIChjb2xvclszXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZ2JbJ2EnXSA9IGNvbG9yWzNdO1xuICAgIHJldHVybiByZ2I7XG59XG5leHBvcnQgZnVuY3Rpb24gaGV4VG9GaWdtYVJHQihjb2xvcikge1xuICAgIGxldCBvcGFjaXR5ID0gJyc7XG4gICAgY29sb3IgPSBjb2xvci50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChjb2xvclswXSA9PT0gJyMnKVxuICAgICAgICBjb2xvciA9IGNvbG9yLnNsaWNlKDEpO1xuICAgIGlmIChjb2xvci5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgY29sb3IgPSBjb2xvci5yZXBsYWNlKC8oLikoLikoLik/L2csICckMSQxJDIkMiQzJDMnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29sb3IubGVuZ3RoID09PSA4KSB7XG4gICAgICAgIGNvbnN0IGFyciA9IGNvbG9yLm1hdGNoKC8oLns2fSkoLnsyfSkvKTtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICBjb2xvciA9IGFyclsxXTtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICBvcGFjaXR5ID0gYXJyWzJdO1xuICAgIH1cbiAgICBjb25zdCBudW0gPSBwYXJzZUludChjb2xvciwgMTYpO1xuICAgIGNvbnN0IHJnYiA9IFtudW0gPj4gMTYsIChudW0gPj4gOCkgJiAyNTUsIG51bSAmIDI1NV07XG4gICAgaWYgKG9wYWNpdHkpIHtcbiAgICAgICAgcmdiLnB1c2gocGFyc2VJbnQob3BhY2l0eSwgMTYpIC8gMjU1KTtcbiAgICAgICAgcmV0dXJuIHdlYlJHQlRvRmlnbWFSR0IocmdiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB3ZWJSR0JUb0ZpZ21hUkdCKHJnYik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICAgICAgICAgIGc6IHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgICAgICAgICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNiksXG4gICAgICAgIH1cbiAgICAgICAgOiBudWxsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFJHQkFUb0hleEEocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpIHtcbiAgICBjb25zdCByID0gcGFyc2VJbnQocmVkLCAxMCk7XG4gICAgY29uc3QgZyA9IHBhcnNlSW50KGdyZWVuLCAxMCk7XG4gICAgY29uc3QgYiA9IHBhcnNlSW50KGJsdWUsIDEwKTtcbiAgICBjb25zdCBhID0gTnVtYmVyKHBhcnNlRmxvYXQoYWxwaGEpLnRvRml4ZWQoMikpO1xuICAgIGNvbnN0IG91dFBhcnRzID0gW1xuICAgICAgICByLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgZy50b1N0cmluZygxNiksXG4gICAgICAgIGIudG9TdHJpbmcoMTYpLFxuICAgICAgICBNYXRoLnJvdW5kKGEgKiAyNTUpXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAuc3Vic3RyaW5nKDAsIDIpLFxuICAgIF07XG4gICAgLy8gUGFkIHNpbmdsZS1kaWdpdCBvdXRwdXQgdmFsdWVzXG4gICAgb3V0UGFydHMuZm9yRWFjaCgocGFydCwgaSkgPT4ge1xuICAgICAgICBpZiAocGFydC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIG91dFBhcnRzW2ldID0gYDAke3BhcnR9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBgIyR7b3V0UGFydHMuam9pbignJyl9YDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoc2xhVG9SZ2JhKGhzbGFWYWx1ZXMpIHtcbiAgICBjb25zdCBoID0gaHNsYVZhbHVlc1swXTtcbiAgICBsZXQgcyA9IGhzbGFWYWx1ZXNbMV07XG4gICAgbGV0IGwgPSBoc2xhVmFsdWVzWzJdO1xuICAgIGxldCBhID0gMTtcbiAgICBpZiAoaHNsYVZhbHVlc1szXSkge1xuICAgICAgICBhID0gaHNsYVZhbHVlc1szXTtcbiAgICB9XG4gICAgLy8gTXVzdCBiZSBmcmFjdGlvbnMgb2YgMVxuICAgIHMgLz0gMTAwO1xuICAgIGwgLz0gMTAwO1xuICAgIGNvbnN0IGMgPSAoMSAtIE1hdGguYWJzKDIgKiBsIC0gMSkpICogcztcbiAgICBjb25zdCB4ID0gYyAqICgxIC0gTWF0aC5hYnMoKChoIC8gNjApICUgMikgLSAxKSk7XG4gICAgY29uc3QgbSA9IGwgLSBjIC8gMjtcbiAgICBsZXQgciA9IDA7XG4gICAgbGV0IGcgPSAwO1xuICAgIGxldCBiID0gMDtcbiAgICBpZiAoaCA+PSAwICYmIGggPCA2MCkge1xuICAgICAgICByID0gYztcbiAgICAgICAgZyA9IHg7XG4gICAgICAgIGIgPSAwO1xuICAgIH1cbiAgICBlbHNlIGlmIChoID49IDYwICYmIGggPCAxMjApIHtcbiAgICAgICAgciA9IHg7XG4gICAgICAgIGcgPSBjO1xuICAgICAgICBiID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAoaCA+PSAxMjAgJiYgaCA8IDE4MCkge1xuICAgICAgICByID0gMDtcbiAgICAgICAgZyA9IGM7XG4gICAgICAgIGIgPSB4O1xuICAgIH1cbiAgICBlbHNlIGlmIChoID49IDE4MCAmJiBoIDwgMjQwKSB7XG4gICAgICAgIHIgPSAwO1xuICAgICAgICBnID0geDtcbiAgICAgICAgYiA9IGM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGggPj0gMjQwICYmIGggPCAzMDApIHtcbiAgICAgICAgciA9IHg7XG4gICAgICAgIGcgPSAwO1xuICAgICAgICBiID0gYztcbiAgICB9XG4gICAgZWxzZSBpZiAoaCA+PSAzMDAgJiYgaCA8IDM2MCkge1xuICAgICAgICByID0gYztcbiAgICAgICAgZyA9IDA7XG4gICAgICAgIGIgPSB4O1xuICAgIH1cbiAgICByID0gTWF0aC5yb3VuZCgociArIG0pICogMjU1KTtcbiAgICBnID0gTWF0aC5yb3VuZCgoZyArIG0pICogMjU1KTtcbiAgICBiID0gTWF0aC5yb3VuZCgoYiArIG0pICogMjU1KTtcbiAgICByZXR1cm4gW3IsIGcsIGIsIGFdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb0ZpZ21hQ29sb3IoaW5wdXQpIHtcbiAgICBsZXQgY29sb3I7XG4gICAgbGV0IG9wYWNpdHk7XG4gICAgaWYgKGlucHV0LnN0YXJ0c1dpdGgoJ3JnYicpKSB7XG4gICAgICAgIGNvbnN0IHJnYlZhbHVlcyA9IGlucHV0LnJlcGxhY2UoL15yZ2JhP1xcKHxcXHMrfFxcKSQvZywgJycpLnNwbGl0KCcsJykubWFwKG4gPT4gTnVtYmVyKG4pKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCB7IHIsIGcsIGIsIGEgPSAxIH0gPSB3ZWJSR0JUb0ZpZ21hUkdCKHJnYlZhbHVlcyk7XG4gICAgICAgIGNvbG9yID0geyByLCBnLCBiIH07XG4gICAgICAgIG9wYWNpdHkgPSBOdW1iZXIoYSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlucHV0LnN0YXJ0c1dpdGgoJ2hzbCcpKSB7XG4gICAgICAgIGNvbnN0IGhzbFZhbHVlcyA9IGlucHV0LnJlcGxhY2UoL15oc2xhP1xcKHxcXHMrfCV8XFwpJC9nLCAnJykuc3BsaXQoJywnKS5tYXAobiA9PiBOdW1iZXIobikpO1xuICAgICAgICA7XG4gICAgICAgIGNvbnN0IHJnYlZhbHVlcyA9IGhzbGFUb1JnYmEoaHNsVmFsdWVzKTtcbiAgICAgICAgY29uc3QgeyByLCBnLCBiLCBhID0gMSB9ID0gd2ViUkdCVG9GaWdtYVJHQihyZ2JWYWx1ZXMpO1xuICAgICAgICBjb2xvciA9IHsgciwgZywgYiB9O1xuICAgICAgICBvcGFjaXR5ID0gTnVtYmVyKGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgeyByLCBnLCBiLCBhID0gMSB9ID0gaGV4VG9GaWdtYVJHQihpbnB1dCk7XG4gICAgICAgIGNvbG9yID0geyByLCBnLCBiIH07XG4gICAgICAgIG9wYWNpdHkgPSBOdW1iZXIoYSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbG9yLFxuICAgICAgICBvcGFjaXR5LFxuICAgIH07XG59XG4iLCJpbXBvcnQgeyBmaWdtYVJHQlRvSGV4IH0gZnJvbSAnLi9jb2xvcnMnO1xuaW1wb3J0IHsgY29udmVydFRvRmlnbWFDb2xvciB9IGZyb20gJy4vY29sb3JzJztcbmZ1bmN0aW9uIGdldFR4KGRlZykge1xuICAgIGlmIChkZWcgPj0gMTIwKSB7XG4gICAgICAgIGlmIChkZWcgPj0gMTgwKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMC41O1xuICAgIH1cbiAgICByZXR1cm4gMDtcbn1cbi8vIEdldHMgYSBNYXRyaXggZm9yIGEgZGVncmVlIHZhbHVlXG4vLyBJZiB5b3UgcmVhZCB0aGlzIGFuZCBrbm93IG1hdGggKHVubGlrZSBtZSksIFBMRUFTRSBmaXggdGhpcyBEOlxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hdHJpeEZvckRlZ3JlZXMoZGVnKSB7XG4gICAgY29uc3QgcmFkID0gcGFyc2VGbG9hdChkZWcpICogKE1hdGguUEkgLyAxODApO1xuICAgIGNvbnN0IGEgPSBNYXRoLnJvdW5kKE1hdGguY29zKHJhZCkgKiAxMDApIC8gMTAwO1xuICAgIGNvbnN0IGIgPSBNYXRoLnJvdW5kKE1hdGguc2luKHJhZCkgKiAxMDApIC8gMTAwO1xuICAgIGNvbnN0IGMgPSAtTWF0aC5yb3VuZChNYXRoLnNpbihyYWQpICogMTAwKSAvIDEwMDtcbiAgICBjb25zdCBkID0gTWF0aC5yb3VuZChNYXRoLmNvcyhyYWQpICogMTAwKSAvIDEwMDtcbiAgICBjb25zdCBkZWdOdW1iZXIgPSBOdW1iZXIoZGVnKTtcbiAgICBjb25zdCB0eCA9IGdldFR4KGRlZ051bWJlcik7XG4gICAgY29uc3QgdHkgPSBkZWdOdW1iZXIgPj0gMTIwID8gMSA6IDA7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgW2EsIGIsIHR4XSxcbiAgICAgICAgW2MsIGQsIHR5XSxcbiAgICBdO1xufVxuZnVuY3Rpb24gY29udmVydFRvRGVncmVlcyhtYXRyaXgpIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBbLi4ubWF0cml4WzBdLCAuLi5tYXRyaXhbMV1dO1xuICAgIGNvbnN0IGEgPSB2YWx1ZXNbMF07XG4gICAgY29uc3QgYiA9IHZhbHVlc1sxXTtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hdGFuMihiLCBhKSAqICgxODAgLyBNYXRoLlBJKSk7XG4gICAgcmV0dXJuIGFuZ2xlIDwgMCA/IGFuZ2xlICsgMzYwIDogYW5nbGU7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVncmVlc0Zvck1hdHJpeChtYXRyaXgpIHtcbiAgICBjb25zdCBkZWdyZWVzID0gY29udmVydFRvRGVncmVlcyhtYXRyaXgpIHx8IDA7XG4gICAgcmV0dXJuIGAke2RlZ3JlZXN9ZGVnYDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RGVncmVlVG9OdW1iZXIoZGVncmVlKSB7XG4gICAgcmV0dXJuIGRlZ3JlZS5zcGxpdCgnZGVnJykuam9pbignJyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydEZpZ21hR3JhZGllbnRUb1N0cmluZyhwYWludCkge1xuICAgIGNvbnN0IHsgZ3JhZGllbnRUcmFuc2Zvcm0sIGdyYWRpZW50U3RvcHMgfSA9IHBhaW50O1xuICAgIGNvbnN0IGdyYWRpZW50U3RvcHNTdHJpbmcgPSBncmFkaWVudFN0b3BzXG4gICAgICAgIC5tYXAoKHN0b3ApID0+IGAke2ZpZ21hUkdCVG9IZXgoc3RvcC5jb2xvcil9ICR7TWF0aC5yb3VuZChzdG9wLnBvc2l0aW9uICogMTAwICogMTAwKSAvIDEwMH0lYClcbiAgICAgICAgLmpvaW4oJywgJyk7XG4gICAgY29uc3QgZ3JhZGllbnRUcmFuc2Zvcm1TdHJpbmcgPSBnZXREZWdyZWVzRm9yTWF0cml4KGdyYWRpZW50VHJhbnNmb3JtKTtcbiAgICByZXR1cm4gYGxpbmVhci1ncmFkaWVudCgke2dyYWRpZW50VHJhbnNmb3JtU3RyaW5nfSwgJHtncmFkaWVudFN0b3BzU3RyaW5nfSlgO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRTdHJpbmdUb0ZpZ21hR3JhZGllbnQodmFsdWUpIHtcbiAgICBjb25zdCBbZ3JhZGllbnREZWdyZWVzLCAuLi5jb2xvclN0b3BzXSA9IHZhbHVlXG4gICAgICAgIC5zdWJzdHJpbmcodmFsdWUuaW5kZXhPZignKCcpICsgMSwgdmFsdWUubGFzdEluZGV4T2YoJyknKSlcbiAgICAgICAgLnNwbGl0KCcsICcpO1xuICAgIGNvbnN0IGRlZ3JlZXMgPSBjb252ZXJ0RGVncmVlVG9OdW1iZXIoZ3JhZGllbnREZWdyZWVzKTtcbiAgICBjb25zdCBncmFkaWVudFRyYW5zZm9ybSA9IGdldE1hdHJpeEZvckRlZ3JlZXMoZGVncmVlcyk7XG4gICAgY29uc3QgZ3JhZGllbnRTdG9wcyA9IGNvbG9yU3RvcHMubWFwKChzdG9wKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlcGVyYXRlZFN0b3AgPSBzdG9wLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IHsgY29sb3IsIG9wYWNpdHkgfSA9IGNvbnZlcnRUb0ZpZ21hQ29sb3Ioc2VwZXJhdGVkU3RvcFswXSk7XG4gICAgICAgIGNvbnN0IGdyYWRpZW50Q29sb3IgPSBjb2xvcjtcbiAgICAgICAgZ3JhZGllbnRDb2xvci5hID0gb3BhY2l0eTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiBncmFkaWVudENvbG9yLFxuICAgICAgICAgICAgcG9zaXRpb246IHBhcnNlRmxvYXQoc2VwZXJhdGVkU3RvcFsxXSkgLyAxMDAsXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgZ3JhZGllbnRTdG9wcywgZ3JhZGllbnRUcmFuc2Zvcm0gfTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0TnVtYmVyVG9GaWdtYSh2YWx1ZSkge1xuICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZha2VaZXJvRm9yRmlnbWEodmFsdWUpIHtcbiAgICByZXR1cm4gTnVtYmVyKHZhbHVlKSA9PT0gMCA/IDAuMDAxIDogTnVtYmVyKHZhbHVlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUpIHtcbiAgICBjb25zdCBiYXNlRm9udFNpemUgPSAxNjtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAodmFsdWUuZW5kc1dpdGgoJ2VtJykgfHwgdmFsdWUuZW5kc1dpdGgoJ3JlbScpKSkge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgKiBiYXNlRm9udFNpemU7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gcGFyc2VGbG9hdCh2YWx1ZSkgOiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0TGV0dGVyU3BhY2luZ1RvRmlnbWEoaW5wdXRWYWx1ZSkge1xuICAgIGxldCBsZXR0ZXJTcGFjaW5nO1xuICAgIGNvbnN0IHZhbHVlID0gaW5wdXRWYWx1ZS50b1N0cmluZygpO1xuICAgIGNvbnN0IG51bWJlcnMgPSAvXi0/XFxkKyhcXC5cXGQrKT8kLztcbiAgICBpZiAodmFsdWUudHJpbSgpLnNsaWNlKC0xKSA9PT0gJyUnICYmXG4gICAgICAgIHZhbHVlLnRyaW0oKS5zbGljZSgwLCAtMSkubWF0Y2gobnVtYmVycykpIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZyA9IHtcbiAgICAgICAgICAgIHVuaXQ6ICdQRVJDRU5UJyxcbiAgICAgICAgICAgIHZhbHVlOiBOdW1iZXIodmFsdWUuc2xpY2UoMCwgLTEpKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAodmFsdWUubWF0Y2gobnVtYmVycykgfHwgdmFsdWUuZW5kc1dpdGgoJ3B4JykpIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZyA9IHtcbiAgICAgICAgICAgIHVuaXQ6ICdQSVhFTFMnLFxuICAgICAgICAgICAgdmFsdWU6IGNvbnZlcnRUeXBvZ3JhcGh5TnVtYmVyVG9GaWdtYSh2YWx1ZSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBsZXR0ZXJTcGFjaW5nO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRGaWdtYVRvTGV0dGVyU3BhY2luZyhpbnB1dFZhbHVlKSB7XG4gICAgY29uc3QgeyB1bml0LCB2YWx1ZSB9ID0gaW5wdXRWYWx1ZTtcbiAgICBpZiAodW5pdCA9PT0gJ1BFUkNFTlQnKSB7XG4gICAgICAgIHJldHVybiBgJHsrdmFsdWUudG9GaXhlZCgyKX0lYDtcbiAgICB9XG4gICAgcmV0dXJuICt2YWx1ZS50b0ZpeGVkKDIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRMaW5lSGVpZ2h0VG9GaWdtYShpbnB1dFZhbHVlKSB7XG4gICAgbGV0IGxpbmVIZWlnaHQ7XG4gICAgY29uc3QgdmFsdWUgPSBpbnB1dFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgbnVtYmVycyA9IC9eXFxkKyhcXC5cXGQrKT8kLztcbiAgICBpZiAodmFsdWUubWF0Y2gobnVtYmVycykgfHwgdmFsdWUuZW5kc1dpdGgoJ3B4JykpIHtcbiAgICAgICAgbGluZUhlaWdodCA9IHtcbiAgICAgICAgICAgIHVuaXQ6ICdQSVhFTFMnLFxuICAgICAgICAgICAgdmFsdWU6IGNvbnZlcnRUeXBvZ3JhcGh5TnVtYmVyVG9GaWdtYSh2YWx1ZSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKHZhbHVlLnRyaW0oKS5zbGljZSgtMSkgPT09ICclJyAmJlxuICAgICAgICB2YWx1ZS50cmltKCkuc2xpY2UoMCwgLTEpLm1hdGNoKG51bWJlcnMpKSB7XG4gICAgICAgIGxpbmVIZWlnaHQgPSB7XG4gICAgICAgICAgICB1bml0OiAnUEVSQ0VOVCcsXG4gICAgICAgICAgICB2YWx1ZTogTnVtYmVyKHZhbHVlLnNsaWNlKDAsIC0xKSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsaW5lSGVpZ2h0ID0ge1xuICAgICAgICAgICAgdW5pdDogJ0FVVE8nLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbGluZUhlaWdodDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RmlnbWFUb0xpbmVIZWlnaHQoaW5wdXRWYWx1ZSkge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICBjb25zdCB7IHVuaXQsIHZhbHVlIH0gPSBpbnB1dFZhbHVlO1xuICAgIGlmICh1bml0ID09PSAnUElYRUxTJykge1xuICAgICAgICByZXR1cm4gK3ZhbHVlLnRvRml4ZWQoMik7XG4gICAgfVxuICAgIGlmICh1bml0ID09PSAnUEVSQ0VOVCcpIHtcbiAgICAgICAgcmV0dXJuIGAkeyt2YWx1ZS50b0ZpeGVkKDIpfSVgO1xuICAgIH1cbiAgICByZXR1cm4gJ0FVVE8nO1xufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydE9wYWNpdHlUb0ZpZ21hKHZhbHVlKSB7XG4gICAgY29uc3QgbWF0Y2hlZFBlcmNlbnQgPSB2YWx1ZS50b1N0cmluZygpLm1hdGNoKC8oXFxkKyUpLyk7XG4gICAgLy8gTWF0Y2hlcyA1MCUsIDEwMCUsIGV0Yy5cbiAgICBpZiAobWF0Y2hlZFBlcmNlbnQgJiYgbWF0Y2hlZFBlcmNlbnQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIobWF0Y2hlZFBlcmNlbnRbMF0uc2xpY2UoMCwgLTEpKSAvIDEwMDtcbiAgICB9XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG59XG5leHBvcnQgY29uc3QgdHJhbnNmb3JtU2l6ZSA9ICh2YWx1ZSkgPT4gZmFrZVplcm9Gb3JGaWdtYShjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUpKTtcbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1TcGFjZSA9ICh2YWx1ZSkgPT4gY29udmVydFR5cG9ncmFwaHlOdW1iZXJUb0ZpZ21hKHZhbHVlKTtcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1WYWx1ZSh2YWx1ZSwgdHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdib3JkZXJXaWR0aCc6XG4gICAgICAgIGNhc2UgJ3dpZHRoJzpcbiAgICAgICAgY2FzZSAnaGVpZ2h0JzpcbiAgICAgICAgY2FzZSAnc2l6aW5nJzpcbiAgICAgICAgICAgIHJldHVybiBmYWtlWmVyb0ZvckZpZ21hKGNvbnZlcnRUeXBvZ3JhcGh5TnVtYmVyVG9GaWdtYSh2YWx1ZSkpO1xuICAgICAgICBjYXNlICdib3JkZXJSYWRpdXMnOlxuICAgICAgICBjYXNlICdib3JkZXJSYWRpdXNUb3BMZWZ0JzpcbiAgICAgICAgY2FzZSAnYm9yZGVyUmFkaXVzVG9wUmlnaHQnOlxuICAgICAgICBjYXNlICdib3JkZXJSYWRpdXNCb3R0b21SaWdodCc6XG4gICAgICAgIGNhc2UgJ2JvcmRlclJhZGl1c0JvdHRvbUxlZnQnOlxuICAgICAgICBjYXNlICdzcGFjaW5nJzpcbiAgICAgICAgY2FzZSAnaG9yaXpvbnRhbFBhZGRpbmcnOlxuICAgICAgICBjYXNlICd2ZXJ0aWNhbFBhZGRpbmcnOlxuICAgICAgICBjYXNlICdwYWRkaW5nVG9wJzpcbiAgICAgICAgY2FzZSAncGFkZGluZ1JpZ2h0JzpcbiAgICAgICAgY2FzZSAncGFkZGluZ0JvdHRvbSc6XG4gICAgICAgIGNhc2UgJ3BhZGRpbmdMZWZ0JzpcbiAgICAgICAgY2FzZSAnaXRlbVNwYWNpbmcnOlxuICAgICAgICBjYXNlICdib3hTaGFkb3cnOlxuICAgICAgICBjYXNlICdwYXJhZ3JhcGhTcGFjaW5nJzpcbiAgICAgICAgY2FzZSAnZm9udFNpemUnOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRUeXBvZ3JhcGh5TnVtYmVyVG9GaWdtYSh2YWx1ZSk7XG4gICAgICAgIGNhc2UgJ2xldHRlclNwYWNpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRMZXR0ZXJTcGFjaW5nVG9GaWdtYSh2YWx1ZSk7XG4gICAgICAgIGNhc2UgJ2xpbmVIZWlnaHQnOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRMaW5lSGVpZ2h0VG9GaWdtYSh2YWx1ZSk7XG4gICAgICAgIGNhc2UgJ29wYWNpdHknOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRPcGFjaXR5VG9GaWdtYSh2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBjb252ZXJ0T3BhY2l0eVRvRmlnbWEsIHsgY29udmVydFR5cG9ncmFwaHlOdW1iZXJUb0ZpZ21hLCB0cmFuc2Zvcm1TaXplLCB0cmFuc2Zvcm1TcGFjZSwgdHJhbnNmb3JtVmFsdWUsIH0gZnJvbSAnLi9oZWxwZXJzL3RyYW5zZm9ybVZhbHVlJztcbmltcG9ydCB7IGNvbnZlcnRUb0ZpZ21hQ29sb3IgfSBmcm9tICcuL2hlbHBlcnMvY29sb3JzJztcbmltcG9ydCB7IGNvbnZlcnRTdHJpbmdUb0ZpZ21hR3JhZGllbnQgfSBmcm9tICcuL2hlbHBlcnMvZ3JhZGllbnRzJztcbmV4cG9ydCBmdW5jdGlvbiBzZXRGb250KHRhcmdldCwgdG9rZW4pIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyB2YWx1ZSwgZGVzY3JpcHRpb24gfSA9IHRva2VuO1xuICAgICAgICAgICAgY29uc3QgeyBmb250RmFtaWx5LCBmb250V2VpZ2h0LCBmb250U2l6ZSwgbGluZUhlaWdodCwgbGV0dGVyU3BhY2luZywgcGFyYWdyYXBoU3BhY2luZywgfSA9IHZhbHVlO1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICAgICAgY29uc3QgZmFtaWx5ID0gZm9udEZhbWlseSB8fCB0YXJnZXQuZm9udE5hbWUuZmFtaWx5O1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBmb250V2VpZ2h0IHx8IHRhcmdldC5mb250TmFtZS5zdHlsZTtcbiAgICAgICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHksIHN0eWxlIH0pO1xuICAgICAgICAgICAgaWYgKGZvbnRGYW1pbHkgJiYgZm9udFdlaWdodCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5mb250TmFtZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZmFtaWx5LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZvbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmZvbnRTaXplID0gdHJhbnNmb3JtVmFsdWUoZm9udFNpemUsICdmb250U2l6ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbmVIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQubGluZUhlaWdodCA9IHRyYW5zZm9ybVZhbHVlKGxpbmVIZWlnaHQsICdsaW5lSGVpZ2h0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGV0dGVyU3BhY2luZykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5sZXR0ZXJTcGFjaW5nID0gdHJhbnNmb3JtVmFsdWUobGV0dGVyU3BhY2luZywgJ2xldHRlclNwYWNpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhZ3JhcGhTcGFjaW5nKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnBhcmFncmFwaFNwYWNpbmcgPSB0cmFuc2Zvcm1WYWx1ZShwYXJhZ3JhcGhTcGFjaW5nLCAncGFyYWdyYXBoU3BhY2luZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICAgICAgICAgIHRhcmdldC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc2V0dGluZyBmb250IG9uIHRhcmdldCcsIHRhcmdldCwgdG9rZW4sIGUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0Q29sb3JWYWx1ZXNPblRhcmdldCh0YXJnZXQsIHZhbHVlLCBkZXNjcmlwdGlvbiwga2V5ID0gJ3BhaW50cycpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodmFsdWUuc3RhcnRzV2l0aCgnbGluZWFyLWdyYWRpZW50JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZ3JhZGllbnRTdG9wcywgZ3JhZGllbnRUcmFuc2Zvcm0sIH0gPSBjb252ZXJ0U3RyaW5nVG9GaWdtYUdyYWRpZW50KHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1BhaW50ID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHUkFESUVOVF9MSU5FQVInLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50VHJhbnNmb3JtLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50U3RvcHMsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBbbmV3UGFpbnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBjb2xvciwgb3BhY2l0eSB9ID0gY29udmVydFRvRmlnbWFDb2xvcih2YWx1ZSk7XG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IFt7IGNvbG9yLCBvcGFjaXR5LCB0eXBlOiAnU09MSUQnIH1dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICAgICAgdGFyZ2V0LmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2V0dGluZyBjb2xvcicsIGUpO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBzZXRGaWxsVG9Ob2RlID0gKG5vZGUsIHRva2VuKSA9PiB7XG4gICAgLy8gRklMTFxuICAgIGlmICh0b2tlbi52YWx1ZS5maWxsICYmIHR5cGVvZiB0b2tlbi52YWx1ZS5maWxsID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIG5vZGUuZmlsbHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBzZXRDb2xvclZhbHVlc09uVGFyZ2V0KG5vZGUsIHRva2VuLnZhbHVlLmZpbGwsIHRva2VuLmRlc2NyaXB0aW9uLCAnZmlsbHMnKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnQgY29uc3Qgc2V0Qm9yZGVyQ29sb3IgPSAobm9kZSwgdG9rZW4pID0+IHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSB0b2tlbjtcbiAgICBpZiAodHlwZW9mIHZhbHVlLmJvcmRlckNvbG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIG5vZGUuc3Ryb2tlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29sb3IsIG9wYWNpdHkgfSA9IGNvbnZlcnRUb0ZpZ21hQ29sb3IodmFsdWUuYm9yZGVyQ29sb3IpO1xuICAgICAgICAgICAgbm9kZS5zdHJva2VzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3IsIG9wYWNpdHkgfV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHNldEJvcmRlclJhZGl1cyA9IChub2RlLCB0b2tlbikgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRva2VuO1xuICAgIC8vIEJPUkRFUiBSQURJVVNcbiAgICAvLyBpZiAoXG4gICAgLy8gICAgIHR5cGVvZiB2YWx1ZS5ib3JkZXJSYWRpdXMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gICAgIHR5cGVvZiBub2RlLmNvcm5lclJhZGl1cyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAvLyApIHtcbiAgICAvLyAgICAgbm9kZS5jb3JuZXJSYWRpdXMgPSBjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUuYm9yZGVyUmFkaXVzKTtcbiAgICAvLyB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS5ib3JkZXJSYWRpdXNUb3BMZWZ0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS50b3BMZWZ0UmFkaXVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLnRvcExlZnRSYWRpdXMgPSBjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUuYm9yZGVyUmFkaXVzVG9wTGVmdCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUuYm9yZGVyUmFkaXVzVG9wUmlnaHQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLnRvcFJpZ2h0UmFkaXVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLnRvcFJpZ2h0UmFkaXVzID0gY29udmVydFR5cG9ncmFwaHlOdW1iZXJUb0ZpZ21hKHZhbHVlLmJvcmRlclJhZGl1c1RvcFJpZ2h0KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS5ib3JkZXJSYWRpdXNCb3R0b21SaWdodCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vZGUuYm90dG9tUmlnaHRSYWRpdXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vZGUuYm90dG9tUmlnaHRSYWRpdXMgPSBjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUuYm9yZGVyUmFkaXVzQm90dG9tUmlnaHQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlLmJvcmRlclJhZGl1c0JvdHRvbUxlZnQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLmJvdHRvbUxlZnRSYWRpdXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vZGUuYm90dG9tTGVmdFJhZGl1cyA9IGNvbnZlcnRUeXBvZ3JhcGh5TnVtYmVyVG9GaWdtYSh2YWx1ZS5ib3JkZXJSYWRpdXNCb3R0b21MZWZ0KTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHNldFBhZGRpbmcgPSAobm9kZSwgdG9rZW4pID0+IHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSB0b2tlbjtcbiAgICAvLyBTUEFDSU5HXG4gICAgLy8gaWYgKFxuICAgIC8vICAgICB0eXBlb2YgdmFsdWUuc3BhY2luZyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyAgICAgdHlwZW9mIG5vZGUucGFkZGluZ0xlZnQgIT09ICd1bmRlZmluZWQnXG4gICAgLy8gKSB7XG4gICAgLy8gICAgIG5vZGUucGFkZGluZ0xlZnQgPSB0cmFuc2Zvcm1TcGFjZSh2YWx1ZS5zcGFjaW5nKTtcbiAgICAvLyAgICAgbm9kZS5wYWRkaW5nUmlnaHQgPSB0cmFuc2Zvcm1TcGFjZSh2YWx1ZS5zcGFjaW5nKTtcbiAgICAvLyAgICAgbm9kZS5wYWRkaW5nVG9wID0gdHJhbnNmb3JtU3BhY2UodmFsdWUuc3BhY2luZyk7XG4gICAgLy8gICAgIG5vZGUucGFkZGluZ0JvdHRvbSA9IHRyYW5zZm9ybVNwYWNlKHZhbHVlLnNwYWNpbmcpO1xuICAgIC8vICAgICBub2RlLml0ZW1TcGFjaW5nID0gdHJhbnNmb3JtU3BhY2UodmFsdWUuc3BhY2luZyk7XG4gICAgLy8gfVxuICAgIGlmICh0eXBlb2YgdmFsdWUuaXRlbVNwYWNpbmcgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLml0ZW1TcGFjaW5nICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLml0ZW1TcGFjaW5nID0gdHJhbnNmb3JtU3BhY2UodmFsdWUuaXRlbVNwYWNpbmcpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlLnBhZGRpbmdUb3AgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLnBhZGRpbmdUb3AgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vZGUucGFkZGluZ1RvcCA9IHRyYW5zZm9ybVNwYWNlKHZhbHVlLnBhZGRpbmdUb3ApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlLnBhZGRpbmdSaWdodCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vZGUucGFkZGluZ1JpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLnBhZGRpbmdSaWdodCA9IHRyYW5zZm9ybVNwYWNlKHZhbHVlLnBhZGRpbmdSaWdodCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUucGFkZGluZ0JvdHRvbSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vZGUucGFkZGluZ0JvdHRvbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9kZS5wYWRkaW5nQm90dG9tID0gdHJhbnNmb3JtU3BhY2UodmFsdWUucGFkZGluZ0JvdHRvbSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUucGFkZGluZ0xlZnQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLnBhZGRpbmdMZWZ0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLnBhZGRpbmdMZWZ0ID0gdHJhbnNmb3JtU3BhY2UodmFsdWUucGFkZGluZ0xlZnQpO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3Qgc2V0Qm9yZGVyV2lkdGggPSAobm9kZSwgdG9rZW4pID0+IHtcbiAgICAvLyBCT1JERVIgV0lEVEhcbiAgICBpZiAodHlwZW9mIHRva2VuLnZhbHVlLmJvcmRlcldpZHRoICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS5zdHJva2VXZWlnaHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vZGUuc3Ryb2tlV2VpZ2h0ID0gdHJhbnNmb3JtU2l6ZSh0b2tlbi52YWx1ZS5ib3JkZXJXaWR0aCk7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBzZXRPcGFjaXR5ID0gKG5vZGUsIHRva2VuKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0b2tlbi52YWx1ZS5vcGFjaXR5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS5vcGFjaXR5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLm9wYWNpdHkgPSBjb252ZXJ0T3BhY2l0eVRvRmlnbWEodG9rZW4udmFsdWUub3BhY2l0eSk7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBzZXRTaXplID0gKG5vZGUsIHRva2VuKSA9PiB7XG4gICAgLy8gU0laSU5HOiBCT1RIXG4gICAgaWYgKHR5cGVvZiB0b2tlbi52YWx1ZS5zaXppbmcgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLnJlc2l6ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9kZS5yZXNpemUodHJhbnNmb3JtU2l6ZSh0b2tlbi52YWx1ZS5zaXppbmcpLCB0cmFuc2Zvcm1TaXplKHRva2VuLnZhbHVlLnNpemluZykpO1xuICAgIH1cbiAgICAvLyBTSVpJTkc6IFdJRFRIXG4gICAgaWYgKHR5cGVvZiB0b2tlbi52YWx1ZS53aWR0aCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vZGUucmVzaXplICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLnJlc2l6ZSh0cmFuc2Zvcm1TaXplKHRva2VuLnZhbHVlLndpZHRoKSwgbm9kZS5oZWlnaHQpO1xuICAgIH1cbiAgICAvLyBTSVpJTkc6IEhFSUdIVFxuICAgIGlmICh0eXBlb2YgdG9rZW4udmFsdWUuaGVpZ2h0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS5yZXNpemUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vZGUucmVzaXplKG5vZGUud2lkdGgsIHRyYW5zZm9ybVNpemUodG9rZW4udmFsdWUuaGVpZ2h0KSk7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBzZXRCb3hTaGFkb3cgPSAobm9kZSwgdG9rZW4pID0+IHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSB0b2tlbjtcbiAgICBpZiAodHlwZW9mIHZhbHVlLmJveFNoYWRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vZGUuZWZmZWN0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCBlZmZlY3RzLCBidXQgcmVtb3ZlIERST1BfU0hBRE9XLCBzaW5jZSB3ZSdyZSBhYm91dCB0byBhZGQgaXRcbiAgICAgICAgY29uc3QgZWZmZWN0cyA9IG5vZGUuZWZmZWN0cy5maWx0ZXIoKGVmZmVjdCkgPT4gZWZmZWN0LnR5cGUgIT09ICdEUk9QX1NIQURPVycpO1xuICAgICAgICBjb25zdCB7IHgsIHksIHNwcmVhZCwgY29sb3IsIGJsdXIgfSA9IHZhbHVlLmJveFNoYWRvdztcbiAgICAgICAgY29uc3QgeyBjb2xvcjogeyByLCBnLCBiIH0sIG9wYWNpdHksIH0gPSBjb252ZXJ0VG9GaWdtYUNvbG9yKGNvbG9yKTtcbiAgICAgICAgY29uc3QgZWZmZWN0ID0ge1xuICAgICAgICAgICAgdHlwZTogJ0RST1BfU0hBRE9XJyxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBibGVuZE1vZGU6ICdOT1JNQUwnLFxuICAgICAgICAgICAgY29sb3I6IHsgciwgZywgYiwgYTogb3BhY2l0eSB9LFxuICAgICAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICAgICAgeDogdHJhbnNmb3JtVmFsdWUoeCwgJ2JveFNoYWRvdycpLFxuICAgICAgICAgICAgICAgIHk6IHRyYW5zZm9ybVZhbHVlKHksICdib3hTaGFkb3cnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByYWRpdXM6IHRyYW5zZm9ybVZhbHVlKGJsdXIsICdib3hTaGFkb3cnKSxcbiAgICAgICAgICAgIHNwcmVhZDogdHJhbnNmb3JtVmFsdWUoc3ByZWFkLCAnYm94U2hhZG93JyksXG4gICAgICAgIH07XG4gICAgICAgIGVmZmVjdHMucHVzaChlZmZlY3QpO1xuICAgICAgICBub2RlLmVmZmVjdHMgPSBlZmZlY3RzO1xuICAgIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gc2V0VG9rZW5Ub05vZGUobm9kZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0RmlsbFRvTm9kZShub2RlLCB0b2tlbik7XG4gICAgICAgICAgICBzZXRCb3JkZXJSYWRpdXMobm9kZSwgdG9rZW4pO1xuICAgICAgICAgICAgc2V0Qm94U2hhZG93KG5vZGUsIHRva2VuKTtcbiAgICAgICAgICAgIHNldE9wYWNpdHkobm9kZSwgdG9rZW4pO1xuICAgICAgICAgICAgc2V0U2l6ZShub2RlLCB0b2tlbik7XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVEVYVCcpIHtcbiAgICAgICAgICAgICAgICBzZXRGb250KG5vZGUsIHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldEJvcmRlcldpZHRoKG5vZGUsIHRva2VuKTtcbiAgICAgICAgICAgIHNldEJvcmRlckNvbG9yKG5vZGUsIHRva2VuKTtcbiAgICAgICAgICAgIHNldFBhZGRpbmcobm9kZSwgdG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc2V0dGluZyBkYXRhIG9uIG5vZGUnLCBlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiZXhwb3J0IHZhciBGaWdtYU1lc3NhZ2VUeXBlO1xuKGZ1bmN0aW9uIChGaWdtYU1lc3NhZ2VUeXBlKSB7XG4gICAgRmlnbWFNZXNzYWdlVHlwZVtGaWdtYU1lc3NhZ2VUeXBlW1wiSU1QT1JUXCJdID0gMF0gPSBcIklNUE9SVFwiO1xuICAgIEZpZ21hTWVzc2FnZVR5cGVbRmlnbWFNZXNzYWdlVHlwZVtcIlJFTkRFUlwiXSA9IDFdID0gXCJSRU5ERVJcIjtcbiAgICBGaWdtYU1lc3NhZ2VUeXBlW0ZpZ21hTWVzc2FnZVR5cGVbXCJJTVBPUlRfVkFSSUFOVFNcIl0gPSAyXSA9IFwiSU1QT1JUX1ZBUklBTlRTXCI7XG4gICAgRmlnbWFNZXNzYWdlVHlwZVtGaWdtYU1lc3NhZ2VUeXBlW1wiQVBQTFlfVE9LRU5cIl0gPSAzXSA9IFwiQVBQTFlfVE9LRU5cIjtcbiAgICBGaWdtYU1lc3NhZ2VUeXBlW0ZpZ21hTWVzc2FnZVR5cGVbXCJBUFBMWV9UT0tFTlNcIl0gPSA0XSA9IFwiQVBQTFlfVE9LRU5TXCI7XG4gICAgRmlnbWFNZXNzYWdlVHlwZVtGaWdtYU1lc3NhZ2VUeXBlW1wiU0VMRUNUX05PREVcIl0gPSA1XSA9IFwiU0VMRUNUX05PREVcIjtcbiAgICBGaWdtYU1lc3NhZ2VUeXBlW0ZpZ21hTWVzc2FnZVR5cGVbXCJDTEVBUl9TRUxFQ1RJT05cIl0gPSA2XSA9IFwiQ0xFQVJfU0VMRUNUSU9OXCI7XG4gICAgRmlnbWFNZXNzYWdlVHlwZVtGaWdtYU1lc3NhZ2VUeXBlW1wiUkVOREVSX1RPS0VOU19TWU5DXCJdID0gN10gPSBcIlJFTkRFUl9UT0tFTlNfU1lOQ1wiO1xufSkoRmlnbWFNZXNzYWdlVHlwZSB8fCAoRmlnbWFNZXNzYWdlVHlwZSA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGFkZExheWVyc1RvRnJhbWUsIGRlZmF1bHRGb250LCBnZXREcm9wT2Zmc2V0IH0gZnJvbSAnaHRtbC1maWdtYS9maWdtYSc7XG5pbXBvcnQgeyBGaWdtYU1lc3NhZ2VUeXBlLCB9IGZyb20gJy4uLy4uL3NyYy9GaWdtYU1lc3NhZ2VUeXBlJztcbmltcG9ydCB7IHNldFRva2VuVG9Ob2RlIH0gZnJvbSAnLi9zZXRUb2tlblRvTm9kZSc7XG4vL0B0cy1pZ25vcmVcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgIHdpZHRoOiA3NTAsXG4gICAgaGVpZ2h0OiA2MDAsXG59KTtcbmNvbnN0IHBvc3RNZXNzYWdlID0gKGRhdGEpID0+IHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShkYXRhKTtcbn07XG5jb25zdCBnZXRQbHVnaW5EYXRhID0gKG5vZGUpID0+IHtcbiAgICBjb25zdCB0b2tlbnMgPSBub2RlLmdldFBsdWdpbkRhdGEoJ3Rva2VucycpO1xuICAgIGNvbnN0IGNvbXBvbmVudERhdGEgPSBub2RlLmdldFBsdWdpbkRhdGEoJ2NvbXBvbmVudERhdGEnKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbnM6IHRva2VucyA/IEpTT04ucGFyc2UodG9rZW5zKSA6IG51bGwsXG4gICAgICAgIGNvbXBvbmVudERhdGE6IGNvbXBvbmVudERhdGEgPyBKU09OLnBhcnNlKGNvbXBvbmVudERhdGEpIDogbnVsbCxcbiAgICB9O1xufTtcbmNvbnN0IHNldFBsdWdpbkRhdGEgPSAobm9kZSwgcGF5bG9hZCkgPT4ge1xuICAgIGNvbnN0IHsgdG9rZW5zLCBjb21wb25lbnREYXRhIH0gPSBwYXlsb2FkO1xuICAgIHRva2VucyAmJiBub2RlLnNldFBsdWdpbkRhdGEoJ3Rva2VucycsIEpTT04uc3RyaW5naWZ5KHRva2VucykpO1xuICAgIGNvbXBvbmVudERhdGEgJiZcbiAgICAgICAgbm9kZS5zZXRQbHVnaW5EYXRhKCdjb21wb25lbnREYXRhJywgSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50RGF0YSkpO1xufTtcbmNvbnN0IHNldFRva2VucyA9IChub2RlSWQsIHRva2VucykgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5maW5kT25lKChub2RlKSA9PiBub2RlLmlkID09PSBub2RlSWQpO1xuICAgIGlmICghbm9kZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBDYW4ndCBmaW5kIE5vZGVJZDogJHtub2RlSWR9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCB0b2tlbiBvZiB0b2tlbnMpIHtcbiAgICAgICAgc2V0VG9rZW5Ub05vZGUobm9kZSwgdG9rZW4pO1xuICAgIH1cbiAgICBzZXRQbHVnaW5EYXRhKG5vZGUsIHsgdG9rZW5zIH0pO1xufTtcbmNvbnN0IHVwZGF0ZVRva2Vuc09uTm9kZSA9IChub2RlLCBub2RlVG9rZW5zLCBhbGxUb2tlbnMpID0+IHtcbiAgICBjb25zdCBuZXdUb2tlbnMgPSBub2RlVG9rZW5zLm1hcCgodG9rZW4pID0+IHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBhbGxUb2tlbnNbdG9rZW4ubmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZVtrZXldICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlW2tleV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0pO1xuICAgIHNldFRva2Vucyhub2RlLmlkLCBuZXdUb2tlbnMpO1xufTtcbmZpZ21hLm9uKCdzZWxlY3Rpb25jaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlOiBGaWdtYU1lc3NhZ2VUeXBlLkNMRUFSX1NFTEVDVElPTiB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogRmlnbWFNZXNzYWdlVHlwZS5TRUxFQ1RfTk9ERSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBub2Rlczogbm9kZXMubWFwKChuKSA9PiAoT2JqZWN0LmFzc2lnbih7IG5vZGVJZDogbi5pZCB9LCBnZXRQbHVnaW5EYXRhKG4pKSkpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5jb25zdCBnZXRWYXJpbmF0TmFtZUZyb21Qcm9wcyA9IChwcm9wcykgPT4ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wcylcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09ICdjaGlsZHJlbicpXG4gICAgICAgIC5tYXAoKGtleSkgPT4gYCR7a2V5fT0ke3Byb3BzW2tleV19YClcbiAgICAgICAgLmpvaW4oJywgJyk7XG59O1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgaWYgKG1zZy50eXBlID09PSBGaWdtYU1lc3NhZ2VUeXBlLklNUE9SVF9WQVJJQU5UUykge1xuICAgICAgICB5aWVsZCBmaWdtYS5sb2FkRm9udEFzeW5jKGRlZmF1bHRGb250KTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiB7IGxheWVycywgY29tcG9uZW50c0RhdGEgfSwgfSA9IG1zZztcbiAgICAgICAgbGV0IGJhc2VGcmFtZSA9IGZpZ21hLmN1cnJlbnRQYWdlO1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGZpZ21hLnZpZXdwb3J0LmNlbnRlcjtcbiAgICAgICAgbGF5ZXJzWzBdLnggPSB4O1xuICAgICAgICBsYXllcnNbMF0ueSA9IHk7XG4gICAgICAgIGxldCBvZmZzZXRUb3AgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xuICAgICAgICAgICAgbGF5ZXIueCA9IHg7XG4gICAgICAgICAgICBsYXllci55ID0geSArIG9mZnNldFRvcDtcbiAgICAgICAgICAgIG9mZnNldFRvcCArPSAoKGxheWVyID09PSBudWxsIHx8IGxheWVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXllci5oZWlnaHQpIHx8IDEwMCkgKyAxMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50TGF5ZXJzID0gbGF5ZXJzLm1hcCgobGF5ZXIpID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxheWVyKSwgeyB0eXBlOiAnQ09NUE9ORU5UJyB9KSkpO1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgIHlpZWxkIGFkZExheWVyc1RvRnJhbWUoY29tcG9uZW50TGF5ZXJzLCBiYXNlRnJhbWUsICh7IG5vZGUsIHBhcmVudCB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjb21wb25lbnROb2RlID0gZmlnbWEuY29tYmluZUFzVmFyaWFudHMobm9kZXMsIGJhc2VGcmFtZSk7XG4gICAgICAgIGNvbXBvbmVudE5vZGUubmFtZSA9IGNvbXBvbmVudHNEYXRhWzBdLm5hbWU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgICAgIG5vZGVzW2ldLm5hbWUgPSBnZXRWYXJpbmF0TmFtZUZyb21Qcm9wcyhjb21wb25lbnRzRGF0YVtpXS5wcm9wcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBGaWdtYU1lc3NhZ2VUeXBlLklNUE9SVCkge1xuICAgICAgICB5aWVsZCBmaWdtYS5sb2FkRm9udEFzeW5jKGRlZmF1bHRGb250KTtcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBtc2c7XG4gICAgICAgIGxldCB7IGxheWVycywgcG9zaXRpb24sIG5hbWUsIHByb3BzIH0gPSBkYXRhO1xuICAgICAgICBsZXQgYmFzZUZyYW1lID0gZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gZ2V0RHJvcE9mZnNldChwb3NpdGlvbik7XG4gICAgICAgIC8vIGxldCBjdXJyZW50Tm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRPbmUobiA9PiBuLm5hbWUgPT09IG5hbWUpO1xuICAgICAgICAvLyBpZiAoY3VycmVudE5vZGUpIHtcbiAgICAgICAgLy8gICAgIHggPSBjdXJyZW50Tm9kZS54O1xuICAgICAgICAvLyAgICAgeSA9IGN1cnJlbnROb2RlLnk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgbGF5ZXJzLnggPSB4O1xuICAgICAgICBsYXllcnMueSA9IHk7XG4gICAgICAgIHlpZWxkIGFkZExheWVyc1RvRnJhbWUoW2xheWVyc10sIGJhc2VGcmFtZSwgKHsgbm9kZSwgcGFyZW50IH0pID0+IHtcbiAgICAgICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgc2V0UGx1Z2luRGF0YShub2RlLCB7IGNvbXBvbmVudERhdGE6IHsgbmFtZSwgcHJvcHMgfSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gRmlnbWFNZXNzYWdlVHlwZS5BUFBMWV9UT0tFTikge1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IG1zZztcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBkYXRhLm5vZGVzKSB7XG4gICAgICAgICAgICBzZXRUb2tlbnMobm9kZS5ub2RlSWQsIG5vZGUudG9rZW5zIHx8IFtdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IEZpZ21hTWVzc2FnZVR5cGUuQVBQTFlfVE9LRU5TKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gbXNnO1xuICAgICAgICBjb25zdCBhbGxOb2RlcyA9IGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRBbGwoKF8pID0+IHRydWUpO1xuICAgICAgICBjb25zdCBub2Rlc1dpdGhUb2tlbnMgPSBhbGxOb2Rlc1xuICAgICAgICAgICAgLm1hcCgobm9kZSkgPT4gKHsgdG9rZW5zOiBnZXRQbHVnaW5EYXRhKG5vZGUpLnRva2Vucywgbm9kZSB9KSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHsgdG9rZW5zIH0pID0+IHRva2Vucyk7XG4gICAgICAgIGZvciAobGV0IHsgdG9rZW5zLCBub2RlIH0gb2Ygbm9kZXNXaXRoVG9rZW5zKSB7XG4gICAgICAgICAgICB1cGRhdGVUb2tlbnNPbk5vZGUobm9kZSwgdG9rZW5zLCBkYXRhLnRva2Vucyk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==