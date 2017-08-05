"use strict";

/*eslint-disable no-alert, no-undef, no-unused-vars*/

const
    TOTAL_OUTER = 0.98,
    TOTAL_INNER = 0.88,
    STEP_OUTER  = 0.83,
    STEP_INNER  = 0.73,
    colors = require("./colors"),
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
            total = tick.elapsed / sequenceTotal % 1,
            step = 1 - convertedTick.remaining / currentDuration,
            formattedRemaining = tickFormatter(convertedTick.remaining);

        document.getElementById("total").setAttribute("d", getCirclePath(total, TOTAL_OUTER, TOTAL_INNER));
        document.getElementById("step").setAttribute("d", getCirclePath(step, STEP_OUTER, STEP_INNER));
        document.getElementById("time").innerHTML = formattedRemaining.time;
        document.getElementById("ms").innerHTML = `.${formattedRemaining.ms}`;

        if (convertedTick.step < sequence.length) {
            document.getElementById("stepOn").innerHTML = `${convertedTick.step + 1} / ${sequence.length}`;
            requestAnimFrame(ticker.tick.bind(ticker));
        } else {
            document.getElementById("stepOn").innerHTML = "done.";
        }
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

    svg = genSvgTag.bind(null, "svg"),
    circle = genSvgTag.bind(null, "circle"),
    text = genSvgTag.bind(null, "text"),
    path = genSvgTag.bind(null, "path"),

    progressContainer = ({outerRadius, innerRadius, id, color}) => {
        let po1 = ratio2Coords(0.085, outerRadius),
            po2 = ratio2Coords(0.165, outerRadius),
            po3 = ratio2Coords(0.585, outerRadius),
            po4 = ratio2Coords(0.665, outerRadius),
            pi1 = ratio2Coords(0.085, innerRadius),
            pi2 = ratio2Coords(0.165, innerRadius),
            pi3 = ratio2Coords(0.585, innerRadius),
            pi4 = ratio2Coords(0.665, innerRadius)
        ;
        return [
            circle({cx: 0, cy: 0, r: outerRadius, stroke: colors.circle.light, "stroke-width": 0.01,
                fill: colors.circle.background}),
            circle({cx: 0, cy: 0, r: innerRadius, stroke: colors.circle.light, "stroke-width": 0.01,
                fill: colors.background}),
            path({d: `M ${po1.x} ${po1.y} A ${outerRadius} ${outerRadius} 0 0 1 ${po2.x} ${po2.y}`,
                fill: "transparent", stroke: colors.circle.shaded, "stroke-width": 0.01}),
            path({d: `M ${po2.x} ${po2.y} A ${outerRadius} ${outerRadius} 0 0 1 ${po3.x} ${po3.y}`,
                fill: "transparent", stroke: colors.circle.dark, "stroke-width": 0.01}),
            path({d: `M ${po3.x} ${po3.y} A ${outerRadius} ${outerRadius} 0 0 1 ${po4.x} ${po4.y}`,
                fill: "transparent", stroke: colors.circle.shaded, "stroke-width": 0.01}),
            path({d: `M ${pi1.x} ${pi1.y} A ${innerRadius} ${innerRadius} 0 0 1 ${pi2.x} ${pi2.y}`,
                fill: "transparent", stroke: colors.circle.shaded, "stroke-width": 0.01}),
            path({d: `M ${pi2.x} ${pi2.y} A ${innerRadius} ${innerRadius} 0 0 1 ${pi3.x} ${pi3.y}`,
                fill: "transparent", stroke: colors.circle.dark, "stroke-width": 0.01}),
            path({d: `M ${pi3.x} ${pi3.y} A ${innerRadius} ${innerRadius} 0 0 1 ${pi4.x} ${pi4.y}`,
                fill: "transparent", stroke: colors.circle.shaded, "stroke-width": 0.01}),
            path({id: id,
                d: `M 0 -${outerRadius} A ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} 0
                L ${innerRadius} 0 A ${innerRadius} ${innerRadius} 0 0 0 0 -${innerRadius} L 0 -${outerRadius}`,
                fill: color, stroke: color, "stroke-opacity": 0.2, "stroke-width": 0.01})
        ];
    },

    setup = () => {

        document.body.appendChild(svg({
            width: "100%",
            height: "100%",
            viewBox: "-1 -1 2 2",
            style: `background-color: ${colors.background};`
        }, progressContainer({
            outerRadius: TOTAL_OUTER,
            innerRadius: TOTAL_INNER,
            id: "total",
            color: colors.progress.total
        })
            .concat(progressContainer({
                outerRadius: STEP_OUTER,
                innerRadius: STEP_INNER,
                id: "step",
                color: colors.progress.step
            }))
            .concat([
                text({id: "time",
                    "font-family": "Arial", "font-size": 0.3, x: 0, y: 0.1, "text-anchor": "middle",
                    fill: colors.text.time,
                    stroke: colors.text.time, "stroke-opacity": 0.2, "stroke-width": 0.01}, "00:00"),
                text({id: "ms",
                    "font-family": "Arial", "font-size": 0.1, x: 0.60, y: 0.1, "text-anchor": "end",
                    fill: colors.text.ms,
                    stroke: colors.text.ms, "stroke-opacity": 0.2, "stroke-width": 0.001}, ".123"),
                text({id: "stepOn",
                    "font-family": "Arial", "font-size": 0.1, x: 0, y: 0.3, "text-anchor": "middle",
                    fill: colors.text.step,
                    stroke: colors.text.step, "stroke-opacity": 0.2, "stroke-width": 0.01}, "1 / 2")
            ])
        ));
    }
;

window.addEventListener("load", () => {
    if (0 === sequence.length) {
        alert("No sequence to play");
    } else {
        setup();
        ticker.on(onTick);
    }
});

window.addEventListener("click", () => {
    if (ticker.isPaused()) {
        ticker.resume();
    } else {
        ticker.pause();
    }
});

