var path = require('path');
var walkFiltered = require('walk-filtered');

var requireIndex = require('./requireIndex');
var addResult = require('./addResult');

module.exports = function walk(directory, options, callback) {
  var results = options.paths || options.filename ? {} : [];

  walkFiltered(
    directory,
    function (entry, filterCallback) {
      if (entry.path === '') return filterCallback();

      // check for index file one level under the directory
      if (entry.stats.isDirectory()) {
        if (options.recursive) return filterCallback(); // will pick up index in traverse

        requireIndex(entry.fullPath, options.loaders, function (err, module, indexBasename) {
          if (err) return callback(err);
          if (module) addResult(results, { basename: indexBasename, path: path.join(entry.path, indexBasename) }, options, module);
          filterCallback();
        });
      } else {
        var loader = options.loaders[path.extname(entry.basename)];
        if (!loader) return filterCallback(); // not a supported index
        loader(entry.fullPath, function (err, module) {
          if (err) return callback(err);
          if (module) addResult(results, entry, options, module);
          filterCallback();
        });
      }
    },
    { async: true, stats: true, depth: options.recursive ? Infinity : 0 },
    function (err) {
      err ? callback(err) : callback(null, results);
    }
  );
};
