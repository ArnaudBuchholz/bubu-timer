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
    }
;

module.exports = {

    clear: _clear,
    setText: _setText

};
