"use strict";

/*eslint-disable no-alert*/

require("./compatibility");

const
    TOTAL_OUTER = 0.98,
    TOTAL_INNER = 0.88,
    STEP_OUTER  = 0.83,
    STEP_INNER  = 0.73,
    browser = require("./browser"),
    dom = require("./dom"),
    svg = require("./svg"),
    colors = require("./colors"),
    gradients = require("./gradients"),
    sequenceSerializer = require("./sequence-serializer"),
    tickGenerator = require("./tick-generator"),
    tickConverter = require("./tick-converter"),
    tickFormatter = require("./tick-formatter"),
    NoSleep = require("nosleep.js/dist/NoSleep.min"),
    noSleep = new NoSleep(),

    tickSound = new Audio(require("./res/tick.mp3")),
    doneSound = new Audio(require("./res/end.mp3")),

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

    pulse = () => {
        const
            circle = document.getElementById("pulse"),
            updates = [0.1, 0.08, 0.06, 0.03, 0],
            update = (index = 0) => {
                circle.setAttribute("r", updates[index]);
                ++index;
                if (index < updates.length) {
                    setTimeout(() => {
                        update(index);
                    }, 100);
                }
            };
        update();
        tickSound.play();
    },

    onTick = tick => {

        const
            convertedTick = tickConverter(tick.elapsed, sequence),
            currentDuration = sequence[convertedTick.step % sequence.length],
            total = tick.elapsed / sequenceTotal % 1,
            step = 1 - convertedTick.remaining / currentDuration,
            formattedRemaining = tickFormatter(convertedTick.remaining),
            second = Math.floor(tick.elapsed / 1000);

        if (onTick.lastSecond !== second) {
            onTick.lastSecond = second;
            if (convertedTick.remaining <= 5000 && convertedTick.step < sequence.length) {
                pulse();
            }
        }

        dom.setText("time", formattedRemaining.time);
        dom.setText("ms", `.${formattedRemaining.ms}`);

        if (convertedTick.step < sequence.length) {
            document.getElementById("total").setAttribute("d", getCirclePath(total, TOTAL_OUTER, TOTAL_INNER));
            document.getElementById("step").setAttribute("d", getCirclePath(step, STEP_OUTER, STEP_INNER));
            dom.setText("stepOn", `${convertedTick.step + 1} / ${sequence.length}`);
            requestAnimFrame(ticker.tick.bind(ticker));
        } else {
            document.getElementById("total").setAttribute("d", getCirclePath(0, TOTAL_OUTER, TOTAL_INNER));
            document.getElementById("step").setAttribute("d", getCirclePath(0, STEP_OUTER, STEP_INNER));
            dom.setText("stepOn", "done.");
            doneSound.play();
            noSleep.disable();
        }
    },

    progressContainer = ({outerRadius, innerRadius, id, color}) => {
        return [
            svg.circle({cx: 0, cy: 0, r: outerRadius, stroke: "url(#outerBorder)", "stroke-width": 0.01,
                fill: colors.circle.background}),
            svg.circle({cx: 0, cy: 0, r: innerRadius, stroke: "url(#innerBorder)", "stroke-width": 0.01,
                fill: colors.background}),
            svg.path({id: id,
                d: `M 0 -${outerRadius} A ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} 0
                L ${innerRadius} 0 A ${innerRadius} ${innerRadius} 0 0 0 0 -${innerRadius} L 0 -${outerRadius}`,
                fill: color, stroke: color, "stroke-opacity": 0.2, "stroke-width": 0.01})
        ];
    },

    setup = () => {
        if (0 === sequence.length) {
            alert("No sequence to play");
            return {};
        }
        document.body.appendChild(svg({
            width: "100%",
            height: "100%",
            viewBox: "-1 -1 2 2",
            style: `background-color: ${colors.background};`
        }, [gradients()]
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
                svg.text({id: "time",
                    "font-family": "Arial", "font-size": 0.3, x: 0, y: 0.1, "text-anchor": "middle",
                    fill: colors.text.time,
                    stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.01}, "00:00"),
                svg.text({id: "ms",
                    "font-family": "Arial", "font-size": 0.1, x: 0.60, y: 0.1, "text-anchor": "end",
                    fill: colors.text.ms,
                    stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001}, ".123"),
                svg.text({id: "stepOn",
                    "font-family": "Arial", "font-size": 0.1, x: 0, y: 0.3, "text-anchor": "middle",
                    fill: colors.text.step,
                    stroke: "url(#outerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.01}, "1 / 2"),
                svg.circle({id: "pulse", cx: 0, cy: 0.85, r: 0, "stroke-width": 0, fill: "red", opacity: 0.5})
            ])
        ));
        ticker.on(onTick);
        return {
            "undefined": () => {
                if (ticker.isPaused()) {
                    noSleep.enable();
                    ticker.resume();
                } else {
                    ticker.pause();
                    noSleep.disable();
                }
            }
        };
    };

browser(setup);
