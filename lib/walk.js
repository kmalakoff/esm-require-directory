var path = require('path');
var walkFiltered = require('walk-filtered');

var requireFile = require('./requireFile');
var requireIndex = require('./requireIndex');

module.exports = function walk(directory, options, callback) {
  var results = options.paths || options.filename ? {} : [];

  walkFiltered(
    directory,
    function (entry, filterCallback) {
      if (entry.path === '') return filterCallback();

      // check for index file one level under the directory
      if (entry.stats.isDirectory()) {
        if (options.recursive) return filterCallback(); // will pick up index in traverse
        return requireIndex(directory, entry, options, results, filterCallback);
      } else {
        if (!~options.extensions.indexOf(path.extname(entry.basename))) return filterCallback();
        return requireFile(directory, entry.path, options, results, function (err) {
          filterCallback(err, true);
        });
      }
    },
    { async: true, stats: true, depth: options.recursive ? Infinity : 0 },
    function (err) {
      err ? callback(err) : callback(null, results);
    }
  );
};
