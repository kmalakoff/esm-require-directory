var path = require('path');
var fs = require('fs');
var Queue = require('queue-cb');

var requireFile = require('./requireFile');

module.exports = function requireIndex(directory, entry, options, results, callback) {
  // check for index file one level under the directory
  var queue = new Queue(1);
  var found = false;
  options.extensions.forEach(function (extension) {
    queue.defer(function (callback) {
      if (found) return callback();
      var relativeIndexPath = path.join(entry.path, 'index' + extension);

      fs.lstat(entry.fullPath, function (err, indexStats) {
        if (err) return callback();
        if (indexStats.isDirectory()) return callback();
        requireFile(directory, relativeIndexPath, options, results, function (err2) {
          if (!found && !err2) found = true;
          callback();
        });
      });
    });
  });
  queue.await(callback);
};
