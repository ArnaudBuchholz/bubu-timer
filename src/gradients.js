"use strict";

const
    svg = require("./svg"),
    colors = require("./colors");

module.exports = () => svg.defs({}, [
    svg.linearGradient({id: "outerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0}, [
        svg.stop({offset: "0%", "stop-color": colors.circle.light}),
        svg.stop({offset: "100%", "stop-color": colors.circle.dark})
    ]),
    svg.linearGradient({id: "innerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0}, [
        svg.stop({offset: "0%", "stop-color": colors.circle.dark}),
        svg.stop({offset: "100%", "stop-color": colors.circle.light})
    ])
]);
