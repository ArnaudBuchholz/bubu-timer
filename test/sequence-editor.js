"use strict";

const
    sequenceEditor = require("../src/sequence-editor");

describe("sequence-editor", () => {

    ["on", "inc", "dec"].forEach(methodName => {
        it(`exposes ${methodName} method`, () => {
            let editor = sequenceEditor.allocate();
            assert("function" === typeof editor [methodName]);
        });
    });

    it("notifies of UI refreshes", () => {
        let editor = sequenceEditor.allocate();
        editor.on(sequence => {
            assert(sequence.length === 1);
            assert(sequence[0] === "00:00");
        });
    });

    describe("duration modification", () => {

        const
            playScenario = (label, scenario) => {
                it(label, () => {
                    let expected = ["00:00"],
                        editor = sequenceEditor.allocate(),
                        callbackCount = 0;
                    editor.on(sequence => {
                        assert(sequence.length === expected.length);
                        expected.forEach((ms, pos) => {
                            assert(sequence[pos] === ms);
                        });
                        ++callbackCount;
                    });
                    callbackCount = 0;
                    scenario.forEach((item, index) => {
                        assert(callbackCount === index);
                        expected = item.expected;
                        if (item.inc) {
                            editor.inc(item.inc);
                        } else if (item.dec) {
                            editor.dec(item.dec);
                        }
                        assert(callbackCount === index + 1);
                    });
                });
            };

        playScenario("scenario 1", [{
            inc: 1,
            expected: ["00:01"]
        }, {
            inc: 1,
            expected: ["00:02"]
        }, {
            inc: 1,
            expected: ["00:03"]
        }]);

        playScenario("scenario 2", [{
            inc: 10,
            expected: ["00:10"]
        }, {
            dec: 1,
            expected: ["00:09"]
        }, {
            dec: 1,
            expected: ["00:08"]
        }]);

        playScenario("scenario 3 (never below 0)", [{
            inc: 10,
            expected: ["00:10"]
        }, {
            dec: 15,
            expected: ["00:00"]
        }, {
            inc: 1,
            expected: ["00:01"]
        }]);

    });

});

