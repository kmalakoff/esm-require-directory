import type { Module, RequireEntry, RequireOptions, RequireResult } from '../types.ts';
import fileName from './fileName.ts';
import filePath from './filePath.ts';

const isArray = Array.isArray || ((x) => Object.prototype.toString.call(x) === '[object Array]');
const endsWith = (string, check) => string.indexOf(check, string.length - check.length) !== -1;

function setResult(results, key, module) {
  if (results[key] !== undefined) {
    const value = isArray(results[key]) ? results[key] : [results[key]];
    results[key] = value.concat(module);
  } else results[key] = module;
}

export default function addResult(results: RequireResult, entry: RequireEntry, options: RequireOptions, module: Module) {
  // esm module so extract default by default unless asked not to
  if (endsWith(entry.basename, '.mjs')) {
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
