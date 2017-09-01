"use strict";

let
    _mode;

const
    log = text => {
        console.log(text);
        const line = document.createElement("div");
        line.appendChild(document.createTextNode(text));
        return document.body.appendChild(line);
    },

    hashChange = () => {
        let newMode;
        if (!location.hash) {
            log("No hash, setting to edit");
            location.hash = "edit";
        }
        if (location.hash.indexOf("#edit") === 0) {
            newMode = "EDIT";
        } else if (location.hash.indexOf("#run") === 0) {
            newMode = "RUN";
        }
        if (newMode !== _mode) {
            _mode = newMode;
            log(_mode);
        }
    };

[
    "load",
    "hashchange"
].forEach(eventName => {
    window.addEventListener(eventName, function () {
        log(`Event '${eventName}'`);
        hashChange();
    });
});
