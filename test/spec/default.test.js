const path = require('path');
const chai = require('chai');

const importDirectory = require('../..');

const { assert } = chai;
const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'directory');

describe('default', () => {
  it('default: true, recursive: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { default: true, recursive: false });
    assert.equal(results.length, 2);
  });

  it('default: true, recursive: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { default: true, recursive: true });
    assert.equal(results.length, 10);
  });

  it('default: false, recursive: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { default: false, recursive: false });
    assert.equal(results.length, 2);
  });

  it('default: false, recursive: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { default: false, recursive: true });
    assert.equal(results.length, 10);
  });
});
