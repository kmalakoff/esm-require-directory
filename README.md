## esm-require-directory

Import a directory of modules using @std/esm

**Usage**

```js
const path = require('path');
const requireDirectory = require('esm-require-directory');

(async function() {
  // import as array, eg. [{ hello: 'world' }]
  const typeDefs = await requireDirectory(path.join(__dirname, 'typeDefs'));

  // import with paths, eg. { 'filename.mjs': { hello: 'world' } }
  const typeDefPaths = await requireDirectory(path.join(__dirname, 'typeDefs'), {
    paths: true
  });
})();
```

**Options**

- recursive (boolean) - traverse modules recursively. Default: false.
- paths (boolean) - modules returned as an object with relative paths vs as an array. Default: false.
- filename (boolean) - only return the filename without the extension. Default: true for paths.
- default (boolean) - extract default from es6 modules. Default: true.
- extensions (array) - the file extension types to process. Default: ['.mjs']
