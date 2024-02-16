"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return importDirectory;
    }
});
var _importFile = /*#__PURE__*/ _interop_require_default(require("./importFile.js"));
var _walk = /*#__PURE__*/ _interop_require_default(require("./walk.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var EXTENSIONS = [
    ".mjs"
];
function importDirectory(directory, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    // choose between promise and callback API
    if (typeof callback === "function") {
        options = options || {};
        options = {
            recursive: options.recursive,
            paths: options.paths,
            filename: options.filename,
            default: options.default === undefined ? true : options.default,
            extensions: options.extensions || EXTENSIONS,
            loader: options.loader || _importFile.default
        };
        options.extensions.map(function(extension) {
            if (!~EXTENSIONS.indexOf(extension)) throw new Error("Extension not supported: " + extension);
        });
        if (options.paths && options.filename === undefined) options.filename = true;
        (0, _walk.default)(directory, options, callback);
    } else {
        return new Promise(function(resolve, reject) {
            importDirectory(directory, options, function(err, results) {
                err ? reject(err) : resolve(results);
            });
        });
    }
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  for (var key in exports) exports.default[key] = exports[key];
  module.exports = exports.default;
}