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
        editor.on(sequence => {
            assert(sequence.length === 1);
            assert(sequence[0] === "00:00");
        });
    });

    const
        actions = {
            inc: (editor, seconds) => editor.inc(seconds),
            dec: (editor, seconds) => editor.dec(seconds),
            add: editor => editor.add(),
            remove: editor => editor.remove()
        },
        playScenario = (label, scenario, expectedSequence) => {
            it(label, () => {
                let expected = ["00:00"],
                    expectedLengthChanged = false,
                    editor = sequenceEditor.allocate(),
                    callbackCount = 0;
                editor.on((sequence, lengthChanged) => {
                    assert(sequence.length === expected.length);
                    expected.forEach((ms, pos) => {
                        assert(sequence[pos] === ms);
                    });
                    assert(expectedLengthChanged === lengthChanged);
                    ++callbackCount;
                });
                callbackCount = 0;
                scenario.forEach((item, index) => {
                    assert(callbackCount === index);
                    expected = item.expected;
                    let action = Object.keys(item).filter(name => name !== "expected")[0];
                    expectedLengthChanged = undefined !== item.expectedLengthChanged
                        ? item.expectedLengthChanged
                        : -1 !== ["add", "remove"].indexOf(action);
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
            expected: ["00:01"]
        }, {
            inc: 1,
            expected: ["00:02"]
        }, {
            inc: 1,
            expected: ["00:03"]
        }, {
            inc: 10,
            expected: ["00:13"]
        }, {
            inc: 60,
            expected: ["01:13"]
        }, {
            inc: 3600,
            expected: ["61:13"]
        }], [3673000]);

        playScenario("scenario 2", [{
            inc: 10,
            expected: ["00:10"]
        }, {
            dec: 1,
            expected: ["00:09"]
        }, {
            dec: 1,
            expected: ["00:08"]
        }], [8000]);

        playScenario("scenario 3 (never below 0)", [{
            inc: 10,
            expected: ["00:10"]
        }, {
            dec: 15,
            expected: ["00:00"]
        }, {
            inc: 1,
            expected: ["00:01"]
        }, {
            inc: 60,
            expected: ["01:01"]
        }, {
            dec: 3600,
            expected: ["00:00"]
        }], [0]);

    });

    describe("adding duration", () => {

        playScenario("scenario 1", [{
            inc: 60,
            expected: ["01:00"]
        }, {
            add: true,
            expected: ["01:00", "00:00"]
        }, {
            inc: 30,
            expected: ["01:00", "00:30"]
        }, {
            dec: 10,
            expected: ["01:00", "00:20"]
        }], [60000, 20000]);

    });

    describe("removing duration", () => {

        playScenario("scenario 1", [{
            inc: 60,
            expected: ["01:00"]
        }, {
            add: true,
            expected: ["01:00", "00:00"]
        }, {
            inc: 30,
            expected: ["01:00", "00:30"]
        }, {
            remove: true,
            expected: ["01:00"]
        }], [60000]);

        playScenario("scenario 2 (always one item)", [{
            inc: 60,
            expected: ["01:00"]
        }, {
            add: true,
            expected: ["01:00", "00:00"]
        }, {
            inc: 30,
            expected: ["01:00", "00:30"]
        }, {
            remove: true,
            expected: ["01:00"]
        }, {
            remove: true,
            expected: ["00:00"],
            expectedLengthChanged: false
        }], [0]);

    });
});

