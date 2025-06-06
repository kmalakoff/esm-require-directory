import path from 'path';
import fileName from './fileName.js';
import filePath from './filePath.js';

import type { Module, RequireEntry, RequireOptions, RequireResult } from '../types.js';

function setResult(results, key, module) {
  if (results[key] !== undefined) {
    const value = Array.isArray(results[key]) ? results[key] : [results[key]];
    results[key] = value.concat(module);
  } else results[key] = module;
}

export default function addResult(results: RequireResult, entry: RequireEntry, options: RequireOptions, module: Module) {
  // esm module so extract default by default unless asked not to
  if (path.extname(entry.basename) === '.mjs') {
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
