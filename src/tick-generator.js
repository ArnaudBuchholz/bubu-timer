"use strict";

const
    _allocate = () => {
        return {
            active: false,
            elapsed: 0,
            lastTick: new Date(),
            callback: () => {}
        }
    },

    _notify = (ticker, active) => {
        let now = new Date();
        if (ticker.active) {
            ticker.elapsed += now - ticker.lastTick;
        }
        ticker.lastTick = now;
        ticker.callback({
            paused: !ticker.active,
            elapsed: ticker.elapsed
        });
        if (undefined !== active) {
            ticker.active = active;
        }
    },

    _tick = (ticker) => {
        _notify(ticker);
    },

    _pause = (ticker) => {
        _notify(ticker, false);
    },

    _resume = (ticker) => {
        _notify(ticker, true);
    },

    _attach = (ticker, callback) => {
        ticker.callback = callback;
        _notify(ticker);
    };

module.exports = {

    allocate: function () {
        let ticker = _allocate();
        return {

            tick: () => {
                return _tick(ticker);
            },

            pause: () => {
                return _pause(ticker);
            },

            resume: () => {
                return _resume(ticker);
            },

            on: (callback) => {
                return _attach(ticker, callback);
            }

        };
    }

};
