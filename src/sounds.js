"use strict";

let
    _media,
    _endRequested = false;

const
    noop = require("./noop"),

    _sprites = {
        blank: {
            from: 0,
            to: 5
        },
        tick: {
            from: 5,
            to: 6
        },
        end: {
            from: 6,
            to: 8.5
        }
    },

    _createMedia = () => {
        _media = document.createElement("video");
        _media.loop = true;
        _media.setAttribute("playsinline", "");
        _media.setAttribute("src", require("./res/sounds.mp4"));
        _media.addEventListener("timeupdate", () => {
            const currentTime = _media.currentTime;
            if (currentTime >= _sprites.end.from) {
                _endRequested = true;
            }
            if (currentTime < _sprites.blank.to && _endRequested) {
                _media.pause();
            }
        });
    },

    _play = () => {
        if (!_media) {
            _createMedia();
        }
        _media.play();
    },

    _pause = () => {
        if (_media) {
            _media.pause();
        }
    },

    _playSound = name => () => {
        if (_media) {
            _media.currentTime = _sprites[name].from;
        }
    };

if ("function" === typeof Audio) {
    module.exports = {
        play: _play,
        pause: _pause,
        blank: _playSound("blank"),
        tick: _playSound("tick"),
        end: _playSound("end")
    };
} else {
    module.exports = {
        play: noop,
        pause: noop,
        blank: noop,
        tick: noop,
        end: noop
    };
}

