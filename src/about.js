"use strict";

const
    hash = require("./hash"),
    svg = require("./svg"),
    colors = require("./colors"),
    gradients = require("./gradients"),
    editIcon = require("./res/settings.svg"),
    likeIcon = require("./res/like.svg"),
    appInfo = require("../package.json"),

    forkMeLabel = "Fork me on GitHub",
    forkMeAttributes = {
        "class": "github-fork-ribbon",
        href: appInfo.homepage,
        "data-ribbon": forkMeLabel,
        target: "_blank",
        title: forkMeLabel
    },

    textProperties = {
        "font-family": "Arial",
        "font-size": 0.15,
        "text-anchor": "left",
        fill: colors.text.step,
        stroke: "url(#innerBorder)",
        "stroke-opacity": 0.2,
        "stroke-width": 0.001
    },
    footerProperties = {
        "font-size": 0.1,
        "text-anchor": "middle"
    },

    setup = () => {
        const forkMeLink = document.createElement("a");
        Object.keys(forkMeAttributes).forEach(name => forkMeLink.setAttribute(name, forkMeAttributes[name ]));
        forkMeLink.innerHTML = forkMeLabel;

        document.body.appendChild(svg({
            width: "100%",
            height: "100%",
            viewBox: "-1 -1 2 2",
            style: `background-color: ${colors.background};`
        }, [gradients()]
            .concat([
                svg.circle({id: "edit", r: 0.15, cx: 0, cy: 0.85,
                    fill: colors.circle.light, stroke: "url(#innerBorder)", "stroke-width": 0.01}),
                svg.image({x: -0.1, y: 0.75, width: 0.2, height: 0.2, "xlink:href": editIcon}),
                svg.text(Object.assign({x: -0.8, y: -0.7}, textProperties, {"font-size": 0.25}), appInfo.name),
                svg.text(Object.assign({x: 0.4, y: -0.7}, textProperties, {"font-size": 0.1}), appInfo.version),
                svg.text(Object.assign({x: -0.8, y: -0.3}, textProperties), "made with"),
                svg.image({x: -0.1, y: -0.5, "xlink:href": likeIcon, height: 0.2, width: 0.2}),
                svg.text(Object.assign({x: -0.8, y: -0.1}, textProperties), "by"),
                svg.text(Object.assign({x: -0.6, y: -0.1}, textProperties), "Arnaud Buchholz"),
                svg.text(Object.assign({x: 0, y: 0.2}, textProperties, footerProperties),
                    "no frameworks were harmed in the"),
                svg.text(Object.assign({x: 0, y: 0.3}, textProperties, footerProperties),
                    "making of this application.")
            ])
        ));
        document.body.appendChild(forkMeLink);

        return {
            edit: () => hash.setMode("edit")
        };

    };

module.exports = {
    setup: setup
};
