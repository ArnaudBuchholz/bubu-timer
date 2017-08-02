"use strict";

/*eslint-disable no-alert, no-undef, no-unused-vars*/

const
    gpf = require("gpf-js"),
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

    ticker = tickGenerator.allocate(),

    onTick = tick => {

        let deg = 360 * tick.elapsed / 200 % 360,
            rad = deg * 2 * Math.PI / 360,
            toX1 = Math.floor(9900 * Math.sin(rad)) / 10000,
            toY1 = Math.floor(-9900 * Math.cos(rad)) / 10000,
            toX2 = Math.floor(8900 * Math.sin(rad)) / 10000,
            toY2 = Math.floor(-8900 * Math.cos(rad)) / 10000,
            secondHalf = deg > 180,
            path = [
                "M 0 -.99"
            ];
        if (deg > 180) {
            path.push("A .99 .99 0 0 1 0 .99",
                `A .99 .99 0 0 1 ${toX1} ${toY1}`,
                `L ${toX2} ${toY2}`,
                "A .89 .89 0 0 0 0 .89",
                "A .89 .89 0 0 0 0 -.89"
            );
        } else {
            path.push(`A .99 .99 0 0 1 ${toX1} ${toY1}`,
                `L ${toX2} ${toY2}`,
                "A .89 .89 0 0 0 0 -.89"
            );
        }
        path.push("L 0 -.99");
        document.getElementById("p").setAttribute("d", path.join(" "));
        ++tick;

        requestAnimFrame(ticker.tick.bind(ticker));
    },

    svg = gpf.web.createTagFunction("svg"),
    circle = gpf.web.createTagFunction("circle"),
    text = gpf.web.createTagFunction("text"),
    path = gpf.web.createTagFunction("path"),

    setup = () => {
        svg({
            width: "100%",
            height: "100%",
            viewBox: "-1 -1 2 2"
        }, [
            circle({cx: 0, cy: 0, r: 0.99, stroke: "white", "stroke-width": 0.01, fill: "blue"}),
            circle({cx: 0, cy: 0, r: 0.89, stroke: "white", "stroke-width": 0.01, fill: "green"}),
            circle({cx: 0, cy: 0, r: 0.79, stroke: "white", "stroke-width": 0.01, fill: "white"}),
            text({"font-family": "Arial", "font-size": 0.3, x: 0, y: 0.1, "text-anchor": "middle",
                fill: "red", stroke: "black", "stroke-width": 0.01}, "00:00"),
            text({"font-family": "Arial", "font-size": 0.1, x: 0.65, y: 0.1, "text-anchor": "end",
                fill: "red", stroke: "black", "stroke-width": 0.001}, ".123"),
            text({"font-family": "Arial", "font-size": 0.1, x: 0, y: 0.3, "text-anchor": "middle",
                fill: "red", stroke: "black", "stroke-width": 0.01}, "1 / 2"),
            path({id: "p", d: "M 0 -.99 A .99 .99 0 0 1 .99 0 L .89 0 A .89 .89 0 0 0 0 -.89 L 0 -.99",
                fill: "purple", stroke: "black", "stroke-width": 0.01})

        ]).appendTo(document.body);
    }
;

window.addEventListener("load", () => {
    if (0 === sequence.length) {
        alert("No sequence to play");
    } else {
        // setup();
    }
});
