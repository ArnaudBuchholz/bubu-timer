"use strict";

let
    _mapping = {};

const
    appInfo = require("../package.json"),
    noop = require("./noop"),

    coords = e => e.touches
        ? {x: e.touches[0].clientX, y: e.touches[0].clientY}
        : {x: e.clientX, y: e.clientY},

    click = e => {
        const {x, y} = coords(e);
        if (Object.keys(_mapping).filter(id => id !== "undefined").every(id => {
            const rect = document.getElementById(id).getBoundingClientRect();
            if (!(x < rect.left || x > rect.right || y < rect.top || y > rect.bottom)) {
                _mapping[id]();
                return false;
            }
            return true;

        })) {
            (_mapping["undefined"] || noop)();
        }
    };

require("./res/stylesheet.css");
if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
    require("github-fork-ribbon-css/gh-fork-ribbon.css");
} else {
    require("github-fork-ribbon-css/gh-fork-ribbon.ie.css");
}

window.addEventListener("load", () => {
    let
        touchDisabled = true,
        touchEvent;

    document.title = `.::${appInfo.name.toUpperCase()}::.`;
    document.body.id = "body";

    window.addEventListener("click", e => touchDisabled ? click(e) : 0, true);
    window.addEventListener("touchstart", e => {
        touchDisabled = false;
        touchEvent = e;
    }, false);
    window.addEventListener("touchmove", () => {
        touchEvent = null;
    }, false);
    window.addEventListener("touchend", () => {
        if (null !== touchEvent) {
            click(touchEvent);
            touchEvent = null;
        }
    }, false);

});

module.exports = {

    setMapping: mapping => {
        _mapping = mapping;
    }

};
