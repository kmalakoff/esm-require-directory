const path = require('path');
const chai = require('chai');
const size = require('lodash.size');

const importDirectory = require('../..');

const { assert } = chai;
const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'directory');

describe('paths', () => {
  it("extensions: ['.mjs', '.js'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs', '.js'],
      recursive: false,
      paths: true
    });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs', '.js'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs', '.js'],
      recursive: true,
      paths: true
    });
    assert.equal(size(results), 10);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs', '.js'],
      recursive: false,
      default: false,
      paths: true
    });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs', '.js'], recursive: true, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs', '.js'],
      recursive: true,
      default: false,
      paths: true
    });
    assert.equal(size(results), 10);
  });
});
