"use strict";

if (!Object.assign) {
    Object.assign = function (target, properties) {
        Object.keys(properties).forEach(function (propertyName) {
            target[propertyName] = properties[propertyName];
        });
        return target;
    };
}

module.exports = true;
