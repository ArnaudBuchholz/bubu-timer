"use strict";

const tickConverter = require("../src/tick-converter");

describe("tick-converter", function () {

    it("is a function", () => {
        assert("function" === typeof tickConverter);
    });

    [{
        label: "No elapsed time",
        tick: 0,
        sequence: [1000],
        expectedStep: 0,
        expectedRemaining: 1000
    }, {
        label: "Elapsed in first step",
        tick: 123,
        sequence: [1000],
        expectedStep: 0,
        expectedRemaining: 877
    }, {
        label: "First step fully elapsed",
        tick: 1000,
        sequence: [1000],
        expectedStep: 1,
        expectedRemaining: 0

    }].forEach(test => {

        let {label, tick, sequence, expectedStep, expectedRemaining} = test;

        it(`gives remaining time from sequence: ${label}`, () => {
            let result = tickConverter(tick, sequence);
            assert(result.step === expectedStep);
            assert(result.remaining = expectedRemaining);
        });

    });

});
