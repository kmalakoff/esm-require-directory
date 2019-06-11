const path = require('path');
const chai = require('chai');

const importDirectory = require('../..');

const { assert } = chai;
const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'directory');

describe('defaultOptions', () => {
  it('recursive: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: false });
    assert.equal(results.length, 2);
  });

  it('recursive: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: true });
    assert.equal(results.length, 10);
  });
});
