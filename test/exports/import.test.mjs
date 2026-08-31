import assert from 'assert';
import requireDirectory from 'esm-require-directory';

describe('exports .mjs', () => {
  it('default', () => {
    assert.equal(typeof requireDirectory, 'function');
  });
});
