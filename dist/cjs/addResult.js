"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return addResult;
    }
});
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
var _fileName = /*#__PURE__*/ _interop_require_default(require("./fileName.js"));
var _filePath = /*#__PURE__*/ _interop_require_default(require("./filePath.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function setResult(results, key, module) {
    if (results[key] !== undefined) {
        var value = Array.isArray(results[key]) ? results[key] : [
            results[key]
        ];
        results[key] = value.concat(module);
    } else results[key] = module;
}
function addResult(results, entry, options, module) {
    // esm module so extract default by default unless asked not to
    if (_path.default.extname(entry.basename) === '.mjs') {
        if (options.default === undefined || options.default) {
            // check default
            if (module.default === undefined) return; // no default
            module = module.default;
        }
    }
    if (options.paths) setResult(results, options.filename ? (0, _filePath.default)(entry.path) : entry.path, module);
    else if (options.filename) setResult(results, (0, _fileName.default)(entry.path), module);
    else results.push(module);
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }