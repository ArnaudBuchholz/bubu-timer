"use strict";

/*global global*/

const
    hash = require("../src/hash");

global.location = {
    hash: ""
};

describe("hash", function () {

    describe("getMode", function () {

        it("Get when empty", function () {
            location.hash = "";
            assert(hash.getMode("edit") === "edit");
        });

        it("Get when filled", function () {
            location.hash = "#run/1,2,3/anything";
            assert(hash.getMode("edit") === "run");
        });

    });

    describe("setMode", function () {

        it("Set when empty", function () {
            location.hash = "";
            hash.setMode("run");
            assert(location.hash === "#run");
        });

        it("Set when filled", function () {
            location.hash = "#edit/1,2,3/anything";
            hash.setMode("run");
            assert(location.hash === "#run/1,2,3/anything");
        });

    });

    describe("getSequence", function () {

        it("Get when empty", function () {
            location.hash = "";
            assert(hash.getSequence().length === 0);
        });

        it("Get when filled", function () {
            location.hash = "#run/1,2,3/anything";
            let sequence = hash.getSequence();
            assert(sequence.length === 3);
            assert(sequence[0] === 1000);
            assert(sequence[1] === 2000);
            assert(sequence[2] === 3000);
        });

    });

    describe("setSequence", function () {

        it("Set when empty", function () {
            location.hash = "";
            hash.setSequence([1000,2000,3000]);
            assert(location.hash === "#/1,2,3");
        });

        it("Set when filled", function () {
            location.hash = "#edit/1,2,3/anything";
            hash.setSequence([1000,2000,3000,4000]);
            assert(location.hash === "#edit/1,2,3,4/anything");
        });

    });

    describe("getOptions", function () {

        it("Get when empty", function () {
            location.hash = "";
            const defaultOptions = {
                test: true
            };
            let resolvedOptions = hash.getOptions(defaultOptions);
            assert(Object.keys(resolvedOptions).length === 1);
            assert(resolvedOptions.test === true);
        });

        it("Get when filled", function () {
            location.hash = "#run/1,2,3/ms+,visual-";
            let options = hash.getOptions();
            assert(Object.keys(options).length === 2);
            assert(options.ms === true);
            assert(options.visual === false);
        });

    });

    describe("setOptions", function () {

        it("Set when empty", function () {
            location.hash = "";
            hash.setOptions({
                ms: true,
                visual: false
            });
            assert(location.hash === "#//ms+,visual-");
        });

        it("Set when filled", function () {
            location.hash = "#run/1,2,3/ms+,visual-";
            hash.setOptions({
                test: true
            });
            assert(location.hash === "#run/1,2,3/test+");
        });

    });

});


