const path = require('path');
const chai = require('chai');
const size = require('lodash.size');

const importDirectory = require('../..');

const { assert } = chai;
const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'directory');

describe('extensions', () => {
  it('extensions: (default), recursive: false, paths: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: false, paths: true });
    assert.equal(size(results), 2);
  });

  it('extensions: (default), recursive: true, paths: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: true, paths: true });
    assert.equal(size(results), 10);
  });

  it('extensions: (default), recursive: false, paths: true, default: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it('extensions: (default), recursive: false, paths: true, default: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false, paths: true });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs', '.js'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true, paths: true });
    assert.equal(size(results), 10);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });

  it("extensions: ['.js'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: false, paths: true });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.js'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: true, paths: true });
    assert.equal(size(results), 10);
  });

  it("extensions: ['.js'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.js'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });
});
