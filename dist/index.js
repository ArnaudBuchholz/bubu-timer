"use strict";

const
    log = text => {
        console.log(text);
        const line = document.createElement("div");
        line.appendChild(document.createTextNode(text));
        return document.body.appendChild(line);
    };

window.addEventListener("load", function () {
    log("loaded");
    if (!location.hash) {
        log("No hash, setting to edit");
        location.hash = "edit";
    }
    if (location.hash === "#edit") {
        log("EDIT");
    } else if (location.hash === "#run") {
        log("RUN");
    }
});
