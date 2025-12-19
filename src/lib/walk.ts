import Iterator, { type Entry } from 'fs-iterator';
import path from 'path';

import type { RequireCallback, RequireOptionsInternal } from '../types.ts';

import addResult from './addResult.ts';
import requireIndex, { type Callback } from './requireIndex.ts';

export default function walk(directory: string, options: RequireOptionsInternal, callback: RequireCallback): void {
  const results = options.paths || options.filename ? {} : [];

  let iterator = new Iterator(directory, {
    depth: options.recursive ? Infinity : 0,
    alwaysStat: true,
    filter: (entry, callback): void => {
      if (entry.path === '') return callback();

      // check for index file one level under the directory
      if (entry.stats.isDirectory()) {
        if (options.recursive) {
          callback(); // will pick up index in traverse
          return;
        }

        const cb = (error?: Error, module?: unknown, indexBasename?: string) => {
          if (error) return callback(error);
          if (module) addResult(results, { basename: indexBasename, path: path.join(entry.path, indexBasename) }, options, module);
          callback();
        };
        requireIndex(entry.fullPath, options, cb as Callback);
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
    (_entry: Entry): void => {},
    { concurrency: 1 },
    (err) => {
      iterator.destroy();
      iterator = null;
      err ? callback(err) : callback(null, results);
    }
  );
}
