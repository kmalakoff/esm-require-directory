const path = require('path');
const chai = require('chai');
const size = require('lodash.size');

const importDirectory = require('../..');

const { assert } = chai;
const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'directory');

describe('filename', () => {
  describe('paths: true', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        paths: true,
        recursive: true
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 10);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: true,
        paths: true,
        recursive: true
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 10);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: false,
        paths: true,
        recursive: true
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 10);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '.js');
      });
    });
  });

  describe('paths: false', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        paths: false,
        recursive: true
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), 10);
    });

    it('filename: true, recursive: false', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: true,
        paths: false,
        recursive: false
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 2);
      Object.entries(results).forEach(([name, value]) => {
        assert.ok(!Array.isArray(value));
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: true,
        paths: false,
        recursive: true
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 2);
      Object.entries(results).forEach(([name, value]) => {
        assert.equal(value.length, 5);
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: false,
        paths: false,
        recursive: true
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), 10);
    });
  });
});
