"use strict";

const
    _allocate = (sequence) => {
        return {
            sequence: sequence,
            active: false,
            elapsed: 0,
            lastTick: new Date(),
            callback: () => {}
        }
    },

    _notify = (that) => {
        that.callback({
            paused: !that.active
        });
    },

    _tick = (that) => {
    },

    _pause = (that) => {
    },

    _resume = (that) => {
    },



    _attach = (that, callback) => {
        that.callback = callback;
        _notify(that);
    };

module.exports = {

    allocate: function (sequence) {
        let that = _allocate(sequence);
        return {

            tick: () => {
                return _tick(that);
            },

            pause: () => {
                return _pause(that);
            },

            resume: () => {
                return _resume(that);
            },

            on: (callback) => {
                return _attach(that, callback);
            }

        };
    }

};
