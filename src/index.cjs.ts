import worker from './worker.js';

// @ts-ignore
import loader from './cjs/requireFile.cjs';
const settings = { extensions: ['.js', '.cjs'], loader };

import type { RequireCallback, RequireOptions, RequireResult } from './types.js';
export * from './types.js';
export default function requireDirectory(directory: string, options?: RequireOptions | RequireCallback, callback?: RequireCallback): undefined | Promise<RequireResult> {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};

  // choose between promise and callback API
  if (typeof callback === 'function') return worker(directory, options, settings, callback) as undefined;
  return new Promise((resolve, reject) => {
    worker(directory, options, settings, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
}
