"use strict";

let qUnit = require("qunit");
qUnit.setup({
    log: {
        errors: true,
        tests: true,
        globalSummary: true,
        testing: true
    }
});

// one code and tests file
qUnit.run({
    code: "test/adapter/qunit.js",
    tests: "test/tick-generator.js"
}, err => {
    if (err) {
        console.log(err);
    }
});
