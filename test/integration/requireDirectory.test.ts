import assert from 'assert';
import importDirectory from 'esm-require-directory';
import size from 'lodash.size';
import path from 'path';
import Pinkie from 'pinkie-promise';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');
const isModule = typeof __filename === 'undefined';

describe('default', () => {
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

  it('default: true, recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { default: true, recursive: false });
    assert.equal((results as unknown[]).length, isModule ? 1 : 2);
  });

  it('default: true, recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { default: true, recursive: true });
    assert.equal((results as unknown[]).length, isModule ? 5 : 10);
  });

  it('default: false, recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { default: false, recursive: false });
    assert.equal((results as unknown[]).length, 2);
  });

  it('default: false, recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { default: false, recursive: true });
    assert.equal((results as unknown[]).length, 10);
  });
});

describe('defaultOptions', () => {
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

  it('recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: false });
    assert.equal((results as unknown[]).length, isModule ? 1 : 2);
  });

  it('recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: true });
    assert.equal((results as unknown[]).length, isModule ? 5 : 10);
  });
});

describe('errors', () => {
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

  it('fail to import an errored module (mjs)', async () => {
    const DATA_DIR = path.join(__dirname, '..', 'data', 'errors');
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it('fail to import an errored module (cjs)', async () => {
    const DATA_DIR = path.join(__dirname, '..', 'data', 'errors');
    try {
      await importDirectory(DATA_DIR, { extensions: ['.js'], recursive: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });
});

describe('extensions', () => {
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

  it('extensions: (default), recursive: false, paths: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: false, paths: true });
    assert.equal(size(results), isModule ? 1 : 2);
  });

  it('extensions: (default), recursive: true, paths: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: true, paths: true });
    assert.equal(size(results), isModule ? 5 : 10);
  });

  it('extensions: (default), recursive: false, paths: true, default: false', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it('extensions: (default), recursive: false, paths: true, default: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true", async () => {
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs', '.js'], recursive: false, paths: true });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: true, paths: true", async () => {
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs', '.js'], recursive: true, paths: true });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false", async () => {
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: true", async () => {
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs', '.js'], recursive: true, paths: true, default: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: false, paths: true });
    assert.equal(size(results), isModule ? 1 : 2);
  });

  it("extensions: ['.mjs'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: true, paths: true });
    assert.equal(size(results), isModule ? 5 : 10);
  });

  it("extensions: ['.mjs'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });
});

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
      const r1 = results as Record<string, unknown>;
      for (const name in r1) {
        const value = r1[name];
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
      const r2 = results as Record<string, unknown>;
      for (const name in r2) {
        const value = r2[name];
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

describe('paths', () => {
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

  it("extensions: ['.mjs'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: false,
      paths: true,
    });
    assert.equal(size(results), isModule ? 1 : 2);
  });

  it("extensions: ['.mjs'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: true,
      paths: true,
    });
    assert.equal(size(results), isModule ? 5 : 10);
  });

  it("extensions: ['.mjs'], recursive: false, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: false,
      default: false,
      paths: true,
    });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs'], recursive: true, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: true,
      default: false,
      paths: true,
    });
    assert.equal(size(results), 10);
  });
});

describe('recursive', () => {
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

  it('recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: false });
    assert.equal((results as unknown[]).length, isModule ? 1 : 2);
  });

  it('recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: true });
    assert.equal((results as unknown[]).length, isModule ? 5 : 10);
  });
});
