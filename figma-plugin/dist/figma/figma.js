/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/html-figma/figma/dropOffset.js":
/*!*****************************************************!*\
  !*** ./node_modules/html-figma/figma/dropOffset.js ***!
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
    console.log(
        payload, 
        {x: bounds.x + xFromCanvas / zoom - offset.x, y: bounds.y + yFromCanvas / zoom - offset.y },
        bounds,
    );
    return {
        // x: bounds.x + xFromCanvas / zoom - offset.x,
        // y: bounds.y + yFromCanvas / zoom - offset.y
        x: bounds.x + xFromCanvas / zoom - offset.x,
        y: bounds.y + yFromCanvas / zoom - offset.y
    };
}


/***/ }),

/***/ "./node_modules/html-figma/figma/getFont.js":
/*!**************************************************!*\
  !*** ./node_modules/html-figma/figma/getFont.js ***!
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

/***/ "./node_modules/html-figma/figma/helpers.js":
/*!**************************************************!*\
  !*** ./node_modules/html-figma/figma/helpers.js ***!
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

/***/ "./node_modules/html-figma/figma/images.js":
/*!*************************************************!*\
  !*** ./node_modules/html-figma/figma/images.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processImages": function() { return /* binding */ processImages; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./node_modules/html-figma/utils.js");
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

/***/ "./node_modules/html-figma/figma/index.js":
/*!************************************************!*\
  !*** ./node_modules/html-figma/figma/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLayersToFrame": function() { return /* binding */ addLayersToFrame; },
/* harmony export */   "defaultFont": function() { return /* reexport safe */ _getFont__WEBPACK_IMPORTED_MODULE_2__.defaultFont; },
/* harmony export */   "getMatchingFont": function() { return /* reexport safe */ _getFont__WEBPACK_IMPORTED_MODULE_2__.getMatchingFont; },
/* harmony export */   "getDropOffset": function() { return /* reexport safe */ _dropOffset__WEBPACK_IMPORTED_MODULE_3__.getDropOffset; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./node_modules/html-figma/utils.js");
/* harmony import */ var _processLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processLayer */ "./node_modules/html-figma/figma/processLayer.js");
/* harmony import */ var _getFont__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getFont */ "./node_modules/html-figma/figma/getFont.js");
/* harmony import */ var _dropOffset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropOffset */ "./node_modules/html-figma/figma/dropOffset.js");
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

/***/ "./node_modules/html-figma/figma/processLayer.js":
/*!*******************************************************!*\
  !*** ./node_modules/html-figma/figma/processLayer.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processLayer": function() { return /* binding */ processLayer; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./node_modules/html-figma/utils.js");
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images */ "./node_modules/html-figma/figma/images.js");
/* harmony import */ var _getFont__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getFont */ "./node_modules/html-figma/figma/getFont.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./node_modules/html-figma/figma/helpers.js");
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
};
const SIMPLE_TYPES = ['FRAME', 'GROUP', 'SVG', 'RECTANGLE'];
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

