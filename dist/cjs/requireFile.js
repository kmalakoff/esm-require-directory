"use strict";
module.exports = function requireFile(fullPath, callback) {
    try {
        callback(null, require(fullPath));
    } catch (err) {
        callback(err);
    }
};

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  for (var key in exports) exports.default[key] = exports[key];
  module.exports = exports.default;
}