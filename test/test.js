var assert = require('assert');
var main = require('../main');
describe("test unitaire",function(){
  describe('#iterate', function() {
    it('iterate("10 +9") should return [{"type":"NUMBER","word":"10"},{"type":"OPERATOR","word":"+"},{"type":"NUMBER","word":"9"}]', function() {
      assert.equal(10,5);  
      assert.deepEqual(main._test.iterate("10 +9"), [{"type":"NUMBER","word":"10"},{"type":"OPERATOR","word":"+"},{"type":"NUMBER","word":"9"}]);
      });
    it('iterate("(10+4)x3") should return [{"type":"SYMBOL","word":"("},{"type":"NUMBER","word":"10"},{"type":"OPERATOR","word":"+"},{"type":"NUMBER","word":"4"},{"type":"SYMBOL","word":")"},{"type":"OPERATOR","word":"x"},{"type":"NUMBER","word":"3"}]', function() {
        assert.deepEqual(main._test.iterate("(10+4)x3"), [{"type":"SYMBOL","word":"("},{"type":"NUMBER","word":"10"},{"type":"OPERATOR","word":"+"},{"type":"NUMBER","word":"4"},{"type":"SYMBOL","word":")"},{"type":"OPERATOR","word":"x"},{"type":"NUMBER","word":"3"}]);
      });
  });
  describe('#parse', function() {
    it('parse([{"type":"SYMBOL","word":"("},{"type":"NUMBER","word":"10"},{"type":"OPERATOR","word":"+"},{"type":"NUMBER","word":"4"},{"type":"SYMBOL","word":")"},{"type":"OPERATOR","word":"x"},{"type":"NUMBER","word":"3"}]) should return 42', function() {
        assert.deepEqual(main._test.parse([{"type":"SYMBOL","word":"("},{"type":"NUMBER","word":"10"},{"type":"OPERATOR","word":"+"},{"type":"NUMBER","word":"4"},{"type":"SYMBOL","word":")"},{"type":"OPERATOR","word":"x"},{"type":"NUMBER","word":"3"}])[0].getValue(),42 );
      });
  });
});
describe("test d'intégration",function(){
    it("parse(iterate('(3+4)*12/2')) should return 42",function(){
      assert.equal(main._test.parse(main._test.iterate("(3+4)*12/2"))[0].getValue(),42);
    });
});
