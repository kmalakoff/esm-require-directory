var path = require('path');

module.exports = function filename(relativePath) {
  return path.basename(relativePath, path.extname(relativePath));
};
