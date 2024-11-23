"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return walk;
    }
});
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
var _fsiterator = /*#__PURE__*/ _interop_require_default(require("fs-iterator"));
var _addResult = /*#__PURE__*/ _interop_require_default(require("./addResult.js"));
var _requireIndex = /*#__PURE__*/ _interop_require_default(require("./requireIndex.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function walk(directory, options, callback) {
    var results = options.paths || options.filename ? {} : [];
    var iterator = new _fsiterator.default(directory, {
        depth: options.recursive ? Infinity : 0,
        alwaysStat: true,
        filter: function filter(entry, callback) {
            if (entry.path === "") return callback();
            // check for index file one level under the directory
            if (entry.stats.isDirectory()) {
                if (options.recursive) return callback(); // will pick up index in traverse
                (0, _requireIndex.default)(entry.fullPath, options, function(err, module, indexBasename) {
                    if (err) return callback(err);
                    if (module) (0, _addResult.default)(results, {
                        basename: indexBasename,
                        path: _path.default.join(entry.path, indexBasename)
                    }, options, module);
                    callback();
                });
            } else {
                if (!~options.extensions.indexOf(_path.default.extname(entry.basename))) return callback(); // not a supported index
                options.loader(entry.fullPath, function(err, module) {
                    if (err) return callback(err);
                    if (module) (0, _addResult.default)(results, entry, options, module);
                    callback();
                });
            }
        },
        callbacks: true
    });
    iterator.forEach(function() {}, {
        concurrency: 1
    }, function(err) {
        iterator.destroy();
        iterator = null;
        err ? callback(err) : callback(null, results);
    });
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }