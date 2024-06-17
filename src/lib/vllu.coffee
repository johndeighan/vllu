# vllu.coffee

import assertLib from 'node:assert'

# ---------------------------------------------------------------------------
# low-level version of assert()

export assert = (cond, msg) =>

	assertLib.ok cond, msg
	return true

# ---------------------------------------------------------------------------
# low-level version of croak()

export croak = (msg) =>

	throw new Error(msg)
	return true

# ---------------------------------------------------------------------------
# deep clone

export dclone = (x) =>

	return structuredClone(x)

# ---------------------------------------------------------------------------

export undef = undefined
export defined = (x) => (x != undef) && (x != null)
export notdefined = (x) => (x == undef) || (x == null)
export isString = (x) => (typeof x == 'string') || (x instanceof String)
export isArray = Array.isArray
export keys = Object.keys
export JS = (x) => JSON.stringify(x)

# ---------------------------------------------------------------------------

export isHash = (x) =>

	if notdefined(x?.constructor?.name)
		return false
	return (x.constructor.name == 'Object')

# ---------------------------------------------------------------------------

export isEmpty = (x) =>

	if notdefined(x)
		return true
	if isString(x) && x.match(/^\s*$/)
		return true
	if isArray(x) && (x.length == 0)
		return true
	if isHash(x) && (keys(x).length == 0)
		return true
	return false

# ---------------------------------------------------------------------------

export nonEmpty = (x) => ! isEmpty(x)

# ---------------------------------------------------------------------------
#   escapeStr - escape newlines, carriage return, TAB chars, etc.
# --- NOTE: We can't use OL() inside here since it uses escapeStr()

export hEsc = {
	"\r": '◄'
	"\n": '▼'
	"\t": '→'
	" ": '˳'
	}
export hEscNoNL = {
	"\r": '◄'
	"\t": '→'
	" ": '˳'
	}

export escapeStr = (str, hReplace=hEsc, hOptions={}) =>
	# --- hReplace can also be a string:
	#        'esc'     - escape space, newline, tab
	#        'escNoNL' - escape space, tab

	assert isString(str), "not a string: #{typeof str}"
	if isString(hReplace)
		switch hReplace
			when 'esc'
				hReplace = hEsc
			when 'escNoNL'
				hReplace = hEscNoNL
			else
				hReplace = {}
	assert isHash(hReplace), "not a hash: #{hReplace}"
	assert isHash(hOptions), "not a hash: #{hOptions}"
	{offset} = hOptions

	lParts = []
	i = 0
	for ch from str
		if defined(offset)
			if (i == offset)
				lParts.push ':'
			else
				lParts.push ' '
		result = hReplace[ch]
		if defined(result)
			lParts.push result
		else
			lParts.push ch
		i += 1
	if (offset == str.length)
		lParts.push ':'
	return lParts.join('')

# ---------------------------------------------------------------------------
#   escapeBlock
#      - remove carriage returns
#      - escape spaces, TAB chars

export escapeBlock = (block) =>

	return escapeStr(block, 'escNoNL')

# ---------------------------------------------------------------------------
#   indented
#      - Indent each line in a block or array

export indented = (input, level=1, oneIndent="\t") =>

	lLines = if isArray(input)
		input
	else
		input.split("\n")

	lNewLines = for line in lLines
		oneIndent.repeat(level) + line

	if isArray(input)
		return lNewLines
	else
		return lNewLines.join("\n")

# ---------------------------------------------------------------------------
#   undented
#      - get indentation from first line,
#        remove it from all lines

export undented = (input) =>

	lLines = if isArray(input)
		input
	else
		input.split("\n")

	if (lLines.length == 0)
		return input

	firstLine = lLines[0]
	if lMatches = firstLine.match(/^\s+/)
		indentation = lMatches[0]
	else
		return input

	len = indentation.length
	lNewLines = for line in lLines
		pos = line.indexOf(indentation)
		if (pos == 0)
			line.substring(len)
		else
			line

	if isArray(input)
		return lNewLines
	else
		return lNewLines.join("\n")
