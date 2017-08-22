"use strict";

/*global location*/

const
    browser = require("./browser"),
    svg = require("./svg"),
    colors = require("./colors"),
    gradients = require("./gradients"),
    sequenceEditor = require("./sequence-editor").allocate(),
    sequenceSerializer = require("./sequence-serializer"),

    digitProperties = {
        "font-family": "Arial", "font-size": 0.25, "text-anchor": "middle",
        fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001
    },

    createDigit = (x, baseId) => [
        svg.rect({x: x - 0.1, y: -0.8, width: 0.2, height: 0.4,
            fill: colors.circle.background, stroke: "url(#outerBorder)", "stroke-width": 0.01}),
        svg.text(Object.assign({id: `inc${baseId}`, x: x, y: -0.8}, digitProperties), "⏶"),
        svg.text(Object.assign({id: `dig${baseId}`, x: x, y: -0.52}, digitProperties), ""),
        svg.text(Object.assign({id: `dec${baseId}`, x: x, y: -0.26}, digitProperties), "⏷")
    ],

    createButton = ({id, cx, x, y, label}) => [
        svg.g({id: id}, [
            svg.circle({r: 0.15, cx: cx, cy: 0.7,
                fill: colors.circle.light, stroke: "url(#innerBorder)", "stroke-width": 0.01}),
            svg.text({x: x, y: y, "font-family": "Arial", "font-size": 0.2, "text-anchor": "middle",
                fill: colors.text.step, stroke: "url(#outerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001},
            label)
        ])
    ],

    encodedSequence = () => sequenceSerializer.write(sequenceEditor.get()),

    refresh = (sequence/*, lengthChanged*/) => {
        let current = sequence[sequence.length - 1],
            list = document.getElementById("list");
        [0, 1, 3, 4].forEach((pos, digit) => {
            document.getElementById(`dig${digit}`).innerHTML = current.substr(pos, 1);
        });
        list.innerHTML = ""; // clean
        sequence.forEach((time, index) => {
            list.appendChild(svg.text({
                x: -0.5 + 0.45 * (index % 4),
                y: 0.15 * Math.floor(index / 4),
                "font-family": "Arial", "font-size": 0.15, "text-anchor": "end",
                fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001
            }, time));
        });
        location.hash = encodedSequence();
    },

    setup = () => {
        document.body.appendChild(svg({
            width: "100%",
            height: "100%",
            viewBox: "-1 -1 2 2",
            style: `background-color: ${colors.background};`
        }, [gradients()]
            .concat(
                createDigit(-0.4, 0),
                createDigit(-0.15, 1),
                svg.text(Object.assign({x: 0, y: -0.52}, digitProperties), ":"),
                createDigit(0.15, 2),
                createDigit(0.4, 3)
            )
            .concat(
                createButton({id: "remove", cx: -0.4, x: -0.4, y: 0.75, label: "-"}),
                createButton({id: "add", cx: 0, x: 0, y: 0.77, label: "+"}),
                createButton({id: "run", cx: 0.4, x: 0.42, y: 0.77, label: "▶"}),
                svg.g({id: "list"})
            )
        ));
        sequenceEditor.set(sequenceSerializer.read(location.hash.substr(1)));
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
            run: () => {
                window.location = "run.html?" + encodedSequence();
            }
        };
    };

browser(setup);
