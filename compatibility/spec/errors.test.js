var path = require('path');
var chai = require('chai');

var requireDirectory = require('../..');

var assert = chai.assert;

describe('errors', function () {
  it('fail to import an errored module (cjs)', function (done) {
    var DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'errors');

    // skips .js
    requireDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: false }, function (err, results) {
      assert.ok(!!err);
      done();
    });
  });

  it('fail to import an errored module (mjs)', function (done) {
    var DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'errors');

    // skips .mjs
    requireDirectory(DATA_DIRECTORY, { extensions: ['.mjs'], recursive: false }, function (err, results) {
      assert.ok(!err);
      done();
    });
  });
});
