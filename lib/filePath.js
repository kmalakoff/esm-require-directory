var path = require('path');
var fileName = require('./fileName');

module.exports = function filePath(relativePath) {
  return path.join(path.dirname(relativePath), fileName(relativePath));
};
