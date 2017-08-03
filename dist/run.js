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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*eslint-disable no-alert, no-undef, no-unused-vars*/

var sequenceSerializer = __webpack_require__(2),
    tickGenerator = __webpack_require__(3),
    tickConverter = __webpack_require__(4),
    tickFormatter = __webpack_require__(5),
    defaultRequestAnimFrame = function defaultRequestAnimFrame(callback) {
    return setTimeout(callback, 1000 / 60);
},
    requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame // Chrome & Safari
|| window.mozRequestAnimationFrame // Firefox
|| window.oRequestAnimationFrame // Opera
|| window.msRequestAnimationFrame // Internet Explorer
|| defaultRequestAnimFrame,
    sequence = sequenceSerializer.read(location.search.substr(1)),
    sequenceTotal = sequence.reduce(function (total, tick) {
    return total + tick;
}, 0),
    ticker = tickGenerator.allocate(),
    ratio2Coords = function ratio2Coords(ratio) {
    var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;

    var radian = ratio * 2 * Math.PI,
        x = Math.floor(radius * precision * Math.sin(radian)) / precision,
        y = Math.floor(-radius * precision * Math.cos(radian)) / precision;
    return { x: x, y: y };
},
    getCirclePath = function getCirclePath(ratio, outerRadius, innerRadius) {
    var outer = ratio2Coords(ratio, outerRadius),
        inner = ratio2Coords(ratio, innerRadius),
        path = ["M 0 -" + outerRadius];
    if (ratio > 0.5) {
        path.push("A " + outerRadius + " " + outerRadius + " 0 0 1 0 " + outerRadius, "A " + outerRadius + " " + outerRadius + " 0 0 1 " + outer.x + " " + outer.y, "L " + inner.x + " " + inner.y, "A " + innerRadius + " " + innerRadius + " 0 0 0 0 " + innerRadius, "A " + innerRadius + " " + innerRadius + " 0 0 0 0 -" + innerRadius);
    } else {
        path.push("A " + outerRadius + " " + outerRadius + " 0 0 1 " + outer.x + " " + outer.y, "L " + inner.x + " " + inner.y, "A " + innerRadius + " " + innerRadius + " 0 0 0 0 -" + innerRadius);
    }
    path.push("L 0 -" + outerRadius);
    return path.join(" ");
},
    onTick = function onTick(tick) {

    var convertedTick = tickConverter(tick.elapsed, sequence),
        currentDuration = sequence[convertedTick.step % sequence.length],
        outer = tick.elapsed / sequenceTotal % 1,
        inner = 1 - convertedTick.remaining / currentDuration;

    document.getElementById("outer").setAttribute("d", getCirclePath(outer, 0.99, 0.89));
    document.getElementById("inner").setAttribute("d", getCirclePath(inner, 0.89, 0.79));

    requestAnimFrame(ticker.tick.bind(ticker));
},
    genSvgTag = function genSvgTag(tagName, properties, children) {
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
    setup = function setup() {
    var svg = genSvgTag.bind(null, "svg"),
        circle = genSvgTag.bind(null, "circle"),
        text = genSvgTag.bind(null, "text"),
        path = genSvgTag.bind(null, "path");

    document.body.appendChild(svg({
        width: "100%",
        height: "100%",
        viewBox: "-1 -1 2 2"
    }, [circle({ cx: 0, cy: 0, r: 0.99, stroke: "white", "stroke-width": 0.01, fill: "blue" }), circle({ cx: 0, cy: 0, r: 0.89, stroke: "white", "stroke-width": 0.01, fill: "green" }), circle({ cx: 0, cy: 0, r: 0.79, stroke: "white", "stroke-width": 0.01, fill: "white" }), text({ id: "time",
        "font-family": "Arial", "font-size": 0.3, x: 0, y: 0.1, "text-anchor": "middle",
        fill: "red", stroke: "black", "stroke-width": 0.01 }, "00:00"), text({ id: "ms",
        "font-family": "Arial", "font-size": 0.1, x: 0.65, y: 0.1, "text-anchor": "end",
        fill: "red", stroke: "black", "stroke-width": 0.001 }, ".123"), text({ id: "step",
        "font-family": "Arial", "font-size": 0.1, x: 0, y: 0.3, "text-anchor": "middle",
        fill: "red", stroke: "black", "stroke-width": 0.01 }, "1 / 2"), path({ id: "outer",
        d: "M 0 -.99 A .99 .99 0 0 1 .99 0 L .89 0 A .89 .89 0 0 0 0 -.89 L 0 -.99",
        fill: "purple", stroke: "black", "stroke-width": 0.01 }), path({ id: "inner",
        d: "M 0 -.89 A .89 .89 0 0 1 .89 0 L .79 0 A .79 .79 0 0 0 0 -.79 L 0 -.89",
        fill: "red", stroke: "black", "stroke-width": 0.01 })]));
};

window.addEventListener("load", function () {
    if (0 === sequence.length) {
        alert("No sequence to play");
    } else {
        setup();
        ticker.on(onTick);
        ticker.resume();
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _read = function _read(string) {
    return string ? string.split(",").map(function (time) {
        return 1000 * parseInt(time, 10);
    }) : [];
},
    _write = function _write(sequence) {
    return sequence.map(function (time) {
        return Math.floor(time / 1000);
    }).join(",");
};

module.exports = {
    read: _read,
    write: _write
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _allocate = function _allocate() {
    return {
        elapsed: 0,
        refTick: null,
        callback: function callback() {}
    };
},
    _update = function _update(ticker, active) {
    var now = new Date(),
        elapsed = ticker.elapsed;
    if (ticker.refTick) {
        elapsed += now - ticker.refTick;
        if (false === active) {
            ticker.elapsed = elapsed;
            ticker.refTick = null;
        }
    } else if (active) {
        ticker.refTick = now;
    }
    return elapsed;
},
    _notify = function _notify(ticker, active) {
    var elapsed = _update(ticker, active);
    ticker.callback({
        paused: !ticker.refTick,
        elapsed: elapsed
    });
},
    _tick = function _tick(ticker) {
    return _notify(ticker);
},
    _pause = function _pause(ticker) {
    return _notify(ticker, false);
},
    _resume = function _resume(ticker) {
    return _notify(ticker, true);
},
    _attach = function _attach(ticker, callback) {
    ticker.callback = callback;
    _notify(ticker);
};

module.exports = {

    allocate: function allocate() {
        var ticker = _allocate();
        return {
            tick: function tick() {
                return _tick(ticker);
            },
            pause: function pause() {
                return _pause(ticker);
            },
            resume: function resume() {
                return _resume(ticker);
            },
            on: function on(callback) {
                return _attach(ticker, callback);
            }
        };
    }

};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (elapsed, sequence) {
    var step = 0,
        remaining = 0;
    sequence.every(function (ms) {
        if (elapsed >= ms) {
            elapsed -= ms;
            ++step;
            return true;
        }
        remaining = ms - elapsed;
        if (remaining === 0) {
            ++step;
        }
        return false;
    });
    return { step: step, remaining: remaining };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (tick) {
    var ms = tick % 1000,
        seconds = (tick - ms) / 1000,
        s = seconds % 60,
        m = (seconds - s) / 60;
    return { ms: ms, s: s, m: m };
};

/***/ })
/******/ ]);