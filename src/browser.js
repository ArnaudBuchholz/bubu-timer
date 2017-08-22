"use strict";

const noop = () => {};

module.exports = setup => {

    window.addEventListener("load", () => {
        let
            touchTarget;
        const
            mapping = setup(),
            click = target => {
                let id;
                while (!id && target) {
                    id = target.id;
                    target = target.parentNode;
                }
                (mapping[id] || noop)();
            };

        window.addEventListener("click", e => click(e.target), false);
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
