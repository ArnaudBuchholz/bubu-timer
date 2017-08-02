"use strict";

const
    sequenceSerializer = require("../src/sequence-serializer"),

    tests = [{
        string: "",
        sequence: []
    }, {
        string: "1",
        sequence: [1000]
    }, {
        string: "1,2,3",
        sequence: [1000,2000,3000]
    }];

describe("sequence-serializer", () => {

    it("exposes read and write", () => {
        assert("function" === typeof sequenceSerializer.read);
        assert("function" === typeof sequenceSerializer.write);
    });

    describe("write", () => {

        tests.forEach(({string, sequence}) => {
            it(`${JSON.stringify(sequence)} => "${string}"`, function () {
                assert(string === sequenceSerializer.write(sequence));
            });
        });

    });

    describe("read", () => {

        tests.forEach(({string, sequence}) => {
            it(`"${string}" => ${JSON.stringify(sequence)}`, function () {
                let result = sequenceSerializer.read(string);
                assert(result.length === sequence.length);
                sequence.forEach((count, index) => assert(count === result[index]));
            });
        });

    });

});

