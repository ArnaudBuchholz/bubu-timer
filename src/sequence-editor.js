"use strict";

const
    tickFormatter = require("./tick-formatter"),

    _allocate = () => {
        return {
            callback: () => {},
            sequence: [0]
        };
    },

    _notify = (editor, lengthChanged) => {
        const sequence = editor.sequence;
        editor.callback(sequence.map(tick => tickFormatter(tick).time),
            tickFormatter(sequence.reduce((sum, step) => sum + step, 0)).time);
    },

    _attach = (editor, callback) => {
        editor.callback = callback;
        _notify(editor);
    },

    _inc = (editor, sec) => {
        let top = Math.min(Math.max(editor.sequence.pop() + sec * 1000, 0), 5999000);
        editor.sequence.push(top);
        _notify(editor);
    },

    _add = (editor) => {
        editor.sequence.push(0);
        _notify(editor);
    },

    _remove = (editor) => {
        let sequence = editor.sequence;
        if (sequence.length > 1) {
            sequence.pop();
        } else {
            sequence[0] = 0;
        }
        _notify(editor);
    },

    _get = (editor) => editor.sequence,

    _set = (editor, sequence) => {
        editor.sequence = Array.isArray(sequence) && sequence.length ? [].concat(sequence) : [0];
        _notify(editor);
    };

module.exports = {

    allocate: function () {
        let editor = _allocate();
        return {
            on: callback => _attach(editor, callback),
            inc: (sec) => _inc(editor, sec),
            dec: (sec) => _inc(editor, -sec),
            add: () => _add(editor),
            remove: () => _remove(editor),
            get: () => _get(editor),
            set: (sequence) => _set(editor, sequence)
        };
    }

};
