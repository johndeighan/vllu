# vllu.test.coffee

import {
	undef, defined, notdefined, isString, isArray, isHash,
	keys, isEmpty, nonEmpty, JS, escapeStr, dclone,
	indented, undented,
	} from '@jdeighan/vllu'
import test from 'ava'

# ---------------------------------------------------------------------------

test "line 12", (t) =>
	t.is undef, undefined
	t.deepEqual undef, undefined
	t.truthy defined(23)
	t.falsy  defined(undef)
	t.falsy  defined(null)
	t.truthy notdefined(undef)
	t.truthy notdefined(null)
	t.truthy isString('abc')
	t.falsy  isString(42)
	t.truthy isArray([1,2])
	t.falsy  isArray('abc')
	t.deepEqual keys({a:1, b:2}), ['a','b']

test "line 26", (t) =>
	t.truthy isEmpty(undef)

test "line 29", (t) =>
	t.truthy isEmpty(null)

test "line 32", (t) =>
	t.truthy isEmpty('')
	t.truthy isEmpty([])
	t.truthy isEmpty({})

test "line 37", (t) =>
	t.truthy  isEmpty(undef)
	t.truthy  isEmpty(null)

test "line 41", (t) =>
	t.falsy  isEmpty('abc')
	t.falsy  isEmpty([1,2])
	t.falsy  isEmpty({a:1})

test "line 46", (t) =>
	t.falsy nonEmpty(undef)
	t.falsy nonEmpty(null)
	t.falsy nonEmpty('')
	t.falsy nonEmpty([])
	t.falsy nonEmpty({})

test "line 53", (t) =>
	t.falsy nonEmpty(undef)
	t.truthy nonEmpty('abc')
	t.truthy nonEmpty([1,2])
	t.truthy nonEmpty({a:1})

test "line 59", (t) =>
	t.is escapeStr("a\n\tb"), "a▼→b"

test "line 62", (t) =>
	t.is indented('abc'), '\tabc'
	t.is indented('abc', 2), '\t\tabc'
	t.is indented('abc', 1, '--'), '--abc'
	t.is indented('abc', 2, '--'), '----abc'
	t.is indented('abc\ndef'), '\tabc\n\tdef'

test "line 69", (t) =>
	t.deepEqual indented(['abc']), ['\tabc']
	t.deepEqual indented(['abc'], 2), ['\t\tabc']
	t.deepEqual indented(['abc'], 1, '--'), ['--abc']
	t.deepEqual indented(['abc'], 2, '--'), ['----abc']
	t.deepEqual indented(['abc','def']), ['\tabc','\tdef']

test "line 76", (t) =>
	t.is undented('\tabc'), 'abc'
	t.is undented('\t\tabc', 2), 'abc'
	t.is undented('  abc'), 'abc'
	t.is undented('abc\ndef'), 'abc\ndef'
	t.is undented('\tabc\n\t\tdef'), 'abc\n\tdef'

test "line 83", (t) =>
	t.deepEqual undented(['\tabc']), ['abc']
	t.deepEqual undented(['\t\tabc']), ['abc']
	t.deepEqual undented(['  abc']), ['abc']
	t.deepEqual undented(['abc','def']), ['abc','def']
	t.deepEqual undented(['\tabc','\t\tdef']), ['abc','\tdef']

test "line 90", (t) =>
	ds = {a:1, b: [1,2,3]}
	clone = dclone(ds)
	t.not ds, clone
	t.deepEqual ds, clone
