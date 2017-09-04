"use strict";

const
    sequenceSerializer = require("./sequence-serializer"),
    _parse = () => location.hash ? location.hash.substr(1).split("/") : [],
    _update = parts => {
        location.hash = "#" + parts.join("/")
    },

    _getMode = (defaultMode = "") => _parse()[0] || defaultMode,

    _setMode = mode => {
        const parts = _parse();
        parts[0] = mode;
        _update(parts);
    },

    _getSequence = () => {
        const encodedSequence = _parse()[1];
        if (encodedSequence) {
            return sequenceSerializer.read(encodedSequence);
        }
        return [];
    },

    _setSequence = sequence => {
        const parts = _parse();
        parts[1] = sequenceSerializer.write(sequence);
        _update(parts);
    },

    _getOptions = (defaultOptions = {}) => {
        const
            encodedOptions = _parse()[2],
            options = Object.assign({}, defaultOptions);
        if (encodedOptions) {
            encodedOptions.split(",").forEach(option => {
                const
                    lenMinus1 = option.length - 1,
                    flag = option.charAt(lenMinus1),
                    name = option.substr(0, lenMinus1);
                options[name] = flag === "+";
            });
        }
        return options;
    },

    _setOptions = options => {
        const parts = _parse();
        parts[2] = Object.keys(options)
            .map(name => name + (options[name] ? "+" : "-"))
            .join(",");
        _update(parts);
    }
;

module.exports = {

    getMode: _getMode,
    setMode: _setMode,
    getSequence: _getSequence,
    setSequence: _setSequence,
    getOptions: _getOptions,
    setOptions: _setOptions

};
