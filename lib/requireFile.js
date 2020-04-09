var path = require('path');

var fileName = require('./fileName');
var filePath = require('./filePath');
var setResult = require('./setResult');

module.exports = function requireFile(directory, relativePath, options, results, callback) {
  if (path.extname(relativePath) === '.mjs') return callback();

  try {
    var module = require(path.join(directory, relativePath));

    // collect result
    if (options.paths) setResult(results, options.filename ? filePath(relativePath) : relativePath, module);
    else if (options.filename) setResult(results, fileName(relativePath), module);
    else results.push(module); // eslint-disable-line no-param-reassign
    callback();
  } catch (err) {
    callback(err);
  }
};
