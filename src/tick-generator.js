"use strict";

const
    _allocate = () => {
        return {
            elapsed: 0,
            refTick: null,
            callback: () => {}
        }
    },

    _update = (ticker, active) => {
        let now = new Date(),
            elapsed = ticker.elapsed;
        if (ticker.refTick) {
            elapsed += now - ticker.refTick;
            if (false === active) {
                ticker.elapsed = elapsed;
                ticker.refTick = null;
            }
        } else if (active) {
            ticker.refTick = now;
        }
        return elapsed;
    },

    _notify = (ticker, active) => {
        let elapsed = _update(ticker, active);
        ticker.callback({
            paused: !ticker.refTick,
            elapsed: elapsed
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
