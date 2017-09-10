"use strict";

let
    sequence,
    ticker,
    options,
    sequenceTotal,
    lastSecondDisplayed,
    lastStepDisplayed,
    radiusPrecision,
    lastStepRadius,
    lastTotalRadius,
    frameDelay;

const
    TOTAL_OUTER = 0.98,
    TOTAL_INNER = 0.88,
    STEP_OUTER  = 0.83,
    STEP_INNER  = 0.73,
    hash = require("./hash"),
    dom = require("./dom"),
    svg = require("./svg"),
    colors = require("./colors"),
    gradients = require("./gradients"),
    tickGenerator = require("./tick-generator"),
    tickConverter = require("./tick-converter"),
    tickFormatter = require("./tick-formatter"),
    sounds = require("./sounds"),

    verticalSync = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame   // Chrome & Safari
        || window.mozRequestAnimationFrame      // Firefox
        || window.oRequestAnimationFrame        // Opera
        || window.msRequestAnimationFrame       // Internet Explorer
        || (callback => callback()),

    nextFrame = callback => setTimeout(() => verticalSync(callback), frameDelay),

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
        if (options.visualpulse) {
            update();
        }
        sounds.tick();
    },

    pulseOnSeconds = (remaining, formattedRemaining) => {
        const second = Math.floor(remaining / 1000);
        if (lastSecondDisplayed !== second) {
            dom.setText("time", formattedRemaining.time);
            lastSecondDisplayed = second;
            if (second < 5) {
                pulse();
            } else {
                sounds.blank();
            }
        }
    },

    updateRemaining = remaining => {
        let formattedRemaining;
        if (options.ms) {
            formattedRemaining = tickFormatter(remaining);
            dom.setText("ms", `.${formattedRemaining.ms}`);
        } else {
            // Confusing without ms
            formattedRemaining = tickFormatter(remaining + 999);
        }
        pulseOnSeconds(remaining, formattedRemaining);
    },

    updateTotalElapsed = radius => document.getElementById("total")
        .setAttribute("d", getCirclePath(radius, TOTAL_OUTER, TOTAL_INNER)),

    updateStepElapsed = radius => document.getElementById("step")
        .setAttribute("d", getCirclePath(radius, STEP_OUTER, STEP_INNER)),

    done = () => {
        updateTotalElapsed(0);
        updateStepElapsed(0);
        dom.setText("stepOn", "done.");
        sounds.end();
    },

    roundRadius = radius => Math.floor(radiusPrecision * radius) / radiusPrecision,

    updateElapsed = (tick, convertedTick) => {
        const
            totalRadius = roundRadius(tick.elapsed / sequenceTotal),
            stepRadius = 1 - roundRadius(convertedTick.remaining / sequence[convertedTick.step % sequence.length]);
        if (lastTotalRadius !== totalRadius) {
            lastTotalRadius = totalRadius;
            updateTotalElapsed(totalRadius);
        }
        if (lastStepRadius !== stepRadius) {
            lastStepRadius = stepRadius;
            updateStepElapsed(stepRadius);
        }
        if (convertedTick.step !== lastStepDisplayed) {
            lastStepDisplayed = convertedTick.step;
            dom.setText("stepOn", `${convertedTick.step + 1} / ${sequence.length}`);
        }
    },

    onTick = tick => {
        if (!sequence) {
            return;
        }
        const convertedTick = tickConverter(tick.elapsed, sequence);
        updateRemaining(convertedTick.remaining);

        if (convertedTick.step < sequence.length) {
            updateElapsed(tick, convertedTick);
            if (!ticker.isPaused()) {
                nextFrame(ticker.tick.bind(ticker));
            }
        } else {
            done();
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

    undefineLasts = () => {
        lastSecondDisplayed = undefined;
        lastStepDisplayed = undefined;
        lastStepRadius = undefined;
        lastTotalRadius = undefined;
    },

    defaultOption = (name, value) => {
        if (options[name] === undefined) {
            options[name] = value;
        }
    },

    reset = () => {
        sequence = hash.getSequence();
        ticker = tickGenerator.allocate();
        options = Object.assign({
            battery: false
        }, hash.getOptions());
        defaultOption("ms", !options.battery);
        defaultOption("visualpulse", !options.battery);
        sequenceTotal = sequence.reduce((total, tick) => total + tick, 0);
        let frequency;
        if (options.battery) {
            frequency = 20;
            radiusPrecision = 100;
        } else {
            frequency = 60;
            radiusPrecision = 1000;
        }
        frameDelay = Math.floor(1000 / frequency);
        undefineLasts();
    },

    setup = () => {
        reset();
        if (0 === sequence.length) {
            hash.setMode("edit");
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
                svg.circle({id: "edit", r: 0.15, cx: 0, cy: -0.4,
                    fill: colors.circle.light, stroke: "url(#innerBorder)", "stroke-width": 0.01}),
                svg.text({x: 0, y: -0.34, "font-family": "Arial", "font-size": 0.2, "text-anchor": "middle",
                    fill: colors.text.step, stroke: "url(#outerBorder)", "stroke-opacity": 0.2,
                    "stroke-width": 0.001}, "?"),
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
        if (options.ms === false) {
            dom.hide("ms");
        }
        ticker.on(onTick);
        return {
            "edit": () => {
                hash.setMode("edit");
            },
            "undefined": () => {
                if (ticker.isPaused()) {
                    sounds.play();
                    ticker.resume();
                } else {
                    ticker.pause();
                    sounds.pause();
                }
            }
        };
    };

module.exports = {
    setup: setup,
    teardown: () => {
        sequence = undefined;
        ticker.pause();
        sounds.pause();
    }
};
