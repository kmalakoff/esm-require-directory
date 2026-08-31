import assert from 'assert';
import requireDirectory from 'esm-require-directory';

describe('exports .ts', () => {
  it('default', () => {
    assert.equal(typeof requireDirectory, 'function');
  });
});
