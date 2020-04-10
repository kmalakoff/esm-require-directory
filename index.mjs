import walk from './lib/walk.cjs';
import importFile from './lib/importFile.mjs';

var LOADERS = { '.js': importFile, '.cjs': importFile, '.mjs': importFile };

export default function requireDirectory(directory, options, callback) {
  /* eslint-disable */
  if (arguments.length === 2 && typeof options === 'function') {
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
      extensions: options.extensions || ['.mjs', '.js'],
      loaders: {},
    };
    if (options.paths && options.filename === undefined) options.filename = true;
    if (options.paths && options.filename === undefined) options.filename = true;
    options.extensions.map(function (extension) {
      if (!LOADERS[extension]) throw Error('Unexpected extension: ' + extension);
      options.loaders[extension] = LOADERS[extension];
    });

    walk(directory, options, callback);
  } else {
    return new Promise(function (resolve, reject) {
      requireDirectory(directory, options, function (err, results) {
        err ? reject(err) : resolve(results);
      });
    });
  }
}
