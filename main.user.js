
// ==UserScript==
// @name         supercv-userscript
// @namespace    supercv-userscript
// @version      0.0.1
// @include      *://www.wondercv.com/cvs/*/editor
// @run-at       document-end
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$c =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$8 = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$7 = fails$8;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$7(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$2 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw$1 = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var fails$6 = fails$8;
	var classof$2 = classofRaw$1;

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$6(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$2(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$2 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = indexedObject;
	var requireObjectCoercible$1 = requireObjectCoercible$2;

	var toIndexedObject$3 = function (it) {
	  return IndexedObject(requireObjectCoercible$1(it));
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$d = function (argument) {
	  return typeof argument === 'function';
	};

	var isCallable$c = isCallable$d;

	var isObject$5 = function (it) {
	  return typeof it === 'object' ? it !== null : isCallable$c(it);
	};

	var global$b = global$c;
	var isCallable$b = isCallable$d;

	var aFunction = function (argument) {
	  return isCallable$b(argument) ? argument : undefined;
	};

	var getBuiltIn$4 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$b[namespace]) : global$b[namespace] && global$b[namespace][method];
	};

	var getBuiltIn$3 = getBuiltIn$4;

	var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || '';

	var global$a = global$c;
	var userAgent = engineUserAgent;

	var process = global$a.process;
	var Deno = global$a.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] < 4 ? 1 : match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION = engineV8Version;
	var fails$5 = fails$8;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$5(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$1 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var isCallable$a = isCallable$d;
	var getBuiltIn$2 = getBuiltIn$4;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$2('Symbol');
	  return isCallable$a($Symbol) && Object(it) instanceof $Symbol;
	};

	var tryToString$1 = function (argument) {
	  try {
	    return String(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$9 = isCallable$d;
	var tryToString = tryToString$1;

	// `Assert: IsCallable(argument) is true`
	var aCallable$3 = function (argument) {
	  if (isCallable$9(argument)) return argument;
	  throw TypeError(tryToString(argument) + ' is not a function');
	};

	var aCallable$2 = aCallable$3;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$3 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable$2(func);
	};

	var isCallable$8 = isCallable$d;
	var isObject$4 = isObject$5;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$8(fn = input.toString) && !isObject$4(val = fn.call(input))) return val;
	  if (isCallable$8(fn = input.valueOf) && !isObject$4(val = fn.call(input))) return val;
	  if (pref !== 'string' && isCallable$8(fn = input.toString) && !isObject$4(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var shared$3 = {exports: {}};

	var global$9 = global$c;

	var setGlobal$3 = function (key, value) {
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty(global$9, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$9[key] = value;
	  } return value;
	};

	var global$8 = global$c;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$8[SHARED] || setGlobal$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$3.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.18.3',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});

	var requireObjectCoercible = requireObjectCoercible$2;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$2 = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var toObject$1 = toObject$2;

	var hasOwnProperty = {}.hasOwnProperty;

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty.call(toObject$1(it), key);
	};

	var id = 0;
	var postfix = Math.random();

	var uid$2 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var global$7 = global$c;
	var shared$2 = shared$3.exports;
	var hasOwn$8 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared$2('wks');
	var Symbol$1 = global$7.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$7 = function (name) {
	  if (!hasOwn$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
	    if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var isObject$3 = isObject$5;
	var isSymbol$1 = isSymbol$2;
	var getMethod$2 = getMethod$3;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$6 = wellKnownSymbol$7;

	var TO_PRIMITIVE = wellKnownSymbol$6('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$3(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = exoticToPrim.call(input, pref);
	    if (!isObject$3(result) || isSymbol$1(result)) return result;
	    throw TypeError("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$2 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : String(key);
	};

	var global$6 = global$c;
	var isObject$2 = isObject$5;

	var document$1 = global$6.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$2(document$1) && isObject$2(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$4 = descriptors;
	var fails$4 = fails$8;
	var createElement = documentCreateElement;

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$4 && !fails$4(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$3 = descriptors;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$1 = createPropertyDescriptor$2;
	var toIndexedObject$2 = toIndexedObject$3;
	var toPropertyKey$1 = toPropertyKey$2;
	var hasOwn$7 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$2(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$7(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
	};

	var objectDefineProperty = {};

	var isObject$1 = isObject$5;

	// `Assert: Type(argument) is Object`
	var anObject$6 = function (argument) {
	  if (isObject$1(argument)) return argument;
	  throw TypeError(String(argument) + ' is not an object');
	};

	var DESCRIPTORS$2 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var anObject$5 = anObject$6;
	var toPropertyKey = toPropertyKey$2;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$2 ? $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$5(O);
	  P = toPropertyKey(P);
	  anObject$5(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$1 = descriptors;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$2;

	var createNonEnumerableProperty$4 = DESCRIPTORS$1 ? function (object, key, value) {
	  return definePropertyModule$1.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$2 = {exports: {}};

	var isCallable$7 = isCallable$d;
	var store$1 = sharedStore;

	var functionToString = Function.toString;

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$7(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var global$5 = global$c;
	var isCallable$6 = isCallable$d;
	var inspectSource$1 = inspectSource$2;

	var WeakMap$1 = global$5.WeakMap;

	var nativeWeakMap = isCallable$6(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));

	var shared$1 = shared$3.exports;
	var uid = uid$2;

	var keys = shared$1('keys');

	var sharedKey$3 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$4 = global$c;
	var isObject = isObject$5;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;
	var hasOwn$6 = hasOwnProperty_1;
	var shared = sharedStore;
	var sharedKey$2 = sharedKey$3;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var WeakMap = global$4.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared.state) {
	  var store = shared.state || (shared.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$3[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$6(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$3(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$6(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$6(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var DESCRIPTORS = descriptors;
	var hasOwn$5 = hasOwnProperty_1;

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$5(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var global$3 = global$c;
	var isCallable$5 = isCallable$d;
	var hasOwn$4 = hasOwnProperty_1;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
	var setGlobal$1 = setGlobal$3;
	var inspectSource = inspectSource$2;
	var InternalStateModule = internalState;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

	var getInternalState = InternalStateModule.get;
	var enforceInternalState = InternalStateModule.enforce;
	var TEMPLATE = String(String).split('String');

	(redefine$2.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var name = options && options.name !== undefined ? options.name : key;
	  var state;
	  if (isCallable$5(value)) {
	    if (String(name).slice(0, 7) === 'Symbol(') {
	      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	    }
	    if (!hasOwn$4(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	      createNonEnumerableProperty$2(value, 'name', name);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	    }
	  }
	  if (O === global$3) {
	    if (simple) O[key] = value;
	    else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty$2(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return isCallable$5(this) && getInternalState(this).source || inspectSource(this);
	});

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$2 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- safe
	  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toIntegerOrInfinity$1(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var toIntegerOrInfinity = toIntegerOrInfinity$2;

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$2 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$1 = toIndexedObject$3;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike$1 = lengthOfArrayLike$2;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$1($this);
	    var length = lengthOfArrayLike$1(O);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var hasOwn$3 = hasOwnProperty_1;
	var toIndexedObject = toIndexedObject$3;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$3(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$1 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$1;

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$1 = getBuiltIn$4;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$4 = anObject$6;

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$4(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$2 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$2(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var fails$3 = fails$8;
	var isCallable$4 = isCallable$d;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$4(detection) ? fails$3(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var global$2 = global$c;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
	var redefine$1 = redefine$2.exports;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	  options.name        - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$2;
	  } else if (STATIC) {
	    target = global$2[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$2[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$1(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine$1(target, key, sourceProperty, options);
	  }
	};

	var anInstance$1 = function (it, Constructor, name) {
	  if (it instanceof Constructor) return it;
	  throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	};

	var getBuiltIn = getBuiltIn$4;

	getBuiltIn('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */
	var hiddenKeys = hiddenKeys$4;
	var sharedKey$1 = sharedKey$3;
	var IE_PROTO$1 = sharedKey$1('IE_PROTO');

	hiddenKeys[IE_PROTO$1] = true;

	var fails$2 = fails$8;

	var correctPrototypeGetter = !fails$2(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var hasOwn$1 = hasOwnProperty_1;
	var isCallable$3 = isCallable$d;
	var toObject = toObject$2;
	var sharedKey = sharedKey$3;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
	  var object = toObject(O);
	  if (hasOwn$1(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$3(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof Object ? ObjectPrototype : null;
	};

	var fails$1 = fails$8;
	var isCallable$2 = isCallable$d;
	var getPrototypeOf = objectGetPrototypeOf;
	var redefine = redefine$2.exports;
	var wellKnownSymbol$5 = wellKnownSymbol$7;

	var ITERATOR$2 = wellKnownSymbol$5('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$1 == undefined || fails$1(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$1[ITERATOR$2].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$2(IteratorPrototype$1[ITERATOR$2])) {
	  redefine(IteratorPrototype$1, ITERATOR$2, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$1,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	// https://github.com/tc39/proposal-iterator-helpers
	var $$1 = _export;
	var global$1 = global$c;
	var anInstance = anInstance$1;
	var isCallable$1 = isCallable$d;
	var createNonEnumerableProperty = createNonEnumerableProperty$4;
	var fails = fails$8;
	var hasOwn = hasOwnProperty_1;
	var wellKnownSymbol$4 = wellKnownSymbol$7;
	var IteratorPrototype = iteratorsCore.IteratorPrototype;

	var TO_STRING_TAG$2 = wellKnownSymbol$4('toStringTag');

	var NativeIterator = global$1.Iterator;

	// FF56- have non-standard global helper `Iterator`
	var FORCED = !isCallable$1(NativeIterator)
	  || NativeIterator.prototype !== IteratorPrototype
	  // FF44- non-standard `Iterator` passes previous tests
	  || !fails(function () { NativeIterator({}); });

	var IteratorConstructor = function Iterator() {
	  anInstance(this, IteratorConstructor);
	};

	if (!hasOwn(IteratorPrototype, TO_STRING_TAG$2)) {
	  createNonEnumerableProperty(IteratorPrototype, TO_STRING_TAG$2, 'Iterator');
	}

	if (FORCED || !hasOwn(IteratorPrototype, 'constructor') || IteratorPrototype.constructor === Object) {
	  createNonEnumerableProperty(IteratorPrototype, 'constructor', IteratorConstructor);
	}

	IteratorConstructor.prototype = IteratorPrototype;

	$$1({ global: true, forced: FORCED }, {
	  Iterator: IteratorConstructor
	});

	var iterators = {};

	var wellKnownSymbol$3 = wellKnownSymbol$7;
	var Iterators$1 = iterators;

	var ITERATOR$1 = wellKnownSymbol$3('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$1] === it);
	};

	var aCallable$1 = aCallable$3;

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aCallable$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var wellKnownSymbol$2 = wellKnownSymbol$7;

	var TO_STRING_TAG$1 = wellKnownSymbol$2('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var isCallable = isCallable$d;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$1 = wellKnownSymbol$7;

	var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
	};

	var classof = classof$1;
	var getMethod$1 = getMethod$3;
	var Iterators = iterators;
	var wellKnownSymbol = wellKnownSymbol$7;

	var ITERATOR = wellKnownSymbol('iterator');

	var getIteratorMethod$2 = function (it) {
	  if (it != undefined) return getMethod$1(it, ITERATOR)
	    || getMethod$1(it, '@@iterator')
	    || Iterators[classof(it)];
	};

	var aCallable = aCallable$3;
	var anObject$3 = anObject$6;
	var getIteratorMethod$1 = getIteratorMethod$2;

	var getIterator$1 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
	  if (aCallable(iteratorMethod)) return anObject$3(iteratorMethod.call(argument));
	  throw TypeError(String(argument) + ' is not iterable');
	};

	var anObject$2 = anObject$6;
	var getMethod = getMethod$3;

	var iteratorClose$1 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$2(iterator);
	  try {
	    innerResult = getMethod(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = innerResult.call(iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$2(innerResult);
	  return value;
	};

	var anObject$1 = anObject$6;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var lengthOfArrayLike = lengthOfArrayLike$2;
	var bind = functionBindContext;
	var getIterator = getIterator$1;
	var getIteratorMethod = getIteratorMethod$2;
	var iteratorClose = iteratorClose$1;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate$1 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$1(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (!iterFn) throw TypeError(String(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator(iterable, iterFn);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	// https://github.com/tc39/proposal-iterator-helpers
	var $ = _export;
	var iterate = iterate$1;
	var anObject = anObject$6;

	$({ target: 'Iterator', proto: true, real: true }, {
	  forEach: function forEach(fn) {
	    iterate(anObject(this), fn, { IS_ITERATOR: true });
	  }
	});

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z = ".global-module_button__EeOr9 {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 12px;\r\n  position: fixed;\r\n  left: 18px;\r\n  top: 50%;\r\n  transform: translate(-50%, -50%);\r\n  z-index: 999;\r\n  width: 32px;\r\n  height: 32px;\r\n  background-color: black;\r\n  border-radius: 16px;\r\n  cursor: pointer;\r\n  color: white;\r\n}\r\n";
	var style = {"button":"global-module_button__EeOr9"};
	styleInject(css_248z);

	// 打印指定元素，进阶版
	const printAdvanced = elementId => {
	  // 删除iframe
	  const removeIframe = () => {
	    const iframeEl = document.querySelector(".target-el-iframe");
	    if (iframeEl) {
	      iframeEl.remove();
	    }
	  };
	  removeIframe();

	  //目标元素
	  const info = document.getElementById(elementId);
	  if (!info) {
	    const msg = `未找到id为${elementId}的元素，请确保页面加载完成后再试`;
	    alert(msg);
	    return;
	  }

	  //创建iframe
	  const iframeEl = document.createElement("iframe");
	  iframeEl.className = "target-el-iframe";
	  //将元素放置最底层，防止其覆盖了其他元素
	  iframeEl.style.position = "fixed";
	  iframeEl.style.zIndex = "-99";
	  document.body.append(iframeEl);
	  const documentEl = iframeEl.contentDocument;
	  if (!documentEl) {
	    const msg = "打印失败，未找到iframe的contentDocument对象";
	    alert(msg);
	    return;
	  }

	  // 复制主页面的所有样式到iframe
	  // 1. 复制所有link标签（外部样式表）
	  const links = document.querySelectorAll('link[rel="stylesheet"]');
	  links.forEach(link => {
	    const newLink = document.createElement("link");
	    newLink.rel = "stylesheet";
	    newLink.href = link.href;
	    documentEl.head.appendChild(newLink);
	  });

	  // 2. 复制所有style标签（内联样式）
	  const styles = document.querySelectorAll("style");
	  styles.forEach(style => {
	    const newStyle = document.createElement("style");
	    newStyle.textContent = style.textContent;
	    documentEl.head.appendChild(newStyle);
	  });

	  //深度拷贝目标元素
	  documentEl.body.append(info.cloneNode(true));

	  //去除打印的页眉和页脚
	  const style = document.createElement("style");
	  style.media = "print";
	  style.innerText = `
	 @page {
	  size: auto;
	  margin: 0mm;
	}`;
	  documentEl.head.append(style);

	  // 等待样式加载完毕
	  setTimeout(() => {
	    //打印
	    if (!iframeEl.contentWindow) {
	      const msg = "未找到iframe的contentWindow对象";
	      alert(msg);
	      return;
	    }
	    iframeEl.contentWindow.print();
	  }, 1000);
	};
	const printButton = document.createElement("div");
	const printButtonText = document.createElement("span");
	printButtonText.style.textAlign = "center";
	printButtonText.innerHTML = "print";
	printButton.appendChild(printButtonText);
	printButton.classList.add(style.button);
	printButton.addEventListener("click", () => printAdvanced("cv-container"));
	document.body.appendChild(printButton);

})();
