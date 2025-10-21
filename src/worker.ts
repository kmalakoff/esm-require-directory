import walk from './lib/walk.ts';

import type { RequireCallback, RequireOptions, RequireSettings } from './types.ts';

export default function worker(directory: string, options_: RequireOptions, settings: RequireSettings, callback: RequireCallback): undefined {
  const options = { ...options_, ...settings };
  options.default = options_.default === undefined ? true : options_.default;
  for (const extension of options.extensions) {
    if (!~options.extensions.indexOf(extension)) throw new Error(`Extension not supported: ${extension}`);
  }
  if (options.paths && options.filename === undefined) options.filename = true;

  walk(directory, options, callback);
}
