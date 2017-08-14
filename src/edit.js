"use strict";

/*eslint-disable no-alert*/

const
    svg = require("./svg"),
    colors = require("./colors"),
    gradients = require("./gradients"),

    digit = (x, baseId) => [
        svg.rect({x: x - 0.1, y: -0.8, width: 0.2, height: 0.4,
            fill: colors.circle.background, stroke: "url(#outerBorder)", "stroke-width": 0.01}),
        svg.text({id: `inc${baseId}`, x: x, y: -0.8, "font-family": "Arial", "font-size": 0.2, "text-anchor": "middle",
            fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001},
        "⏶"),
        svg.text({id: `dig${baseId}`, x: x, y: -0.5, "font-family": "Arial", "font-size": 0.3, "text-anchor": "middle",
            fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001},
        "0"),
        svg.text({id: `dec${baseId}`, x: x, y: -0.28, "font-family": "Arial", "font-size": 0.2, "text-anchor": "middle",
            fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001},
        "⏷")
    ],

    setup = () => {
        document.body.appendChild(svg({
            width: "100%",
            height: "100%",
            viewBox: "-1 -1 2 2",
            style: `background-color: ${colors.background};`
        }, [gradients()]
            .concat(digit(-0.4, 0), digit(-0.15, 1), digit(0.15, 2), digit(0.4, 3))
        ));
    }
;

window.addEventListener("load", setup);

