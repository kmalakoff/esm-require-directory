import walk from './lib/walk';

export default function worker(directory, options_, settings, callback) {
  const options = { ...options_, ...settings };
  options.default = options_.default === undefined ? true : options_.default;
  options.extensions.map((extension) => {
    if (!~options.extensions.indexOf(extension)) throw new Error(`Extension not supported: ${extension}`);
  });
  if (options.paths && options.filename === undefined) options.filename = true;

  walk(directory, options, callback);
}
