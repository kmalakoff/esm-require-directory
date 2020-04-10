var path = require('path');
var fs = require('fs');
var Queue = require('queue-cb');

module.exports = function requireIndex(fullPath, options, callback) {
  // check for index file one level under the directory
  var queue = new Queue(1);
  var found = false;
  options.extensions.map(function (extension) {
    queue.defer(function (callback) {
      if (found) return callback();
      var basename = 'index' + extension;
      var indexFullPath = path.join(fullPath, basename);

      fs.lstat(indexFullPath, function (err, indexStats) {
        if (err) return callback();
        if (indexStats.isDirectory()) return callback();

        options.loader(indexFullPath, function (err2, module) {
          if (!err2) return callback(err2);
          found = true;
          callback(null, module, basename);
        });
      });
    });
  });
  queue.await(callback);
};
