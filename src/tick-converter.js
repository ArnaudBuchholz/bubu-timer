"use strict";

module.exports = (elapsed, sequence) => {
    let step = 0,
        remaining = 0;
    sequence.every((ms) => {
        if (elapsed >= ms) {
            elapsed -= ms;
            ++step;
            return true;
        }
        remaining = ms - elapsed;
        if (remaining === 0) {
            ++step;
        }
        return false;
    });
    return {step, remaining};
};
