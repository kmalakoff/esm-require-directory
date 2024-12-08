"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return filePath;
    }
});
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
var _fileName = /*#__PURE__*/ _interop_require_default(require("./fileName.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function filePath(relativePath) {
    return _path.default.join(_path.default.dirname(relativePath), (0, _fileName.default)(relativePath));
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }