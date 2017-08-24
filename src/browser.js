"use strict";

const noop = () => {};

require("./res/stylesheet.css");

module.exports = setup => {

    window.addEventListener("load", () => {
        let
            touchDisabled = true,
            touchEvent;
        const
            mapping = setup(),
            coords = e => e.touches
                ? {x: e.touches[0].clientX, y: e.touches[0].clientY}
                : {x: e.clientX, y: e.clientY},
            click = e => {
                const {x, y} = coords(e);
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

};
