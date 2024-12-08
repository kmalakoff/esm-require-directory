"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return requireIndex;
    }
});
var _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function loadIndexIfExists(fullPath, index, options, callback) {
    if (index >= options.extensions.length) return callback();
    var basename = 'index' + options.extensions[index];
    var indexFullPath = _path.default.join(fullPath, basename);
    _fs.default.lstat(indexFullPath, function(err, indexStats) {
        // try next
        if (err || indexStats.isDirectory()) return loadIndexIfExists(fullPath, index + 1, options, callback);
        options.loader(indexFullPath, function(err2, module) {
            if (!err2) return callback(err2);
            callback(null, module, basename);
        });
    });
}
function requireIndex(fullPath, options, callback) {
    loadIndexIfExists(fullPath, 0, options, callback);
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }