"use strict";

const
    gpf = require("gpf-js"),
    sequenceSerializer = require("./sequence-serializer");

/*eslint-disable no-alert, no-undef*/
alert(`gpf: ${gpf.version()}, sequenceSerializer: ${sequenceSerializer ? "OK" : "KO"}`);
