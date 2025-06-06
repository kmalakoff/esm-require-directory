import fs from 'fs';
import path from 'path';

import type { Module, RequireOptions } from '../types.js';
export type Callback = (error?: Error, module?: Module, basename?: string) => undefined;

function loadIndexIfExists(fullPath, index, options, callback) {
  if (index >= options.extensions.length) return callback();

  const basename = `index${options.extensions[index]}`;
  const indexFullPath = path.join(fullPath, basename);
  fs.lstat(indexFullPath, (err, indexStats) => {
    // try next
    if (err || indexStats.isDirectory()) return loadIndexIfExists(fullPath, index + 1, options, callback);
    options.loader(indexFullPath, (err2, module) => {
      if (!err2) return callback(err2);
      callback(null, module, basename);
    });
  });
}

export default function requireIndex(fullPath: string, options: RequireOptions, callback: Callback): undefined {
  loadIndexIfExists(fullPath, 0, options, callback);
}
