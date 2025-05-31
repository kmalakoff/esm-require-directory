import walk from './lib/walk.js';

import type { RequireCallback, RequireOptions, RequireSettings } from './types.js';

export default function worker(directory: string, options_: RequireOptions, settings: RequireSettings, callback: RequireCallback): undefined {
  const options = { ...options_, ...settings };
  options.default = options_.default === undefined ? true : options_.default;
  options.extensions.map((extension) => {
    if (!~options.extensions.indexOf(extension)) throw new Error(`Extension not supported: ${extension}`);
  });
  if (options.paths && options.filename === undefined) options.filename = true;

  walk(directory, options, callback);
}
