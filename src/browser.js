"use strict";

const noop = () => {};

require("./res/stylesheet.css");

module.exports = setup => {

    window.addEventListener("load", () => {
        let
            touchTarget;
        const
            mapping = setup(),
            defaultHandler = mapping["undefined"] || noop,
            click = target => {
                let id;
                while (!id && target) {
                    id = target.id;
                    target = target.parentNode;
                }
                (mapping[id] || defaultHandler)();
            };

        window.addEventListener("click", e => click(e.target), true);
        window.addEventListener("touchstart", e => {
            touchTarget = e.target;
        }, false);
        window.addEventListener("touchmove", () => {
            touchTarget = null;
        }, false);
        window.addEventListener("touchend", () => {
            if (null !== touchTarget) {
                click(touchTarget);
                touchTarget = null;
            }
        }, false);
    });

};
