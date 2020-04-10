module.exports = function requireFile(fullPath, callback) {
  try {
    callback(null, require(fullPath));
  } catch (err) {
    callback(err);
  }
};
