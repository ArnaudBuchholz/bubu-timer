"use strict";

const
    _get = id => document.getElementById(id),

    _clear = id => {
        const
            node = _get(id);
        let
            child = node.firstChild,
            next;
        while (child) {
            next = child.nextSibling;
            node.removeChild(child);
            child = next;
        }
        return node;
    },

    _setText = (id, text) => {
        const node = _clear(id);
        node.appendChild(document.createTextNode(text));
        return node;
    },

    _setDisplay = (id, value) => _get(id).setAttribute("style", `display: ${value};`),

    _show = id => _setDisplay(id, "block"),
    _hide = id => _setDisplay(id, "none")
;

module.exports = {

    clear: _clear,
    setText: _setText,
    show: _show,
    hide: _hide

};
