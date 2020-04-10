var path = require('path');
var fileName = require('./fileName');
var filePath = require('./filePath');

function setResult(results, key, module) {
  if (results[key] !== undefined) {
    var value = Array.isArray(results[key]) ? results[key] : [results[key]];
    results[key] = value.concat(module); // eslint-disable-line no-param-reassign
  } else results[key] = module;
}

module.exports = function addResult(results, entry, options, module) {
  // es6 module so extract default by default unless asked not to
  if (path.extname(entry.basename) === '.mjs') {
    if (options.default === undefined || options.default) {
      // check default
      if (module.default === undefined) return; // no default
      module = module.default;
    }
  }

  if (options.paths) setResult(results, options.filename ? filePath(entry.path) : entry.path, module);
  else if (options.filename) setResult(results, fileName(entry.path), module);
  else results.push(module); // eslint-disable-line no-param-reassign
};
