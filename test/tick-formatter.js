"use strict";

const tickFormatter = require("../src/tick-formatter");

describe("tick-formatter", function () {

    it("is a function", () => {
        assert("function" === typeof tickFormatter);
    });

    [{
        label: "0",
        tick: 0,
        ms: 0,
        s: 0,
        m: 0,

    }].forEach(test => {
        let {
            label,
            tick,
            ms,
            s,
            m
        } = test;
        it(`format tick into time details: ${label}`, () => {
            let formatted = tickFormatter(tick);
            assert(ms === formatted.ms);
            assert(s === formatted.s);
            assert(m === formatted.m);
        });
    });


});
