"use strict";
module.exports = function requireFile(fullPath, callback) {
    try {
        callback(null, require(fullPath));
    } catch (err) {
        callback(err);
    }
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }