"use strict";

let
    _media,
    _endRequested = false;

const
    noop = () => {},

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

    _addSource = (audioElement, data, type) => {
        let source = document.createElement("source");
        source.src = data;
        source.type = `audio/${type}`;
        audioElement.appendChild(source);
    },

    _createAudio = () => {
        let audioElement = document.createElement("audio");
        audioElement.id = "sounds";
        audioElement.loop = true;
        _addSource(audioElement, require("./res/sounds.ogg"), "ogg");
        _addSource(audioElement, require("./res/sounds.mp3"), "mp3");
        _media = document.body.appendChild(audioElement);
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
            _createAudio();
        }
        _media.play();
    },

    _pause = () => {
        _media.pause();
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

