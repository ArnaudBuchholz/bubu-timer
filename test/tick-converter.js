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
    }, {
        label: "Elapsed in second step",
        tick: 1123,
        sequence: [1000, 1000],
        expectedStep: 1,
        expectedRemaining: 877
    }, {
        label: "Second step fully elapsed",
        tick: 2000,
        sequence: [1000, 1000, 1000],
        expectedStep: 2,
        expectedRemaining: 1000
    }, {
        label: "Over last step",
        tick: 3050,
        sequence: [1000, 1000, 1000],
        expectedStep: 3,
        expectedRemaining: 0

    }].forEach(test => {

        let {label, tick, sequence, expectedStep, expectedRemaining} = test;

        it(`gives remaining time from sequence: ${label}`, () => {
            let {step, remaining} = tickConverter(tick, sequence);
            // console.log(`${label} step ${step} =? ${expectedStep} remaining ${remaining} =? ${expectedRemaining}`);
            assert(step === expectedStep);
            assert(remaining === expectedRemaining);
        });

    });

});
