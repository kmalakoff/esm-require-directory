var path = require('path');
var Iterator = require('fs-iterator');

var requireIndex = require('./requireIndex');
var addResult = require('./addResult');

module.exports = function walk(directory, options, callback) {
  var results = options.paths || options.filename ? {} : [];

  var iterator = new Iterator(directory, {
    depth: options.recursive ? Infinity : 0,
    alwaysStat: true,
    filter: function (entry, callback) {
      if (entry.path === '') return callback();

      // check for index file one level under the directory
      if (entry.stats.isDirectory()) {
        if (options.recursive) return callback(); // will pick up index in traverse

        requireIndex(entry.fullPath, options, function (err, module, indexBasename) {
          if (err) return callback(err);
          if (module) addResult(results, { basename: indexBasename, path: path.join(entry.path, indexBasename) }, options, module);
          callback();
        });
      } else {
        if (!~options.extensions.indexOf(path.extname(entry.basename))) return callback(); // not a supported index
        options.loader(entry.fullPath, function (err, module) {
          if (err) return callback(err);
          if (module) addResult(results, entry, options, module);
          callback();
        });
      }
    },
    callbacks: true,
  });
  iterator.forEach(
    function () {},
    { concurrency: 1 },
    function (err) {
      iterator.destroy();
      iterator = null;
      err ? callback(err) : callback(null, results);
    }
  );
};
