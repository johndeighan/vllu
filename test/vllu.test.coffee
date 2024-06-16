# vllu.test.coffee

import {
	undef, defined, notdefined, isString, isArray, isHash,
	keys, isEmpty, nonEmpty, JS, escapeStr,
	} from '@jdeighan/vllu'
import test from 'ava'

# ---------------------------------------------------------------------------

test "line 11", (t) =>
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

test "line 25", (t) =>
	t.truthy isEmpty(undef)

test "line 28", (t) =>
	t.truthy isEmpty(null)

test "line 31", (t) =>
	t.truthy isEmpty('')
	t.truthy isEmpty([])
	t.truthy isEmpty({})

test "line 36", (t) =>
	t.truthy  isEmpty(undef)
	t.truthy  isEmpty(null)

test "line 40", (t) =>
	t.falsy  isEmpty('abc')
	t.falsy  isEmpty([1,2])
	t.falsy  isEmpty({a:1})

test "line 45", (t) =>
	t.falsy nonEmpty(undef)
	t.falsy nonEmpty(null)
	t.falsy nonEmpty('')
	t.falsy nonEmpty([])
	t.falsy nonEmpty({})

test "line 52", (t) =>
	t.falsy nonEmpty(undef)
	t.truthy nonEmpty('abc')
	t.truthy nonEmpty([1,2])
	t.truthy nonEmpty({a:1})

test "line 58", (t) =>
	t.is escapeStr("a\n\tb"), "a▼→b"
