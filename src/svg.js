"use strict";

const
    SVG_NAMESPACE = "http://www.w3.org/2000/svg",
    XLINK_NAMESPACE = "http://www.w3.org/1999/xlink",

    _tag = function (tagName, properties = {}, children = []) {
        let element = document.createElementNS(SVG_NAMESPACE, tagName);
        Object.keys(properties).forEach(name => {
            if (name.indexOf("xlink:") === 0) {
                element.setAttributeNS(XLINK_NAMESPACE, name.substr(6), properties[name]);
            } else {
                element.setAttribute(name, properties[name]);
            }
        });
        [].concat(children)
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
    "g",
    "image"

].forEach(tag => {
    _svg[tag] = _tag.bind(null, tag);
});

module.exports = _svg;
