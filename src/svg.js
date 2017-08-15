"use strict";

const
    _tag = function (tagName, properties, children) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
        Object.keys(properties).forEach(name => {
            element.setAttribute(name, properties[name]);
        });
        [].concat(children || [])
            .map(def => typeof def === "string" ? document.createTextNode(def) : def)
            .forEach(node => element.appendChild(node));
        return element;
    },

    _svg = _tag.bind(null, "svg");

[
    "circle",
    "text",
    "path",
    "defs",
    "linearGradient",
    "stop",
    "rect",
    "g"

].forEach(tag => {
    _svg[tag] = _tag.bind(null, tag);
});

module.exports = _svg;