/***/ "./node_modules/html-figma/utils.js":
/*!******************************************!*\
  !*** ./node_modules/html-figma/utils.js ***!
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
/* harmony import */ var html_figma_figma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-figma/figma */ "./node_modules/html-figma/figma/index.js");
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
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'import') {
        yield figma.loadFontAsync(html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.defaultFont);
        const { data } = msg;
        let { layers, position } = data;
        let baseFrame = figma.currentPage;
        const { x, y } = (0,html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.getDropOffset)(position);
        // let currentNode = figma.currentPage.findOne(n => n.name === name);
        // if (currentNode) {
        //     x = currentNode.x;
        //     y = currentNode.y;
        // }
        layers.x = x;
        layers.y = y;
        yield (0,html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.addLayersToFrame)([layers], baseFrame);
        // currentNode?.remove();
    }
});

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7Ozs7OztVQ3pLUDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDZ0Y7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLGtDQUFrQyx5REFBVztBQUM3QyxnQkFBZ0IsT0FBTztBQUN2QixjQUFjLG1CQUFtQjtBQUNqQztBQUNBLGdCQUFnQixPQUFPLEVBQUUsK0RBQWE7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGtFQUFnQjtBQUM5QjtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uL25vZGVfbW9kdWxlcy9odG1sLWZpZ21hL2ZpZ21hL2Ryb3BPZmZzZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4vbm9kZV9tb2R1bGVzL2h0bWwtZmlnbWEvZmlnbWEvZ2V0Rm9udC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi9ub2RlX21vZHVsZXMvaHRtbC1maWdtYS9maWdtYS9oZWxwZXJzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uL25vZGVfbW9kdWxlcy9odG1sLWZpZ21hL2ZpZ21hL2ltYWdlcy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi9ub2RlX21vZHVsZXMvaHRtbC1maWdtYS9maWdtYS9pbmRleC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi9ub2RlX21vZHVsZXMvaHRtbC1maWdtYS9maWdtYS9wcm9jZXNzTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4vbm9kZV9tb2R1bGVzL2h0bWwtZmlnbWEvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4vc3JjL2ZpZ21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RHJvcE9mZnNldChwYXlsb2FkKSB7XG4gICAgY29uc3QgeyBkcm9wUG9zaXRpb24sIHdpbmRvd1NpemUsIG9mZnNldCB9ID0gcGF5bG9hZDtcbiAgICBjb25zdCB7IGJvdW5kcywgem9vbSB9ID0gZmlnbWEudmlld3BvcnQ7XG4gICAgY29uc3QgaGFzVUkgPSBNYXRoLmFicygoYm91bmRzLndpZHRoICogem9vbSkgLyB3aW5kb3dTaXplLndpZHRoKSA8IDAuOTk7XG5cbiAgICBjb25zdCBsZWZ0UGFuZVdpZHRoID0gd2luZG93U2l6ZS53aWR0aCAtIGJvdW5kcy53aWR0aCAqIHpvb20gLSAyNDA7XG4gICAgY29uc3QgeEZyb21DYW52YXMgPSBoYXNVSVxuICAgICAgICA/IGRyb3BQb3NpdGlvbi5jbGllbnRYIC0gbGVmdFBhbmVXaWR0aFxuICAgICAgICA6IGRyb3BQb3NpdGlvbi5jbGllbnRYO1xuICAgIGNvbnN0IHlGcm9tQ2FudmFzID0gaGFzVUkgPyBkcm9wUG9zaXRpb24uY2xpZW50WSAtIDQwIDogZHJvcFBvc2l0aW9uLmNsaWVudFk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAgIHBheWxvYWQsIFxuICAgICAgICB7eDogYm91bmRzLnggKyB4RnJvbUNhbnZhcyAvIHpvb20gLSBvZmZzZXQueCwgeTogYm91bmRzLnkgKyB5RnJvbUNhbnZhcyAvIHpvb20gLSBvZmZzZXQueSB9LFxuICAgICAgICBib3VuZHMsXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgICAvLyB4OiBib3VuZHMueCArIHhGcm9tQ2FudmFzIC8gem9vbSAtIG9mZnNldC54LFxuICAgICAgICAvLyB5OiBib3VuZHMueSArIHlGcm9tQ2FudmFzIC8gem9vbSAtIG9mZnNldC55XG4gICAgICAgIHg6IGJvdW5kcy54ICsgeEZyb21DYW52YXMgLyB6b29tIC0gb2Zmc2V0LngsXG4gICAgICAgIHk6IGJvdW5kcy55ICsgeUZyb21DYW52YXMgLyB6b29tIC0gb2Zmc2V0LnlcbiAgICB9O1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jb25zdCBmb250Q2FjaGUgPSB7fTtcbmNvbnN0IG5vcm1hbGl6ZU5hbWUgPSAoc3RyKSA9PiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtel0vZ2ksICcnKTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0Rm9udCA9IHsgZmFtaWx5OiAnUm9ib3RvJywgc3R5bGU6ICdSZWd1bGFyJyB9O1xubGV0IGNhY2hlZEF2YWlsYWJsZUZvbnRzID0gbnVsbDtcbmNvbnN0IGdldEF2YWlsYWJsZUZvbnROYW1lcyA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGlmIChjYWNoZWRBdmFpbGFibGVGb250cykge1xuICAgICAgICByZXR1cm4gY2FjaGVkQXZhaWxhYmxlRm9udHM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKHlpZWxkIGZpZ21hLmxpc3RBdmFpbGFibGVGb250c0FzeW5jKCkpLmZpbHRlcigoZm9udCkgPT4gZm9udC5mb250TmFtZS5zdHlsZSA9PT0gJ1JlZ3VsYXInKTtcbiAgICB9XG59KTtcbi8vIFRPRE86IGtlZXAgbGlzdCBvZiBmb250cyBub3QgZm91bmRcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRjaGluZ0ZvbnQoZm9udFN0cikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGZvbnRDYWNoZVtmb250U3RyXTtcbiAgICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhdmFpbGFibGVGb250cyA9IHlpZWxkIGdldEF2YWlsYWJsZUZvbnROYW1lcygpO1xuICAgICAgICBjb25zdCBmYW1pbHlTcGxpdCA9IGZvbnRTdHIuc3BsaXQoL1xccyosXFxzKi8pO1xuICAgICAgICBmb3IgKGNvbnN0IGZhbWlseSBvZiBmYW1pbHlTcGxpdCkge1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZU5hbWUoZmFtaWx5KTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXZhaWxhYmxlRm9udCBvZiBhdmFpbGFibGVGb250cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBdmFpbGFibGUgPSBub3JtYWxpemVOYW1lKGF2YWlsYWJsZUZvbnQuZm9udE5hbWUuZmFtaWx5KTtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZEF2YWlsYWJsZSA9PT0gbm9ybWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZWQgPSBmb250Q2FjaGVbbm9ybWFsaXplZEF2YWlsYWJsZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgeWllbGQgZmlnbWEubG9hZEZvbnRBc3luYyhhdmFpbGFibGVGb250LmZvbnROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgZm9udENhY2hlW2ZvbnRTdHJdID0gYXZhaWxhYmxlRm9udC5mb250TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZm9udENhY2hlW25vcm1hbGl6ZWRBdmFpbGFibGVdID0gYXZhaWxhYmxlRm9udC5mb250TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF2YWlsYWJsZUZvbnQuZm9udE5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZhdWx0Rm9udDtcbiAgICB9KTtcbn1cbiIsImNvbnN0IGFsbFByb3BlcnR5TmFtZXMgPSBbXG4gICAgJ2lkJyxcbiAgICAnd2lkdGgnLFxuICAgICdoZWlnaHQnLFxuICAgICdjdXJyZW50UGFnZScsXG4gICAgJ2NhbmNlbCcsXG4gICAgJ29yaWdpbicsXG4gICAgJ29ubWVzc2FnZScsXG4gICAgJ2NlbnRlcicsXG4gICAgJ3pvb20nLFxuICAgICdmb250TmFtZScsXG4gICAgJ25hbWUnLFxuICAgICd2aXNpYmxlJyxcbiAgICAnbG9ja2VkJyxcbiAgICAnY29uc3RyYWludHMnLFxuICAgICdyZWxhdGl2ZVRyYW5zZm9ybScsXG4gICAgJ3gnLFxuICAgICd5JyxcbiAgICAncm90YXRpb24nLFxuICAgICdjb25zdHJhaW5Qcm9wb3J0aW9ucycsXG4gICAgJ2xheW91dEFsaWduJyxcbiAgICAnbGF5b3V0R3JvdycsXG4gICAgJ29wYWNpdHknLFxuICAgICdibGVuZE1vZGUnLFxuICAgICdpc01hc2snLFxuICAgICdlZmZlY3RzJyxcbiAgICAnZWZmZWN0U3R5bGVJZCcsXG4gICAgJ2V4cGFuZGVkJyxcbiAgICAnYmFja2dyb3VuZHMnLFxuICAgICdiYWNrZ3JvdW5kU3R5bGVJZCcsXG4gICAgJ2ZpbGxzJyxcbiAgICAnc3Ryb2tlcycsXG4gICAgJ3N0cm9rZVdlaWdodCcsXG4gICAgJ3N0cm9rZU1pdGVyTGltaXQnLFxuICAgICdzdHJva2VBbGlnbicsXG4gICAgJ3N0cm9rZUNhcCcsXG4gICAgJ3N0cm9rZUpvaW4nLFxuICAgICdkYXNoUGF0dGVybicsXG4gICAgJ2ZpbGxTdHlsZUlkJyxcbiAgICAnc3Ryb2tlU3R5bGVJZCcsXG4gICAgJ2Nvcm5lclJhZGl1cycsXG4gICAgJ2Nvcm5lclNtb290aGluZycsXG4gICAgJ3RvcExlZnRSYWRpdXMnLFxuICAgICd0b3BSaWdodFJhZGl1cycsXG4gICAgJ2JvdHRvbUxlZnRSYWRpdXMnLFxuICAgICdib3R0b21SaWdodFJhZGl1cycsXG4gICAgJ2V4cG9ydFNldHRpbmdzJyxcbiAgICAnb3ZlcmZsb3dEaXJlY3Rpb24nLFxuICAgICdudW1iZXJPZkZpeGVkQ2hpbGRyZW4nLFxuICAgICdkZXNjcmlwdGlvbicsXG4gICAgJ2xheW91dE1vZGUnLFxuICAgICdwcmltYXJ5QXhpc1NpemluZ01vZGUnLFxuICAgICdjb3VudGVyQXhpc1NpemluZ01vZGUnLFxuICAgICdwcmltYXJ5QXhpc0FsaWduSXRlbXMnLFxuICAgICdjb3VudGVyQXhpc0FsaWduSXRlbXMnLFxuICAgICdwYWRkaW5nTGVmdCcsXG4gICAgJ3BhZGRpbmdSaWdodCcsXG4gICAgJ3BhZGRpbmdUb3AnLFxuICAgICdwYWRkaW5nQm90dG9tJyxcbiAgICAnaXRlbVNwYWNpbmcnLFxuICAgICdsYXlvdXRHcmlkcycsXG4gICAgJ2dyaWRTdHlsZUlkJyxcbiAgICAnY2xpcHNDb250ZW50JyxcbiAgICAnZ3VpZGVzJyxcbiAgICAnZ3VpZGVzJyxcbiAgICAnc2VsZWN0aW9uJyxcbiAgICAnc2VsZWN0ZWRUZXh0UmFuZ2UnLFxuICAgICdiYWNrZ3JvdW5kcycsXG4gICAgJ2FyY0RhdGEnLFxuICAgICdwb2ludENvdW50JyxcbiAgICAncG9pbnRDb3VudCcsXG4gICAgJ2lubmVyUmFkaXVzJyxcbiAgICAndmVjdG9yTmV0d29yaycsXG4gICAgJ3ZlY3RvclBhdGhzJyxcbiAgICAnaGFuZGxlTWlycm9yaW5nJyxcbiAgICAndGV4dEFsaWduSG9yaXpvbnRhbCcsXG4gICAgJ3RleHRBbGlnblZlcnRpY2FsJyxcbiAgICAndGV4dEF1dG9SZXNpemUnLFxuICAgICdwYXJhZ3JhcGhJbmRlbnQnLFxuICAgICdwYXJhZ3JhcGhTcGFjaW5nJyxcbiAgICAnYXV0b1JlbmFtZScsXG4gICAgJ3RleHRTdHlsZUlkJyxcbiAgICAnZm9udFNpemUnLFxuICAgICdmb250TmFtZScsXG4gICAgJ3RleHRDYXNlJyxcbiAgICAndGV4dERlY29yYXRpb24nLFxuICAgICdsZXR0ZXJTcGFjaW5nJyxcbiAgICAnbGluZUhlaWdodCcsXG4gICAgJ2NoYXJhY3RlcnMnLFxuICAgICdtYWluQ29tcG9uZW50JyxcbiAgICAnc2NhbGVGYWN0b3InLFxuICAgICdib29sZWFuT3BlcmF0aW9uJyxcbiAgICAnZXhwYW5kZWQnLFxuICAgICduYW1lJyxcbiAgICAndHlwZScsXG4gICAgJ3BhaW50cycsXG4gICAgJ3R5cGUnLFxuICAgICdmb250U2l6ZScsXG4gICAgJ3RleHREZWNvcmF0aW9uJyxcbiAgICAnZm9udE5hbWUnLFxuICAgICdsZXR0ZXJTcGFjaW5nJyxcbiAgICAnbGluZUhlaWdodCcsXG4gICAgJ3BhcmFncmFwaEluZGVudCcsXG4gICAgJ3BhcmFncmFwaFNwYWNpbmcnLFxuICAgICd0ZXh0Q2FzZScsXG4gICAgJ3R5cGUnLFxuICAgICdlZmZlY3RzJyxcbiAgICAndHlwZScsXG4gICAgJ2xheW91dEdyaWRzJyxcbl07XG5leHBvcnQgZnVuY3Rpb24gYXNzaWduKGEsIGIpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBiKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYltrZXldO1xuICAgICAgICBpZiAoa2V5ID09PSAnZGF0YScgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGEgPSBKU09OLnBhcnNlKGEuZ2V0U2hhcmVkUGx1Z2luRGF0YSgnYnVpbGRlcicsICdkYXRhJykgfHwgJ3t9JykgfHxcbiAgICAgICAgICAgICAgICB7fTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0RhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBjdXJyZW50RGF0YSwgbmV3RGF0YSk7XG4gICAgICAgICAgICAvLyBUT0RPIG1lcmdlIHBsdWdpbiBkYXRhXG4gICAgICAgICAgICBhLnNldFNoYXJlZFBsdWdpbkRhdGEoJ2J1aWxkZXInLCAnZGF0YScsIEpTT04uc3RyaW5naWZ5KG1lcmdlZERhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIFsnd2lkdGgnLCAnaGVpZ2h0JywgJ3R5cGUnLCAncmVmJywgJ2NoaWxkcmVuJywgJ3N2ZyddLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQXNzaWduIGVycm9yIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiYCwgYSwgYiwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIFRoZSBGaWdtYSBub2RlcyBhcmUgaGFyZCB0byBpbnNwZWN0IGF0IGEgZ2xhbmNlIGJlY2F1c2UgYWxtb3N0IGFsbCBwcm9wZXJ0aWVzIGFyZSBub24gZW51bWVyYWJsZVxuLy8gZ2V0dGVycy4gVGhpcyByZW1vdmVzIHRoYXQgd3JhcHBpbmcgZm9yIGVhc2llciBpbnNwZWN0aW5nXG5leHBvcnQgY29uc3QgY2xvbmVPYmplY3QgPSAob2JqLCB2YWx1ZXNTZXQgPSBuZXcgU2V0KCkpID0+IHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBjb25zdCBuZXdPYmogPSBBcnJheS5pc0FycmF5KG9iaikgPyBbXSA6IHt9O1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgYWxsUHJvcGVydHlOYW1lcykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtwcm9wZXJ0eV07XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICAgIG5ld09ialtwcm9wZXJ0eV0gPSBvYmpbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdPYmo7XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBnZXRJbWFnZUZpbGxzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0ltYWdlcyhsYXllcikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGltYWdlcyA9IGdldEltYWdlRmlsbHMobGF5ZXIpO1xuICAgICAgICByZXR1cm4gKGltYWdlcyAmJlxuICAgICAgICAgICAgUHJvbWlzZS5hbGwoaW1hZ2VzLm1hcCgoaW1hZ2UpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2UgJiYgaW1hZ2UuaW50QXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLmltYWdlSGFzaCA9IHlpZWxkIGZpZ21hLmNyZWF0ZUltYWdlKGltYWdlLmludEFycilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNoO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaW1hZ2UuaW50QXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKSkpO1xuICAgIH0pO1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyB0cmF2ZXJzZUFzeW5jIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcHJvY2Vzc0xheWVyIH0gZnJvbSAnLi9wcm9jZXNzTGF5ZXInO1xuZXhwb3J0IGZ1bmN0aW9uIGFkZExheWVyc1RvRnJhbWUobGF5ZXJzLCBiYXNlRnJhbWUsIG9uTGF5ZXJQcm9jZXNzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgZm9yIChjb25zdCByb290TGF5ZXIgb2YgbGF5ZXJzKSB7XG4gICAgICAgICAgICB5aWVsZCB0cmF2ZXJzZUFzeW5jKHJvb3RMYXllciwgKGxheWVyLCBwYXJlbnQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlID0geWllbGQgcHJvY2Vzc0xheWVyKGxheWVyLCBwYXJlbnQsIGJhc2VGcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIG9uTGF5ZXJQcm9jZXNzID09PSBudWxsIHx8IG9uTGF5ZXJQcm9jZXNzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvbkxheWVyUHJvY2Vzcyh7IG5vZGUsIGxheWVyLCBwYXJlbnQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdFcnJvciBvbiBsYXllcjonLCBsYXllciwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCAqIGZyb20gJy4vZ2V0Rm9udCc7XG5leHBvcnQgKiBmcm9tICcuL2Ryb3BPZmZzZXQnO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBnZXRJbWFnZUZpbGxzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBwcm9jZXNzSW1hZ2VzIH0gZnJvbSBcIi4vaW1hZ2VzXCI7XG5pbXBvcnQgeyBnZXRNYXRjaGluZ0ZvbnQgfSBmcm9tIFwiLi9nZXRGb250XCI7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5jb25zdCBwcm9jZXNzRGVmYXVsdEVsZW1lbnQgPSAobGF5ZXIsIG5vZGUpID0+IHtcbiAgICBub2RlLnggPSBsYXllci54O1xuICAgIG5vZGUueSA9IGxheWVyLnk7XG4gICAgbm9kZS5yZXNpemUobGF5ZXIud2lkdGggfHwgMSwgbGF5ZXIuaGVpZ2h0IHx8IDEpO1xuICAgIGFzc2lnbihub2RlLCBsYXllcik7XG4gICAgLy8gcmVjdHMucHVzaChmcmFtZSk7XG4gICAgcmV0dXJuIG5vZGU7XG59O1xuY29uc3QgY3JlYXRlTm9kZUZyb21MYXllciA9IChsYXllcikgPT4ge1xuICAgIGlmIChsYXllci50eXBlID09PSAnRlJBTUUnIHx8IGxheWVyLnR5cGUgPT09ICdHUk9VUCcpIHtcbiAgICAgICAgcmV0dXJuIGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgfVxuICAgIGlmIChsYXllci50eXBlID09PSAnU1ZHJyAmJiBsYXllci5zdmcpIHtcbiAgICAgICAgcmV0dXJuIGZpZ21hLmNyZWF0ZU5vZGVGcm9tU3ZnKGxheWVyLnN2Zyk7XG4gICAgfVxuICAgIGlmIChsYXllci50eXBlID09PSAnUkVDVEFOR0xFJykge1xuICAgICAgICByZXR1cm4gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4gICAgfVxuICAgIGlmIChsYXllci50eXBlID09PSAnVEVYVCcpIHtcbiAgICAgICAgcmV0dXJuIGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICB9XG59O1xuY29uc3QgU0lNUExFX1RZUEVTID0gWydGUkFNRScsICdHUk9VUCcsICdTVkcnLCAnUkVDVEFOR0xFJ107XG5leHBvcnQgY29uc3QgcHJvY2Vzc0xheWVyID0gKGxheWVyLCBwYXJlbnQsIGJhc2VGcmFtZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgcGFyZW50RnJhbWUgPSAocGFyZW50ID09PSBudWxsIHx8IHBhcmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50LnJlZikgfHwgYmFzZUZyYW1lO1xuICAgIGlmICh0eXBlb2YgbGF5ZXIueCAhPT0gJ251bWJlcicgfHwgdHlwZW9mIGxheWVyLnkgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdMYXllciBjb29yZHMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZU5vZGVGcm9tTGF5ZXIobGF5ZXIpO1xuICAgIGlmICghbm9kZSkge1xuICAgICAgICB0aHJvdyBFcnJvcihgJHtsYXllci50eXBlfSBub3QgaW1wbGVtZW50ZWRgKTtcbiAgICB9XG4gICAgaWYgKFNJTVBMRV9UWVBFUy5pbmNsdWRlcyhsYXllci50eXBlKSkge1xuICAgICAgICBwYXJlbnRGcmFtZS5hcHBlbmRDaGlsZChwcm9jZXNzRGVmYXVsdEVsZW1lbnQobGF5ZXIsIG5vZGUpKTtcbiAgICB9XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIGxheWVyLnJlZiA9IG5vZGU7XG4gICAgaWYgKGxheWVyLnR5cGUgPT09ICdSRUNUQU5HTEUnKSB7XG4gICAgICAgIGlmIChnZXRJbWFnZUZpbGxzKGxheWVyKSkge1xuICAgICAgICAgICAgeWllbGQgcHJvY2Vzc0ltYWdlcyhsYXllcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxheWVyLnR5cGUgPT09ICdURVhUJykge1xuICAgICAgICBjb25zdCB0ZXh0ID0gbm9kZTtcbiAgICAgICAgaWYgKGxheWVyLmZvbnRGYW1pbHkpIHtcbiAgICAgICAgICAgIHRleHQuZm9udE5hbWUgPSB5aWVsZCBnZXRNYXRjaGluZ0ZvbnQobGF5ZXIuZm9udEZhbWlseSk7XG4gICAgICAgICAgICBkZWxldGUgbGF5ZXIuZm9udEZhbWlseTtcbiAgICAgICAgfVxuICAgICAgICBhc3NpZ24odGV4dCwgbGF5ZXIpO1xuICAgICAgICB0ZXh0LnJlc2l6ZShsYXllci53aWR0aCB8fCAxLCBsYXllci5oZWlnaHQgfHwgMSk7XG4gICAgICAgIHRleHQudGV4dEF1dG9SZXNpemUgPSAnSEVJR0hUJztcbiAgICAgICAgbGV0IGFkanVzdG1lbnRzID0gMDtcbiAgICAgICAgaWYgKGxheWVyLmxpbmVIZWlnaHQpIHtcbiAgICAgICAgICAgIHRleHQubGluZUhlaWdodCA9IGxheWVyLmxpbmVIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRqdXN0IHRleHQgd2lkdGhcbiAgICAgICAgd2hpbGUgKHR5cGVvZiBsYXllci5oZWlnaHQgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICB0ZXh0LmhlaWdodCA+IGxheWVyLmhlaWdodCkge1xuICAgICAgICAgICAgaWYgKGFkanVzdG1lbnRzKysgPiA1KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdUb28gbWFueSBmb250IGFkanVzdG1lbnRzJywgdGV4dCwgbGF5ZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0ZXh0LnJlc2l6ZSh0ZXh0LndpZHRoICsgMSwgdGV4dC5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRXJyb3Igb24gcmVzaXplIHRleHQ6JywgbGF5ZXIsIHRleHQsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50RnJhbWUuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufSk7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBoYXNDaGlsZHJlbiA9IChub2RlKSA9PiBcbi8vIEB0cy1leHBlY3QtZXJyb3Jcbm5vZGUgJiYgQXJyYXkuaXNBcnJheShub2RlLmNoaWxkcmVuKTtcbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZShsYXllciwgY2IsIHBhcmVudCA9IG51bGwpIHtcbiAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgY2IobGF5ZXIsIHBhcmVudCk7XG4gICAgICAgIGlmIChoYXNDaGlsZHJlbihsYXllcikpIHtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgICAgIGxheWVyLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB0cmF2ZXJzZShjaGlsZCwgY2IsIGxheWVyKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VNYXAobGF5ZXIsIGNiLCBwYXJlbnQgPSBudWxsKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmIChsYXllcikge1xuICAgICAgICBjb25zdCBuZXdMYXllciA9IGNiKGxheWVyLCBwYXJlbnQpO1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgIGlmICgoX2EgPSBuZXdMYXllciA9PT0gbnVsbCB8fCBuZXdMYXllciA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3TGF5ZXIuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgICAgIG5ld0xheWVyLmNoaWxkcmVuID0gbmV3TGF5ZXIuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gdHJhdmVyc2VNYXAoY2hpbGQsIGNiLCBsYXllcikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdMYXllcjtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VBc3luYyhsYXllciwgY2IsIHBhcmVudCA9IG51bGwpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgIHlpZWxkIGNiKGxheWVyLCBwYXJlbnQpO1xuICAgICAgICAgICAgaWYgKGhhc0NoaWxkcmVuKGxheWVyKSkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBsYXllci5jaGlsZHJlbi5yZXZlcnNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgdHJhdmVyc2VBc3luYyhjaGlsZCwgY2IsIGxheWVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzaXplKG9iaikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aDtcbn1cbmV4cG9ydCBjb25zdCBjYXBpdGFsaXplID0gKHN0cikgPT4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc3Vic3RyaW5nKDEpO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJnYihjb2xvclN0cmluZykge1xuICAgIGlmICghY29sb3JTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IFtfMSwgciwgZywgYiwgXzIsIGFdID0gKGNvbG9yU3RyaW5nLm1hdGNoKC9yZ2JhP1xcKChbXFxkXFwuXSspLCAoW1xcZFxcLl0rKSwgKFtcXGRcXC5dKykoLCAoW1xcZFxcLl0rKSk/XFwpLykgfHwgW10pO1xuICAgIGNvbnN0IG5vbmUgPSBhICYmIHBhcnNlRmxvYXQoYSkgPT09IDA7XG4gICAgaWYgKHIgJiYgZyAmJiBiICYmICFub25lKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBwYXJzZUludChyKSAvIDI1NSxcbiAgICAgICAgICAgIGc6IHBhcnNlSW50KGcpIC8gMjU1LFxuICAgICAgICAgICAgYjogcGFyc2VJbnQoYikgLyAyNTUsXG4gICAgICAgICAgICBhOiBhID8gcGFyc2VGbG9hdChhKSA6IDEsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0IGNvbnN0IGZhc3RDbG9uZSA9IChkYXRhKSA9PiB0eXBlb2YgZGF0YSA9PT0gJ3N5bWJvbCcgPyBudWxsIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5leHBvcnQgY29uc3QgdG9OdW0gPSAodikgPT4ge1xuICAgIC8vIGlmICghL3B4JC8udGVzdCh2KSAmJiB2ICE9PSAnMCcpIHJldHVybiB2O1xuICAgIGlmICghL3B4JC8udGVzdCh2KSAmJiB2ICE9PSAnMCcpXG4gICAgICAgIHJldHVybiAwO1xuICAgIGNvbnN0IG4gPSBwYXJzZUZsb2F0KHYpO1xuICAgIC8vIHJldHVybiAhaXNOYU4obikgPyBuIDogdjtcbiAgICByZXR1cm4gIWlzTmFOKG4pID8gbiA6IDA7XG59O1xuZXhwb3J0IGNvbnN0IHRvUGVyY2VudCA9ICh2KSA9PiB7XG4gICAgLy8gaWYgKCEvcHgkLy50ZXN0KHYpICYmIHYgIT09ICcwJykgcmV0dXJuIHY7XG4gICAgaWYgKCEvJSQvLnRlc3QodikgJiYgdiAhPT0gJzAnKVxuICAgICAgICByZXR1cm4gMDtcbiAgICBjb25zdCBuID0gcGFyc2VJbnQodik7XG4gICAgLy8gcmV0dXJuICFpc05hTihuKSA/IG4gOiB2O1xuICAgIHJldHVybiAhaXNOYU4obikgPyBuIC8gMTAwIDogMDtcbn07XG5leHBvcnQgY29uc3QgcGFyc2VVbml0cyA9IChzdHIsIHJlbGF0aXZlKSA9PiB7XG4gICAgaWYgKCFzdHIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCB2YWx1ZSA9IHRvTnVtKHN0cik7XG4gICAgaWYgKHJlbGF0aXZlICYmICF2YWx1ZSkge1xuICAgICAgICBjb25zdCBwZXJjZW50ID0gdG9QZXJjZW50KHN0cik7XG4gICAgICAgIGlmICghcGVyY2VudClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB2YWx1ZSA9IHJlbGF0aXZlICogcGVyY2VudDtcbiAgICB9XG4gICAgLy8gY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goLyhbXFxkXFwuXSspcHgvKTtcbiAgICAvLyBjb25zdCB2YWwgPSBtYXRjaCAmJiBtYXRjaFsxXTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVuaXQ6ICdQSVhFTFMnLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmNvbnN0IExFTkdUSF9SRUcgPSAvXlswLTldK1thLXpBLVolXSs/JC87XG5jb25zdCBpc0xlbmd0aCA9ICh2KSA9PiB2ID09PSAnMCcgfHwgTEVOR1RIX1JFRy50ZXN0KHYpO1xuY29uc3QgcGFyc2VNdWx0aXBsZUNTU1ZhbHVlcyA9IChzdHIpID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IFtdO1xuICAgIGxldCBsYXN0U3BsaXRJbmRleCA9IDA7XG4gICAgbGV0IHNrb2JrYSA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzdHJbaV0gPT09ICcsJyAmJiAhc2tvYmthKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHN0ci5zbGljZShsYXN0U3BsaXRJbmRleCwgaSkpO1xuICAgICAgICAgICAgbGFzdFNwbGl0SW5kZXggPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdHJbaV0gPT09ICcoJykge1xuICAgICAgICAgICAgc2tvYmthID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdHJbaV0gPT09ICcpJykge1xuICAgICAgICAgICAgc2tvYmthID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFydHMucHVzaChzdHIuc2xpY2UobGFzdFNwbGl0SW5kZXgpKTtcbiAgICByZXR1cm4gcGFydHMubWFwKHMgPT4gcy50cmltKCkpO1xufTtcbmV4cG9ydCBjb25zdCBwYXJzZUJveFNoYWRvd1ZhbHVlID0gKHN0cikgPT4ge1xuICAgIC8vIFRPRE86IHRoaXMgaXMgYnJva2VuIGZvciBtdWx0aXBsZSBib3ggc2hhZG93c1xuICAgIGlmIChzdHIuc3RhcnRzV2l0aCgncmdiJykpIHtcbiAgICAgICAgLy8gV2VyaWQgY29tcHV0ZWQgc3R5bGUgdGhpbmcgdGhhdCBwdXRzIHRoZSBjb2xvciBpbiB0aGUgZnJvbnQgbm90IGJhY2tcbiAgICAgICAgY29uc3QgY29sb3JNYXRjaCA9IHN0ci5tYXRjaCgvKHJnYmE/XFwoLis/XFwpKSguKykvKTtcbiAgICAgICAgaWYgKGNvbG9yTWF0Y2gpIHtcbiAgICAgICAgICAgIHN0ciA9IChjb2xvck1hdGNoWzJdICsgJyAnICsgY29sb3JNYXRjaFsxXSkudHJpbSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IFBBUlRTX1JFRyA9IC9cXHMoPyFbXihdKlxcKSkvO1xuICAgIGNvbnN0IHBhcnRzID0gc3RyLnNwbGl0KFBBUlRTX1JFRyk7XG4gICAgY29uc3QgaW5zZXQgPSBwYXJ0cy5pbmNsdWRlcygnaW5zZXQnKTtcbiAgICBjb25zdCBsYXN0ID0gcGFydHMuc2xpY2UoLTEpWzBdO1xuICAgIGNvbnN0IGNvbG9yID0gIWlzTGVuZ3RoKGxhc3QpID8gbGFzdCA6ICdyZ2JhKDAsIDAsIDAsIDEpJztcbiAgICBjb25zdCBudW1zID0gcGFydHNcbiAgICAgICAgLmZpbHRlcigobikgPT4gbiAhPT0gJ2luc2V0JylcbiAgICAgICAgLmZpbHRlcigobikgPT4gbiAhPT0gY29sb3IpXG4gICAgICAgIC5tYXAodG9OdW0pO1xuICAgIGNvbnN0IFtvZmZzZXRYLCBvZmZzZXRZLCBibHVyUmFkaXVzLCBzcHJlYWRSYWRpdXNdID0gbnVtcztcbiAgICBjb25zdCBwYXJzZWRDb2xvciA9IGdldFJnYihjb2xvcik7XG4gICAgaWYgKCFwYXJzZWRDb2xvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdQYXJzZSBjb2xvciBlcnJvcjogJyArIGNvbG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5zZXQsXG4gICAgICAgIG9mZnNldFgsXG4gICAgICAgIG9mZnNldFksXG4gICAgICAgIGJsdXJSYWRpdXMsXG4gICAgICAgIHNwcmVhZFJhZGl1cyxcbiAgICAgICAgY29sb3I6IHBhcnNlZENvbG9yIHx8IHsgcjogMCwgZzogMCwgYjogMCwgYTogMSB9LFxuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IGdldE9wYWNpdHkgPSAoc3R5bGVzKSA9PiB7XG4gICAgcmV0dXJuIE51bWJlcihzdHlsZXMub3BhY2l0eSk7XG59O1xuZXhwb3J0IGNvbnN0IHBhcnNlQm94U2hhZG93VmFsdWVzID0gKHN0cikgPT4ge1xuICAgIGNvbnN0IHZhbHVlcyA9IHBhcnNlTXVsdGlwbGVDU1NWYWx1ZXMoc3RyKTtcbiAgICByZXR1cm4gdmFsdWVzLm1hcChzID0+IHBhcnNlQm94U2hhZG93VmFsdWUocykpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUZpbGxzKGxheWVyKSB7XG4gICAgY29uc3QgaW1hZ2VzID0gQXJyYXkuaXNBcnJheShsYXllci5maWxscykgJiZcbiAgICAgICAgbGF5ZXIuZmlsbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnR5cGUgPT09ICdJTUFHRScpO1xuICAgIHJldHVybiBpbWFnZXM7XG59XG5leHBvcnQgY29uc3QgZGVmYXVsdFBsYWNlaG9sZGVyQ29sb3IgPSBnZXRSZ2IoJ3JnYmEoMTc4LCAxNzgsIDE3OCwgMSknKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgYWRkTGF5ZXJzVG9GcmFtZSwgZGVmYXVsdEZvbnQsIGdldERyb3BPZmZzZXQgfSBmcm9tICdodG1sLWZpZ21hL2ZpZ21hJztcbi8vQHRzLWlnbm9yZVxuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgd2lkdGg6IDc1MCxcbiAgICBoZWlnaHQ6IDYwMCxcbn0pO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgaWYgKG1zZy50eXBlID09PSAnaW1wb3J0Jykge1xuICAgICAgICB5aWVsZCBmaWdtYS5sb2FkRm9udEFzeW5jKGRlZmF1bHRGb250KTtcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBtc2c7XG4gICAgICAgIGxldCB7IGxheWVycywgcG9zaXRpb24gfSA9IGRhdGE7XG4gICAgICAgIGxldCBiYXNlRnJhbWUgPSBmaWdtYS5jdXJyZW50UGFnZTtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBnZXREcm9wT2Zmc2V0KHBvc2l0aW9uKTtcbiAgICAgICAgLy8gbGV0IGN1cnJlbnROb2RlID0gZmlnbWEuY3VycmVudFBhZ2UuZmluZE9uZShuID0+IG4ubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIC8vIGlmIChjdXJyZW50Tm9kZSkge1xuICAgICAgICAvLyAgICAgeCA9IGN1cnJlbnROb2RlLng7XG4gICAgICAgIC8vICAgICB5ID0gY3VycmVudE5vZGUueTtcbiAgICAgICAgLy8gfVxuICAgICAgICBsYXllcnMueCA9IHg7XG4gICAgICAgIGxheWVycy55ID0geTtcbiAgICAgICAgeWllbGQgYWRkTGF5ZXJzVG9GcmFtZShbbGF5ZXJzXSwgYmFzZUZyYW1lKTtcbiAgICAgICAgLy8gY3VycmVudE5vZGU/LnJlbW92ZSgpO1xuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9