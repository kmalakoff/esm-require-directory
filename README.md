# esm-require-directory

Load a directory of modules with a promise or callback API.

```sh
npm install esm-require-directory
```

## Usage

```js
const path = require('path');
const requireDirectory = require('esm-require-directory');

(async function () {
  // Returns an array of module exports.
  const typeDefs = await requireDirectory(path.join(__dirname, 'typeDefs'));

  // Set paths to return an object keyed by relative file path.
  const typeDefPaths = await requireDirectory(path.join(__dirname, 'typeDefs'), {
    paths: true,
  });
})();
```

The `require` entry point loads `.js` and `.cjs` files by default. The ESM
`import` entry point loads `.mjs` files by default. Set `extensions` to change
the extensions for the selected entry point. By default, the promise resolves
to an array of default exports. Set `default: false` to keep each module's
full namespace.

## Options

- recursive (boolean) - traverse modules recursively. Default: false.
- paths (boolean) - modules returned as an object with relative paths vs as an array. Default: false.
- filename (boolean) - only return the filename without the extension. Default: true for paths.
- default (boolean) - extract default from esm modules. Default: true.
- extensions (array) - the file extension types to process. Default: `['.js', '.cjs']` for `require` and `['.mjs']` for ESM `import`.
