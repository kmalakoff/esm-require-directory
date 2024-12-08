"use strict";
var walk = require('./walk.js');
var requireFile = require('./requireFile');
var EXTENSIONS = [
    '.js',
    '.cjs'
];
module.exports = function requireDirectory(directory, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    // choose between promise and callback API
    if (typeof callback === 'function') {
        options = options || {};
        options = {
            recursive: options.recursive,
            paths: options.paths,
            filename: options.filename,
            default: options.default === undefined ? true : options.default,
            extensions: options.extensions || EXTENSIONS,
            loader: options.loader || requireFile
        };
        options.extensions.map(function(extension) {
            if (!~EXTENSIONS.indexOf(extension)) throw new Error('Extension not supported: ' + extension);
        });
        if (options.paths && options.filename === undefined) options.filename = true;
        walk(directory, options, callback);
    } else {
        return new Promise(function(resolve, reject) {
            requireDirectory(directory, options, function(err, results) {
                err ? reject(err) : resolve(results);
            });
        });
    }
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }