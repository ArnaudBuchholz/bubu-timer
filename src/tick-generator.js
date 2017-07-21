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
        if (undefined !== active) {
            ticker.active = active;
        }
        ticker.callback({
            paused: !ticker.active,
            elapsed: ticker.elapsed
        });
    },

    _tick = ticker => _notify(ticker),

    _pause = ticker => _notify(ticker, false),

    _resume = ticker => _notify(ticker, true),

    _attach = (ticker, callback) => {
        ticker.callback = callback;
        _notify(ticker);
    };

module.exports = {

    allocate: function () {
        let ticker = _allocate();
        return {
            tick: () => _tick(ticker),
            pause: () => _pause(ticker),
            resume: () => _resume(ticker),
            on: callback => _attach(ticker, callback)
        };
    }

};
