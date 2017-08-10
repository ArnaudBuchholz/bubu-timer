"use strict";

const
    tickFormatter = require("./tick-formatter"),

    _allocate = () => {
        return {
            callback: () => {},
            sequence: [0]
        };
    },

    _notify = (editor) => {
        editor.callback(editor.sequence.map(tick => tickFormatter(tick).time));
    },

    _attach = (editor, callback) => {
        editor.callback = callback;
        _notify(editor);
    },

    _inc = (editor, sec) => {
        let top = editor.sequence.pop() + sec * 1000;
        if (top < 0) {
            top = 0;
        }
        editor.sequence.push(top);
        _notify(editor);
    };

module.exports = {

    allocate: function () {
        let editor = _allocate();
        return {
            on: callback => _attach(editor, callback),
            inc: (sec) => _inc(editor, sec),
            dec: (sec) => _inc(editor, -sec)
        };

    }

};
