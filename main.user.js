// ==UserScript==
// @name         demo-userscript
// @namespace    demo-userscript
// @version      0.0.0
// @include      *
// @run-at       document-end
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
(function () {
  "use strict";

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === "undefined") {
      return;
    }

    var head = document.head || document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";

    if (insertAt === "top") {
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

  var css_248z$1 =
    ".global-module_container__-tGDM {\n  font-size: 16px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 999;\n  min-width: 15em;\n  max-width: 100%;\n  background-color: #fff;\n  border: 1px solid #eee;\n  border-radius: 4px;\n  padding: 1em;\n  text-align: center;\n}\n\n.global-module_logo__RzTo1 {\n  width: 48px;\n  height: 48px;\n}\n\n.global-module_check__1s-U5 {\n  color: green;\n  vertical-align: middle;\n  margin-right: 0.5em;\n}\n\n.global-module_supports__XdEcd {\n  text-align: left;\n  width: auto;\n  line-height: 2;\n}\n\n.global-module_button__EeOr9 {\n  padding: 0.2em 2em;\n  border-radius: 2px;\n  text-align: center;\n  background-color: #000;\n  color: #fff;\n  display: inline-block;\n  cursor: pointer;\n}\n\n.global-module_hide__63gRn {\n  display: none;\n}\n";
  var style = {
    container: "global-module_container__-tGDM",
    logo: "global-module_logo__RzTo1",
    check: "global-module_check__1s-U5",
    supports: "global-module_supports__XdEcd",
    button: "global-module_button__EeOr9",
    hide: "global-module_hide__63gRn",
  };
  styleInject(css_248z$1);

  var img =
    "data:image/svg+xml,%3csvg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e %3ctitle%3eTampermonkey%3c/title%3e %3cpath d='M5.955.002C3-.071.275 2.386.043 5.335c-.069 3.32-.011 6.646-.03 9.969.06 1.87-.276 3.873.715 5.573 1.083 2.076 3.456 3.288 5.77 3.105 4.003-.011 8.008.022 12.011-.017 2.953-.156 5.478-2.815 5.482-5.772-.007-4.235.023-8.473-.015-12.708C23.82 2.533 21.16.007 18.205.003c-4.083-.005-8.167 0-12.25-.002zm.447 12.683c2.333-.046 4.506 1.805 4.83 4.116.412 2.287-1.056 4.716-3.274 5.411-2.187.783-4.825-.268-5.874-2.341-1.137-2.039-.52-4.827 1.37-6.197a4.896 4.896 0 012.948-.99zm11.245 0c2.333-.046 4.505 1.805 4.829 4.116.413 2.287-1.056 4.716-3.273 5.411-2.188.783-4.825-.268-5.875-2.341-1.136-2.039-.52-4.827 1.37-6.197a4.896 4.896 0 012.949-.99z' /%3e%3c/svg%3e";

  var commonjsGlobal =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {};

  var check$1 = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$c =
    // eslint-disable-next-line es/no-global-this -- safe
    check$1(typeof globalThis == "object" && globalThis) ||
    check$1(typeof window == "object" && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check$1(typeof self == "object" && self) ||
    check$1(typeof commonjsGlobal == "object" && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () {
      return this;
    })() ||
    Function("return this")();

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
    return (
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        },
      })[1] != 7
    );
  });

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG =
    getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG
    ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor$1(this, V);
        return !!descriptor && descriptor.enumerable;
      }
    : $propertyIsEnumerable;

  var createPropertyDescriptor$2 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value,
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var fails$6 = fails$8;
  var classof = classofRaw;

  var split = "".split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$6(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object("z").propertyIsEnumerable(0);
  })
    ? function (it) {
        return classof(it) == "String" ? split.call(it, "") : Object(it);
      }
    : Object;

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
  var isCallable$c = function (argument) {
    return typeof argument === "function";
  };

  var isCallable$b = isCallable$c;

  var isObject$5 = function (it) {
    return typeof it === "object" ? it !== null : isCallable$b(it);
  };

  var global$b = global$c;
  var isCallable$a = isCallable$c;

  var aFunction = function (argument) {
    return isCallable$a(argument) ? argument : undefined;
  };

  var getBuiltIn$4 = function (namespace, method) {
    return arguments.length < 2
      ? aFunction(global$b[namespace])
      : global$b[namespace] && global$b[namespace][method];
  };

  var getBuiltIn$3 = getBuiltIn$4;

  var engineUserAgent = getBuiltIn$3("navigator", "userAgent") || "";

  var global$a = global$c;
  var userAgent = engineUserAgent;

  var process = global$a.process;
  var Deno = global$a.Deno;
  var versions = (process && process.versions) || (Deno && Deno.version);
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split(".");
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
  var nativeSymbol =
    !!Object.getOwnPropertySymbols &&
    !fails$5(function () {
      var symbol = Symbol();
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      return (
        !String(symbol) ||
        !(Object(symbol) instanceof Symbol) ||
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        (!Symbol.sham && V8_VERSION && V8_VERSION < 41)
      );
    });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol;

  var useSymbolAsUid =
    NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";

  var isCallable$9 = isCallable$c;
  var getBuiltIn$2 = getBuiltIn$4;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var isSymbol$2 = USE_SYMBOL_AS_UID$1
    ? function (it) {
        return typeof it == "symbol";
      }
    : function (it) {
        var $Symbol = getBuiltIn$2("Symbol");
        return isCallable$9($Symbol) && Object(it) instanceof $Symbol;
      };

  var tryToString$1 = function (argument) {
    try {
      return String(argument);
    } catch (error) {
      return "Object";
    }
  };

  var isCallable$8 = isCallable$c;
  var tryToString = tryToString$1;

  // `Assert: IsCallable(argument) is true`
  var aCallable$3 = function (argument) {
    if (isCallable$8(argument)) return argument;
    throw TypeError(tryToString(argument) + " is not a function");
  };

  var aCallable$2 = aCallable$3;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$3 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$2(func);
  };

  var isCallable$7 = isCallable$c;
  var isObject$4 = isObject$5;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (
      pref === "string" &&
      isCallable$7((fn = input.toString)) &&
      !isObject$4((val = fn.call(input)))
    )
      return val;
    if (
      isCallable$7((fn = input.valueOf)) &&
      !isObject$4((val = fn.call(input)))
    )
      return val;
    if (
      pref !== "string" &&
      isCallable$7((fn = input.toString)) &&
      !isObject$4((val = fn.call(input)))
    )
      return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var shared$3 = { exports: {} };

  var global$9 = global$c;

  var setGlobal$3 = function (key, value) {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(global$9, key, {
        value: value,
        configurable: true,
        writable: true,
      });
    } catch (error) {
      global$9[key] = value;
    }
    return value;
  };

  var global$8 = global$c;
  var setGlobal$2 = setGlobal$3;

  var SHARED = "__core-js_shared__";
  var store$3 = global$8[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$3.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })("versions", []).push({
    version: "3.18.3",
    mode: "global",
    copyright: "© 2021 Denis Pushkarev (zloirock.ru)",
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
  var hasOwnProperty_1 =
    Object.hasOwn ||
    function hasOwn(it, key) {
      return hasOwnProperty.call(toObject$1(it), key);
    };

  var id = 0;
  var postfix = Math.random();

  var uid$2 = function (key) {
    return (
      "Symbol(" +
      String(key === undefined ? "" : key) +
      ")_" +
      (++id + postfix).toString(36)
    );
  };

  var global$7 = global$c;
  var shared$2 = shared$3.exports;
  var hasOwn$8 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore = shared$2("wks");
  var Symbol$1 = global$7.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID
    ? Symbol$1
    : (Symbol$1 && Symbol$1.withoutSetter) || uid$1;

  var wellKnownSymbol$4 = function (name) {
    if (
      !hasOwn$8(WellKnownSymbolsStore, name) ||
      !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")
    ) {
      if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
      }
    }
    return WellKnownSymbolsStore[name];
  };

  var isObject$3 = isObject$5;
  var isSymbol$1 = isSymbol$2;
  var getMethod$2 = getMethod$3;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$3 = wellKnownSymbol$4;

  var TO_PRIMITIVE = wellKnownSymbol$3("toPrimitive");

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$3(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = "default";
      result = exoticToPrim.call(input, pref);
      if (!isObject$3(result) || isSymbol$1(result)) return result;
      throw TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = "number";
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$2 = function (argument) {
    var key = toPrimitive(argument, "string");
    return isSymbol(key) ? key : String(key);
  };

  var global$6 = global$c;
  var isObject$2 = isObject$5;

  var document$1 = global$6.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$2(document$1) && isObject$2(document$1.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$5 = descriptors;
  var fails$4 = fails$8;
  var createElement = documentCreateElement$1;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine =
    !DESCRIPTORS$5 &&
    !fails$4(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
      return (
        Object.defineProperty(createElement("div"), "a", {
          get: function () {
            return 7;
          },
        }).a != 7
      );
    });

  var DESCRIPTORS$4 = descriptors;
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
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$4
    ? $getOwnPropertyDescriptor
    : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject$2(O);
        P = toPropertyKey$1(P);
        if (IE8_DOM_DEFINE$1)
          try {
            return $getOwnPropertyDescriptor(O, P);
          } catch (error) {
            /* empty */
          }
        if (hasOwn$7(O, P))
          return createPropertyDescriptor$1(
            !propertyIsEnumerableModule.f.call(O, P),
            O[P]
          );
      };

  var objectDefineProperty = {};

  var isObject$1 = isObject$5;

  // `Assert: Type(argument) is Object`
  var anObject$8 = function (argument) {
    if (isObject$1(argument)) return argument;
    throw TypeError(String(argument) + " is not an object");
  };

  var DESCRIPTORS$3 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$7 = anObject$8;
  var toPropertyKey = toPropertyKey$2;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$3
    ? $defineProperty
    : function defineProperty(O, P, Attributes) {
        anObject$7(O);
        P = toPropertyKey(P);
        anObject$7(Attributes);
        if (IE8_DOM_DEFINE)
          try {
            return $defineProperty(O, P, Attributes);
          } catch (error) {
            /* empty */
          }
        if ("get" in Attributes || "set" in Attributes)
          throw TypeError("Accessors not supported");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };

  var DESCRIPTORS$2 = descriptors;
  var definePropertyModule$2 = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$2;

  var createNonEnumerableProperty$5 = DESCRIPTORS$2
    ? function (object, key, value) {
        return definePropertyModule$2.f(
          object,
          key,
          createPropertyDescriptor(1, value)
        );
      }
    : function (object, key, value) {
        object[key] = value;
        return object;
      };

  var redefine$3 = { exports: {} };

  var isCallable$6 = isCallable$c;
  var store$1 = sharedStore;

  var functionToString = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$6(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$2 = store$1.inspectSource;

  var global$5 = global$c;
  var isCallable$5 = isCallable$c;
  var inspectSource$1 = inspectSource$2;

  var WeakMap$1 = global$5.WeakMap;

  var nativeWeakMap =
    isCallable$5(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));

  var shared$1 = shared$3.exports;
  var uid = uid$2;

  var keys = shared$1("keys");

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$4 = global$c;
  var isObject = isObject$5;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
  var hasOwn$6 = hasOwnProperty_1;
  var shared = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;

  var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
  var WeakMap = global$4.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError("Incompatible receiver, " + TYPE + " required");
      }
      return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      if (wmhas.call(store, it))
        throw new TypeError(OBJECT_ALREADY_INITIALIZED);
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
    var STATE = sharedKey$2("state");
    hiddenKeys$3[STATE] = true;
    set = function (it, metadata) {
      if (hasOwn$6(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$4(it, STATE, metadata);
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
    getterFor: getterFor,
  };

  var DESCRIPTORS$1 = descriptors;
  var hasOwn$5 = hasOwnProperty_1;

  var FunctionPrototype = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$5(FunctionPrototype, "name");
  // additional protection from minified / mangled / dropped function names
  var PROPER =
    EXISTS &&
    function something() {
      /* empty */
    }.name === "something";
  var CONFIGURABLE =
    EXISTS &&
    (!DESCRIPTORS$1 ||
      (DESCRIPTORS$1 && getDescriptor(FunctionPrototype, "name").configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE,
  };

  var global$3 = global$c;
  var isCallable$4 = isCallable$c;
  var hasOwn$4 = hasOwnProperty_1;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
  var setGlobal$1 = setGlobal$3;
  var inspectSource = inspectSource$2;
  var InternalStateModule$1 = internalState;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

  var getInternalState$1 = InternalStateModule$1.get;
  var enforceInternalState = InternalStateModule$1.enforce;
  var TEMPLATE = String(String).split("String");

  (redefine$3.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable$4(value)) {
      if (String(name).slice(0, 7) === "Symbol(") {
        name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
      }
      if (
        !hasOwn$4(value, "name") ||
        (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
      ) {
        createNonEnumerableProperty$3(value, "name", name);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == "string" ? name : "");
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
    else createNonEnumerableProperty$3(O, key, value);
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, "toString", function toString() {
    return (
      (isCallable$4(this) && getInternalState$1(this).source) ||
      inspectSource(this)
    );
  });

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$2 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0
      ? 0
      : (number > 0 ? floor : ceil)(number);
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
    return argument > 0
      ? min(toIntegerOrInfinity(argument), 0x1fffffffffffff)
      : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength = toLength$1;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$1 = function (obj) {
    return toLength(obj.length);
  };

  var toIndexedObject$1 = toIndexedObject$3;
  var toAbsoluteIndex = toAbsoluteIndex$1;
  var lengthOfArrayLike = lengthOfArrayLike$1;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$1($this);
      var length = lengthOfArrayLike(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare -- NaN check
          if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el)
            return IS_INCLUDES || index || 0;
        }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false),
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
    for (key in O)
      !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (hasOwn$3(O, (key = names[i++]))) {
        ~indexOf(result, key) || result.push(key);
      }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$1 = enumBugKeys$2.concat("length", "prototype");

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return internalObjectKeys$1(O, hiddenKeys$1);
    };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$1 = getBuiltIn$4;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$6 = anObject$8;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 =
    getBuiltIn$1("Reflect", "ownKeys") ||
    function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject$6(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols
        ? keys.concat(getOwnPropertySymbols(it))
        : keys;
    };

  var hasOwn$2 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$1 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$1.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$2(target, key))
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$3 = fails$8;
  var isCallable$3 = isCallable$c;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL
      ? true
      : value == NATIVE
      ? false
      : isCallable$3(detection)
      ? fails$3(detection)
      : !!detection;
  };

  var normalize = (isForced$1.normalize = function (string) {
    return String(string).replace(replacement, ".").toLowerCase();
  });

  var data = (isForced$1.data = {});
  var NATIVE = (isForced$1.NATIVE = "N");
  var POLYFILL = (isForced$1.POLYFILL = "P");

  var isForced_1 = isForced$1;

  var global$2 = global$c;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
  var redefine$2 = redefine$3.exports;
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
    if (target)
      for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(
          GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
          options.forced
        );
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty$2(sourceProperty, "sham", true);
        }
        // extend global
        redefine$2(target, key, sourceProperty, options);
      }
  };

  var anInstance$1 = function (it, Constructor, name) {
    if (it instanceof Constructor) return it;
    throw TypeError("Incorrect " + (name ? name + " " : "") + "invocation");
  };

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 =
    Object.keys ||
    function keys(O) {
      return internalObjectKeys(O, enumBugKeys$1);
    };

  var DESCRIPTORS = descriptors;
  var definePropertyModule = objectDefineProperty;
  var anObject$5 = anObject$8;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        anObject$5(O);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index)
          definePropertyModule.f(O, (key = keys[index++]), Properties[key]);
        return O;
      };

  var getBuiltIn = getBuiltIn$4;

  var html$1 = getBuiltIn("document", "documentElement");

  /* global ActiveXObject -- old IE, WSH */

  var anObject$4 = anObject$8;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$1 = sharedKey$3;

  var GT = ">";
  var LT = "<";
  var PROTOTYPE = "prototype";
  var SCRIPT = "script";
  var IE_PROTO$1 = sharedKey$1("IE_PROTO");

  var EmptyConstructor = function () {
    /* empty */
  };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(""));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement("iframe");
    var JS = "java" + SCRIPT + ":";
    var iframeDocument;
    iframe.style.display = "none";
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag("document.F=Object"));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject("htmlfile");
    } catch (error) {
      /* ignore */
    }
    NullProtoObject =
      typeof document != "undefined"
        ? document.domain && activeXDocument
          ? NullProtoObjectViaActiveX(activeXDocument) // old IE
          : NullProtoObjectViaIFrame()
        : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate =
    Object.create ||
    function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject$4(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = NullProtoObject();
      return Properties === undefined
        ? result
        : defineProperties(result, Properties);
    };

  var fails$2 = fails$8;

  var correctPrototypeGetter = !fails$2(function () {
    function F() {
      /* empty */
    }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$1 = hasOwnProperty_1;
  var isCallable$2 = isCallable$c;
  var toObject = toObject$2;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey("IE_PROTO");
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER
    ? Object.getPrototypeOf
    : function (O) {
        var object = toObject(O);
        if (hasOwn$1(object, IE_PROTO)) return object[IE_PROTO];
        var constructor = object.constructor;
        if (isCallable$2(constructor) && object instanceof constructor) {
          return constructor.prototype;
        }
        return object instanceof Object ? ObjectPrototype : null;
      };

  var fails$1 = fails$8;
  var isCallable$1 = isCallable$c;
  var getPrototypeOf = objectGetPrototypeOf;
  var redefine$1 = redefine$3.exports;
  var wellKnownSymbol$2 = wellKnownSymbol$4;

  var ITERATOR = wellKnownSymbol$2("iterator");
  var BUGGY_SAFARI_ITERATORS = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf(
        getPrototypeOf(arrayIterator)
      );
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
        IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE =
    IteratorPrototype$2 == undefined ||
    fails$1(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype$2[ITERATOR].call(test) !== test;
    });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$1(IteratorPrototype$2[ITERATOR])) {
    redefine$1(IteratorPrototype$2, ITERATOR, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS,
  };

  // https://github.com/tc39/proposal-iterator-helpers
  var $$1 = _export;
  var global$1 = global$c;
  var anInstance = anInstance$1;
  var isCallable = isCallable$c;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
  var fails = fails$8;
  var hasOwn = hasOwnProperty_1;
  var wellKnownSymbol$1 = wellKnownSymbol$4;
  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

  var TO_STRING_TAG$1 = wellKnownSymbol$1("toStringTag");

  var NativeIterator = global$1.Iterator;

  // FF56- have non-standard global helper `Iterator`
  var FORCED =
    !isCallable(NativeIterator) ||
    NativeIterator.prototype !== IteratorPrototype$1 ||
    // FF44- non-standard `Iterator` passes previous tests
    !fails(function () {
      NativeIterator({});
    });

  var IteratorConstructor = function Iterator() {
    anInstance(this, IteratorConstructor);
  };

  if (!hasOwn(IteratorPrototype$1, TO_STRING_TAG$1)) {
    createNonEnumerableProperty$1(
      IteratorPrototype$1,
      TO_STRING_TAG$1,
      "Iterator"
    );
  }

  if (
    FORCED ||
    !hasOwn(IteratorPrototype$1, "constructor") ||
    IteratorPrototype$1.constructor === Object
  ) {
    createNonEnumerableProperty$1(
      IteratorPrototype$1,
      "constructor",
      IteratorConstructor
    );
  }

  IteratorConstructor.prototype = IteratorPrototype$1;

  $$1(
    { global: true, forced: FORCED },
    {
      Iterator: IteratorConstructor,
    }
  );

  var redefine = redefine$3.exports;

  var redefineAll$1 = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };

  var aCallable$1 = aCallable$3;
  var anObject$3 = anObject$8;
  var create = objectCreate;
  var createNonEnumerableProperty = createNonEnumerableProperty$5;
  var redefineAll = redefineAll$1;
  var wellKnownSymbol = wellKnownSymbol$4;
  var InternalStateModule = internalState;
  var getMethod$1 = getMethod$3;
  var IteratorPrototype = iteratorsCore.IteratorPrototype;

  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.get;

  var TO_STRING_TAG = wellKnownSymbol("toStringTag");

  var iteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
    var IteratorProxy = function Iterator(state) {
      state.next = aCallable$1(state.iterator.next);
      state.done = false;
      state.ignoreArg = !IS_ITERATOR;
      setInternalState(this, state);
    };

    IteratorProxy.prototype = redefineAll(create(IteratorPrototype), {
      next: function next(arg) {
        var state = getInternalState(this);
        var args = arguments.length
          ? [state.ignoreArg ? undefined : arg]
          : IS_ITERATOR
          ? []
          : [undefined];
        state.ignoreArg = false;
        var result = state.done ? undefined : nextHandler.call(state, args);
        return { done: state.done, value: result };
      },
      return: function (value) {
        var state = getInternalState(this);
        var iterator = state.iterator;
        state.done = true;
        var $$return = getMethod$1(iterator, "return");
        return {
          done: true,
          value: $$return
            ? anObject$3($$return.call(iterator, value)).value
            : value,
        };
      },
      throw: function (value) {
        var state = getInternalState(this);
        var iterator = state.iterator;
        state.done = true;
        var $$throw = getMethod$1(iterator, "throw");
        if ($$throw) return $$throw.call(iterator, value);
        throw value;
      },
    });

    if (!IS_ITERATOR) {
      createNonEnumerableProperty(
        IteratorProxy.prototype,
        TO_STRING_TAG,
        "Generator"
      );
    }

    return IteratorProxy;
  };

  var anObject$2 = anObject$8;
  var getMethod = getMethod$3;

  var iteratorClose$1 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$2(iterator);
    try {
      innerResult = getMethod(iterator, "return");
      if (!innerResult) {
        if (kind === "throw") throw value;
        return value;
      }
      innerResult = innerResult.call(iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === "throw") throw value;
    if (innerError) throw innerResult;
    anObject$2(innerResult);
    return value;
  };

  var anObject$1 = anObject$8;
  var iteratorClose = iteratorClose$1;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$1(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, "throw", error);
    }
  };

  // https://github.com/tc39/proposal-iterator-helpers
  var $ = _export;
  var aCallable = aCallable$3;
  var anObject = anObject$8;
  var createIteratorProxy = iteratorCreateProxy;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;

  var IteratorProxy = createIteratorProxy(function (args) {
    var iterator = this.iterator;
    var result = anObject(this.next.apply(iterator, args));
    var done = (this.done = !!result.done);
    if (!done)
      return callWithSafeIterationClosing(iterator, this.mapper, result.value);
  });

  $(
    { target: "Iterator", proto: true, real: true },
    {
      map: function map(mapper) {
        return new IteratorProxy({
          iterator: anObject(this),
          mapper: aCallable(mapper),
        });
      },
    }
  );

  var check =
    '<symbol id="icon-check" viewBox="1 1 15.6 11.9"><path d="M16.3 4l-8.6 8.6c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3l-5-5C1.1 7.5 1 7.2 1 7c0-.3.1-.5.3-.7l1.4-1.4c.2-.2.4-.3.7-.3.3 0 .5.1.7.3l3 3 6.6-6.6c0-.2.3-.3.5-.3.3 0 .5.1.7.3l1.4 1.4c.2.2.3.4.3.7 0 .2-.1.4-.3.6"/></symbol>';

  var css_248z =
    ".sprite-module_icon__ljZO0 {\n  width: 1em;\n  height: 1em;\n  fill: currentColor;\n  overflow: hidden;\n  display: inline-block;\n}\n";
  var iconStyle = { icon: "sprite-module_icon__ljZO0" };
  styleInject(css_248z);

  const icons = {
    check,
  };
  const iconIds = Object.fromEntries(
    Object.entries(icons).map(([name, value]) => [
      name,
      value.match(/<symbol id="([^"]+)"/)?.[1],
    ])
  );
  const xmlns = "http://www.w3.org/2000/svg";
  const xlink = "http://www.w3.org/1999/xlink";
  const svgSpriteElement = document.createElementNS(xmlns, "svg");
  svgSpriteElement.setAttribute("aria-hidden", "true");
  svgSpriteElement.setAttribute(
    "style",
    "position: absolute; width: 0; height: 0; overflow: hidden;"
  );
  svgSpriteElement.setAttribute("version", "1.1");
  svgSpriteElement.setAttribute("xmlns", xmlns);
  svgSpriteElement.setAttribute("xmlns:xlink", xlink);
  svgSpriteElement.innerHTML = [
    "<defs>",
    ...Object.values(icons),
    "</defs>",
  ].join("");
  document.body.appendChild(svgSpriteElement);
  const renderIcon = (iconId, ...classList) => {
    const svgElement = document.createElementNS(xmlns, "svg");
    const useElement = document.createElementNS(xmlns, "use");
    svgElement.classList.add(iconStyle.icon, ...classList);
    useElement.setAttributeNS(xlink, "href", `#${iconIds[iconId]}`);
    svgElement.appendChild(useElement);
    return svgElement;
  };

  var title$1 = "开始开发你的脚本吧～";
  var zhJSON = {
    title: title$1,
    "support-es": "支持 ESNext",
    "support-css": "支持 CSS Modules（如果需要 scss，安装 node-sass 即可使用）",
    "support-static": "支持静态资源（图片和SVG）",
    "support-svg-sprite": "支持 SVG 雪碧图",
    "support-locale": "支持国际化",
    "support-plugin": "内部由 rollup 支撑，可以通过插件做扩展",
    "got-it": "了解了",
  };

  var title = "Start create awesome userscript";
  var enJSON = {
    title: title,
    "support-es": "Support ESNext",
    "support-css":
      "Support CSS Modules (Install node-sass package to enable scss)",
    "support-static": "Support static resources(image, svg)",
    "support-svg-sprite": "Support SVG Sprite",
    "support-locale": "Support locale languages",
    "support-plugin": "Build with Rollup, you can add external plugins",
    "got-it": "Got It",
  };

  let localeMessage = {};
  const setLocale = (lang) => {
    localeMessage = lang === "zh-CN" ? zhJSON : enJSON;
  };
  setLocale(navigator.language ?? navigator.languages?.[0]);
  function t(key) {
    return localeMessage[key] ?? "";
  }

  const container = document.createElement("div");
  container.classList.add(style.container);
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", img);
  imgEl.classList.add(style.logo);
  container.appendChild(imgEl);
  const mainEl = document.createElement("main");
  mainEl.innerHTML =
    `<h1>${t("title").toUpperCase()}</h1>` +
    `<ul class=${style.supports}>
  ${[
    "support-es",
    "support-css",
    "support-static",
    "support-svg-sprite",
    "support-locale",
    "support-plugin",
  ]
    .map(
      (key) => `<li>${renderIcon("check", style.check).outerHTML}${t(key)}</li>`
    )
    .join("\n")}
  </ul>
  `;
  container.appendChild(mainEl);
  const getItButton = document.createElement("div");
  getItButton.textContent = t("got-it");
  getItButton.classList.add(style.button);
  container.appendChild(getItButton);
  getItButton.addEventListener("click", () => {
    container.classList.add(style.hide);
  });
  document.body.appendChild(container);
})();
