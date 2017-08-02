"use strict";

const
    _read = (string) => string ? string
        .split(",")
        .map(time => 1000 * parseInt(time, 10)) : [],

    _write = (sequence) => sequence
        .map(time => Math.floor(time / 1000))
        .join(",")
;

module.exports = {
    read: _read,
    write: _write
};
