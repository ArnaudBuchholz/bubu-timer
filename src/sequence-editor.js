"use strict";

let
    _callback = () => {},
    _sequence;

const
    _notify = () => {
        _callback(_sequence);
    },

    _update = ms => {
        let current = _sequence.pop() + ms;
        if (current < 0) {
            current = 0;
        }
        _sequence.push(current);
        _notify();
    };

module.exports = {

    on: callback => {
        _callback = callback;
    },

    reset: (defaultValue = 0) => {
        _sequence = [defaultValue];
        _notify();
    },

    add: ms => _update(ms),

    sub: ms => _update(-ms)

}
