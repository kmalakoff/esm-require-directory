const path = require('path');
const fs = require('fs');
const pify = require('pify');
const walk = require('walk-filtered');

const pStat = pify(fs.lstat);
const DEFAULT_OPTIONS = {
  recursive: false,
  paths: false,
  default: true,
  extensions: ['.js']
};

function fileName(relativePath) {
  return path.basename(relativePath, path.extname(relativePath));
}

function fileDirName(relativePath) {
  const dirname = path.dirname(relativePath);
  const filename = fileName(relativePath);
  return path.join(dirname, filename);
}

function setResult(results, key, module) {
  if (results[key] !== undefined) {
    const value = Array.isArray(results[key]) ? results[key] : [results[key]];
    results[key] = value.concat(module); // eslint-disable-line no-param-reassign
  } else results[key] = module;
}

async function importFile(directory, relativePath, options, results) {
  if (path.extname(relativePath) === '.mjs') return;

  let module = require(path.join(directory, relativePath));

  // collect result
  if (options.paths) setResult(results, options.filename ? fileDirName(relativePath) : relativePath, module);
  else if (options.filename) setResult(results, fileName(relativePath), module);
  else results.push(module); // eslint-disable-line no-param-reassign
}

module.exports = async (directory, options = {}) => {
  options = Object.assign({}, DEFAULT_OPTIONS, options); // eslint-disable-line no-param-reassign
  if (options.paths && options.filename === undefined) options.filename = true;
  const results = options.paths || options.filename ? {} : [];

  await walk(
    directory,
    async (relativePath, stats) => {
      if (relativePath === '') return true;

      if (stats.isDirectory()) {
        if (options.recursive) return true; // traverse directories

        // check for index file one level under the directory
        for (const extension of options.extensions) {
          const relativeIndexPath = path.join(relativePath, `index${extension}`);

          let indexStats;
          try {
            indexStats = await pStat(path.join(directory, relativeIndexPath));
          } catch (err) {
            /* no index */
          }

          // found index
          if (indexStats && !indexStats.isDirectory()) {
            await importFile(directory, relativeIndexPath, options, results);
            return false; // do not traverse directories
          }
        }
        return false; // do not traverse directories
      }

      const extension = path.extname(relativePath);
      if (~options.extensions.indexOf(extension)) await importFile(directory, relativePath, options, results);
      return true; // traverse
    },
    { stats: true }
  );

  return results;
};
