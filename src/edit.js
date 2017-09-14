"use strict";

const
    hash = require("./hash"),
    dom = require("./dom"),
    svg = require("./svg"),
    colors = require("./colors"),
    gradients = require("./gradients"),
    sequenceEditor = require("./sequence-editor").allocate(),
    runIcon = require("./res/run.svg"),
    aboutIcon = require("./res/email.svg"),
    durationIcon = require("./res/power.svg"),

    commonTextProperties = {
        "font-family": "Arial",
        fill: colors.text.step,
        stroke: "url(#innerBorder)",
        "stroke-opacity": 0.2,
        "stroke-width": 0.001
    },

    buttonProperties = Object.assign({
        "font-size": 0.2,
        "text-anchor": "middle"
    }, commonTextProperties),

    digitProperties = Object.assign({
        "font-size": 0.25,
        "text-anchor": "middle"
    }, commonTextProperties),

    stepProperties = Object.assign({
        "font-size": 0.15,
        "text-anchor": "end"
    }, commonTextProperties),

    createButton = ({id, cx, y, label = "", r = 0.15, cy = 0.85, icon = ""}) => {
        let result = [
                svg.circle({id: id, r: r, cx: cx, cy: cy,
                    fill: colors.circle.light, stroke: "url(#innerBorder)", "stroke-width": 0.01})
            ],
            r2 = 0.7 * r;
        if (icon) {
            result.push(svg.image({x: cx - r2, y: cy - r2, "xlink:href": icon, height: r2 * 2, width: r2 * 2}));
        } else {
            result.push(svg.text(Object.assign({x: cx, y: y}, buttonProperties), label));
        }
        return result;
    },

    createDigit = (x, baseId) => [
        svg.rect({x: x - 0.1, y: -0.8, width: 0.2, height: 0.4,
            fill: colors.circle.background, stroke: "url(#outerBorder)", "stroke-width": 0.01}),
        svg.text(Object.assign({id: `dig${baseId}`, x: x, y: -0.52}, digitProperties), "")
    ].concat(
        createButton({id: `inc${baseId}`, cx: x, x: x, y: -0.82, r: 0.08, cy: -0.89, label: "+"}),
        createButton({id: `dec${baseId}`, cx: x, x: x, y: -0.26, r: 0.08, cy: -0.31, label: "-"})
    ),

    refresh = (sequence, total) => {
        let current = sequence[sequence.length - 1],
            list;
        dom.setText("total", total);
        [0, 1, 3, 4].forEach((pos, digit) => {
            dom.setText(`dig${digit}`, current.substr(pos, 1));
        });
        list = dom.clear("list");
        sequence.forEach((time, index) => {
            list.appendChild(svg.text(Object.assign({
                x: -0.5 + 0.45 * (index % 4),
                y: 0.15 * Math.floor(index / 4)
            }, stepProperties), time));
        });
        hash.setSequence(sequenceEditor.get());
    },

    setup = () => {
        document.body.appendChild(svg({
            width: "100%",
            height: "100%",
            viewBox: "-1 -1 2 2",
            style: `background-color: ${colors.background};`
        }, [gradients()]
            .concat(
                createDigit(-0.7, 0),
                createDigit(-0.45, 1),
                svg.text(Object.assign({x: -0.1, y: -0.52}, digitProperties), ":"),
                createDigit(-0.15, 2),
                createDigit(0.1, 3),
                svg.image({x: 0.2, y: -0.72, "xlink:href": durationIcon, height: 0.2, width: 0.2}),
                svg.text(Object.assign({id: "total", x: 0.4, y: -0.57,
                    "font-size": 0.15, "text-anchor": "start"}, commonTextProperties), "00:00")
            )
            .concat(
                createButton({id: "about", cx: -0.6, icon: aboutIcon}),
                createButton({id: "remove", cx: -0.2, y: 0.90, label: "-"}),
                createButton({id: "add", cx: 0.2, y: 0.92, label: "+"}),
                createButton({id: "run", cx: 0.6, icon: runIcon}),
                svg.g({id: "list"})
            )
        ));
        sequenceEditor.set(hash.getSequence());
        sequenceEditor.on(refresh);

        return {
            inc0: () => sequenceEditor.inc(600),
            dec0: () => sequenceEditor.dec(600),
            inc1: () => sequenceEditor.inc(60),
            dec1: () => sequenceEditor.dec(60),
            inc2: () => sequenceEditor.inc(10),
            dec2: () => sequenceEditor.dec(10),
            inc3: () => sequenceEditor.inc(1),
            dec3: () => sequenceEditor.dec(1),
            add: () => sequenceEditor.get().length < 16 ? sequenceEditor.add() : 0,
            remove: () => sequenceEditor.remove(),
            run: () => hash.setMode("run"),
            about: () => hash.setMode("about")
        };
    };

module.exports = {
    setup: setup
};
