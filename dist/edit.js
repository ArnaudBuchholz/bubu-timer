/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tag = function _tag(tagName, properties, children) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.keys(properties).forEach(function (name) {
        element.setAttribute(name, properties[name]);
    });
    [].concat(children || []).map(function (def) {
        return typeof def === "string" ? document.createTextNode(def) : def;
    }).forEach(function (node) {
        return element.appendChild(node);
    });
    return element;
},
    _svg = _tag.bind(null, "svg");

["circle", "text", "path", "defs", "linearGradient", "stop", "rect"].forEach(function (tag) {
    _svg[tag] = _tag.bind(null, tag);
});

module.exports = _svg;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    background: "#ccd0d3",
    circle: {
        light: "#dce0e1",
        dark: "#b3b7ba",
        background: "#a8acae"
    },
    progress: {
        total: "#def1f2",
        step: "#f3dfe6"
    },
    text: {
        time: "#ffffff",
        ms: "#ffffff",
        step: "#000000"
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var svg = __webpack_require__(0),
    colors = __webpack_require__(1);

module.exports = function () {
    return svg.defs({}, [svg.linearGradient({ id: "outerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0 }, [svg.stop({ offset: "0%", "stop-color": colors.circle.light }), svg.stop({ offset: "100%", "stop-color": colors.circle.dark })]), svg.linearGradient({ id: "innerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0 }, [svg.stop({ offset: "0%", "stop-color": colors.circle.dark }), svg.stop({ offset: "100%", "stop-color": colors.circle.light })])]);
};

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*eslint-disable no-alert*/

var svg = __webpack_require__(0),
    colors = __webpack_require__(1),
    gradients = __webpack_require__(2),
    digit = function digit(x, baseId) {
    return [svg.rect({ x: x - 0.1, y: -0.8, width: 0.2, height: 0.4,
        fill: colors.circle.background, stroke: "url(#outerBorder)", "stroke-width": 0.01 }), svg.text({ id: "inc" + baseId, x: x, y: -0.8, "font-family": "Arial", "font-size": 0.2, "text-anchor": "middle",
        fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001 }, "⏶"), svg.text({ id: "dig" + baseId, x: x, y: -0.5, "font-family": "Arial", "font-size": 0.3, "text-anchor": "middle",
        fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001 }, "0"), svg.text({ id: "dec" + baseId, x: x, y: -0.28, "font-family": "Arial", "font-size": 0.2, "text-anchor": "middle",
        fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001 }, "⏷")];
},
    setup = function setup() {
    document.body.appendChild(svg({
        width: "100%",
        height: "100%",
        viewBox: "-1 -1 2 2",
        style: "background-color: " + colors.background + ";"
    }, [gradients()].concat(digit(-0.4, 0), digit(-0.15, 1), digit(0.15, 2), digit(0.4, 3))));
};

window.addEventListener("load", setup);

/***/ })
/******/ ]);