"use strict";

const
    sequenceEditor = require("../src/sequence-editor");

describe("sequence-editor", () => {

    ["on", "inc", "dec", "add", "remove", "get"].forEach(methodName => {
        it(`exposes ${methodName} method`, () => {
            let editor = sequenceEditor.allocate();
            assert("function" === typeof editor [methodName]);
        });
    });

    it("notifies of UI refreshes", () => {
        let editor = sequenceEditor.allocate();
        editor.on((sequence, total) => {
            assert(sequence.length === 1);
            assert(sequence[0] === "00:00");
            assert(total === "00:00");
        });
    });

    const
        actions = {
            inc: (editor, seconds) => editor.inc(seconds),
            dec: (editor, seconds) => editor.dec(seconds),
            add: editor => editor.add(),
            remove: editor => editor.remove(),
            set: (editor, sequence) => editor.set(sequence)
        },
        playScenario = (label, scenario, expectedSequence) => {
            it(label, () => {
                let expected = ["00:00"],
                    expectedTotal,
                    editor = sequenceEditor.allocate(),
                    callbackCount = 0;
                editor.on((sequence, total) => {
                    assert(sequence.length === expected.length);
                    expected.forEach((ms, pos) => {
                        assert(sequence[pos] === ms);
                    });
                    if (expectedTotal) {
                        assert(expectedTotal === total);
                    }
                    ++callbackCount;
                });
                callbackCount = 0;
                scenario.forEach((item, index) => {
                    assert(callbackCount === index);
                    expected = item.expected;
                    let action = Object.keys(item).filter(name => name !== "expected")[0];
                    expectedTotal = item.expectedTotal;
                    actions[action](editor, item[action], item);
                    assert(callbackCount === index + 1);
                });
                if (expectedSequence) {
                    let sequence = editor.get();
                    assert(expectedSequence.length === sequence.length);
                    expectedSequence.forEach((tick, index) => {
                        assert(tick === sequence[index]);
                    });
                }
            });
        };

    describe("duration modification", () => {

        playScenario("scenario 1", [{
            inc: 1,
            expected: ["00:01"],
            expectedTotal: "00:01"
        }, {
            inc: 1,
            expected: ["00:02"],
            expectedTotal: "00:02"
        }, {
            inc: 1,
            expected: ["00:03"],
            expectedTotal: "00:03"
        }, {
            inc: 10,
            expected: ["00:13"],
            expectedTotal: "00:13"
        }, {
            inc: 60,
            expected: ["01:13"],
            expectedTotal: "01:13"
        }, {
            inc: 3600,
            expected: ["61:13"],
            expectedTotal: "61:13"
        }], [3673000]);

        playScenario("scenario 2", [{
            inc: 10,
            expected: ["00:10"],
            expectedTotal: "00:10"
        }, {
            dec: 1,
            expected: ["00:09"],
            expectedTotal: "00:09"
        }, {
            dec: 1,
            expected: ["00:08"],
            expectedTotal: "00:08"
        }], [8000]);

        playScenario("scenario 3 (never below 0)", [{
            inc: 10,
            expected: ["00:10"],
            expectedTotal: "00:10"
        }, {
            dec: 15,
            expected: ["00:00"],
            expectedTotal: "00:00"
        }, {
            inc: 1,
            expected: ["00:01"],
            expectedTotal: "00:01"
        }, {
            inc: 60,
            expected: ["01:01"],
            expectedTotal: "01:01"
        }, {
            dec: 3600,
            expected: ["00:00"],
            expectedTotal: "00:00"
        }], [0]);

        playScenario("scenario 4 (never over 99:59)", [{
            inc: 3600,
            expected: ["60:00"],
            expectedTotal: "60:00"
        }, {
            inc: 3600,
            expected: ["99:59"],
            expectedTotal: "99:59"
        }], [5999000]);

    });

    describe("adding duration", () => {

        playScenario("scenario 1", [{
            inc: 60,
            expected: ["01:00"],
            expectedTotal: "01:00"
        }, {
            add: true,
            expected: ["01:00", "00:00"],
            expectedTotal: "01:00"
        }, {
            inc: 30,
            expected: ["01:00", "00:30"],
            expectedTotal: "01:30"
        }, {
            dec: 10,
            expected: ["01:00", "00:20"],
            expectedTotal: "01:20"
        }], [60000, 20000]);

    });

    describe("removing duration", () => {

        playScenario("scenario 1", [{
            inc: 60,
            expected: ["01:00"],
            expectedTotal: "01:00"
        }, {
            add: true,
            expected: ["01:00", "00:00"],
            expectedTotal: "01:00"
        }, {
            inc: 30,
            expected: ["01:00", "00:30"],
            expectedTotal: "01:30"
        }, {
            remove: true,
            expected: ["01:00"],
            expectedTotal: "01:00"
        }], [60000]);

        playScenario("scenario 2 (always one item)", [{
            inc: 60,
            expected: ["01:00"],
            expectedTotal: "01:00"
        }, {
            add: true,
            expected: ["01:00", "00:00"],
            expectedTotal: "01:00"
        }, {
            inc: 30,
            expected: ["01:00", "00:30"],
            expectedTotal: "01:30"
        }, {
            remove: true,
            expected: ["01:00"],
            expectedTotal: "01:00"
        }, {
            remove: true,
            expected: ["00:00"],
            expectedTotal: "00:00"
        }], [0]);

    });

    describe("initializing sequence", () => {

        playScenario("scenario 1", [{
            set: [60000],
            expected: ["01:00"],
            expectedTotal: "01:00"
        }, {
            inc: 30,
            expected: ["01:30"],
            expectedTotal: "01:30"
        }], [90000]);

        playScenario("scenario 2", [{
            set: [],
            expected: ["00:00"],
            expectedTotal: "00:00"
        }], [0]);

    });

});
