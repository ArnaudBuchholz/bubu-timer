"use strict";

const
    hash = require("./hash"),
    svg = require("./svg"),
    colors = require("./colors"),
    gradients = require("./gradients"),
    editIcon = require("./res/settings.svg"),

    forkMeLabel = "Fork me on GitHub",

    setup = () => {
        const forkMeLink = document.createElement("a");
        forkMeLink.className = "github-fork-ribbon";
        forkMeLink.href = "https://github.com/ArnaudBuchholz/bubu-timer";
        forkMeLink.setAttribute("data-ribbon", forkMeLabel);
        forkMeLink.title = forkMeLabel;
        forkMeLink.innerHTML = forkMeLabel;

        document.body.appendChild(forkMeLink);
        document.body.appendChild(svg({
            width: "100%",
            height: "100%",
            viewBox: "-1 -1 2 2",
            style: `background-color: ${colors.background};`
        }, [gradients()]
            .concat([
                svg.circle({id: "edit", r: 0.15, cx: 0, cy: 0.85,
                    fill: colors.circle.light, stroke: "url(#innerBorder)", "stroke-width": 0.01}),
                svg.image({x: -0.1, y: 0.75, width: 0.2, height: 0.2, "xlink:href": editIcon})
            ])
        ));

        return {
            edit: () => hash.setMode("edit")
        };

    };

module.exports = {
    setup: setup
};
