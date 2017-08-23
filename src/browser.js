"use strict";

const noop = () => {};

require("./res/stylesheet.css");

module.exports = setup => {

    window.addEventListener("load", () => {
        let
            touchEvent;
        const
            mapping = setup(),
            click = e => {
                let
                    x = e.clientX,
                    y = e.clientY;
                if (Object.keys(mapping).every(id => {
                    if ("undefined" === id) {
                        return true; // skip
                    }
                    const rect = document.getElementById(id).getBoundingClientRect();
                    if (!(x < rect.left || x > rect.right || y < rect.top || y > rect.bottom)) {
                        mapping[id]();
                        return false;
                    }
                    return true;

                })) {
                    (mapping["undefined"] || noop)();
                }
            };

        window.addEventListener("click", click, true);
        window.addEventListener("touchstart", e => {
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

};
