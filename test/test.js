var assert = require('assert');
var main = require('../main');

describe('iterate', function() {
  it('should return [{"type":"NUMBER","word":"10"},{"type":"OPERATOR","word":"+"},{"type":"NUMBER","word":"9"}]', function() {
      assert.deepEqual(main._test.iterate("10 +9"), [{"type":"NUMBER","word":"10"},{"type":"OPERATOR","word":"+"},{"type":"NUMBER","word":"9"}]);
    });
});
