import type { RequireCallback, RequireOptions, RequireResult, RequireSettings } from './types.ts';
import worker from './worker.ts';

export type * from './types.ts';

import loader from './cjs/requireFile.ts';

const settings: RequireSettings = { extensions: ['.js', '.cjs'], loader };

export default function requireDirectory(directory: string, callback: RequireCallback): void;
export default function requireDirectory(directory: string, options: RequireOptions, callback: RequireCallback): void;
export default function requireDirectory(directory: string): Promise<RequireResult>;
export default function requireDirectory(directory: string, options: RequireOptions): Promise<RequireResult>;
export default function requireDirectory(directory: string, options?: RequireOptions | RequireCallback, callback?: RequireCallback): void | Promise<RequireResult> {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(directory, options, settings, callback);
  return new Promise((resolve, reject) => worker(directory, options as RequireOptions, settings, (err, results) => (err ? reject(err) : resolve(results))));
}
