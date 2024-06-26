// vllu.coffee
import assertLib from 'node:assert';

// ---------------------------------------------------------------------------
// low-level version of assert()
export var assert = (cond, msg) => {
  assertLib.ok(cond, msg);
  return true;
};

// ---------------------------------------------------------------------------
// low-level version of croak()
export var croak = (msg) => {
  throw new Error(msg);
  return true;
};

// ---------------------------------------------------------------------------
// deep clone
export var dclone = (x) => {
  return structuredClone(x);
};

// ---------------------------------------------------------------------------
export var undef = void 0;

export var defined = (x) => {
  return (x !== undef) && (x !== null);
};

export var notdefined = (x) => {
  return (x === undef) || (x === null);
};

export var isString = (x) => {
  return (typeof x === 'string') || (x instanceof String);
};

export var isArray = Array.isArray;

export var keys = Object.keys;

// ---------------------------------------------------------------------------
export var range = function*(n) {
  var i;
  i = 0;
  while (i < n) {
    yield i;
    i += 1;
  }
};

// ---------------------------------------------------------------------------
export var isHash = (x) => {
  var ref;
  if (notdefined(x != null ? (ref = x.constructor) != null ? ref.name : void 0 : void 0)) {
    return false;
  }
  return x.constructor.name === 'Object';
};

// ---------------------------------------------------------------------------
export var isEmpty = (x) => {
  if (notdefined(x)) {
    return true;
  }
  if (isString(x) && x.match(/^\s*$/)) {
    return true;
  }
  if (isArray(x) && (x.length === 0)) {
    return true;
  }
  if (isHash(x) && (keys(x).length === 0)) {
    return true;
  }
  return false;
};

// ---------------------------------------------------------------------------
export var nonEmpty = (x) => {
  return !isEmpty(x);
};

// ---------------------------------------------------------------------------
//   escapeStr - escape newlines, carriage return, TAB chars, etc.
// --- NOTE: We can't use OL() inside here since it uses escapeStr()
export var hEsc = {
  "\r": '◄',
  "\n": '▼',
  "\t": '→',
  " ": '˳'
};

export var hEscNoNL = {
  "\r": '◄',
  "\t": '→',
  " ": '˳'
};

export var escapeStr = (str, hReplace = hEsc, hOptions = {}) => {
  var ch, i, lParts, offset, result;
  // --- hReplace can also be a string:
  //        'esc'     - escape space, newline, tab
  //        'escNoNL' - escape space, tab
  assert(isString(str), `not a string: ${typeof str}`);
  if (isString(hReplace)) {
    switch (hReplace) {
      case 'esc':
        hReplace = hEsc;
        break;
      case 'escNoNL':
        hReplace = hEscNoNL;
        break;
      default:
        hReplace = {};
    }
  }
  assert(isHash(hReplace), `not a hash: ${hReplace}`);
  assert(isHash(hOptions), `not a hash: ${hOptions}`);
  ({offset} = hOptions);
  lParts = [];
  i = 0;
  for (ch of str) {
    if (defined(offset)) {
      if (i === offset) {
        lParts.push(':');
      } else {
        lParts.push(' ');
      }
    }
    result = hReplace[ch];
    if (defined(result)) {
      lParts.push(result);
    } else {
      lParts.push(ch);
    }
    i += 1;
  }
  if (offset === str.length) {
    lParts.push(':');
  }
  return lParts.join('');
};

// ---------------------------------------------------------------------------
//   escapeBlock
//      - remove carriage returns
//      - escape spaces, TAB chars
export var escapeBlock = (block) => {
  return escapeStr(block, 'escNoNL');
};

// ---------------------------------------------------------------------------
//   indented
//      - Indent each line in a block or array
export var indented = (input, level = 1, oneIndent = "\t") => {
  var lLines, lNewLines, line;
  lLines = isArray(input) ? input : input.split("\n");
  lNewLines = (function() {
    var j, len1, results;
    results = [];
    for (j = 0, len1 = lLines.length; j < len1; j++) {
      line = lLines[j];
      results.push(oneIndent.repeat(level) + line);
    }
    return results;
  })();
  if (isArray(input)) {
    return lNewLines;
  } else {
    return lNewLines.join("\n");
  }
};

// ---------------------------------------------------------------------------
//   undented
//      - get indentation from first line,
//        remove it from all lines
export var undented = (input) => {
  var firstLine, indentation, lLines, lMatches, lNewLines, len, line, pos;
  lLines = isArray(input) ? input : input.split("\n");
  if (lLines.length === 0) {
    return input;
  }
  firstLine = lLines[0];
  if (lMatches = firstLine.match(/^\s+/)) {
    indentation = lMatches[0];
  } else {
    return input;
  }
  len = indentation.length;
  lNewLines = (function() {
    var j, len1, results;
    results = [];
    for (j = 0, len1 = lLines.length; j < len1; j++) {
      line = lLines[j];
      pos = line.indexOf(indentation);
      if (pos === 0) {
        results.push(line.substring(len));
      } else {
        results.push(line);
      }
    }
    return results;
  })();
  if (isArray(input)) {
    return lNewLines;
  } else {
    return lNewLines.join("\n");
  }
};

//# sourceMappingURL=vllu.js.map
