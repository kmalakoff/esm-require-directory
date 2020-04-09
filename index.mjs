import walk from './lib/walk.cjs';

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
      extensions: options.extensions || ['.js'],
    };
    if (options.paths && options.filename === undefined) options.filename = true;

    walk(directory, options, callback);
  } else {
    return new Promise(function (resolve, reject) {
      requireDirectory(directory, options, function (err, results) {
        err ? reject(err) : resolve(results);
      });
    });
  }
}
