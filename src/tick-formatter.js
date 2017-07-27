"use strict";

module.exports = (tick) => {
    let
        ms = tick % 1000,
        seconds = (tick - ms)/ 1000,
        s = seconds % 60,
        m = (seconds - s) / 60;
    return {ms, s, m};
};
