import assert from 'assert';
// @ts-ignore
import importDirectory from 'esm-require-directory';
import size from 'lodash.size';
import path from 'path';
import Pinkie from 'pinkie-promise';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');
const isModule = typeof __filename === 'undefined';

describe('filename', () => {
  (() => {
    // patch and restore promise
    if (typeof global === 'undefined') return;
    const globalPromise = global.Promise;
    before(() => {
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = globalPromise;
    });
  })();
  describe('paths: true', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        paths: true,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
      for (const name in results) {
        assert.equal(path.extname(name), '');
      }
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: true,
        paths: true,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
      for (const name in results) {
        assert.equal(path.extname(name), '');
      }
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: false,
        paths: true,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
      for (const name in results) {
        assert.equal(path.extname(name), isModule ? '.mjs' : '.js');
      }
    });
  });

  describe('paths: false', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        paths: false,
        recursive: true,
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
    });

    it('filename: true, recursive: false', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: true,
        paths: false,
        recursive: false,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 1 : 2);
      for (const name in results) {
        const value = results[name];
        assert.ok(!Array.isArray(value));
        assert.equal(path.extname(name), '');
      }
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: true,
        paths: false,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 1 : 2);
      for (const name in results) {
        const value = results[name];
        assert.equal((value as unknown[]).length, 5);
        assert.equal(path.extname(name), '');
      }
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: false,
        paths: false,
        recursive: true,
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
    });
  });
});
