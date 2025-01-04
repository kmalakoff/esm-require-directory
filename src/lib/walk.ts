import path from 'path';
import Iterator from 'fs-iterator';

import addResult from './addResult';
import requireIndex from './requireIndex';

export default function walk(directory, options, callback) {
  const results = options.paths || options.filename ? {} : [];

  let iterator = new Iterator(directory, {
    depth: options.recursive ? Infinity : 0,
    alwaysStat: true,
    filter: (entry, callback) => {
      if (entry.path === '') return callback();

      // check for index file one level under the directory
      if (entry.stats.isDirectory()) {
        if (options.recursive) return callback(); // will pick up index in traverse

        requireIndex(entry.fullPath, options, (err, module, indexBasename) => {
          if (err) return callback(err);
          if (module) addResult(results, { basename: indexBasename, path: path.join(entry.path, indexBasename) }, options, module);
          callback();
        });
      } else {
        if (!~options.extensions.indexOf(path.extname(entry.basename))) return callback(); // not a supported index
        options.loader(entry.fullPath, (err, module) => {
          if (err) return callback(err);
          if (module) addResult(results, entry, options, module);
          callback();
        });
      }
    },
    callbacks: true,
  });
  iterator.forEach(
    () => {},
    { concurrency: 1 },
    (err) => {
      iterator.destroy();
      iterator = null;
      err ? callback(err) : callback(null, results);
    }
  );
}
