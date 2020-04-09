module.exports = function setResult(results, relativePath, module) {
  if (results[relativePath] !== undefined) {
    var value = Array.isArray(results[relativePath]) ? results[relativePath] : [results[relativePath]];
    results[relativePath] = value.concat(module); // eslint-disable-line no-param-reassign
  } else results[relativePath] = module;
};
