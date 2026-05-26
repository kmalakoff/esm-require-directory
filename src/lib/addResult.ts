import { stringEndsWith } from '../compat.ts';
import type { Module, RequireEntry, RequireOptions, RequireResult } from '../types.ts';
import fileName from './fileName.ts';
import filePath from './filePath.ts';

const isArray = Array.isArray || ((x: unknown) => Object.prototype.toString.call(x) === '[object Array]');

function setResult(results: RequireResult, key: string, module: unknown) {
  const dict = results as unknown as Record<string, unknown>;
  if (dict[key] !== undefined) {
    const value = isArray(dict[key]) ? dict[key] : [dict[key]];
    dict[key] = (value as unknown[]).concat(module);
  } else dict[key] = module;
}

export default function addResult(results: RequireResult, entry: RequireEntry, options: RequireOptions, module: Module) {
  // esm module so extract default by default unless asked not to
  if (stringEndsWith(entry.basename, '.mjs')) {
    if (options.default === undefined || options.default) {
      // check default
      if (module.default === undefined) return; // no default
      module = module.default as Module;
    }
  }

  if (options.paths) setResult(results, options.filename ? filePath(entry.path) : entry.path, module);
  else if (options.filename) setResult(results, fileName(entry.path), module);
  else (results as unknown[]).push(module);
}
