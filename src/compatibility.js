"use strict";

if (!Object.assign) {
    Object.assign = function (target, properties) {
        Object.keys(properties).forEach(function (propertyName) {
            target[propertyName] = properties[propertyName];
        });
        return target;
    };
}

function FakeAudio () {
}

FakeAudio.prototype.play = function () {
};

if ("undefined" === typeof Audio) {
    window.Audio = FakeAudio;
}

let video = document.createElement("video");
if ("function" !== typeof video.play) {
    const
        initialCreateElement = document.createElement,
        fakeVideo = {
            setAttribute: () => {},
            addEventListener: () => {},
            // Copied from NoSleepJS
            play: () => {
                fakeVideo.pause();
                fakeVideo.noSleepTimer = window.setInterval(function () {
                    window.location.href = "/";
                    window.setTimeout(window.stop, 0);
                }, 15000);
            },
            pause: () => {
                if (fakeVideo.noSleepTimer) {
                    window.clearInterval(fakeVideo.noSleepTimer);
                    fakeVideo.noSleepTimer = null;
                }
            }
        };
    document.createElement = tagName => tagName === "video" ? fakeVideo : initialCreateElement.call(document, tagName);
}

module.exports = true;
