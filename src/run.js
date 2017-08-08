"use strict";

/*eslint-disable no-alert*/

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

        document.getElementById("time").innerHTML = formattedRemaining.time;
        document.getElementById("ms").innerHTML = `.${formattedRemaining.ms}`;

        if (convertedTick.step < sequence.length) {
            document.getElementById("total").setAttribute("d", getCirclePath(total, TOTAL_OUTER, TOTAL_INNER));
            document.getElementById("step").setAttribute("d", getCirclePath(step, STEP_OUTER, STEP_INNER));
            document.getElementById("stepOn").innerHTML = `${convertedTick.step + 1} / ${sequence.length}`;
            requestAnimFrame(ticker.tick.bind(ticker));
        } else {
            document.getElementById("total").setAttribute("d", getCirclePath(0, TOTAL_OUTER, TOTAL_INNER));
            document.getElementById("step").setAttribute("d", getCirclePath(0, STEP_OUTER, STEP_INNER));
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
    defs = genSvgTag.bind(null, "defs"),
    linearGradient = genSvgTag.bind(null, "linearGradient"),
    stop  = genSvgTag.bind(null, "stop"),

    progressContainer = ({outerRadius, innerRadius, id, color}) => {
        return [
            circle({cx: 0, cy: 0, r: outerRadius, stroke: "url(#outerBorder)", "stroke-width": 0.01,
                fill: colors.circle.background}),
            circle({cx: 0, cy: 0, r: innerRadius, stroke: "url(#innerBorder)", "stroke-width": 0.01,
                fill: colors.background}),
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
        }, [defs({}, [
            linearGradient({id: "outerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0}, [
                stop({offset: "0%", "stop-color": colors.circle.light}),
                stop({offset: "100%", "stop-color": colors.circle.dark})
            ]),
            linearGradient({id: "innerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0}, [
                stop({offset: "0%", "stop-color": colors.circle.dark}),
                stop({offset: "100%", "stop-color": colors.circle.light})
            ])
        ])]
            .concat(progressContainer({
                outerRadius: TOTAL_OUTER,
                innerRadius: TOTAL_INNER,
                id: "total",
                color: colors.progress.total
            }))
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
                    stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.01}, "00:00"),
                text({id: "ms",
                    "font-family": "Arial", "font-size": 0.1, x: 0.60, y: 0.1, "text-anchor": "end",
                    fill: colors.text.ms,
                    stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001}, ".123"),
                text({id: "stepOn",
                    "font-family": "Arial", "font-size": 0.1, x: 0, y: 0.3, "text-anchor": "middle",
                    fill: colors.text.step,
                    stroke: "url(#outerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.01}, "1 / 2")
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

