const path = require('path');
const chai = require('chai');

const importDirectory = require('../..');

const { assert } = chai;

describe('errors', () => {
  it('fail to import an errored module (mjs)', async () => {
    const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'errors');
    let err;

    try {
      await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs'], recursive: false });
    } catch (_err) {
      err = _err;
    }

    // skips .mjs
    assert.ok(!err);
  });

  it('fail to import an errored module (cjs)', async () => {
    const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'errors');
    let err;

    try {
      await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: false });
    } catch (_err) {
      err = _err;
    }

    assert.ok(!!err);
  });
});
