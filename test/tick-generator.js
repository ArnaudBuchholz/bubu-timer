"use strict";

const tickGenerator = require("../src/tick-generator");

describe("tick-generator", function () {

    it("exists", () => {
        assert(tickGenerator);
    });

    it("allocates a tick generator", () => {
        let ticker = tickGenerator.allocate([10]);
        assert(ticker);
    });

    it("exposes tick, pause and resume methods", () => {
        let ticker = tickGenerator.allocate([10]);
        ["tick", "pause", "resume"].forEach(methodName => {
            assert("function" === typeof ticker[methodName]);
        });
    });

    it("exposes on callback handler", () => {
        let ticker = tickGenerator.allocate([10]);
        assert("function" === typeof ticker.on);
    });

    it("triggers a tick upon callback attachment", (done) => {
        let ticker = tickGenerator.allocate([10]);
        ticker.on((tick) => {
            try {
                assert(tick.paused === true);
                done();
            } catch (e) {
                done(e);
            }
        })
    });

});
