  // vllu.test.coffee
import {
  undef,
  defined,
  notdefined,
  isString,
  isArray,
  isHash,
  keys,
  isEmpty,
  nonEmpty,
  escapeStr,
  dclone,
  range,
  indented,
  undented
} from '@jdeighan/vllu';

import test from 'ava';

// ---------------------------------------------------------------------------
test("line 12", (t) => {
  t.is(undef, void 0);
  t.deepEqual(undef, void 0);
  t.truthy(defined(23));
  t.falsy(defined(undef));
  t.falsy(defined(null));
  t.truthy(notdefined(undef));
  t.truthy(notdefined(null));
  t.truthy(isString('abc'));
  t.falsy(isString(42));
  t.truthy(isArray([1, 2]));
  t.falsy(isArray('abc'));
  return t.deepEqual(keys({
    a: 1,
    b: 2
  }), ['a', 'b']);
});

test("line 26", (t) => {
  return t.deepEqual(Array.from(range(5)), [0, 1, 2, 3, 4]);
});

test("line 29", (t) => {
  return t.truthy(isEmpty(undef));
});

test("line 32", (t) => {
  return t.truthy(isEmpty(null));
});

test("line 35", (t) => {
  t.truthy(isEmpty(''));
  t.truthy(isEmpty([]));
  return t.truthy(isEmpty({}));
});

test("line 40", (t) => {
  t.truthy(isEmpty(undef));
  return t.truthy(isEmpty(null));
});

test("line 44", (t) => {
  t.falsy(isEmpty('abc'));
  t.falsy(isEmpty([1, 2]));
  return t.falsy(isEmpty({
    a: 1
  }));
});

test("line 49", (t) => {
  t.falsy(nonEmpty(undef));
  t.falsy(nonEmpty(null));
  t.falsy(nonEmpty(''));
  t.falsy(nonEmpty([]));
  return t.falsy(nonEmpty({}));
});

test("line 56", (t) => {
  t.falsy(nonEmpty(undef));
  t.truthy(nonEmpty('abc'));
  t.truthy(nonEmpty([1, 2]));
  return t.truthy(nonEmpty({
    a: 1
  }));
});

test("line 62", (t) => {
  return t.is(escapeStr("a\n\tb"), "a▼→b");
});

test("line 65", (t) => {
  t.is(indented('abc'), '\tabc');
  t.is(indented('abc', 2), '\t\tabc');
  t.is(indented('abc', 1, '--'), '--abc');
  t.is(indented('abc', 2, '--'), '----abc');
  return t.is(indented('abc\ndef'), '\tabc\n\tdef');
});

test("line 72", (t) => {
  t.deepEqual(indented(['abc']), ['\tabc']);
  t.deepEqual(indented(['abc'], 2), ['\t\tabc']);
  t.deepEqual(indented(['abc'], 1, '--'), ['--abc']);
  t.deepEqual(indented(['abc'], 2, '--'), ['----abc']);
  return t.deepEqual(indented(['abc', 'def']), ['\tabc', '\tdef']);
});

test("line 79", (t) => {
  t.is(undented('\tabc'), 'abc');
  t.is(undented('\t\tabc', 2), 'abc');
  t.is(undented('  abc'), 'abc');
  t.is(undented('abc\ndef'), 'abc\ndef');
  return t.is(undented('\tabc\n\t\tdef'), 'abc\n\tdef');
});

test("line 86", (t) => {
  t.deepEqual(undented(['\tabc']), ['abc']);
  t.deepEqual(undented(['\t\tabc']), ['abc']);
  t.deepEqual(undented(['  abc']), ['abc']);
  t.deepEqual(undented(['abc', 'def']), ['abc', 'def']);
  return t.deepEqual(undented(['\tabc', '\t\tdef']), ['abc', '\tdef']);
});

test("line 93", (t) => {
  var clone, ds;
  ds = {
    a: 1,
    b: [1, 2, 3]
  };
  clone = dclone(ds);
  t.not(ds, clone);
  return t.deepEqual(ds, clone);
});

//# sourceMappingURL=vllu.test.js.map
