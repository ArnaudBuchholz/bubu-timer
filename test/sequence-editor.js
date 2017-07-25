"use strict";

const
    sequenceEditor = require("../src/sequence-editor");

describe("sequence-editor", () => {

    it("exposes a known interface", () => {
        ["on", "reset", "add", "sub"].forEach(name => {
            assert("function" === typeof sequenceEditor[name]);
        });
    });

    it("notifies of empty sequence", () => {
        sequenceEditor.on(sequence => {
            assert(sequence.length === 1);
            assert(sequence[0] === 0);
        });
        sequenceEditor.reset();
    });

    it("resets with a default value", () => {
        sequenceEditor.on(sequence => {
            assert(sequence.length === 1);
            assert(sequence[0] === 1000);
        });
        sequenceEditor.reset(1000);
    });

    describe("duration modification", () => {

        it("allows adding ms", () => {
            let expected = [1000];
            sequenceEditor.on(sequence => {
                assert(sequence.length === expected.length);
                expected.forEach((ms, pos) => {
                    assert(sequence[pos] === ms);
                });
            });
            sequenceEditor.reset(1000);
            expected = [2000];
            sequenceEditor.add(1000);
            expected = [3000];
            sequenceEditor.add(1000);
        });

        it("allows substracting ms", () => {
            let expected = [1000];
            sequenceEditor.on(sequence => {
                assert(sequence.length === expected.length);
                expected.forEach((ms, pos) => {
                    assert(sequence[pos] === ms);
                });
            });
            sequenceEditor.reset(1000);
            expected = [500];
            sequenceEditor.sub(500);
            expected = [0];
            sequenceEditor.sub(500);
        });

        it("never goes below 0", () => {
            let expected = [1000];
            sequenceEditor.on(sequence => {
                assert(sequence.length === expected.length);
                expected.forEach((ms, pos) => {
                    assert(sequence[pos] === ms);
                });
            });
            sequenceEditor.reset(1000);
            expected = [0];
            sequenceEditor.sub(1500);
            expected = [0];
            sequenceEditor.sub(500);
        });

    });

});

