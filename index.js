var walk = require('./lib/walk.cjs');
var requireFile = require('./lib/requireFile');

var LOADERS = { '.js': requireFile, '.cjs': requireFile };

module.exports = function requireDirectory(directory, options, callback) {
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
      loaders: {},
    };
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
};
