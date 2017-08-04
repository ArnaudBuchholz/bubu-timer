"use strict";

const _zero = (x, count = 2) => {
    let result = [],
        max = Math.pow(10, count - 1);
    while (max > 1 && x < max) {
        result.push("0");
        max /= 10;
    }
    result.push(x);
    return result.join("");
};


module.exports = (tick) => {
    let
        ms = _zero(tick % 1000, 3),
        seconds = (tick - ms) / 1000,
        s = _zero(seconds % 60),
        m = _zero((seconds - s) / 60),
        time = `${m}:${s}`;
    return {time, ms};
};
