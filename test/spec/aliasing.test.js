const path = require('path');
const chai = require('chai');
const size = require('lodash.size');

const importDirectory = require('../..');

const { assert } = chai;
const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'aliasing');

describe.skip('aliasing', () => {
  it('aliasing: (default), recursive: false, paths: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: false, paths: true });
    assert.equal(size(results), 2);
  });

  it('aliasing: (default), recursive: true, paths: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: true, paths: true });
    assert.equal(size(results), 10);
  });

  it('aliasing: (default), recursive: false, paths: true, default: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it('aliasing: (default), recursive: false, paths: true, default: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });

  it("aliasing: ['.mjs', '.js'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { aliasing: ['.mjs', '.js'], recursive: false, paths: true });
    assert.equal(size(results), 2);
    for (const [relativePath, module] of Object.entries(results)) {
      const key = path.basename(relativePath);
      assert.ok(key === 'default' ? Array.isArray(module) : !Array.isArray(module));
    }
  });

  it("aliasing: ['.mjs', '.js'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { aliasing: ['.mjs', '.js'], recursive: true, paths: true });
    assert.equal(size(results), 10);
    for (const [relativePath, module] of Object.entries(results)) {
      const key = path.basename(relativePath);
      assert.ok(key === 'default' ? Array.isArray(module) : !Array.isArray(module));
    }
  });

  it("aliasing: ['.mjs', '.js'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { aliasing: ['.mjs', '.js'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
    for (const module of Object.values(results)) {
      assert.ok(Array.isArray(module));
    }
  });

  it("aliasing: ['.mjs', '.js'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { aliasing: ['.mjs', '.js'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
    for (const module of Object.values(results)) {
      assert.ok(Array.isArray(module));
    }
  });

  it("aliasing: ['.js'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { aliasing: ['.js'], recursive: false, paths: true });
    assert.equal(size(results), 2);
  });

  it("aliasing: ['.js'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { aliasing: ['.js'], recursive: true, paths: true });
    assert.equal(size(results), 10);
  });

  it("aliasing: ['.js'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { aliasing: ['.js'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it("aliasing: ['.js'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { aliasing: ['.js'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });
});
