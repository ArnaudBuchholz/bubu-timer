"use strict";

// https://stackoverflow.com/questions/6666907/how-to-detect-a-mobile-device-with-javascript
module.exports = new RegExp([
    "Android",
    "webOS",
    "iPhone",
    "iPad",
    "iPod",
    "BlackBerry",
    "BB",
    "PlayBook",
    "IEMobile",
    "Windows Phone",
    "Kindle",
    "Silk",
    "Opera Mini"
].join("|"), "i").test(navigator.userAgent);
