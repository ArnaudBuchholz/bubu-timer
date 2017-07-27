"use strict";

const
    tickFormatter = require("../src/tick-formatter"),

    zero = (x, count = 2) => {
        let result = [],
            max = Math.pow(10, count - 1);
        while (max > 1 && x < max) {
            result.push("0");
            max /= 10;
        }
        result.push(x);
        return result.join("");
    }
;

describe("tick-formatter", function () {

    it("is a function", () => {
        assert("function" === typeof tickFormatter);
    });

    [{
        tick: 0,
        ms: 0,
        s: 0,
        m: 0,
        digits: [0, 0, 0, 0, 0, 0, 0]

    }, {
        tick: 347,
        ms: 347,
        s: 0,
        m: 0,
        digits: [0, 0, 0, 0, 3, 4, 7]

    }, {
        tick: 54347,
        ms: 347,
        s: 54,
        m: 0,
        digits: [0, 0, 5, 4, 3, 4, 7]

    }, {
        tick: 154348,
        ms: 348,
        s: 34,
        m: 2,
        digits: [0, 2, 3, 4, 3, 4, 8]

    }].forEach(({tick, ms, s, m, digits }) => {
        it(`format tick into time details: ${tick} = ${zero(m)}:${zero(s)}.${zero(ms,4)}`, () => {
            let formatted = tickFormatter(tick);
            assert(ms === formatted.ms);
            assert(s === formatted.s);
            assert(m === formatted.m);
            // digits.forEach((digit, position) => assert(formatted.digits[position] === digit));
        });
    });


});
