"use strict";

/*eslint-disable no-alert, no-undef, no-unused-vars*/

const
    sequenceSerializer = require("./sequence-serializer"),
    tickGenerator = require("./tick-generator"),
    tickConverter = require("./tick-converter"),
    tickFormatter = require("./tick-formatter"),

    defaultRequestAnimFrame = callback => setTimeout(callback, 1000 / 60),

    requestAnimFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame   // Chrome & Safari
        || window.mozRequestAnimationFrame      // Firefox
        || window.oRequestAnimationFrame        // Opera
        || window.msRequestAnimationFrame       // Internet Explorer
        || defaultRequestAnimFrame,

    sequence = sequenceSerializer.read(location.search.substr(1)),
    sequenceTotal = sequence.reduce((total, tick) => total + tick, 0),

    ticker = tickGenerator.allocate(),

    ratio2Coords = (ratio, radius = 1, precision = 10000) => {
        let radian = ratio * 2 * Math.PI,
            x = Math.floor(radius * precision * Math.sin(radian)) / precision,
            y = Math.floor(-radius * precision * Math.cos(radian)) / precision;
        return {x, y};
    },

    getCirclePath = (ratio, outerRadius, innerRadius) => {
        let
            outer = ratio2Coords(ratio, outerRadius),
            inner = ratio2Coords(ratio, innerRadius),
            path = [
                `M 0 -${outerRadius}`
            ];
        if (ratio > 0.5) {
            path.push(`A ${outerRadius} ${outerRadius} 0 0 1 0 ${outerRadius}`,
                `A ${outerRadius} ${outerRadius} 0 0 1 ${outer.x} ${outer.y}`,
                `L ${inner.x} ${inner.y}`,
                `A ${innerRadius} ${innerRadius} 0 0 0 0 ${innerRadius}`,
                `A ${innerRadius} ${innerRadius} 0 0 0 0 -${innerRadius}`
            );
        } else {
            path.push(`A ${outerRadius} ${outerRadius} 0 0 1 ${outer.x} ${outer.y}`,
                `L ${inner.x} ${inner.y}`,
                `A ${innerRadius} ${innerRadius} 0 0 0 0 -${innerRadius}`
            );
        }
        path.push(`L 0 -${outerRadius}`);
        return path.join(" ");
    },

    onTick = tick => {

        let
            convertedTick = tickConverter(tick.elapsed, sequence),
            currentDuration = sequence[convertedTick.step % sequence.length],
            outer = tick.elapsed / sequenceTotal % 1,
            inner = 1 - convertedTick.remaining / currentDuration;

        document.getElementById("outer").setAttribute("d", getCirclePath(outer, 0.99, 0.89));
        document.getElementById("inner").setAttribute("d", getCirclePath(inner, 0.89, 0.79));

        requestAnimFrame(ticker.tick.bind(ticker));
    },

    genSvgTag = function (tagName, properties, children) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
        Object.keys(properties).forEach(name => {
            element.setAttribute(name, properties[name]);
        });
        [].concat(children || [])
            .map(def => typeof def === "string" ? document.createTextNode(def) : def)
            .forEach(node => element.appendChild(node));
        return element;
    },

    setup = () => {
        const
            svg = genSvgTag.bind(null, "svg"),
            circle = genSvgTag.bind(null, "circle"),
            text = genSvgTag.bind(null, "text"),
            path = genSvgTag.bind(null, "path");

        document.body.appendChild(svg({
            width: "100%",
            height: "100%",
            viewBox: "-1 -1 2 2"
        }, [
            circle({cx: 0, cy: 0, r: 0.99, stroke: "white", "stroke-width": 0.01, fill: "blue"}),
            circle({cx: 0, cy: 0, r: 0.89, stroke: "white", "stroke-width": 0.01, fill: "green"}),
            circle({cx: 0, cy: 0, r: 0.79, stroke: "white", "stroke-width": 0.01, fill: "white"}),
            text({id: "time",
                "font-family": "Arial", "font-size": 0.3, x: 0, y: 0.1, "text-anchor": "middle",
                fill: "red", stroke: "black", "stroke-width": 0.01}, "00:00"),
            text({id: "ms",
                "font-family": "Arial", "font-size": 0.1, x: 0.65, y: 0.1, "text-anchor": "end",
                fill: "red", stroke: "black", "stroke-width": 0.001}, ".123"),
            text({id: "step",
                "font-family": "Arial", "font-size": 0.1, x: 0, y: 0.3, "text-anchor": "middle",
                fill: "red", stroke: "black", "stroke-width": 0.01}, "1 / 2"),
            path({id: "outer",
                d: "M 0 -.99 A .99 .99 0 0 1 .99 0 L .89 0 A .89 .89 0 0 0 0 -.89 L 0 -.99",
                fill: "purple", stroke: "black", "stroke-width": 0.01}),
            path({id: "inner",
                d: "M 0 -.89 A .89 .89 0 0 1 .89 0 L .79 0 A .79 .79 0 0 0 0 -.79 L 0 -.89",
                fill: "red", stroke: "black", "stroke-width": 0.01})

        ]));
    }
;

window.addEventListener("load", () => {
    if (0 === sequence.length) {
        alert("No sequence to play");
    } else {
        setup();
        ticker.on(onTick);
        ticker.resume();
    }
});
