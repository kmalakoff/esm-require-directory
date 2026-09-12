const assert = require('assert');
const requireDirectory = require('esm-require-directory');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof requireDirectory, 'function');
  });
});
