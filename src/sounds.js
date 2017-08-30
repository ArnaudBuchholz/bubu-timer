"use strict";


let
    _mustCreate = true;

const
    noop = () => {},

    _sprites = {
        blank: {
            from: 0,
            to: 5
        },
        tick: {
            from: 5,
            to: 6
        },
        end: {
            from: 6,
            to: 8.5
        }
    },

    _play = () => {
        if (_mustCreate) {
            _createAudio();
        }
    };

module.exports = {
    play: noop, // "function" === typeof Audio ? _play : noop,
    pause: noop,
    tick: noop,
    end: noop
};
