const assert = require('assert');

assert.equal(1, 1);
// 测试通过，1 == 1。
assert.equal(1, '1');
// 测试通过，1 == '1'。

// assert.equal(1, 2);
// 抛出 AssertionError: 1 == 2
assert.equal({ a: { b: 1 } }, { a: { b: 1 } });
// 抛出 AssertionError: { a: { b: 1 } } == { a: { b: 1 } }
