import type fs from 'fs';
import Iterator, { type Entry } from 'fs-iterator';
import path from 'path';

import type { RequireCallback, RequireOptionsInternal } from '../types.ts';

import addResult from './addResult.ts';
import requireIndex, { type Callback } from './requireIndex.ts';

export default function walk(directory: string, options: RequireOptionsInternal, callback: RequireCallback): void {
  const results = options.paths || options.filename ? ({} as Record<string, unknown>) : ([] as unknown[]);

  const iterator = new Iterator(directory, {
    depth: options.recursive ? Infinity : 0,
    alwaysStat: true,
    filter: (entry: Entry, cb: (err?: Error) => void): void => {
      if (entry.path === '') return cb();

      // check for index file one level under the directory
      const stats = entry.stats as fs.Stats | undefined;
      if (stats?.isDirectory()) {
        if (options.recursive) {
          cb(); // will pick up index in traverse
          return;
        }

        const innerCb = (error?: Error, module?: unknown, indexBasename?: string) => {
          if (error) return cb(error);
          if (module) addResult(results, { basename: indexBasename as string, path: path.join(entry.path, indexBasename as string) }, options, module);
          cb();
        };
        requireIndex(entry.fullPath, options, innerCb as Callback);
      } else {
        if (!~((options.extensions ?? []) as string[]).indexOf(path.extname(entry.basename))) {
          cb(); // not a supported index
          return;
        }
        options.loader(entry.fullPath, (err: Error | undefined, module?: unknown) => {
          if (err) return cb(err);
          if (module) addResult(results, entry, options, module);
          cb();
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
      err ? callback(err) : callback(undefined, results);
    }
  );
}
