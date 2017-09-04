"use strict";

require("./compatibility");

let
    _mode;

const
    browser = require("./browser"),
    hash = require("./hash"),
    dom = require("./dom"),
    EDIT_HASH = "edit",
    RUN_HASH = "hash",
    _modes = {},

    hashChange = () => {
        let newMode = hash.getMode(EDIT_HASH);
        if (newMode !== _mode) {
            _mode = newMode;
            dom.clear("body");
            browser(_modes[_mode]);
        }
    };

_modes[EDIT_HASH] = require("./edit");
_modes[RUN_HASH] = require("./run");

[
    "load",
    "hashchange"

].forEach(eventName => window.addEventListener(eventName, hashChange));
