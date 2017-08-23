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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tag = function _tag(tagName) {
    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.keys(properties).forEach(function (name) {
        element.setAttribute(name, properties[name]);
    });
    [].concat(children).map(function (def) {
        return typeof def === "string" ? document.createTextNode(def) : def;
    }).forEach(function (node) {
        return element.appendChild(node);
    });
    return element;
},
    _svg = _tag.bind(null, "svg");

["circle", "text", "path", "defs", "linearGradient", "stop", "rect", "g"].forEach(function (tag) {
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


if (!Object.assign) {
    Object.assign = function (target, properties) {
        Object.keys(properties).forEach(function (propertyName) {
            target[propertyName] = properties[propertyName];
        });
        return target;
    };
}

module.exports = true;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var noop = function noop() {};

__webpack_require__(4);

module.exports = function (setup) {

    window.addEventListener("load", function () {
        var touchEvent = void 0;
        var mapping = setup(),
            click = function click(e) {
            var x = e.clientX,
                y = e.clientY;
            if (Object.keys(mapping).every(function (id) {
                if ("undefined" === id) {
                    return true; // skip
                }
                var rect = document.getElementById(id).getBoundingClientRect();
                if (!(x < rect.left || x > rect.right || y < rect.top || y > rect.bottom)) {
                    mapping[id]();
                    return false;
                }
                return true;
            })) {
                (mapping["undefined"] || noop)();
            }
        };

        window.addEventListener("click", click, true);
        window.addEventListener("touchstart", function (e) {
            touchEvent = e;
        }, false);
        window.addEventListener("touchmove", function () {
            touchEvent = null;
        }, false);
        window.addEventListener("touchend", function () {
            if (null !== touchEvent) {
                click(touchEvent);
                touchEvent = null;
            }
        }, false);
    });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./stylesheet.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./stylesheet.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "html {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n}\n\nsvg {\n    cursor: pointer;\n    pointer-events: none;\n}\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _get = function _get(id) {
    return document.getElementById(id);
},
    _clear = function _clear(id) {
    var node = _get(id);
    var child = node.firstChild,
        next = void 0;
    while (child) {
        next = child.nextSibling;
        node.removeChild(child);
        child = next;
    }
    return node;
},
    _setText = function _setText(id, text) {
    var node = _clear(id);
    node.appendChild(document.createTextNode(text));
    return node;
};

module.exports = {

    clear: _clear,
    setText: _setText

};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var svg = __webpack_require__(0),
    colors = __webpack_require__(1);

module.exports = function () {
    return svg.defs({}, [svg.linearGradient({ id: "outerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0 }, [svg.stop({ offset: "0%", "stop-color": colors.circle.light }), svg.stop({ offset: "100%", "stop-color": colors.circle.dark })]), svg.linearGradient({ id: "innerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0 }, [svg.stop({ offset: "0%", "stop-color": colors.circle.dark }), svg.stop({ offset: "100%", "stop-color": colors.circle.light })])]);
};

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _zero = function _zero(x) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var result = [],
        max = Math.pow(10, count - 1);
    while (max > 1 && x < max) {
        result.push("0");
        max /= 10;
    }
    result.push(x);
    return result.join("");
};

module.exports = function (tick) {
    var ms = _zero(tick % 1000, 3),
        seconds = (tick - ms) / 1000,
        s = _zero(seconds % 60),
        m = _zero((seconds - s) / 60),
        time = m + ":" + s;
    return { time: time, ms: ms };
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*eslint-disable no-alert*/

__webpack_require__(2);

var TOTAL_OUTER = 0.98,
    TOTAL_INNER = 0.88,
    STEP_OUTER = 0.83,
    STEP_INNER = 0.73,
    browser = __webpack_require__(3),
    dom = __webpack_require__(9),
    svg = __webpack_require__(0),
    colors = __webpack_require__(1),
    gradients = __webpack_require__(10),
    sequenceSerializer = __webpack_require__(11),
    tickGenerator = __webpack_require__(15),
    tickConverter = __webpack_require__(16),
    tickFormatter = __webpack_require__(12),


// alarm1 = new Audio(require("./res/alarm1.mp3")),
// alarm2 = new Audio(require("./res/alarm2.mp3")),

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
        total = tick.elapsed / sequenceTotal % 1,
        step = 1 - convertedTick.remaining / currentDuration,
        formattedRemaining = tickFormatter(convertedTick.remaining);

    dom.setText("time", formattedRemaining.time);
    dom.setText("ms", "." + formattedRemaining.ms);

    if (convertedTick.step < sequence.length) {
        document.getElementById("total").setAttribute("d", getCirclePath(total, TOTAL_OUTER, TOTAL_INNER));
        document.getElementById("step").setAttribute("d", getCirclePath(step, STEP_OUTER, STEP_INNER));
        dom.setText("stepOn", convertedTick.step + 1 + " / " + sequence.length);
        requestAnimFrame(ticker.tick.bind(ticker));
    } else {
        document.getElementById("total").setAttribute("d", getCirclePath(0, TOTAL_OUTER, TOTAL_INNER));
        document.getElementById("step").setAttribute("d", getCirclePath(0, STEP_OUTER, STEP_INNER));
        dom.setText("stepOn", "done.");
    }
},
    progressContainer = function progressContainer(_ref) {
    var outerRadius = _ref.outerRadius,
        innerRadius = _ref.innerRadius,
        id = _ref.id,
        color = _ref.color;

    return [svg.circle({ cx: 0, cy: 0, r: outerRadius, stroke: "url(#outerBorder)", "stroke-width": 0.01,
        fill: colors.circle.background }), svg.circle({ cx: 0, cy: 0, r: innerRadius, stroke: "url(#innerBorder)", "stroke-width": 0.01,
        fill: colors.background }), svg.path({ id: id,
        d: "M 0 -" + outerRadius + " A " + outerRadius + " " + outerRadius + " 0 0 1 " + outerRadius + " 0\n                L " + innerRadius + " 0 A " + innerRadius + " " + innerRadius + " 0 0 0 0 -" + innerRadius + " L 0 -" + outerRadius,
        fill: color, stroke: color, "stroke-opacity": 0.2, "stroke-width": 0.01 })];
},
    setup = function setup() {
    if (0 === sequence.length) {
        alert("No sequence to play");
        return {};
    }
    document.body.appendChild(svg({
        width: "100%",
        height: "100%",
        viewBox: "-1 -1 2 2",
        style: "background-color: " + colors.background + ";"
    }, [gradients()].concat(progressContainer({
        outerRadius: TOTAL_OUTER,
        innerRadius: TOTAL_INNER,
        id: "total",
        color: colors.progress.total
    })).concat(progressContainer({
        outerRadius: STEP_OUTER,
        innerRadius: STEP_INNER,
        id: "step",
        color: colors.progress.step
    })).concat([svg.text({ id: "time",
        "font-family": "Arial", "font-size": 0.3, x: 0, y: 0.1, "text-anchor": "middle",
        fill: colors.text.time,
        stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.01 }, "00:00"), svg.text({ id: "ms",
        "font-family": "Arial", "font-size": 0.1, x: 0.60, y: 0.1, "text-anchor": "end",
        fill: colors.text.ms,
        stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001 }, ".123"), svg.text({ id: "stepOn",
        "font-family": "Arial", "font-size": 0.1, x: 0, y: 0.3, "text-anchor": "middle",
        fill: colors.text.step,
        stroke: "url(#outerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.01 }, "1 / 2")])));
    ticker.on(onTick);
    return {
        "undefined": function undefined() {
            return ticker.isPaused() ? ticker.resume() : ticker.pause();
        }
    };
};

browser(setup);

/***/ }),
/* 15 */
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
            },
            isPaused: function isPaused() {
                return !ticker.refTick;
            }
        };
    }

};

/***/ }),
/* 16 */
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

/***/ })
/******/ ]);