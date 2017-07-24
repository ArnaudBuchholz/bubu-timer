"use strict";

const fs = require("fs");

let qUnit = require("qunit");
qUnit.setup({
    log: {
        errors: true,
        tests: true,
        globalSummary: true,
        testing: true
    },
    maxBlockDuration: 2000
});

qUnit.run({
    code: "test/adapter/qunit.js",
    tests: fs.readdirSync("test")
        .filter(name => -1 === ["adapter", "qunit.js"].indexOf(name))
        .map(name => "test/" + name)
}, err => {
    if (err) {
        console.log(err);
    }
});

