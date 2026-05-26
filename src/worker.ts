import walk from './lib/walk.ts';

import type { RequireCallback, RequireOptions, RequireOptionsInternal, RequireSettings } from './types.ts';

export default function worker(directory: string, options_: RequireOptions, settings: RequireSettings, callback: RequireCallback): void {
  const options = { ...options_, ...settings } as RequireOptionsInternal;
  options.default = options_.default === undefined ? true : options_.default;
  const extensions = options.extensions ?? [];
  for (let i = 0; i < extensions.length; i++) {
    const extension = extensions[i];
    if (!~extensions.indexOf(extension)) throw new Error(`Extension not supported: ${extension}`);
  }
  if (options.paths && options.filename === undefined) options.filename = true;

  walk(directory, options, callback);
}
