import path from 'path';
import Iterator, { type Entry } from 'fs-iterator';

import addResult from './addResult.js';
import requireIndex from './requireIndex.js';

export default function walk(directory, options, callback) {
  const results = options.paths || options.filename ? {} : [];

  let iterator = new Iterator(directory, {
    depth: options.recursive ? Infinity : 0,
    alwaysStat: true,
    filter: (entry, callback): undefined => {
      if (entry.path === '') {
        callback();
        return;
      }

      // check for index file one level under the directory
      if (entry.stats.isDirectory()) {
        if (options.recursive) {
          callback(); // will pick up index in traverse
          return;
        }

        requireIndex(entry.fullPath, options, (err, module, indexBasename) => {
          if (err) return callback(err);
          if (module) addResult(results, { basename: indexBasename, path: path.join(entry.path, indexBasename) }, options, module);
          callback();
        });
      } else {
        if (!~options.extensions.indexOf(path.extname(entry.basename))) {
          callback(); // not a supported index
          return;
        }
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
    (_entry: Entry): undefined => {},
    { concurrency: 1 },
    (err) => {
      iterator.destroy();
      iterator = null;
      err ? callback(err) : callback(null, results);
    }
  );
}
