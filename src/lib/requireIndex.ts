import fs from 'fs';
import path from 'path';

import type { Module, RequireOptionsInternal } from '../types.ts';
export type Callback = (error?: Error, module?: Module, basename?: string) => void;

function loadIndexIfExists(fullPath: string, index: number, options: RequireOptionsInternal, callback: Callback): void {
  if (index >= (options.extensions ?? []).length) return callback();

  const basename = `index${(options.extensions ?? [])[index]}`;
  const indexFullPath = path.join(fullPath, basename);
  fs.lstat(indexFullPath, (err, indexStats) => {
    // try next
    if (err || indexStats.isDirectory()) return loadIndexIfExists(fullPath, index + 1, options, callback);
    options.loader(indexFullPath, (err2?: Error, module?: unknown) => {
      if (err2) return callback(err2);
      callback(undefined, module as Module, basename);
    });
  });
}

export default function requireIndex(fullPath: string, options: RequireOptionsInternal, callback: Callback): void {
  loadIndexIfExists(fullPath, 0, options, callback);
}
