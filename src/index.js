"use strict";

require("./compatibility");

let
    _mode;

const
    noop = require("./noop"),
    browser = require("./browser"),
    hash = require("./hash"),
    dom = require("./dom"),
    EDIT_HASH = "edit",
    RUN_HASH = "run",
    _modes = {},

    hashChange = () => {
        let newMode = hash.getMode(EDIT_HASH);
        if (newMode !== _mode) {
            (_modes[_mode].teardown || noop)();
            _mode = newMode;
            dom.clear("body");
            browser.setMapping(_modes[_mode].setup());
        }
    };

_modes["undefined"] = {
    teardown: noop
};
_modes[EDIT_HASH] = require("./edit");
_modes[RUN_HASH] = require("./run");

[
    "load",
    "hashchange"

].forEach(eventName => window.addEventListener(eventName, hashChange));
