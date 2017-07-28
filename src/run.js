const
    gpf = require("gpf-js"),
    sequenceSerializer = require("./sequence-serializer");

alert(`gpf: ${gpf.version()}, sequenceSerializer: ${sequenceSerializer ? "OK" : "KO"}`);
