import fs from 'fs';
import path from 'path';

function loadIndexIfExists(fullPath, index, options, callback) {
  if (index >= options.extensions.length) return callback();

  var basename = 'index' + options.extensions[index];
  var indexFullPath = path.join(fullPath, basename);
  fs.lstat(indexFullPath, function (err, indexStats) {
    // try next
    if (err || indexStats.isDirectory()) return loadIndexIfExists(fullPath, index + 1, options, callback);
    options.loader(indexFullPath, function (err2, module) {
      if (!err2) return callback(err2);
      callback(null, module, basename);
    });
  });
}

export default function requireIndex(fullPath, options, callback) {
  loadIndexIfExists(fullPath, 0, options, callback);
}
