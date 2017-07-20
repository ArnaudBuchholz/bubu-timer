"use strict";

const tickGenerator = require("../src/tick-generator");

describe("tick-generator", function () {

    it("exists", () => {
        assert(tickGenerator);
    });

    it("allocates a tick generator", () => {
        let ticker = tickGenerator.allocate();
        assert(ticker);
    });

    it("exposes tick, pause and resume methods", () => {
        let ticker = tickGenerator.allocate();
        ["tick", "pause", "resume"].forEach(methodName => {
            assert("function" === typeof ticker[methodName]);
        });
    });

    it("exposes on callback handler", () => {
        let ticker = tickGenerator.allocate();
        assert("function" === typeof ticker.on);
    });

    it("triggers a tick upon callback attachment", (done) => {
        let ticker = tickGenerator.allocate();
        ticker.on((tick) => {
            try {
                assert(tick.paused === true);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("starts paused", (done) => {
        let ticker = tickGenerator.allocate(),
            ticked = 0;
        ticker.on((tick) => {
            try {
                assert(tick.paused === true);
                assert(tick.elapsed === 0);
                if (3 === ++ticked) {
                    done();
                }
            } catch (e) {
                done(e);
            }
        });
        setTimeout(function () {
            ticker.tick();
            setTimeout(function () {
                ticker.tick();
            }, 100);
        }, 100);
    });

    it("measures elapsed time", (done) => {
        let ticker = tickGenerator.allocate(),
            ticked = 0;
        ticker.on((tick) => {
            try {
                if (3 === ++ticked) {
                    assert(100 <= tick.elapsed);
                    done();
                }
            } catch (e) {
                console.log(e);
                done(e);
            }
        });
        ticker.resume();
        setTimeout(function () {
            ticker.tick();
        }, 100);
    });

    it("stops measuring time on pause", (done) => {
        let ticker = tickGenerator.allocate(),
            ticked = 0;
        ticker.on((tick) => {
            try {
                if (2 < ticked) {
                    assert(100 <= tick.elapsed);
                    assert(200 >= tick.elapsed);
                }
                if (2 === ticked) {
                    assert(tick.paused === false);
                }
                if (3 === ticked) {
                    assert(tick.paused === true);
                }
                if (5 === ++ticked) {
                    done();
                }
            } catch (e) {
                console.log(e);
                done(e);
            }
        });
        ticker.resume();
        setTimeout(function () {
            ticker.pause();
            setTimeout(function () {
                ticker.tick();
                setTimeout(function () {
                    ticker.tick();
                }, 100);
            }, 100);
        }, 100);
    });

});
