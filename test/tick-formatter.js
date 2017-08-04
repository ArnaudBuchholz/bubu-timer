"use strict";

const tickFormatter = require("../src/tick-formatter");

describe("tick-formatter", function () {

    it("is a function", () => {
        assert("function" === typeof tickFormatter);
    });

    [{
        tick: 0,
        ms: "000",
        time: "00:00"

    }, {
        tick: 347,
        ms: "347",
        time: "00:00"

    }, {
        tick: 54347,
        ms: "347",
        time: "00:54"

    }, {
        tick: 154348,
        ms: "348",
        time: "02:34"

    }, {
        tick: 4474348,
        ms: "348",
        time: "74:34"

    }].forEach(({tick, time, ms}) => {
        it(`format tick into time details: ${tick} = ${time}.${ms}`, () => {
            let formatted = tickFormatter(tick);
            // console.log(`${time}.${ms} =? ${formatted.time}.${formatted.ms}`);
            assert(time === formatted.time);
            assert(ms === formatted.ms);
        });
    });


});
