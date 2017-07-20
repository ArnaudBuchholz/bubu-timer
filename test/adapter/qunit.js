"use strict";

let _labels = [];

global.describe = (label, content) => {
    _labels.push(label);
    QUnit.module(_labels.join(" / "));
    content();
    _labels.pop();
};

global.it = (label, callback) => {
    if (callback) {
        QUnit.test(label, assert => {
            if (callback.length) {
                var done = assert.async();
                callback((e) => {
                    assert.ok(undefined === e);
                    done();
                });
            } else {
                callback();
                assert.ok(true);
            }
        });
    } else {
        QUnit.skip(label);
    }
};

global.assert = require("assert");
