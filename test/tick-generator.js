"use strict";

const
    tickGenerator = require("../src/tick-generator"),

    TICK = (ticker) => ticker.tick(),
    PAUSE = (ticker) => ticker.pause(),
    RESUME = (ticker) => ticker.resume(),

    execute = (ticker, sequence, delay = 100) => {
        return new Promise((resolve) => {
            const next = () => {
                let command = sequence.shift();
                setTimeout(function () {
                    command.call(null, ticker);
                    if (sequence.length) {
                        next();
                    } else {
                        resolve();
                    }
                }, delay);
            };
            next();

        });
    }
;


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
                assert(tick.paused);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("starts paused", (done) => {
        let ticker = tickGenerator.allocate();
        ticker.on((tick) => {
            try {
                assert(tick.paused);
                assert(0 === tick.elapsed);
            } catch (e) {
                done(e);
            }
        });
        execute(ticker, [TICK, TICK]).then(done);
    });

    it("measures elapsed time", (done) => {
        let ticker = tickGenerator.allocate(),
            ticked = -1; // 0 is initial tick when attaching callback
        ticker.on((tick) => {
            try {
                ++ticked;
                if (1 === ticked) {
                    assert(0 === tick.elapsed);
                } else if (2 === ticked) {
                    assert(100 <= tick.elapsed);
                }
            } catch (e) {
                done(e);
            }
        });
        execute(ticker, [RESUME, TICK]).then(done);
    });

    it("stops measuring time on pause", (done) => {
        let ticker = tickGenerator.allocate(),
            ticked = -1,  // 0 is initial tick when attaching callback
            lastElapsed;
        ticker.on((tick) => {
            try {
                ++ticked;
                if (2 < ticked) {
                    lastElapsed = tick.elapsed;
                    assert(200 <= lastElapsed);
                    assert(300 >= lastElapsed);
                }
                if (0 === ticked) {
                    assert(tick.paused);
                } else if (1 === ticked || 2 === ticked) {
                    assert(!tick.paused);
                } else {
                    assert(lastElapsed === tick.elapsed);
                    assert(tick.paused);
                }
            } catch (e) {
                console.log(e);
                done(e);
            }
        });
        execute(ticker, [RESUME, TICK, PAUSE, TICK]).then(done);
    });

});
