import assert from 'assert';
import path from 'path';
import url from 'url';
// @ts-ignore
import importDirectory from 'esm-require-directory';
import Pinkie from 'pinkie-promise';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');
const isModule = typeof __filename === 'undefined';

describe('recursive', () => {
  (() => {
    // patch and restore promise
    // @ts-ignore
    let rootPromise: Promise;
    before(() => {
      rootPromise = global.Promise;
      // @ts-ignore
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = rootPromise;
    });
  })();

  it('recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: false });
    assert.equal((results as unknown[]).length, isModule ? 1 : 2);
  });

  it('recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: true });
    assert.equal((results as unknown[]).length, isModule ? 5 : 10);
  });
});