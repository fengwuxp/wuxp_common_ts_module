console.log('START WEEX VUE RENDER CORE: 1.0.33, Build 2018-12-07 12:14.');


(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.WeexVueRenderCore = factory());
}(this, (function () {
    'use strict';

    function __$styleInject(css, ref) {
        if (ref === void 0) ref = {};
        var insertAt = ref.insertAt;

        if (!css || typeof document === 'undefined') {
            return;
        }

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

    __$styleInject("/*\r\n * Licensed to the Apache Software Foundation (ASF) under one\r\n * or more contributor license agreements.  See the NOTICE file\r\n * distributed with this work for additional information\r\n * regarding copyright ownership.  The ASF licenses this file\r\n * to you under the Apache License, Version 2.0 (the\r\n * \"License\"); you may not use this file except in compliance\r\n * with the License.  You may obtain a copy of the License at\r\n *\r\n *   http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing,\r\n * software distributed under the License is distributed on an\r\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\r\n * KIND, either express or implied.  See the License for the\r\n * specific language governing permissions and limitations\r\n * under the License.\r\n */\r\n \r\n.weex-root,\r\n.weex-root * {\r\n  color: initial;\r\n  cursor: initial;\r\n  direction: initial;\r\n  /* In chrome, there's a chance that user set the miximum font-size to \r\n  a abnormal smaller size. But actually the smaller size is never working\r\n  if this font / font-size default value is set to initial. Perhaps a bug\r\n  for chrome. */\r\n  font: initial;\r\n  font-size: initial;\r\n  font-family: initial;\r\n  font-style: initial;\r\n  font-variant: initial;\r\n  font-weight: initial;\r\n  line-height: initial;\r\n  text-align: initial;\r\n  text-indent: initial;\r\n  visibility: initial;\r\n  white-space: initial;\r\n  word-spacing: initial;\r\n  font-family: BlinkMacSystemFont, 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;\r\n}\r\n\r\n.weex-root,\r\n.weex-root *,\r\n.weex-root *::before,\r\n.weex-root *::after {\r\n  box-sizing: border-box;\r\n  text-size-adjust: none;\r\n}\r\n\r\n.weex-root a,\r\n.weex-root button,\r\n.weex-root [role=\"button\"],\r\n.weex-root input,\r\n.weex-root label,\r\n.weex-root select,\r\n.weex-root textarea {\r\n      touch-action: manipulation;\r\n}\r\n\r\n.weex-root p,\r\n.weex-root ol,\r\n.weex-root ul,\r\n.weex-root dl,\r\n.weex-root figure {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.weex-root li {\r\n  list-style: none;\r\n}\r\n\r\n.weex-root figure {\r\n  margin: 0;\r\n}\r\n\r\n.weex-root textarea {\r\n  resize: none;\r\n}\r\n\r\n/* show no scroll bar. */\r\n::-webkit-scrollbar {\r\n  display: none;\r\n}\r\n", {});

    __$styleInject("/*\r\n * Licensed to the Apache Software Foundation (ASF) under one\r\n * or more contributor license agreements.  See the NOTICE file\r\n * distributed with this work for additional information\r\n * regarding copyright ownership.  The ASF licenses this file\r\n * to you under the Apache License, Version 2.0 (the\r\n * \"License\"); you may not use this file except in compliance\r\n * with the License.  You may obtain a copy of the License at\r\n *\r\n *   http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing,\r\n * software distributed under the License is distributed on an\r\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\r\n * KIND, either express or implied.  See the License for the\r\n * specific language governing permissions and limitations\r\n * under the License.\r\n */\r\n \r\n.weex-root * {\r\n  border-width: 0;\r\n  border-color: inherit;\r\n  border-style: solid;\r\n}\r\n\r\ndiv.weex-root {\r\n  min-height: 100%;\r\n}\r\n\r\n/**\r\n * slider will overflow in horizontal axis, which will cause container\r\n * horizontally expanding. below styles will prevent this from happening.\r\n */\r\n.weex-root {\r\n  width: 100%;\r\n  overflow-x: hidden;\r\n}\r\n\r\n.weex-root figure {\r\n  background-repeat: no-repeat;\r\n  background-position: 50% 50%;\r\n}\r\n\r\n.weex-flex-ct {\r\n  display: flex;\r\n}\r\n\r\n.weex-ct {\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  position: relative;\r\n  flex-direction: column;\r\n  flex-shrink: 0;\r\n  flex-grow: 0;\r\n  flex-basis: auto;\r\n  align-items: stretch;\r\n  align-content: flex-start;\r\n  border: 0 solid black;\r\n  margin: 0;\r\n  padding: 0;\r\n  min-width: 0;\r\n}\r\n\r\n.weex-ct.horizontal {\r\n  flex-direction: row;\r\n}\r\n\r\n.weex-el {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  flex-shrink: 0;\r\n  flex-grow: 0;\r\n  flex-basis: auto;\r\n  border: 0 solid black;\r\n  margin: 0;\r\n  padding: 0;\r\n  min-width: 0;\r\n}\r\n\r\n.weex-text {\r\n  display: -webkit-box;\r\n  display: -moz-box;\r\n  -webkit-box-orient: vertical;\r\n  -moz-box-orient: vertical;\r\n  -moz-box-direction: normal;\r\n  position: relative;\r\n  white-space: pre-wrap;  /* not using 'pre': support auto line feed. */\r\n  font-size: 0.4266666666666667rem;\r\n  word-wrap: break-word;\r\n  overflow: hidden; /* it'll be clipped if the height is not high enough. */\r\n}\r\n\r\n.weex-image {\r\n  background-repeat: no-repeat;\r\n  background-position: 50% 50%;\r\n  background-size: 100% 100%;\r\n}\r\n\r\n.weex-a {\r\n  text-decoration: none;\r\n}\r\n\r\n.weex-ios-sticky {\r\n  position: -webkit-sticky !important;\r\n  position: sticky !important;\r\n  z-index: 9999;\r\n  top: 0;\r\n}\r\n\r\n.weex-fixed {\r\n  position: fixed;\r\n  z-index: 1;\r\n}\r\n\r\n.weex-sticky {\r\n  position: fixed;\r\n  top: 0;\r\n  z-index: 9999;\r\n}\r\n", {});

// 7.1.4 ToInteger
    var ceil = Math.ceil;
    var floor = Math.floor;
    var _toInteger = function (it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };

// 7.2.1 RequireObjectCoercible(argument)
    var _defined = function (it) {
        if (it == undefined) {
            throw TypeError("Can't call method on  " + it);
        }
        return it;
    };

// true  -> String#at
// false -> String#codePointAt
    var _stringAt = function (TO_STRING) {
        return function (that, pos) {
            var s = String(_defined(that));
            var i = _toInteger(pos);
            var l = s.length;
            var a, b;
            if (i < 0 || i >= l) {
                return TO_STRING ? '' : undefined;
            }
            a = s.charCodeAt(i);
            return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
                ? TO_STRING ? s.charAt(i) : a
                : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
        };
    };

    var _library = false;

    function createCommonjsModule(fn, module) {
        return module = {exports: {}}, fn(module, module.exports), module.exports;
    }

    var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = module.exports = typeof window != 'undefined' && window.Math == Math
            ? window : typeof self != 'undefined' && self.Math == Math ? self
                // eslint-disable-next-line no-new-func
                : Function('return this')();
        if (typeof __g == 'number') {
            __g = global;
        } // eslint-disable-line no-undef
    });

    var _core = createCommonjsModule(function (module) {
        var core = module.exports = {version: '2.6.0'};
        if (typeof __e == 'number') {
            __e = core;
        } // eslint-disable-line no-undef
    });

    var _core_1 = _core.version;

    var _isObject = function (it) {
        return typeof it === 'object' ? it !== null : typeof it === 'function';
    };

    var _anObject = function (it) {
        if (!_isObject(it)) {
            throw TypeError(it + ' is not an object!');
        }
        return it;
    };

    var _fails = function (exec) {
        try {
            return !!exec();
        } catch (e) {
            return true;
        }
    };

// Thank's IE8 for his funny defineProperty
    var _descriptors = !_fails(function () {
        return Object.defineProperty({}, 'a', {
            get: function () {
                return 7;
            }
        }).a != 7;
    });

    var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
    var is = _isObject(document$1) && _isObject(document$1.createElement);
    var _domCreate = function (it) {
        return is ? document$1.createElement(it) : {};
    };

    var _ie8DomDefine = !_descriptors && !_fails(function () {
        return Object.defineProperty(_domCreate('div'), 'a', {
            get: function () {
                return 7;
            }
        }).a != 7;
    });

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
    var _toPrimitive = function (it, S) {
        if (!_isObject(it)) {
            return it;
        }
        var fn, val;
        if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) {
            return val;
        }
        if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) {
            return val;
        }
        if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) {
            return val;
        }
        throw TypeError("Can't convert object to primitive value");
    };

    var dP = Object.defineProperty;

    var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        _anObject(O);
        P = _toPrimitive(P, true);
        _anObject(Attributes);
        if (_ie8DomDefine) {
            try {
                return dP(O, P, Attributes);
            } catch (e) { /* empty */
            }
        }
        if ('get' in Attributes || 'set' in Attributes) {
            throw TypeError('Accessors not supported!');
        }
        if ('value' in Attributes) {
            O[P] = Attributes.value;
        }
        return O;
    };

    var _objectDp = {
        f: f
    };

    var _propertyDesc = function (bitmap, value) {
        return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value
        };
    };

    var _hide = _descriptors ? function (object, key, value) {
        return _objectDp.f(object, key, _propertyDesc(1, value));
    } : function (object, key, value) {
        object[key] = value;
        return object;
    };

    var hasOwnProperty = {}.hasOwnProperty;
    var _has = function (it, key) {
        return hasOwnProperty.call(it, key);
    };

    var id = 0;
    var px = Math.random();
    var _uid = function (key) {
        return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
    };

    var _redefine = createCommonjsModule(function (module) {
        var SRC = _uid('src');
        var TO_STRING = 'toString';
        var $toString = Function[TO_STRING];
        var TPL = ('' + $toString).split(TO_STRING);

        _core.inspectSource = function (it) {
            return $toString.call(it);
        };

        (module.exports = function (O, key, val, safe) {
            var isFunction = typeof val == 'function';
            if (isFunction) {
                _has(val, 'name') || _hide(val, 'name', key);
            }
            if (O[key] === val) {
                return;
            }
            if (isFunction) {
                _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
            }
            if (O === _global) {
                O[key] = val;
            } else if (!safe) {
                delete O[key];
                _hide(O, key, val);
            } else if (O[key]) {
                O[key] = val;
            } else {
                _hide(O, key, val);
            }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
        })(Function.prototype, TO_STRING, function toString() {
            return typeof this == 'function' && this[SRC] || $toString.call(this);
        });
    });

    var _aFunction = function (it) {
        if (typeof it != 'function') {
            throw TypeError(it + ' is not a function!');
        }
        return it;
    };

// optional / simple context binding

    var _ctx = function (fn, that, length) {
        _aFunction(fn);
        if (that === undefined) {
            return fn;
        }
        switch (length) {
            case 1:
                return function (a) {
                    return fn.call(that, a);
                };
            case 2:
                return function (a, b) {
                    return fn.call(that, a, b);
                };
            case 3:
                return function (a, b, c) {
                    return fn.call(that, a, b, c);
                };
        }
        return function (/* ...args */) {
            return fn.apply(that, arguments);
        };
    };

    var PROTOTYPE = 'prototype';

    var $export = function (type, name, source) {
        var IS_FORCED = type & $export.F;
        var IS_GLOBAL = type & $export.G;
        var IS_STATIC = type & $export.S;
        var IS_PROTO = type & $export.P;
        var IS_BIND = type & $export.B;
        var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
        var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
        var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
        var key, own, out, exp;
        if (IS_GLOBAL) {
            source = name;
        }
        for (key in source) {
            // contains in native
            own = !IS_FORCED && target && target[key] !== undefined;
            // export native or passed
            out = (own ? target : source)[key];
            // bind timers to global for call from export context
            exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
            // extend global
            if (target) {
                _redefine(target, key, out, type & $export.U);
            }
            // export
            if (exports[key] != out) {
                _hide(exports, key, exp);
            }
            if (IS_PROTO && expProto[key] != out) {
                expProto[key] = out;
            }
        }
    };
    _global.core = _core;
// type bitmap
    $export.F = 1;   // forced
    $export.G = 2;   // global
    $export.S = 4;   // static
    $export.P = 8;   // proto
    $export.B = 16;  // bind
    $export.W = 32;  // wrap
    $export.U = 64;  // safe
    $export.R = 128; // real proto method for `library`
    var _export = $export;

    var _iterators = {};

    var toString = {}.toString;

    var _cof = function (it) {
        return toString.call(it).slice(8, -1);
    };

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
    var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
        return _cof(it) == 'String' ? it.split('') : Object(it);
    };

// to indexed object, toObject with fallback for non-array-like ES3 strings


    var _toIobject = function (it) {
        return _iobject(_defined(it));
    };

// 7.1.15 ToLength

    var min = Math.min;
    var _toLength = function (it) {
        return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    };

    var max = Math.max;
    var min$1 = Math.min;
    var _toAbsoluteIndex = function (index, length) {
        index = _toInteger(index);
        return index < 0 ? max(index + length, 0) : min$1(index, length);
    };

// false -> Array#indexOf
// true  -> Array#includes


    var _arrayIncludes = function (IS_INCLUDES) {
        return function ($this, el, fromIndex) {
            var O = _toIobject($this);
            var length = _toLength(O.length);
            var index = _toAbsoluteIndex(fromIndex, length);
            var value;
            // Array#includes uses SameValueZero equality algorithm
            // eslint-disable-next-line no-self-compare
            if (IS_INCLUDES && el != el) {
                while (length > index) {
                    value = O[index++];
                    // eslint-disable-next-line no-self-compare
                    if (value != value) {
                        return true;
                    }
                    // Array#indexOf ignores holes, Array#includes - not
                }
            } else {
                for (; length > index; index++) {
                    if (IS_INCLUDES || index in O) {
                        if (O[index] === el) {
                            return IS_INCLUDES || index || 0;
                        }
                    }
                }
            }
            return !IS_INCLUDES && -1;
        };
    };

    var _shared = createCommonjsModule(function (module) {
        var SHARED = '__core-js_shared__';
        var store = _global[SHARED] || (_global[SHARED] = {});

        (module.exports = function (key, value) {
            return store[key] || (store[key] = value !== undefined ? value : {});
        })('versions', []).push({
            version: _core.version,
            mode: _library ? 'pure' : 'global',
            copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
        });
    });

    var shared = _shared('keys');

    var _sharedKey = function (key) {
        return shared[key] || (shared[key] = _uid(key));
    };

    var arrayIndexOf = _arrayIncludes(false);
    var IE_PROTO$1 = _sharedKey('IE_PROTO');

    var _objectKeysInternal = function (object, names) {
        var O = _toIobject(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O) {
            if (key != IE_PROTO$1) {
                _has(O, key) && result.push(key);
            }
        }
        // Don't enum bug & hidden keys
        while (names.length > i) {
            if (_has(O, key = names[i++])) {
                ~arrayIndexOf(result, key) || result.push(key);
            }
        }
        return result;
    };

// IE 8- don't enum bug keys
    var _enumBugKeys = (
        'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
    ).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


    var _objectKeys = Object.keys || function keys(O) {
        return _objectKeysInternal(O, _enumBugKeys);
    };

    var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
        _anObject(O);
        var keys = _objectKeys(Properties);
        var length = keys.length;
        var i = 0;
        var P;
        while (length > i) {
            _objectDp.f(O, P = keys[i++], Properties[P]);
        }
        return O;
    };

    var document$2 = _global.document;
    var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


    var IE_PROTO = _sharedKey('IE_PROTO');
    var Empty = function () { /* empty */
    };
    var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
    var createDict = function () {
        // Thrash, waste and sodomy: IE GC bug
        var iframe = _domCreate('iframe');
        var i = _enumBugKeys.length;
        var lt = '<';
        var gt = '>';
        var iframeDocument;
        iframe.style.display = 'none';
        _html.appendChild(iframe);
        iframe.src = 'javascript:'; // eslint-disable-line no-script-url
        // createDict = iframe.contentWindow.Object;
        // html.removeChild(iframe);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
        iframeDocument.close();
        createDict = iframeDocument.F;
        while (i--) {
            delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
        }
        return createDict();
    };

    var _objectCreate = Object.create || function create(O, Properties) {
        var result;
        if (O !== null) {
            Empty[PROTOTYPE$1] = _anObject(O);
            result = new Empty();
            Empty[PROTOTYPE$1] = null;
            // add "__proto__" for Object.getPrototypeOf polyfill
            result[IE_PROTO] = O;
        } else {
            result = createDict();
        }
        return Properties === undefined ? result : _objectDps(result, Properties);
    };

    var _wks = createCommonjsModule(function (module) {
        var store = _shared('wks');

        var Symbol = _global.Symbol;
        var USE_SYMBOL = typeof Symbol == 'function';

        var $exports = module.exports = function (name) {
            return store[name] || (store[name] =
                USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
        };

        $exports.store = store;
    });

    var def = _objectDp.f;

    var TAG = _wks('toStringTag');

    var _setToStringTag = function (it, tag, stat) {
        if (it && !_has(it = stat ? it : it.prototype, TAG)) {
            def(it, TAG, {configurable: true, value: tag});
        }
    };

    var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
    _hide(IteratorPrototype, _wks('iterator'), function () {
        return this;
    });

    var _iterCreate = function (Constructor, NAME, next) {
        Constructor.prototype = _objectCreate(IteratorPrototype, {next: _propertyDesc(1, next)});
        _setToStringTag(Constructor, NAME + ' Iterator');
    };

// 7.1.13 ToObject(argument)

    var _toObject = function (it) {
        return Object(_defined(it));
    };

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


    var IE_PROTO$2 = _sharedKey('IE_PROTO');
    var ObjectProto = Object.prototype;

    var _objectGpo = Object.getPrototypeOf || function (O) {
        O = _toObject(O);
        if (_has(O, IE_PROTO$2)) {
            return O[IE_PROTO$2];
        }
        if (typeof O.constructor == 'function' && O instanceof O.constructor) {
            return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectProto : null;
    };

    var ITERATOR = _wks('iterator');
    var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
    var FF_ITERATOR = '@@iterator';
    var KEYS = 'keys';
    var VALUES = 'values';

    var returnThis = function () {
        return this;
    };

    var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
        _iterCreate(Constructor, NAME, next);
        var getMethod = function (kind) {
            if (!BUGGY && kind in proto) {
                return proto[kind];
            }
            switch (kind) {
                case KEYS:
                    return function keys() {
                        return new Constructor(this, kind);
                    };
                case VALUES:
                    return function values() {
                        return new Constructor(this, kind);
                    };
            }
            return function entries() {
                return new Constructor(this, kind);
            };
        };
        var TAG = NAME + ' Iterator';
        var DEF_VALUES = DEFAULT == VALUES;
        var VALUES_BUG = false;
        var proto = Base.prototype;
        var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
        var $default = $native || getMethod(DEFAULT);
        var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
        var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
        var methods, key, IteratorPrototype;
        // Fix native
        if ($anyNative) {
            IteratorPrototype = _objectGpo($anyNative.call(new Base()));
            if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
                // Set @@toStringTag to native iterators
                _setToStringTag(IteratorPrototype, TAG, true);
                // fix for some old engines
                if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') {
                    _hide(IteratorPrototype, ITERATOR, returnThis);
                }
            }
        }
        // fix Array#{values, @@iterator}.name in V8 / FF
        if (DEF_VALUES && $native && $native.name !== VALUES) {
            VALUES_BUG = true;
            $default = function values() {
                return $native.call(this);
            };
        }
        // Define iterator
        if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
            _hide(proto, ITERATOR, $default);
        }
        // Plug for library
        _iterators[NAME] = $default;
        _iterators[TAG] = returnThis;
        if (DEFAULT) {
            methods = {
                values: DEF_VALUES ? $default : getMethod(VALUES),
                keys: IS_SET ? $default : getMethod(KEYS),
                entries: $entries
            };
            if (FORCED) {
                for (key in methods) {
                    if (!(key in proto)) {
                        _redefine(proto, key, methods[key]);
                    }
                }
            } else {
                _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
            }
        }
        return methods;
    };

    var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
    _iterDefine(String, 'String', function (iterated) {
        this._t = String(iterated); // target
        this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
    }, function () {
        var O = this._t;
        var index = this._i;
        var point;
        if (index >= O.length) {
            return {value: undefined, done: true};
        }
        point = $at(O, index);
        this._i += point.length;
        return {value: point, done: false};
    });

// call something on iterator step with safe closing on error

    var _iterCall = function (iterator, fn, value, entries) {
        try {
            return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
            // 7.4.6 IteratorClose(iterator, completion)
        } catch (e) {
            var ret = iterator['return'];
            if (ret !== undefined) {
                _anObject(ret.call(iterator));
            }
            throw e;
        }
    };

// check on default Array iterator

    var ITERATOR$1 = _wks('iterator');
    var ArrayProto = Array.prototype;

    var _isArrayIter = function (it) {
        return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
    };

    var _createProperty = function (object, index, value) {
        if (index in object) {
            _objectDp.f(object, index, _propertyDesc(0, value));
        } else {
            object[index] = value;
        }
    };

// getting tag from 19.1.3.6 Object.prototype.toString()

    var TAG$1 = _wks('toStringTag');
// ES3 wrong here
    var ARG = _cof(function () {
        return arguments;
    }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
    var tryGet = function (it, key) {
        try {
            return it[key];
        } catch (e) { /* empty */
        }
    };

    var _classof = function (it) {
        var O, T, B;
        return it === undefined ? 'Undefined' : it === null ? 'Null'
            // @@toStringTag case
            : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
                // builtinTag case
                : ARG ? _cof(O)
                    // ES3 arguments fallback
                    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };

    var ITERATOR$2 = _wks('iterator');

    var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
        if (it != undefined) {
            return it[ITERATOR$2]
                || it['@@iterator']
                || _iterators[_classof(it)];
        }
    };

    var ITERATOR$3 = _wks('iterator');
    var SAFE_CLOSING = false;

    try {
        var riter = [7][ITERATOR$3]();
        riter['return'] = function () {
            SAFE_CLOSING = true;
        };
        // eslint-disable-next-line no-throw-literal

    } catch (e) { /* empty */
    }

    var _iterDetect = function (exec, skipClosing) {
        if (!skipClosing && !SAFE_CLOSING) {
            return false;
        }
        var safe = false;
        try {
            var arr = [7];
            var iter = arr[ITERATOR$3]();
            iter.next = function () {
                return {done: safe = true};
            };
            arr[ITERATOR$3] = function () {
                return iter;
            };
            exec(arr);
        } catch (e) { /* empty */
        }
        return safe;
    };

    _export(_export.S + _export.F * !_iterDetect(function (iter) {
    }), 'Array', {
        // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
        from: function from(arrayLike /*  mapfn = undefined, thisArg = undefined */) {
            var O = _toObject(arrayLike);
            var C = typeof this == 'function' ? this : Array;
            var aLen = arguments.length;
            var mapfn = aLen > 1 ? arguments[1] : undefined;
            var mapping = mapfn !== undefined;
            var index = 0;
            var iterFn = core_getIteratorMethod(O);
            var length, result, step, iterator;
            if (mapping) {
                mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
            }
            // if object isn't iterable or it's array with default iterator - use simple case
            if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
                for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
                    _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
                }
            } else {
                length = _toLength(O.length);
                for (result = new C(length); length > index; index++) {
                    _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
                }
            }
            result.length = index;
            return result;
        }
    });

    var from = _core.Array.from;

    var f$1 = Object.getOwnPropertySymbols;

    var _objectGops = {
        f: f$1
    };

    var f$2 = {}.propertyIsEnumerable;

    var _objectPie = {
        f: f$2
    };

// 19.1.2.1 Object.assign(target, source, ...)


    var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
    var _objectAssign = !$assign || _fails(function () {
        var A = {};
        var B = {};
        // eslint-disable-next-line no-undef
        var S = Symbol();
        var K = 'abcdefghijklmnopqrst';
        A[S] = 7;
        K.split('').forEach(function (k) {
            B[k] = k;
        });
        return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
    }) ? function assign(target, source) {
        var arguments$1 = arguments;
        // eslint-disable-line no-unused-vars
        var T = _toObject(target);
        var aLen = arguments.length;
        var index = 1;
        var getSymbols = _objectGops.f;
        var isEnum = _objectPie.f;
        while (aLen > index) {
            var S = _iobject(arguments$1[index++]);
            var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
            var length = keys.length;
            var j = 0;
            var key;
            while (length > j) {
                if (isEnum.call(S, key = keys[j++])) {
                    T[key] = S[key];
                }
            }
        }
        return T;
    } : $assign;

// 19.1.3.1 Object.assign(target, source)


    _export(_export.S + _export.F, 'Object', {assign: _objectAssign});

    var assign = _core.Object.assign;

    var gOPD = Object.getOwnPropertyDescriptor;

    var f$3 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
        O = _toIobject(O);
        P = _toPrimitive(P, true);
        if (_ie8DomDefine) {
            try {
                return gOPD(O, P);
            } catch (e) { /* empty */
            }
        }
        if (_has(O, P)) {
            return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
        }
    };

    var _objectGopd = {
        f: f$3
    };

// Works with __proto__ only. Old v8 can't work with null proto objects.
    /* eslint-disable no-proto */


    var check = function (O, proto) {
        _anObject(O);
        if (!_isObject(proto) && proto !== null) {
            throw TypeError(proto + ": can't set as prototype!");
        }
    };
    var _setProto = {
        set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
            function (test, buggy, set) {
                try {
                    set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
                    set(test, []);
                    buggy = !(test instanceof Array);
                } catch (e) {
                    buggy = true;
                }
                return function setPrototypeOf(O, proto) {
                    check(O, proto);
                    if (buggy) {
                        O.__proto__ = proto;
                    } else {
                        set(O, proto);
                    }
                    return O;
                };
            }({}, false) : undefined),
        check: check
    };

// 19.1.3.19 Object.setPrototypeOf(O, proto)

    _export(_export.S, 'Object', {setPrototypeOf: _setProto.set});

    var setPrototypeOf = _core.Object.setPrototypeOf;

// 19.1.3.6 Object.prototype.toString()

    var test = {};
    test[_wks('toStringTag')] = 'z';
    if (test + '' != '[object z]') {
        _redefine(Object.prototype, 'toString', function toString() {
            return '[object ' + _classof(this) + ']';
        }, true);
    }

// 22.1.3.31 Array.prototype[@@unscopables]
    var UNSCOPABLES = _wks('unscopables');
    var ArrayProto$1 = Array.prototype;
    if (ArrayProto$1[UNSCOPABLES] == undefined) {
        _hide(ArrayProto$1, UNSCOPABLES, {});
    }
    var _addToUnscopables = function (key) {
        ArrayProto$1[UNSCOPABLES][key] = true;
    };

    var _iterStep = function (done, value) {
        return {value: value, done: !!done};
    };

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
    var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
        this._t = _toIobject(iterated); // target
        this._i = 0;                   // next index
        this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    }, function () {
        var O = this._t;
        var kind = this._k;
        var index = this._i++;
        if (!O || index >= O.length) {
            this._t = undefined;
            return _iterStep(1);
        }
        if (kind == 'keys') {
            return _iterStep(0, index);
        }
        if (kind == 'values') {
            return _iterStep(0, O[index]);
        }
        return _iterStep(0, [index, O[index]]);
    }, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
    _iterators.Arguments = _iterators.Array;

    _addToUnscopables('keys');
    _addToUnscopables('values');
    _addToUnscopables('entries');

    var ITERATOR$4 = _wks('iterator');
    var TO_STRING_TAG = _wks('toStringTag');
    var ArrayValues = _iterators.Array;

    var DOMIterables = {
        CSSRuleList: true, // TODO: Not spec compliant, should be false.
        CSSStyleDeclaration: false,
        CSSValueList: false,
        ClientRectList: false,
        DOMRectList: false,
        DOMStringList: false,
        DOMTokenList: true,
        DataTransferItemList: false,
        FileList: false,
        HTMLAllCollection: false,
        HTMLCollection: false,
        HTMLFormElement: false,
        HTMLSelectElement: false,
        MediaList: true, // TODO: Not spec compliant, should be false.
        MimeTypeArray: false,
        NamedNodeMap: false,
        NodeList: true,
        PaintRequestList: false,
        Plugin: false,
        PluginArray: false,
        SVGLengthList: false,
        SVGNumberList: false,
        SVGPathSegList: false,
        SVGPointList: false,
        SVGStringList: false,
        SVGTransformList: false,
        SourceBufferList: false,
        StyleSheetList: true, // TODO: Not spec compliant, should be false.
        TextTrackCueList: false,
        TextTrackList: false,
        TouchList: false
    };

    for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
        var NAME = collections[i];
        var explicit = DOMIterables[NAME];
        var Collection = _global[NAME];
        var proto = Collection && Collection.prototype;
        var key;
        if (proto) {
            if (!proto[ITERATOR$4]) {
                _hide(proto, ITERATOR$4, ArrayValues);
            }
            if (!proto[TO_STRING_TAG]) {
                _hide(proto, TO_STRING_TAG, NAME);
            }
            _iterators[NAME] = ArrayValues;
            if (explicit) {
                for (key in es6_array_iterator) {
                    if (!proto[key]) {
                        _redefine(proto, key, es6_array_iterator[key], true);
                    }
                }
            }
        }
    }

    var _anInstance = function (it, Constructor, name, forbiddenField) {
        if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
            throw TypeError(name + ': incorrect invocation!');
        }
        return it;
    };

    var _forOf = createCommonjsModule(function (module) {
        var BREAK = {};
        var RETURN = {};
        var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
            var iterFn = ITERATOR ? function () {
                return iterable;
            } : core_getIteratorMethod(iterable);
            var f = _ctx(fn, that, entries ? 2 : 1);
            var index = 0;
            var length, step, iterator, result;
            if (typeof iterFn != 'function') {
                throw TypeError(iterable + ' is not iterable!');
            }
            // fast case for arrays with default iterator
            if (_isArrayIter(iterFn)) {
                for (length = _toLength(iterable.length); length > index; index++) {
                    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
                    if (result === BREAK || result === RETURN) {
                        return result;
                    }
                }
            } else {
                for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
                    result = _iterCall(iterator, f, step.value, entries);
                    if (result === BREAK || result === RETURN) {
                        return result;
                    }
                }
            }
        };
        exports.BREAK = BREAK;
        exports.RETURN = RETURN;
    });

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


    var SPECIES = _wks('species');
    var _speciesConstructor = function (O, D) {
        var C = _anObject(O).constructor;
        var S;
        return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
    };

// fast apply, http://jsperf.lnkit.com/fast-apply/5
    var _invoke = function (fn, args, that) {
        var un = that === undefined;
        switch (args.length) {
            case 0:
                return un ? fn()
                    : fn.call(that);
            case 1:
                return un ? fn(args[0])
                    : fn.call(that, args[0]);
            case 2:
                return un ? fn(args[0], args[1])
                    : fn.call(that, args[0], args[1]);
            case 3:
                return un ? fn(args[0], args[1], args[2])
                    : fn.call(that, args[0], args[1], args[2]);
            case 4:
                return un ? fn(args[0], args[1], args[2], args[3])
                    : fn.call(that, args[0], args[1], args[2], args[3]);
        }
        return fn.apply(that, args);
    };

    var process$1 = _global.process;
    var setTask = _global.setImmediate;
    var clearTask = _global.clearImmediate;
    var MessageChannel = _global.MessageChannel;
    var Dispatch = _global.Dispatch;
    var counter = 0;
    var queue = {};
    var ONREADYSTATECHANGE = 'onreadystatechange';
    var defer;
    var channel;
    var port;
    var run = function () {
        var id = +this;
        // eslint-disable-next-line no-prototype-builtins
        if (queue.hasOwnProperty(id)) {
            var fn = queue[id];
            delete queue[id];
            fn();
        }
    };
    var listener = function (event) {
        run.call(event.data);
    };
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!setTask || !clearTask) {
        setTask = function setImmediate(fn) {
            var arguments$1 = arguments;

            var args = [];
            var i = 1;
            while (arguments.length > i) {
                args.push(arguments$1[i++]);
            }
            queue[++counter] = function () {
                // eslint-disable-next-line no-new-func
                _invoke(typeof fn == 'function' ? fn : Function(fn), args);
            };
            defer(counter);
            return counter;
        };
        clearTask = function clearImmediate(id) {
            delete queue[id];
        };
        // Node.js 0.8-
        if (_cof(process$1) == 'process') {
            defer = function (id) {
                process$1.nextTick(_ctx(run, id, 1));
            };
            // Sphere (JS game engine) Dispatch API
        } else if (Dispatch && Dispatch.now) {
            defer = function (id) {
                Dispatch.now(_ctx(run, id, 1));
            };
            // Browsers with MessageChannel, includes WebWorkers
        } else if (MessageChannel) {
            channel = new MessageChannel();
            port = channel.port2;
            channel.port1.onmessage = listener;
            defer = _ctx(port.postMessage, port, 1);
            // Browsers with postMessage, skip WebWorkers
            // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
        } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
            defer = function (id) {
                _global.postMessage(id + '', '*');
            };
            _global.addEventListener('message', listener, false);
            // IE8-
        } else if (ONREADYSTATECHANGE in _domCreate('script')) {
            defer = function (id) {
                _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
                    _html.removeChild(this);
                    run.call(id);
                };
            };
            // Rest old browsers
        } else {
            defer = function (id) {
                setTimeout(_ctx(run, id, 1), 0);
            };
        }
    }
    var _task = {
        set: setTask,
        clear: clearTask
    };

    var macrotask = _task.set;
    var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
    var process$2 = _global.process;
    var Promise = _global.Promise;
    var isNode$1 = _cof(process$2) == 'process';

    var _microtask = function () {
        var head, last, notify;

        var flush = function () {
            var parent, fn;
            if (isNode$1 && (parent = process$2.domain)) {
                parent.exit();
            }
            while (head) {
                fn = head.fn;
                head = head.next;
                try {
                    fn();
                } catch (e) {
                    if (head) {
                        notify();
                    } else {
                        last = undefined;
                    }
                    throw e;
                }
            }
            last = undefined;
            if (parent) {
                parent.enter();
            }
        };

        // Node.js
        if (isNode$1) {
            notify = function () {
                process$2.nextTick(flush);
            };
            // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
        } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
            var toggle = true;
            var node = document.createTextNode('');
            new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
            notify = function () {
                node.data = toggle = !toggle;
            };
            // environments with maybe non-completely correct, but existent Promise
        } else if (Promise && Promise.resolve) {
            // Promise.resolve without an argument throws an error in LG WebOS 2
            var promise = Promise.resolve(undefined);
            notify = function () {
                promise.then(flush);
            };
            // for other environments - macrotask based on:
            // - setImmediate
            // - MessageChannel
            // - window.postMessag
            // - onreadystatechange
            // - setTimeout
        } else {
            notify = function () {
                // strange IE + webpack dev server bug - use .call(global)
                macrotask.call(_global, flush);
            };
        }

        return function (fn) {
            var task = {fn: fn, next: undefined};
            if (last) {
                last.next = task;
            }
            if (!head) {
                head = task;
                notify();
            }
            last = task;
        };
    };

// 25.4.1.5 NewPromiseCapability(C)


    function PromiseCapability(C) {
        var resolve, reject;
        this.promise = new C(function ($$resolve, $$reject) {
            if (resolve !== undefined || reject !== undefined) {
                throw TypeError('Bad Promise constructor');
            }
            resolve = $$resolve;
            reject = $$reject;
        });
        this.resolve = _aFunction(resolve);
        this.reject = _aFunction(reject);
    }

    var f$4 = function (C) {
        return new PromiseCapability(C);
    };

    var _newPromiseCapability = {
        f: f$4
    };

    var _perform = function (exec) {
        try {
            return {e: false, v: exec()};
        } catch (e) {
            return {e: true, v: e};
        }
    };

    var navigator$1 = _global.navigator;

    var _userAgent = navigator$1 && navigator$1.userAgent || '';

    var _promiseResolve = function (C, x) {
        _anObject(C);
        if (_isObject(x) && x.constructor === C) {
            return x;
        }
        var promiseCapability = _newPromiseCapability.f(C);
        var resolve = promiseCapability.resolve;
        resolve(x);
        return promiseCapability.promise;
    };

    var _redefineAll = function (target, src, safe) {
        for (var key in src) {
            _redefine(target, key, src[key], safe);
        }
        return target;
    };

    var SPECIES$1 = _wks('species');

    var _setSpecies = function (KEY) {
        var C = _global[KEY];
        if (_descriptors && C && !C[SPECIES$1]) {
            _objectDp.f(C, SPECIES$1, {
                configurable: true,
                get: function () {
                    return this;
                }
            });
        }
    };

    var task = _task.set;
    var microtask = _microtask();


    var PROMISE = 'Promise';
    var TypeError$1 = _global.TypeError;
    var process = _global.process;
    var versions = process && process.versions;
    var v8 = versions && versions.v8 || '';
    var $Promise = _global[PROMISE];
    var isNode = _classof(process) == 'process';
    var empty = function () { /* empty */
    };
    var Internal;
    var newGenericPromiseCapability;
    var OwnPromiseCapability;
    var Wrapper;
    var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

    var USE_NATIVE = !!function () {
        try {
            // correct subclassing with @@species support
            var promise = $Promise.resolve(1);
            var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
                exec(empty, empty);
            };
            // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
            return (isNode || typeof PromiseRejectionEvent == 'function')
                && promise.then(empty) instanceof FakePromise
                // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
                // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
                // we can't detect it synchronously, so just check versions
                && v8.indexOf('6.6') !== 0
                && _userAgent.indexOf('Chrome/66') === -1;
        } catch (e) { /* empty */
        }
    }();

// helpers
    var isThenable = function (it) {
        var then;
        return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };
    var notify = function (promise, isReject) {
        if (promise._n) {
            return;
        }
        promise._n = true;
        var chain = promise._c;
        microtask(function () {
            var value = promise._v;
            var ok = promise._s == 1;
            var i = 0;
            var run = function (reaction) {
                var handler = ok ? reaction.ok : reaction.fail;
                var resolve = reaction.resolve;
                var reject = reaction.reject;
                var domain = reaction.domain;
                var result, then, exited;
                try {
                    if (handler) {
                        if (!ok) {
                            if (promise._h == 2) {
                                onHandleUnhandled(promise);
                            }
                            promise._h = 1;
                        }
                        if (handler === true) {
                            result = value;
                        } else {
                            if (domain) {
                                domain.enter();
                            }
                            result = handler(value); // may throw
                            if (domain) {
                                domain.exit();
                                exited = true;
                            }
                        }
                        if (result === reaction.promise) {
                            reject(TypeError$1('Promise-chain cycle'));
                        } else if (then = isThenable(result)) {
                            then.call(result, resolve, reject);
                        } else {
                            resolve(result);
                        }
                    } else {
                        reject(value);
                    }
                } catch (e) {
                    if (domain && !exited) {
                        domain.exit();
                    }
                    reject(e);
                }
            };
            while (chain.length > i) {
                run(chain[i++]);
            } // variable length - can't use forEach
            promise._c = [];
            promise._n = false;
            if (isReject && !promise._h) {
                onUnhandled(promise);
            }
        });
    };
    var onUnhandled = function (promise) {
        task.call(_global, function () {
            var value = promise._v;
            var unhandled = isUnhandled(promise);
            var result, handler, console;
            if (unhandled) {
                result = _perform(function () {
                    if (isNode) {
                        process.emit('unhandledRejection', value, promise);
                    } else if (handler = _global.onunhandledrejection) {
                        handler({promise: promise, reason: value});
                    } else if ((console = _global.console) && console.error) {
                        console.error('Unhandled promise rejection', value);
                    }
                });
                // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
                promise._h = isNode || isUnhandled(promise) ? 2 : 1;
            }
            promise._a = undefined;
            if (unhandled && result.e) {
                throw result.v;
            }
        });
    };
    var isUnhandled = function (promise) {
        return promise._h !== 1 && (promise._a || promise._c).length === 0;
    };
    var onHandleUnhandled = function (promise) {
        task.call(_global, function () {
            var handler;
            if (isNode) {
                process.emit('rejectionHandled', promise);
            } else if (handler = _global.onrejectionhandled) {
                handler({promise: promise, reason: promise._v});
            }
        });
    };
    var $reject = function (value) {
        var promise = this;
        if (promise._d) {
            return;
        }
        promise._d = true;
        promise = promise._w || promise; // unwrap
        promise._v = value;
        promise._s = 2;
        if (!promise._a) {
            promise._a = promise._c.slice();
        }
        notify(promise, true);
    };
    var $resolve = function (value) {
        var promise = this;
        var then;
        if (promise._d) {
            return;
        }
        promise._d = true;
        promise = promise._w || promise; // unwrap
        try {
            if (promise === value) {
                throw TypeError$1("Promise can't be resolved itself");
            }
            if (then = isThenable(value)) {
                microtask(function () {
                    var wrapper = {_w: promise, _d: false}; // wrap
                    try {
                        then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
                    } catch (e) {
                        $reject.call(wrapper, e);
                    }
                });
            } else {
                promise._v = value;
                promise._s = 1;
                notify(promise, false);
            }
        } catch (e) {
            $reject.call({_w: promise, _d: false}, e); // wrap
        }
    };

// constructor polyfill
    if (!USE_NATIVE) {
        // 25.4.3.1 Promise(executor)
        $Promise = function Promise(executor) {
            _anInstance(this, $Promise, PROMISE, '_h');
            _aFunction(executor);
            Internal.call(this);
            try {
                executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
            } catch (err) {
                $reject.call(this, err);
            }
        };
        // eslint-disable-next-line no-unused-vars
        Internal = function Promise(executor) {
            this._c = [];             // <- awaiting reactions
            this._a = undefined;      // <- checked in isUnhandled reactions
            this._s = 0;              // <- state
            this._d = false;          // <- done
            this._v = undefined;      // <- value
            this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
            this._n = false;          // <- notify
        };
        Internal.prototype = _redefineAll($Promise.prototype, {
            // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
            then: function then(onFulfilled, onRejected) {
                var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
                reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
                reaction.fail = typeof onRejected == 'function' && onRejected;
                reaction.domain = isNode ? process.domain : undefined;
                this._c.push(reaction);
                if (this._a) {
                    this._a.push(reaction);
                }
                if (this._s) {
                    notify(this, false);
                }
                return reaction.promise;
            },
            // 25.4.5.1 Promise.prototype.catch(onRejected)
            'catch': function (onRejected) {
                return this.then(undefined, onRejected);
            }
        });
        OwnPromiseCapability = function () {
            var promise = new Internal();
            this.promise = promise;
            this.resolve = _ctx($resolve, promise, 1);
            this.reject = _ctx($reject, promise, 1);
        };
        _newPromiseCapability.f = newPromiseCapability = function (C) {
            return C === $Promise || C === Wrapper
                ? new OwnPromiseCapability(C)
                : newGenericPromiseCapability(C);
        };
    }

    _export(_export.G + _export.W + _export.F * !USE_NATIVE, {Promise: $Promise});
    _setToStringTag($Promise, PROMISE);
    _setSpecies(PROMISE);
    Wrapper = _core[PROMISE];

// statics
    _export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
        // 25.4.4.5 Promise.reject(r)
        reject: function reject(r) {
            var capability = newPromiseCapability(this);
            var $$reject = capability.reject;
            $$reject(r);
            return capability.promise;
        }
    });
    _export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
        // 25.4.4.6 Promise.resolve(x)
        resolve: function resolve(x) {
            return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
        }
    });
    _export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
        $Promise.all(iter)['catch'](empty);
    })), PROMISE, {
        // 25.4.4.1 Promise.all(iterable)
        all: function all(iterable) {
            var C = this;
            var capability = newPromiseCapability(C);
            var resolve = capability.resolve;
            var reject = capability.reject;
            var result = _perform(function () {
                var values = [];
                var index = 0;
                var remaining = 1;
                _forOf(iterable, false, function (promise) {
                    var $index = index++;
                    var alreadyCalled = false;
                    values.push(undefined);
                    remaining++;
                    C.resolve(promise).then(function (value) {
                        if (alreadyCalled) {
                            return;
                        }
                        alreadyCalled = true;
                        values[$index] = value;
                        --remaining || resolve(values);
                    }, reject);
                });
                --remaining || resolve(values);
            });
            if (result.e) {
                reject(result.v);
            }
            return capability.promise;
        },
        // 25.4.4.4 Promise.race(iterable)
        race: function race(iterable) {
            var C = this;
            var capability = newPromiseCapability(C);
            var reject = capability.reject;
            var result = _perform(function () {
                _forOf(iterable, false, function (promise) {
                    C.resolve(promise).then(capability.resolve, reject);
                });
            });
            if (result.e) {
                reject(result.v);
            }
            return capability.promise;
        }
    });

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    /* eslint-disable */

    var isInitialized = false;

// major events supported:
//   panstart
//   panmove
//   panend
//   swipe
//   longpress
// extra events supported:
//   dualtouchstart
//   dualtouch
//   dualtouchend
//   tap
//   doubletap
//   pressend

    var doc = window.document;
    var docEl = doc.documentElement;
    var slice = Array.prototype.slice;
    var gestures = {};
    var lastTap = null;

    /**
     * find the closest common ancestor
     * if there's no one, return null
     *
     * @param  {Element} el1 first element
     * @param  {Element} el2 second element
     * @return {Element}     common ancestor
     */
    function getCommonAncestor(el1, el2) {
        var el = el1;
        while (el) {
            if (el.contains(el2) || el == el2) {
                return el
            }
            el = el.parentNode;
        }
        return null
    }

    /**
     * fire a HTMLEvent
     *
     * @param  {Element} element which element to fire a event on
     * @param  {string}  type    type of event
     * @param  {object}  extra   extra data for the event object
     */
    function fireEvent(element, type, extra) {
        var event = doc.createEvent('HTMLEvents');
        event.initEvent(type, true, true);

        if (typeof extra === 'object') {
            for (var p in extra) {
                event[p] = extra[p];
            }
        }

        /**
         * A flag to distinguish with other events with the same name generated
         * by another library in the same page.
         */
        event._for = 'weex';

        element.dispatchEvent(event);
    }

    /**
     * calc the transform
     * assume 4 points ABCD on the coordinate system
     * > rotate：angle rotating from AB to CD
     * > scale：scale ratio from AB to CD
     * > translate：translate shift from A to C
     *
     * @param  {number} x1 abscissa of A
     * @param  {number} y1 ordinate of A
     * @param  {number} x2 abscissa of B
     * @param  {number} y2 ordinate of B
     * @param  {number} x3 abscissa of C
     * @param  {number} y3 ordinate of C
     * @param  {number} x4 abscissa of D
     * @param  {number} y4 ordinate of D
     * @return {object}    transform object like
     *   {rotate, scale, translate[2], matrix[3][3]}
     */
    function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
        var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1);
        var scale = Math.sqrt((Math.pow(y4 - y3, 2)
            + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2)
            + Math.pow(x2 - x1, 2)));
        var translate = [
            x3
            - scale * x1 * Math.cos(rotate)
            + scale * y1 * Math.sin(rotate),
            y3
            - scale * y1 * Math.cos(rotate)
            - scale * x1 * Math.sin(rotate)];

        return {
            rotate: rotate,
            scale: scale,
            translate: translate,
            matrix: [
                [scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]],
                [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]],
                [0, 0, 1]
            ]
        }
    }

    /**
     * take over the touchstart events. Add new touches to the gestures.
     * If there is no previous records, then bind touchmove, tochend
     * and touchcancel events.
     * new touches initialized with state 'tapping', and within 500 milliseconds
     * if the state is still tapping, then trigger gesture 'press'.
     * If there are two touche points, then the 'dualtouchstart' is triggerd. The
     * node of the touch gesture is their cloest common ancestor.
     *
     * @event
     * @param  {event} event
     */
    function touchstartHandler(event) {

        if (Object.keys(gestures).length === 0) {
            docEl.addEventListener('touchmove', touchmoveHandler, true);
            docEl.addEventListener('touchend', touchendHandler, true);
            docEl.addEventListener('touchcancel', touchcancelHandler, true);
        }

        // record every touch
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var touchRecord = {};

            for (var p in touch) {
                touchRecord[p] = touch[p];
            }

            var gesture = {
                startTouch: touchRecord,
                startTime: Date.now(),
                status: 'tapping',
                element: event.srcElement || event.target,
                pressingHandler: setTimeout(function (element, touch) {
                    return function () {
                        if (gesture.status === 'tapping') {
                            gesture.status = 'pressing';

                            fireEvent(element, 'longpress', {
                                // add touch data for weex
                                touch: touch,
                                touches: event.touches,
                                changedTouches: event.changedTouches,
                                touchEvent: event
                            });
                        }

                        clearTimeout(gesture.pressingHandler);
                        gesture.pressingHandler = null;
                    }
                }(event.srcElement || event.target, event.changedTouches[i]), 500)
            };
            gestures[touch.identifier] = gesture;
        }

        if (Object.keys(gestures).length == 2) {
            var elements = [];

            for (var p in gestures) {
                elements.push(gestures[p].element);
            }

            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchstart', {
                touches: slice.call(event.touches),
                touchEvent: event
            });
        }
    }

    /**
     * take over touchmove events, and handle pan and dual related gestures.
     *
     * 1. traverse every touch point：
     * > if 'tapping' and the shift is over 10 pixles, then it's a 'panning'.
     * 2. if there are two touch points, then calc the tranform and trigger
     *   'dualtouch'.
     *
     * @event
     * @param  {event} event
     */
    function touchmoveHandler(event) {
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var gesture = gestures[touch.identifier];

            if (!gesture) {
                return
            }

            if (!gesture.lastTouch) {
                gesture.lastTouch = gesture.startTouch;
            }
            if (!gesture.lastTime) {
                gesture.lastTime = gesture.startTime;
            }
            if (!gesture.velocityX) {
                gesture.velocityX = 0;
            }
            if (!gesture.velocityY) {
                gesture.velocityY = 0;
            }
            if (!gesture.duration) {
                gesture.duration = 0;
            }

            var time = Date.now() - gesture.lastTime;
            var vx = (touch.clientX - gesture.lastTouch.clientX) / time;
            var vy = (touch.clientY - gesture.lastTouch.clientY) / time;

            var RECORD_DURATION = 70;
            if (time > RECORD_DURATION) {
                time = RECORD_DURATION;
            }
            if (gesture.duration + time > RECORD_DURATION) {
                gesture.duration = RECORD_DURATION - time;
            }

            gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time)
                / (gesture.duration + time);
            gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time)
                / (gesture.duration + time);
            gesture.duration += time;

            gesture.lastTouch = {};

            for (var p in touch) {
                gesture.lastTouch[p] = touch[p];
            }
            gesture.lastTime = Date.now();

            var displacementX = touch.clientX - gesture.startTouch.clientX;
            var displacementY = touch.clientY - gesture.startTouch.clientY;
            var distance = Math.sqrt(Math.pow(displacementX, 2)
                + Math.pow(displacementY, 2));
            var isVertical = !(Math.abs(displacementX) > Math.abs(displacementY));
            var direction = isVertical
                ? displacementY >= 0 ? 'down' : 'up'
                : displacementX >= 0 ? 'right' : 'left';

            // magic number 10: moving 10px means pan, not tap
            if ((gesture.status === 'tapping' || gesture.status === 'pressing')
                && distance > 10) {
                gesture.status = 'panning';
                gesture.isVertical = isVertical;
                gesture.direction = direction;

                fireEvent(gesture.element, 'panstart', {
                    touch: touch,
                    touches: event.touches,
                    changedTouches: event.changedTouches,
                    touchEvent: event,
                    isVertical: gesture.isVertical,
                    direction: direction
                });
            }

            if (gesture.status === 'panning') {
                gesture.panTime = Date.now();

                fireEvent(gesture.element, 'panmove', {
                    displacementX: displacementX,
                    displacementY: displacementY,
                    touch: touch,
                    touches: event.touches,
                    changedTouches: event.changedTouches,
                    touchEvent: event,
                    isVertical: gesture.isVertical,
                    direction: direction
                });
            }
        }

        if (Object.keys(gestures).length == 2) {
            var position = [];
            var current = [];
            var elements = [];
            var transform;

            for (var i = 0; i < event.touches.length; i++) {
                var touch = event.touches[i];
                var gesture = gestures[touch.identifier];
                position.push([gesture.startTouch.clientX, gesture.startTouch.clientY]);
                current.push([touch.clientX, touch.clientY]);
            }

            for (var p in gestures) {
                elements.push(gestures[p].element);
            }

            transform = calc(
                position[0][0],
                position[0][1],
                position[1][0],
                position[1][1],
                current[0][0],
                current[0][1],
                current[1][0],
                current[1][1]
            );
            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouch', {
                transform: transform,
                touches: event.touches,
                touchEvent: event
            });
        }
    }

    /**
     * handle touchend event
     *
     * 1. if there are tow touch points, then trigger 'dualtouchend'如
     *
     * 2. traverse every touch piont：
     * > if tapping, then trigger 'tap'.
     * If there is a tap 300 milliseconds before, then it's a 'doubletap'.
     * > if padding, then decide to trigger 'panend' or 'swipe'
     * > if pressing, then trigger 'pressend'.
     *
     * 3. remove listeners.
     *
     * @event
     * @param  {event} event
     */
    function touchendHandler(event) {

        if (Object.keys(gestures).length == 2) {
            var elements = [];
            for (var p in gestures) {
                elements.push(gestures[p].element);
            }
            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
                touches: slice.call(event.touches),
                touchEvent: event
            });
        }

        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var id = touch.identifier;
            var gesture = gestures[id];

            if (!gesture) {
                continue
            }

            if (gesture.pressingHandler) {
                clearTimeout(gesture.pressingHandler);
                gesture.pressingHandler = null;
            }

            if (gesture.status === 'tapping') {
                gesture.timestamp = Date.now();
                // fire click, not tap.
                fireEvent(gesture.element, 'weex$tap', {
                    touch: touch,
                    touchEvent: event
                });

                if (lastTap && gesture.timestamp - lastTap.timestamp < 300) {
                    fireEvent(gesture.element, 'doubletap', {
                        touch: touch,
                        touchEvent: event
                    });
                }

                lastTap = gesture;
            }

            if (gesture.status === 'panning') {
                var now = Date.now();
                var duration = now - gesture.startTime;
                var displacementX = touch.clientX - gesture.startTouch.clientX;
                var displacementY = touch.clientY - gesture.startTouch.clientY;

                var velocity = Math.sqrt(gesture.velocityY * gesture.velocityY
                    + gesture.velocityX * gesture.velocityX);
                var isSwipe = velocity > 0.5 && (now - gesture.lastTime) < 100;
                var extra = {
                    duration: duration,
                    isSwipe: isSwipe,
                    velocityX: gesture.velocityX,
                    velocityY: gesture.velocityY,
                    displacementX: displacementX,
                    displacementY: displacementY,
                    touch: touch,
                    touches: event.touches,
                    changedTouches: event.changedTouches,
                    touchEvent: event,
                    isVertical: gesture.isVertical,
                    direction: gesture.direction
                };

                fireEvent(gesture.element, 'panend', extra);
                if (isSwipe) {
                    fireEvent(gesture.element, 'swipe', extra);
                }
            }

            if (gesture.status === 'pressing') {
                fireEvent(gesture.element, 'pressend', {
                    touch: touch,
                    touchEvent: event
                });
            }

            delete gestures[id];
        }

        if (Object.keys(gestures).length === 0) {
            docEl.removeEventListener('touchmove', touchmoveHandler, false);
            docEl.removeEventListener('touchend', touchendHandler, false);
            docEl.removeEventListener('touchcancel', touchcancelHandler, false);
        }
    }

    /**
     * handle touchcancel
     *
     * 1. if there are two touch points, then trigger 'dualtouchend'
     *
     * 2. traverse everty touch point:
     * > if pannnig, then trigger 'panend'
     * > if pressing, then trigger 'pressend'
     *
     * 3. remove listeners
     *
     * @event
     * @param  {event} event
     */
    function touchcancelHandler(event) {

        if (Object.keys(gestures).length == 2) {
            var elements = [];
            for (var p in gestures) {
                elements.push(gestures[p].element);
            }
            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
                touches: slice.call(event.touches),
                touchEvent: event
            });
        }

        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var id = touch.identifier;
            var gesture = gestures[id];

            if (!gesture) {
                continue
            }

            if (gesture.pressingHandler) {
                clearTimeout(gesture.pressingHandler);
                gesture.pressingHandler = null;
            }

            if (gesture.status === 'panning') {
                fireEvent(gesture.element, 'panend', {
                    touch: touch,
                    touches: event.touches,
                    changedTouches: event.changedTouches,
                    touchEvent: event
                });
            }
            if (gesture.status === 'pressing') {
                fireEvent(gesture.element, 'pressend', {
                    touch: touch,
                    touchEvent: event
                });
            }
            delete gestures[id];
        }

        if (Object.keys(gestures).length === 0) {
            docEl.removeEventListener('touchmove', touchmoveHandler, true);
            docEl.removeEventListener('touchend', touchendHandler, true);
            docEl.removeEventListener('touchcancel', touchcancelHandler, true);
        }
    }

    if (!isInitialized) {
        docEl.addEventListener('touchstart', touchstartHandler, true);
        isInitialized = true;
    }

    var lib$1 = window.lib || (window.lib = {});

    /**
     * Version class.
     * @class lib.env~Version
     * @param {String} v - version number.
     */
    function Version(v) {
        Object.defineProperty(this, 'val', {
            value: v.toString(),
            enumerable: true
        });

        /**
         * larger than
         * @method gt
         * @param {String} v - version
         * @return {Boolean} result
         * @instance
         * @memberof Version
         */
        this.gt = function (v) {
            return Version.compare(this, v) > 0
        };

        /**
         * larger than or equal to.
         * @method gte
         * @param {String} v - version
         * @return {Boolean} result
         * @instance
         * @memberof Version
         */
        this.gte = function (v) {
            return Version.compare(this, v) >= 0
        };

        /**
         * less than.
         * @method lt
         * @param {String} v - version
         * @return {Boolean} result
         * @instance
         * @memberof Version
         */
        this.lt = function (v) {
            return Version.compare(this, v) < 0
        };

        /**
         * less than or equal to.
         * @method lte
         * @param {String} v - version
         * @return {Boolean} result
         * @instance
         * @memberof Version
         */
        this.lte = function (v) {
            return Version.compare(this, v) <= 0
        };

        /**
         * equal to.
         * @method eq
         * @param {String} v - version
         * @return {Boolean} equal to
         * @instance
         * @memberof Version
         */
        this.eq = function (v) {
            return Version.compare(this, v) === 0
        };
    }

    /**
     * version number string.
     * @method toString
     * @return {String} current version number string.
     * @instance
     * @memberof Version
     */
    Version.prototype.toString = function () {
        return this.val
    };

    /**
     * return current version number.
     * @method valueOf
     * @return {Boolean} version number
     * @instance
     * @memberof Version
     */
    Version.prototype.valueOf = function () {
        var v = this.val.split('.');
        var r = [];
        for (var i = 0; i < v.length; i++) {
            var n = parseInt(v[i], 10);
            if (isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if (s.length < 5) {
                s = Array(6 - s.length).join('0') + s;
            }
            r.push(s);
            if (r.length === 1) {
                r.push('.');
            }
        }
        return parseFloat(r.join(''))
    };

    /**
     * compare two versions.
     * @method compare
     * @param {String} v1 - version1
     * @param {String} v2 - version2
     * @return {Number} 0 for equality，-1 for less than，1 for larger than.
     * @memberof Version
     */
    Version.compare = function (v1, v2) {
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');
        for (var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i], 10);
            var n2 = parseInt(v2[i], 10);
            if (window.isNaN(n1)) {
                n1 = 0;
            }
            if (window.isNaN(n2)) {
                n2 = 0;
            }
            if (n1 < n2) {
                return -1
            } else if (n1 > n2) {
                return 1
            }
        }
        return 0
    };

    /**
     * 解析和操作版本号
     * @method version
     * @param {string} v - 需要解析的版本号
     * @return {lib.env~Version} Verson实例
     * @memberof lib
     */
    lib$1.version = function (v) {
        return new Version(v)
    };

    var lib$2 = window.lib || (window.lib = {});
    var env$1 = lib$2.env || (lib$2.env = {});

    var search = window.location.search.replace(/^\?/, '');
    env$1.params = {};
    if (search) {
        var params = search.split('&');
        for (var i$1 = 0; i$1 < params.length; i$1++) {
            params[i$1] = params[i$1].split('=');
            try {
                env$1.params[params[i$1][0]] = decodeURIComponent(params[i$1][1]);
            } catch (e) {
                env$1.params[params[i$1][0]] = params[i$1][1];
            }
        }
    }

    var lib = window.lib || (window.lib = {});
    var env = lib.env || (lib.env = {});

    var ua = window.navigator.userAgent;
    var match;

    /**
     * os
     */

    match = ua.match(/Windows\sPhone\s(?:OS\s)?([\d.]+)/);
    if (match) {
        /**
         * @type {Object}
         * @memberof lib.env
         * @property {String} name - os name, e.g. Android/AndroidPad/iPhone/iPod/iPad/Windows Phone/unknown, etc.
         * @property {lib.env~Version} version - os version.
         * @property {Boolean} isWindowsPhone
         * @property {Boolean} isIPhone - is iPhone/iTouch
         * @property {Boolean} isIPad
         * @property {Boolean} isIOS
         * @property {Boolean} isAndroid
         * @property {Boolean} isAndroidPad
         */
        env.os = {
            name: 'Windows Phone',
            isWindowsPhone: true,
            version: match[1]
        };
    } else if (!!ua.match(/Safari/) && (match = ua.match(/Android[\s/]([\d.]+)/))) {
        env.os = {
            version: match[1]
        };

        if ((ua.match(/Mobile\s+Safari/))) {
            env.os.name = 'Android';
            env.os.isAndroid = true;
        } else {
            env.os.name = 'AndroidPad';
            env.os.isAndroidPad = true;
        }
    } else if ((match = ua.match(/(iPhone|iPad|iPod)/))) {
        var name = match[1];

        match = ua.match(/OS ([\d_.]+) like Mac OS X/);

        env.os = {
            name: name,
            isIPhone: (name === 'iPhone' || name === 'iPod'),
            isIPad: name === 'iPad',
            isIOS: true,
            version: match && match[1].split('_').join('.') || ''
        };
    } else {
        env.os = {
            name: 'unknown',
            version: '0.0.0'
        };
    }

    if (lib.version) {
        env.os.version = lib.version(env.os.version);
    }

    /**
     * browser
     */

    match = ua.match(/(?:UCWEB|UCBrowser\/)([\d.]+)/);

    if (match) {
        /**
         * @type {Object}
         * @memberof env
         * @property {String} name - browser name，e.g. UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown, etc.
         * @property {env~Version} version - browser version.
         * @property {Boolean} isUC
         * @property {Boolean} isQQ
         * @property {Boolean} isIE
         * @property {Boolean} isIEMobile
         * @property {Boolean} isIELikeWebkit
         * @property {Boolean} isChrome
         * @property {Boolean} isAndroid
         * @property {Boolean} isSafari
         * @property {Boolean} isWebview
         */
        env.browser = {
            name: 'UC',
            isUC: true,
            version: match[1]
        };
    } else if ((match = ua.match(/MQQBrowser\/([\d.]+)/))) {
        env.browser = {
            name: 'QQ',
            isQQ: true,
            version: match[1]
        };
    } else if ((match = ua.match(/Firefox\/([\d.]+)/))) {
        env.browser = {
            name: 'Firefox',
            isFirefox: true,
            version: match[1]
        };
    } else if ((match = ua.match(/MSIE\s([\d.]+)/))
        || (match = ua.match(/IEMobile\/([\d.]+)/))) {
        env.browser = {
            version: match[1]
        };

        if (ua.match(/IEMobile/)) {
            env.browser.name = 'IEMobile';
            env.browser.isIEMobile = true;
        } else {
            env.browser.name = 'IE';
            env.browser.isIE = true;
        }

        if (ua.match(/Android|iPhone/)) {
            env.browser.isIELikeWebkit = true;
        }
    } else if ((match = ua.match(/(?:Chrome|CriOS)\/([\d.]+)/))) {
        env.browser = {
            name: 'Chrome',
            isChrome: true,
            version: match[1]
        };

        if (ua.match(/Version\/[\d+.]+\s*Chrome/)) {
            env.browser.name = 'Chrome Webview';
            env.browser.isWebview = true;
        }
    } else if (!!ua.match(/Safari/) && (match = ua.match(/Android[\s/]([\d.]+)/))) {
        env.browser = {
            name: 'Android',
            isAndroid: true,
            version: match[1]
        };
    } else if (ua.match(/iPhone|iPad|iPod/)) {
        if (ua.match(/Safari/)) {
            match = ua.match(/Version\/([\d.]+)/);
            env.browser = {
                name: 'Safari',
                isSafari: true,
                version: match && match[1] || ''
            };
        } else {
            match = ua.match(/OS ([\d_.]+) like Mac OS X/);
            env.browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: match && match[1].replace(/_/g, '.') || ''
            };
        }
    } else {
        env.browser = {
            name: 'unknown',
            version: '0.0.0'
        };
    }

    if (lib.version) {
        env.browser.version = lib.version(env.browser.version);
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    var toString$1 = Object.prototype.toString;

    /**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     *
     * @param {*} obj
     * @return {Boolean}
     */
    var OBJECT_STRING = '[object Object]';

    function isPlainObject(obj) {
        return toString$1.call(obj) === OBJECT_STRING
    }

    var ARRAY_STRING = '[object Array]';

    function isArray(arr) {
        return toString$1.call(arr) === ARRAY_STRING
    }

    function isPrimitive(val) {
        return typeof value === 'string'
            || typeof value === 'number'
            || typeof value === 'symbol'
            || typeof value === 'boolean'
    }

    function isDef(val) {
        return val !== undefined && val !== null
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    /**
     * Mix properties into target object.
     * the rightest object's value has the highest priority.
     */
    function extend(to) {
        var args = [], len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];

        if (!args || args.length <= 0) {
            return to
        }
        args.forEach(function (from) {
            if (typeof from !== 'object') {
                return
            }
            for (var key in from) {
                to[key] = from[key];
            }
        });
        return to
    }

    /**
     * Mix truthy or '' property values into target object.
     * mostly for merging styles. (that's why '' is falsy but still should be counted in.)
     * the rightest object's value has the highest priority.
     */
    function extendTruthy(to) {
        var args = [], len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];

        if (!args || args.length <= 0) {
            return to
        }
        args.forEach(function (from) {
            if (typeof from !== 'object') {
                return
            }
            var i;
            for (var key in from) {
                if (((i = from[key]) || i === '' || i === 0) && i !== 'undefined') {
                    to[key] = i;
                }
            }
        });
        return to
    }

    /**
     * Mix specified properties into target object.
     */
    function extendKeys(to, from, keys) {
        if (from === void 0) from = {};

        (keys || []).forEach(function (key) {
            from && (to[key] = from[key]);
        });
        return to
    }

    /**
     * Extract specified properties from src to target object.
     */
    function extractKeys(to, from, keys) {
        if (from === void 0) from = {};

        if (!from) {
            return to
        }
        (keys || []).forEach(function (key) {
            from && (to[key] = from[key]);
            from && (delete from[key]);
        });
        return to
    }

    /**
     * Simple bind, faster than native
     *
     * @param {Function} fn
     * @param {Object} ctx
     * @return {Function}
     */
    function bind(fn, ctx) {
        return function (a) {
            var l = arguments.length;
            return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx)
        }
    }

    /**
     * Only call the func the last time before it's not that frequently called.
     */
    function debounce(func, wait) {
        var timerId;
        return function () {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];

            clearTimeout(timerId);
            timerId = setTimeout(function later() {
                timerId = null;
                func.apply(null, args);
            }, wait);
        }
    }

    /**
     * Only call the func the first time before a series frequently function calls happen.
     */
    function depress(func, wait) {
        var timerId;

        function later() {
            timerId = null;
        }

        return function () {
            if (!timerId) {
                func.apply();
            }
            clearTimeout(timerId);
            timerId = setTimeout(later, wait);
        }
    }

    /**
     * Only call the func every time after a wait milliseconds if it's too frequently called.
     */
    function throttle(func, wait, callLastTime) {
        var last = 0;
        var lastTimer = null;
        var lastTimeDuration = wait + (wait > 25 ? wait : 25); // plus half wait time.
        return function () {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];

            var context = this;
            var time = new Date().getTime();
            if (time - last > wait) {
                if (callLastTime) {
                    lastTimer && clearTimeout(lastTimer);
                    lastTimer = setTimeout(function () {
                        lastTimer = null;
                        func.apply(context, args);
                    }, lastTimeDuration);
                }
                func.apply(context, args);
                last = time;
            }
        }
    }

// direction: 'l' | 'r', default is 'r'
// num: how many times to loop, should be a positive integer
    function loopArray(arr, num, direction) {
        if (!isArray(arr)) {
            return
        }
        var isLeft = (direction + '').toLowerCase() === 'l';
        var len = arr.length;
        num = num % len;
        if (num < 0) {
            num = -num;
            isLeft = !isLeft;
        }
        if (num === 0) {
            return arr
        }
        var lp, rp;
        if (isLeft) {
            lp = arr.slice(0, num);
            rp = arr.slice(num);
        } else {
            lp = arr.slice(0, len - num);
            rp = arr.slice(len - num);
        }
        return rp.concat(lp)
    }

    /**
     * Create a cached version of a pure function.
     */
    function cached(fn) {
        var cache = Object.create(null);
        return function cachedFn(str) {
            var hit = cache[str];
            return hit || (cache[str] = fn(str))
        }
    }

    /**
     * Camelize a hyphen-delmited string.
     */
    var camelizeRE = /-(\w)/g;
    var camelize = cached(function (str) {
        return str.replace(camelizeRE, function (_, c) {
            return c.toUpperCase();
        })
    });

    function camelizeKeys(obj) {
        var res = {};
        for (var key in obj) {
            res[camelize(key)] = obj[key];
        }
        return res
    }

    /**
     * Capitalize a string.
     */
    var capitalize = cached(function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    });
    /**
     * Hyphenate a camelCase string.
     */
    var hyphenateRE = /([^-])([A-Z])/g;
    var hyphenate = cached(function (str) {
        return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase()
    });

    function hyphenateKeys(obj) {
        var res = {};
        for (var key in obj) {
            res[hyphenate(key)] = obj[key];
        }
        return res
    }

    var vendorsReg = /webkit-|moz-|o-|ms-/;

    function hyphenateStyleKeys(obj) {
        var res = {};
        for (var key in obj) {
            var hk = hyphenate(key).replace(vendorsReg, function ($0) {
                return '-' + $0
            });
            res[hk] = obj[key];
        }
        return res
    }

    function camelToKebab(name) {
        if (!name) {
            return ''
        }
        return name.replace(/([A-Z])/g, function (g, g1) {
            return ("-" + (g1.toLowerCase()))
        })
    }

    function appendCss(css, cssId, replace) {
        var style = document.getElementById(cssId);
        if (style && replace) {
            style.parentNode.removeChild(style);
            style = null;
        }
        if (!style) {
            style = document.createElement('style');
            style.type = 'text/css';
            cssId && (style.id = cssId);
            document.getElementsByTagName('head')[0].appendChild(style);
        }
        style.appendChild(document.createTextNode(css));
    }

    function nextFrame(callback) {
        var runner = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || (function (cb) {
                return setTimeout(cb, 16);
            });
        runner(callback);
    }

    function toCSSText(object) {
        if (!object) {
            return
        }
        var obj = hyphenateStyleKeys(object);
        var cssText = '';
        for (var key in obj) {
            cssText += key + ":" + (obj[key]) + ";";
        }
        return cssText
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    /**
     * viewport priority:
     *
     * 1. meta weex-viewport (developer custom)
     * 2. setViewport(config) := config.width (private code) @deprecated
     * 3. 750 (buid time)
     *
     */
    var isInited = false;
    var DEFAULT_VIEWPORT_WIDTH = 750;

    /**
     * get viewport width from weex-viewport meta.
     */
    var envViewportWidth = parseInt(750);
    var width = !isNaN(envViewportWidth) && envViewportWidth > 0
        ? envViewportWidth
        : DEFAULT_VIEWPORT_WIDTH;

    var wxViewportMeta = document.querySelector('meta[name="weex-viewport"]');
    var metaWidth = wxViewportMeta && parseInt(wxViewportMeta.getAttribute('content'));
    if (metaWidth && !isNaN(metaWidth) && metaWidth > 0) {
        width = metaWidth;
    }

    var dpr = 0;
    var screenWidth = 0;
    var screenHeight = 0;

    var info = {
        dpr: dpr,
        scale: 0,
        rootValue: 0,
        rem: 0,
        deviceWidth: 0,
        deviceHeight: 0
    };

    /**
     * set root font-size for rem units. If already been set, just skip this.
     */
    function setRootFont(width, viewportWidth, force) {
        var doc = window.document;
        var rem = width * 750 / viewportWidth / 10;
        if (!doc.documentElement) {
            return
        }
        var rootFontSize = doc.documentElement.style.fontSize;
        if (!rootFontSize || force) {
            doc.documentElement.style.fontSize = rem + 'px';
        }
        info.rem = rem;
        info.rootValue = viewportWidth / 10;
    }

    function setMetaViewport(width) {
        if (!wxViewportMeta) {
            wxViewportMeta = document.createElement('meta');
            wxViewportMeta.setAttribute('name', 'weex-viewport');
            var firstMeta = document.querySelector('meta');
            var head = firstMeta && firstMeta.parentElement
                || document.documentElement.children[0];
            firstMeta
                ? head.insertBefore(wxViewportMeta, firstMeta)
                : head.appendChild(wxViewportMeta);
        } else {
            var metaWidth = parseInt(wxViewportMeta.getAttribute('content'));
            if (metaWidth === width) {
                return
            }
        }
        wxViewportMeta.setAttribute('content', width + '');
    }

    /**
     * export viewport info.
     */
    function init$1(viewportWidth) {
        if (viewportWidth === void 0) viewportWidth = width;

        if (!isInited) {
            isInited = true;

            var doc = window.document;
            if (!doc) {
                console.error('[vue-render] window.document is undfined.');
                return
            }
            if (!doc.documentElement) {
                console.error('[vue-render] document.documentElement is undfined.');
                return
            }

            dpr = info.dpr = window.devicePixelRatio;
            screenWidth = doc.documentElement.clientWidth;
            screenHeight = doc.documentElement.clientHeight;

            var resetDeviceHeight = function () {
                screenHeight = doc.documentElement.clientHeight;
                var env = window.weex && window.weex.config.env;
                info.deviceHeight = env.deviceHeight = screenHeight * dpr;
            };

            // set root font for rem.
            setRootFont(screenWidth, viewportWidth);
            setMetaViewport(viewportWidth);

            window.addEventListener('resize', resetDeviceHeight);

            /**
             * why not to use window.screen.width to get screenWidth ? Because in some
             * old webkit browser on android system it get the device pixel width, which
             * is the screenWidth multiply by the device pixel ratio.
             * e.g. ip6 -> get 375 for virtual screen width.
             */
            var scale = screenWidth / viewportWidth;
            /**
             * 1. if set initial/maximum/mimimum-scale some how the page will have a bounce
             * effect when user drag the page towards horizontal axis.
             * 2. Due to compatibility reasons, not to use viewport meta anymore.
             * 3. viewport meta should always be:
             *    <meta name="viewport"
             *      content="width=device-width,
             *      initial-scale=1,
             *      maximum-scale=1,
             *      user-scalable=no" />
             */
            extend(info, {
                scale: scale,
                rootValue: viewportWidth / 10,
                deviceWidth: screenWidth * dpr,
                deviceHeight: screenHeight * dpr
            });
        }

        return info
    }

    /**
     * reset viewport width and scale.
     * @return new scale.
     */
    function resetViewport(viewportWidth) {
        setRootFont(screenWidth, viewportWidth, true);
        setMetaViewport(viewportWidth);
        var newScale = screenWidth / viewportWidth;
        info.scale = newScale;
        return newScale
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    function extend$1(to) {
        var args = [], len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];

        if (!args || args.length <= 0) {
            return to
        }
        args.forEach(function (from) {
            if (typeof from !== 'object') {
                return
            }
            for (var key in from) {
                to[key] = from[key];
            }
        });
        return to
    }

// if support passive event listeners.
    var _supportsPassive = false;
    try {
        document.createElement('div').addEventListener('test', function (_) {
        }, {
            get passive() {
                _supportsPassive = true;
            }
        });
    } catch (e) {
        // do nothing.
    }

    function supportsPassive() {
        return _supportsPassive
    }

    /**
     * Create Event.
     * @param {DOMString} type
     * @param {Object} props
     */
    function createEvent(target, type, props) {
        var event = new Event(type, {bubbles: false});

        extend$1(event, props);
        //  phantomjs don't support customer event
        if (window.navigator.userAgent.toLowerCase().indexOf('phantomjs') !== -1) {
            return event
        }
        try {
            Object.defineProperty(event, 'target', {
                enumerable: true,
                value: target
            });
        } catch (err) {
            return extend$1({}, event, {target: target})
        }
        return event
    }

    /**
     * Create a bubbable Event.
     * @param {DOMString} type
     * @param {Object} props
     */
    function createBubblesEvent(target, type, props) {
        var event = new Event(type, {bubbles: true});
        extend$1(event, props);
        //  phantomjs don't support customer event
        if (window.navigator.userAgent.toLowerCase().indexOf('phantomjs') !== -1) {
            return event
        }
        try {
            Object.defineProperty(event, 'target', {
                enumerable: true,
                value: target
            });
        } catch (err) {
            return extend$1({}, event, {target: target})
        }
        return event
    }

    /**
     * Create Custom Event.
     * @param {DOMString} type
     * @param {Object} props
     */
    function createCustomEvent(target, type, props) {
        // compatibility: http://caniuse.com/#search=customevent
        // const event = new CustomEvent(type)
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, false, true, {});
        // event.preventDefault()
        // event.stopPropagation()

        extend$1(event, props);

        // event.target is readonly
        try {
            Object.defineProperty(event, 'target', {
                enumerable: true,
                value: target || null
            });
        } catch (err) {
            return extend$1({}, event, {target: target || null})
        }

        return event
    }

    /**
     * dispatch a event on a HTML element.
     * @param  {HTMLElement} elm
     * @param  {Event} type event name.
     * @param  {Object} data extra data.
     */
    function dispatchNativeEvent(elm, type, data) {
        elm.dispatchEvent(createEvent(elm, type, data));
    }

    function mapFormEvents(context) {
        var eventMap = {};
        ['input', 'change', 'focus', 'blur', 'return'].forEach(function (type) {
            eventMap[type] = function (event) {
                if (context.$el) {
                    event.value = context.$el.value;
                    // for the sake of v-model, a input event must be emitted.
                    if (type === 'input') {
                        context.$emit(type, event);
                    }
                }
            };
        });
        return eventMap
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    var scaleStyles = [
        'width',
        'height',
        'left',
        'right',
        'top',
        'bottom',
        'border',
        'borderRadius',
        'borderWidth',
        'borderLeft',
        'borderRight',
        'borderTop',
        'borderBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth',
        'margin',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'padding',
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'fontSize',
        'lineHeight',
        'transform',
        'webkitTransform',
        'WebkitTransform',
        'mozTransform',
        'MozTransform',
        'itemSize'
    ];

    var vendorReg = /webkit|moz/i;

    function hyphen(key) {
        return hyphenate(key.replace(vendorReg, function ($0) {
            return ("-" + ($0.toLowerCase()) + "-")
        }))
    }

    function getAllStyles() {
        return Object.keys(scaleStyles.reduce(function (pre, key) {
            pre[key] = 1;
            pre[hyphen(key)] = 1;
            return pre
        }, {}))
    }

    var allStyles = getAllStyles();

    var config = {
        scrollableTypes: ['scroller', 'list', 'waterfall', 'recycle-list'],
        gestureEvents: [
            'panstart',
            'panmove',
            'panend',
            'swipe',
            'longpress',
            'tap'
        ],
        // these components should not bind events with .native.
        weexBuiltInComponents: [
            'div',
            'container',
            'text',
            'image',
            'gif',
            'img',
            'cell',
            'a'
        ],
        bindingStyleNamesForPx2Rem: allStyles
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    /**
     * whether ct contains el.
     * @param {HTMLElement} container
     * @param {HTMLElement} target
     */
    function contains(container, target, includeSelf) {
        if (includeSelf && container === target) {
            return true
        }
        return container.contains
            ? container.contains(target) && (container !== target)
            : container.compareDocumentPosition(target) & 16 !== 0
    }

    function insideA(el) {
        if (typeof el._insideA === 'boolean') {
            return el._insideA
        }
        var parent = el.parentElement;
        var parents = [];
        var checkParents = function (inside) {
            for (var i = 0, l = parents.length; i < l; i++) {
                parents[i]._insideA = inside;
            }
        };
        var check = function (inside) {
            el._insideA = inside;
            checkParents(inside);
            return inside
        };
        while (parent !== document.body) {
            if (parent.tagName.toLowerCase() === 'a') {
                return check(true)
            }
            if (typeof parent._insideA === 'boolean') {
                return check(parent._insideA)
            }
            parents.push(parent);
            parent = parent.parentElement;
        }
        return check(false)
    }

    /**
     * get parent scroller vComponent.
     * return a VueComponent or null.
     */
    function getParentScroller(vm) {
        if (!vm) {
            return null
        }
        if (vm._parentScroller) {
            return vm._parentScroller
        }

        function _getParentScroller(parent) {
            if (!parent) {
                return
            }
            if (config.scrollableTypes.indexOf(parent.weexType) > -1) {
                vm._parentScroller = parent;
                return parent
            }
            return _getParentScroller(parent.$parent)
        }

        return _getParentScroller(vm.$parent)
    }

    /**
     * get scroller's element.
     * @param vm {HTMLElement | VueCOmponent} vm or element.
     * return the element or document.body.
     */
    function getParentScrollerElement(vm) {
        if (!vm) {
            return null
        }
        var el = vm instanceof HTMLElement ? vm : vm.$el;
        if (!el || el.nodeType !== 1) {
            return
        }
        if (vm._parentScroller) {
            return vm._parentScroller
        }

        function _getParentScroller(parent) {
            if (!parent) {
                return
            }
            var tagName = parent.tagName.toLowerCase();
            if (tagName === 'body'
                || (tagName === 'main'
                    && config.scrollableTypes.indexOf(parent.getAttribute('weex-type')) > -1)
            ) {
                vm._parentScroller = parent;
                return parent
            }
            return _getParentScroller(parent.parentElement)
        }

        return _getParentScroller(el)
    }

    function horizontalBalance(rect, ctRect) {
        return rect.left < ctRect.right && rect.right > ctRect.left
    }

    function verticalBalance(rect, ctRect) {
        return rect.top < ctRect.bottom && rect.bottom > ctRect.top
    }

    /**
     * return a data array with two boolean value, which are:
     * 1. visible in current ct's viewport.
     * 2. visible with offset in current ct's viewport.
     */
    function hasIntersection(rect, ctRect, dir, offset) {
        dir = dir || 'up';
        var isHorizontal = dir === 'left' || dir === 'right';
        var isVertical = dir === 'up' || dir === 'down';
        if (isHorizontal && !verticalBalance(rect, ctRect)) {
            return [false, false]
        }
        if (isVertical && !horizontalBalance(rect, ctRect)) {
            return [false, false]
        }
        offset = offset ? parseInt(offset) * weex.config.env.scale : 0;
        switch (dir) {
            case 'up':
                return [
                    rect.top < ctRect.bottom && rect.bottom > ctRect.top,
                    rect.top < ctRect.bottom + offset && rect.bottom > ctRect.top - offset
                ]
            case 'down':
                return [
                    rect.bottom > ctRect.top && rect.top < ctRect.bottom,
                    rect.bottom > ctRect.top - offset && rect.top < ctRect.bottom + offset
                ]
            case 'left':
                return [
                    rect.left < ctRect.right && rect.right > ctRect.left,
                    rect.left < ctRect.right + offset && rect.right > ctRect.left - offset
                ]
            case 'right':
                return [
                    rect.right > ctRect.left && rect.left < ctRect.right,
                    rect.right > ctRect.left - offset && rect.left < ctRect.right + offset
                ]
        }
    }

    /**
     * isElementVisible
     * @param  {HTMLElement}  el    a dom element.
     * @param  {HTMLElement}  container  optional, the container of this el.
     */
    function isElementVisible(el, container, dir, offset) {
        if (!el.getBoundingClientRect) {
            return false
        }
        var bodyRect = {
            top: 0,
            left: 0,
            bottom: window.innerHeight,
            right: window.innerWidth
        };
        var ctRect = (container === window || container === document.body)
            ? bodyRect : container
                ? container.getBoundingClientRect() : bodyRect;
        return hasIntersection(el.getBoundingClientRect(), ctRect, dir, offset)
    }

// to trigger the appear/disappear event.
    function triggerAppearEvent(elm, evt, dir) {
        dispatchNativeEvent(elm, evt, {
            direction: dir
        });
    }

    /**
     * get all event listeners. including bound handlers in all parent vnodes.
     */
    function getEventHandlers(context) {
        var vnode = context.$vnode;
        var handlers = {};
        var attachedVnodes = [];
        while (vnode) {
            attachedVnodes.push(vnode);
            vnode = vnode.parent;
        }
        attachedVnodes.forEach(function (vnode) {
            var parentListeners = vnode.componentOptions && vnode.componentOptions.listeners;
            var dataOn = vnode.data && vnode.data.on;
            extend(handlers, parentListeners, dataOn);
        });
        return handlers
    }

    function getAppearOffset(el) {
        return el && el.getAttribute('appear-offset')
    }

    function updateWatchAppearList(container) {
        container._watchAppearList = Array.prototype.slice.call(
            container.querySelectorAll('[weex-appear]'));
    }

    /**
     * inject removeChild function to watch disappear and offsetDisappear events.
     */
    if (!window._rmInjected) {
        window._rmInjected = true;
        var nativeRemove = HTMLElement.prototype.removeChild;
        HTMLElement.prototype.removeChild = function (el) {
            el._visible && triggerAppearEvent(el, 'disappear', null);
            el._offsetVisible && triggerAppearEvent(el, 'offsetDisappear', null);
            nativeRemove.apply(this, arguments);
        };
    }

    /**
     * Watch element's visibility to tell whether should trigger a appear/disappear
     * event in scroll handler.
     */
    function watchAppear(context, fireNow) {
        var el = context && context.$el;
        if (!el || el.nodeType !== 1) {
            return
        }

        var isWindow = false;
        var container = getParentScrollerElement(context);
        if (!container) {
            return
        }
        if (container === document.body) {
            isWindow = true;
        }
        /**
         * Code below will only exec once for binding scroll handler for parent container.
         */
        var scrollHandler = container._scrollHandler;
        if (!scrollHandler) {
            scrollHandler = container._scrollHandler = function (event$$1) {
                updateWatchAppearList(container);
                /**
                 * detect scrolling direction.
                 * direction only support up & down yet.
                 * TODO: direction support left & right.
                 */
                var scrollTop = isWindow ? window.pageYOffset : container.scrollTop;
                var preTop = container._lastScrollTop;
                container._lastScrollTop = scrollTop;
                var dir = (scrollTop < preTop
                    ? 'down' : scrollTop > preTop
                        ? 'up' : container._prevDirection) || null;
                container._prevDirection = dir;
                var watchAppearList = container._watchAppearList || [];
                var len = watchAppearList.length;
                for (var i = 0; i < len; i++) {
                    var el = watchAppearList[i];
                    var appearOffset = getAppearOffset(el);
                    var visibleData = isElementVisible(el, container, dir, appearOffset);
                    detectAppear(el, visibleData, dir);
                }
            };
            container.addEventListener('scroll', throttle(scrollHandler, 100, true));
        }
        if (fireNow) {
            context.$nextTick(scrollHandler);
        }
    }

    /**
     * decide whether to trigger a appear/disappear event.
     * @param {VueComponent} context
     * @param {boolean} visible
     * @param {string} dir
     */
    function detectAppear(el, visibleData, dir, appearOffset) {
        if (dir === void 0) dir = null;

        if (!el) {
            return
        }
        var visible = visibleData[0];
        var offsetVisible = visibleData[1];
        /**
         * No matter it's binding appear/disappear or both of them. Always
         * should test it's visibility and change the el._visible.
         * If neigher has been bound, then ignore it.
         */
        /**
         * if the component hasn't appeared for once yet, then it shouldn't trigger
         * a disappear event at all.
         */
        if (el._appearedOnce || visible) {
            if (el._visible !== visible) {
                el._visible = visible;
                if (visible && !el._appearedOnce) {
                    el._appearedOnce = true;
                }
                var evtName = visible ? 'appear' : 'disappear';
                if (el.getAttribute(("data-evt-" + evtName)) === '') {
                    triggerAppearEvent(el, evtName, dir);
                }
            }
        }
        if (el._offsetAppearedOnce || offsetVisible) {
            if (el._offsetVisible !== offsetVisible) {
                el._offsetVisible = offsetVisible;
                if (offsetVisible && !el._offsetAppearedOnce) {
                    el._offsetAppearedOnce = true;
                }
                var evt = offsetVisible ? ['offset-appear', 'offsetAppear'] : ['offset-disappear', 'offsetDisappear'];
                if (el.getAttribute(("data-evt-" + (evt[0]))) === '') {
                    triggerAppearEvent(el, evt[1], dir);
                }
            }
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    var lazyloadAttr = 'data-img-src';
    var placeholderAttr = 'placeholder';

    function preLoadImg(src,
                        loadCallback,
                        errorCallback) {
        var img = new Image();
        img.onload = loadCallback ? loadCallback.bind(img) : null;
        img.onerror = errorCallback ? errorCallback.bind(img) : null;
        img.src = src;
    }

    function applySrc(item, src, placeholderSrc) {
        if (!src) {
            return
        }

        function finallCb() {
            delete item._src_loading;
        }

        if (window._processImgSrc) {
            src = window._processImgSrc(src, item);
            if (placeholderSrc) {
                placeholderSrc = window._processImgSrc(placeholderSrc, item);
            }
        }

        if (item._src_loading === src) {
            return
        }

        /**
         * 1. apply src immediately in case javscript blocks the image loading
         *  before next tick.
         */
        item.style.backgroundImage = "url(" + (src || '') + ")";
        item.removeAttribute(lazyloadAttr);
        /**
         * 2. then load the img src with Image constructor (but would not post
         *  a request again), just to trigger the load event.
         */
        item._src_loading = src;
        preLoadImg(src, function (evt) {
            item.style.backgroundImage = "url(" + (src || '') + ")";
            var ref = this;
            var naturalWidth = ref.width;
            var naturalHeight = ref.height;
            var params = {
                success: true,
                size: {naturalWidth: naturalWidth, naturalHeight: naturalHeight}
            };
            dispatchNativeEvent(item, 'load', params);
            finallCb();
        }, function (evt) {
            var params = {
                success: false,
                size: {naturalWidth: 0, naturalHeight: 0}
            };
            dispatchNativeEvent(item, 'load', params);
            if (placeholderSrc) {
                preLoadImg(placeholderSrc, function () {
                    item.style.backgroundImage = "url(" + (placeholderSrc || '') + ")";
                });
            }
            finallCb();
        });
    }

    function getCtScroller(el) {
        if (!el) {
            return
        }
        var scroller = el._ptScroller;
        if (!scroller) {
            var pt = el.parentElement;
            while (pt && pt !== document.body) {
                if ((pt.className + '' || '').match(/weex-list|weex-scroller|weex-waterfall/)) {
                    scroller = pt;
                    break
                }
                pt = pt.parentElement;
            }
            scroller = pt;
            el._ptScroller = pt;
        }
        return scroller
    }

    function fireLazyload(el, ignoreVisibility) {
        if (Array.isArray(el)) {
            return el.forEach(function (ct) {
                return fireLazyload(ct);
            })
        }
        el = el || document.body;
        if (!el) {
            return
        }
        var imgs = (el || document.body).querySelectorAll(("[" + lazyloadAttr + "]"));
        if (el.getAttribute(lazyloadAttr)) {
            imgs = [el];
        }
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            if (typeof ignoreVisibility === 'boolean' && ignoreVisibility) {
                applySrc(img, img.getAttribute(lazyloadAttr), img.getAttribute(placeholderAttr));
            } else if (isElementVisible(img, getCtScroller(el))[0]) {
                applySrc(img, img.getAttribute(lazyloadAttr), img.getAttribute(placeholderAttr));
            }
        }
    }

    /**
     * cache a throttle lazyload function for every container element
     * once for different wait times separate.
     *   the architecture of this cache:
     *      cache: {
     *        el.id: {
     *          wait: throttledFunction () { ... }
     *        }
     *      }
     */
    var cache = {};
    var _uid$2 = 1;

    function getThrottleLazyload(wait, el) {
        if (wait === void 0) wait = 16;
        if (el === void 0) el = document.body;

        var id = +(el && el.dataset.throttleId);
        if (isNaN(id) || id <= 0) {
            id = _uid$2++;
            el && el.setAttribute('data-throttle-id', id + '');
        }

        !cache[id] && (cache[id] = {});
        var throttled = cache[id][wait] ||
            (cache[id][wait] = throttle(
                    fireLazyload.bind(this, el),
                    parseFloat(wait),
                    // true for callLastTime.
                    // to trigger once more time after the last throttled function called with a little more delay.
                    true)
            );
        return throttled
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    var bindingStyleNamesForPx2Rem = config.bindingStyleNamesForPx2Rem;

// whether to support using 0.5px to paint 1px width border.
    var _supportHairlines;

    function supportHairlines() {
        if (typeof _supportHairlines === 'undefined') {
            var dpr = window.devicePixelRatio;
            if (dpr && dpr >= 2 && document.documentElement) {
                var docElm = document.documentElement;
                var testElm = document.createElement('div');
                var fakeBody = document.createElement('body');
                var beforeNode = docElm.firstElementChild || docElm.firstChild;
                testElm.style.border = '0.5px solid transparent';
                fakeBody.appendChild(testElm);
                docElm.insertBefore(fakeBody, beforeNode);
                _supportHairlines = testElm.offsetHeight === 1;
                docElm.removeChild(fakeBody);
            } else {
                _supportHairlines = false;
            }
        }
        return _supportHairlines
    }

    var support = null;

    function supportSticky() {
        if (support !== null) {
            return support
        }
        var element = window.document.createElement('div');
        var elementStyle = element.style;
        elementStyle.cssText = 'position:-webkit-sticky;position:sticky;';
        support = elementStyle.position.indexOf('sticky') !== -1;
        return support
    }

    /**
     * get transformObj
     */
    function getTransformObj(elm) {
        var styleObj = {};
        if (!elm) {
            return styleObj
        }
        var transformStr = elm.style.webkitTransform
            || elm.style.mozTransform
            || elm.style.transform;
        if (transformStr && transformStr.match(/(?: *(?:translate|rotate|scale)[^(]*\([^(]+\))+/i)) {
            styleObj = transformStr.trim().replace(/, +/g, ',').split(' ').reduce(function (pre, str) {
                ['translate', 'scale', 'rotate'].forEach(function (name) {
                    if (new RegExp(name, 'i').test(str)) {
                        pre[name] = str;
                    }
                });
                return pre
            }, {});
        }
        return styleObj
    }

    /**
     * translate a transform string from a transformObj.
     */
    function getTransformStr(obj) {
        return Object.keys(obj).reduce(function (pre, key) {
            return pre + obj[key] + ' '
        }, '')
    }

    /**
     * add transform style to element.
     * @param {HTMLElement} elm
     * @param {object} style: transform object, format is like this:
     *   {
     *     translate: 'translate3d(2px, 2px, 2px)',
     *     scale: 'scale(0.2)',
     *     rotate: 'rotate(30deg)'
     *   }
     * @param {boolean} replace: whether to replace all transform properties.
     */
    function addTransform(elm, style, replace) {
        if (!style) {
            return
        }
        var styleObj = {};
        if (!replace) {
            styleObj = getTransformObj(elm);
        }
        for (var key in style) {
            var val = style[key];
            if (val) {
                styleObj[key] = val;
            }
        }
        var resStr = getTransformStr(styleObj);
        elm.style.webkitTransform = resStr;
        elm.style.mozTransform = resStr;
        elm.style.transform = resStr;
    }

    /**
     * copy a transform behaviour from one element to another.
     * key could be: 'translate' | 'scale' | 'rotate'
     */
    function copyTransform(from, to, key) {
        var str;
        if (!key) {
            str = from.style.webkitTransform
                || from.style.mozTransform
                || from.style.transform;
        } else {
            var fromObj = getTransformObj(from);
            if (!fromObj[key]) {
                return
            }
            var toObj = getTransformObj(to);
            toObj[key] = fromObj[key];
            str = getTransformStr(toObj);
        }
        to.style.webkitTransform = str;
        to.style.mozTransform = str;
        to.style.transform = str;
    }

    /**
     * get color's r, g, b value.
     * @param {string} color support all kinds of value of color.
     */
    function getRgb(color) {
        var haxReg = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/;
        var rgbReg = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
        var span = document.createElement('span');
        var body = document.body;
        span.style.cssText = "color: " + color + "; width: 0px; height: 0px;";
        body && body.appendChild(span);
        color = window.getComputedStyle(span).color + '';
        body && body.removeChild(span);

        var match;
        match = color.match(haxReg);
        if (match) {
            return {
                r: parseInt(match[1], 16),
                g: parseInt(match[2], 16),
                b: parseInt(match[3], 16)
            }
        }
        match = color.match(rgbReg);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3])
            }
        }
    }

    /**
     * get style sheet with owner node's id
     * @param {string} id owner node id.
     */
    function getStyleSheetById(id) {
        if (!id) {
            return
        }
        var styleSheets = document.styleSheets;
        var len = styleSheets.length;
        for (var i = 0; i < len; i++) {
            var styleSheet = styleSheets[i];
            if (styleSheet.ownerNode.id === id) {
                return styleSheet
            }
        }
    }

    function getChildrenTotalWidth(children) {
        var len = children.length;
        var total = 0;
        for (var i = 0; i < len; i++) {
            total += children[i].getBoundingClientRect().width;
        }
        return total
    }

    /**
     * get total content width of the element.
     * @param {HTMLElement} elm
     */
    function getRangeWidth(elm) {
        var children = elm.children;
        if (!children) {
            return elm.getBoundingClientRect().width
        }
        if (!Range) {
            return getChildrenTotalWidth(children)
        }
        var range = document.createRange();
        if (!range.selectNodeContents) {
            return getChildrenTotalWidth(children)
        }
        range.selectNodeContents(elm);
        return range.getBoundingClientRect().width
    }

    /**
     * px2rem and camelize keys.
     */
    function styleObject2rem(style, rootValue) {
        var obj = {};
        for (var k in style) {
            var camK = camelize(k);
            if (bindingStyleNamesForPx2Rem.indexOf(camK) > -1) {
                obj[camK] = px2rem(style[k] + '', rootValue);
            } else {
                obj[camK] = style[k];
            }
        }
        return obj
    }

    function px2rem(px, rootValue) {
        return px.replace(/([+-]?\d+(?:.\d*)?)([p|w]x)/g, function ($0, $1, $2) {
            if ($2 === 'wx') { // 'wx' -> px
                return $1 + 'px'
            } else {  // 'px' -> rem
                var pxVal = parseFloat($1);
                var sign = pxVal > 0
                    ? 1 : pxVal < 0 ?
                        -1 : 0;
                if (Math.abs(pxVal) <= 1) {
                    return supportHairlines()
                        ? ((sign * 0.5) + "px")
                        : ((sign * 1) + "px")
                }
                return pxVal
                    / (rootValue || window.weex.config.env.rem)
                    + 'rem'
            }
        })
    }

    function rem2px(rem, rootValue) {
        return rem.replace(/([+-]?\d+(?:.\d*)?)rem/g, function ($0, $1) {
            return parseFloat($1)
                * (rootValue || window.weex.config.env.rem)
                + 'px'
        })
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


    var utils = Object.freeze({
        extend: extend,
        extendTruthy: extendTruthy,
        extendKeys: extendKeys,
        extractKeys: extractKeys,
        bind: bind,
        debounce: debounce,
        depress: depress,
        throttle: throttle,
        loopArray: loopArray,
        cached: cached,
        camelize: camelize,
        camelizeKeys: camelizeKeys,
        capitalize: capitalize,
        hyphenate: hyphenate,
        hyphenateKeys: hyphenateKeys,
        hyphenateStyleKeys: hyphenateStyleKeys,
        camelToKebab: camelToKebab,
        appendCss: appendCss,
        nextFrame: nextFrame,
        toCSSText: toCSSText,
        supportsPassive: supportsPassive,
        createEvent: createEvent,
        createBubblesEvent: createBubblesEvent,
        createCustomEvent: createCustomEvent,
        dispatchNativeEvent: dispatchNativeEvent,
        mapFormEvents: mapFormEvents,
        contains: contains,
        insideA: insideA,
        getParentScroller: getParentScroller,
        getParentScrollerElement: getParentScrollerElement,
        hasIntersection: hasIntersection,
        isElementVisible: isElementVisible,
        getEventHandlers: getEventHandlers,
        watchAppear: watchAppear,
        detectAppear: detectAppear,
        applySrc: applySrc,
        fireLazyload: fireLazyload,
        getThrottleLazyload: getThrottleLazyload,
        supportHairlines: supportHairlines,
        supportSticky: supportSticky,
        getTransformObj: getTransformObj,
        getTransformStr: getTransformStr,
        addTransform: addTransform,
        copyTransform: copyTransform,
        getRgb: getRgb,
        getStyleSheetById: getStyleSheetById,
        getRangeWidth: getRangeWidth,
        styleObject2rem: styleObject2rem,
        px2rem: px2rem,
        rem2px: rem2px,
        isPlainObject: isPlainObject,
        isArray: isArray,
        isPrimitive: isPrimitive,
        isDef: isDef
    });

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    /**
     * get WXEnvironment info.
     * @param  {object} viewportInfo: info about viewport.
     * @param  {object} envInfo: info parsed from lib.env.
     */
    function initEnv(viewportInfo, envInfo) {
        var browserName = envInfo.browser ? envInfo.browser.name : navigator.appName;
        var browserVersion = envInfo.browser ? envInfo.browser.version.val : null;
        var osName = envInfo.os.name;
        if (osName.match(/(iPhone|iPad|iPod)/i)) {
            osName = 'iOS';
        } else if (osName.match(/Android/i)) {
            osName = 'android';
        }
        var osVersion = envInfo.os.version.val;
        var env = {
            platform: 'Web',
            weexVersion: '1.0.33',
            userAgent: navigator.userAgent,
            appName: browserName,
            appVersion: browserVersion,
            osName: osName,
            osVersion: osVersion,
            deviceModel: envInfo.os.name || null
        };
        /**
         * viewportInfo: scale, deviceWidth, deviceHeight. dpr
         */
        return extend(viewportInfo, env)
    }

// const viewportInfo = initViewport()

// 750 by default currently
// const scale = viewportInfo.scale

// const units = {
//   REM: 12 * scale,
//   VW: viewportInfo.deviceWidth / 100,
//   VH: viewportInfo.deviceHeight / 100,
//   VMIN: Math.min(viewportInfo.deviceWidth, viewportInfo.deviceHeight) / 100,
//   VMAX: Math.max(viewportInfo.deviceWidth, viewportInfo.deviceHeight) / 100,
//   CM: 96 / 2.54 * scale,
//   MM: 96 / 25.4 * scale,
//   Q: 96 / 25.4 / 4 * scale,
//   IN: 96 * scale,
//   PT: 96 / 72 * scale,
//   PC: 96 / 6 * scale,
//   PX: scale
// }

// Object.freeze(units)
// Object.freeze(env)

// window.CSS_UNIT = units
    window.WXEnvironment = initEnv(init$1(), window.lib.env);

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    /* global Vue */

    var weexModules = {};
    var _roots = [];

    var weex$4 = {
        __vue__: null,
        utils: utils,
        // units: window.CSS_UNIT,
        config: {
            env: window.WXEnvironment,
            bundleUrl: location.href
        },

        _components: {},
        _modules: weexModules,

        _meta: {
            mounted: {},
            updated: {},
            destroyed: {},
            requiredModules: {},
            apiCalled: {},
            perf: {}
        },

        document: {
            body: {}
        },

        requireModule: function requireModule(moduleName) {
            var metaMod = weex$4._meta.requiredModules;
            if (!metaMod[moduleName]) {
                metaMod[moduleName] = 0;
            }
            metaMod[moduleName]++;
            return weexModules[moduleName]
        },

        registerModule: function registerModule() {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];

            return (ref = this).registerApiModule.apply(ref, args)
            var ref;
        },

        support: function support(feature) {
            if (feature === void 0) feature = '';

            var match = (feature + '').match(/@(component|module)\/(\w+)(.\w+)?/);
            if (match) {
                var type = match[1];
                var mod = match[2];
                var method = match[3];
                method = method && method.replace(/^\./, '');
                switch (type) {
                    case 'component':
                        return typeof this._components[mod] !== 'undefined'
                            || config.weexBuiltInComponents.indexOf(mod) >= 0
                    case 'module':
                        var module = weexModules[mod];
                        return module && method ? !!module[method] : !!module
                }
            } else {
                console.warn(("[vue-render] invalid argument for weex.support: " + feature));
                return null
            }
        },

        supports: function supports() {
            return this.support.apply(this, arguments)
        },

        isRegisteredModule: function isRegisteredModule(moduleName, methodName) {
            var feature = methodName ? (moduleName + "." + methodName) : moduleName;
            return this.support('@module/' + feature)
        },

        isRegisteredComponent: function isRegisteredComponent(componentName) {
            return this.support('@component/' + componentName)
        },

        /**
         * Register a new vue instance in this weex instance. Put its root element into weex.document.body.children, so
         * that user can use weex.document.body to walk through all dom structures in all vue instances in the page.
         */
        registerVueInstance: function registerVueInstance(instance) {
            if (!instance instanceof Vue) {
                return
            }
            var root = instance.$root;
            if (!root || !root.$el) {
                return
            }
            this.document.body.children.push(root.$el);
        },

        // @deprecated
        require: function require() {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];

            console.log("[Vue Render] \"weex.require\" is deprecated, please use \"weex.requireModule\" instead.");
            return (ref = this).requireModule.apply(ref, args)
            var ref;
        },

        // @deprecated
        // TODO: rename to registerModule
        registerApiModule: function registerApiModule(name, module, meta) {
            if (!weexModules[name]) {
                weexModules[name] = {};
            }
            if (!!meta && meta.registerType === 'assignment') {
                weexModules[name] = module;
            } else {
                var loop = function (key) {
                    if (module.hasOwnProperty(key)) {
                        weexModules[name][key] = function () {
                            var called = weex$4._meta.apiCalled;
                            if (!called[name]) {
                                called[name] = {};
                            }
                            var calledMod = called[name];
                            if (!calledMod[key]) {
                                calledMod[key] = 0;
                            }
                            calledMod[key]++;
                            return module[key].apply(weex$4, arguments)
                        };
                    }
                };

                for (var key in module) loop(key);
            }
        },

        registerComponent: function registerComponent(name, component) {
            if (!this.__vue__) {
                return console.log('[Vue Render] Vue is not found. Please import Vue.js before register a component.')
            }
            this._components[name] = 0;
            if (component._css) {
                var css = component._css.replace(/\b[+-]?[\d.]+rem;?\b/g, function (m) {
                    return parseFloat(m) * 75 * weex$4.config.env.scale + 'px'
                });
                appendCss(css, ("weex-cmp-" + name));
                delete component._css;
            }
            this.__vue__.component(name, component);
        },

        // @deprecated
        getRoot: function getRoot() {
        },

        // @deprecated
        sender: {
            performCallback: function performCallback(callback, data, keepAlive) {
                if (typeof callback === 'function') {
                    return callback(data)
                }
                return null
            }
        },

        // @deprecated
        install: function install(module) {
            module.init(this);
        }
    };

    Object.defineProperty(weex$4.document.body, 'children', {
        get: function get() {
            return _roots
        }
    })

    ;['on', 'once', 'off', 'emit'].forEach(function (method) {
        weex$4[method] = function () {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];

            if (!this._vue) {
                this._vue = new this.__vue__();
            }
            return (ref = this._vue)[("$" + method)].apply(ref, args)
            var ref;
        };
    });

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    function getInlineStyle(vnode) {
        var data = vnode.data || {};
        return extendTruthy({}, data.staticStyle, data.style)
    }

    function extractComponentStyle(context) {
        return getComponentInlineStyle(context)
        // return getComponentStyle(context, true)
    }

    function getComponentInlineStyle(context) {
        var vnode = context && context.$vnode;
        if (!vnode) {
            return {}
        }
        var style = {};
        while (vnode) {
            extend(style, getInlineStyle(vnode));
            vnode = vnode.parent;
        }
        return style
    }

    var text$2 = {
        transform: function transform(style) {
            var lines = style.lines;
            if (lines > 0) {
                return Object.assign(style, {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: lines
                })
            }
            return style
        }
    };

    var tagMap$1 = {
        text: text$2
    };

    var getTransformer$1 = function (tag) {
        return tagMap$1[tag]
    };

    var transformer = {
        getTransformer: getTransformer$1
    };

    var getTransformer = transformer.getTransformer;

    var getTransformer_1 = getTransformer;

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    var weexBuiltInComponents = config.weexBuiltInComponents;

    var appearEventsMap = {
        appear: 'appear',
        disappear: 'disappear',
        offsetAppear: 'offset-appear',
        offsetDisappear: 'offset-disappear'
    };

    /**
     * remove text nodes in the nodes array.
     * @param  {Array} nodes
     * @return {Array} nodes without text nodes.
     */
    function trimTextVNodes(vnodes) {
        if (isArray(vnodes)) {
            return vnodes.filter(function (vnode) {
                return !!vnode.tag;
            })
        }
        return vnodes
    }

    /**
     * ==================================================
     * method to transform args passed to createElement
     * for render function.
     * ==================================================
     */

// should share with precompiler.
    var metaMap = {
        figure: ['img', 'image', 'gif', 'figure'],
        p: ['text', 'p'],
        div: ['container', 'div'],
        section: ['cell', 'cell-slot'],
        'recycle-list': ['recycle-list']
    };

    var checkMap = Object.keys(metaMap).reduce(function (pre, targetTag) {
        var tagArr = metaMap[targetTag];
        tagArr.forEach(function (fromTag) {
            pre[fromTag] = targetTag;
        });
        return pre
    }, {});

    var _stdTagMap = {
        p: 'text',
        figure: 'image',
        section: 'cell'
    };

    function getStdTag(tag) {
        var stdTag = _stdTagMap[tag];
        return stdTag || tag
    }

    var precompiledClassMap = {
        div: {
            'weex-ct': true,
            'weex-div': true
        },
        image: {
            'weex-el': true,
            'weex-image': true
        },
        text: {
            'weex-el': true,
            'weex-text': true
        },
        cell: {
            'weex-ct': true,
            'weex-cell': true
        },
        a: {
            'weex-ct': true,
            'weex-a': true
        }
    };

    function isPrecompiled(tag) {
        return config.weexBuiltInComponents.indexOf(tag) > -1
    }

    function transformRender(ctx, h) {
        return function (
            tag,
            data,
            children,
            normalizationType,
            alwaysNormalize
        ) {
            if (isArray(data) || isPrimitive(data)) {
                normalizationType = children;
                children = data;
                data = {};
            }
            if (!isDef(data)) {
                data = {};
            }
            if (isDef(data.is)) {
                tag = data.is;
            }
            if (typeof tag === 'string') {
                data = transformData(this, data, tag);
                tag = transformTag(this, tag);
            } else {  // direct component options / constructor
                data = transformData(this, data, undefined);
            }
            return h.call(
                this,
                tag,
                data,
                children,
                normalizationType,
                alwaysNormalize
            )
        }.bind(ctx)
    }

    function transformTag(ctx, tag) {
        var elementTag = checkMap[tag];
        return elementTag || tag
    }

    /**
     * Tell whether a element is contained in a element who has
     * a attribute 'bubble'=true.
     * @param {HTMLElement} el
     */
// function inBubble (el) {
//   if (typeof el._inBubble === 'boolean') {
//     return el._inBubble
//   }
//   const parents = []
//   let parent = el.parentElement
//   let inBubble
//   while (parent && parent !== document.body) {
//     if (typeof parent._inBubble === 'boolean') {
//       inBubble = parent._inBubble
//       break
//     }
//     const attr = parent.getAttribute('bubble')
//     if (attr !== '') {
//       inBubble = attr === true || attr === 'true'
//       break
//     }
//     parents.push(parent)
//     parent = parent.parentElement
//   }
//   el._inBubble = inBubble
//   for (let i = 0, l = parents.length; i < l; i++) {
//     parents[i]._inBubble = inBubble
//   }
//   return inBubble
// }

    function bindEvents(ctx, evts, attrs, tag, appearAttached) {
        for (var key in evts) {
            var appearEvtName = appearEventsMap[key];
            if (appearEvtName) {
                attrs[("data-evt-" + appearEvtName)] = '';
                if (!appearAttached.value) {
                    appearAttached.value = true;
                    attrs['weex-appear'] = '';
                }
            } else {
                attrs[("data-evt-" + key)] = '';
                if (key !== 'click') {
                    // should stop propagation by default.
                    // TODO: should test inBubble first.
                    var handler = evts[key];
                    if (isArray(evts[key])) {
                        handler.unshift(ctx.$stopPropagation);
                    } else {
                        evts[key] = [ctx.$stopPropagation, handler];
                    }
                }
            }
        }
        if (evts.click) {
            evts.weex$tap = evts.click;
            evts.click = ctx.$stopOuterA;
        }
        if (evts.scroll) {
            evts.weex$scroll = evts.scroll;
            delete evts.scroll;
        }
    }

    function transformOn(ctx, data, tag) {
        var on = data.on;
        var nativeOn = data.nativeOn;
        if (weexBuiltInComponents.indexOf(tag) > -1) {
            /**
             * for div, image, text, cell, a, ...
             * user should bind all events without .native.
             */
            nativeOn = null;
            delete data.nativeOn;
        }
        if (isDef(weex._components[tag])) {
            /**
             * for slider, list, ...
             * user should bind events without .native.
             * in our events handling, all events should transfer to
             * .native binding.
             */
            delete data.nativeOn;
            nativeOn = null;
            if (on) {
                nativeOn = data.nativeOn = on;
            }
            on = null;
            delete data.on;
        }

        var attrs = data.attrs;
        if (!attrs) {
            attrs = data.attrs = {};
        }

        var appearAttached = {
            value: false
        };
        if (on) {
            bindEvents(ctx, on, attrs, tag, appearAttached);
        }
        if (nativeOn) {
            bindEvents(ctx, nativeOn, attrs, tag, appearAttached);
        }

        /**
         * binding a weex$tap to <a> element to stop propagation if there
         * is no bubbles=true flag showing on parents.
         */
        if (tag === 'a') {
            if (!on) {
                on = data.on = {};
            }
            // if (!checkBubble(el)) {
            var evt = on['weex$tap'];
            if (!evt) {
                on['weex$tap'] = ctx.$stopPropagation;
            } else if (Array.isArray(evt)) {
                evt.unshift(ctx.$stopPropagation);
            } else {
                evt = [ctx.$stopPropagation, evt];
            }
            // }
        }
    }

    function transformClass(data, tag) {
        var classData = data.class;
        var tagClassObj = precompiledClassMap[tag];
        if (!classData) {
            classData = data.class = [];
        }
        if (classData && isArray(classData)) {
            data.class = classData.concat(Object.keys(tagClassObj));
        } else if (typeof classData === 'object') {
            Object.assign(classData, tagClassObj);
        }
    }

    function transformStyle(ctx, data, tag) {
        console.log("--transformStyle---", ctx, data, tag);
        var style = data.style;
        if (!style) {
            return
        }
        var transformer = getTransformer_1(getStdTag(tag));
        if (transformer) {
            data.style = ctx._px2rem(transformer.transform(style), 75);
        } else {
            data.style = ctx._px2rem(style, 75);
        }
    }

    /**
     * transformAttrs:
     *  - add weex-type attrs for precompiledTags.
     *  - image.resize: transform to directive weex-resize.
     */
    function transformAttrs(data, tag) {
        var attrs = data.attrs;
        var directives = data.directives;
        if (!attrs) {
            attrs = data.attrs = {};
        }
        attrs['weex-type'] = tag;
        if (tag === 'image' || tag === 'gif') {
            var src = attrs.src;
            var resize = attrs.resize;
            if (src) {
                attrs['data-img-src'] = src;
            }
            if (resize) {
                if (!directives) {
                    directives = data.directives = [];
                }
                directives.push({
                    name: 'weex-resize',
                    value: attrs.resize
                });
            }
        }
    }

    function transformData(ctx, data, tag) {
        if (isArray(data)) {
            // parameter data is ommited.
            return data
        }
        var isP = isPrecompiled(tag);
        // class
        isP && transformClass(data, tag);
        // style
        transformStyle(ctx, data, tag);
        // attrs
        isP && transformAttrs(data, tag);
        // on
        transformOn(ctx, data, tag);
        return data
    }

    function mapNativeEvents(ctx, map) {
        var eventMap = {};
        var loop = function (origEvent) {
            eventMap[origEvent] = function (evt) {
                var el = evt.target;
                dispatchNativeEvent(el, map[origEvent]);
            };
        };

        for (var origEvent in map) loop(origEvent);
        return eventMap
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


    var core = Object.freeze({
        extractComponentStyle: extractComponentStyle,
        getComponentInlineStyle: getComponentInlineStyle,
        trimTextVNodes: trimTextVNodes,
        transformRender: transformRender,
        transformTag: transformTag,
        transformData: transformData,
        mapNativeEvents: mapNativeEvents
    });

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    var scrollableTypes = config.scrollableTypes;

    var lazyloadWatched = false;

    function watchLazyload() {
        lazyloadWatched = true
        ;[
            'scroll',
            // 'transitionend',
            // 'webkitTransitionEnd',
            // 'animationend',
            // 'webkitAnimationEnd',
            'resize'
        ].forEach(function (evt) {
            window.addEventListener(evt, getThrottleLazyload(25, document.body));
        });
        /**
         * In case the users use the body's overflow to scroll. Then the scroll
         * event would not be triggered on the window object but on the body.
         */
        document.body.addEventListener('scroll', getThrottleLazyload(25, document.body));
    }

    var idCnt = 0;
    var appearWatched = false;

    /**
     * during updating, the appear watcher binding on the appearWatched context
     * should be triggered within a debounced wrapper.
     * If the updating interval is shorter then 50 ms, then the appear events will
     * ignore the change in the previous 50 ms due to the debounce wrapper.
     */
    var debouncedWatchAppear = debounce(function () {
        watchAppear(appearWatched, true);
    }, 50);

    /**
     * if it's a scrollable tag, then watch appear events for it.
     */
    function watchAppearForScrollables(tagName, context) {
        // when this is a scroller/list/waterfall
        if (scrollableTypes.indexOf(tagName) > -1) {
            var sd = context.scrollDirection;
            if (!sd || sd !== 'horizontal') {
                appearWatched = context;
                watchAppear(context, true);
            }
        }
    }

    var base = {
        beforeCreate: function beforeCreate() {
            if (!lazyloadWatched) {
                watchLazyload();
            }
        },

        updated: function updated() {
            var el = this.$el;
            if (!el || el.nodeType !== 1) {
                return
            }
            if (this._rootId) {
                if (el.className.indexOf('weex-root') <= -1) {
                    el.classList.add('weex-root');
                    el.classList.add('weex-ct');
                    el.setAttribute('data-wx-root-id', this._rootId);
                }
            }

            var tagName = this.$options && this.$options._componentTag;
            var metaUp = weex._meta.updated;
            if (!metaUp[tagName]) {
                metaUp[tagName] = 0;
            }
            metaUp[tagName]++;
            // will check appearing when no other changes in latest 50ms.
            debouncedWatchAppear();
            /**
             * since the updating of component may affect the layout, the lazyloading should
             * be fired.
             */
            this._fireLazyload();
        },

        mounted: function mounted() {
            var tagName = this.$options && this.$options._componentTag;
            var el = this.$el;
            if (!el || el.nodeType !== 1) {
                return
            }
            if (typeof weex._components[tagName] !== 'undefined') {
                weex._components[tagName]++;
            }
            var metaMt = weex._meta.mounted;
            if (!metaMt[tagName]) {
                metaMt[tagName] = 0;
            }
            metaMt[tagName]++;

            watchAppearForScrollables(tagName, this);

            // when this is the root element of Vue instance.
            if (this === this.$root) {
                var rootId = "wx-root-" + (idCnt++);
                if (!weex._root) {
                    weex._root = {};
                }
                weex._root[rootId] = this;
                this._rootId = rootId;
                if (el.nodeType !== 1) {
                    return
                }
                el.classList.add('weex-root');
                el.classList.add('weex-ct');
                el.setAttribute('data-wx-root-id', rootId);

                /**
                 * there's no scrollable component in this page. That is to say,
                 * the page is using body scrolling instead of scrollabe components.
                 * Then the appear watcher should be attached on the body.
                 */
                if (!appearWatched) {
                    appearWatched = this;
                    watchAppear(this, true);
                }

                this._fireLazyload(el);
            }

            // give warning for not using $processStyle in vue-loader config.
            // if (!warned && !window._style_processing_added) {
            //   warnProcessStyle()
            // }
        },

        destroyed: function destroyed() {
            var el = this.$el;
            if (!el || el.nodeType !== 1) {
                return
            }
            /**
             * if the destroyed element is above another panel with images inside, and the images
             * moved into the viewport, then the lazyloading should be triggered.
             */
            if (this._rootId) {
                delete weex._root[this._rootId];
                delete this._rootId;
            }
            var tagName = this.$options && this.$options._componentTag;
            if (typeof weex._components[tagName] !== 'undefined') {
                weex._components[tagName]--;
            }
            var metaDs = weex._meta.destroyed;
            if (!metaDs[tagName]) {
                metaDs[tagName] = 0;
            }
            metaDs[tagName]++;
            this._fireLazyload();
        },

        methods: {
            _fireLazyload: function _fireLazyload(el) {
                getThrottleLazyload(25, el || document.body)();
            }
        }
    }

    var event$1 = {
        methods: {
            // deprecated.
            $stopOutterA: function $stopOutterA(e) {
                return this.$stopOuterA(e)
            },

            $stopOuterA: function $stopOuterA(e) {
                if (e && e.preventDefault && e.target) {
                    if (insideA(e.target)) {
                        e.preventDefault();
                    }
                }
            },

            $stopPropagation: function $stopPropagation(e) {
                if (e && e.stopPropagation) {
                    e.stopPropagation();
                }
            }
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    var bindingStyleNamesForPx2Rem$1 = config.bindingStyleNamesForPx2Rem;

    var style = {
        methods: {
            _px2rem: function _px2rem(value, rootValue) {
                var this$1 = this;

                if (typeof value === 'string') {
                    return (value + '').replace(/[+-]?\d+(?:.\d*)?[pw]x/gi, function ($0) {
                        return weex.utils.px2rem($0, rootValue)
                    })
                }
                if (typeof value === 'number') {
                    return weex.utils.px2rem(value + '', rootValue)
                }
                if (isPlainObject(value)) {
                    for (var k in value) {
                        if (
                            value.hasOwnProperty(k)
                            && bindingStyleNamesForPx2Rem$1.indexOf(k) > -1
                        ) {
                            value[k] = weex.utils.px2rem(value[k] + '', rootValue);
                        }
                    }
                    return value
                }
                if (isArray(value)) {
                    for (var i = 0, l = value.length; i < l; i++) {
                        this$1._px2rem(value[i], rootValue);
                    }
                    return value
                }
            },

            _processExclusiveStyle: function _processExclusiveStyle(styleObj, rootValue, tagName) {
                var transformer = getTransformer_1(tagName);
                return this._px2rem(
                    transformer.transform(styleObj),
                    rootValue
                )
            },

            _getParentRect: function _getParentRect() {
                var el = this.$el;
                var parent = el && el.parentElement;
                return parent && parent.getBoundingClientRect()
            }
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// input and textare has some common api and event
    var findEnterKeyType = function (key) {
        var keys = ['default', 'go', 'next', 'search', 'send'];
        if (keys.indexOf(key) > -1) {
            return key
        }
        return 'done'
    };

    var inputCommon = {
        methods: {
            focus: function focus() {
                this.$el && this.$el.focus();
            },
            blur: function blur() {
                this.$el && this.$el.blur();
            },

            setSelectionRange: function setSelectionRange(start, end) {
                try {
                    this.$el.setSelectionRange(start, end);
                } catch (e) {

                }
            },

            getSelectionRange: function getSelectionRange(callback) {
                try {
                    var selection = window.getSelection();
                    var str = selection.toString();
                    var selectionStart = this.$el.value.indexOf(str);
                    var selectionEnd = selectionStart === -1 ? selectionStart : selectionStart + str.length;
                    callback && callback({
                        selectionStart: selectionStart,
                        selectionEnd: selectionEnd
                    });
                } catch (e) {
                    callback && callback(new Error('[vue-render] getSelection is not supported.'));
                }
            },

            getEditSelectionRange: function getEditSelectionRange(callback) {
                this.getSelectionRange(callback);
            },

            // support enter key event
            createKeyboardEvent: function createKeyboardEvent(events) {
                var customKeyType = this.returnKeyType;
                if (customKeyType) {
                    var keyboardEvents = {
                        'keyup': function (ev) {
                            var code = ev.keyCode;
                            var key = ev.key;
                            if (code === 13) {
                                if (!key || key.toLowerCase() === 'tab') {
                                    key = 'next';
                                }
                                dispatchNativeEvent(ev.target, 'return', {
                                    key: key,
                                    returnKeyType: findEnterKeyType(customKeyType),
                                    value: ev.target.value
                                });
                            }
                        }
                    };
                    events = extend(events, keyboardEvents);
                }
                return events
            }
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    var sticky = {
        destroyed: function destroyed() {
            if (!this._stickyAdded) {
                return
            }
            var scroller = getParentScroller(this);
            if (!scroller) {
                return
            }
            delete scroller._stickyChildren[this._uid];
        },

        methods: {
            _addSticky: function _addSticky() {
                var el = this.$el;
                if (!el || el.nodeType === 1) {
                    return
                }
                el.classList.add('sticky');
                if (!this._placeholder) {
                    this._placeholder = el.cloneNode(true);
                }
                this._placeholder.style.display = 'block';
                this._placeholder.style.width = this.$el.offsetWidth + 'px';
                this._placeholder.style.height = this.$el.offsetHeight + 'px';
                el.parentNode.insertBefore(this._placeholder, this.$el);
            },

            _removeSticky: function _removeSticky() {
                var el = this.$el;
                if (!el || el.nodeType === 1) {
                    return
                }
                el.classList.remove('sticky');
                if (this._placeholder) {
                    this._placeholder.parentNode.removeChild(this._placeholder);
                }
                this._placeholder = null;
            }
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    window.global = window;
    window.weex = weex$4;

    weex$4._styleMap = {};
    ['getComponentInlineStyle',
        'extractComponentStyle',
        'mapNativeEvents',
        'trimTextVNodes']
        .forEach(function (method) {
            console.log("--method--",method);
            weex$4[method] = core[method].bind(weex$4);
        });

    weex$4.mixins = {
        inputCommon: inputCommon
    };

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    var _inited$1 = false;

    var renderFunctionPlugin = {
        init: function init(weex) {
            if (_inited$1) {
                return
            }
            _inited$1 = true;
            var Vue = weex.__vue__;
            var _render = Vue.prototype._render;
            Vue.prototype._render = function () {
                var weexRender = this._weexRender;
                var tag = this.$options && this.$options._componentTag;
                if (
                    !weexRender
                    && !isDef(weex._components[tag])
                ) {
                    var origRender = this.$options.render;
                    weexRender = this._weexRender = function (h) {
                        var args = [], len = arguments.length - 1;
                        while (len-- > 0) args[len] = arguments[len + 1];

                        return origRender.call.apply(origRender, [this, transformRender(this, h)].concat(args))
                    };
                    this.$options.render = weexRender;
                }
                return _render.call(this)
            };
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    if (global.Vue) {
        setVue(global.Vue);
    }

    function setVue(vue) {
        if (!vue) {
            throw new Error('[Vue Render] Vue not found. Please make sure vue 2.x runtime is imported.')
        }
        if (global.weex.__vue__) {
            return
        }
        global.weex.__vue__ = vue;
        weex.install(renderFunctionPlugin);
        console.log(("[Vue Render] install Vue " + (vue.version) + "."));
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    /**
     * init weex.
     * @param  {Vue$2} Vue: Vue Constructor.
     * @param  {object} options: extend weex plugins.
     *         - components.
     *         - modules.
     */
    var _inited = false;

    function init(Vue/* options = {}*/) {
        if (_inited) {
            return
        }
        _inited = true;

        setVue(Vue);

        Vue.prototype.$getConfig = function () {
            console.warn('[Vue Render] "this.$getConfig" is deprecated, please use "weex.config" instead.');
            return weex.config
        };

        var htmlRegex = /^html:/i;
        Vue.config.isReservedTag = function (tag) {
            return htmlRegex.test(tag);
        };
        Vue.config.parsePlatformTagName = function (tag) {
            return tag.replace(htmlRegex, '');
        };

        function isWeexTag(tag) {
            return typeof weex._components[tag] !== 'undefined'
        }

        var oldGetTagNamespace = Vue.config.getTagNamespace;
        Vue.config.getTagNamespace = function (tag) {
            if (isWeexTag(tag)) {
                return
            }
            return oldGetTagNamespace(tag)
        };
        console.log("-------------------",style);
        Vue.mixin(base);
        Vue.mixin(event$1);
        Vue.mixin(style);
        Vue.mixin(sticky);
    }

// auto init in dist mode.
    if (typeof window !== 'undefined' && window.Vue) {
        init(window.Vue);
    }

    weex.init = init;

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    var DEFAULT_OFFSET_ACCURACY = 10;
    var DEFAULT_LOADMORE_OFFSET = 0;

    function getThrottledScroll(context) {
        var scale = weex.config.env.scale;
        if (!context._throttleScroll) {
            var wrapper = context.$refs.wrapper;
            var inner = context.$refs.inner;
            var preOffset = (context.scrollDirection === 'horizontal'
                ? wrapper.scrollLeft
                : wrapper.scrollTop)
                || 0;
            context._throttleScroll = weex.utils.throttle(function (evt) {
                var offset = context.scrollDirection === 'horizontal'
                    ? wrapper.scrollLeft
                    : wrapper.scrollTop;
                var indent = parseInt(context.offsetAccuracy) * scale;

                function triggerScroll() {
                    var rect = inner.getBoundingClientRect();
                    var evtObj = {
                        contentSize: {width: rect.width, height: rect.height},
                        contentOffset: {
                            x: wrapper.scrollLeft,
                            /**
                             * positive direciton for y-axis is down.
                             * so should use negative operation on scrollTop.
                             *
                             *  (0,0)---------------> x
                             *       |
                             *       |
                             *       |
                             *       |
                             *       v y
                             *
                             */
                            y: -wrapper.scrollTop
                        }
                    };
                    if (context.$el) {
                        weex.utils.dispatchNativeEvent(context.$el, 'weex$scroll', evtObj);
                    }
                }

                if (Math.abs(offset - preOffset) >= indent) {
                    triggerScroll();
                    preOffset = offset;
                }
            }, 16, true);
        }
        return context._throttleScroll
    }

    var scrollable$1 = {
        props: {
            loadmoreoffset: {
                type: [String, Number],
                default: DEFAULT_LOADMORE_OFFSET,
                validator: function validator(value) {
                    var val = parseInt(value);
                    return !isNaN(val) && val >= DEFAULT_LOADMORE_OFFSET
                }
            },

            offsetAccuracy: {
                type: [Number, String],
                default: DEFAULT_OFFSET_ACCURACY,
                validator: function validator(value) {
                    var val = parseInt(value);
                    return !isNaN(val) && val >= DEFAULT_OFFSET_ACCURACY
                }
            }
        },

        created: function created() {
            // should call resetLoadmore() to enable loadmore event.
            this._loadmoreReset = true;
        },

        mounted: function mounted() {
            this.reloadStickyChildren();
        },

        updated: function updated() {
            this.reloadStickyChildren();
        },

        methods: {
            updateLayout: function updateLayout() {
                var wrapper = this.$refs.wrapper;
                if (wrapper) {
                    var rect = wrapper.getBoundingClientRect();
                    this._wrapperWidth = rect.width;
                    this._wrapperHeight = rect.height;
                }
                var inner = this.$refs.inner;
                var children = inner && inner.children;
                if (inner) {
                    var rect$1 = inner.getBoundingClientRect();
                    this._innerWidth = rect$1.width;
                    this._innerHeight = rect$1.height;
                }
                var loadingEl = this._loading && this._loading.$el;
                var refreshEl = this._refresh && this._refresh.$el;
                if (loadingEl) {
                    this._innerHeight -= loadingEl.getBoundingClientRect().height;
                }
                if (refreshEl) {
                    this._innerHeight -= refreshEl.getBoundingClientRect().height;
                }
                // inner width is always the viewport width somehow in horizontal
                // scoller, therefore the inner width should be reclaculated.
                if (this.scrollDirection === 'horizontal' && children) {
                    this._innerWidth = weex.utils.getRangeWidth(inner);
                }
            },

            resetLoadmore: function resetLoadmore() {
                this._loadmoreReset = true;
            },

            /**
             * process sticky children in scrollable components.
             * current only support list and vertical scroller.
             */
            processSticky: function processSticky() {
                var this$1 = this;

                /**
                 * current browser support 'sticky' or '-webkit-sticky', so there's no need
                 * to do further more.
                 */
                var stickyChildren = this._stickyChildren;
                var len = stickyChildren && stickyChildren.length || 0;
                if (len <= 0) {
                    return
                }

                var origSticky = weex.utils.supportSticky();
                // current only support list and vertical scroller.
                if (this.scrollDirection === 'horizontal') {
                    return
                }

                var container = this.$el;
                if (!container) {
                    return
                }
                var scrollTop = container.scrollTop;

                var stickyChild;
                for (var i = 0; i < len; i++) {
                    stickyChild = stickyChildren[i];
                    if (origSticky) {
                        this$1.addSticky(stickyChild, origSticky);
                    } else if (stickyChild._initOffsetTop < scrollTop) {
                        this$1.addSticky(stickyChild);
                    } else {
                        this$1.removeSticky(stickyChild);
                    }
                }
            },

            addSticky: function addSticky(el, supportSticky) {
                if (supportSticky) {
                    el.classList.add('weex-ios-sticky');
                } else {
                    if (el._sticky === true) {
                        return
                    }
                    el._sticky = true;
                    if (!el._placeholder) {
                        var placeholder = el.cloneNode(true);
                        placeholder._origNode = el;
                        placeholder.classList.add('weex-sticky-placeholder');
                        el._placeholder = placeholder;
                    }
                    el.parentNode.insertBefore(el._placeholder, el);
                    el.style.width = window.getComputedStyle(el).width;
                    el.classList.add('weex-sticky');
                }
            },

            removeSticky: function removeSticky(el) {
                if (
                    typeof el._sticky === 'undefined'
                    || el._sticky === false
                ) {
                    return
                }
                el._sticky = false;
                el.parentNode.removeChild(el._placeholder);
                el.classList.remove('weex-sticky');
            },

            reloadStickyChildren: function reloadStickyChildren() {
                var container = this.$el;
                if (!container) {
                    return
                }
                var stickyChildren = [];
                var children = container.querySelectorAll('[sticky]');
                for (var i = 0, l = children.length; i < l; i++) {
                    var child = children[i];
                    if (/weex-sticky-placeholder/.test(child.className)) {  // is a placeholder.
                        var origNode = child._origNode;
                        if (
                            !origNode
                            || !origNode.parentNode
                            || origNode.parentNode !== child.parentNode
                        ) {
                            child.parentNode.removeChild(child);
                        }
                    } else {  // is a sticky node.
                        stickyChildren.push(child);
                        if (!child._sticky) {
                            child._initOffsetTop = child.offsetTop;
                        }
                    }
                }
                this._stickyChildren = stickyChildren;
            },

            handleScroll: function handleScroll(event) {
                weex.utils.getThrottleLazyload(25, this.$el, 'scroll')();
                getThrottledScroll(this)(event);

                this.processSticky();

                // fire loadmore event.
                var inner = this.$refs.inner;
                if (inner) {
                    var innerLength = this.scrollDirection === 'horizontal'
                        ? this._innerWidth
                        : this._innerHeight;
                    if (!this._innerLength) {
                        this._innerLength = innerLength;
                    }
                    if (this._innerLength !== innerLength) {
                        this._innerLength = innerLength;
                        this._loadmoreReset = true;
                    }
                    if (this._loadmoreReset && this.reachBottom(this.loadmoreoffset)) {
                        this._loadmoreReset = false;
                        var el = this.$el;
                        if (el) {
                            weex.utils.dispatchNativeEvent(el, 'loadmore');
                        }
                    }
                }
            },

            reachTop: function reachTop() {
                var wrapper = this.$refs.wrapper;
                return (!!wrapper) && (wrapper.scrollTop <= 0)
            },

            reachBottom: function reachBottom(offset) {
                var wrapper = this.$refs.wrapper;
                var inner = this.$refs.inner;
                offset = parseInt(offset || 0) * weex.config.env.scale;

                if (wrapper && inner) {
                    var key = this.scrollDirection === 'horizontal'
                        ? 'width'
                        : 'height';
                    var innerLength = this[("_inner" + (key[0].toUpperCase()) + (key.substr(1)))];
                    var wrapperLength = this[("_wrapper" + (key[0].toUpperCase()) + (key.substr(1)))];
                    var scrollOffset = this.scrollDirection === 'horizontal'
                        ? wrapper.scrollLeft
                        : wrapper.scrollTop;
                    return scrollOffset >= innerLength - wrapperLength - offset
                }
                return false
            },

            handleTouchStart: function handleTouchStart(event) {
                if (this._loading || this._refresh) {
                    var touch = event.changedTouches[0];
                    this._touchParams = {
                        reachTop: this.reachTop(),
                        reachBottom: this.reachBottom(),
                        startTouchEvent: touch,
                        startX: touch.pageX,
                        startY: touch.pageY,
                        timeStamp: event.timeStamp
                    };
                }
            },

            handleTouchMove: function handleTouchMove(event) {
                if (!this._touchParams || !this._refresh && !this._loading) {
                    return
                }
                var inner = this.$refs.inner;
                var ref = this._touchParams;
                var startY = ref.startY;
                var reachTop = ref.reachTop;
                var reachBottom = ref.reachBottom;
                if (inner) {
                    var touch = event.changedTouches[0];
                    var offsetY = touch.pageY - startY;
                    var dir = offsetY > 0 ? 'down' : 'up';
                    this._touchParams.offsetY = offsetY;
                    if (this._refresh && (dir === 'down') && reachTop) {
                        this._refresh.pullingDown(offsetY);
                    } else if (this._loading && (dir === 'up') && reachBottom) {
                        this._loading.pullingUp(-offsetY);
                    }
                }
            },

            handleTouchEnd: function handleTouchEnd(event) {
                if (!this._touchParams || !this._refresh && !this._loading) {
                    return
                }
                var inner = this.$refs.inner;
                var ref = this._touchParams;
                var startY = ref.startY;
                var reachTop = ref.reachTop;
                var reachBottom = ref.reachBottom;
                if (inner) {
                    var touch = event.changedTouches[0];
                    var offsetY = touch.pageY - startY;
                    var dir = offsetY > 0 ? 'down' : 'up';
                    this._touchParams.offsetY = offsetY;
                    if (this._refresh && (dir === 'down') && reachTop) {
                        this._refresh.pullingEnd();
                    } else if (this._loading && (dir === 'up') && reachBottom) {
                        this._loading.pullingEnd();
                    }
                }
                delete this._touchParams;
            }
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    function getList(weex) {
        var extractComponentStyle = weex.extractComponentStyle;

        return {
            name: 'weex-list',
            mixins: [scrollable$1],
            computed: {
                wrapperClass: function wrapperClass() {
                    var classArray = ['weex-list', 'weex-list-wrapper', 'weex-ct'];
                    this._refresh && classArray.push('with-refresh');
                    this._loading && classArray.push('with-loading');
                    return classArray.join(' ')
                }
            },

            methods: {
                createChildren: function createChildren(h) {
                    var slots = this.$slots.default || [];
                    this._cells = slots.filter(function (vnode) {
                        if (!vnode.tag && !vnode.componentOptions) {
                            return false
                        }
                        return true
                    });
                    return [
                        h('article', {
                            ref: 'inner',
                            staticClass: 'weex-list-inner weex-ct'
                        }, this._cells)
                    ]
                }
            },

            render: function render(createElement) {
                var this$1 = this;

                this.weexType = 'list';

                this.$nextTick(function () {
                    this$1.updateLayout();
                });

                return createElement('main', {
                    ref: 'wrapper',
                    attrs: {'weex-type': 'list'},
                    staticClass: this.wrapperClass,
                    on: {
                        scroll: this.handleScroll,
                        touchstart: this.handleTouchStart,
                        touchmove: this.handleTouchMove,
                        touchend: this.handleTouchEnd
                    },
                    staticStyle: extractComponentStyle(this)
                }, this.createChildren(createElement))
            }
        }
    }

    var list = {
        init: function init(weex) {
            weex.registerComponent('list', getList(weex));
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    function getScroller(weex) {
        var extractComponentStyle = weex.extractComponentStyle;

        return {
            name: 'weex-scroller',
            mixins: [scrollable$1],
            props: {
                scrollDirection: {
                    type: [String],
                    default: 'vertical',
                    validator: function validator(value) {
                        return ['horizontal', 'vertical'].indexOf(value) !== -1
                    }
                },
                scrollable: {
                    type: [Boolean],
                    default: true
                }
            },
            computed: {
                wrapperClass: function wrapperClass() {
                    var classArray = ['weex-scroller', 'weex-scroller-wrapper', 'weex-ct'];
                    if (this.scrollDirection === 'horizontal') {
                        classArray.push('weex-scroller-horizontal');
                    } else {
                        classArray.push('weex-scroller-vertical');
                    }
                    if (!this.scrollable) {
                        classArray.push('weex-scroller-disabled');
                    }
                    return classArray.join(' ')
                }
            },

            methods: {
                createChildren: function createChildren(h) {
                    var slots = this.$slots.default || [];
                    this._cells = slots.filter(function (vnode) {
                        if (!vnode.tag && !vnode.componentOptions) {
                            return false
                        }
                        return true
                    });
                    return [
                        h('article', {
                            ref: 'inner',
                            staticClass: 'weex-scroller-inner weex-ct'
                        }, this._cells)
                    ]
                }
            },

            render: function render(createElement) {
                var this$1 = this;

                this.weexType = 'scroller';

                /* istanbul ignore next */
                // if ("production" === 'development') {
                //   validateStyles('scroller', this.$vnode.data && this.$vnode.data.staticStyle)
                // }

                this._cells = this.$slots.default || [];
                this.$nextTick(function () {
                    this$1.updateLayout();
                });

                return createElement('main', {
                    ref: 'wrapper',
                    attrs: {'weex-type': 'scroller'},
                    on: {
                        scroll: this.handleScroll,
                        touchstart: this.handleTouchStart,
                        touchmove: this.handleTouchMove,
                        touchend: this.handleTouchEnd
                    },
                    staticClass: this.wrapperClass,
                    staticStyle: extractComponentStyle(this)
                }, this.createChildren(createElement))
            }
        }
    }

    var scroller = {
        init: function init(weex) {
            weex.registerComponent('scroller', getScroller(weex));
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND,  either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    /**
     * @fileoverview waterfall
     * NOTE: only support full screen width waterfall.
     */

    var NORMAL_GAP_SIZE = 32;
    var DEFAULT_COLUMN_COUNT = 1;

    function getWaterfall(weex) {
        var extractComponentStyle = weex.extractComponentStyle;

        return {
            name: 'weex-waterfall',
            mixins: [scrollable$1],
            props: {
                /**
                 * specified gap size.
                 * value can be number or 'normal'. 'normal' (32px) by default.
                 */
                columnGap: {
                    type: [String, Number],
                    default: 'normal',
                    validator: function validator(val) {
                        if (!val || val === 'normal') {
                            return true
                        }
                        val = parseInt(val);
                        return !isNaN(val) && val > 0
                    }
                },
                /**
                 * the maximum column counts.
                 * value can be number or 'auto'. 1 by default.
                 */
                columnCount: {
                    type: [String, Number],
                    default: DEFAULT_COLUMN_COUNT,
                    validator: function validator(val) {
                        val = parseInt(val);
                        return !isNaN(val) && val > 0
                    }
                },
                /**
                 * the mimimum column width.
                 * value can be number or 'auto'. 'auto' by default.
                 */
                columnWidth: {
                    type: [String, Number],
                    default: 'auto',
                    validator: function validator(val) {
                        if (!val || val === 'auto') {
                            return true
                        }
                        val = parseInt(val);
                        return !isNaN(val) && val > 0
                    }
                }
            },

            mounted: function mounted() {
                this._nextTick();
            },

            updated: function updated() {
                this.$nextTick(this._nextTick());
            },

            methods: {
                _createChildren: function _createChildren(h, rootStyle) {
                    var this$1 = this;

                    var slots = (this.$slots.default || []).slice();
                    this._headers = [];
                    this._footers = [];
                    this._others = [];
                    var len = slots.length;

                    for (var i = 0; i < len; i++) {
                        var vnode = slots[i];
                        var tag =
                            vnode.componentOptions
                            && vnode.componentOptions.tag
                            || vnode.tag;
                        if (tag === 'refresh' || tag === 'loading') {
                            continue
                        }
                        if (tag === 'section') {  // cell
                            break
                        }
                        if (tag === 'header') {
                            this$1._headers.push(vnode);
                            slots[i] = null; // should not included in footer.
                        }
                    }

                    for (var i$1 = len - 1; i$1 >= 0; i$1--) {
                        var vnode$1 = slots[i$1];
                        if (!vnode$1) {
                            continue
                        }  // already taken by header.
                        var tag$1 =
                            vnode$1.componentOptions
                            && vnode$1.componentOptions.tag
                            || vnode$1.tag;
                        if (tag$1 === 'refresh' || tag$1 === 'loading') {
                            continue
                        }
                        if (tag$1 === 'section') { // cell
                            break
                        }
                        if (tag$1 === 'header') {
                            this$1._footers.push(vnode$1);
                        }
                    }

                    this._cells = slots.filter(function (vnode) {
                        if (!vnode) {
                            return false
                        }
                        var cmpOpts = vnode.componentOptions;
                        if (!vnode.tag && !cmpOpts) {
                            return false
                        }
                        var tag = cmpOpts && cmpOpts.tag || vnode.tag;
                        if (tag === 'refresh' || tag === 'loading') {
                            this$1[("_" + tag)] = vnode;
                            return false
                        }
                        if (tag !== 'section') {
                            this$1._others.push(vnode);
                            return false
                        }
                        return true
                    });

                    this._reCalc(rootStyle);
                    this._genColumns(h);
                    var children = [];
                    this._refresh && children.push(this._refresh);
                    children = children.concat(this._headers);
                    // .concat(this._others)
                    children.push(h('html:div', {
                        ref: 'columns',
                        staticClass: 'weex-waterfall-inner-columns weex-ct'
                    }, this._columns));
                    children.push(h('html:div', {
                        ref: 'footers',
                        staticClass: 'weex-waterfall-footers weex-ct'
                    }, this._footers));
                    this._loading && children.push(this._loading);
                    return [
                        h('article', {
                            ref: 'inner',
                            staticClass: 'weex-waterfall-inner weex-ct'
                        }, children)
                    ]
                },

                _reCalc: function _reCalc(rootStyle) {
                    /**
                     * NOTE: columnGap and columnWidth can't both be auto.
                     * NOTE: the formula:
                     *  totalWidth = n * w + (n - 1) * gap
                     * 1. if columnCount = n then calc w
                     * 2. if columnWidth = w then calc n
                     * 3. if columnWidth = w and columnCount = n then calc totalWidth
                     *    3.1 if totalWidth < ctWidth then increase columnWidth
                     *    3.2 if totalWidth > ctWidth then decrease columnCount
                     */
                    var width, gap, cnt, ctWidth;
                    var scale = weex.config.env.scale;
                    var el = this.$el;

                    function getCtWidth(width, style) {
                        var padding = style.padding
                            ? parseInt(style.padding) * 2
                            : parseInt(style.paddingLeft || 0) + parseInt(style.paddingRight || 0);
                        return width - padding
                    }

                    if (el && el.nodeType === 1) { // already mounted
                        var cstyle = window.getComputedStyle(el);
                        ctWidth = getCtWidth(el.getBoundingClientRect().width, cstyle);
                    } else { // not mounted.
                        // only support full screen width for waterfall component.
                        ctWidth = getCtWidth(document.documentElement.clientWidth, rootStyle);
                    }

                    gap = this.columnGap;
                    if (gap && gap !== 'normal') {
                        gap = parseInt(gap);
                    } else {
                        gap = NORMAL_GAP_SIZE;
                    }
                    gap = gap * scale;

                    width = this.columnWidth;
                    cnt = this.columnCount;
                    if (width && width !== 'auto') {
                        width = parseInt(width) * scale;
                    }
                    if (cnt && cnt !== 'auto') {
                        cnt = parseInt(cnt);
                    }

                    // 0. if !columnCount && !columnWidth
                    if (cnt === 'auto' && width === 'auto') {

                    }
                    // 1. if columnCount = n then calc w.
                    else if (cnt !== 'auto' && width === 'auto') {
                        width = (ctWidth - (cnt - 1) * gap) / cnt;
                    }
                    // 2. if columnWidth = w then calc n.
                    else if (cnt === 'auto' && width !== 'auto') {
                        cnt = (ctWidth + gap) / (width + gap);
                    }
                    // 3. if columnWidth = w and columnCount = n then calc totalWidth
                    else if (cnt !== 'auto' && width !== 'auto') {
                        var totalWidth;
                        var adjustCountAndWidth = function () {
                            totalWidth = cnt * width + (cnt - 1) * gap;
                            if (totalWidth < ctWidth) {
                                width += (ctWidth - totalWidth) / cnt;
                            } else if (totalWidth > ctWidth && cnt > 1) {
                                cnt--;
                                adjustCountAndWidth();
                            } else if (totalWidth > ctWidth) {  // cnt === 1
                                width = ctWidth;
                            }
                        };
                        adjustCountAndWidth();
                    }
                    this._columnCount = cnt;
                    this._columnWidth = width;
                    this._columnGap = gap;
                },

                _genColumns: function _genColumns(createElement) {
                    var this$1 = this;

                    this._columns = [];
                    var cells = this._cells;
                    var columnCnt = this._columnCount;
                    var len = cells.length;
                    var columnCells = this._columnCells = Array(columnCnt).join('.').split('.').map(function () {
                        return []
                    });
                    // spread cells to the columns using simpole polling algorithm.
                    for (var i = 0; i < len; i++) {
                        (cells[i].data.attrs || (cells[i].data.attrs = {}))['data-cell'] = i;
                        columnCells[i % columnCnt].push(cells[i]);
                    }
                    for (var i$1 = 0; i$1 < columnCnt; i$1++) {
                        this$1._columns.push(createElement('html:div', {
                            ref: ("column" + i$1),
                            attrs: {
                                'data-column': i$1
                            },
                            staticClass: 'weex-ct',
                            staticStyle: {
                                width: this$1._columnWidth + 'px',
                                marginLeft: i$1 === 0 ? 0 : this$1._columnGap + 'px'
                            }
                        }, columnCells[i$1]));
                    }
                },

                _nextTick: function _nextTick() {
                    this._reLayoutChildren();
                },

                _reLayoutChildren: function _reLayoutChildren() {
                    var this$1 = this;

                    /**
                     * treat the shortest column bottom as the match standard.
                     * whichever cell exceeded it would be rearranged.
                     * 1. m = shortest column bottom.
                     * 2. get all cell ids who is below m.
                     * 3. calculate which cell should be in which column.
                     */
                    var columnCnt = this._columnCount;
                    var columnDoms = [];
                    var columnAppendFragments = [];
                    var columnBottoms = [];
                    var minBottom = Number.MAX_SAFE_INTEGER;
                    var minBottomColumnIndex = 0;

                    // 1. find the shortest column bottom.
                    for (var i = 0; i < columnCnt; i++) {
                        var columnDom = this$1._columns[i].elm;
                        var lastChild = columnDom.lastElementChild;
                        var bottom = lastChild ? lastChild.getBoundingClientRect().bottom : 0;
                        columnDoms.push(columnDom);
                        columnBottoms[i] = bottom;
                        columnAppendFragments.push(document.createDocumentFragment());
                        if (bottom < minBottom) {
                            minBottom = bottom;
                            minBottomColumnIndex = i;
                        }
                    }

                    // 2. get all cell ids who is below m.
                    var belowCellIds = [];
                    var belowCells = {};
                    for (var i$1 = 0; i$1 < columnCnt; i$1++) {
                        if (i$1 === minBottomColumnIndex) {
                            continue
                        }
                        var columnDom$1 = columnDoms[i$1];
                        var cellsInColumn = columnDom$1.querySelectorAll('section.weex-cell');
                        var len = cellsInColumn.length;
                        for (var j = len - 1; j >= 0; j--) {
                            var cellDom = cellsInColumn[j];
                            var cellRect = cellDom.getBoundingClientRect();
                            if (cellRect.top > minBottom) {
                                var id = ~~cellDom.getAttribute('data-cell');
                                belowCellIds.push(id);
                                belowCells[id] = {elm: cellDom, height: cellRect.height};
                                columnBottoms[i$1] -= cellRect.height;
                            }
                        }
                    }

                    // 3. calculate which cell should be in which column and rearrange them
                    //  in the dom tree.
                    belowCellIds.sort(function (a, b) {
                        return a > b
                    });
                    var cellIdsLen = belowCellIds.length;

                    function addToShortestColumn(belowCell) {
                        // find shortest bottom.
                        minBottom = Math.min.apply(Math, columnBottoms);
                        minBottomColumnIndex = columnBottoms.indexOf(minBottom);
                        var cellElm = belowCell.elm;
                        var cellHeight = belowCell.height;
                        columnAppendFragments[minBottomColumnIndex].appendChild(cellElm);
                        columnBottoms[minBottomColumnIndex] += cellHeight;
                    }

                    for (var i$2 = 0; i$2 < cellIdsLen; i$2++) {
                        addToShortestColumn(belowCells[belowCellIds[i$2]]);
                    }
                    for (var i$3 = 0; i$3 < columnCnt; i$3++) {
                        columnDoms[i$3].appendChild(columnAppendFragments[i$3]);
                    }
                }
            },

            render: function render(createElement) {
                var this$1 = this;

                this.weexType = 'waterfall';
                this._cells = this.$slots.default || [];
                this.$nextTick(function () {
                    this$1.updateLayout();
                });
                var mergedStyle = extractComponentStyle(this);
                return createElement('main', {
                    ref: 'wrapper',
                    attrs: {'weex-type': 'waterfall'},
                    on: {
                        scroll: this.handleScroll,
                        touchstart: this.handleTouchStart,
                        touchmove: this.handleTouchMove,
                        touchend: this.handleTouchEnd
                    },
                    staticClass: 'weex-waterfall weex-waterfall-wrapper weex-ct',
                    staticStyle: mergedStyle
                }, this._createChildren(createElement, mergedStyle))
            }
        }
    }

    var waterfall = {
        init: function init(weex) {
            weex.registerComponent('waterfall', getWaterfall(weex));
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    function getHeader(weex) {
        var extractComponentStyle = weex.extractComponentStyle;

        return {
            render: function render(createElement) {
                var attrs = this.$vnode.data.attrs;
                return createElement('html:header', {
                    attrs: {
                        'weex-type': 'header',
                        sticky: (
                            this.$parent.weexType === 'waterfall'
                            && typeof attrs.sticky === 'undefined'
                        ) ? undefined : ''
                    },
                    ref: 'header',
                    staticClass: 'weex-header weex-ct',
                    staticStyle: extractComponentStyle(this)
                }, this.$slots.default)
            }
        }
    }

    var header = {
        init: function init(weex) {
            weex.registerComponent('header', getHeader(weex));
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    function getLoading() {
        var extractComponentStyle = weex.extractComponentStyle;
        var ref = weex.utils;
        var dispatchNativeEvent = ref.dispatchNativeEvent;

        return {
            name: 'weex-loading',
            props: {
                display: {
                    type: String,
                    default: 'show',
                    validator: function validator(value) {
                        return ['show', 'hide'].indexOf(value) !== -1
                    }
                }
            },
            data: function data() {
                return {
                    height: -1,
                    viewHeight: 0
                }
            },
            mounted: function mounted() {
                this.viewHeight = this.$el.offsetHeight;
                if (this.display === 'hide') {
                    this.height = 0;
                } else {
                    this.height = this.viewHeight;
                }
            },
            watch: {
                height: function height(val) {
                    var offset = val + "px";
                    this.$el.style.height = offset;
                    this.$el.style.bottom = offset;
                },
                display: function display(val) {
                    if (val === 'hide') {
                        this.height = 0;
                    } else {
                        this.height = this.viewHeight;
                    }
                }
            },
            methods: {
                pulling: function pulling(offsetY) {
                    if (offsetY === void 0) offsetY = 0;

                    this.height = offsetY;
                },
                pullingUp: function pullingUp(offsetY) {
                    this.$el.style.transition = "height 0s";
                    this.pulling(offsetY);
                },
                pullingEnd: function pullingEnd() {
                    this.$el && (this.$el.style.transition = "height .2s");
                    if (this.height >= this.viewHeight) {
                        this.pulling(this.viewHeight);
                        if (this.$el) {
                            dispatchNativeEvent(this.$el, 'loading');
                        }
                    } else {
                        this.pulling(0);
                    }
                },
                getChildren: function getChildren() {
                    var children = this.$slots.default || [];
                    if (this.display === 'show') {
                        return children
                    }
                    return children.filter(function (vnode) {
                        return !(vnode.componentOptions
                            && vnode.componentOptions.tag === 'loading-indicator')
                    })
                }
            },
            render: function render(createElement) {
                this.$parent._loading = this;
                return createElement('aside', {
                    ref: 'loading',
                    attrs: {'weex-type': 'loading'},
                    staticClass: 'weex-loading weex-ct',
                    staticStyle: extractComponentStyle(this)
                }, this.getChildren())
            }
        }
    }

    var loading = {
        init: function init(weex) {
            weex.registerComponent('loading', getLoading(weex));
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    function getRefresh(weex) {
        var extractComponentStyle = weex.extractComponentStyle;
        var ref = weex.utils;
        var dispatchNativeEvent = ref.dispatchNativeEvent;

        return {
            name: 'weex-refresh',
            props: {
                display: {
                    type: String,
                    default: 'show',
                    validator: function validator(value) {
                        return ['show', 'hide'].indexOf(value) !== -1
                    }
                }
            },
            data: function data() {
                return {
                    lastDy: 0,
                    viewHeight: 0,
                    height: -1
                }
            },
            mounted: function mounted() {
                this.viewHeight = this.$el.offsetHeight;
                if (this.display === 'hide') {
                    this.height = 0;
                } else {
                    this.height = this.viewHeight;
                }
            },
            watch: {
                height: function height(val) {
                    this.$el.style.height = val + "px";
                },
                display: function display(val) {
                    if (val === 'hide') {
                        this.height = 0;
                    } else {
                        this.height = this.viewHeight;
                    }
                }
            },
            methods: {
                pulling: function pulling(offsetY) {
                    if (offsetY === void 0) offsetY = 0;

                    this.height = offsetY;
                    if (this.$el) {
                        dispatchNativeEvent(this.$el, 'pullingdown', {
                            dy: offsetY - this.lastDy,
                            pullingDistance: offsetY,
                            viewHeight: this.viewHeight
                        });
                    }
                    this.lastDy = offsetY;
                },
                pullingDown: function pullingDown(offsetY) {
                    this.$el.style.transition = "height 0s";
                    this.pulling(offsetY);
                },
                pullingEnd: function pullingEnd() {
                    this.$el && (this.$el.style.transition = "height .2s");
                    if (this.height >= this.viewHeight) {
                        this.pulling(this.viewHeight);
                        if (this.$el) {
                            dispatchNativeEvent(this.$el, 'refresh');
                        }
                    } else {
                        this.pulling(0);
                    }
                },
                getChildren: function getChildren() {
                    var children = this.$slots.default || [];
                    if (this.display === 'show') {
                        return children
                    }
                    return children.filter(function (vnode) {
                        return !(vnode.componentOptions
                            && vnode.componentOptions.tag === 'loading-indicator')
                    })
                }
            },
            render: function render(createElement) {
                this.$parent._refresh = this;
                return createElement('aside', {
                    ref: 'refresh',
                    attrs: {'weex-type': 'refresh'},
                    staticClass: 'weex-refresh weex-ct',
                    staticStyle: extractComponentStyle(this)
                }, this.getChildren())
            }
        }
    }

    var refresh = {
        init: function init(weex) {
            weex.registerComponent('refresh', getRefresh(weex));
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    var extractComponentStyle$1;
    var getRgb$1;
    var loopArray$1;
    var getStyleSheetById$1;

    var _css = "\n.weex-refresh-indicator,\n.weex-loading-indicator {\n  width: 1rem !important;\n  height: 1rem !important;\n  -webkit-box-align: center;\n  -moz-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  overflow: visible;\n  background: none;\n}\n.weex-refresh-indicator:before,\n.weex-loading-indicator:before {\n  display: block;\n  content: '';\n  font-size: 0.16rem;\n  width: 0.5em;\n  height: 0.5em;\n  left: 0;\n  top: 0;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-animation: weex-spinner 1.1s infinite ease;\n  -moz-animation: weex-spinner 1.1s infinite ease;\n  animation: weex-spinner 1.1s infinite ease;\n}\n\n@-webkit-keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -1.3em 0em 0em #ffffff, 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.5), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  11.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.7), 0.9em -0.9em 0 0em #ffffff, 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.5), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7), 1.25em 0em 0 0em #ffffff, 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5), 1.25em 0em 0 0em rgba(255, 255, 255, 0.7), 0.875em 0.875em 0 0em #ffffff, 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.5), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.7), 0em 1.25em 0 0em #ffffff, -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  61.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.5), 0em 1.25em 0 0em rgba(255, 255, 255, 0.7), -0.9em 0.9em 0 0em #ffffff, -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.5), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.7), -1.3em 0em 0 0em #ffffff, -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.5), -1.3em 0em 0 0em rgba(255, 255, 255, 0.7), -0.9em -0.9em 0 0em #ffffff;\n  }\n}\n\n@keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -1.3em 0em 0em #ffffff, 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.5), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  11.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.7), 0.9em -0.9em 0 0em #ffffff, 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.5), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7), 1.25em 0em 0 0em #ffffff, 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5), 1.25em 0em 0 0em rgba(255, 255, 255, 0.7), 0.875em 0.875em 0 0em #ffffff, 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.5), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.7), 0em 1.25em 0 0em #ffffff, -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  61.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.5), 0em 1.25em 0 0em rgba(255, 255, 255, 0.7), -0.9em 0.9em 0 0em #ffffff, -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.5), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.7), -1.3em 0em 0 0em #ffffff, -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.5), -1.3em 0em 0 0em rgba(255, 255, 255, 0.7), -0.9em -0.9em 0 0em #ffffff;\n  }\n}\n";

    function getStyleSheet(spinnerVm) {
        if (spinnerVm._styleSheet) {
            return
        }
        spinnerVm._styleSheet = getStyleSheetById$1('weex-cmp-loading-indicator');
    }

    function setKeyframeColor(spinnerVm, val) {
        getStyleSheet(spinnerVm);
        var keyframeRules = computeKeyFrameRules(val);
        var rules = spinnerVm._styleSheet.rules || spinnerVm._styleSheet.cssRules;
        for (var i = 0, l = rules.length; i < l; i++) {
            var item = rules.item(i);
            if ((item.type === CSSRule.KEYFRAMES_RULE
                || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE)
                && item.name === 'weex-spinner') {
                var cssRules = item.cssRules;
                for (var j = 0, m = cssRules.length; j < m; j++) {
                    var keyframe = cssRules[j];
                    if (keyframe.type === CSSRule.KEYFRAME_RULE
                        || keyframe.type === CSSRule.WEBKIT_KEYFRAME_RULE) {
                        keyframe.style.boxShadow = keyframeRules[j];
                    }
                }
            }
        }
    }

    function computeKeyFrameRules(rgb) {
        if (!rgb) {
            return
        }
        var scaleArr = [
            '0em -1.3em 0em 0em',
            '0.9em -0.9em 0 0em',
            '1.25em 0em 0 0em',
            '0.875em 0.875em 0 0em',
            '0em 1.25em 0 0em',
            '-0.9em 0.9em 0 0em',
            '-1.3em 0em 0 0em',
            '-0.9em -0.9em 0 0em'];
        var colorArr = [
            '1',
            '0.2',
            '0.2',
            '0.2',
            '0.2',
            '0.2',
            '0.5',
            '0.7']
            .map(function (e) {
                return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + e + ')'
            });
        var rules = [];
        var loop = function (i) {
            var tmpColorArr = loopArray$1(colorArr, i, 'r');
            rules.push(scaleArr.map(function (scaleStr, i) {
                return scaleStr + ' ' + tmpColorArr[i]
            }).join(', '));
        };

        for (var i = 0; i < scaleArr.length; i++) loop(i);
        return rules
    }

    function processStyle(vm) {
        var style = extractComponentStyle$1(vm);
        var color = style.color;
        var rgb = color && getRgb$1(color);
        if (rgb) {
            setKeyframeColor(vm, rgb);
        }
        return style
    }

    var loadingIndicator = {
        name: 'weex-loading-indicator',
        render: function render(createElement) {
            this.weexType = 'loading-indicator';
            return createElement('mark', {
                attrs: {'weex-type': 'loading-indicator'},
                staticClass: 'weex-loading-indicator weex-ct',
                staticStyle: processStyle(this)
            })
        },
        _css: _css
    };

    var loadingIndicator$1 = {
        init: function init(weex) {
            extractComponentStyle$1 = weex.extractComponentStyle;
            getRgb$1 = weex.utils.getRgb;
            loopArray$1 = weex.utils.loopArray;
            getStyleSheetById$1 = weex.utils.getStyleSheetById;
            weex.registerComponent('loading-indicator', loadingIndicator);
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    function getList$1(weex) {
        var extractComponentStyle = weex.extractComponentStyle;

        return {
            name: 'weex-recycle-list',
            mixins: [scrollable$1],
            props: {
                scrollDirection: {
                    type: [String],
                    default: 'vertical',
                    validator: function validator(value) {
                        return ['horizontal', 'vertical'].indexOf(value) !== -1
                    }
                },
                _items: Array,
                _switch: String
            },
            computed: {
                wrapperClass: function wrapperClass() {
                    var classArray = ['weex-recycle', 'weex-recycle-wrapper', 'weex-ct'];
                    this._refresh && classArray.push('with-refresh');
                    this._loading && classArray.push('with-loading');
                    if (this.scrollDirection === 'horizontal') {
                        classArray.push('weex-recycle-horizontal');
                    } else {
                        classArray.push('weex-recycle-vertical');
                    }
                    return classArray.join(' ')
                }
            },

            methods: {
                createChildren: function createChildren(h) {
                    var _vm = this;
                    return [
                        h('article', {
                            ref: 'inner',
                            staticClass: 'weex-recycle-inner weex-ct'
                        }, [
                            _vm._l(_vm._items, function (item, index) {
                                return [
                                    _vm._t(_vm.sloteName(item), null, {
                                        item: item,
                                        index: index
                                    })
                                ]
                            })
                        ])
                    ]
                },
                sloteName: function sloteName(item) {
                    if (this._switch && item[this._switch]) {
                        return item[this._switch]
                    } else {
                        return 'default'
                    }
                }
            },

            render: function render(createElement) {
                var this$1 = this;

                this.weexType = 'list';

                this.$nextTick(function () {
                    this$1.updateLayout();
                });

                return createElement('main', {
                    ref: 'wrapper',
                    attrs: {'weex-type': 'recycle-list'},
                    staticClass: this.wrapperClass,
                    on: {
                        scroll: this.handleScroll,
                        touchstart: this.handleTouchStart,
                        touchmove: this.handleTouchMove,
                        touchend: this.handleTouchEnd
                    },
                    staticStyle: extractComponentStyle(this)
                }, this.createChildren(createElement))
            }
        }
    }

    var recycleList = {
        init: function init(weex) {
            weex.registerComponent('recycle-list', getList$1(weex));
        }
    }

    __$styleInject("/*\r\n * Licensed to the Apache Software Foundation (ASF) under one\r\n * or more contributor license agreements.  See the NOTICE file\r\n * distributed with this work for additional information\r\n * regarding copyright ownership.  The ASF licenses this file\r\n * to you under the Apache License, Version 2.0 (the\r\n * \"License\"); you may not use this file except in compliance\r\n * with the License.  You may obtain a copy of the License at\r\n *\r\n *   http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing,\r\n * software distributed under the License is distributed on an\r\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\r\n * KIND, either express or implied.  See the License for the\r\n * specific language governing permissions and limitations\r\n * under the License.\r\n */\r\n\r\nbody > .weex-list,\r\nbody > .weex-recycle,\r\nbody > .weex-scroller,\r\nbody > .weex-waterfall {\r\n  max-height: 100%;\r\n}\r\n\r\n.weex-list-wrapper,\r\n.weex-recycle-wrapper,\r\n.weex-scroller-wrapper,\r\n.weex-waterfall-wrapper {\r\n  -webkit-overflow-scrolling: touch;\r\n}\r\n\r\n.weex-list-wrapper,\r\n.weex-waterfall-wrapper {\r\n  overflow-y: scroll !important;\r\n  overflow-x: hidden !important;\r\n}\r\n\r\n.weex-list-inner,\r\n.weex-recycle-inner,\r\n.weex-scroller-inner,\r\n.weex-waterfall-inner {\r\n  -webkit-overflow-scrolling: touch;\r\n}\r\n\r\n.weex-waterfall-inner-columns {\r\n  -webkit-flex-direction: row;\r\n  -moz-box-orient: horizontal;\r\n  -moz-box-direction: normal;\r\n  -ms-flex-direction: row;\r\n  flex-direction: row;\r\n  -webkit-box-orient: horizontal;\r\n}\r\n\r\n.weex-scroller-wrapper.weex-scroller-vertical,\r\n.weex-recycle-wrapper.weex-recycle-vertical  {\r\n  overflow-x: hidden;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.weex-scroller-wrapper.weex-scroller-horizontal,\r\n.weex-recycle-wrapper.weex-recycle-horizontal {\r\n  overflow-x: scroll;\r\n  overflow-y: hidden;\r\n}\r\n\r\n.weex-scroller-wrapper.weex-scroller-disabled {\r\n  overflow-x: hidden;\r\n  overflow-y: hidden;\r\n}\r\n\r\n.weex-scroller-horizontal .weex-scroller-inner,\r\n.weex-recycle-horizontal .weex-recycle-inner {\r\n  -webkit-flex-direction: row;\r\n  -ms-flex-direction: row;\r\n  -moz-box-orient: horizontal;\r\n  -moz-box-direction: normal;\r\n  flex-direction: row;\r\n  -webkit-box-orient: horizontal;\r\n  height: 100%;\r\n}\r\n\r\n.weex-cell {\r\n  width: 100%;\r\n}\r\n\r\n.weex-refresh,\r\n.weex-loading {\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n  -moz-box-align: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n  -webkit-box-pack: center;\r\n  -webkit-justify-content: center;\r\n  -moz-box-pack: center;\r\n  -ms-flex-pack: center;\r\n  justify-content: center;\r\n  width: 100%;\r\n  overflow: hidden;\r\n}\r\n", {});

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// import cell from './cell'
    var modules = [
        list,
        scroller,
        waterfall,
        // cell,
        header,
        loading,
        refresh,
        loadingIndicator$1,
        recycleList
    ];

    var scrollable = {
        init: function init(weex) {
            modules.forEach(function (mod) {
                weex.install(mod);
            });
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    var valMap = {
        contain: 'contain',
        cover: 'cover',
        stretch: '100% 100%'
    };
    var vals = Object.keys(valMap);
    var defaultVal = 'stretch';

    var resize = {
        init: function init(weex) {
            weex.__vue__.directive('weex-resize', function (el, binding) {
                if (el.tagName.toLowerCase() !== 'figure') {
                    return
                }
                var value = binding.value;
                var oldValue = binding.oldvalue;
                if (value === oldValue) {
                    return
                }
                if (vals.indexOf(value) <= -1) {
                    value = defaultVal;
                }
                el.style.backgroundSize = valMap[value];
            });
        }
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    var directives = {
        resize: resize
    }

    /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    var meta = {
        /**
         * setViewport.
         * Changing viewport design width at runtime.
         */
        setViewport: function setViewport(options) {
            if (!options) {
                console.error(("[vue-render] set viewport width invalid options: " + options));
            }
            var newWidth = parseInt(options.width);
            if (!isNaN(newWidth) && newWidth > 0) {
                resetViewport(options.width);
            } else {
                console.error(("[vue-render] set viewport width invalid options.width: " + (options.width)));
            }
        }
    };

    var meta$1 = {
        init: function init(weex) {
            weex.registerModule('meta', meta);
        }
    }

    var preInit = weex.init;

    weex.init = function () {
        preInit.apply(weex, arguments);
        weex.install(scrollable);
        weex.install(meta$1);
        for (var k in directives) {
            console.log(directives)
            weex.install(directives[k]);
        }
    };

    if (global.Vue) {
        weex.init(global.Vue);
    }

    return weex;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29yZS5jb21tb24uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbGlicmFyeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jdHguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL2FycmF5L2Zyb20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC1wcm90by5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Zvci1vZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbnZva2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190YXNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3BlcmZvcm0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191c2VyLWFnZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwiLi4vLi4vLi4vc3JjL2xpYi9nZXN0dXJlLmpzIiwiLi4vLi4vLi4vc3JjL2xpYi9lbnZkL3ZlcnNpb24uanMiLCIuLi8uLi8uLi9zcmMvbGliL2VudmQvcGFyYW1zLmpzIiwiLi4vLi4vLi4vc3JjL2xpYi9lbnZkL2luZGV4LmpzIiwiLi4vLi4vLi4vc3JjL3V0aWxzL3R5cGUuanMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvZnVuYy5qcyIsIi4uLy4uLy4uL3NyYy93ZWV4L3ZpZXdwb3J0LmpzIiwiLi4vLi4vLi4vc3JjL3V0aWxzL2V2ZW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbmZpZy5qcyIsIi4uLy4uLy4uL3NyYy91dGlscy9jb21wb25lbnQuanMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvbGF6eWxvYWQuanMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvc3R5bGUuanMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvd2VleC93eC1lbnYuanMiLCIuLi8uLi8uLi9zcmMvd2VleC9pbnN0YW5jZS5qcyIsIi4uLy4uLy4uL3NyYy9jb3JlL3N0eWxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3d4di10cmFuc2Zvcm1lci90cmFuc2Zvcm1lci90ZXh0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3d4di10cmFuc2Zvcm1lci90cmFuc2Zvcm1lci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93eHYtdHJhbnNmb3JtZXIvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvY29yZS9ub2RlLmpzIiwiLi4vLi4vLi4vc3JjL2NvcmUvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvbWl4aW5zL2Jhc2UuanMiLCIuLi8uLi8uLi9zcmMvbWl4aW5zL2V2ZW50LmpzIiwiLi4vLi4vLi4vc3JjL21peGlucy9zdHlsZS5qcyIsIi4uLy4uLy4uL3NyYy9taXhpbnMvaW5wdXQtY29tbW9uLmpzIiwiLi4vLi4vLi4vc3JjL21peGlucy9zdGlja3kuanMiLCIuLi8uLi8uLi9zcmMvbWl4aW5zL2luZGV4LmpzIiwiLi4vLi4vLi4vc3JjL3dlZXgvZ2xvYmFsLmpzIiwiLi4vLi4vLi4vc3JjL3dlZXgvcmVuZGVyLWZ1bmN0aW9uLmpzIiwiLi4vLi4vLi4vc3JjL3dlZXgvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9zY3JvbGxhYmxlL21peGlucy9zY3JvbGxhYmxlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvc2Nyb2xsYWJsZS9taXhpbnMvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9zY3JvbGxhYmxlL2xpc3QuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9zY3JvbGxhYmxlL3Njcm9sbGVyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvc2Nyb2xsYWJsZS93YXRlcmZhbGwuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9zY3JvbGxhYmxlL2hlYWRlci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3Njcm9sbGFibGUvbG9hZGluZy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3Njcm9sbGFibGUvcmVmcmVzaC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3Njcm9sbGFibGUvbG9hZGluZy1pbmRpY2F0b3IuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9zY3JvbGxhYmxlL3JlY3ljbGUtbGlzdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3Njcm9sbGFibGUvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvZGlyZWN0aXZlcy9yZXNpemUuanMiLCIuLi8uLi8uLi9zcmMvZGlyZWN0aXZlcy9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9tb2R1bGVzL21ldGEuanMiLCIuLi9zcmMvaW5kZXguY29yZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjYuMCcgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBTUkMgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJyk7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddO1xudmFyIFRQTCA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbCwgc2FmZSkge1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYgKE9ba2V5XSA9PT0gdmFsKSByZXR1cm47XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIGlmICghc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH0gZWxzZSBpZiAoT1trZXldKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSk7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmICh0YXJnZXQpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmIChleHBvcnRzW2tleV0gIT0gb3V0KSBoaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZiAoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpIGV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCJ2YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246IGNvcmUudmVyc2lvbixcbiAgbW9kZTogcmVxdWlyZSgnLi9fbGlicmFyeScpID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTggRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmIHR5cGVvZiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG4iLCJ2YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoTywgcHJvdG8pIHtcbiAgYW5PYmplY3QoTyk7XG4gIGlmICghaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKSB0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbiAodGVzdCwgYnVnZ3ksIHNldCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZiAoYnVnZ3kpIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcbiIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IHNldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQgfSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciB0ZXN0ID0ge307XG50ZXN0W3JlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXSA9ICd6JztcbmlmICh0ZXN0ICsgJycgIT0gJ1tvYmplY3Qgel0nKSB7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xuICB9LCB0cnVlKTtcbn1cbiIsIi8vIDIyLjEuMy4zMSBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbnZhciBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vX3drcycpKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5pZiAoQXJyYXlQcm90b1tVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKSByZXF1aXJlKCcuL19oaWRlJykoQXJyYXlQcm90bywgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICBBcnJheVByb3RvW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCJ2YXIgJGl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG52YXIgSVRFUkFUT1IgPSB3a3MoJ2l0ZXJhdG9yJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHdrcygndG9TdHJpbmdUYWcnKTtcbnZhciBBcnJheVZhbHVlcyA9IEl0ZXJhdG9ycy5BcnJheTtcblxudmFyIERPTUl0ZXJhYmxlcyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBDU1NTdHlsZURlY2xhcmF0aW9uOiBmYWxzZSxcbiAgQ1NTVmFsdWVMaXN0OiBmYWxzZSxcbiAgQ2xpZW50UmVjdExpc3Q6IGZhbHNlLFxuICBET01SZWN0TGlzdDogZmFsc2UsXG4gIERPTVN0cmluZ0xpc3Q6IGZhbHNlLFxuICBET01Ub2tlbkxpc3Q6IHRydWUsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiBmYWxzZSxcbiAgRmlsZUxpc3Q6IGZhbHNlLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogZmFsc2UsXG4gIEhUTUxDb2xsZWN0aW9uOiBmYWxzZSxcbiAgSFRNTEZvcm1FbGVtZW50OiBmYWxzZSxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IGZhbHNlLFxuICBNZWRpYUxpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBNaW1lVHlwZUFycmF5OiBmYWxzZSxcbiAgTmFtZWROb2RlTWFwOiBmYWxzZSxcbiAgTm9kZUxpc3Q6IHRydWUsXG4gIFBhaW50UmVxdWVzdExpc3Q6IGZhbHNlLFxuICBQbHVnaW46IGZhbHNlLFxuICBQbHVnaW5BcnJheTogZmFsc2UsXG4gIFNWR0xlbmd0aExpc3Q6IGZhbHNlLFxuICBTVkdOdW1iZXJMaXN0OiBmYWxzZSxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IGZhbHNlLFxuICBTVkdQb2ludExpc3Q6IGZhbHNlLFxuICBTVkdTdHJpbmdMaXN0OiBmYWxzZSxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogZmFsc2UsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IGZhbHNlLFxuICBTdHlsZVNoZWV0TGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIFRleHRUcmFja0N1ZUxpc3Q6IGZhbHNlLFxuICBUZXh0VHJhY2tMaXN0OiBmYWxzZSxcbiAgVG91Y2hMaXN0OiBmYWxzZVxufTtcblxuZm9yICh2YXIgY29sbGVjdGlvbnMgPSBnZXRLZXlzKERPTUl0ZXJhYmxlcyksIGkgPSAwOyBpIDwgY29sbGVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBjb2xsZWN0aW9uc1tpXTtcbiAgdmFyIGV4cGxpY2l0ID0gRE9NSXRlcmFibGVzW05BTUVdO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGtleTtcbiAgaWYgKHByb3RvKSB7XG4gICAgaWYgKCFwcm90b1tJVEVSQVRPUl0pIGhpZGUocHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgaWYgKCFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gICAgSXRlcmF0b3JzW05BTUVdID0gQXJyYXlWYWx1ZXM7XG4gICAgaWYgKGV4cGxpY2l0KSBmb3IgKGtleSBpbiAkaXRlcmF0b3JzKSBpZiAoIXByb3RvW2tleV0pIHJlZGVmaW5lKHByb3RvLCBrZXksICRpdGVyYXRvcnNba2V5XSwgdHJ1ZSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcbiIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcbiIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcbiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyLCBleGNlcHQgaU9TIFNhZmFyaSAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgfSBlbHNlIGlmIChPYnNlcnZlciAmJiAhKGdsb2JhbC5uYXZpZ2F0b3IgJiYgZ2xvYmFsLm5hdmlnYXRvci5zdGFuZGFsb25lKSkge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIFByb21pc2VDYXBhYmlsaXR5KEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBuYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQywgeCkge1xuICBhbk9iamVjdChDKTtcbiAgaWYgKGlzT2JqZWN0KHgpICYmIHguY29uc3RydWN0b3IgPT09IEMpIHJldHVybiB4O1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKEMpO1xuICB2YXIgcmVzb2x2ZSA9IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmU7XG4gIHJlc29sdmUoeCk7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufTtcbiIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSByZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0sIHNhZmUpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciBDID0gZ2xvYmFsW0tFWV07XG4gIGlmIChERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSBkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKCk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuL191c2VyLWFnZW50Jyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjggfHwgJyc7XG52YXIgJFByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV07XG52YXIgaXNOb2RlID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG52YXIgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgSW50ZXJuYWwsIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gJFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgICBleGVjKGVtcHR5LCBlbXB0eSk7XG4gICAgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKVxuICAgICAgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlXG4gICAgICAvLyB2OCA2LjYgKE5vZGUgMTAgYW5kIENocm9tZSA2NikgaGF2ZSBhIGJ1ZyB3aXRoIHJlc29sdmluZyBjdXN0b20gdGhlbmFibGVzXG4gICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgICAgIC8vIHdlIGNhbid0IGRldGVjdCBpdCBzeW5jaHJvbm91c2x5LCBzbyBqdXN0IGNoZWNrIHZlcnNpb25zXG4gICAgICAmJiB2OC5pbmRleE9mKCc2LjYnKSAhPT0gMFxuICAgICAgJiYgdXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZS82NicpID09PSAtMTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChwcm9taXNlLCBpc1JlamVjdCkge1xuICBpZiAocHJvbWlzZS5fbikgcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciBvayA9IHByb21pc2UuX3MgPT0gMTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uIChyZWFjdGlvbikge1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbDtcbiAgICAgIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgICAgIHZhciByZWplY3QgPSByZWFjdGlvbi5yZWplY3Q7XG4gICAgICB2YXIgZG9tYWluID0gcmVhY3Rpb24uZG9tYWluO1xuICAgICAgdmFyIHJlc3VsdCwgdGhlbiwgZXhpdGVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpOyAvLyBtYXkgdGhyb3dcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgZXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChkb21haW4gJiYgIWV4aXRlZCkgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhcHJvbWlzZS5faCkgb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciB1bmhhbmRsZWQgPSBpc1VuaGFuZGxlZChwcm9taXNlKTtcbiAgICB2YXIgcmVzdWx0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmICh1bmhhbmRsZWQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbikge1xuICAgICAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHVuaGFuZGxlZCAmJiByZXN1bHQuZSkgdGhyb3cgcmVzdWx0LnY7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLl9oICE9PSAxICYmIChwcm9taXNlLl9hIHx8IHByb21pc2UuX2MpLmxlbmd0aCA9PT0gMDtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCkge1xuICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdiB9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZiAoIXByb21pc2UuX2EpIHByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICB2YXIgdGhlbjtcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSkge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAkcmVqZWN0LmNhbGwoeyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX2EpIHRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fcykgbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSAkUHJvbWlzZSB8fCBDID09PSBXcmFwcGVyXG4gICAgICA/IG5ldyBPd25Qcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgOiBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgUHJvbWlzZTogJFByb21pc2UgfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpIHtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpO1xuICAgIHZhciAkJHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShMSUJSQVJZICYmIHRoaXMgPT09IFdyYXBwZXIgPyAkUHJvbWlzZSA6IHRoaXMsIHgpO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgJGluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgdmFyIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgaXNJbml0aWFsaXplZCA9IGZhbHNlXHJcblxyXG4vLyBtYWpvciBldmVudHMgc3VwcG9ydGVkOlxyXG4vLyAgIHBhbnN0YXJ0XHJcbi8vICAgcGFubW92ZVxyXG4vLyAgIHBhbmVuZFxyXG4vLyAgIHN3aXBlXHJcbi8vICAgbG9uZ3ByZXNzXHJcbi8vIGV4dHJhIGV2ZW50cyBzdXBwb3J0ZWQ6XHJcbi8vICAgZHVhbHRvdWNoc3RhcnRcclxuLy8gICBkdWFsdG91Y2hcclxuLy8gICBkdWFsdG91Y2hlbmRcclxuLy8gICB0YXBcclxuLy8gICBkb3VibGV0YXBcclxuLy8gICBwcmVzc2VuZFxyXG5cclxudmFyIGRvYyA9IHdpbmRvdy5kb2N1bWVudFxyXG52YXIgZG9jRWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50XHJcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxyXG52YXIgZ2VzdHVyZXMgPSB7fVxyXG52YXIgbGFzdFRhcCA9IG51bGxcclxuXHJcbi8qKlxyXG4gKiBmaW5kIHRoZSBjbG9zZXN0IGNvbW1vbiBhbmNlc3RvclxyXG4gKiBpZiB0aGVyZSdzIG5vIG9uZSwgcmV0dXJuIG51bGxcclxuICpcclxuICogQHBhcmFtICB7RWxlbWVudH0gZWwxIGZpcnN0IGVsZW1lbnRcclxuICogQHBhcmFtICB7RWxlbWVudH0gZWwyIHNlY29uZCBlbGVtZW50XHJcbiAqIEByZXR1cm4ge0VsZW1lbnR9ICAgICBjb21tb24gYW5jZXN0b3JcclxuICovXHJcbmZ1bmN0aW9uIGdldENvbW1vbkFuY2VzdG9yKGVsMSwgZWwyKSB7XHJcbiAgdmFyIGVsID0gZWwxXHJcbiAgd2hpbGUgKGVsKSB7XHJcbiAgICBpZiAoZWwuY29udGFpbnMoZWwyKSB8fCBlbCA9PSBlbDIpIHtcclxuICAgICAgcmV0dXJuIGVsXHJcbiAgICB9XHJcbiAgICBlbCA9IGVsLnBhcmVudE5vZGVcclxuICB9XHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG5cclxuLyoqXHJcbiAqIGZpcmUgYSBIVE1MRXZlbnRcclxuICpcclxuICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCB3aGljaCBlbGVtZW50IHRvIGZpcmUgYSBldmVudCBvblxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICB0eXBlICAgIHR5cGUgb2YgZXZlbnRcclxuICogQHBhcmFtICB7b2JqZWN0fSAgZXh0cmEgICBleHRyYSBkYXRhIGZvciB0aGUgZXZlbnQgb2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBmaXJlRXZlbnQoZWxlbWVudCwgdHlwZSwgZXh0cmEpIHtcclxuICB2YXIgZXZlbnQgPSBkb2MuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKVxyXG4gIGV2ZW50LmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKVxyXG5cclxuICBpZiAodHlwZW9mIGV4dHJhID09PSAnb2JqZWN0Jykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBleHRyYSkge1xyXG4gICAgICBldmVudFtwXSA9IGV4dHJhW3BdXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgdG8gZGlzdGluZ3Vpc2ggd2l0aCBvdGhlciBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lIGdlbmVyYXRlZFxyXG4gICAqIGJ5IGFub3RoZXIgbGlicmFyeSBpbiB0aGUgc2FtZSBwYWdlLlxyXG4gICAqLyBcclxuICBldmVudC5fZm9yID0gJ3dlZXgnXHJcblxyXG4gIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudClcclxufVxyXG5cclxuLyoqXHJcbiAqIGNhbGMgdGhlIHRyYW5zZm9ybVxyXG4gKiBhc3N1bWUgNCBwb2ludHMgQUJDRCBvbiB0aGUgY29vcmRpbmF0ZSBzeXN0ZW1cclxuICogPiByb3RhdGXvvJphbmdsZSByb3RhdGluZyBmcm9tIEFCIHRvIENEXHJcbiAqID4gc2NhbGXvvJpzY2FsZSByYXRpbyBmcm9tIEFCIHRvIENEXHJcbiAqID4gdHJhbnNsYXRl77yadHJhbnNsYXRlIHNoaWZ0IGZyb20gQSB0byBDXHJcbiAqXHJcbiAqIEBwYXJhbSAge251bWJlcn0geDEgYWJzY2lzc2Egb2YgQVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHkxIG9yZGluYXRlIG9mIEFcclxuICogQHBhcmFtICB7bnVtYmVyfSB4MiBhYnNjaXNzYSBvZiBCXHJcbiAqIEBwYXJhbSAge251bWJlcn0geTIgb3JkaW5hdGUgb2YgQlxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHgzIGFic2Npc3NhIG9mIENcclxuICogQHBhcmFtICB7bnVtYmVyfSB5MyBvcmRpbmF0ZSBvZiBDXHJcbiAqIEBwYXJhbSAge251bWJlcn0geDQgYWJzY2lzc2Egb2YgRFxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHk0IG9yZGluYXRlIG9mIERcclxuICogQHJldHVybiB7b2JqZWN0fSAgICB0cmFuc2Zvcm0gb2JqZWN0IGxpa2VcclxuICogICB7cm90YXRlLCBzY2FsZSwgdHJhbnNsYXRlWzJdLCBtYXRyaXhbM11bM119XHJcbiAqL1xyXG5mdW5jdGlvbiBjYWxjKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIHg0LCB5NCkge1xyXG4gIHZhciByb3RhdGUgPSBNYXRoLmF0YW4yKHk0IC0geTMsIHg0IC0geDMpIC0gTWF0aC5hdGFuMih5MiAtIHkxLCB4MiAtIHgxKVxyXG4gIHZhciBzY2FsZSA9IE1hdGguc3FydCgoTWF0aC5wb3coeTQgLSB5MywgMilcclxuICAgICsgTWF0aC5wb3coeDQgLSB4MywgMikpIC8gKE1hdGgucG93KHkyIC0geTEsIDIpXHJcbiAgICArIE1hdGgucG93KHgyIC0geDEsIDIpKSlcclxuICB2YXIgdHJhbnNsYXRlID0gW1xyXG4gICAgeDNcclxuICAgIC0gc2NhbGUgKiB4MSAqIE1hdGguY29zKHJvdGF0ZSlcclxuICAgICsgc2NhbGUgKiB5MSAqIE1hdGguc2luKHJvdGF0ZSksXHJcbiAgICB5M1xyXG4gICAgLSBzY2FsZSAqIHkxICogTWF0aC5jb3Mocm90YXRlKVxyXG4gICAgLSBzY2FsZSAqIHgxICogTWF0aC5zaW4ocm90YXRlKV1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJvdGF0ZTogcm90YXRlLFxyXG4gICAgc2NhbGU6IHNjYWxlLFxyXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUsXHJcbiAgICBtYXRyaXg6IFtcclxuICAgICAgW3NjYWxlICogTWF0aC5jb3Mocm90YXRlKSwgLXNjYWxlICogTWF0aC5zaW4ocm90YXRlKSwgdHJhbnNsYXRlWzBdXSxcclxuICAgICAgW3NjYWxlICogTWF0aC5zaW4ocm90YXRlKSwgc2NhbGUgKiBNYXRoLmNvcyhyb3RhdGUpLCB0cmFuc2xhdGVbMV1dLFxyXG4gICAgICBbMCwgMCwgMV1cclxuICAgIF1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0YWtlIG92ZXIgdGhlIHRvdWNoc3RhcnQgZXZlbnRzLiBBZGQgbmV3IHRvdWNoZXMgdG8gdGhlIGdlc3R1cmVzLlxyXG4gKiBJZiB0aGVyZSBpcyBubyBwcmV2aW91cyByZWNvcmRzLCB0aGVuIGJpbmQgdG91Y2htb3ZlLCB0b2NoZW5kXHJcbiAqIGFuZCB0b3VjaGNhbmNlbCBldmVudHMuXHJcbiAqIG5ldyB0b3VjaGVzIGluaXRpYWxpemVkIHdpdGggc3RhdGUgJ3RhcHBpbmcnLCBhbmQgd2l0aGluIDUwMCBtaWxsaXNlY29uZHNcclxuICogaWYgdGhlIHN0YXRlIGlzIHN0aWxsIHRhcHBpbmcsIHRoZW4gdHJpZ2dlciBnZXN0dXJlICdwcmVzcycuXHJcbiAqIElmIHRoZXJlIGFyZSB0d28gdG91Y2hlIHBvaW50cywgdGhlbiB0aGUgJ2R1YWx0b3VjaHN0YXJ0JyBpcyB0cmlnZ2VyZC4gVGhlXHJcbiAqIG5vZGUgb2YgdGhlIHRvdWNoIGdlc3R1cmUgaXMgdGhlaXIgY2xvZXN0IGNvbW1vbiBhbmNlc3Rvci5cclxuICpcclxuICogQGV2ZW50XHJcbiAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxyXG4gKi9cclxuZnVuY3Rpb24gdG91Y2hzdGFydEhhbmRsZXIoZXZlbnQpIHtcclxuXHJcbiAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDApIHtcclxuICAgIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZUhhbmRsZXIsIHRydWUpXHJcbiAgICBkb2NFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoZW5kSGFuZGxlciwgdHJ1ZSlcclxuICAgIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdG91Y2hjYW5jZWxIYW5kbGVyLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgLy8gcmVjb3JkIGV2ZXJ5IHRvdWNoXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV1cclxuICAgIHZhciB0b3VjaFJlY29yZCA9IHt9XHJcblxyXG4gICAgZm9yICh2YXIgcCBpbiB0b3VjaCkge1xyXG4gICAgICB0b3VjaFJlY29yZFtwXSA9IHRvdWNoW3BdXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGdlc3R1cmUgPSB7XHJcbiAgICAgIHN0YXJ0VG91Y2g6IHRvdWNoUmVjb3JkLFxyXG4gICAgICBzdGFydFRpbWU6IERhdGUubm93KCksXHJcbiAgICAgIHN0YXR1czogJ3RhcHBpbmcnLFxyXG4gICAgICBlbGVtZW50OiBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50LnRhcmdldCxcclxuICAgICAgcHJlc3NpbmdIYW5kbGVyOiBzZXRUaW1lb3V0KGZ1bmN0aW9uIChlbGVtZW50LCB0b3VjaCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICd0YXBwaW5nJykge1xyXG4gICAgICAgICAgICBnZXN0dXJlLnN0YXR1cyA9ICdwcmVzc2luZydcclxuXHJcbiAgICAgICAgICAgIGZpcmVFdmVudChlbGVtZW50LCAnbG9uZ3ByZXNzJywge1xyXG4gICAgICAgICAgICAgIC8vIGFkZCB0b3VjaCBkYXRhIGZvciB3ZWV4XHJcbiAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxyXG4gICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXHJcbiAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxyXG4gICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKVxyXG4gICAgICAgICAgZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIgPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KGV2ZW50LnNyY0VsZW1lbnQgfHwgZXZlbnQudGFyZ2V0LCBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXSksIDUwMClcclxuICAgIH1cclxuICAgIGdlc3R1cmVzW3RvdWNoLmlkZW50aWZpZXJdID0gZ2VzdHVyZVxyXG4gIH1cclxuXHJcbiAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT0gMikge1xyXG4gICAgdmFyIGVsZW1lbnRzID0gW11cclxuXHJcbiAgICBmb3IgKHZhciBwIGluIGdlc3R1cmVzKSB7XHJcbiAgICAgIGVsZW1lbnRzLnB1c2goZ2VzdHVyZXNbcF0uZWxlbWVudClcclxuICAgIH1cclxuXHJcbiAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaHN0YXJ0Jywge1xyXG4gICAgICB0b3VjaGVzOiBzbGljZS5jYWxsKGV2ZW50LnRvdWNoZXMpLFxyXG4gICAgICB0b3VjaEV2ZW50OiBldmVudFxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0YWtlIG92ZXIgdG91Y2htb3ZlIGV2ZW50cywgYW5kIGhhbmRsZSBwYW4gYW5kIGR1YWwgcmVsYXRlZCBnZXN0dXJlcy5cclxuICpcclxuICogMS4gdHJhdmVyc2UgZXZlcnkgdG91Y2ggcG9pbnTvvJpcclxuICogPiBpZiAndGFwcGluZycgYW5kIHRoZSBzaGlmdCBpcyBvdmVyIDEwIHBpeGxlcywgdGhlbiBpdCdzIGEgJ3Bhbm5pbmcnLlxyXG4gKiAyLiBpZiB0aGVyZSBhcmUgdHdvIHRvdWNoIHBvaW50cywgdGhlbiBjYWxjIHRoZSB0cmFuZm9ybSBhbmQgdHJpZ2dlclxyXG4gKiAgICdkdWFsdG91Y2gnLlxyXG4gKlxyXG4gKiBAZXZlbnRcclxuICogQHBhcmFtICB7ZXZlbnR9IGV2ZW50XHJcbiAqL1xyXG5mdW5jdGlvbiB0b3VjaG1vdmVIYW5kbGVyKGV2ZW50KSB7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV1cclxuICAgIHZhciBnZXN0dXJlID0gZ2VzdHVyZXNbdG91Y2guaWRlbnRpZmllcl1cclxuXHJcbiAgICBpZiAoIWdlc3R1cmUpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFnZXN0dXJlLmxhc3RUb3VjaCkge1xyXG4gICAgICBnZXN0dXJlLmxhc3RUb3VjaCA9IGdlc3R1cmUuc3RhcnRUb3VjaFxyXG4gICAgfVxyXG4gICAgaWYgKCFnZXN0dXJlLmxhc3RUaW1lKSB7XHJcbiAgICAgIGdlc3R1cmUubGFzdFRpbWUgPSBnZXN0dXJlLnN0YXJ0VGltZVxyXG4gICAgfVxyXG4gICAgaWYgKCFnZXN0dXJlLnZlbG9jaXR5WCkge1xyXG4gICAgICBnZXN0dXJlLnZlbG9jaXR5WCA9IDBcclxuICAgIH1cclxuICAgIGlmICghZ2VzdHVyZS52ZWxvY2l0eVkpIHtcclxuICAgICAgZ2VzdHVyZS52ZWxvY2l0eVkgPSAwXHJcbiAgICB9XHJcbiAgICBpZiAoIWdlc3R1cmUuZHVyYXRpb24pIHtcclxuICAgICAgZ2VzdHVyZS5kdXJhdGlvbiA9IDBcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGltZSA9ICBEYXRlLm5vdygpIC0gZ2VzdHVyZS5sYXN0VGltZVxyXG4gICAgdmFyIHZ4ID0gKHRvdWNoLmNsaWVudFggLSBnZXN0dXJlLmxhc3RUb3VjaC5jbGllbnRYKSAvIHRpbWVcclxuICAgIHZhciB2eSA9ICh0b3VjaC5jbGllbnRZIC0gZ2VzdHVyZS5sYXN0VG91Y2guY2xpZW50WSkgLyB0aW1lXHJcblxyXG4gICAgdmFyIFJFQ09SRF9EVVJBVElPTiA9IDcwXHJcbiAgICBpZiAodGltZSA+IFJFQ09SRF9EVVJBVElPTikge1xyXG4gICAgICB0aW1lID0gUkVDT1JEX0RVUkFUSU9OXHJcbiAgICB9XHJcbiAgICBpZiAoZ2VzdHVyZS5kdXJhdGlvbiArIHRpbWUgPiBSRUNPUkRfRFVSQVRJT04pIHtcclxuICAgICAgZ2VzdHVyZS5kdXJhdGlvbiA9IFJFQ09SRF9EVVJBVElPTiAtIHRpbWVcclxuICAgIH1cclxuXHJcbiAgICBnZXN0dXJlLnZlbG9jaXR5WCA9IChnZXN0dXJlLnZlbG9jaXR5WCAqIGdlc3R1cmUuZHVyYXRpb24gKyB2eCAqIHRpbWUpXHJcbiAgICAgIC8gKGdlc3R1cmUuZHVyYXRpb24gKyB0aW1lKVxyXG4gICAgZ2VzdHVyZS52ZWxvY2l0eVkgPSAoZ2VzdHVyZS52ZWxvY2l0eVkgKiBnZXN0dXJlLmR1cmF0aW9uICsgdnkgKiB0aW1lKVxyXG4gICAgICAvIChnZXN0dXJlLmR1cmF0aW9uICsgdGltZSlcclxuICAgIGdlc3R1cmUuZHVyYXRpb24gKz0gdGltZVxyXG5cclxuICAgIGdlc3R1cmUubGFzdFRvdWNoID0ge31cclxuXHJcbiAgICBmb3IgKHZhciBwIGluIHRvdWNoKSB7XHJcbiAgICAgIGdlc3R1cmUubGFzdFRvdWNoW3BdID0gdG91Y2hbcF1cclxuICAgIH1cclxuICAgIGdlc3R1cmUubGFzdFRpbWUgPSBEYXRlLm5vdygpXHJcblxyXG4gICAgdmFyIGRpc3BsYWNlbWVudFggPSB0b3VjaC5jbGllbnRYIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFhcclxuICAgIHZhciBkaXNwbGFjZW1lbnRZID0gdG91Y2guY2xpZW50WSAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRZXHJcbiAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coZGlzcGxhY2VtZW50WCwgMilcclxuICAgICAgKyBNYXRoLnBvdyhkaXNwbGFjZW1lbnRZLCAyKSlcclxuICAgIHZhciBpc1ZlcnRpY2FsID0gIShNYXRoLmFicyhkaXNwbGFjZW1lbnRYKSA+IE1hdGguYWJzKGRpc3BsYWNlbWVudFkpKVxyXG4gICAgdmFyIGRpcmVjdGlvbiA9IGlzVmVydGljYWxcclxuICAgICAgPyBkaXNwbGFjZW1lbnRZID49IDAgPyAnZG93bicgOiAndXAnXHJcbiAgICAgIDogZGlzcGxhY2VtZW50WCA+PSAwID8gJ3JpZ2h0JyA6ICdsZWZ0J1xyXG5cclxuICAgIC8vIG1hZ2ljIG51bWJlciAxMDogbW92aW5nIDEwcHggbWVhbnMgcGFuLCBub3QgdGFwXHJcbiAgICBpZiAoKGdlc3R1cmUuc3RhdHVzID09PSAndGFwcGluZycgfHwgZ2VzdHVyZS5zdGF0dXMgPT09ICdwcmVzc2luZycpXHJcbiAgICAgICAgJiYgZGlzdGFuY2UgPiAxMCkge1xyXG4gICAgICBnZXN0dXJlLnN0YXR1cyA9ICdwYW5uaW5nJ1xyXG4gICAgICBnZXN0dXJlLmlzVmVydGljYWwgPSBpc1ZlcnRpY2FsXHJcbiAgICAgIGdlc3R1cmUuZGlyZWN0aW9uID0gZGlyZWN0aW9uXHJcblxyXG4gICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncGFuc3RhcnQnLCB7XHJcbiAgICAgICAgdG91Y2g6IHRvdWNoLFxyXG4gICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXHJcbiAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxyXG4gICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgIGlzVmVydGljYWw6IGdlc3R1cmUuaXNWZXJ0aWNhbCxcclxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3Bhbm5pbmcnKSB7XHJcbiAgICAgIGdlc3R1cmUucGFuVGltZSA9IERhdGUubm93KClcclxuXHJcbiAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwYW5tb3ZlJywge1xyXG4gICAgICAgIGRpc3BsYWNlbWVudFg6IGRpc3BsYWNlbWVudFgsXHJcbiAgICAgICAgZGlzcGxhY2VtZW50WTogZGlzcGxhY2VtZW50WSxcclxuICAgICAgICB0b3VjaDogdG91Y2gsXHJcbiAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcclxuICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXHJcbiAgICAgICAgdG91Y2hFdmVudDogZXZlbnQsXHJcbiAgICAgICAgaXNWZXJ0aWNhbDogZ2VzdHVyZS5pc1ZlcnRpY2FsLFxyXG4gICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PSAyKSB7XHJcbiAgICB2YXIgcG9zaXRpb24gPSBbXVxyXG4gICAgdmFyIGN1cnJlbnQgPSBbXVxyXG4gICAgdmFyIGVsZW1lbnRzID0gW11cclxuICAgIHZhciB0cmFuc2Zvcm1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LnRvdWNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1tpXVxyXG4gICAgICB2YXIgZ2VzdHVyZSA9IGdlc3R1cmVzW3RvdWNoLmlkZW50aWZpZXJdXHJcbiAgICAgIHBvc2l0aW9uLnB1c2goW2dlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRYLCBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WV0pXHJcbiAgICAgIGN1cnJlbnQucHVzaChbdG91Y2guY2xpZW50WCwgdG91Y2guY2xpZW50WV0pXHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgcCBpbiBnZXN0dXJlcykge1xyXG4gICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW3BdLmVsZW1lbnQpXHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtID0gY2FsYyhcclxuICAgICAgcG9zaXRpb25bMF1bMF0sXHJcbiAgICAgIHBvc2l0aW9uWzBdWzFdLFxyXG4gICAgICBwb3NpdGlvblsxXVswXSxcclxuICAgICAgcG9zaXRpb25bMV1bMV0sXHJcbiAgICAgIGN1cnJlbnRbMF1bMF0sXHJcbiAgICAgIGN1cnJlbnRbMF1bMV0sXHJcbiAgICAgIGN1cnJlbnRbMV1bMF0sXHJcbiAgICAgIGN1cnJlbnRbMV1bMV1cclxuICAgIClcclxuICAgIGZpcmVFdmVudChnZXRDb21tb25BbmNlc3RvcihlbGVtZW50c1swXSwgZWxlbWVudHNbMV0pLCAnZHVhbHRvdWNoJywge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcclxuICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcclxuICAgICAgdG91Y2hFdmVudDogZXZlbnRcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogaGFuZGxlIHRvdWNoZW5kIGV2ZW50XHJcbiAqXHJcbiAqIDEuIGlmIHRoZXJlIGFyZSB0b3cgdG91Y2ggcG9pbnRzLCB0aGVuIHRyaWdnZXIgJ2R1YWx0b3VjaGVuZCflpoJcclxuICpcclxuICogMi4gdHJhdmVyc2UgZXZlcnkgdG91Y2ggcGlvbnTvvJpcclxuICogPiBpZiB0YXBwaW5nLCB0aGVuIHRyaWdnZXIgJ3RhcCcuXHJcbiAqIElmIHRoZXJlIGlzIGEgdGFwIDMwMCBtaWxsaXNlY29uZHMgYmVmb3JlLCB0aGVuIGl0J3MgYSAnZG91YmxldGFwJy5cclxuICogPiBpZiBwYWRkaW5nLCB0aGVuIGRlY2lkZSB0byB0cmlnZ2VyICdwYW5lbmQnIG9yICdzd2lwZSdcclxuICogPiBpZiBwcmVzc2luZywgdGhlbiB0cmlnZ2VyICdwcmVzc2VuZCcuXHJcbiAqXHJcbiAqIDMuIHJlbW92ZSBsaXN0ZW5lcnMuXHJcbiAqXHJcbiAqIEBldmVudFxyXG4gKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcclxuICovXHJcbmZ1bmN0aW9uIHRvdWNoZW5kSGFuZGxlcihldmVudCkge1xyXG5cclxuICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PSAyKSB7XHJcbiAgICB2YXIgZWxlbWVudHMgPSBbXVxyXG4gICAgZm9yICh2YXIgcCBpbiBnZXN0dXJlcykge1xyXG4gICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW3BdLmVsZW1lbnQpXHJcbiAgICB9XHJcbiAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaGVuZCcsIHtcclxuICAgICAgdG91Y2hlczogc2xpY2UuY2FsbChldmVudC50b3VjaGVzKSxcclxuICAgICAgdG91Y2hFdmVudDogZXZlbnRcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXVxyXG4gICAgdmFyIGlkID0gdG91Y2guaWRlbnRpZmllclxyXG4gICAgdmFyIGdlc3R1cmUgPSBnZXN0dXJlc1tpZF1cclxuXHJcbiAgICBpZiAoIWdlc3R1cmUpIHtcclxuICAgICAgY29udGludWVcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKVxyXG4gICAgICBnZXN0dXJlLnByZXNzaW5nSGFuZGxlciA9IG51bGxcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICd0YXBwaW5nJykge1xyXG4gICAgICBnZXN0dXJlLnRpbWVzdGFtcCA9IERhdGUubm93KClcclxuICAgICAgLy8gZmlyZSBjbGljaywgbm90IHRhcC5cclxuICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3dlZXgkdGFwJywge1xyXG4gICAgICAgIHRvdWNoOiB0b3VjaCxcclxuICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxyXG4gICAgICB9KVxyXG5cclxuICAgICAgaWYgKGxhc3RUYXAgJiYgZ2VzdHVyZS50aW1lc3RhbXAgLSBsYXN0VGFwLnRpbWVzdGFtcCA8IDMwMCkge1xyXG4gICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdkb3VibGV0YXAnLCB7XHJcbiAgICAgICAgICB0b3VjaDogdG91Y2gsXHJcbiAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxhc3RUYXAgPSBnZXN0dXJlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncGFubmluZycpIHtcclxuICAgICAgdmFyIG5vdyA9IERhdGUubm93KClcclxuICAgICAgdmFyIGR1cmF0aW9uID0gbm93IC0gZ2VzdHVyZS5zdGFydFRpbWVcclxuICAgICAgdmFyIGRpc3BsYWNlbWVudFggPSB0b3VjaC5jbGllbnRYIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFhcclxuICAgICAgdmFyIGRpc3BsYWNlbWVudFkgPSB0b3VjaC5jbGllbnRZIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFlcclxuXHJcbiAgICAgIHZhciB2ZWxvY2l0eSA9IE1hdGguc3FydChnZXN0dXJlLnZlbG9jaXR5WSAqIGdlc3R1cmUudmVsb2NpdHlZXHJcbiAgICAgICAgKyBnZXN0dXJlLnZlbG9jaXR5WCAqIGdlc3R1cmUudmVsb2NpdHlYKVxyXG4gICAgICB2YXIgaXNTd2lwZSA9IHZlbG9jaXR5ID4gMC41ICYmIChub3cgLSBnZXN0dXJlLmxhc3RUaW1lKSA8IDEwMFxyXG4gICAgICB2YXIgZXh0cmEgPSB7XHJcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgIGlzU3dpcGU6IGlzU3dpcGUsXHJcbiAgICAgICAgdmVsb2NpdHlYOiBnZXN0dXJlLnZlbG9jaXR5WCxcclxuICAgICAgICB2ZWxvY2l0eVk6IGdlc3R1cmUudmVsb2NpdHlZLFxyXG4gICAgICAgIGRpc3BsYWNlbWVudFg6IGRpc3BsYWNlbWVudFgsXHJcbiAgICAgICAgZGlzcGxhY2VtZW50WTogZGlzcGxhY2VtZW50WSxcclxuICAgICAgICB0b3VjaDogdG91Y2gsXHJcbiAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcclxuICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXHJcbiAgICAgICAgdG91Y2hFdmVudDogZXZlbnQsXHJcbiAgICAgICAgaXNWZXJ0aWNhbDogZ2VzdHVyZS5pc1ZlcnRpY2FsLFxyXG4gICAgICAgIGRpcmVjdGlvbjogZ2VzdHVyZS5kaXJlY3Rpb25cclxuICAgICAgfVxyXG5cclxuICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3BhbmVuZCcsIGV4dHJhKVxyXG4gICAgICBpZiAoaXNTd2lwZSkge1xyXG4gICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdzd2lwZScsIGV4dHJhKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncHJlc3NpbmcnKSB7XHJcbiAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwcmVzc2VuZCcsIHtcclxuICAgICAgICB0b3VjaDogdG91Y2gsXHJcbiAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUgZ2VzdHVyZXNbaWRdXHJcbiAgfVxyXG5cclxuICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlSGFuZGxlciwgZmFsc2UpXHJcbiAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoZW5kSGFuZGxlciwgZmFsc2UpXHJcbiAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRvdWNoY2FuY2VsSGFuZGxlciwgZmFsc2UpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogaGFuZGxlIHRvdWNoY2FuY2VsXHJcbiAqXHJcbiAqIDEuIGlmIHRoZXJlIGFyZSB0d28gdG91Y2ggcG9pbnRzLCB0aGVuIHRyaWdnZXIgJ2R1YWx0b3VjaGVuZCdcclxuICpcclxuICogMi4gdHJhdmVyc2UgZXZlcnR5IHRvdWNoIHBvaW50OlxyXG4gKiA+IGlmIHBhbm5uaWcsIHRoZW4gdHJpZ2dlciAncGFuZW5kJ1xyXG4gKiA+IGlmIHByZXNzaW5nLCB0aGVuIHRyaWdnZXIgJ3ByZXNzZW5kJ1xyXG4gKlxyXG4gKiAzLiByZW1vdmUgbGlzdGVuZXJzXHJcbiAqXHJcbiAqIEBldmVudFxyXG4gKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcclxuICovXHJcbmZ1bmN0aW9uIHRvdWNoY2FuY2VsSGFuZGxlcihldmVudCkge1xyXG5cclxuICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PSAyKSB7XHJcbiAgICB2YXIgZWxlbWVudHMgPSBbXVxyXG4gICAgZm9yICh2YXIgcCBpbiBnZXN0dXJlcykge1xyXG4gICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW3BdLmVsZW1lbnQpXHJcbiAgICB9XHJcbiAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaGVuZCcsIHtcclxuICAgICAgdG91Y2hlczogc2xpY2UuY2FsbChldmVudC50b3VjaGVzKSxcclxuICAgICAgdG91Y2hFdmVudDogZXZlbnRcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXVxyXG4gICAgdmFyIGlkID0gdG91Y2guaWRlbnRpZmllclxyXG4gICAgdmFyIGdlc3R1cmUgPSBnZXN0dXJlc1tpZF1cclxuXHJcbiAgICBpZiAoIWdlc3R1cmUpIHtcclxuICAgICAgY29udGludWVcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKVxyXG4gICAgICBnZXN0dXJlLnByZXNzaW5nSGFuZGxlciA9IG51bGxcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwYW5uaW5nJykge1xyXG4gICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncGFuZW5kJywge1xyXG4gICAgICAgIHRvdWNoOiB0b3VjaCxcclxuICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxyXG4gICAgICAgIGNoYW5nZWRUb3VjaGVzOiBldmVudC5jaGFuZ2VkVG91Y2hlcyxcclxuICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncHJlc3NpbmcnKSB7XHJcbiAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwcmVzc2VuZCcsIHtcclxuICAgICAgICB0b3VjaDogdG91Y2gsXHJcbiAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGRlbGV0ZSBnZXN0dXJlc1tpZF1cclxuICB9XHJcblxyXG4gIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAwKSB7XHJcbiAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmVIYW5kbGVyLCB0cnVlKVxyXG4gICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZEhhbmRsZXIsIHRydWUpXHJcbiAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRvdWNoY2FuY2VsSGFuZGxlciwgdHJ1ZSlcclxuICB9XHJcbn1cclxuXHJcbmlmICghaXNJbml0aWFsaXplZCkge1xyXG4gIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0SGFuZGxlciwgdHJ1ZSlcclxuICBpc0luaXRpYWxpemVkID0gdHJ1ZVxyXG59XHJcbiIsImNvbnN0IGxpYiA9IHdpbmRvdy5saWIgfHwgKHdpbmRvdy5saWIgPSB7fSlcclxuXHJcbi8qKlxyXG4gKiBWZXJzaW9uIGNsYXNzLlxyXG4gKiBAY2xhc3MgbGliLmVudn5WZXJzaW9uXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2IC0gdmVyc2lvbiBudW1iZXIuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBWZXJzaW9uICh2KSB7XHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd2YWwnLCB7XHJcbiAgICB2YWx1ZTogdi50b1N0cmluZygpLFxyXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gIH0pXHJcblxyXG4gIC8qKlxyXG4gICAqIGxhcmdlciB0aGFuXHJcbiAgICogQG1ldGhvZCBndFxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2IC0gdmVyc2lvblxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBtZW1iZXJvZiBWZXJzaW9uXHJcbiAgICovXHJcbiAgdGhpcy5ndCA9IGZ1bmN0aW9uICh2KSB7XHJcbiAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIHYpID4gMFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbGFyZ2VyIHRoYW4gb3IgZXF1YWwgdG8uXHJcbiAgICogQG1ldGhvZCBndGVcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdiAtIHZlcnNpb25cclxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAbWVtYmVyb2YgVmVyc2lvblxyXG4gICAqL1xyXG4gIHRoaXMuZ3RlID0gZnVuY3Rpb24gKHYpIHtcclxuICAgIHJldHVybiBWZXJzaW9uLmNvbXBhcmUodGhpcywgdikgPj0gMFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbGVzcyB0aGFuLlxyXG4gICAqIEBtZXRob2QgbHRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdiAtIHZlcnNpb25cclxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAbWVtYmVyb2YgVmVyc2lvblxyXG4gICAqL1xyXG4gIHRoaXMubHQgPSBmdW5jdGlvbiAodikge1xyXG4gICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCB2KSA8IDBcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxlc3MgdGhhbiBvciBlcXVhbCB0by5cclxuICAgKiBAbWV0aG9kIGx0ZVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2IC0gdmVyc2lvblxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBtZW1iZXJvZiBWZXJzaW9uXHJcbiAgICovXHJcbiAgdGhpcy5sdGUgPSBmdW5jdGlvbiAodikge1xyXG4gICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCB2KSA8PSAwXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBlcXVhbCB0by5cclxuICAgKiBAbWV0aG9kIGVxXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHYgLSB2ZXJzaW9uXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gZXF1YWwgdG9cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAbWVtYmVyb2YgVmVyc2lvblxyXG4gICAqL1xyXG4gIHRoaXMuZXEgPSBmdW5jdGlvbiAodikge1xyXG4gICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCB2KSA9PT0gMFxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHZlcnNpb24gbnVtYmVyIHN0cmluZy5cclxuICogQG1ldGhvZCB0b1N0cmluZ1xyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGN1cnJlbnQgdmVyc2lvbiBudW1iZXIgc3RyaW5nLlxyXG4gKiBAaW5zdGFuY2VcclxuICogQG1lbWJlcm9mIFZlcnNpb25cclxuICovXHJcblZlcnNpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiB0aGlzLnZhbFxyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJuIGN1cnJlbnQgdmVyc2lvbiBudW1iZXIuXHJcbiAqIEBtZXRob2QgdmFsdWVPZlxyXG4gKiBAcmV0dXJuIHtCb29sZWFufSB2ZXJzaW9uIG51bWJlclxyXG4gKiBAaW5zdGFuY2VcclxuICogQG1lbWJlcm9mIFZlcnNpb25cclxuICovXHJcblZlcnNpb24ucHJvdG90eXBlLnZhbHVlT2YgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgdiA9IHRoaXMudmFsLnNwbGl0KCcuJylcclxuICBjb25zdCByID0gW11cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHYubGVuZ3RoOyBpKyspIHtcclxuICAgIGxldCBuID0gcGFyc2VJbnQodltpXSwgMTApXHJcbiAgICBpZiAoaXNOYU4obikpIHtcclxuICAgICAgbiA9IDBcclxuICAgIH1cclxuICAgIGxldCBzID0gbi50b1N0cmluZygpXHJcbiAgICBpZiAocy5sZW5ndGggPCA1KSB7XHJcbiAgICAgIHMgPSBBcnJheSg2IC0gcy5sZW5ndGgpLmpvaW4oJzAnKSArIHNcclxuICAgIH1cclxuICAgIHIucHVzaChzKVxyXG4gICAgaWYgKHIubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHIucHVzaCgnLicpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBwYXJzZUZsb2F0KHIuam9pbignJykpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb21wYXJlIHR3byB2ZXJzaW9ucy5cclxuICogQG1ldGhvZCBjb21wYXJlXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2MSAtIHZlcnNpb24xXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2MiAtIHZlcnNpb24yXHJcbiAqIEByZXR1cm4ge051bWJlcn0gMCBmb3IgZXF1YWxpdHnvvIwtMSBmb3IgbGVzcyB0aGFu77yMMSBmb3IgbGFyZ2VyIHRoYW4uXHJcbiAqIEBtZW1iZXJvZiBWZXJzaW9uXHJcbiAqL1xyXG5WZXJzaW9uLmNvbXBhcmUgPSBmdW5jdGlvbiAodjEsIHYyKSB7XHJcbiAgdjEgPSB2MS50b1N0cmluZygpLnNwbGl0KCcuJylcclxuICB2MiA9IHYyLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdjEubGVuZ3RoIHx8IGkgPCB2Mi5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IG4xID0gcGFyc2VJbnQodjFbaV0sIDEwKVxyXG4gICAgbGV0IG4yID0gcGFyc2VJbnQodjJbaV0sIDEwKVxyXG4gICAgaWYgKHdpbmRvdy5pc05hTihuMSkpIHtcclxuICAgICAgbjEgPSAwXHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93LmlzTmFOKG4yKSkge1xyXG4gICAgICBuMiA9IDBcclxuICAgIH1cclxuICAgIGlmIChuMSA8IG4yKSB7XHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobjEgPiBuMikge1xyXG4gICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gMFxyXG59XHJcblxyXG4vKipcclxuICog6Kej5p6Q5ZKM5pON5L2c54mI5pys5Y+3XHJcbiAqIEBtZXRob2QgdmVyc2lvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdiAtIOmcgOimgeino+aekOeahOeJiOacrOWPt1xyXG4gKiBAcmV0dXJuIHtsaWIuZW52flZlcnNpb259IFZlcnNvbuWunuS+i1xyXG4gKiBAbWVtYmVyb2YgbGliXHJcbiAqL1xyXG5saWIudmVyc2lvbiA9IGZ1bmN0aW9uICh2KSB7XHJcbiAgcmV0dXJuIG5ldyBWZXJzaW9uKHYpXHJcbn1cclxuIiwiY29uc3QgbGliID0gd2luZG93LmxpYiB8fCAod2luZG93LmxpYiA9IHt9KVxyXG5jb25zdCBlbnYgPSBsaWIuZW52IHx8IChsaWIuZW52ID0ge30pXHJcblxyXG5jb25zdCBzZWFyY2ggPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJylcclxuZW52LnBhcmFtcyA9IHt9XHJcbmlmIChzZWFyY2gpIHtcclxuICBjb25zdCBwYXJhbXMgPSBzZWFyY2guc3BsaXQoJyYnKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBwYXJhbXNbaV0gPSBwYXJhbXNbaV0uc3BsaXQoJz0nKVxyXG4gICAgdHJ5IHtcclxuICAgICAgZW52LnBhcmFtc1twYXJhbXNbaV1bMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtc1tpXVsxXSlcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGVudi5wYXJhbXNbcGFyYW1zW2ldWzBdXSA9IHBhcmFtc1tpXVsxXVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgJy4vdmVyc2lvbidcclxuaW1wb3J0ICcuL3BhcmFtcydcclxuXHJcbmNvbnN0IGxpYiA9IHdpbmRvdy5saWIgfHwgKHdpbmRvdy5saWIgPSB7fSlcclxuY29uc3QgZW52ID0gbGliLmVudiB8fCAobGliLmVudiA9IHt9KVxyXG5cclxuY29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudFxyXG5sZXQgbWF0Y2hcclxuXHJcbi8qKlxyXG4gKiBvc1xyXG4gKi9cclxuXHJcbm1hdGNoID0gdWEubWF0Y2goL1dpbmRvd3NcXHNQaG9uZVxccyg/Ok9TXFxzKT8oW1xcZC5dKykvKVxyXG5pZiAobWF0Y2gpIHtcclxuICAvKipcclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqIEBtZW1iZXJvZiBsaWIuZW52XHJcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgLSBvcyBuYW1lLCBlLmcuIEFuZHJvaWQvQW5kcm9pZFBhZC9pUGhvbmUvaVBvZC9pUGFkL1dpbmRvd3MgUGhvbmUvdW5rbm93biwgZXRjLlxyXG4gICAqIEBwcm9wZXJ0eSB7bGliLmVudn5WZXJzaW9ufSB2ZXJzaW9uIC0gb3MgdmVyc2lvbi5cclxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzV2luZG93c1Bob25lXHJcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc0lQaG9uZSAtIGlzIGlQaG9uZS9pVG91Y2hcclxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzSVBhZFxyXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNJT1NcclxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzQW5kcm9pZFxyXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNBbmRyb2lkUGFkXHJcbiAgICovXHJcbiAgZW52Lm9zID0ge1xyXG4gICAgbmFtZTogJ1dpbmRvd3MgUGhvbmUnLFxyXG4gICAgaXNXaW5kb3dzUGhvbmU6IHRydWUsXHJcbiAgICB2ZXJzaW9uOiBtYXRjaFsxXVxyXG4gIH1cclxufVxyXG5lbHNlIGlmICghIXVhLm1hdGNoKC9TYWZhcmkvKSAmJiAobWF0Y2ggPSB1YS5tYXRjaCgvQW5kcm9pZFtcXHMvXShbXFxkLl0rKS8pKSkge1xyXG4gIGVudi5vcyA9IHtcclxuICAgIHZlcnNpb246IG1hdGNoWzFdXHJcbiAgfVxyXG5cclxuICBpZiAoKHVhLm1hdGNoKC9Nb2JpbGVcXHMrU2FmYXJpLykpKSB7XHJcbiAgICBlbnYub3MubmFtZSA9ICdBbmRyb2lkJ1xyXG4gICAgZW52Lm9zLmlzQW5kcm9pZCA9IHRydWVcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBlbnYub3MubmFtZSA9ICdBbmRyb2lkUGFkJ1xyXG4gICAgZW52Lm9zLmlzQW5kcm9pZFBhZCA9IHRydWVcclxuICB9XHJcbn1cclxuZWxzZSBpZiAoKG1hdGNoID0gdWEubWF0Y2goLyhpUGhvbmV8aVBhZHxpUG9kKS8pKSkge1xyXG4gIGNvbnN0IG5hbWUgPSBtYXRjaFsxXVxyXG5cclxuICBtYXRjaCA9IHVhLm1hdGNoKC9PUyAoW1xcZF8uXSspIGxpa2UgTWFjIE9TIFgvKVxyXG5cclxuICBlbnYub3MgPSB7XHJcbiAgICBuYW1lOiBuYW1lLFxyXG4gICAgaXNJUGhvbmU6IChuYW1lID09PSAnaVBob25lJyB8fCBuYW1lID09PSAnaVBvZCcpLFxyXG4gICAgaXNJUGFkOiBuYW1lID09PSAnaVBhZCcsXHJcbiAgICBpc0lPUzogdHJ1ZSxcclxuICAgIHZlcnNpb246IG1hdGNoICYmIG1hdGNoWzFdLnNwbGl0KCdfJykuam9pbignLicpIHx8ICcnXHJcbiAgfVxyXG59XHJcbmVsc2Uge1xyXG4gIGVudi5vcyA9IHtcclxuICAgIG5hbWU6ICd1bmtub3duJyxcclxuICAgIHZlcnNpb246ICcwLjAuMCdcclxuICB9XHJcbn1cclxuXHJcbmlmIChsaWIudmVyc2lvbikge1xyXG4gIGVudi5vcy52ZXJzaW9uID0gbGliLnZlcnNpb24oZW52Lm9zLnZlcnNpb24pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBicm93c2VyXHJcbiAqL1xyXG5cclxubWF0Y2ggPSB1YS5tYXRjaCgvKD86VUNXRUJ8VUNCcm93c2VyXFwvKShbXFxkLl0rKS8pXHJcblxyXG5pZiAobWF0Y2gpIHtcclxuICAvKipcclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqIEBtZW1iZXJvZiBlbnZcclxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSAtIGJyb3dzZXIgbmFtZe+8jGUuZy4gVUMvUVEvRmlyZWZveC9DaHJvbWUvQW5kcm9pZC9TYWZhcmkvaU9TIFdlYnZpZXcvQ2hyb21lIFdlYnZpZXcvSUUvSUVNb2JpbGUvdW5rbm93biwgZXRjLlxyXG4gICAqIEBwcm9wZXJ0eSB7ZW52flZlcnNpb259IHZlcnNpb24gLSBicm93c2VyIHZlcnNpb24uXHJcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc1VDXHJcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc1FRXHJcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc0lFXHJcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc0lFTW9iaWxlXHJcbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc0lFTGlrZVdlYmtpdFxyXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNDaHJvbWVcclxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzQW5kcm9pZFxyXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNTYWZhcmlcclxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzV2Vidmlld1xyXG4gICAqL1xyXG4gIGVudi5icm93c2VyID0ge1xyXG4gICAgbmFtZTogJ1VDJyxcclxuICAgIGlzVUM6IHRydWUsXHJcbiAgICB2ZXJzaW9uOiBtYXRjaFsxXVxyXG4gIH1cclxufVxyXG5lbHNlIGlmICgobWF0Y2ggPSB1YS5tYXRjaCgvTVFRQnJvd3NlclxcLyhbXFxkLl0rKS8pKSkge1xyXG4gIGVudi5icm93c2VyID0ge1xyXG4gICAgbmFtZTogJ1FRJyxcclxuICAgIGlzUVE6IHRydWUsXHJcbiAgICB2ZXJzaW9uOiBtYXRjaFsxXVxyXG4gIH1cclxufVxyXG5lbHNlIGlmICgobWF0Y2ggPSB1YS5tYXRjaCgvRmlyZWZveFxcLyhbXFxkLl0rKS8pKSkge1xyXG4gIGVudi5icm93c2VyID0ge1xyXG4gICAgbmFtZTogJ0ZpcmVmb3gnLFxyXG4gICAgaXNGaXJlZm94OiB0cnVlLFxyXG4gICAgdmVyc2lvbjogbWF0Y2hbMV1cclxuICB9XHJcbn1cclxuZWxzZSBpZiAoKG1hdGNoID0gdWEubWF0Y2goL01TSUVcXHMoW1xcZC5dKykvKSlcclxuICB8fCAobWF0Y2ggPSB1YS5tYXRjaCgvSUVNb2JpbGVcXC8oW1xcZC5dKykvKSkpIHtcclxuICBlbnYuYnJvd3NlciA9IHtcclxuICAgIHZlcnNpb246IG1hdGNoWzFdXHJcbiAgfVxyXG5cclxuICBpZiAodWEubWF0Y2goL0lFTW9iaWxlLykpIHtcclxuICAgIGVudi5icm93c2VyLm5hbWUgPSAnSUVNb2JpbGUnXHJcbiAgICBlbnYuYnJvd3Nlci5pc0lFTW9iaWxlID0gdHJ1ZVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGVudi5icm93c2VyLm5hbWUgPSAnSUUnXHJcbiAgICBlbnYuYnJvd3Nlci5pc0lFID0gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgaWYgKHVhLm1hdGNoKC9BbmRyb2lkfGlQaG9uZS8pKSB7XHJcbiAgICBlbnYuYnJvd3Nlci5pc0lFTGlrZVdlYmtpdCA9IHRydWVcclxuICB9XHJcbn1cclxuZWxzZSBpZiAoKG1hdGNoID0gdWEubWF0Y2goLyg/OkNocm9tZXxDcmlPUylcXC8oW1xcZC5dKykvKSkpIHtcclxuICBlbnYuYnJvd3NlciA9IHtcclxuICAgIG5hbWU6ICdDaHJvbWUnLFxyXG4gICAgaXNDaHJvbWU6IHRydWUsXHJcbiAgICB2ZXJzaW9uOiBtYXRjaFsxXVxyXG4gIH1cclxuXHJcbiAgaWYgKHVhLm1hdGNoKC9WZXJzaW9uXFwvW1xcZCsuXStcXHMqQ2hyb21lLykpIHtcclxuICAgIGVudi5icm93c2VyLm5hbWUgPSAnQ2hyb21lIFdlYnZpZXcnXHJcbiAgICBlbnYuYnJvd3Nlci5pc1dlYnZpZXcgPSB0cnVlXHJcbiAgfVxyXG59XHJcbmVsc2UgaWYgKCEhdWEubWF0Y2goL1NhZmFyaS8pICYmIChtYXRjaCA9IHVhLm1hdGNoKC9BbmRyb2lkW1xccy9dKFtcXGQuXSspLykpKSB7XHJcbiAgZW52LmJyb3dzZXIgPSB7XHJcbiAgICBuYW1lOiAnQW5kcm9pZCcsXHJcbiAgICBpc0FuZHJvaWQ6IHRydWUsXHJcbiAgICB2ZXJzaW9uOiBtYXRjaFsxXVxyXG4gIH1cclxufVxyXG5lbHNlIGlmICh1YS5tYXRjaCgvaVBob25lfGlQYWR8aVBvZC8pKSB7XHJcbiAgaWYgKHVhLm1hdGNoKC9TYWZhcmkvKSkge1xyXG4gICAgbWF0Y2ggPSB1YS5tYXRjaCgvVmVyc2lvblxcLyhbXFxkLl0rKS8pXHJcbiAgICBlbnYuYnJvd3NlciA9IHtcclxuICAgICAgbmFtZTogJ1NhZmFyaScsXHJcbiAgICAgIGlzU2FmYXJpOiB0cnVlLFxyXG4gICAgICB2ZXJzaW9uOiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJ1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIG1hdGNoID0gdWEubWF0Y2goL09TIChbXFxkXy5dKykgbGlrZSBNYWMgT1MgWC8pXHJcbiAgICBlbnYuYnJvd3NlciA9IHtcclxuICAgICAgbmFtZTogJ2lPUyBXZWJ2aWV3JyxcclxuICAgICAgaXNXZWJ2aWV3OiB0cnVlLFxyXG4gICAgICB2ZXJzaW9uOiBtYXRjaCAmJiBtYXRjaFsxXS5yZXBsYWNlKC9fL2csICcuJykgfHwgJydcclxuICAgIH1cclxuICB9XHJcbn1cclxuZWxzZSB7XHJcbiAgZW52LmJyb3dzZXIgPSB7XHJcbiAgICBuYW1lOiAndW5rbm93bicsXHJcbiAgICB2ZXJzaW9uOiAnMC4wLjAnXHJcbiAgfVxyXG59XHJcblxyXG5pZiAobGliLnZlcnNpb24pIHtcclxuICBlbnYuYnJvd3Nlci52ZXJzaW9uID0gbGliLnZlcnNpb24oZW52LmJyb3dzZXIudmVyc2lvbilcclxufVxyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5jb25zdCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuXHJcbi8qKlxyXG4gKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXHJcbiAqIGZvciBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Kn0gb2JqXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqL1xyXG5jb25zdCBPQkpFQ1RfU1RSSU5HID0gJ1tvYmplY3QgT2JqZWN0XSdcclxuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xyXG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9TVFJJTkdcclxufVxyXG5cclxuY29uc3QgQVJSQVlfU1RSSU5HID0gJ1tvYmplY3QgQXJyYXldJ1xyXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSAoYXJyKSB7XHJcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PT0gQVJSQVlfU1RSSU5HXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZSAodmFsKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcclxuICAgIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcclxuICAgIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N5bWJvbCdcclxuICAgIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RlZiAodmFsKSB7XHJcbiAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkICYmIHZhbCAhPT0gbnVsbFxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBpc0FycmF5XHJcbn0gZnJvbSAnLi90eXBlJ1xyXG4vKipcclxuICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxyXG4gKiB0aGUgcmlnaHRlc3Qgb2JqZWN0J3MgdmFsdWUgaGFzIHRoZSBoaWdoZXN0IHByaW9yaXR5LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCAodG8sIC4uLmFyZ3MpIHtcclxuICBpZiAoIWFyZ3MgfHwgYXJncy5sZW5ndGggPD0gMCkge1xyXG4gICAgcmV0dXJuIHRvXHJcbiAgfVxyXG4gIGFyZ3MuZm9yRWFjaChmcm9tID0+IHtcclxuICAgIGlmICh0eXBlb2YgZnJvbSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBmcm9tKSB7XHJcbiAgICAgIHRvW2tleV0gPSBmcm9tW2tleV1cclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiB0b1xyXG59XHJcbi8qKlxyXG4gKiBNaXggdHJ1dGh5IG9yICcnIHByb3BlcnR5IHZhbHVlcyBpbnRvIHRhcmdldCBvYmplY3QuXHJcbiAqIG1vc3RseSBmb3IgbWVyZ2luZyBzdHlsZXMuICh0aGF0J3Mgd2h5ICcnIGlzIGZhbHN5IGJ1dCBzdGlsbCBzaG91bGQgYmUgY291bnRlZCBpbi4pXHJcbiAqIHRoZSByaWdodGVzdCBvYmplY3QncyB2YWx1ZSBoYXMgdGhlIGhpZ2hlc3QgcHJpb3JpdHkuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kVHJ1dGh5ICh0bywgLi4uYXJncykge1xyXG4gIGlmICghYXJncyB8fCBhcmdzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICByZXR1cm4gdG9cclxuICB9XHJcbiAgYXJncy5mb3JFYWNoKGZyb20gPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBmcm9tICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGxldCBpXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBmcm9tKSB7XHJcbiAgICAgIGlmICgoKGkgPSBmcm9tW2tleV0pIHx8IGkgPT09ICcnIHx8IGkgPT09IDApICYmIGkgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdG9ba2V5XSA9IGlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgcmV0dXJuIHRvXHJcbn1cclxuLyoqXHJcbiAqIE1peCBzcGVjaWZpZWQgcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kS2V5cyAodG8sIGZyb20gPSB7fSwga2V5cykge1xyXG4gIChrZXlzIHx8IFtdKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBmcm9tICYmICh0b1trZXldID0gZnJvbVtrZXldKVxyXG4gIH0pXHJcbiAgcmV0dXJuIHRvXHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3Qgc3BlY2lmaWVkIHByb3BlcnRpZXMgZnJvbSBzcmMgdG8gdGFyZ2V0IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0S2V5cyAodG8sIGZyb20gPSB7fSwga2V5cykge1xyXG4gIGlmICghZnJvbSkge1xyXG4gICAgcmV0dXJuIHRvXHJcbiAgfVxyXG4gIChrZXlzIHx8IFtdKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBmcm9tICYmICh0b1trZXldID0gZnJvbVtrZXldKVxyXG4gICAgZnJvbSAmJiAoZGVsZXRlIGZyb21ba2V5XSlcclxuICB9KVxyXG4gIHJldHVybiB0b1xyXG59XHJcbi8qKlxyXG4gKiBTaW1wbGUgYmluZCwgZmFzdGVyIHRoYW4gbmF0aXZlXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYmluZCAoZm4sIGN0eCkge1xyXG4gIHJldHVybiBmdW5jdGlvbiAoYSkge1xyXG4gICAgY29uc3QgbCA9IGFyZ3VtZW50cy5sZW5ndGhcclxuICAgIHJldHVybiBsID8gbCA+IDEgPyBmbi5hcHBseShjdHgsIGFyZ3VtZW50cykgOiBmbi5jYWxsKGN0eCwgYSkgOiBmbi5jYWxsKGN0eClcclxuICB9XHJcbn1cclxuLyoqXHJcbiAqIE9ubHkgY2FsbCB0aGUgZnVuYyB0aGUgbGFzdCB0aW1lIGJlZm9yZSBpdCdzIG5vdCB0aGF0IGZyZXF1ZW50bHkgY2FsbGVkLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlIChmdW5jLCB3YWl0KSB7XHJcbiAgbGV0IHRpbWVySWRcclxuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcklkKVxyXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gbGF0ZXIgKCkge1xyXG4gICAgICB0aW1lcklkID0gbnVsbFxyXG4gICAgICBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpXHJcbiAgICB9LCB3YWl0KVxyXG4gIH1cclxufVxyXG4vKipcclxuICogT25seSBjYWxsIHRoZSBmdW5jIHRoZSBmaXJzdCB0aW1lIGJlZm9yZSBhIHNlcmllcyBmcmVxdWVudGx5IGZ1bmN0aW9uIGNhbGxzIGhhcHBlbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXByZXNzIChmdW5jLCB3YWl0KSB7XHJcbiAgbGV0IHRpbWVySWRcclxuXHJcbiAgZnVuY3Rpb24gbGF0ZXIgKCkge1xyXG4gICAgdGltZXJJZCA9IG51bGxcclxuICB9XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGltZXJJZCkge1xyXG4gICAgICBmdW5jLmFwcGx5KClcclxuICAgIH1cclxuICAgIGNsZWFyVGltZW91dCh0aW1lcklkKVxyXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpXHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBPbmx5IGNhbGwgdGhlIGZ1bmMgZXZlcnkgdGltZSBhZnRlciBhIHdhaXQgbWlsbGlzZWNvbmRzIGlmIGl0J3MgdG9vIGZyZXF1ZW50bHkgY2FsbGVkLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlIChmdW5jLCB3YWl0LCBjYWxsTGFzdFRpbWUpIHtcclxuICBsZXQgbGFzdCA9IDBcclxuICBsZXQgbGFzdFRpbWVyID0gbnVsbFxyXG4gIGNvbnN0IGxhc3RUaW1lRHVyYXRpb24gPSB3YWl0ICsgKHdhaXQgPiAyNSA/IHdhaXQgOiAyNSkgLy8gcGx1cyBoYWxmIHdhaXQgdGltZS5cclxuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzXHJcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgIGlmICh0aW1lIC0gbGFzdCA+IHdhaXQpIHtcclxuICAgICAgaWYgKGNhbGxMYXN0VGltZSkge1xyXG4gICAgICAgIGxhc3RUaW1lciAmJiBjbGVhclRpbWVvdXQobGFzdFRpbWVyKVxyXG4gICAgICAgIGxhc3RUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgbGFzdFRpbWVyID0gbnVsbFxyXG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxyXG4gICAgICAgIH0sIGxhc3RUaW1lRHVyYXRpb24pXHJcbiAgICAgIH1cclxuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxyXG4gICAgICBsYXN0ID0gdGltZVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4vLyBkaXJlY3Rpb246ICdsJyB8ICdyJywgZGVmYXVsdCBpcyAncidcclxuLy8gbnVtOiBob3cgbWFueSB0aW1lcyB0byBsb29wLCBzaG91bGQgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyXHJcbmV4cG9ydCBmdW5jdGlvbiBsb29wQXJyYXkgKGFyciwgbnVtLCBkaXJlY3Rpb24pIHtcclxuICBpZiAoIWlzQXJyYXkoYXJyKSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIGxldCBpc0xlZnQgPSAoZGlyZWN0aW9uICsgJycpLnRvTG93ZXJDYXNlKCkgPT09ICdsJ1xyXG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcclxuICBudW0gPSBudW0gJSBsZW5cclxuICBpZiAobnVtIDwgMCkge1xyXG4gICAgbnVtID0gLW51bVxyXG4gICAgaXNMZWZ0ID0gIWlzTGVmdFxyXG4gIH1cclxuICBpZiAobnVtID09PSAwKSB7XHJcbiAgICByZXR1cm4gYXJyXHJcbiAgfVxyXG4gIGxldCBscCwgcnBcclxuICBpZiAoaXNMZWZ0KSB7XHJcbiAgICBscCA9IGFyci5zbGljZSgwLCBudW0pXHJcbiAgICBycCA9IGFyci5zbGljZShudW0pXHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgbHAgPSBhcnIuc2xpY2UoMCwgbGVuIC0gbnVtKVxyXG4gICAgcnAgPSBhcnIuc2xpY2UobGVuIC0gbnVtKVxyXG4gIH1cclxuICByZXR1cm4gcnAuY29uY2F0KGxwKVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgY2FjaGVkIHZlcnNpb24gb2YgYSBwdXJlIGZ1bmN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNhY2hlZCAoZm4pIHtcclxuICBjb25zdCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbClcclxuICByZXR1cm4gZnVuY3Rpb24gY2FjaGVkRm4gKHN0cikge1xyXG4gICAgY29uc3QgaGl0ID0gY2FjaGVbc3RyXVxyXG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpXHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBDYW1lbGl6ZSBhIGh5cGhlbi1kZWxtaXRlZCBzdHJpbmcuXHJcbiAqL1xyXG5jb25zdCBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nXHJcbmV4cG9ydCBjb25zdCBjYW1lbGl6ZSA9IGNhY2hlZChzdHIgPT4ge1xyXG4gIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCAoXywgYykgPT4gYy50b1VwcGVyQ2FzZSgpKVxyXG59KVxyXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxpemVLZXlzIChvYmopIHtcclxuICBjb25zdCByZXMgPSB7fVxyXG4gIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG4gICAgcmVzW2NhbWVsaXplKGtleSldID0gb2JqW2tleV1cclxuICB9XHJcbiAgcmV0dXJuIHJlc1xyXG59XHJcbi8qKlxyXG4gKiBDYXBpdGFsaXplIGEgc3RyaW5nLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhcGl0YWxpemUgPSBjYWNoZWQoc3RyID0+IHtcclxuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXHJcbn0pXHJcbi8qKlxyXG4gKiBIeXBoZW5hdGUgYSBjYW1lbENhc2Ugc3RyaW5nLlxyXG4gKi9cclxuY29uc3QgaHlwaGVuYXRlUkUgPSAvKFteLV0pKFtBLVpdKS9nXHJcbmV4cG9ydCBjb25zdCBoeXBoZW5hdGUgPSBjYWNoZWQoc3RyID0+IHtcclxuICByZXR1cm4gc3RyLnJlcGxhY2UoaHlwaGVuYXRlUkUsICckMS0kMicpLnJlcGxhY2UoaHlwaGVuYXRlUkUsICckMS0kMicpLnRvTG93ZXJDYXNlKClcclxufSlcclxuZXhwb3J0IGZ1bmN0aW9uIGh5cGhlbmF0ZUtleXMgKG9iaikge1xyXG4gIGNvbnN0IHJlcyA9IHt9XHJcbiAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcbiAgICByZXNbaHlwaGVuYXRlKGtleSldID0gb2JqW2tleV1cclxuICB9XHJcbiAgcmV0dXJuIHJlc1xyXG59XHJcbmNvbnN0IHZlbmRvcnNSZWcgPSAvd2Via2l0LXxtb3otfG8tfG1zLS9cclxuZXhwb3J0IGZ1bmN0aW9uIGh5cGhlbmF0ZVN0eWxlS2V5cyAob2JqKSB7XHJcbiAgY29uc3QgcmVzID0ge31cclxuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgIGNvbnN0IGhrID0gaHlwaGVuYXRlKGtleSkucmVwbGFjZSh2ZW5kb3JzUmVnLCBmdW5jdGlvbiAoJDApIHtcclxuICAgICAgcmV0dXJuICctJyArICQwXHJcbiAgICB9KVxyXG4gICAgcmVzW2hrXSA9IG9ialtrZXldXHJcbiAgfVxyXG4gIHJldHVybiByZXNcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxUb0tlYmFiIChuYW1lKSB7XHJcbiAgaWYgKCFuYW1lKSB7XHJcbiAgICByZXR1cm4gJydcclxuICB9XHJcbiAgcmV0dXJuIG5hbWUucmVwbGFjZSgvKFtBLVpdKS9nLCBmdW5jdGlvbiAoZywgZzEpIHtcclxuICAgIHJldHVybiBgLSR7ZzEudG9Mb3dlckNhc2UoKX1gXHJcbiAgfSlcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ3NzIChjc3MsIGNzc0lkLCByZXBsYWNlKSB7XHJcbiAgbGV0IHN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpXHJcbiAgaWYgKHN0eWxlICYmIHJlcGxhY2UpIHtcclxuICAgIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpXHJcbiAgICBzdHlsZSA9IG51bGxcclxuICB9XHJcbiAgaWYgKCFzdHlsZSkge1xyXG4gICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXHJcbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJ1xyXG4gICAgY3NzSWQgJiYgKHN0eWxlLmlkID0gY3NzSWQpXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxyXG4gIH1cclxuICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBuZXh0RnJhbWUgKGNhbGxiYWNrKSB7XHJcbiAgY29uc3QgcnVubmVyID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxyXG4gICAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxyXG4gICAgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxyXG4gICAgfHwgKGNiID0+IHNldFRpbWVvdXQoY2IsIDE2KSlcclxuICBydW5uZXIoY2FsbGJhY2spXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHRvQ1NTVGV4dCAob2JqZWN0KSB7XHJcbiAgaWYgKCFvYmplY3QpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBjb25zdCBvYmogPSBoeXBoZW5hdGVTdHlsZUtleXMob2JqZWN0KVxyXG4gIGxldCBjc3NUZXh0ID0gJydcclxuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgIGNzc1RleHQgKz0gYCR7a2V5fToke29ialtrZXldfTtgXHJcbiAgfVxyXG4gIHJldHVybiBjc3NUZXh0XHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvZnVuYydcclxuXHJcbi8qKlxyXG4gKiB2aWV3cG9ydCBwcmlvcml0eTpcclxuICpcclxuICogMS4gbWV0YSB3ZWV4LXZpZXdwb3J0IChkZXZlbG9wZXIgY3VzdG9tKVxyXG4gKiAyLiBzZXRWaWV3cG9ydChjb25maWcpIDo9IGNvbmZpZy53aWR0aCAocHJpdmF0ZSBjb2RlKSBAZGVwcmVjYXRlZFxyXG4gKiAzLiBwcm9jZXNzLmVudi5WSUVXUE9SVF9XSURUSCAoYnVpZCB0aW1lKVxyXG4gKlxyXG4gKi9cclxubGV0IGlzSW5pdGVkID0gZmFsc2VcclxuY29uc3QgREVGQVVMVF9WSUVXUE9SVF9XSURUSCA9IDc1MFxyXG5cclxuLyoqXHJcbiAqIGdldCB2aWV3cG9ydCB3aWR0aCBmcm9tIHdlZXgtdmlld3BvcnQgbWV0YS5cclxuICovXHJcbmNvbnN0IGVudlZpZXdwb3J0V2lkdGggPSBwYXJzZUludChwcm9jZXNzLmVudi5WSUVXUE9SVF9XSURUSClcclxubGV0IHdpZHRoID0gIWlzTmFOKGVudlZpZXdwb3J0V2lkdGgpICYmIGVudlZpZXdwb3J0V2lkdGggPiAwXHJcbiAgPyBlbnZWaWV3cG9ydFdpZHRoXHJcbiAgOiBERUZBVUxUX1ZJRVdQT1JUX1dJRFRIXHJcblxyXG5sZXQgd3hWaWV3cG9ydE1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ3ZWV4LXZpZXdwb3J0XCJdJylcclxuY29uc3QgbWV0YVdpZHRoID0gd3hWaWV3cG9ydE1ldGEgJiYgcGFyc2VJbnQod3hWaWV3cG9ydE1ldGEuZ2V0QXR0cmlidXRlKCdjb250ZW50JykpXHJcbmlmIChtZXRhV2lkdGggJiYgIWlzTmFOKG1ldGFXaWR0aCkgJiYgbWV0YVdpZHRoID4gMCkge1xyXG4gIHdpZHRoID0gbWV0YVdpZHRoXHJcbn1cclxuXHJcbmxldCBkcHIgPSAwXHJcbmxldCBzY3JlZW5XaWR0aCA9IDBcclxubGV0IHNjcmVlbkhlaWdodCA9IDBcclxuXHJcbmNvbnN0IGluZm8gPSB7XHJcbiAgZHByLFxyXG4gIHNjYWxlOiAwLFxyXG4gIHJvb3RWYWx1ZTogMCxcclxuICByZW06IDAsXHJcbiAgZGV2aWNlV2lkdGg6IDAsXHJcbiAgZGV2aWNlSGVpZ2h0OiAwXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBzZXQgcm9vdCBmb250LXNpemUgZm9yIHJlbSB1bml0cy4gSWYgYWxyZWFkeSBiZWVuIHNldCwganVzdCBza2lwIHRoaXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRSb290Rm9udCAod2lkdGgsIHZpZXdwb3J0V2lkdGgsIGZvcmNlKSB7XHJcbiAgY29uc3QgZG9jID0gd2luZG93LmRvY3VtZW50XHJcbiAgY29uc3QgcmVtID0gd2lkdGggKiA3NTAgLyB2aWV3cG9ydFdpZHRoIC8gMTBcclxuICBpZiAoIWRvYy5kb2N1bWVudEVsZW1lbnQpIHsgcmV0dXJuIH1cclxuICBjb25zdCByb290Rm9udFNpemUgPSBkb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmZvbnRTaXplXHJcbiAgaWYgKCFyb290Rm9udFNpemUgfHwgZm9yY2UpIHtcclxuICAgIGRvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSByZW0gKyAncHgnXHJcbiAgfVxyXG4gIGluZm8ucmVtID0gcmVtXHJcbiAgaW5mby5yb290VmFsdWUgPSB2aWV3cG9ydFdpZHRoIC8gMTBcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0TWV0YVZpZXdwb3J0ICh3aWR0aCkge1xyXG4gIGlmICghd3hWaWV3cG9ydE1ldGEpIHtcclxuICAgIHd4Vmlld3BvcnRNZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpXHJcbiAgICB3eFZpZXdwb3J0TWV0YS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnd2VleC12aWV3cG9ydCcpXHJcbiAgICBjb25zdCBmaXJzdE1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhJylcclxuICAgIGNvbnN0IGhlYWQgPSBmaXJzdE1ldGEgJiYgZmlyc3RNZXRhLnBhcmVudEVsZW1lbnRcclxuICAgICAgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNoaWxkcmVuWzBdXHJcbiAgICBmaXJzdE1ldGFcclxuICAgICAgPyBoZWFkLmluc2VydEJlZm9yZSh3eFZpZXdwb3J0TWV0YSwgZmlyc3RNZXRhKVxyXG4gICAgICA6IGhlYWQuYXBwZW5kQ2hpbGQod3hWaWV3cG9ydE1ldGEpXHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgY29uc3QgbWV0YVdpZHRoID0gcGFyc2VJbnQod3hWaWV3cG9ydE1ldGEuZ2V0QXR0cmlidXRlKCdjb250ZW50JykpXHJcbiAgICBpZiAobWV0YVdpZHRoID09PSB3aWR0aCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICB9XHJcbiAgd3hWaWV3cG9ydE1ldGEuc2V0QXR0cmlidXRlKCdjb250ZW50Jywgd2lkdGggKyAnJylcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4cG9ydCB2aWV3cG9ydCBpbmZvLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXQgKHZpZXdwb3J0V2lkdGggPSB3aWR0aCkge1xyXG4gIGlmICghaXNJbml0ZWQpIHtcclxuICAgIGlzSW5pdGVkID0gdHJ1ZVxyXG5cclxuICAgIGNvbnN0IGRvYyA9IHdpbmRvdy5kb2N1bWVudFxyXG4gICAgaWYgKCFkb2MpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignW3Z1ZS1yZW5kZXJdIHdpbmRvdy5kb2N1bWVudCBpcyB1bmRmaW5lZC4nKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmICghZG9jLmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdbdnVlLXJlbmRlcl0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IGlzIHVuZGZpbmVkLicpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGRwciA9IGluZm8uZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW9cclxuICAgIHNjcmVlbldpZHRoID0gZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgc2NyZWVuSGVpZ2h0ID0gZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcclxuXHJcbiAgICBjb25zdCByZXNldERldmljZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2NyZWVuSGVpZ2h0ID0gZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcclxuICAgICAgY29uc3QgZW52ID0gd2luZG93LndlZXggJiYgd2luZG93LndlZXguY29uZmlnLmVudlxyXG4gICAgICBpbmZvLmRldmljZUhlaWdodCA9IGVudi5kZXZpY2VIZWlnaHQgPSBzY3JlZW5IZWlnaHQgKiBkcHJcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgcm9vdCBmb250IGZvciByZW0uXHJcbiAgICBzZXRSb290Rm9udChzY3JlZW5XaWR0aCwgdmlld3BvcnRXaWR0aClcclxuICAgIHNldE1ldGFWaWV3cG9ydCh2aWV3cG9ydFdpZHRoKVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNldERldmljZUhlaWdodClcclxuXHJcbiAgICAvKipcclxuICAgICAqIHdoeSBub3QgdG8gdXNlIHdpbmRvdy5zY3JlZW4ud2lkdGggdG8gZ2V0IHNjcmVlbldpZHRoID8gQmVjYXVzZSBpbiBzb21lXHJcbiAgICAgKiBvbGQgd2Via2l0IGJyb3dzZXIgb24gYW5kcm9pZCBzeXN0ZW0gaXQgZ2V0IHRoZSBkZXZpY2UgcGl4ZWwgd2lkdGgsIHdoaWNoXHJcbiAgICAgKiBpcyB0aGUgc2NyZWVuV2lkdGggbXVsdGlwbHkgYnkgdGhlIGRldmljZSBwaXhlbCByYXRpby5cclxuICAgICAqIGUuZy4gaXA2IC0+IGdldCAzNzUgZm9yIHZpcnR1YWwgc2NyZWVuIHdpZHRoLlxyXG4gICAgICovXHJcbiAgICBjb25zdCBzY2FsZSA9IHNjcmVlbldpZHRoIC8gdmlld3BvcnRXaWR0aFxyXG4gICAgLyoqXHJcbiAgICAgKiAxLiBpZiBzZXQgaW5pdGlhbC9tYXhpbXVtL21pbWltdW0tc2NhbGUgc29tZSBob3cgdGhlIHBhZ2Ugd2lsbCBoYXZlIGEgYm91bmNlXHJcbiAgICAgKiBlZmZlY3Qgd2hlbiB1c2VyIGRyYWcgdGhlIHBhZ2UgdG93YXJkcyBob3Jpem9udGFsIGF4aXMuXHJcbiAgICAgKiAyLiBEdWUgdG8gY29tcGF0aWJpbGl0eSByZWFzb25zLCBub3QgdG8gdXNlIHZpZXdwb3J0IG1ldGEgYW55bW9yZS5cclxuICAgICAqIDMuIHZpZXdwb3J0IG1ldGEgc2hvdWxkIGFsd2F5cyBiZTpcclxuICAgICAqICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiXHJcbiAgICAgKiAgICAgIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsXHJcbiAgICAgKiAgICAgIGluaXRpYWwtc2NhbGU9MSxcclxuICAgICAqICAgICAgbWF4aW11bS1zY2FsZT0xLFxyXG4gICAgICogICAgICB1c2VyLXNjYWxhYmxlPW5vXCIgLz5cclxuICAgICAqL1xyXG4gICAgZXh0ZW5kKGluZm8sIHtcclxuICAgICAgc2NhbGUsXHJcbiAgICAgIHJvb3RWYWx1ZTogdmlld3BvcnRXaWR0aCAvIDEwLFxyXG4gICAgICBkZXZpY2VXaWR0aDogc2NyZWVuV2lkdGggKiBkcHIsXHJcbiAgICAgIGRldmljZUhlaWdodDogc2NyZWVuSGVpZ2h0ICogZHByXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluZm9cclxufVxyXG5cclxuLyoqXHJcbiAqIHJlc2V0IHZpZXdwb3J0IHdpZHRoIGFuZCBzY2FsZS5cclxuICogQHJldHVybiBuZXcgc2NhbGUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRWaWV3cG9ydCAodmlld3BvcnRXaWR0aCkge1xyXG4gIHNldFJvb3RGb250KHNjcmVlbldpZHRoLCB2aWV3cG9ydFdpZHRoLCB0cnVlKVxyXG4gIHNldE1ldGFWaWV3cG9ydCh2aWV3cG9ydFdpZHRoKVxyXG4gIGNvbnN0IG5ld1NjYWxlID0gc2NyZWVuV2lkdGggLyB2aWV3cG9ydFdpZHRoXHJcbiAgaW5mby5zY2FsZSA9IG5ld1NjYWxlXHJcbiAgcmV0dXJuIG5ld1NjYWxlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3cG9ydEluZm8gKCkge1xyXG4gIHJldHVybiBpbmZvXHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZXh0ZW5kICh0bywgLi4uYXJncykge1xyXG4gIGlmICghYXJncyB8fCBhcmdzLmxlbmd0aCA8PSAwKSB7IHJldHVybiB0byB9XHJcbiAgYXJncy5mb3JFYWNoKGZyb20gPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBmcm9tICE9PSAnb2JqZWN0JykgeyByZXR1cm4gfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZnJvbSkge1xyXG4gICAgICB0b1trZXldID0gZnJvbVtrZXldXHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4gdG9cclxufVxyXG5cclxuLy8gaWYgc3VwcG9ydCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycy5cclxubGV0IF9zdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZVxyXG50cnkge1xyXG4gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBfID0+IHt9LCB7XHJcbiAgICBnZXQgcGFzc2l2ZSAoKSB7XHJcbiAgICAgIF9zdXBwb3J0c1Bhc3NpdmUgPSB0cnVlXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5jYXRjaCAoZSkge1xyXG4gIC8vIGRvIG5vdGhpbmcuXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRzUGFzc2l2ZSAoKSB7XHJcbiAgcmV0dXJuIF9zdXBwb3J0c1Bhc3NpdmVcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBFdmVudC5cclxuICogQHBhcmFtIHtET01TdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRXZlbnQgKHRhcmdldCwgdHlwZSwgcHJvcHMpIHtcclxuICBjb25zdCBldmVudCA9IG5ldyBFdmVudCh0eXBlLCB7IGJ1YmJsZXM6IGZhbHNlIH0pXHJcblxyXG4gIGV4dGVuZChldmVudCwgcHJvcHMpXHJcbiAgLy8gIHBoYW50b21qcyBkb24ndCBzdXBwb3J0IGN1c3RvbWVyIGV2ZW50XHJcbiAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZigncGhhbnRvbWpzJykgIT09IC0xKSB7XHJcbiAgICByZXR1cm4gZXZlbnRcclxuICB9XHJcbiAgdHJ5IHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ3RhcmdldCcsIHtcclxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgdmFsdWU6IHRhcmdldFxyXG4gICAgfSlcclxuICB9XHJcbiAgY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGV4dGVuZCh7fSwgZXZlbnQsIHsgdGFyZ2V0OiB0YXJnZXQgfSlcclxuICB9XHJcbiAgcmV0dXJuIGV2ZW50XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBidWJiYWJsZSBFdmVudC5cclxuICogQHBhcmFtIHtET01TdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnViYmxlc0V2ZW50ICh0YXJnZXQsIHR5cGUsIHByb3BzKSB7XHJcbiAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQodHlwZSwgeyBidWJibGVzOiB0cnVlIH0pXHJcbiAgZXh0ZW5kKGV2ZW50LCBwcm9wcylcclxuICAvLyAgcGhhbnRvbWpzIGRvbid0IHN1cHBvcnQgY3VzdG9tZXIgZXZlbnRcclxuICBpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdwaGFudG9tanMnKSAhPT0gLTEpIHtcclxuICAgIHJldHVybiBldmVudFxyXG4gIH1cclxuICB0cnkge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAndGFyZ2V0Jywge1xyXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICB2YWx1ZTogdGFyZ2V0XHJcbiAgICB9KVxyXG4gIH1cclxuICBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXh0ZW5kKHt9LCBldmVudCwgeyB0YXJnZXQ6IHRhcmdldCB9KVxyXG4gIH1cclxuICByZXR1cm4gZXZlbnRcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBDdXN0b20gRXZlbnQuXHJcbiAqIEBwYXJhbSB7RE9NU3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUV2ZW50ICh0YXJnZXQsIHR5cGUsIHByb3BzKSB7XHJcbiAgLy8gY29tcGF0aWJpbGl0eTogaHR0cDovL2Nhbml1c2UuY29tLyNzZWFyY2g9Y3VzdG9tZXZlbnRcclxuICAvLyBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlKVxyXG4gIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcclxuICBldmVudC5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIHRydWUsIHt9KVxyXG4gIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG5cclxuICBleHRlbmQoZXZlbnQsIHByb3BzKVxyXG5cclxuICAvLyBldmVudC50YXJnZXQgaXMgcmVhZG9ubHlcclxuICB0cnkge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAndGFyZ2V0Jywge1xyXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICB2YWx1ZTogdGFyZ2V0IHx8IG51bGxcclxuICAgIH0pXHJcbiAgfVxyXG4gIGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBleHRlbmQoe30sIGV2ZW50LCB7IHRhcmdldDogdGFyZ2V0IHx8IG51bGwgfSlcclxuICB9XHJcblxyXG4gIHJldHVybiBldmVudFxyXG59XHJcblxyXG4vKipcclxuICogZGlzcGF0Y2ggYSBldmVudCBvbiBhIEhUTUwgZWxlbWVudC5cclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsbVxyXG4gKiBAcGFyYW0gIHtFdmVudH0gdHlwZSBldmVudCBuYW1lLlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgZXh0cmEgZGF0YS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaE5hdGl2ZUV2ZW50IChlbG0sIHR5cGUsIGRhdGEpIHtcclxuICBlbG0uZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudChlbG0sIHR5cGUsIGRhdGEpKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFwRm9ybUV2ZW50cyAoY29udGV4dCkge1xyXG4gIGNvbnN0IGV2ZW50TWFwID0ge31cclxuICA7WydpbnB1dCcsICdjaGFuZ2UnLCAnZm9jdXMnLCAnYmx1cicsICdyZXR1cm4nXS5mb3JFYWNoKHR5cGUgPT4ge1xyXG4gICAgZXZlbnRNYXBbdHlwZV0gPSBldmVudCA9PiB7XHJcbiAgICAgIGlmIChjb250ZXh0LiRlbCkge1xyXG4gICAgICAgIGV2ZW50LnZhbHVlID0gY29udGV4dC4kZWwudmFsdWVcclxuICAgICAgICAvLyBmb3IgdGhlIHNha2Ugb2Ygdi1tb2RlbCwgYSBpbnB1dCBldmVudCBtdXN0IGJlIGVtaXR0ZWQuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dCcpIHtcclxuICAgICAgICAgIGNvbnRleHQuJGVtaXQodHlwZSwgZXZlbnQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4gZXZlbnRNYXBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG1hcEZvcm1FdmVudHNcclxufVxyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmltcG9ydCB7IGh5cGhlbmF0ZSB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5jb25zdCBzY2FsZVN0eWxlcyA9IFtcclxuICAnd2lkdGgnLFxyXG4gICdoZWlnaHQnLFxyXG4gICdsZWZ0JyxcclxuICAncmlnaHQnLFxyXG4gICd0b3AnLFxyXG4gICdib3R0b20nLFxyXG4gICdib3JkZXInLFxyXG4gICdib3JkZXJSYWRpdXMnLFxyXG4gICdib3JkZXJXaWR0aCcsXHJcbiAgJ2JvcmRlckxlZnQnLFxyXG4gICdib3JkZXJSaWdodCcsXHJcbiAgJ2JvcmRlclRvcCcsXHJcbiAgJ2JvcmRlckJvdHRvbScsXHJcbiAgJ2JvcmRlckxlZnRXaWR0aCcsXHJcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxyXG4gICdib3JkZXJUb3BXaWR0aCcsXHJcbiAgJ2JvcmRlckJvdHRvbVdpZHRoJyxcclxuICAnbWFyZ2luJyxcclxuICAnbWFyZ2luTGVmdCcsXHJcbiAgJ21hcmdpblJpZ2h0JyxcclxuICAnbWFyZ2luVG9wJyxcclxuICAnbWFyZ2luQm90dG9tJyxcclxuICAncGFkZGluZycsXHJcbiAgJ3BhZGRpbmdMZWZ0JyxcclxuICAncGFkZGluZ1JpZ2h0JyxcclxuICAncGFkZGluZ1RvcCcsXHJcbiAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICdmb250U2l6ZScsXHJcbiAgJ2xpbmVIZWlnaHQnLFxyXG4gICd0cmFuc2Zvcm0nLFxyXG4gICd3ZWJraXRUcmFuc2Zvcm0nLFxyXG4gICdXZWJraXRUcmFuc2Zvcm0nLFxyXG4gICdtb3pUcmFuc2Zvcm0nLFxyXG4gICdNb3pUcmFuc2Zvcm0nLFxyXG4gICdpdGVtU2l6ZSdcclxuXVxyXG5cclxuY29uc3QgdmVuZG9yUmVnID0gL3dlYmtpdHxtb3ovaVxyXG5mdW5jdGlvbiBoeXBoZW4gKGtleSkge1xyXG4gIHJldHVybiBoeXBoZW5hdGUoa2V5LnJlcGxhY2UodmVuZG9yUmVnLCBmdW5jdGlvbiAoJDApIHtcclxuICAgIHJldHVybiBgLSR7JDAudG9Mb3dlckNhc2UoKX0tYFxyXG4gIH0pKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBbGxTdHlsZXMgKCkge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhzY2FsZVN0eWxlcy5yZWR1Y2UoZnVuY3Rpb24gKHByZSwga2V5KSB7XHJcbiAgICBwcmVba2V5XSA9IDFcclxuICAgIHByZVtoeXBoZW4oa2V5KV0gPSAxXHJcbiAgICByZXR1cm4gcHJlXHJcbiAgfSwge30pKVxyXG59XHJcblxyXG5jb25zdCBhbGxTdHlsZXMgPSBnZXRBbGxTdHlsZXMoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNjcm9sbGFibGVUeXBlczogWydzY3JvbGxlcicsICdsaXN0JywgJ3dhdGVyZmFsbCcsICdyZWN5Y2xlLWxpc3QnXSxcclxuICBnZXN0dXJlRXZlbnRzOiBbXHJcbiAgICAncGFuc3RhcnQnLFxyXG4gICAgJ3Bhbm1vdmUnLFxyXG4gICAgJ3BhbmVuZCcsXHJcbiAgICAnc3dpcGUnLFxyXG4gICAgJ2xvbmdwcmVzcycsXHJcbiAgICAndGFwJ1xyXG4gIF0sXHJcbiAgLy8gdGhlc2UgY29tcG9uZW50cyBzaG91bGQgbm90IGJpbmQgZXZlbnRzIHdpdGggLm5hdGl2ZS5cclxuICB3ZWV4QnVpbHRJbkNvbXBvbmVudHM6IFtcclxuICAgICdkaXYnLFxyXG4gICAgJ2NvbnRhaW5lcicsXHJcbiAgICAndGV4dCcsXHJcbiAgICAnaW1hZ2UnLFxyXG4gICAgJ2dpZicsXHJcbiAgICAnaW1nJyxcclxuICAgICdjZWxsJyxcclxuICAgICdhJ1xyXG4gIF0sXHJcbiAgYmluZGluZ1N0eWxlTmFtZXNGb3JQeDJSZW06IGFsbFN0eWxlc1xyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuaW1wb3J0IHsgdGhyb3R0bGUsIGV4dGVuZCB9IGZyb20gJy4vZnVuYydcclxuaW1wb3J0IHsgZGlzcGF0Y2hOYXRpdmVFdmVudCB9IGZyb20gJy4vZXZlbnQnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5cclxuLyoqXHJcbiAqIHdoZXRoZXIgY3QgY29udGFpbnMgZWwuXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lclxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWlucyAoY29udGFpbmVyLCB0YXJnZXQsIGluY2x1ZGVTZWxmKSB7XHJcbiAgaWYgKGluY2x1ZGVTZWxmICYmIGNvbnRhaW5lciA9PT0gdGFyZ2V0KSB7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICByZXR1cm4gY29udGFpbmVyLmNvbnRhaW5zXHJcbiAgICA/IGNvbnRhaW5lci5jb250YWlucyh0YXJnZXQpICYmIChjb250YWluZXIgIT09IHRhcmdldClcclxuICAgIDogY29udGFpbmVyLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKHRhcmdldCkgJiAxNiAhPT0gMFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zaWRlQSAoZWwpIHtcclxuICBpZiAodHlwZW9mIGVsLl9pbnNpZGVBID09PSAnYm9vbGVhbicpIHtcclxuICAgIHJldHVybiBlbC5faW5zaWRlQVxyXG4gIH1cclxuICBsZXQgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudFxyXG4gIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4gIGNvbnN0IGNoZWNrUGFyZW50cyA9IGZ1bmN0aW9uIChpbnNpZGUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcGFyZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgcGFyZW50c1tpXS5faW5zaWRlQSA9IGluc2lkZVxyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCBjaGVjayA9IGZ1bmN0aW9uIChpbnNpZGUpIHtcclxuICAgIGVsLl9pbnNpZGVBID0gaW5zaWRlXHJcbiAgICBjaGVja1BhcmVudHMoaW5zaWRlKVxyXG4gICAgcmV0dXJuIGluc2lkZVxyXG4gIH1cclxuICB3aGlsZSAocGFyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XHJcbiAgICBpZiAocGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XHJcbiAgICAgIHJldHVybiBjaGVjayh0cnVlKVxyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwYXJlbnQuX2luc2lkZUEgPT09ICdib29sZWFuJykge1xyXG4gICAgICByZXR1cm4gY2hlY2socGFyZW50Ll9pbnNpZGVBKVxyXG4gICAgfVxyXG4gICAgcGFyZW50cy5wdXNoKHBhcmVudClcclxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50XHJcbiAgfVxyXG4gIHJldHVybiBjaGVjayhmYWxzZSlcclxufVxyXG5cclxuLyoqXHJcbiAqIGdldCBwYXJlbnQgc2Nyb2xsZXIgdkNvbXBvbmVudC5cclxuICogcmV0dXJuIGEgVnVlQ29tcG9uZW50IG9yIG51bGwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50U2Nyb2xsZXIgKHZtKSB7XHJcbiAgaWYgKCF2bSkgcmV0dXJuIG51bGxcclxuICBpZiAodm0uX3BhcmVudFNjcm9sbGVyKSB7XHJcbiAgICByZXR1cm4gdm0uX3BhcmVudFNjcm9sbGVyXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIF9nZXRQYXJlbnRTY3JvbGxlciAocGFyZW50KSB7XHJcbiAgICBpZiAoIXBhcmVudCkgeyByZXR1cm4gfVxyXG4gICAgaWYgKGNvbmZpZy5zY3JvbGxhYmxlVHlwZXMuaW5kZXhPZihwYXJlbnQud2VleFR5cGUpID4gLTEpIHtcclxuICAgICAgdm0uX3BhcmVudFNjcm9sbGVyID0gcGFyZW50XHJcbiAgICAgIHJldHVybiBwYXJlbnRcclxuICAgIH1cclxuICAgIHJldHVybiBfZ2V0UGFyZW50U2Nyb2xsZXIocGFyZW50LiRwYXJlbnQpXHJcbiAgfVxyXG4gIHJldHVybiBfZ2V0UGFyZW50U2Nyb2xsZXIodm0uJHBhcmVudClcclxufVxyXG5cclxuLyoqXHJcbiAqIGdldCBzY3JvbGxlcidzIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB2bSB7SFRNTEVsZW1lbnQgfCBWdWVDT21wb25lbnR9IHZtIG9yIGVsZW1lbnQuXHJcbiAqIHJldHVybiB0aGUgZWxlbWVudCBvciBkb2N1bWVudC5ib2R5LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmVudFNjcm9sbGVyRWxlbWVudCAodm0pIHtcclxuICBpZiAoIXZtKSB7IHJldHVybiBudWxsIH1cclxuICBjb25zdCBlbCA9IHZtIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyB2bSA6IHZtLiRlbFxyXG4gIGlmICghZWwgfHwgZWwubm9kZVR5cGUgIT09IDEpIHsgcmV0dXJuIH1cclxuICBpZiAodm0uX3BhcmVudFNjcm9sbGVyKSB7XHJcbiAgICByZXR1cm4gdm0uX3BhcmVudFNjcm9sbGVyXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIF9nZXRQYXJlbnRTY3JvbGxlciAocGFyZW50KSB7XHJcbiAgICBpZiAoIXBhcmVudCkgeyByZXR1cm4gfVxyXG4gICAgY29uc3QgdGFnTmFtZSA9IHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKClcclxuICAgIGlmICh0YWdOYW1lID09PSAnYm9keSdcclxuICAgICAgfHwgKHRhZ05hbWUgPT09ICdtYWluJ1xyXG4gICAgICAmJiBjb25maWcuc2Nyb2xsYWJsZVR5cGVzLmluZGV4T2YocGFyZW50LmdldEF0dHJpYnV0ZSgnd2VleC10eXBlJykpID4gLTEpXHJcbiAgICApIHtcclxuICAgICAgdm0uX3BhcmVudFNjcm9sbGVyID0gcGFyZW50XHJcbiAgICAgIHJldHVybiBwYXJlbnRcclxuICAgIH1cclxuICAgIHJldHVybiBfZ2V0UGFyZW50U2Nyb2xsZXIocGFyZW50LnBhcmVudEVsZW1lbnQpXHJcbiAgfVxyXG4gIHJldHVybiBfZ2V0UGFyZW50U2Nyb2xsZXIoZWwpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhvcml6b250YWxCYWxhbmNlIChyZWN0LCBjdFJlY3QpIHtcclxuICByZXR1cm4gcmVjdC5sZWZ0IDwgY3RSZWN0LnJpZ2h0ICYmIHJlY3QucmlnaHQgPiBjdFJlY3QubGVmdFxyXG59XHJcblxyXG5mdW5jdGlvbiB2ZXJ0aWNhbEJhbGFuY2UgKHJlY3QsIGN0UmVjdCkge1xyXG4gIHJldHVybiByZWN0LnRvcCA8IGN0UmVjdC5ib3R0b20gJiYgcmVjdC5ib3R0b20gPiBjdFJlY3QudG9wXHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm4gYSBkYXRhIGFycmF5IHdpdGggdHdvIGJvb2xlYW4gdmFsdWUsIHdoaWNoIGFyZTpcclxuICogMS4gdmlzaWJsZSBpbiBjdXJyZW50IGN0J3Mgdmlld3BvcnQuXHJcbiAqIDIuIHZpc2libGUgd2l0aCBvZmZzZXQgaW4gY3VycmVudCBjdCdzIHZpZXdwb3J0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0ludGVyc2VjdGlvbiAocmVjdCwgY3RSZWN0LCBkaXIsIG9mZnNldCkge1xyXG4gIGRpciA9IGRpciB8fCAndXAnXHJcbiAgY29uc3QgaXNIb3Jpem9udGFsID0gZGlyID09PSAnbGVmdCcgfHwgZGlyID09PSAncmlnaHQnXHJcbiAgY29uc3QgaXNWZXJ0aWNhbCA9IGRpciA9PT0gJ3VwJyB8fCBkaXIgPT09ICdkb3duJ1xyXG4gIGlmIChpc0hvcml6b250YWwgJiYgIXZlcnRpY2FsQmFsYW5jZShyZWN0LCBjdFJlY3QpKSB7XHJcbiAgICByZXR1cm4gW2ZhbHNlLCBmYWxzZV1cclxuICB9XHJcbiAgaWYgKGlzVmVydGljYWwgJiYgIWhvcml6b250YWxCYWxhbmNlKHJlY3QsIGN0UmVjdCkpIHtcclxuICAgIHJldHVybiBbZmFsc2UsIGZhbHNlXVxyXG4gIH1cclxuICBvZmZzZXQgPSBvZmZzZXQgPyBwYXJzZUludChvZmZzZXQpICogd2VleC5jb25maWcuZW52LnNjYWxlIDogMFxyXG4gIHN3aXRjaCAoZGlyKSB7XHJcbiAgICBjYXNlICd1cCc6XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgcmVjdC50b3AgPCBjdFJlY3QuYm90dG9tICYmIHJlY3QuYm90dG9tID4gY3RSZWN0LnRvcCxcclxuICAgICAgICByZWN0LnRvcCA8IGN0UmVjdC5ib3R0b20gKyBvZmZzZXQgJiYgcmVjdC5ib3R0b20gPiBjdFJlY3QudG9wIC0gb2Zmc2V0XHJcbiAgICAgIF1cclxuICAgIGNhc2UgJ2Rvd24nOlxyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgIHJlY3QuYm90dG9tID4gY3RSZWN0LnRvcCAmJiByZWN0LnRvcCA8IGN0UmVjdC5ib3R0b20sXHJcbiAgICAgICAgcmVjdC5ib3R0b20gPiBjdFJlY3QudG9wIC0gb2Zmc2V0ICYmIHJlY3QudG9wIDwgY3RSZWN0LmJvdHRvbSArIG9mZnNldFxyXG4gICAgICBdXHJcbiAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICByZWN0LmxlZnQgPCBjdFJlY3QucmlnaHQgJiYgcmVjdC5yaWdodCA+IGN0UmVjdC5sZWZ0LFxyXG4gICAgICAgIHJlY3QubGVmdCA8IGN0UmVjdC5yaWdodCArIG9mZnNldCAmJiByZWN0LnJpZ2h0ID4gY3RSZWN0LmxlZnQgLSBvZmZzZXRcclxuICAgICAgXVxyXG4gICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgIHJlY3QucmlnaHQgPiBjdFJlY3QubGVmdCAmJiByZWN0LmxlZnQgPCBjdFJlY3QucmlnaHQsXHJcbiAgICAgICAgcmVjdC5yaWdodCA+IGN0UmVjdC5sZWZ0IC0gb2Zmc2V0ICYmIHJlY3QubGVmdCA8IGN0UmVjdC5yaWdodCArIG9mZnNldFxyXG4gICAgICBdXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogaXNFbGVtZW50VmlzaWJsZVxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gIGVsICAgIGEgZG9tIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgY29udGFpbmVyICBvcHRpb25hbCwgdGhlIGNvbnRhaW5lciBvZiB0aGlzIGVsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRWxlbWVudFZpc2libGUgKGVsLCBjb250YWluZXIsIGRpciwgb2Zmc2V0KSB7XHJcbiAgaWYgKCFlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHsgcmV0dXJuIGZhbHNlIH1cclxuICBjb25zdCBib2R5UmVjdCA9IHtcclxuICAgIHRvcDogMCxcclxuICAgIGxlZnQ6IDAsXHJcbiAgICBib3R0b206IHdpbmRvdy5pbm5lckhlaWdodCxcclxuICAgIHJpZ2h0OiB3aW5kb3cuaW5uZXJXaWR0aFxyXG4gIH1cclxuICBjb25zdCBjdFJlY3QgPSAoY29udGFpbmVyID09PSB3aW5kb3cgfHwgY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KVxyXG4gICAgPyBib2R5UmVjdCA6IGNvbnRhaW5lclxyXG4gICAgICA/IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6IGJvZHlSZWN0XHJcbiAgcmV0dXJuIGhhc0ludGVyc2VjdGlvbihlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgY3RSZWN0LCBkaXIsIG9mZnNldClcclxufVxyXG5cclxuLy8gdG8gdHJpZ2dlciB0aGUgYXBwZWFyL2Rpc2FwcGVhciBldmVudC5cclxuZnVuY3Rpb24gdHJpZ2dlckFwcGVhckV2ZW50IChlbG0sIGV2dCwgZGlyKSB7XHJcbiAgZGlzcGF0Y2hOYXRpdmVFdmVudChlbG0sIGV2dCwge1xyXG4gICAgZGlyZWN0aW9uOiBkaXJcclxuICB9KVxyXG59XHJcblxyXG4vKipcclxuICogZ2V0IGFsbCBldmVudCBsaXN0ZW5lcnMuIGluY2x1ZGluZyBib3VuZCBoYW5kbGVycyBpbiBhbGwgcGFyZW50IHZub2Rlcy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFdmVudEhhbmRsZXJzIChjb250ZXh0KSB7XHJcbiAgbGV0IHZub2RlID0gY29udGV4dC4kdm5vZGVcclxuICBjb25zdCBoYW5kbGVycyA9IHt9XHJcbiAgY29uc3QgYXR0YWNoZWRWbm9kZXMgPSBbXVxyXG4gIHdoaWxlICh2bm9kZSkge1xyXG4gICAgYXR0YWNoZWRWbm9kZXMucHVzaCh2bm9kZSlcclxuICAgIHZub2RlID0gdm5vZGUucGFyZW50XHJcbiAgfVxyXG4gIGF0dGFjaGVkVm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKHZub2RlKSB7XHJcbiAgICBjb25zdCBwYXJlbnRMaXN0ZW5lcnMgPSB2bm9kZS5jb21wb25lbnRPcHRpb25zICYmIHZub2RlLmNvbXBvbmVudE9wdGlvbnMubGlzdGVuZXJzXHJcbiAgICBjb25zdCBkYXRhT24gPSB2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEub25cclxuICAgIGV4dGVuZChoYW5kbGVycywgcGFyZW50TGlzdGVuZXJzLCBkYXRhT24pXHJcbiAgfSlcclxuICByZXR1cm4gaGFuZGxlcnNcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXBwZWFyT2Zmc2V0IChlbCkge1xyXG4gIHJldHVybiBlbCAmJiBlbC5nZXRBdHRyaWJ1dGUoJ2FwcGVhci1vZmZzZXQnKVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVXYXRjaEFwcGVhckxpc3QgKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lci5fd2F0Y2hBcHBlYXJMaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXHJcbiAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW3dlZXgtYXBwZWFyXScpKVxyXG59XHJcblxyXG4vKipcclxuICogaW5qZWN0IHJlbW92ZUNoaWxkIGZ1bmN0aW9uIHRvIHdhdGNoIGRpc2FwcGVhciBhbmQgb2Zmc2V0RGlzYXBwZWFyIGV2ZW50cy5cclxuICovXHJcbmlmICghd2luZG93Ll9ybUluamVjdGVkKSB7XHJcbiAgd2luZG93Ll9ybUluamVjdGVkID0gdHJ1ZVxyXG4gIGNvbnN0IG5hdGl2ZVJlbW92ZSA9IEhUTUxFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZFxyXG4gIEhUTUxFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuX3Zpc2libGUgJiYgdHJpZ2dlckFwcGVhckV2ZW50KGVsLCAnZGlzYXBwZWFyJywgbnVsbClcclxuICAgIGVsLl9vZmZzZXRWaXNpYmxlICYmIHRyaWdnZXJBcHBlYXJFdmVudChlbCwgJ29mZnNldERpc2FwcGVhcicsIG51bGwpXHJcbiAgICBuYXRpdmVSZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFdhdGNoIGVsZW1lbnQncyB2aXNpYmlsaXR5IHRvIHRlbGwgd2hldGhlciBzaG91bGQgdHJpZ2dlciBhIGFwcGVhci9kaXNhcHBlYXJcclxuICogZXZlbnQgaW4gc2Nyb2xsIGhhbmRsZXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd2F0Y2hBcHBlYXIgKGNvbnRleHQsIGZpcmVOb3cpIHtcclxuICBjb25zdCBlbCA9IGNvbnRleHQgJiYgY29udGV4dC4kZWxcclxuICBpZiAoIWVsIHx8IGVsLm5vZGVUeXBlICE9PSAxKSB7IHJldHVybiB9XHJcblxyXG4gIGxldCBpc1dpbmRvdyA9IGZhbHNlXHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0UGFyZW50U2Nyb2xsZXJFbGVtZW50KGNvbnRleHQpXHJcbiAgaWYgKCFjb250YWluZXIpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBpZiAoY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XHJcbiAgICBpc1dpbmRvdyA9IHRydWVcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ29kZSBiZWxvdyB3aWxsIG9ubHkgZXhlYyBvbmNlIGZvciBiaW5kaW5nIHNjcm9sbCBoYW5kbGVyIGZvciBwYXJlbnQgY29udGFpbmVyLlxyXG4gICAqL1xyXG4gIGxldCBzY3JvbGxIYW5kbGVyID0gY29udGFpbmVyLl9zY3JvbGxIYW5kbGVyXHJcbiAgaWYgKCFzY3JvbGxIYW5kbGVyKSB7XHJcbiAgICBzY3JvbGxIYW5kbGVyID0gY29udGFpbmVyLl9zY3JvbGxIYW5kbGVyID0gZXZlbnQgPT4ge1xyXG4gICAgICB1cGRhdGVXYXRjaEFwcGVhckxpc3QoY29udGFpbmVyKVxyXG4gICAgICAvKipcclxuICAgICAgICogZGV0ZWN0IHNjcm9sbGluZyBkaXJlY3Rpb24uXHJcbiAgICAgICAqIGRpcmVjdGlvbiBvbmx5IHN1cHBvcnQgdXAgJiBkb3duIHlldC5cclxuICAgICAgICogVE9ETzogZGlyZWN0aW9uIHN1cHBvcnQgbGVmdCAmIHJpZ2h0LlxyXG4gICAgICAgKi9cclxuICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gaXNXaW5kb3cgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBjb250YWluZXIuc2Nyb2xsVG9wXHJcbiAgICAgIGNvbnN0IHByZVRvcCA9IGNvbnRhaW5lci5fbGFzdFNjcm9sbFRvcFxyXG4gICAgICBjb250YWluZXIuX2xhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3BcclxuICAgICAgY29uc3QgZGlyID0gKHNjcm9sbFRvcCA8IHByZVRvcFxyXG4gICAgICAgID8gJ2Rvd24nIDogc2Nyb2xsVG9wID4gcHJlVG9wXHJcbiAgICAgICAgICA/ICd1cCcgOiBjb250YWluZXIuX3ByZXZEaXJlY3Rpb24pIHx8IG51bGxcclxuICAgICAgY29udGFpbmVyLl9wcmV2RGlyZWN0aW9uID0gZGlyXHJcbiAgICAgIGNvbnN0IHdhdGNoQXBwZWFyTGlzdCA9IGNvbnRhaW5lci5fd2F0Y2hBcHBlYXJMaXN0IHx8IFtdXHJcbiAgICAgIGNvbnN0IGxlbiA9IHdhdGNoQXBwZWFyTGlzdC5sZW5ndGhcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGVsID0gd2F0Y2hBcHBlYXJMaXN0W2ldXHJcbiAgICAgICAgY29uc3QgYXBwZWFyT2Zmc2V0ID0gZ2V0QXBwZWFyT2Zmc2V0KGVsKVxyXG4gICAgICAgIGNvbnN0IHZpc2libGVEYXRhID0gaXNFbGVtZW50VmlzaWJsZShlbCwgY29udGFpbmVyLCBkaXIsIGFwcGVhck9mZnNldClcclxuICAgICAgICBkZXRlY3RBcHBlYXIoZWwsIHZpc2libGVEYXRhLCBkaXIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZShzY3JvbGxIYW5kbGVyLCAxMDAsIHRydWUpKVxyXG4gIH1cclxuICBpZiAoZmlyZU5vdykge1xyXG4gICAgY29udGV4dC4kbmV4dFRpY2soc2Nyb2xsSGFuZGxlcilcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBkZWNpZGUgd2hldGhlciB0byB0cmlnZ2VyIGEgYXBwZWFyL2Rpc2FwcGVhciBldmVudC5cclxuICogQHBhcmFtIHtWdWVDb21wb25lbnR9IGNvbnRleHRcclxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RBcHBlYXIgKGVsLCB2aXNpYmxlRGF0YSwgZGlyID0gbnVsbCwgYXBwZWFyT2Zmc2V0KSB7XHJcbiAgaWYgKCFlbCkgeyByZXR1cm4gfVxyXG4gIGNvbnN0IFt2aXNpYmxlLCBvZmZzZXRWaXNpYmxlXSA9IHZpc2libGVEYXRhXHJcbiAgLyoqXHJcbiAgICogTm8gbWF0dGVyIGl0J3MgYmluZGluZyBhcHBlYXIvZGlzYXBwZWFyIG9yIGJvdGggb2YgdGhlbS4gQWx3YXlzXHJcbiAgICogc2hvdWxkIHRlc3QgaXQncyB2aXNpYmlsaXR5IGFuZCBjaGFuZ2UgdGhlIGVsLl92aXNpYmxlLlxyXG4gICAqIElmIG5laWdoZXIgaGFzIGJlZW4gYm91bmQsIHRoZW4gaWdub3JlIGl0LlxyXG4gICAqL1xyXG4gIC8qKlxyXG4gICAqIGlmIHRoZSBjb21wb25lbnQgaGFzbid0IGFwcGVhcmVkIGZvciBvbmNlIHlldCwgdGhlbiBpdCBzaG91bGRuJ3QgdHJpZ2dlclxyXG4gICAqIGEgZGlzYXBwZWFyIGV2ZW50IGF0IGFsbC5cclxuICAgKi9cclxuICBpZiAoZWwuX2FwcGVhcmVkT25jZSB8fCB2aXNpYmxlKSB7XHJcbiAgICBpZiAoZWwuX3Zpc2libGUgIT09IHZpc2libGUpIHtcclxuICAgICAgZWwuX3Zpc2libGUgPSB2aXNpYmxlXHJcbiAgICAgIGlmICh2aXNpYmxlICYmICFlbC5fYXBwZWFyZWRPbmNlKSB7XHJcbiAgICAgICAgZWwuX2FwcGVhcmVkT25jZSA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBldnROYW1lID0gdmlzaWJsZSA/ICdhcHBlYXInIDogJ2Rpc2FwcGVhcidcclxuICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZShgZGF0YS1ldnQtJHtldnROYW1lfWApID09PSAnJykge1xyXG4gICAgICAgIHRyaWdnZXJBcHBlYXJFdmVudChlbCwgZXZ0TmFtZSwgZGlyKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChlbC5fb2Zmc2V0QXBwZWFyZWRPbmNlIHx8IG9mZnNldFZpc2libGUpIHtcclxuICAgIGlmIChlbC5fb2Zmc2V0VmlzaWJsZSAhPT0gb2Zmc2V0VmlzaWJsZSkge1xyXG4gICAgICBlbC5fb2Zmc2V0VmlzaWJsZSA9IG9mZnNldFZpc2libGVcclxuICAgICAgaWYgKG9mZnNldFZpc2libGUgJiYgIWVsLl9vZmZzZXRBcHBlYXJlZE9uY2UpIHtcclxuICAgICAgICBlbC5fb2Zmc2V0QXBwZWFyZWRPbmNlID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGV2dCA9IG9mZnNldFZpc2libGUgPyBbJ29mZnNldC1hcHBlYXInLCAnb2Zmc2V0QXBwZWFyJ10gOiBbJ29mZnNldC1kaXNhcHBlYXInLCAnb2Zmc2V0RGlzYXBwZWFyJ11cclxuICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZShgZGF0YS1ldnQtJHtldnRbMF19YCkgPT09ICcnKSB7XHJcbiAgICAgICAgdHJpZ2dlckFwcGVhckV2ZW50KGVsLCBldnRbMV0sIGRpcilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgeyBpc0VsZW1lbnRWaXNpYmxlIH0gZnJvbSAnLi9jb21wb25lbnQnXHJcbmltcG9ydCB7IGRpc3BhdGNoTmF0aXZlRXZlbnQgfSBmcm9tICcuL2V2ZW50J1xyXG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4vZnVuYydcclxuXHJcbmNvbnN0IGxhenlsb2FkQXR0ciA9ICdkYXRhLWltZy1zcmMnXHJcbmNvbnN0IHBsYWNlaG9sZGVyQXR0ciA9ICdwbGFjZWhvbGRlcidcclxuXHJcbmZ1bmN0aW9uIHByZUxvYWRJbWcgKHNyYyxcclxuICBsb2FkQ2FsbGJhY2ssXHJcbiAgZXJyb3JDYWxsYmFjaykge1xyXG4gIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXHJcbiAgaW1nLm9ubG9hZCA9IGxvYWRDYWxsYmFjayA/IGxvYWRDYWxsYmFjay5iaW5kKGltZykgOiBudWxsXHJcbiAgaW1nLm9uZXJyb3IgPSBlcnJvckNhbGxiYWNrID8gZXJyb3JDYWxsYmFjay5iaW5kKGltZykgOiBudWxsXHJcbiAgaW1nLnNyYyA9IHNyY1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlTcmMgKGl0ZW0sIHNyYywgcGxhY2Vob2xkZXJTcmMpIHtcclxuICBpZiAoIXNyYykgeyByZXR1cm4gfVxyXG4gIGZ1bmN0aW9uIGZpbmFsbENiICgpIHtcclxuICAgIGRlbGV0ZSBpdGVtLl9zcmNfbG9hZGluZ1xyXG4gIH1cclxuXHJcbiAgaWYgKHdpbmRvdy5fcHJvY2Vzc0ltZ1NyYykge1xyXG4gICAgc3JjID0gd2luZG93Ll9wcm9jZXNzSW1nU3JjKHNyYywgaXRlbSlcclxuICAgIGlmIChwbGFjZWhvbGRlclNyYykge1xyXG4gICAgICBwbGFjZWhvbGRlclNyYyA9IHdpbmRvdy5fcHJvY2Vzc0ltZ1NyYyhwbGFjZWhvbGRlclNyYywgaXRlbSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChpdGVtLl9zcmNfbG9hZGluZyA9PT0gc3JjKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIDEuIGFwcGx5IHNyYyBpbW1lZGlhdGVseSBpbiBjYXNlIGphdnNjcmlwdCBibG9ja3MgdGhlIGltYWdlIGxvYWRpbmdcclxuICAgKiAgYmVmb3JlIG5leHQgdGljay5cclxuICAgKi9cclxuICBpdGVtLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtzcmMgfHwgJyd9KWBcclxuICBpdGVtLnJlbW92ZUF0dHJpYnV0ZShsYXp5bG9hZEF0dHIpXHJcbiAgLyoqXHJcbiAgICogMi4gdGhlbiBsb2FkIHRoZSBpbWcgc3JjIHdpdGggSW1hZ2UgY29uc3RydWN0b3IgKGJ1dCB3b3VsZCBub3QgcG9zdFxyXG4gICAqICBhIHJlcXVlc3QgYWdhaW4pLCBqdXN0IHRvIHRyaWdnZXIgdGhlIGxvYWQgZXZlbnQuXHJcbiAgICovXHJcbiAgaXRlbS5fc3JjX2xvYWRpbmcgPSBzcmNcclxuICBwcmVMb2FkSW1nKHNyYywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7c3JjIHx8ICcnfSlgXHJcbiAgICBjb25zdCB7IHdpZHRoOiBuYXR1cmFsV2lkdGgsIGhlaWdodDogbmF0dXJhbEhlaWdodCB9ID0gdGhpc1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBzaXplOiB7IG5hdHVyYWxXaWR0aCwgbmF0dXJhbEhlaWdodCB9XHJcbiAgICB9XHJcbiAgICBkaXNwYXRjaE5hdGl2ZUV2ZW50KGl0ZW0sICdsb2FkJywgcGFyYW1zKVxyXG4gICAgZmluYWxsQ2IoKVxyXG4gIH0sIGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgIHNpemU6IHsgbmF0dXJhbFdpZHRoOiAwLCBuYXR1cmFsSGVpZ2h0OiAwIH1cclxuICAgIH1cclxuICAgIGRpc3BhdGNoTmF0aXZlRXZlbnQoaXRlbSwgJ2xvYWQnLCBwYXJhbXMpXHJcbiAgICBpZiAocGxhY2Vob2xkZXJTcmMpIHtcclxuICAgICAgcHJlTG9hZEltZyhwbGFjZWhvbGRlclNyYywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3BsYWNlaG9sZGVyU3JjIHx8ICcnfSlgXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBmaW5hbGxDYigpXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q3RTY3JvbGxlciAoZWwpIHtcclxuICBpZiAoIWVsKSB7IHJldHVybiB9XHJcbiAgbGV0IHNjcm9sbGVyID0gZWwuX3B0U2Nyb2xsZXJcclxuICBpZiAoIXNjcm9sbGVyKSB7XHJcbiAgICBsZXQgcHQgPSBlbC5wYXJlbnRFbGVtZW50XHJcbiAgICB3aGlsZSAocHQgJiYgcHQgIT09IGRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgaWYgKChwdC5jbGFzc05hbWUgKyAnJyB8fCAnJykubWF0Y2goL3dlZXgtbGlzdHx3ZWV4LXNjcm9sbGVyfHdlZXgtd2F0ZXJmYWxsLykpIHtcclxuICAgICAgICBzY3JvbGxlciA9IHB0XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgfVxyXG4gICAgICBwdCA9IHB0LnBhcmVudEVsZW1lbnRcclxuICAgIH1cclxuICAgIHNjcm9sbGVyID0gcHRcclxuICAgIGVsLl9wdFNjcm9sbGVyID0gcHRcclxuICB9XHJcbiAgcmV0dXJuIHNjcm9sbGVyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXJlTGF6eWxvYWQgKGVsLCBpZ25vcmVWaXNpYmlsaXR5KSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKSB7XHJcbiAgICByZXR1cm4gZWwuZm9yRWFjaChjdCA9PiBmaXJlTGF6eWxvYWQoY3QpKVxyXG4gIH1cclxuICBlbCA9IGVsIHx8IGRvY3VtZW50LmJvZHlcclxuICBpZiAoIWVsKSB7IHJldHVybiB9XHJcbiAgbGV0IGltZ3MgPSAoZWwgfHwgZG9jdW1lbnQuYm9keSkucXVlcnlTZWxlY3RvckFsbChgWyR7bGF6eWxvYWRBdHRyfV1gKVxyXG4gIGlmIChlbC5nZXRBdHRyaWJ1dGUobGF6eWxvYWRBdHRyKSkgeyBpbWdzID0gW2VsXSB9XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBpbWcgPSBpbWdzW2ldXHJcbiAgICBpZiAodHlwZW9mIGlnbm9yZVZpc2liaWxpdHkgPT09ICdib29sZWFuJyAmJiBpZ25vcmVWaXNpYmlsaXR5KSB7XHJcbiAgICAgIGFwcGx5U3JjKGltZywgaW1nLmdldEF0dHJpYnV0ZShsYXp5bG9hZEF0dHIpLCBpbWcuZ2V0QXR0cmlidXRlKHBsYWNlaG9sZGVyQXR0cikpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc0VsZW1lbnRWaXNpYmxlKGltZywgZ2V0Q3RTY3JvbGxlcihlbCkpWzBdKSB7XHJcbiAgICAgIGFwcGx5U3JjKGltZywgaW1nLmdldEF0dHJpYnV0ZShsYXp5bG9hZEF0dHIpLCBpbWcuZ2V0QXR0cmlidXRlKHBsYWNlaG9sZGVyQXR0cikpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogY2FjaGUgYSB0aHJvdHRsZSBsYXp5bG9hZCBmdW5jdGlvbiBmb3IgZXZlcnkgY29udGFpbmVyIGVsZW1lbnRcclxuICogb25jZSBmb3IgZGlmZmVyZW50IHdhaXQgdGltZXMgc2VwYXJhdGUuXHJcbiAqICAgdGhlIGFyY2hpdGVjdHVyZSBvZiB0aGlzIGNhY2hlOlxyXG4gKiAgICAgIGNhY2hlOiB7XHJcbiAqICAgICAgICBlbC5pZDoge1xyXG4gKiAgICAgICAgICB3YWl0OiB0aHJvdHRsZWRGdW5jdGlvbiAoKSB7IC4uLiB9XHJcbiAqICAgICAgICB9XHJcbiAqICAgICAgfVxyXG4gKi9cclxuY29uc3QgY2FjaGUgPSB7fVxyXG5sZXQgX3VpZCA9IDFcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRocm90dGxlTGF6eWxvYWQgKHdhaXQgPSAxNiwgZWwgPSBkb2N1bWVudC5ib2R5KSB7XHJcbiAgbGV0IGlkID0gKyhlbCAmJiBlbC5kYXRhc2V0LnRocm90dGxlSWQpXHJcbiAgaWYgKGlzTmFOKGlkKSB8fCBpZCA8PSAwKSB7XHJcbiAgICBpZCA9IF91aWQrK1xyXG4gICAgZWwgJiYgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXRocm90dGxlLWlkJywgaWQgKyAnJylcclxuICB9XHJcblxyXG4gICFjYWNoZVtpZF0gJiYgKGNhY2hlW2lkXSA9IHt9KVxyXG4gIGNvbnN0IHRocm90dGxlZCA9IGNhY2hlW2lkXVt3YWl0XSB8fFxyXG4gICAgKGNhY2hlW2lkXVt3YWl0XSA9IHRocm90dGxlKFxyXG4gICAgICBmaXJlTGF6eWxvYWQuYmluZCh0aGlzLCBlbCksXHJcbiAgICAgIHBhcnNlRmxvYXQod2FpdCksXHJcbiAgICAgIC8vIHRydWUgZm9yIGNhbGxMYXN0VGltZS5cclxuICAgICAgLy8gdG8gdHJpZ2dlciBvbmNlIG1vcmUgdGltZSBhZnRlciB0aGUgbGFzdCB0aHJvdHRsZWQgZnVuY3Rpb24gY2FsbGVkIHdpdGggYSBsaXR0bGUgbW9yZSBkZWxheS5cclxuICAgICAgdHJ1ZSlcclxuICAgIClcclxuICByZXR1cm4gdGhyb3R0bGVkXHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXHJcbmltcG9ydCB7IGNhbWVsaXplIH0gZnJvbSAnLi9mdW5jJ1xyXG5jb25zdCB7IGJpbmRpbmdTdHlsZU5hbWVzRm9yUHgyUmVtIH0gPSBjb25maWdcclxuXHJcbi8vIHdoZXRoZXIgdG8gc3VwcG9ydCB1c2luZyAwLjVweCB0byBwYWludCAxcHggd2lkdGggYm9yZGVyLlxyXG5sZXQgX3N1cHBvcnRIYWlybGluZXNcclxuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRIYWlybGluZXMgKCkge1xyXG4gIGlmICh0eXBlb2YgX3N1cHBvcnRIYWlybGluZXMgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBjb25zdCBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xyXG4gICAgaWYgKGRwciAmJiBkcHIgPj0gMiAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgZG9jRWxtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XHJcbiAgICAgIGNvbnN0IHRlc3RFbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICBjb25zdCBmYWtlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JvZHknKVxyXG4gICAgICBjb25zdCBiZWZvcmVOb2RlID0gZG9jRWxtLmZpcnN0RWxlbWVudENoaWxkIHx8IGRvY0VsbS5maXJzdENoaWxkXHJcbiAgICAgIHRlc3RFbG0uc3R5bGUuYm9yZGVyID0gJzAuNXB4IHNvbGlkIHRyYW5zcGFyZW50J1xyXG4gICAgICBmYWtlQm9keS5hcHBlbmRDaGlsZCh0ZXN0RWxtKVxyXG4gICAgICBkb2NFbG0uaW5zZXJ0QmVmb3JlKGZha2VCb2R5LCBiZWZvcmVOb2RlKVxyXG4gICAgICBfc3VwcG9ydEhhaXJsaW5lcyA9IHRlc3RFbG0ub2Zmc2V0SGVpZ2h0ID09PSAxXHJcbiAgICAgIGRvY0VsbS5yZW1vdmVDaGlsZChmYWtlQm9keSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBfc3VwcG9ydEhhaXJsaW5lcyA9IGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBfc3VwcG9ydEhhaXJsaW5lc1xyXG59XHJcblxyXG5sZXQgc3VwcG9ydCA9IG51bGxcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdXBwb3J0U3RpY2t5ICgpIHtcclxuICBpZiAoc3VwcG9ydCAhPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHN1cHBvcnRcclxuICB9XHJcbiAgY29uc3QgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gIGNvbnN0IGVsZW1lbnRTdHlsZSA9IGVsZW1lbnQuc3R5bGVcclxuICBlbGVtZW50U3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjotd2Via2l0LXN0aWNreTtwb3NpdGlvbjpzdGlja3k7J1xyXG4gIHN1cHBvcnQgPSBlbGVtZW50U3R5bGUucG9zaXRpb24uaW5kZXhPZignc3RpY2t5JykgIT09IC0xXHJcbiAgcmV0dXJuIHN1cHBvcnRcclxufVxyXG5cclxuLyoqXHJcbiAqIGdldCB0cmFuc2Zvcm1PYmpcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1PYmogKGVsbSkge1xyXG4gIGxldCBzdHlsZU9iaiA9IHt9XHJcbiAgaWYgKCFlbG0pIHsgcmV0dXJuIHN0eWxlT2JqIH1cclxuICBjb25zdCB0cmFuc2Zvcm1TdHIgPSBlbG0uc3R5bGUud2Via2l0VHJhbnNmb3JtXHJcbiAgICB8fCBlbG0uc3R5bGUubW96VHJhbnNmb3JtXHJcbiAgICB8fCBlbG0uc3R5bGUudHJhbnNmb3JtXHJcbiAgaWYgKHRyYW5zZm9ybVN0ciAmJiB0cmFuc2Zvcm1TdHIubWF0Y2goLyg/OiAqKD86dHJhbnNsYXRlfHJvdGF0ZXxzY2FsZSlbXihdKlxcKFteKF0rXFwpKSsvaSkpIHtcclxuICAgIHN0eWxlT2JqID0gdHJhbnNmb3JtU3RyLnRyaW0oKS5yZXBsYWNlKC8sICsvZywgJywnKS5zcGxpdCgnICcpLnJlZHVjZShmdW5jdGlvbiAocHJlLCBzdHIpIHtcclxuICAgICAgWyd0cmFuc2xhdGUnLCAnc2NhbGUnLCAncm90YXRlJ10uZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIGlmIChuZXcgUmVnRXhwKG5hbWUsICdpJykudGVzdChzdHIpKSB7XHJcbiAgICAgICAgICBwcmVbbmFtZV0gPSBzdHJcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBwcmVcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuICByZXR1cm4gc3R5bGVPYmpcclxufVxyXG5cclxuLyoqXHJcbiAqIHRyYW5zbGF0ZSBhIHRyYW5zZm9ybSBzdHJpbmcgZnJvbSBhIHRyYW5zZm9ybU9iai5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1TdHIgKG9iaikge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZShmdW5jdGlvbiAocHJlLCBrZXkpIHtcclxuICAgIHJldHVybiBwcmUgKyBvYmpba2V5XSArICcgJ1xyXG4gIH0sICcnKVxyXG59XHJcblxyXG4vKipcclxuICogYWRkIHRyYW5zZm9ybSBzdHlsZSB0byBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbG1cclxuICogQHBhcmFtIHtvYmplY3R9IHN0eWxlOiB0cmFuc2Zvcm0gb2JqZWN0LCBmb3JtYXQgaXMgbGlrZSB0aGlzOlxyXG4gKiAgIHtcclxuICogICAgIHRyYW5zbGF0ZTogJ3RyYW5zbGF0ZTNkKDJweCwgMnB4LCAycHgpJyxcclxuICogICAgIHNjYWxlOiAnc2NhbGUoMC4yKScsXHJcbiAqICAgICByb3RhdGU6ICdyb3RhdGUoMzBkZWcpJ1xyXG4gKiAgIH1cclxuICogQHBhcmFtIHtib29sZWFufSByZXBsYWNlOiB3aGV0aGVyIHRvIHJlcGxhY2UgYWxsIHRyYW5zZm9ybSBwcm9wZXJ0aWVzLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRyYW5zZm9ybSAoZWxtLCBzdHlsZSwgcmVwbGFjZSkge1xyXG4gIGlmICghc3R5bGUpIHsgcmV0dXJuIH1cclxuICBsZXQgc3R5bGVPYmogPSB7fVxyXG4gIGlmICghcmVwbGFjZSkge1xyXG4gICAgc3R5bGVPYmogPSBnZXRUcmFuc2Zvcm1PYmooZWxtKVxyXG4gIH1cclxuICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZSkge1xyXG4gICAgY29uc3QgdmFsID0gc3R5bGVba2V5XVxyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICBzdHlsZU9ialtrZXldID0gdmFsXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IHJlc1N0ciA9IGdldFRyYW5zZm9ybVN0cihzdHlsZU9iailcclxuICBlbG0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gcmVzU3RyXHJcbiAgZWxtLnN0eWxlLm1velRyYW5zZm9ybSA9IHJlc1N0clxyXG4gIGVsbS5zdHlsZS50cmFuc2Zvcm0gPSByZXNTdHJcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvcHkgYSB0cmFuc2Zvcm0gYmVoYXZpb3VyIGZyb20gb25lIGVsZW1lbnQgdG8gYW5vdGhlci5cclxuICoga2V5IGNvdWxkIGJlOiAndHJhbnNsYXRlJyB8ICdzY2FsZScgfCAncm90YXRlJ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUcmFuc2Zvcm0gKGZyb20sIHRvLCBrZXkpIHtcclxuICBsZXQgc3RyXHJcbiAgaWYgKCFrZXkpIHtcclxuICAgIHN0ciA9IGZyb20uc3R5bGUud2Via2l0VHJhbnNmb3JtXHJcbiAgICAgIHx8IGZyb20uc3R5bGUubW96VHJhbnNmb3JtXHJcbiAgICAgIHx8IGZyb20uc3R5bGUudHJhbnNmb3JtXHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgY29uc3QgZnJvbU9iaiA9IGdldFRyYW5zZm9ybU9iaihmcm9tKVxyXG4gICAgaWYgKCFmcm9tT2JqW2tleV0pIHsgcmV0dXJuIH1cclxuICAgIGNvbnN0IHRvT2JqID0gZ2V0VHJhbnNmb3JtT2JqKHRvKVxyXG4gICAgdG9PYmpba2V5XSA9IGZyb21PYmpba2V5XVxyXG4gICAgc3RyID0gZ2V0VHJhbnNmb3JtU3RyKHRvT2JqKVxyXG4gIH1cclxuICB0by5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBzdHJcclxuICB0by5zdHlsZS5tb3pUcmFuc2Zvcm0gPSBzdHJcclxuICB0by5zdHlsZS50cmFuc2Zvcm0gPSBzdHJcclxufVxyXG5cclxuLyoqXHJcbiAqIGdldCBjb2xvcidzIHIsIGcsIGIgdmFsdWUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciBzdXBwb3J0IGFsbCBraW5kcyBvZiB2YWx1ZSBvZiBjb2xvci5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZ2IgKGNvbG9yKSB7XHJcbiAgY29uc3QgaGF4UmVnID0gLyMoW1xcZGEtZkEtRl17Mn0pKFtcXGRhLWZBLUZdezJ9KShbXFxkYS1mQS1GXXsyfSkvXHJcbiAgY29uc3QgcmdiUmVnID0gL3JnYlxcKChcXGQrKSxcXHMqKFxcZCspLFxccyooXFxkKylcXCkvXHJcbiAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5XHJcbiAgc3Bhbi5zdHlsZS5jc3NUZXh0ID0gYGNvbG9yOiAke2NvbG9yfTsgd2lkdGg6IDBweDsgaGVpZ2h0OiAwcHg7YFxyXG4gIGJvZHkgJiYgYm9keS5hcHBlbmRDaGlsZChzcGFuKVxyXG4gIGNvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc3BhbikuY29sb3IgKyAnJ1xyXG4gIGJvZHkgJiYgYm9keS5yZW1vdmVDaGlsZChzcGFuKVxyXG5cclxuICBsZXQgbWF0Y2hcclxuICBtYXRjaCA9IGNvbG9yLm1hdGNoKGhheFJlZylcclxuICBpZiAobWF0Y2gpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHI6IHBhcnNlSW50KG1hdGNoWzFdLCAxNiksXHJcbiAgICAgIGc6IHBhcnNlSW50KG1hdGNoWzJdLCAxNiksXHJcbiAgICAgIGI6IHBhcnNlSW50KG1hdGNoWzNdLCAxNilcclxuICAgIH1cclxuICB9XHJcbiAgbWF0Y2ggPSBjb2xvci5tYXRjaChyZ2JSZWcpXHJcbiAgaWYgKG1hdGNoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByOiBwYXJzZUludChtYXRjaFsxXSksXHJcbiAgICAgIGc6IHBhcnNlSW50KG1hdGNoWzJdKSxcclxuICAgICAgYjogcGFyc2VJbnQobWF0Y2hbM10pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogZ2V0IHN0eWxlIHNoZWV0IHdpdGggb3duZXIgbm9kZSdzIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBvd25lciBub2RlIGlkLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlU2hlZXRCeUlkIChpZCkge1xyXG4gIGlmICghaWQpIHsgcmV0dXJuIH1cclxuICBjb25zdCBzdHlsZVNoZWV0cyA9IGRvY3VtZW50LnN0eWxlU2hlZXRzXHJcbiAgY29uc3QgbGVuID0gc3R5bGVTaGVldHMubGVuZ3RoXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgY29uc3Qgc3R5bGVTaGVldCA9IHN0eWxlU2hlZXRzW2ldXHJcbiAgICBpZiAoc3R5bGVTaGVldC5vd25lck5vZGUuaWQgPT09IGlkKSB7XHJcbiAgICAgIHJldHVybiBzdHlsZVNoZWV0XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDaGlsZHJlblRvdGFsV2lkdGggKGNoaWxkcmVuKSB7XHJcbiAgY29uc3QgbGVuID0gY2hpbGRyZW4ubGVuZ3RoXHJcbiAgbGV0IHRvdGFsID0gMFxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIHRvdGFsICs9IGNoaWxkcmVuW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXHJcbiAgfVxyXG4gIHJldHVybiB0b3RhbFxyXG59XHJcbi8qKlxyXG4gKiBnZXQgdG90YWwgY29udGVudCB3aWR0aCBvZiB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZ2VXaWR0aCAoZWxtKSB7XHJcbiAgY29uc3QgY2hpbGRyZW4gPSBlbG0uY2hpbGRyZW5cclxuICBpZiAoIWNoaWxkcmVuKSB7XHJcbiAgICByZXR1cm4gZWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXHJcbiAgfVxyXG4gIGlmICghUmFuZ2UpIHtcclxuICAgIHJldHVybiBnZXRDaGlsZHJlblRvdGFsV2lkdGgoY2hpbGRyZW4pXHJcbiAgfVxyXG4gIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKVxyXG4gIGlmICghcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKSB7XHJcbiAgICByZXR1cm4gZ2V0Q2hpbGRyZW5Ub3RhbFdpZHRoKGNoaWxkcmVuKVxyXG4gIH1cclxuICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWxtKVxyXG4gIHJldHVybiByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG59XHJcblxyXG4vKipcclxuICogcHgycmVtIGFuZCBjYW1lbGl6ZSBrZXlzLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlT2JqZWN0MnJlbSAoc3R5bGUsIHJvb3RWYWx1ZSkge1xyXG4gIGNvbnN0IG9iaiA9IHt9XHJcbiAgZm9yIChjb25zdCBrIGluIHN0eWxlKSB7XHJcbiAgICBjb25zdCBjYW1LID0gY2FtZWxpemUoaylcclxuICAgIGlmIChiaW5kaW5nU3R5bGVOYW1lc0ZvclB4MlJlbS5pbmRleE9mKGNhbUspID4gLTEpIHtcclxuICAgICAgb2JqW2NhbUtdID0gcHgycmVtKHN0eWxlW2tdICsgJycsIHJvb3RWYWx1ZSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBvYmpbY2FtS10gPSBzdHlsZVtrXVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gb2JqXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBweDJyZW0gKHB4LCByb290VmFsdWUpIHtcclxuICByZXR1cm4gcHgucmVwbGFjZSgvKFsrLV0/XFxkKyg/Oi5cXGQqKT8pKFtwfHddeCkvZywgZnVuY3Rpb24gKCQwLCAkMSwgJDIpIHtcclxuICAgIGlmICgkMiA9PT0gJ3d4JykgeyAvLyAnd3gnIC0+IHB4XHJcbiAgICAgIHJldHVybiAkMSArICdweCdcclxuICAgIH1cclxuICAgIGVsc2UgeyAgLy8gJ3B4JyAtPiByZW1cclxuICAgICAgY29uc3QgcHhWYWwgPSBwYXJzZUZsb2F0KCQxKVxyXG4gICAgICBjb25zdCBzaWduID0gcHhWYWwgPiAwXHJcbiAgICAgICAgPyAxIDogcHhWYWwgPCAwID9cclxuICAgICAgICAgIC0xIDogMFxyXG4gICAgICBpZiAoTWF0aC5hYnMocHhWYWwpIDw9IDEpIHtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydEhhaXJsaW5lcygpXHJcbiAgICAgICAgICA/IGAke3NpZ24gKiAwLjV9cHhgXHJcbiAgICAgICAgICA6IGAke3NpZ24gKiAxfXB4YFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBweFZhbFxyXG4gICAgICAgIC8gKHJvb3RWYWx1ZSB8fCB3aW5kb3cud2VleC5jb25maWcuZW52LnJlbSlcclxuICAgICAgICArICdyZW0nXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbTJweCAocmVtLCByb290VmFsdWUpIHtcclxuICByZXR1cm4gcmVtLnJlcGxhY2UoLyhbKy1dP1xcZCsoPzouXFxkKik/KXJlbS9nLCBmdW5jdGlvbiAoJDAsICQxKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCgkMSlcclxuICAgICAgKiAocm9vdFZhbHVlIHx8IHdpbmRvdy53ZWV4LmNvbmZpZy5lbnYucmVtKVxyXG4gICAgICArICdweCdcclxuICB9KVxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuZXhwb3J0ICogZnJvbSAnLi9mdW5jJ1xyXG5leHBvcnQgKiBmcm9tICcuL2V2ZW50J1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudCdcclxuZXhwb3J0ICogZnJvbSAnLi9sYXp5bG9hZCdcclxuZXhwb3J0ICogZnJvbSAnLi9zdHlsZSdcclxuZXhwb3J0ICogZnJvbSAnLi90eXBlJ1xyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmltcG9ydCAnLi4vbGliL2VudmQnXHJcblxyXG5pbXBvcnQgeyBpbml0IGFzIGluaXRWaWV3cG9ydCB9IGZyb20gJy4vdmlld3BvcnQnXHJcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uL3V0aWxzJ1xyXG5cclxuLyoqXHJcbiAqIGdldCBXWEVudmlyb25tZW50IGluZm8uXHJcbiAqIEBwYXJhbSAge29iamVjdH0gdmlld3BvcnRJbmZvOiBpbmZvIGFib3V0IHZpZXdwb3J0LlxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IGVudkluZm86IGluZm8gcGFyc2VkIGZyb20gbGliLmVudi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0RW52ICh2aWV3cG9ydEluZm8sIGVudkluZm8pIHtcclxuICBjb25zdCBicm93c2VyTmFtZSA9IGVudkluZm8uYnJvd3NlciA/IGVudkluZm8uYnJvd3Nlci5uYW1lIDogbmF2aWdhdG9yLmFwcE5hbWVcclxuICBjb25zdCBicm93c2VyVmVyc2lvbiA9IGVudkluZm8uYnJvd3NlciA/IGVudkluZm8uYnJvd3Nlci52ZXJzaW9uLnZhbCA6IG51bGxcclxuICBsZXQgb3NOYW1lID0gZW52SW5mby5vcy5uYW1lXHJcbiAgaWYgKG9zTmFtZS5tYXRjaCgvKGlQaG9uZXxpUGFkfGlQb2QpL2kpKSB7XHJcbiAgICBvc05hbWUgPSAnaU9TJ1xyXG4gIH1cclxuICBlbHNlIGlmIChvc05hbWUubWF0Y2goL0FuZHJvaWQvaSkpIHtcclxuICAgIG9zTmFtZSA9ICdhbmRyb2lkJ1xyXG4gIH1cclxuICBjb25zdCBvc1ZlcnNpb24gPSBlbnZJbmZvLm9zLnZlcnNpb24udmFsXHJcbiAgY29uc3QgZW52ID0ge1xyXG4gICAgcGxhdGZvcm06ICdXZWInLFxyXG4gICAgd2VleFZlcnNpb246ICdwcm9jZXNzLmVudi5XRUVYX1ZFUlNJT04nLFxyXG4gICAgdXNlckFnZW50OiBuYXZpZ2F0b3IudXNlckFnZW50LFxyXG4gICAgYXBwTmFtZTogYnJvd3Nlck5hbWUsXHJcbiAgICBhcHBWZXJzaW9uOiBicm93c2VyVmVyc2lvbixcclxuICAgIG9zTmFtZSxcclxuICAgIG9zVmVyc2lvbixcclxuICAgIGRldmljZU1vZGVsOiBlbnZJbmZvLm9zLm5hbWUgfHwgbnVsbFxyXG4gIH1cclxuICAvKipcclxuICAgKiB2aWV3cG9ydEluZm86IHNjYWxlLCBkZXZpY2VXaWR0aCwgZGV2aWNlSGVpZ2h0LiBkcHJcclxuICAgKi9cclxuICByZXR1cm4gZXh0ZW5kKHZpZXdwb3J0SW5mbywgZW52KVxyXG59XHJcblxyXG4vLyBjb25zdCB2aWV3cG9ydEluZm8gPSBpbml0Vmlld3BvcnQoKVxyXG5cclxuLy8gNzUwIGJ5IGRlZmF1bHQgY3VycmVudGx5XHJcbi8vIGNvbnN0IHNjYWxlID0gdmlld3BvcnRJbmZvLnNjYWxlXHJcblxyXG4vLyBjb25zdCB1bml0cyA9IHtcclxuLy8gICBSRU06IDEyICogc2NhbGUsXHJcbi8vICAgVlc6IHZpZXdwb3J0SW5mby5kZXZpY2VXaWR0aCAvIDEwMCxcclxuLy8gICBWSDogdmlld3BvcnRJbmZvLmRldmljZUhlaWdodCAvIDEwMCxcclxuLy8gICBWTUlOOiBNYXRoLm1pbih2aWV3cG9ydEluZm8uZGV2aWNlV2lkdGgsIHZpZXdwb3J0SW5mby5kZXZpY2VIZWlnaHQpIC8gMTAwLFxyXG4vLyAgIFZNQVg6IE1hdGgubWF4KHZpZXdwb3J0SW5mby5kZXZpY2VXaWR0aCwgdmlld3BvcnRJbmZvLmRldmljZUhlaWdodCkgLyAxMDAsXHJcbi8vICAgQ006IDk2IC8gMi41NCAqIHNjYWxlLFxyXG4vLyAgIE1NOiA5NiAvIDI1LjQgKiBzY2FsZSxcclxuLy8gICBROiA5NiAvIDI1LjQgLyA0ICogc2NhbGUsXHJcbi8vICAgSU46IDk2ICogc2NhbGUsXHJcbi8vICAgUFQ6IDk2IC8gNzIgKiBzY2FsZSxcclxuLy8gICBQQzogOTYgLyA2ICogc2NhbGUsXHJcbi8vICAgUFg6IHNjYWxlXHJcbi8vIH1cclxuXHJcbi8vIE9iamVjdC5mcmVlemUodW5pdHMpXHJcbi8vIE9iamVjdC5mcmVlemUoZW52KVxyXG5cclxuLy8gd2luZG93LkNTU19VTklUID0gdW5pdHNcclxud2luZG93LldYRW52aXJvbm1lbnQgPSBpbml0RW52KGluaXRWaWV3cG9ydCgpLCB3aW5kb3cubGliLmVudilcclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKiBnbG9iYWwgVnVlICovXHJcblxyXG5pbXBvcnQgJy4vd3gtZW52J1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi91dGlscydcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXHJcblxyXG5jb25zdCB3ZWV4TW9kdWxlcyA9IHt9XHJcbmNvbnN0IF9yb290cyA9IFtdXHJcblxyXG5jb25zdCB3ZWV4ID0ge1xyXG4gIF9fdnVlX186IG51bGwsXHJcbiAgdXRpbHMsXHJcbiAgLy8gdW5pdHM6IHdpbmRvdy5DU1NfVU5JVCxcclxuICBjb25maWc6IHtcclxuICAgIGVudjogd2luZG93LldYRW52aXJvbm1lbnQsXHJcbiAgICBidW5kbGVVcmw6IGxvY2F0aW9uLmhyZWZcclxuICB9LFxyXG5cclxuICBfY29tcG9uZW50czoge30sXHJcbiAgX21vZHVsZXM6IHdlZXhNb2R1bGVzLFxyXG5cclxuICBfbWV0YToge1xyXG4gICAgbW91bnRlZDoge30sXHJcbiAgICB1cGRhdGVkOiB7fSxcclxuICAgIGRlc3Ryb3llZDoge30sXHJcbiAgICByZXF1aXJlZE1vZHVsZXM6IHt9LFxyXG4gICAgYXBpQ2FsbGVkOiB7fSxcclxuICAgIHBlcmY6IHt9XHJcbiAgfSxcclxuXHJcbiAgZG9jdW1lbnQ6IHtcclxuICAgIGJvZHk6IHt9XHJcbiAgfSxcclxuXHJcbiAgcmVxdWlyZU1vZHVsZSAobW9kdWxlTmFtZSkge1xyXG4gICAgY29uc3QgbWV0YU1vZCA9IHdlZXguX21ldGEucmVxdWlyZWRNb2R1bGVzXHJcbiAgICBpZiAoIW1ldGFNb2RbbW9kdWxlTmFtZV0pIHtcclxuICAgICAgbWV0YU1vZFttb2R1bGVOYW1lXSA9IDBcclxuICAgIH1cclxuICAgIG1ldGFNb2RbbW9kdWxlTmFtZV0rK1xyXG4gICAgcmV0dXJuIHdlZXhNb2R1bGVzW21vZHVsZU5hbWVdXHJcbiAgfSxcclxuXHJcbiAgcmVnaXN0ZXJNb2R1bGUgKC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyQXBpTW9kdWxlKC4uLmFyZ3MpXHJcbiAgfSxcclxuXHJcbiAgc3VwcG9ydCAoZmVhdHVyZSA9ICcnKSB7XHJcbiAgICBjb25zdCBtYXRjaCA9IChmZWF0dXJlICsgJycpLm1hdGNoKC9AKGNvbXBvbmVudHxtb2R1bGUpXFwvKFxcdyspKC5cXHcrKT8vKVxyXG4gICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgIGNvbnN0IHR5cGUgPSBtYXRjaFsxXVxyXG4gICAgICBjb25zdCBtb2QgPSBtYXRjaFsyXVxyXG4gICAgICBsZXQgbWV0aG9kID0gbWF0Y2hbM11cclxuICAgICAgbWV0aG9kID0gbWV0aG9kICYmIG1ldGhvZC5yZXBsYWNlKC9eXFwuLywgJycpXHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2NvbXBvbmVudCc6XHJcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2NvbXBvbmVudHNbbW9kXSAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgfHwgY29uZmlnLndlZXhCdWlsdEluQ29tcG9uZW50cy5pbmRleE9mKG1vZCkgPj0gMFxyXG4gICAgICAgIGNhc2UgJ21vZHVsZSc6XHJcbiAgICAgICAgICBjb25zdCBtb2R1bGUgPSB3ZWV4TW9kdWxlc1ttb2RdXHJcbiAgICAgICAgICByZXR1cm4gbW9kdWxlICYmIG1ldGhvZCA/ICEhbW9kdWxlW21ldGhvZF0gOiAhIW1vZHVsZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBbdnVlLXJlbmRlcl0gaW52YWxpZCBhcmd1bWVudCBmb3Igd2VleC5zdXBwb3J0OiAke2ZlYXR1cmV9YClcclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzdXBwb3J0cyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdXBwb3J0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcclxuICB9LFxyXG5cclxuICBpc1JlZ2lzdGVyZWRNb2R1bGUgKG1vZHVsZU5hbWUsIG1ldGhvZE5hbWUpIHtcclxuICAgIGNvbnN0IGZlYXR1cmUgPSBtZXRob2ROYW1lID8gYCR7bW9kdWxlTmFtZX0uJHttZXRob2ROYW1lfWAgOiBtb2R1bGVOYW1lXHJcbiAgICByZXR1cm4gdGhpcy5zdXBwb3J0KCdAbW9kdWxlLycgKyBmZWF0dXJlKVxyXG4gIH0sXHJcblxyXG4gIGlzUmVnaXN0ZXJlZENvbXBvbmVudCAoY29tcG9uZW50TmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3VwcG9ydCgnQGNvbXBvbmVudC8nICsgY29tcG9uZW50TmFtZSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlciBhIG5ldyB2dWUgaW5zdGFuY2UgaW4gdGhpcyB3ZWV4IGluc3RhbmNlLiBQdXQgaXRzIHJvb3QgZWxlbWVudCBpbnRvIHdlZXguZG9jdW1lbnQuYm9keS5jaGlsZHJlbiwgc29cclxuICAgKiB0aGF0IHVzZXIgY2FuIHVzZSB3ZWV4LmRvY3VtZW50LmJvZHkgdG8gd2FsayB0aHJvdWdoIGFsbCBkb20gc3RydWN0dXJlcyBpbiBhbGwgdnVlIGluc3RhbmNlcyBpbiB0aGUgcGFnZS5cclxuICAgKi9cclxuICByZWdpc3RlclZ1ZUluc3RhbmNlIChpbnN0YW5jZSkge1xyXG4gICAgaWYgKCFpbnN0YW5jZSBpbnN0YW5jZW9mIFZ1ZSkge1xyXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBbdnVlLXJlbmRlcl0gcmVnaXN0ZXJWdWVJbnN0YW5jZTogaW52YWxpZCBpbnN0YW5jZSwgbm90IGEgdnVlIGluc3RhbmNlLmApXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCByb290ID0gaW5zdGFuY2UuJHJvb3RcclxuICAgIGlmICghcm9vdCB8fCAhcm9vdC4kZWwpIHtcclxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgW3Z1ZS1yZW5kZXJdIHJlZ2lzdGVyVnVlSW5zdGFuY2U6IGluc3RhbmNlIGhhcyBubyByb290LmApXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmRvY3VtZW50LmJvZHkuY2hpbGRyZW4ucHVzaChyb290LiRlbClcclxuICB9LFxyXG5cclxuICAvLyBAZGVwcmVjYXRlZFxyXG4gIHJlcXVpcmUgKC4uLmFyZ3MpIHtcclxuICAgIGNvbnNvbGUubG9nKGBbVnVlIFJlbmRlcl0gXCJ3ZWV4LnJlcXVpcmVcIiBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIFwid2VleC5yZXF1aXJlTW9kdWxlXCIgaW5zdGVhZC5gKVxyXG4gICAgcmV0dXJuIHRoaXMucmVxdWlyZU1vZHVsZSguLi5hcmdzKVxyXG4gIH0sXHJcblxyXG4gIC8vIEBkZXByZWNhdGVkXHJcbiAgLy8gVE9ETzogcmVuYW1lIHRvIHJlZ2lzdGVyTW9kdWxlXHJcbiAgcmVnaXN0ZXJBcGlNb2R1bGUgKG5hbWUsIG1vZHVsZSwgbWV0YSkge1xyXG4gICAgaWYgKCF3ZWV4TW9kdWxlc1tuYW1lXSkge1xyXG4gICAgICB3ZWV4TW9kdWxlc1tuYW1lXSA9IHt9XHJcbiAgICB9XHJcbiAgICBpZiAoISFtZXRhICYmIG1ldGEucmVnaXN0ZXJUeXBlID09PSAnYXNzaWdubWVudCcpIHtcclxuICAgICAgd2VleE1vZHVsZXNbbmFtZV0gPSBtb2R1bGVcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBtb2R1bGUpIHtcclxuICAgICAgICBpZiAobW9kdWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgIHdlZXhNb2R1bGVzW25hbWVdW2tleV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbGxlZCA9IHdlZXguX21ldGEuYXBpQ2FsbGVkXHJcbiAgICAgICAgICAgIGlmICghY2FsbGVkW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgY2FsbGVkW25hbWVdID0ge31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjYWxsZWRNb2QgPSBjYWxsZWRbbmFtZV1cclxuICAgICAgICAgICAgaWYgKCFjYWxsZWRNb2Rba2V5XSkge1xyXG4gICAgICAgICAgICAgIGNhbGxlZE1vZFtrZXldID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGxlZE1vZFtrZXldKytcclxuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZVtrZXldLmFwcGx5KHdlZXgsIGFyZ3VtZW50cylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZWdpc3RlckNvbXBvbmVudCAobmFtZSwgY29tcG9uZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX192dWVfXykge1xyXG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ1tWdWUgUmVuZGVyXSBWdWUgaXMgbm90IGZvdW5kLiBQbGVhc2UgaW1wb3J0IFZ1ZS5qcyBiZWZvcmUgcmVnaXN0ZXIgYSBjb21wb25lbnQuJylcclxuICAgIH1cclxuICAgIHRoaXMuX2NvbXBvbmVudHNbbmFtZV0gPSAwXHJcbiAgICBpZiAoY29tcG9uZW50Ll9jc3MpIHtcclxuICAgICAgY29uc3QgY3NzID0gY29tcG9uZW50Ll9jc3MucmVwbGFjZSgvXFxiWystXT9bXFxkLl0rcmVtOz9cXGIvZywgZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChtKSAqIDc1ICogd2VleC5jb25maWcuZW52LnNjYWxlICsgJ3B4J1xyXG4gICAgICB9KVxyXG4gICAgICB1dGlscy5hcHBlbmRDc3MoY3NzLCBgd2VleC1jbXAtJHtuYW1lfWApXHJcbiAgICAgIGRlbGV0ZSBjb21wb25lbnQuX2Nzc1xyXG4gICAgfVxyXG4gICAgdGhpcy5fX3Z1ZV9fLmNvbXBvbmVudChuYW1lLCBjb21wb25lbnQpXHJcbiAgfSxcclxuXHJcbiAgLy8gQGRlcHJlY2F0ZWRcclxuICBnZXRSb290ICgpIHt9LFxyXG5cclxuICAvLyBAZGVwcmVjYXRlZFxyXG4gIHNlbmRlcjoge1xyXG4gICAgcGVyZm9ybUNhbGxiYWNrIChjYWxsYmFjaywgZGF0YSwga2VlcEFsaXZlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vIEBkZXByZWNhdGVkXHJcbiAgaW5zdGFsbCAobW9kdWxlKSB7XHJcbiAgICBtb2R1bGUuaW5pdCh0aGlzKVxyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHdlZXguZG9jdW1lbnQuYm9keSwgJ2NoaWxkcmVuJywge1xyXG4gIGdldCAoKSB7IHJldHVybiBfcm9vdHMgfVxyXG59KVxyXG5cclxuOyBbJ29uJywgJ29uY2UnLCAnb2ZmJywgJ2VtaXQnXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICB3ZWV4W21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgaWYgKCF0aGlzLl92dWUpIHtcclxuICAgICAgdGhpcy5fdnVlID0gbmV3IHRoaXMuX192dWVfXygpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fdnVlW2AkJHttZXRob2R9YF0oLi4uYXJncylcclxuICB9XHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWV4XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICAvLyBjYW1lbGl6ZUtleXMsXHJcbiAgLy8gaHlwaGVuYXRlS2V5cyxcclxuICBleHRlbmQsXHJcbiAgZXh0ZW5kVHJ1dGh5XHJcbiAgLy8gdHJpbUNvbW1lbnQsXHJcbiAgLy8gbm9ybWFsaXplU3R5bGUsXHJcbiAgLy8gYXV0b1ByZWZpeCxcclxuICAvLyBpc0FycmF5LFxyXG4gIC8vIGdldFBhcmVudFNjcm9sbGVyLFxyXG4gIC8vIHN1cHBvcnRTdGlja3ksXHJcbiAgLy8gYXBwZW5kQ3NzXHJcbn0gZnJvbSAnLi4vdXRpbHMnXHJcblxyXG5mdW5jdGlvbiBnZXRJbmxpbmVTdHlsZSAodm5vZGUpIHtcclxuICBjb25zdCBkYXRhID0gdm5vZGUuZGF0YSB8fCB7fVxyXG4gIHJldHVybiBleHRlbmRUcnV0aHkoe30sIGRhdGEuc3RhdGljU3R5bGUsIGRhdGEuc3R5bGUpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Q29tcG9uZW50U3R5bGUgKGNvbnRleHQpIHtcclxuICByZXR1cm4gZ2V0Q29tcG9uZW50SW5saW5lU3R5bGUoY29udGV4dClcclxuICAvLyByZXR1cm4gZ2V0Q29tcG9uZW50U3R5bGUoY29udGV4dCwgdHJ1ZSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudElubGluZVN0eWxlIChjb250ZXh0KSB7XHJcbiAgbGV0IHZub2RlID0gY29udGV4dCAmJiBjb250ZXh0LiR2bm9kZVxyXG4gIGlmICghdm5vZGUpIHtcclxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICByZXR1cm4gY29uc29sZS5lcnJvcignW3Z1ZS1yZW5kZXJdIGdldENvbXBvbmVudFN0eWxlIGZhaWxlZDogbm8gJHZub2RlIGluIGNvbnRleHQuJylcclxuICAgIH1cclxuICAgIHJldHVybiB7fVxyXG4gIH1cclxuICBjb25zdCBzdHlsZSA9IHt9XHJcbiAgd2hpbGUgKHZub2RlKSB7XHJcbiAgICBleHRlbmQoc3R5bGUsIGdldElubGluZVN0eWxlKHZub2RlKSlcclxuICAgIHZub2RlID0gdm5vZGUucGFyZW50XHJcbiAgfVxyXG4gIHJldHVybiBzdHlsZVxyXG59XHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdHJhbnNmb3JtIChzdHlsZSkge1xuICAgIGNvbnN0IGxpbmVzID0gc3R5bGUubGluZXNcbiAgICBpZiAobGluZXMgPiAwKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdHlsZSwge1xuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICAgICAgV2Via2l0TGluZUNsYW1wOiBsaW5lc1xuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlXG4gIH1cbn1cbiIsImNvbnN0IHRhZ01hcCA9IHtcbiAgdGV4dDogcmVxdWlyZSgnLi90ZXh0Jylcbn1cblxuZXhwb3J0cy5nZXRUcmFuc2Zvcm1lciA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgcmV0dXJuIHRhZ01hcFt0YWddXG59XG4iLCJjb25zdCB7IGdldENvbXBpbGVyIH0gPSByZXF1aXJlKCcuL2NvbXBpbGVyJylcbmNvbnN0IHsgZ2V0VHJhbnNmb3JtZXIgfSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtZXInKVxuXG5leHBvcnRzLmdldENvbXBpbGVyID0gZ2V0Q29tcGlsZXJcbmV4cG9ydHMuZ2V0VHJhbnNmb3JtZXIgPSBnZXRUcmFuc2Zvcm1lclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5pbXBvcnQgeyBnZXRUcmFuc2Zvcm1lciB9IGZyb20gJ3d4di10cmFuc2Zvcm1lcidcclxuaW1wb3J0IHtcclxuICBpc0FycmF5LFxyXG4gIGlzRGVmLFxyXG4gIGlzUHJpbWl0aXZlLFxyXG4gIGRpc3BhdGNoTmF0aXZlRXZlbnRcclxufSBmcm9tICcuLi91dGlscydcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXHJcblxyXG5jb25zdCB7XHJcbiAgd2VleEJ1aWx0SW5Db21wb25lbnRzXHJcbn0gPSBjb25maWdcclxuXHJcbmNvbnN0IGFwcGVhckV2ZW50c01hcCA9IHtcclxuICBhcHBlYXI6ICdhcHBlYXInLFxyXG4gIGRpc2FwcGVhcjogJ2Rpc2FwcGVhcicsXHJcbiAgb2Zmc2V0QXBwZWFyOiAnb2Zmc2V0LWFwcGVhcicsXHJcbiAgb2Zmc2V0RGlzYXBwZWFyOiAnb2Zmc2V0LWRpc2FwcGVhcidcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbW92ZSB0ZXh0IG5vZGVzIGluIHRoZSBub2RlcyBhcnJheS5cclxuICogQHBhcmFtICB7QXJyYXl9IG5vZGVzXHJcbiAqIEByZXR1cm4ge0FycmF5fSBub2RlcyB3aXRob3V0IHRleHQgbm9kZXMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJpbVRleHRWTm9kZXMgKHZub2Rlcykge1xyXG4gIGlmIChpc0FycmF5KHZub2RlcykpIHtcclxuICAgIHJldHVybiB2bm9kZXMuZmlsdGVyKHZub2RlID0+ICEhdm5vZGUudGFnKVxyXG4gIH1cclxuICByZXR1cm4gdm5vZGVzXHJcbn1cclxuXHJcbi8qKlxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiBtZXRob2QgdG8gdHJhbnNmb3JtIGFyZ3MgcGFzc2VkIHRvIGNyZWF0ZUVsZW1lbnRcclxuICogZm9yIHJlbmRlciBmdW5jdGlvbi5cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICovXHJcblxyXG4vLyBzaG91bGQgc2hhcmUgd2l0aCBwcmVjb21waWxlci5cclxuY29uc3QgbWV0YU1hcCA9IHtcclxuICBmaWd1cmU6IFsnaW1nJywgJ2ltYWdlJywgJ2dpZicsICdmaWd1cmUnXSxcclxuICBwOiBbJ3RleHQnLCAncCddLFxyXG4gIGRpdjogWydjb250YWluZXInLCAnZGl2J10sXHJcbiAgc2VjdGlvbjogWydjZWxsJywgJ2NlbGwtc2xvdCddLFxyXG4gICdyZWN5Y2xlLWxpc3QnOiBbJ3JlY3ljbGUtbGlzdCddXHJcbn1cclxuXHJcbmNvbnN0IGNoZWNrTWFwID0gT2JqZWN0LmtleXMobWV0YU1hcCkucmVkdWNlKGZ1bmN0aW9uIChwcmUsIHRhcmdldFRhZykge1xyXG4gIGNvbnN0IHRhZ0FyciA9IG1ldGFNYXBbdGFyZ2V0VGFnXVxyXG4gIHRhZ0Fyci5mb3JFYWNoKGZ1bmN0aW9uIChmcm9tVGFnKSB7XHJcbiAgICBwcmVbZnJvbVRhZ10gPSB0YXJnZXRUYWdcclxuICB9KVxyXG4gIHJldHVybiBwcmVcclxufSwge30pXHJcblxyXG5jb25zdCBfc3RkVGFnTWFwID0ge1xyXG4gIHA6ICd0ZXh0JyxcclxuICBmaWd1cmU6ICdpbWFnZScsXHJcbiAgc2VjdGlvbjogJ2NlbGwnXHJcbn1cclxuZnVuY3Rpb24gZ2V0U3RkVGFnICh0YWcpIHtcclxuICBjb25zdCBzdGRUYWcgPSBfc3RkVGFnTWFwW3RhZ11cclxuICByZXR1cm4gc3RkVGFnIHx8IHRhZ1xyXG59XHJcblxyXG5jb25zdCBwcmVjb21waWxlZENsYXNzTWFwID0ge1xyXG4gIGRpdjoge1xyXG4gICAgJ3dlZXgtY3QnOiB0cnVlLFxyXG4gICAgJ3dlZXgtZGl2JzogdHJ1ZVxyXG4gIH0sXHJcbiAgaW1hZ2U6IHtcclxuICAgICd3ZWV4LWVsJzogdHJ1ZSxcclxuICAgICd3ZWV4LWltYWdlJzogdHJ1ZVxyXG4gIH0sXHJcbiAgdGV4dDoge1xyXG4gICAgJ3dlZXgtZWwnOiB0cnVlLFxyXG4gICAgJ3dlZXgtdGV4dCc6IHRydWVcclxuICB9LFxyXG4gIGNlbGw6IHtcclxuICAgICd3ZWV4LWN0JzogdHJ1ZSxcclxuICAgICd3ZWV4LWNlbGwnOiB0cnVlXHJcbiAgfSxcclxuICBhOiB7XHJcbiAgICAnd2VleC1jdCc6IHRydWUsXHJcbiAgICAnd2VleC1hJzogdHJ1ZVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNQcmVjb21waWxlZCAodGFnKSB7XHJcbiAgcmV0dXJuIGNvbmZpZy53ZWV4QnVpbHRJbkNvbXBvbmVudHMuaW5kZXhPZih0YWcpID4gLTFcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVJlbmRlciAoY3R4LCBoKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChcclxuICAgIHRhZyxcclxuICAgIGRhdGEsXHJcbiAgICBjaGlsZHJlbixcclxuICAgIG5vcm1hbGl6YXRpb25UeXBlLFxyXG4gICAgYWx3YXlzTm9ybWFsaXplXHJcbiAgKSB7XHJcbiAgICBpZiAoaXNBcnJheShkYXRhKSB8fCBpc1ByaW1pdGl2ZShkYXRhKSkge1xyXG4gICAgICBub3JtYWxpemF0aW9uVHlwZSA9IGNoaWxkcmVuXHJcbiAgICAgIGNoaWxkcmVuID0gZGF0YVxyXG4gICAgICBkYXRhID0ge31cclxuICAgIH1cclxuICAgIGlmICghaXNEZWYoZGF0YSkpIHtcclxuICAgICAgZGF0YSA9IHt9XHJcbiAgICB9XHJcbiAgICBpZiAoaXNEZWYoZGF0YS5pcykpIHtcclxuICAgICAgdGFnID0gZGF0YS5pc1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGRhdGEgPSB0cmFuc2Zvcm1EYXRhKHRoaXMsIGRhdGEsIHRhZylcclxuICAgICAgdGFnID0gdHJhbnNmb3JtVGFnKHRoaXMsIHRhZylcclxuICAgIH1cclxuICAgIGVsc2UgeyAgLy8gZGlyZWN0IGNvbXBvbmVudCBvcHRpb25zIC8gY29uc3RydWN0b3JcclxuICAgICAgZGF0YSA9IHRyYW5zZm9ybURhdGEodGhpcywgZGF0YSwgdW5kZWZpbmVkKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGguY2FsbChcclxuICAgICAgdGhpcyxcclxuICAgICAgdGFnLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBjaGlsZHJlbixcclxuICAgICAgbm9ybWFsaXphdGlvblR5cGUsXHJcbiAgICAgIGFsd2F5c05vcm1hbGl6ZVxyXG4gICAgKVxyXG4gIH0uYmluZChjdHgpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1UYWcgKGN0eCwgdGFnKSB7XHJcbiAgY29uc3QgZWxlbWVudFRhZyA9IGNoZWNrTWFwW3RhZ11cclxuICByZXR1cm4gZWxlbWVudFRhZyB8fCB0YWdcclxufVxyXG5cclxuLyoqXHJcbiAqIFRlbGwgd2hldGhlciBhIGVsZW1lbnQgaXMgY29udGFpbmVkIGluIGEgZWxlbWVudCB3aG8gaGFzXHJcbiAqIGEgYXR0cmlidXRlICdidWJibGUnPXRydWUuXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqL1xyXG4vLyBmdW5jdGlvbiBpbkJ1YmJsZSAoZWwpIHtcclxuLy8gICBpZiAodHlwZW9mIGVsLl9pbkJ1YmJsZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbi8vICAgICByZXR1cm4gZWwuX2luQnViYmxlXHJcbi8vICAgfVxyXG4vLyAgIGNvbnN0IHBhcmVudHMgPSBbXVxyXG4vLyAgIGxldCBwYXJlbnQgPSBlbC5wYXJlbnRFbGVtZW50XHJcbi8vICAgbGV0IGluQnViYmxlXHJcbi8vICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IGRvY3VtZW50LmJvZHkpIHtcclxuLy8gICAgIGlmICh0eXBlb2YgcGFyZW50Ll9pbkJ1YmJsZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbi8vICAgICAgIGluQnViYmxlID0gcGFyZW50Ll9pbkJ1YmJsZVxyXG4vLyAgICAgICBicmVha1xyXG4vLyAgICAgfVxyXG4vLyAgICAgY29uc3QgYXR0ciA9IHBhcmVudC5nZXRBdHRyaWJ1dGUoJ2J1YmJsZScpXHJcbi8vICAgICBpZiAoYXR0ciAhPT0gJycpIHtcclxuLy8gICAgICAgaW5CdWJibGUgPSBhdHRyID09PSB0cnVlIHx8IGF0dHIgPT09ICd0cnVlJ1xyXG4vLyAgICAgICBicmVha1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcGFyZW50cy5wdXNoKHBhcmVudClcclxuLy8gICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50XHJcbi8vICAgfVxyXG4vLyAgIGVsLl9pbkJ1YmJsZSA9IGluQnViYmxlXHJcbi8vICAgZm9yIChsZXQgaSA9IDAsIGwgPSBwYXJlbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4vLyAgICAgcGFyZW50c1tpXS5faW5CdWJibGUgPSBpbkJ1YmJsZVxyXG4vLyAgIH1cclxuLy8gICByZXR1cm4gaW5CdWJibGVcclxuLy8gfVxyXG5cclxuZnVuY3Rpb24gYmluZEV2ZW50cyAoY3R4LCBldnRzLCBhdHRycywgdGFnLCBhcHBlYXJBdHRhY2hlZCkge1xyXG4gIGZvciAoY29uc3Qga2V5IGluIGV2dHMpIHtcclxuICAgIGNvbnN0IGFwcGVhckV2dE5hbWUgPSBhcHBlYXJFdmVudHNNYXBba2V5XVxyXG4gICAgaWYgKGFwcGVhckV2dE5hbWUpIHtcclxuICAgICAgYXR0cnNbYGRhdGEtZXZ0LSR7YXBwZWFyRXZ0TmFtZX1gXSA9ICcnXHJcbiAgICAgIGlmICghYXBwZWFyQXR0YWNoZWQudmFsdWUpIHtcclxuICAgICAgICBhcHBlYXJBdHRhY2hlZC52YWx1ZSA9IHRydWVcclxuICAgICAgICBhdHRyc1snd2VleC1hcHBlYXInXSA9ICcnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBhdHRyc1tgZGF0YS1ldnQtJHtrZXl9YF0gPSAnJ1xyXG4gICAgICBpZiAoa2V5ICE9PSAnY2xpY2snKSB7XHJcbiAgICAgICAgLy8gc2hvdWxkIHN0b3AgcHJvcGFnYXRpb24gYnkgZGVmYXVsdC5cclxuICAgICAgICAvLyBUT0RPOiBzaG91bGQgdGVzdCBpbkJ1YmJsZSBmaXJzdC5cclxuICAgICAgICBjb25zdCBoYW5kbGVyID0gZXZ0c1trZXldXHJcbiAgICAgICAgaWYgKGlzQXJyYXkoZXZ0c1trZXldKSkge1xyXG4gICAgICAgICAgaGFuZGxlci51bnNoaWZ0KGN0eC4kc3RvcFByb3BhZ2F0aW9uKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGV2dHNba2V5XSA9IFtjdHguJHN0b3BQcm9wYWdhdGlvbiwgaGFuZGxlcl1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGV2dHMuY2xpY2spIHtcclxuICAgIGV2dHMud2VleCR0YXAgPSBldnRzLmNsaWNrXHJcbiAgICBldnRzLmNsaWNrID0gY3R4LiRzdG9wT3V0ZXJBXHJcbiAgfVxyXG4gIGlmIChldnRzLnNjcm9sbCkge1xyXG4gICAgZXZ0cy53ZWV4JHNjcm9sbCA9IGV2dHMuc2Nyb2xsXHJcbiAgICBkZWxldGUgZXZ0cy5zY3JvbGxcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybU9uIChjdHgsIGRhdGEsIHRhZykge1xyXG4gIGxldCB7IG9uLCBuYXRpdmVPbiB9ID0gZGF0YVxyXG4gIGlmICh3ZWV4QnVpbHRJbkNvbXBvbmVudHMuaW5kZXhPZih0YWcpID4gLTEpIHtcclxuICAgIC8qKlxyXG4gICAgICogZm9yIGRpdiwgaW1hZ2UsIHRleHQsIGNlbGwsIGEsIC4uLlxyXG4gICAgICogdXNlciBzaG91bGQgYmluZCBhbGwgZXZlbnRzIHdpdGhvdXQgLm5hdGl2ZS5cclxuICAgICAqL1xyXG4gICAgbmF0aXZlT24gPSBudWxsXHJcbiAgICBkZWxldGUgZGF0YS5uYXRpdmVPblxyXG4gIH1cclxuICBpZiAoaXNEZWYod2VleC5fY29tcG9uZW50c1t0YWddKSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBmb3Igc2xpZGVyLCBsaXN0LCAuLi5cclxuICAgICAqIHVzZXIgc2hvdWxkIGJpbmQgZXZlbnRzIHdpdGhvdXQgLm5hdGl2ZS5cclxuICAgICAqIGluIG91ciBldmVudHMgaGFuZGxpbmcsIGFsbCBldmVudHMgc2hvdWxkIHRyYW5zZmVyIHRvXHJcbiAgICAgKiAubmF0aXZlIGJpbmRpbmcuXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZSBkYXRhLm5hdGl2ZU9uXHJcbiAgICBuYXRpdmVPbiA9IG51bGxcclxuICAgIGlmIChvbikge1xyXG4gICAgICBuYXRpdmVPbiA9IGRhdGEubmF0aXZlT24gPSBvblxyXG4gICAgfVxyXG4gICAgb24gPSBudWxsXHJcbiAgICBkZWxldGUgZGF0YS5vblxyXG4gIH1cclxuXHJcbiAgbGV0IGF0dHJzID0gZGF0YS5hdHRyc1xyXG4gIGlmICghYXR0cnMpIHtcclxuICAgIGF0dHJzID0gZGF0YS5hdHRycyA9IHt9XHJcbiAgfVxyXG5cclxuICBjb25zdCBhcHBlYXJBdHRhY2hlZCA9IHtcclxuICAgIHZhbHVlOiBmYWxzZVxyXG4gIH1cclxuICBpZiAob24pIHtcclxuICAgIGJpbmRFdmVudHMoY3R4LCBvbiwgYXR0cnMsIHRhZywgYXBwZWFyQXR0YWNoZWQpXHJcbiAgfVxyXG4gIGlmIChuYXRpdmVPbikge1xyXG4gICAgYmluZEV2ZW50cyhjdHgsIG5hdGl2ZU9uLCBhdHRycywgdGFnLCBhcHBlYXJBdHRhY2hlZClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGJpbmRpbmcgYSB3ZWV4JHRhcCB0byA8YT4gZWxlbWVudCB0byBzdG9wIHByb3BhZ2F0aW9uIGlmIHRoZXJlXHJcbiAgICogaXMgbm8gYnViYmxlcz10cnVlIGZsYWcgc2hvd2luZyBvbiBwYXJlbnRzLlxyXG4gICAqL1xyXG4gIGlmICh0YWcgPT09ICdhJykge1xyXG4gICAgaWYgKCFvbikge1xyXG4gICAgICBvbiA9IGRhdGEub24gPSB7fVxyXG4gICAgfVxyXG4gICAgLy8gaWYgKCFjaGVja0J1YmJsZShlbCkpIHtcclxuICAgIGxldCBldnQgPSBvblsnd2VleCR0YXAnXVxyXG4gICAgaWYgKCFldnQpIHtcclxuICAgICAgb25bJ3dlZXgkdGFwJ10gPSBjdHguJHN0b3BQcm9wYWdhdGlvblxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShldnQpKSB7XHJcbiAgICAgIGV2dC51bnNoaWZ0KGN0eC4kc3RvcFByb3BhZ2F0aW9uKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGV2dCA9IFtjdHguJHN0b3BQcm9wYWdhdGlvbiwgZXZ0XVxyXG4gICAgfVxyXG4gICAgLy8gfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdHJhbnNmb3JtQ2xhc3MgKGRhdGEsIHRhZykge1xyXG4gIGxldCB7IGNsYXNzOiBjbGFzc0RhdGEgfSA9IGRhdGFcclxuICBjb25zdCB0YWdDbGFzc09iaiA9IHByZWNvbXBpbGVkQ2xhc3NNYXBbdGFnXVxyXG4gIGlmICghY2xhc3NEYXRhKSB7XHJcbiAgICBjbGFzc0RhdGEgPSBkYXRhLmNsYXNzID0gW11cclxuICB9XHJcbiAgaWYgKGNsYXNzRGF0YSAmJiBpc0FycmF5KGNsYXNzRGF0YSkpIHtcclxuICAgIGRhdGEuY2xhc3MgPSBjbGFzc0RhdGEuY29uY2F0KE9iamVjdC5rZXlzKHRhZ0NsYXNzT2JqKSlcclxuICB9XHJcbiAgZWxzZSBpZiAodHlwZW9mIGNsYXNzRGF0YSA9PT0gJ29iamVjdCcpIHtcclxuICAgIE9iamVjdC5hc3NpZ24oY2xhc3NEYXRhLCB0YWdDbGFzc09iailcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybVN0eWxlIChjdHgsIGRhdGEsIHRhZykge1xyXG4gIGNvbnN0IHsgc3R5bGUgfSA9IGRhdGFcclxuICBpZiAoIXN0eWxlKSB7IHJldHVybiB9XHJcbiAgY29uc3QgdHJhbnNmb3JtZXIgPSBnZXRUcmFuc2Zvcm1lcihnZXRTdGRUYWcodGFnKSlcclxuICBpZiAodHJhbnNmb3JtZXIpIHtcclxuICAgIGRhdGEuc3R5bGUgPSBjdHguX3B4MnJlbSh0cmFuc2Zvcm1lci50cmFuc2Zvcm0oc3R5bGUpLCA3NSlcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBkYXRhLnN0eWxlID0gY3R4Ll9weDJyZW0oc3R5bGUsIDc1KVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHRyYW5zZm9ybUF0dHJzOlxyXG4gKiAgLSBhZGQgd2VleC10eXBlIGF0dHJzIGZvciBwcmVjb21waWxlZFRhZ3MuXHJcbiAqICAtIGltYWdlLnJlc2l6ZTogdHJhbnNmb3JtIHRvIGRpcmVjdGl2ZSB3ZWV4LXJlc2l6ZS5cclxuICovXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybUF0dHJzIChkYXRhLCB0YWcpIHtcclxuICBsZXQgeyBhdHRycywgZGlyZWN0aXZlcyB9ID0gZGF0YVxyXG4gIGlmICghYXR0cnMpIHtcclxuICAgIGF0dHJzID0gZGF0YS5hdHRycyA9IHt9XHJcbiAgfVxyXG4gIGF0dHJzWyd3ZWV4LXR5cGUnXSA9IHRhZ1xyXG4gIGlmICh0YWcgPT09ICdpbWFnZScgfHwgdGFnID09PSAnZ2lmJykge1xyXG4gICAgY29uc3QgeyBzcmMsIHJlc2l6ZSB9ID0gYXR0cnNcclxuICAgIGlmIChzcmMpIHtcclxuICAgICAgYXR0cnNbJ2RhdGEtaW1nLXNyYyddID0gc3JjXHJcbiAgICB9XHJcbiAgICBpZiAocmVzaXplKSB7XHJcbiAgICAgIGlmICghZGlyZWN0aXZlcykge1xyXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBkYXRhLmRpcmVjdGl2ZXMgPSBbXVxyXG4gICAgICB9XHJcbiAgICAgIGRpcmVjdGl2ZXMucHVzaCh7XHJcbiAgICAgICAgbmFtZTogJ3dlZXgtcmVzaXplJyxcclxuICAgICAgICB2YWx1ZTogYXR0cnMucmVzaXplXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtRGF0YSAoY3R4LCBkYXRhLCB0YWcpIHtcclxuICBpZiAoaXNBcnJheShkYXRhKSkge1xyXG4gICAgLy8gcGFyYW1ldGVyIGRhdGEgaXMgb21taXRlZC5cclxuICAgIHJldHVybiBkYXRhXHJcbiAgfVxyXG4gIGNvbnN0IGlzUCA9IGlzUHJlY29tcGlsZWQodGFnKVxyXG4gIC8vIGNsYXNzXHJcbiAgaXNQICYmIHRyYW5zZm9ybUNsYXNzKGRhdGEsIHRhZylcclxuICAvLyBzdHlsZVxyXG4gIHRyYW5zZm9ybVN0eWxlKGN0eCwgZGF0YSwgdGFnKVxyXG4gIC8vIGF0dHJzXHJcbiAgaXNQICYmIHRyYW5zZm9ybUF0dHJzKGRhdGEsIHRhZylcclxuICAvLyBvblxyXG4gIHRyYW5zZm9ybU9uKGN0eCwgZGF0YSwgdGFnKVxyXG4gIHJldHVybiBkYXRhXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBOYXRpdmVFdmVudHMgKGN0eCwgbWFwKSB7XHJcbiAgY29uc3QgZXZlbnRNYXAgPSB7fVxyXG4gIGZvciAoY29uc3Qgb3JpZ0V2ZW50IGluIG1hcCkge1xyXG4gICAgZXZlbnRNYXBbb3JpZ0V2ZW50XSA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgY29uc3QgZWwgPSBldnQudGFyZ2V0XHJcbiAgICAgIGRpc3BhdGNoTmF0aXZlRXZlbnQoZWwsIG1hcFtvcmlnRXZlbnRdKVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZXZlbnRNYXBcclxufVxyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmV4cG9ydCAqIGZyb20gJy4vc3R5bGUnXHJcbmV4cG9ydCAqIGZyb20gJy4vbm9kZSdcclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIGdldFRocm90dGxlTGF6eWxvYWQsXHJcbiAgd2F0Y2hBcHBlYXIsXHJcbiAgZGVib3VuY2VcclxufSBmcm9tICcuLi91dGlscydcclxuXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5jb25zdCBzY3JvbGxhYmxlVHlwZXMgPSBjb25maWcuc2Nyb2xsYWJsZVR5cGVzXHJcblxyXG5sZXQgbGF6eWxvYWRXYXRjaGVkID0gZmFsc2VcclxuZnVuY3Rpb24gd2F0Y2hMYXp5bG9hZCAoKSB7XHJcbiAgbGF6eWxvYWRXYXRjaGVkID0gdHJ1ZVxyXG4gIDsgW1xyXG4gICAgJ3Njcm9sbCcsXHJcbiAgICAvLyAndHJhbnNpdGlvbmVuZCcsXHJcbiAgICAvLyAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXHJcbiAgICAvLyAnYW5pbWF0aW9uZW5kJyxcclxuICAgIC8vICd3ZWJraXRBbmltYXRpb25FbmQnLFxyXG4gICAgJ3Jlc2l6ZSdcclxuICBdLmZvckVhY2goZXZ0ID0+IHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2dCwgZ2V0VGhyb3R0bGVMYXp5bG9hZCgyNSwgZG9jdW1lbnQuYm9keSkpXHJcbiAgfSlcclxuICAvKipcclxuICAgKiBJbiBjYXNlIHRoZSB1c2VycyB1c2UgdGhlIGJvZHkncyBvdmVyZmxvdyB0byBzY3JvbGwuIFRoZW4gdGhlIHNjcm9sbFxyXG4gICAqIGV2ZW50IHdvdWxkIG5vdCBiZSB0cmlnZ2VyZWQgb24gdGhlIHdpbmRvdyBvYmplY3QgYnV0IG9uIHRoZSBib2R5LlxyXG4gICAqL1xyXG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZ2V0VGhyb3R0bGVMYXp5bG9hZCgyNSwgZG9jdW1lbnQuYm9keSkpXHJcbn1cclxuXHJcbmxldCBpZENudCA9IDBcclxubGV0IGFwcGVhcldhdGNoZWQgPSBmYWxzZVxyXG5cclxuLyoqXHJcbiAqIGR1cmluZyB1cGRhdGluZywgdGhlIGFwcGVhciB3YXRjaGVyIGJpbmRpbmcgb24gdGhlIGFwcGVhcldhdGNoZWQgY29udGV4dFxyXG4gKiBzaG91bGQgYmUgdHJpZ2dlcmVkIHdpdGhpbiBhIGRlYm91bmNlZCB3cmFwcGVyLlxyXG4gKiBJZiB0aGUgdXBkYXRpbmcgaW50ZXJ2YWwgaXMgc2hvcnRlciB0aGVuIDUwIG1zLCB0aGVuIHRoZSBhcHBlYXIgZXZlbnRzIHdpbGxcclxuICogaWdub3JlIHRoZSBjaGFuZ2UgaW4gdGhlIHByZXZpb3VzIDUwIG1zIGR1ZSB0byB0aGUgZGVib3VuY2Ugd3JhcHBlci5cclxuICovXHJcbmNvbnN0IGRlYm91bmNlZFdhdGNoQXBwZWFyID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xyXG4gIHdhdGNoQXBwZWFyKGFwcGVhcldhdGNoZWQsIHRydWUpXHJcbn0sIDUwKVxyXG5cclxuLyoqXHJcbiAqIGlmIGl0J3MgYSBzY3JvbGxhYmxlIHRhZywgdGhlbiB3YXRjaCBhcHBlYXIgZXZlbnRzIGZvciBpdC5cclxuICovXHJcbmZ1bmN0aW9uIHdhdGNoQXBwZWFyRm9yU2Nyb2xsYWJsZXMgKHRhZ05hbWUsIGNvbnRleHQpIHtcclxuICAvLyB3aGVuIHRoaXMgaXMgYSBzY3JvbGxlci9saXN0L3dhdGVyZmFsbFxyXG4gIGlmIChzY3JvbGxhYmxlVHlwZXMuaW5kZXhPZih0YWdOYW1lKSA+IC0xKSB7XHJcbiAgICBjb25zdCBzZCA9IGNvbnRleHQuc2Nyb2xsRGlyZWN0aW9uXHJcbiAgICBpZiAoIXNkIHx8IHNkICE9PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgYXBwZWFyV2F0Y2hlZCA9IGNvbnRleHRcclxuICAgICAgd2F0Y2hBcHBlYXIoY29udGV4dCwgdHJ1ZSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBiZWZvcmVDcmVhdGUgKCkge1xyXG4gICAgaWYgKCFsYXp5bG9hZFdhdGNoZWQpIHtcclxuICAgICAgd2F0Y2hMYXp5bG9hZCgpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlZCAoKSB7XHJcbiAgICBjb25zdCBlbCA9IHRoaXMuJGVsXHJcbiAgICBpZiAoIWVsIHx8IGVsLm5vZGVUeXBlICE9PSAxKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3Jvb3RJZCkge1xyXG4gICAgICBpZiAoZWwuY2xhc3NOYW1lLmluZGV4T2YoJ3dlZXgtcm9vdCcpIDw9IC0xKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnd2VleC1yb290JylcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd3ZWV4LWN0JylcclxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtd3gtcm9vdC1pZCcsIHRoaXMuX3Jvb3RJZClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRhZ05hbWUgPSB0aGlzLiRvcHRpb25zICYmIHRoaXMuJG9wdGlvbnMuX2NvbXBvbmVudFRhZ1xyXG4gICAgY29uc3QgbWV0YVVwID0gd2VleC5fbWV0YS51cGRhdGVkXHJcbiAgICBpZiAoIW1ldGFVcFt0YWdOYW1lXSkge1xyXG4gICAgICBtZXRhVXBbdGFnTmFtZV0gPSAwXHJcbiAgICB9XHJcbiAgICBtZXRhVXBbdGFnTmFtZV0rK1xyXG4gICAgLy8gd2lsbCBjaGVjayBhcHBlYXJpbmcgd2hlbiBubyBvdGhlciBjaGFuZ2VzIGluIGxhdGVzdCA1MG1zLlxyXG4gICAgZGVib3VuY2VkV2F0Y2hBcHBlYXIoKVxyXG4gICAgLyoqXHJcbiAgICAgKiBzaW5jZSB0aGUgdXBkYXRpbmcgb2YgY29tcG9uZW50IG1heSBhZmZlY3QgdGhlIGxheW91dCwgdGhlIGxhenlsb2FkaW5nIHNob3VsZFxyXG4gICAgICogYmUgZmlyZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX2ZpcmVMYXp5bG9hZCgpXHJcbiAgfSxcclxuXHJcbiAgbW91bnRlZCAoKSB7XHJcbiAgICBjb25zdCB0YWdOYW1lID0gdGhpcy4kb3B0aW9ucyAmJiB0aGlzLiRvcHRpb25zLl9jb21wb25lbnRUYWdcclxuICAgIGNvbnN0IGVsID0gdGhpcy4kZWxcclxuICAgIGlmICghZWwgfHwgZWwubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHdlZXguX2NvbXBvbmVudHNbdGFnTmFtZV0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHdlZXguX2NvbXBvbmVudHNbdGFnTmFtZV0rK1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWV0YU10ID0gd2VleC5fbWV0YS5tb3VudGVkXHJcbiAgICBpZiAoIW1ldGFNdFt0YWdOYW1lXSkge1xyXG4gICAgICBtZXRhTXRbdGFnTmFtZV0gPSAwXHJcbiAgICB9XHJcbiAgICBtZXRhTXRbdGFnTmFtZV0rK1xyXG5cclxuICAgIHdhdGNoQXBwZWFyRm9yU2Nyb2xsYWJsZXModGFnTmFtZSwgdGhpcylcclxuXHJcbiAgICAvLyB3aGVuIHRoaXMgaXMgdGhlIHJvb3QgZWxlbWVudCBvZiBWdWUgaW5zdGFuY2UuXHJcbiAgICBpZiAodGhpcyA9PT0gdGhpcy4kcm9vdCkge1xyXG4gICAgICBjb25zdCByb290SWQgPSBgd3gtcm9vdC0ke2lkQ250Kyt9YFxyXG4gICAgICBpZiAoIXdlZXguX3Jvb3QpIHtcclxuICAgICAgICB3ZWV4Ll9yb290ID0ge31cclxuICAgICAgfVxyXG4gICAgICB3ZWV4Ll9yb290W3Jvb3RJZF0gPSB0aGlzXHJcbiAgICAgIHRoaXMuX3Jvb3RJZCA9IHJvb3RJZFxyXG4gICAgICBpZiAoZWwubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCd3ZWV4LXJvb3QnKVxyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCd3ZWV4LWN0JylcclxuICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXd4LXJvb3QtaWQnLCByb290SWQpXHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogdGhlcmUncyBubyBzY3JvbGxhYmxlIGNvbXBvbmVudCBpbiB0aGlzIHBhZ2UuIFRoYXQgaXMgdG8gc2F5LFxyXG4gICAgICAgKiB0aGUgcGFnZSBpcyB1c2luZyBib2R5IHNjcm9sbGluZyBpbnN0ZWFkIG9mIHNjcm9sbGFiZSBjb21wb25lbnRzLlxyXG4gICAgICAgKiBUaGVuIHRoZSBhcHBlYXIgd2F0Y2hlciBzaG91bGQgYmUgYXR0YWNoZWQgb24gdGhlIGJvZHkuXHJcbiAgICAgICAqL1xyXG4gICAgICBpZiAoIWFwcGVhcldhdGNoZWQpIHtcclxuICAgICAgICBhcHBlYXJXYXRjaGVkID0gdGhpc1xyXG4gICAgICAgIHdhdGNoQXBwZWFyKHRoaXMsIHRydWUpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX2ZpcmVMYXp5bG9hZChlbClcclxuICAgIH1cclxuXHJcbiAgICAvLyBnaXZlIHdhcm5pbmcgZm9yIG5vdCB1c2luZyAkcHJvY2Vzc1N0eWxlIGluIHZ1ZS1sb2FkZXIgY29uZmlnLlxyXG4gICAgLy8gaWYgKCF3YXJuZWQgJiYgIXdpbmRvdy5fc3R5bGVfcHJvY2Vzc2luZ19hZGRlZCkge1xyXG4gICAgLy8gICB3YXJuUHJvY2Vzc1N0eWxlKClcclxuICAgIC8vIH1cclxuICB9LFxyXG5cclxuICBkZXN0cm95ZWQgKCkge1xyXG4gICAgY29uc3QgZWwgPSB0aGlzLiRlbFxyXG4gICAgaWYgKCFlbCB8fCBlbC5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogaWYgdGhlIGRlc3Ryb3llZCBlbGVtZW50IGlzIGFib3ZlIGFub3RoZXIgcGFuZWwgd2l0aCBpbWFnZXMgaW5zaWRlLCBhbmQgdGhlIGltYWdlc1xyXG4gICAgICogbW92ZWQgaW50byB0aGUgdmlld3BvcnQsIHRoZW4gdGhlIGxhenlsb2FkaW5nIHNob3VsZCBiZSB0cmlnZ2VyZWQuXHJcbiAgICAgKi9cclxuICAgIGlmICh0aGlzLl9yb290SWQpIHtcclxuICAgICAgZGVsZXRlIHdlZXguX3Jvb3RbdGhpcy5fcm9vdElkXVxyXG4gICAgICBkZWxldGUgdGhpcy5fcm9vdElkXHJcbiAgICB9XHJcbiAgICBjb25zdCB0YWdOYW1lID0gdGhpcy4kb3B0aW9ucyAmJiB0aGlzLiRvcHRpb25zLl9jb21wb25lbnRUYWdcclxuICAgIGlmICh0eXBlb2Ygd2VleC5fY29tcG9uZW50c1t0YWdOYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgd2VleC5fY29tcG9uZW50c1t0YWdOYW1lXS0tXHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXRhRHMgPSB3ZWV4Ll9tZXRhLmRlc3Ryb3llZFxyXG4gICAgaWYgKCFtZXRhRHNbdGFnTmFtZV0pIHtcclxuICAgICAgbWV0YURzW3RhZ05hbWVdID0gMFxyXG4gICAgfVxyXG4gICAgbWV0YURzW3RhZ05hbWVdKytcclxuICAgIHRoaXMuX2ZpcmVMYXp5bG9hZCgpXHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczoge1xyXG4gICAgX2ZpcmVMYXp5bG9hZCAoZWwpIHtcclxuICAgICAgZ2V0VGhyb3R0bGVMYXp5bG9hZCgyNSwgZWwgfHwgZG9jdW1lbnQuYm9keSkoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBpbnNpZGVBIH0gZnJvbSAnLi4vdXRpbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbWV0aG9kczoge1xyXG4gICAgLy8gZGVwcmVjYXRlZC5cclxuICAgICRzdG9wT3V0dGVyQSAoZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy4kc3RvcE91dGVyQShlKVxyXG4gICAgfSxcclxuXHJcbiAgICAkc3RvcE91dGVyQSAoZSkge1xyXG4gICAgICBpZiAoZSAmJiBlLnByZXZlbnREZWZhdWx0ICYmIGUudGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKGluc2lkZUEoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgJHN0b3BQcm9wYWdhdGlvbiAoZSkge1xyXG4gICAgICBpZiAoZSAmJiBlLnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgeyBnZXRUcmFuc2Zvcm1lciB9IGZyb20gJ3d4di10cmFuc2Zvcm1lcidcclxuaW1wb3J0IHsgaXNBcnJheSwgaXNQbGFpbk9iamVjdCB9IGZyb20gJy4uL3V0aWxzJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuY29uc3QgeyBiaW5kaW5nU3R5bGVOYW1lc0ZvclB4MlJlbSB9ID0gY29uZmlnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbWV0aG9kczoge1xyXG4gICAgX3B4MnJlbSAodmFsdWUsIHJvb3RWYWx1ZSkge1xyXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiAodmFsdWUgKyAnJykucmVwbGFjZSgvWystXT9cXGQrKD86LlxcZCopP1twd114L2dpLCBmdW5jdGlvbiAoJDApIHtcclxuICAgICAgICAgIHJldHVybiB3ZWV4LnV0aWxzLnB4MnJlbSgkMCwgcm9vdFZhbHVlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByZXR1cm4gd2VleC51dGlscy5weDJyZW0odmFsdWUgKyAnJywgcm9vdFZhbHVlKVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgayBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrKVxyXG4gICAgICAgICAgICAmJiBiaW5kaW5nU3R5bGVOYW1lc0ZvclB4MlJlbS5pbmRleE9mKGspID4gLTFcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB2YWx1ZVtrXSA9IHdlZXgudXRpbHMucHgycmVtKHZhbHVlW2tdICsgJycsIHJvb3RWYWx1ZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuX3B4MnJlbSh2YWx1ZVtpXSwgcm9vdFZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfcHJvY2Vzc0V4Y2x1c2l2ZVN0eWxlIChzdHlsZU9iaiwgcm9vdFZhbHVlLCB0YWdOYW1lKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gZ2V0VHJhbnNmb3JtZXIodGFnTmFtZSlcclxuICAgICAgcmV0dXJuIHRoaXMuX3B4MnJlbShcclxuICAgICAgICB0cmFuc2Zvcm1lci50cmFuc2Zvcm0oc3R5bGVPYmopLFxyXG4gICAgICAgIHJvb3RWYWx1ZVxyXG4gICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRQYXJlbnRSZWN0ICgpIHtcclxuICAgICAgY29uc3QgZWwgPSB0aGlzLiRlbFxyXG4gICAgICBjb25zdCBwYXJlbnQgPSBlbCAmJiBlbC5wYXJlbnRFbGVtZW50XHJcbiAgICAgIHJldHVybiBwYXJlbnQgJiYgcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vIGlucHV0IGFuZCB0ZXh0YXJlIGhhcyBzb21lIGNvbW1vbiBhcGkgYW5kIGV2ZW50XHJcbmltcG9ydCB7IGV4dGVuZCwgZGlzcGF0Y2hOYXRpdmVFdmVudCB9IGZyb20gJy4uL3V0aWxzJ1xyXG5cclxuY29uc3QgZmluZEVudGVyS2V5VHlwZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICBjb25zdCBrZXlzID0gWydkZWZhdWx0JywgJ2dvJywgJ25leHQnLCAnc2VhcmNoJywgJ3NlbmQnXVxyXG4gIGlmIChrZXlzLmluZGV4T2Yoa2V5KSA+IC0xKSB7XHJcbiAgICByZXR1cm4ga2V5XHJcbiAgfVxyXG4gIHJldHVybiAnZG9uZSdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG1ldGhvZHM6IHtcclxuICAgIGZvY3VzICgpIHtcclxuICAgICAgdGhpcy4kZWwgJiYgdGhpcy4kZWwuZm9jdXMoKVxyXG4gICAgfSxcclxuICAgIGJsdXIgKCkge1xyXG4gICAgICB0aGlzLiRlbCAmJiB0aGlzLiRlbC5ibHVyKClcclxuICAgIH0sXHJcblxyXG4gICAgc2V0U2VsZWN0aW9uUmFuZ2UgKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLiRlbC5zZXRTZWxlY3Rpb25SYW5nZShzdGFydCwgZW5kKVxyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFt2dWUtcmVuZGVyXSBzZXRTZWxlY3Rpb25SYW5nZSBpcyBub3Qgc3VwcG9ydGVkLmApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFNlbGVjdGlvblJhbmdlIChjYWxsYmFjaykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxyXG4gICAgICAgIGNvbnN0IHN0ciA9IHNlbGVjdGlvbi50b1N0cmluZygpXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLiRlbC52YWx1ZS5pbmRleE9mKHN0cilcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25TdGFydCA9PT0gLTEgPyBzZWxlY3Rpb25TdGFydCA6IHNlbGVjdGlvblN0YXJ0ICsgc3RyLmxlbmd0aFxyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHtcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG5ldyBFcnJvcignW3Z1ZS1yZW5kZXJdIGdldFNlbGVjdGlvbiBpcyBub3Qgc3VwcG9ydGVkLicpKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEVkaXRTZWxlY3Rpb25SYW5nZSAoY2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5nZXRTZWxlY3Rpb25SYW5nZShjYWxsYmFjaylcclxuICAgIH0sXHJcblxyXG4gICAgLy8gc3VwcG9ydCBlbnRlciBrZXkgZXZlbnRcclxuICAgIGNyZWF0ZUtleWJvYXJkRXZlbnQgKGV2ZW50cykge1xyXG4gICAgICBjb25zdCBjdXN0b21LZXlUeXBlID0gdGhpcy5yZXR1cm5LZXlUeXBlXHJcbiAgICAgIGlmIChjdXN0b21LZXlUeXBlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5Ym9hcmRFdmVudHMgPSB7XHJcbiAgICAgICAgICAna2V5dXAnOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgY29uc3QgY29kZSA9IGV2LmtleUNvZGVcclxuICAgICAgICAgICAgbGV0IGtleSA9IGV2LmtleVxyXG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICBpZiAoIWtleSB8fCBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ3RhYicpIHtcclxuICAgICAgICAgICAgICAgIGtleSA9ICduZXh0J1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBkaXNwYXRjaE5hdGl2ZUV2ZW50KGV2LnRhcmdldCwgJ3JldHVybicsIHtcclxuICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgIHJldHVybktleVR5cGU6IGZpbmRFbnRlcktleVR5cGUoY3VzdG9tS2V5VHlwZSksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZXYudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBldmVudHMgPSBleHRlbmQoZXZlbnRzLCBrZXlib2FyZEV2ZW50cylcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZXZlbnRzXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBnZXRQYXJlbnRTY3JvbGxlclxyXG59IGZyb20gJy4uL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGRlc3Ryb3llZCAoKSB7XHJcbiAgICBpZiAoIXRoaXMuX3N0aWNreUFkZGVkKSB7IHJldHVybiB9XHJcbiAgICBjb25zdCBzY3JvbGxlciA9IGdldFBhcmVudFNjcm9sbGVyKHRoaXMpXHJcbiAgICBpZiAoIXNjcm9sbGVyKSB7IHJldHVybiB9XHJcbiAgICBkZWxldGUgc2Nyb2xsZXIuX3N0aWNreUNoaWxkcmVuW3RoaXMuX3VpZF1cclxuICB9LFxyXG5cclxuICBtZXRob2RzOiB7XHJcbiAgICBfYWRkU3RpY2t5ICgpIHtcclxuICAgICAgY29uc3QgZWwgPSB0aGlzLiRlbFxyXG4gICAgICBpZiAoIWVsIHx8IGVsLm5vZGVUeXBlID09PSAxKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBbdnVlLXJlbmRlcl0gJGVsIGRvZXNuJ3QgZXhpc3QgdG8gYWRkIHN0aWNreS5gKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzdGlja3knKVxyXG4gICAgICBpZiAoIXRoaXMuX3BsYWNlaG9sZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSBlbC5jbG9uZU5vZGUodHJ1ZSlcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS53aWR0aCA9IHRoaXMuJGVsLm9mZnNldFdpZHRoICsgJ3B4J1xyXG4gICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLiRlbC5vZmZzZXRIZWlnaHQgKyAncHgnXHJcbiAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuX3BsYWNlaG9sZGVyLCB0aGlzLiRlbClcclxuICAgIH0sXHJcblxyXG4gICAgX3JlbW92ZVN0aWNreSAoKSB7XHJcbiAgICAgIGNvbnN0IGVsID0gdGhpcy4kZWxcclxuICAgICAgaWYgKCFlbCB8fCBlbC5ub2RlVHlwZSA9PT0gMSkge1xyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgW3Z1ZS1yZW5kZXJdICRlbCBkb2Vzbid0IGV4aXN0IHRvIHJlbW92ZSBzdGlja3kuYClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc3RpY2t5JylcclxuICAgICAgaWYgKHRoaXMuX3BsYWNlaG9sZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9wbGFjZWhvbGRlcilcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IG51bGxcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5pbXBvcnQgYmFzZSBmcm9tICcuL2Jhc2UnXHJcbmltcG9ydCBldmVudCBmcm9tICcuL2V2ZW50J1xyXG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9zdHlsZSdcclxuaW1wb3J0IGlucHV0Q29tbW9uIGZyb20gJy4vaW5wdXQtY29tbW9uJ1xyXG5pbXBvcnQgc3RpY2t5IGZyb20gJy4vc3RpY2t5J1xyXG5cclxuZXhwb3J0IHtcclxuICBiYXNlLFxyXG4gIGV2ZW50LFxyXG4gIHN0eWxlLFxyXG4gIGlucHV0Q29tbW9uLFxyXG4gIHN0aWNreVxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuaW1wb3J0IHdlZXggZnJvbSAnLi9pbnN0YW5jZSdcclxuaW1wb3J0ICogYXMgY29yZSBmcm9tICcuLi9jb3JlJ1xyXG5cclxuaW1wb3J0IHsgaW5wdXRDb21tb24gfSBmcm9tICcuLi9taXhpbnMnXHJcblxyXG53aW5kb3cuZ2xvYmFsID0gd2luZG93XHJcbndpbmRvdy53ZWV4ID0gd2VleFxyXG5cclxud2VleC5fc3R5bGVNYXAgPSB7fVxyXG5cclxuOyBbJ2dldENvbXBvbmVudElubGluZVN0eWxlJyxcclxuICAnZXh0cmFjdENvbXBvbmVudFN0eWxlJyxcclxuICAnbWFwTmF0aXZlRXZlbnRzJyxcclxuICAndHJpbVRleHRWTm9kZXMnXVxyXG4gIC5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAgIHdlZXhbbWV0aG9kXSA9IGNvcmVbbWV0aG9kXS5iaW5kKHdlZXgpXHJcbiAgfSlcclxuXHJcbndlZXgubWl4aW5zID0ge1xyXG4gIGlucHV0Q29tbW9uXHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIHRyYW5zZm9ybVJlbmRlclxyXG59IGZyb20gJy4uL2NvcmUvbm9kZSdcclxuaW1wb3J0IHsgaXNEZWYgfSBmcm9tICcuLi91dGlscydcclxuXHJcbmxldCBfaW5pdGVkID0gZmFsc2VcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0ICh3ZWV4KSB7XHJcbiAgICBpZiAoX2luaXRlZCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIF9pbml0ZWQgPSB0cnVlXHJcbiAgICBjb25zdCBWdWUgPSB3ZWV4Ll9fdnVlX19cclxuICAgIGNvbnN0IF9yZW5kZXIgPSBWdWUucHJvdG90eXBlLl9yZW5kZXJcclxuICAgIFZ1ZS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHdlZXhSZW5kZXIgPSB0aGlzLl93ZWV4UmVuZGVyXHJcbiAgICAgIGNvbnN0IHRhZyA9IHRoaXMuJG9wdGlvbnMgJiYgdGhpcy4kb3B0aW9ucy5fY29tcG9uZW50VGFnXHJcbiAgICAgIGlmIChcclxuICAgICAgICAhd2VleFJlbmRlclxyXG4gICAgICAgICYmICFpc0RlZih3ZWV4Ll9jb21wb25lbnRzW3RhZ10pXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNvbnN0IG9yaWdSZW5kZXIgPSB0aGlzLiRvcHRpb25zLnJlbmRlclxyXG4gICAgICAgIHdlZXhSZW5kZXIgPSB0aGlzLl93ZWV4UmVuZGVyID0gZnVuY3Rpb24gKGgsIC4uLmFyZ3MpIHtcclxuICAgICAgICAgIHJldHVybiBvcmlnUmVuZGVyLmNhbGwodGhpcywgdHJhbnNmb3JtUmVuZGVyKHRoaXMsIGgpLCAuLi5hcmdzKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRvcHRpb25zLnJlbmRlciA9IHdlZXhSZW5kZXJcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gX3JlbmRlci5jYWxsKHRoaXMpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuaW1wb3J0ICcuLi9zdHlsZXMvcmVzZXQuY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9iYXNlLmNzcydcclxuXHJcbmltcG9ydCAnY29yZS1qcy9mbi9hcnJheS9mcm9tJ1xyXG5pbXBvcnQgJ2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbidcclxuaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mJ1xyXG5pbXBvcnQgJ2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZydcclxuaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcidcclxuaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZSdcclxuaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvZXM2LnByb21pc2UnXHJcblxyXG5pbXBvcnQgJy4uL2xpYi9nZXN0dXJlJ1xyXG5pbXBvcnQgJy4vZ2xvYmFsJ1xyXG5pbXBvcnQgcmVuZGVyRnVuY3Rpb25QbHVnaW4gZnJvbSAnLi9yZW5kZXItZnVuY3Rpb24nXHJcblxyXG5pZiAoZ2xvYmFsLlZ1ZSkge1xyXG4gIHNldFZ1ZShnbG9iYWwuVnVlKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VnVlICh2dWUpIHtcclxuICBpZiAoIXZ1ZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdbVnVlIFJlbmRlcl0gVnVlIG5vdCBmb3VuZC4gUGxlYXNlIG1ha2Ugc3VyZSB2dWUgMi54IHJ1bnRpbWUgaXMgaW1wb3J0ZWQuJylcclxuICB9XHJcbiAgaWYgKGdsb2JhbC53ZWV4Ll9fdnVlX18pIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBnbG9iYWwud2VleC5fX3Z1ZV9fID0gdnVlXHJcbiAgd2VleC5pbnN0YWxsKHJlbmRlckZ1bmN0aW9uUGx1Z2luKVxyXG4gIGNvbnNvbGUubG9nKGBbVnVlIFJlbmRlcl0gaW5zdGFsbCBWdWUgJHt2dWUudmVyc2lvbn0uYClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VleFxyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmltcG9ydCB3ZWV4IGZyb20gJy4vd2VleCdcclxuaW1wb3J0IHsgc2V0VnVlIH0gZnJvbSAnLi93ZWV4J1xyXG5pbXBvcnQgeyBiYXNlLCBldmVudCwgc3R5bGUsIHN0aWNreSB9IGZyb20gJy4vbWl4aW5zJ1xyXG5cclxuLyoqXHJcbiAqIGluaXQgd2VleC5cclxuICogQHBhcmFtICB7VnVlJDJ9IFZ1ZTogVnVlIENvbnN0cnVjdG9yLlxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IG9wdGlvbnM6IGV4dGVuZCB3ZWV4IHBsdWdpbnMuXHJcbiAqICAgICAgICAgLSBjb21wb25lbnRzLlxyXG4gKiAgICAgICAgIC0gbW9kdWxlcy5cclxuICovXHJcbmxldCBfaW5pdGVkID0gZmFsc2VcclxuZnVuY3Rpb24gaW5pdCAoVnVlLyosIG9wdGlvbnMgPSB7fSovKSB7XHJcbiAgaWYgKF9pbml0ZWQpIHsgcmV0dXJuIH1cclxuICBfaW5pdGVkID0gdHJ1ZVxyXG5cclxuICBzZXRWdWUoVnVlKVxyXG5cclxuICBWdWUucHJvdG90eXBlLiRnZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLndhcm4oJ1tWdWUgUmVuZGVyXSBcInRoaXMuJGdldENvbmZpZ1wiIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgXCJ3ZWV4LmNvbmZpZ1wiIGluc3RlYWQuJylcclxuICAgIHJldHVybiB3ZWV4LmNvbmZpZ1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaHRtbFJlZ2V4ID0gL15odG1sOi9pXHJcbiAgVnVlLmNvbmZpZy5pc1Jlc2VydmVkVGFnID0gdGFnID0+IGh0bWxSZWdleC50ZXN0KHRhZylcclxuICBWdWUuY29uZmlnLnBhcnNlUGxhdGZvcm1UYWdOYW1lID0gdGFnID0+IHRhZy5yZXBsYWNlKGh0bWxSZWdleCwgJycpXHJcblxyXG4gIGZ1bmN0aW9uIGlzV2VleFRhZyAodGFnKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHdlZXguX2NvbXBvbmVudHNbdGFnXSAhPT0gJ3VuZGVmaW5lZCdcclxuICB9XHJcbiAgY29uc3Qgb2xkR2V0VGFnTmFtZXNwYWNlID0gVnVlLmNvbmZpZy5nZXRUYWdOYW1lc3BhY2VcclxuICBWdWUuY29uZmlnLmdldFRhZ05hbWVzcGFjZSA9IGZ1bmN0aW9uICh0YWcpIHtcclxuICAgIGlmIChpc1dlZXhUYWcodGFnKSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHJldHVybiBvbGRHZXRUYWdOYW1lc3BhY2UodGFnKVxyXG4gIH1cclxuXHJcbiAgVnVlLm1peGluKGJhc2UpXHJcbiAgVnVlLm1peGluKGV2ZW50KVxyXG4gIFZ1ZS5taXhpbihzdHlsZSlcclxuICBWdWUubWl4aW4oc3RpY2t5KVxyXG59XHJcblxyXG4vLyBhdXRvIGluaXQgaW4gZGlzdCBtb2RlLlxyXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlZ1ZSkge1xyXG4gIGluaXQod2luZG93LlZ1ZSlcclxufVxyXG5cclxud2VleC5pbml0ID0gaW5pdFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VleFxyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5jb25zdCBERUZBVUxUX09GRlNFVF9BQ0NVUkFDWSA9IDEwXHJcbmNvbnN0IERFRkFVTFRfTE9BRE1PUkVfT0ZGU0VUID0gMFxyXG5cclxuZnVuY3Rpb24gZ2V0VGhyb3R0bGVkU2Nyb2xsIChjb250ZXh0KSB7XHJcbiAgY29uc3Qgc2NhbGUgPSB3ZWV4LmNvbmZpZy5lbnYuc2NhbGVcclxuICBpZiAoIWNvbnRleHQuX3Rocm90dGxlU2Nyb2xsKSB7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gY29udGV4dC4kcmVmcy53cmFwcGVyXHJcbiAgICBjb25zdCBpbm5lciA9IGNvbnRleHQuJHJlZnMuaW5uZXJcclxuICAgIGxldCBwcmVPZmZzZXQgPSAoY29udGV4dC5zY3JvbGxEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICA/IHdyYXBwZXIuc2Nyb2xsTGVmdFxyXG4gICAgICA6IHdyYXBwZXIuc2Nyb2xsVG9wKVxyXG4gICAgICB8fCAwXHJcbiAgICBjb250ZXh0Ll90aHJvdHRsZVNjcm9sbCA9IHdlZXgudXRpbHMudGhyb3R0bGUoZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSBjb250ZXh0LnNjcm9sbERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnXHJcbiAgICAgICAgPyB3cmFwcGVyLnNjcm9sbExlZnRcclxuICAgICAgICA6IHdyYXBwZXIuc2Nyb2xsVG9wXHJcbiAgICAgIGNvbnN0IGluZGVudCA9IHBhcnNlSW50KGNvbnRleHQub2Zmc2V0QWNjdXJhY3kpICogc2NhbGVcclxuICAgICAgZnVuY3Rpb24gdHJpZ2dlclNjcm9sbCAoKSB7XHJcbiAgICAgICAgY29uc3QgcmVjdCA9IGlubmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgY29uc3QgZXZ0T2JqID0ge1xyXG4gICAgICAgICAgY29udGVudFNpemU6IHsgd2lkdGg6IHJlY3Qud2lkdGgsIGhlaWdodDogcmVjdC5oZWlnaHQgfSxcclxuICAgICAgICAgIGNvbnRlbnRPZmZzZXQ6IHtcclxuICAgICAgICAgICAgeDogd3JhcHBlci5zY3JvbGxMZWZ0LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogcG9zaXRpdmUgZGlyZWNpdG9uIGZvciB5LWF4aXMgaXMgZG93bi5cclxuICAgICAgICAgICAgICogc28gc2hvdWxkIHVzZSBuZWdhdGl2ZSBvcGVyYXRpb24gb24gc2Nyb2xsVG9wLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiAgKDAsMCktLS0tLS0tLS0tLS0tLS0+IHhcclxuICAgICAgICAgICAgICogICAgICAgfFxyXG4gICAgICAgICAgICAgKiAgICAgICB8XHJcbiAgICAgICAgICAgICAqICAgICAgIHxcclxuICAgICAgICAgICAgICogICAgICAgfFxyXG4gICAgICAgICAgICAgKiAgICAgICB2IHlcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHk6IC13cmFwcGVyLnNjcm9sbFRvcFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29udGV4dC4kZWwpIHtcclxuICAgICAgICAgIHdlZXgudXRpbHMuZGlzcGF0Y2hOYXRpdmVFdmVudChjb250ZXh0LiRlbCwgJ3dlZXgkc2Nyb2xsJywgZXZ0T2JqKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoTWF0aC5hYnMob2Zmc2V0IC0gcHJlT2Zmc2V0KSA+PSBpbmRlbnQpIHtcclxuICAgICAgICB0cmlnZ2VyU2Nyb2xsKClcclxuICAgICAgICBwcmVPZmZzZXQgPSBvZmZzZXRcclxuICAgICAgfVxyXG4gICAgfSwgMTYsIHRydWUpXHJcbiAgfVxyXG4gIHJldHVybiBjb250ZXh0Ll90aHJvdHRsZVNjcm9sbFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvcHM6IHtcclxuICAgIGxvYWRtb3Jlb2Zmc2V0OiB7XHJcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXHJcbiAgICAgIGRlZmF1bHQ6IERFRkFVTFRfTE9BRE1PUkVfT0ZGU0VULFxyXG4gICAgICB2YWxpZGF0b3IgKHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gcGFyc2VJbnQodmFsdWUpXHJcbiAgICAgICAgcmV0dXJuICFpc05hTih2YWwpICYmIHZhbCA+PSBERUZBVUxUX0xPQURNT1JFX09GRlNFVFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9mZnNldEFjY3VyYWN5OiB7XHJcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXHJcbiAgICAgIGRlZmF1bHQ6IERFRkFVTFRfT0ZGU0VUX0FDQ1VSQUNZLFxyXG4gICAgICB2YWxpZGF0b3IgKHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gcGFyc2VJbnQodmFsdWUpXHJcbiAgICAgICAgcmV0dXJuICFpc05hTih2YWwpICYmIHZhbCA+PSBERUZBVUxUX09GRlNFVF9BQ0NVUkFDWVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlZCAoKSB7XHJcbiAgICAvLyBzaG91bGQgY2FsbCByZXNldExvYWRtb3JlKCkgdG8gZW5hYmxlIGxvYWRtb3JlIGV2ZW50LlxyXG4gICAgdGhpcy5fbG9hZG1vcmVSZXNldCA9IHRydWVcclxuICB9LFxyXG5cclxuICBtb3VudGVkICgpIHtcclxuICAgIHRoaXMucmVsb2FkU3RpY2t5Q2hpbGRyZW4oKVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZWQgKCkge1xyXG4gICAgdGhpcy5yZWxvYWRTdGlja3lDaGlsZHJlbigpXHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczoge1xyXG4gICAgdXBkYXRlTGF5b3V0ICgpIHtcclxuICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuJHJlZnMud3JhcHBlclxyXG4gICAgICBpZiAod3JhcHBlcikge1xyXG4gICAgICAgIGNvbnN0IHJlY3QgPSB3cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgdGhpcy5fd3JhcHBlcldpZHRoID0gcmVjdC53aWR0aFxyXG4gICAgICAgIHRoaXMuX3dyYXBwZXJIZWlnaHQgPSByZWN0LmhlaWdodFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy4kcmVmcy5pbm5lclxyXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGlubmVyICYmIGlubmVyLmNoaWxkcmVuXHJcbiAgICAgIGlmIChpbm5lcikge1xyXG4gICAgICAgIGNvbnN0IHJlY3QgPSBpbm5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgIHRoaXMuX2lubmVyV2lkdGggPSByZWN0LndpZHRoXHJcbiAgICAgICAgdGhpcy5faW5uZXJIZWlnaHQgPSByZWN0LmhlaWdodFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGxvYWRpbmdFbCA9IHRoaXMuX2xvYWRpbmcgJiYgdGhpcy5fbG9hZGluZy4kZWxcclxuICAgICAgY29uc3QgcmVmcmVzaEVsID0gdGhpcy5fcmVmcmVzaCAmJiB0aGlzLl9yZWZyZXNoLiRlbFxyXG4gICAgICBpZiAobG9hZGluZ0VsKSB7XHJcbiAgICAgICAgdGhpcy5faW5uZXJIZWlnaHQgLT0gbG9hZGluZ0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZWZyZXNoRWwpIHtcclxuICAgICAgICB0aGlzLl9pbm5lckhlaWdodCAtPSByZWZyZXNoRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XHJcbiAgICAgIH1cclxuICAgICAgLy8gaW5uZXIgd2lkdGggaXMgYWx3YXlzIHRoZSB2aWV3cG9ydCB3aWR0aCBzb21laG93IGluIGhvcml6b250YWxcclxuICAgICAgLy8gc2NvbGxlciwgdGhlcmVmb3JlIHRoZSBpbm5lciB3aWR0aCBzaG91bGQgYmUgcmVjbGFjdWxhdGVkLlxyXG4gICAgICBpZiAodGhpcy5zY3JvbGxEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiBjaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMuX2lubmVyV2lkdGggPSB3ZWV4LnV0aWxzLmdldFJhbmdlV2lkdGgoaW5uZXIpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVzZXRMb2FkbW9yZSAoKSB7XHJcbiAgICAgIHRoaXMuX2xvYWRtb3JlUmVzZXQgPSB0cnVlXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvY2VzcyBzdGlja3kgY2hpbGRyZW4gaW4gc2Nyb2xsYWJsZSBjb21wb25lbnRzLlxyXG4gICAgICogY3VycmVudCBvbmx5IHN1cHBvcnQgbGlzdCBhbmQgdmVydGljYWwgc2Nyb2xsZXIuXHJcbiAgICAgKi9cclxuICAgIHByb2Nlc3NTdGlja3kgKCkge1xyXG4gICAgICAvKipcclxuICAgICAgICogY3VycmVudCBicm93c2VyIHN1cHBvcnQgJ3N0aWNreScgb3IgJy13ZWJraXQtc3RpY2t5Jywgc28gdGhlcmUncyBubyBuZWVkXHJcbiAgICAgICAqIHRvIGRvIGZ1cnRoZXIgbW9yZS5cclxuICAgICAgICovXHJcbiAgICAgIGNvbnN0IHN0aWNreUNoaWxkcmVuID0gdGhpcy5fc3RpY2t5Q2hpbGRyZW5cclxuICAgICAgY29uc3QgbGVuID0gc3RpY2t5Q2hpbGRyZW4gJiYgc3RpY2t5Q2hpbGRyZW4ubGVuZ3RoIHx8IDBcclxuICAgICAgaWYgKGxlbiA8PSAwKSB7IHJldHVybiB9XHJcblxyXG4gICAgICBjb25zdCBvcmlnU3RpY2t5ID0gd2VleC51dGlscy5zdXBwb3J0U3RpY2t5KClcclxuICAgICAgLy8gY3VycmVudCBvbmx5IHN1cHBvcnQgbGlzdCBhbmQgdmVydGljYWwgc2Nyb2xsZXIuXHJcbiAgICAgIGlmICh0aGlzLnNjcm9sbERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuJGVsXHJcbiAgICAgIGlmICghY29udGFpbmVyKSB7IHJldHVybiB9XHJcbiAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IGNvbnRhaW5lci5zY3JvbGxUb3BcclxuXHJcbiAgICAgIGxldCBzdGlja3lDaGlsZFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgc3RpY2t5Q2hpbGQgPSBzdGlja3lDaGlsZHJlbltpXVxyXG4gICAgICAgIGlmIChvcmlnU3RpY2t5KSB7XHJcbiAgICAgICAgICB0aGlzLmFkZFN0aWNreShzdGlja3lDaGlsZCwgb3JpZ1N0aWNreSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RpY2t5Q2hpbGQuX2luaXRPZmZzZXRUb3AgPCBzY3JvbGxUb3ApIHtcclxuICAgICAgICAgIHRoaXMuYWRkU3RpY2t5KHN0aWNreUNoaWxkKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmVtb3ZlU3RpY2t5KHN0aWNreUNoaWxkKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhZGRTdGlja3kgKGVsLCBzdXBwb3J0U3RpY2t5KSB7XHJcbiAgICAgIGlmIChzdXBwb3J0U3RpY2t5KSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnd2VleC1pb3Mtc3RpY2t5JylcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpZiAoZWwuX3N0aWNreSA9PT0gdHJ1ZSkgcmV0dXJuXHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBbdnVlLXJlbmRlcl0gaGVhZGVyIGFkZCBzdGlja3lgLCBlbClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWwuX3N0aWNreSA9IHRydWVcclxuICAgICAgICBpZiAoIWVsLl9wbGFjZWhvbGRlcikge1xyXG4gICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBlbC5jbG9uZU5vZGUodHJ1ZSlcclxuICAgICAgICAgIHBsYWNlaG9sZGVyLl9vcmlnTm9kZSA9IGVsXHJcbiAgICAgICAgICBwbGFjZWhvbGRlci5jbGFzc0xpc3QuYWRkKCd3ZWV4LXN0aWNreS1wbGFjZWhvbGRlcicpXHJcbiAgICAgICAgICBlbC5fcGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlclxyXG4gICAgICAgIH1cclxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbC5fcGxhY2Vob2xkZXIsIGVsKVxyXG4gICAgICAgIGVsLnN0eWxlLndpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLndpZHRoXHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnd2VleC1zdGlja3knKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZVN0aWNreSAoZWwpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiBlbC5fc3RpY2t5ID09PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgIHx8IGVsLl9zdGlja3kgPT09IGZhbHNlXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFt2dWUtcmVuZGVyXSBoZWFkZXIgcmVtb3ZlIHN0aWNreWAsIGVsKVxyXG4gICAgICB9XHJcbiAgICAgIGVsLl9zdGlja3kgPSBmYWxzZVxyXG4gICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsLl9wbGFjZWhvbGRlcilcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnd2VleC1zdGlja3knKVxyXG4gICAgfSxcclxuXHJcbiAgICByZWxvYWRTdGlja3lDaGlsZHJlbiAoKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuJGVsXHJcbiAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm5cclxuICAgICAgY29uc3Qgc3RpY2t5Q2hpbGRyZW4gPSBbXVxyXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbc3RpY2t5XScpXHJcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXVxyXG4gICAgICAgIGlmICgvd2VleC1zdGlja3ktcGxhY2Vob2xkZXIvLnRlc3QoY2hpbGQuY2xhc3NOYW1lKSkgeyAgLy8gaXMgYSBwbGFjZWhvbGRlci5cclxuICAgICAgICAgIGNvbnN0IG9yaWdOb2RlID0gY2hpbGQuX29yaWdOb2RlXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICFvcmlnTm9kZVxyXG4gICAgICAgICAgICB8fCAhb3JpZ05vZGUucGFyZW50Tm9kZVxyXG4gICAgICAgICAgICB8fCBvcmlnTm9kZS5wYXJlbnROb2RlICE9PSBjaGlsZC5wYXJlbnROb2RlXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY2hpbGQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjaGlsZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7ICAvLyBpcyBhIHN0aWNreSBub2RlLlxyXG4gICAgICAgICAgc3RpY2t5Q2hpbGRyZW4ucHVzaChjaGlsZClcclxuICAgICAgICAgIGlmICghY2hpbGQuX3N0aWNreSkge1xyXG4gICAgICAgICAgICBjaGlsZC5faW5pdE9mZnNldFRvcCA9IGNoaWxkLm9mZnNldFRvcFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9zdGlja3lDaGlsZHJlbiA9IHN0aWNreUNoaWxkcmVuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZVNjcm9sbCAoZXZlbnQpIHtcclxuICAgICAgd2VleC51dGlscy5nZXRUaHJvdHRsZUxhenlsb2FkKDI1LCB0aGlzLiRlbCwgJ3Njcm9sbCcpKClcclxuICAgICAgZ2V0VGhyb3R0bGVkU2Nyb2xsKHRoaXMpKGV2ZW50KVxyXG5cclxuICAgICAgdGhpcy5wcm9jZXNzU3RpY2t5KClcclxuXHJcbiAgICAgIC8vIGZpcmUgbG9hZG1vcmUgZXZlbnQuXHJcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy4kcmVmcy5pbm5lclxyXG4gICAgICBpZiAoaW5uZXIpIHtcclxuICAgICAgICBjb25zdCBpbm5lckxlbmd0aCA9IHRoaXMuc2Nyb2xsRGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICAgID8gdGhpcy5faW5uZXJXaWR0aFxyXG4gICAgICAgICAgOiB0aGlzLl9pbm5lckhlaWdodFxyXG4gICAgICAgIGlmICghdGhpcy5faW5uZXJMZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuX2lubmVyTGVuZ3RoID0gaW5uZXJMZW5ndGhcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2lubmVyTGVuZ3RoICE9PSBpbm5lckxlbmd0aCkge1xyXG4gICAgICAgICAgdGhpcy5faW5uZXJMZW5ndGggPSBpbm5lckxlbmd0aFxyXG4gICAgICAgICAgdGhpcy5fbG9hZG1vcmVSZXNldCA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvYWRtb3JlUmVzZXQgJiYgdGhpcy5yZWFjaEJvdHRvbSh0aGlzLmxvYWRtb3Jlb2Zmc2V0KSkge1xyXG4gICAgICAgICAgdGhpcy5fbG9hZG1vcmVSZXNldCA9IGZhbHNlXHJcbiAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuJGVsXHJcbiAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgd2VleC51dGlscy5kaXNwYXRjaE5hdGl2ZUV2ZW50KGVsLCAnbG9hZG1vcmUnKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZWFjaFRvcCAoKSB7XHJcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLiRyZWZzLndyYXBwZXJcclxuICAgICAgcmV0dXJuICghIXdyYXBwZXIpICYmICh3cmFwcGVyLnNjcm9sbFRvcCA8PSAwKVxyXG4gICAgfSxcclxuXHJcbiAgICByZWFjaEJvdHRvbSAob2Zmc2V0KSB7XHJcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLiRyZWZzLndyYXBwZXJcclxuICAgICAgY29uc3QgaW5uZXIgPSB0aGlzLiRyZWZzLmlubmVyXHJcbiAgICAgIG9mZnNldCA9IHBhcnNlSW50KG9mZnNldCB8fCAwKSAqIHdlZXguY29uZmlnLmVudi5zY2FsZVxyXG5cclxuICAgICAgaWYgKHdyYXBwZXIgJiYgaW5uZXIpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLnNjcm9sbERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnXHJcbiAgICAgICAgICA/ICd3aWR0aCdcclxuICAgICAgICAgIDogJ2hlaWdodCdcclxuICAgICAgICBjb25zdCBpbm5lckxlbmd0aCA9IHRoaXNbYF9pbm5lciR7a2V5WzBdLnRvVXBwZXJDYXNlKCl9JHtrZXkuc3Vic3RyKDEpfWBdXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlckxlbmd0aCA9IHRoaXNbYF93cmFwcGVyJHtrZXlbMF0udG9VcHBlckNhc2UoKX0ke2tleS5zdWJzdHIoMSl9YF1cclxuICAgICAgICBjb25zdCBzY3JvbGxPZmZzZXQgPSB0aGlzLnNjcm9sbERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnXHJcbiAgICAgICAgICA/IHdyYXBwZXIuc2Nyb2xsTGVmdFxyXG4gICAgICAgICAgOiB3cmFwcGVyLnNjcm9sbFRvcFxyXG4gICAgICAgIHJldHVybiBzY3JvbGxPZmZzZXQgPj0gaW5uZXJMZW5ndGggLSB3cmFwcGVyTGVuZ3RoIC0gb2Zmc2V0XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZVRvdWNoU3RhcnQgKGV2ZW50KSB7XHJcbiAgICAgIGlmICh0aGlzLl9sb2FkaW5nIHx8IHRoaXMuX3JlZnJlc2gpIHtcclxuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdXHJcbiAgICAgICAgdGhpcy5fdG91Y2hQYXJhbXMgPSB7XHJcbiAgICAgICAgICByZWFjaFRvcDogdGhpcy5yZWFjaFRvcCgpLFxyXG4gICAgICAgICAgcmVhY2hCb3R0b206IHRoaXMucmVhY2hCb3R0b20oKSxcclxuICAgICAgICAgIHN0YXJ0VG91Y2hFdmVudDogdG91Y2gsXHJcbiAgICAgICAgICBzdGFydFg6IHRvdWNoLnBhZ2VYLFxyXG4gICAgICAgICAgc3RhcnRZOiB0b3VjaC5wYWdlWSxcclxuICAgICAgICAgIHRpbWVTdGFtcDogZXZlbnQudGltZVN0YW1wXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcclxuICAgICAgaWYgKCF0aGlzLl90b3VjaFBhcmFtcyB8fCAhdGhpcy5fcmVmcmVzaCAmJiAhdGhpcy5fbG9hZGluZykge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy4kcmVmcy5pbm5lclxyXG4gICAgICBjb25zdCB7IHN0YXJ0WSwgcmVhY2hUb3AsIHJlYWNoQm90dG9tIH0gPSB0aGlzLl90b3VjaFBhcmFtc1xyXG4gICAgICBpZiAoaW5uZXIpIHtcclxuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdXHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IHRvdWNoLnBhZ2VZIC0gc3RhcnRZXHJcbiAgICAgICAgY29uc3QgZGlyID0gb2Zmc2V0WSA+IDAgPyAnZG93bicgOiAndXAnXHJcbiAgICAgICAgdGhpcy5fdG91Y2hQYXJhbXMub2Zmc2V0WSA9IG9mZnNldFlcclxuICAgICAgICBpZiAodGhpcy5fcmVmcmVzaCAmJiAoZGlyID09PSAnZG93bicpICYmIHJlYWNoVG9wKSB7XHJcbiAgICAgICAgICB0aGlzLl9yZWZyZXNoLnB1bGxpbmdEb3duKG9mZnNldFkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2xvYWRpbmcgJiYgKGRpciA9PT0gJ3VwJykgJiYgcmVhY2hCb3R0b20pIHtcclxuICAgICAgICAgIHRoaXMuX2xvYWRpbmcucHVsbGluZ1VwKC1vZmZzZXRZKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVUb3VjaEVuZCAoZXZlbnQpIHtcclxuICAgICAgaWYgKCF0aGlzLl90b3VjaFBhcmFtcyB8fCAhdGhpcy5fcmVmcmVzaCAmJiAhdGhpcy5fbG9hZGluZykge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy4kcmVmcy5pbm5lclxyXG4gICAgICBjb25zdCB7IHN0YXJ0WSwgcmVhY2hUb3AsIHJlYWNoQm90dG9tIH0gPSB0aGlzLl90b3VjaFBhcmFtc1xyXG4gICAgICBpZiAoaW5uZXIpIHtcclxuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdXHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IHRvdWNoLnBhZ2VZIC0gc3RhcnRZXHJcbiAgICAgICAgY29uc3QgZGlyID0gb2Zmc2V0WSA+IDAgPyAnZG93bicgOiAndXAnXHJcbiAgICAgICAgdGhpcy5fdG91Y2hQYXJhbXMub2Zmc2V0WSA9IG9mZnNldFlcclxuICAgICAgICBpZiAodGhpcy5fcmVmcmVzaCAmJiAoZGlyID09PSAnZG93bicpICYmIHJlYWNoVG9wKSB7XHJcbiAgICAgICAgICB0aGlzLl9yZWZyZXNoLnB1bGxpbmdFbmQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9sb2FkaW5nICYmIChkaXIgPT09ICd1cCcpICYmIHJlYWNoQm90dG9tKSB7XHJcbiAgICAgICAgICB0aGlzLl9sb2FkaW5nLnB1bGxpbmdFbmQoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBkZWxldGUgdGhpcy5fdG91Y2hQYXJhbXNcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHNjcm9sbGFibGUgZnJvbSAnLi9zY3JvbGxhYmxlJ1xyXG5cclxuZXhwb3J0IHtcclxuICBzY3JvbGxhYmxlXHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5pbXBvcnQgeyBzY3JvbGxhYmxlIH0gZnJvbSAnLi9taXhpbnMnXHJcblxyXG5mdW5jdGlvbiBnZXRMaXN0ICh3ZWV4KSB7XHJcbiAgY29uc3Qge1xyXG4gICAgZXh0cmFjdENvbXBvbmVudFN0eWxlXHJcbiAgfSA9IHdlZXhcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICd3ZWV4LWxpc3QnLFxyXG4gICAgbWl4aW5zOiBbc2Nyb2xsYWJsZV0sXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICB3cmFwcGVyQ2xhc3MgKCkge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzQXJyYXkgPSBbJ3dlZXgtbGlzdCcsICd3ZWV4LWxpc3Qtd3JhcHBlcicsICd3ZWV4LWN0J11cclxuICAgICAgICB0aGlzLl9yZWZyZXNoICYmIGNsYXNzQXJyYXkucHVzaCgnd2l0aC1yZWZyZXNoJylcclxuICAgICAgICB0aGlzLl9sb2FkaW5nICYmIGNsYXNzQXJyYXkucHVzaCgnd2l0aC1sb2FkaW5nJylcclxuICAgICAgICByZXR1cm4gY2xhc3NBcnJheS5qb2luKCcgJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGNyZWF0ZUNoaWxkcmVuIChoKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLiRzbG90cy5kZWZhdWx0IHx8IFtdXHJcbiAgICAgICAgdGhpcy5fY2VsbHMgPSBzbG90cy5maWx0ZXIodm5vZGUgPT4ge1xyXG4gICAgICAgICAgaWYgKCF2bm9kZS50YWcgJiYgIXZub2RlLmNvbXBvbmVudE9wdGlvbnMpIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBoKCdhcnRpY2xlJywge1xyXG4gICAgICAgICAgICByZWY6ICdpbm5lcicsXHJcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1saXN0LWlubmVyIHdlZXgtY3QnXHJcbiAgICAgICAgICB9LCB0aGlzLl9jZWxscylcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMud2VleFR5cGUgPSAnbGlzdCdcclxuXHJcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dCgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnbWFpbicsIHtcclxuICAgICAgICByZWY6ICd3cmFwcGVyJyxcclxuICAgICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ2xpc3QnIH0sXHJcbiAgICAgICAgc3RhdGljQ2xhc3M6IHRoaXMud3JhcHBlckNsYXNzLFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICBzY3JvbGw6IHRoaXMuaGFuZGxlU2Nyb2xsLFxyXG4gICAgICAgICAgdG91Y2hzdGFydDogdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxyXG4gICAgICAgICAgdG91Y2htb3ZlOiB0aGlzLmhhbmRsZVRvdWNoTW92ZSxcclxuICAgICAgICAgIHRvdWNoZW5kOiB0aGlzLmhhbmRsZVRvdWNoRW5kXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGF0aWNTdHlsZTogZXh0cmFjdENvbXBvbmVudFN0eWxlKHRoaXMpXHJcbiAgICAgIH0sIHRoaXMuY3JlYXRlQ2hpbGRyZW4oY3JlYXRlRWxlbWVudCkpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCAod2VleCkge1xyXG4gICAgd2VleC5yZWdpc3RlckNvbXBvbmVudCgnbGlzdCcsIGdldExpc3Qod2VleCkpXHJcbiAgfVxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IHNjcm9sbGFibGUgfSBmcm9tICcuL21peGlucydcclxuXHJcbmZ1bmN0aW9uIGdldFNjcm9sbGVyICh3ZWV4KSB7XHJcbiAgY29uc3Qge1xyXG4gICAgZXh0cmFjdENvbXBvbmVudFN0eWxlXHJcbiAgfSA9IHdlZXhcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICd3ZWV4LXNjcm9sbGVyJyxcclxuICAgIG1peGluczogW3Njcm9sbGFibGVdLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgc2Nyb2xsRGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdHlwZTogW1N0cmluZ10sXHJcbiAgICAgICAgZGVmYXVsdDogJ3ZlcnRpY2FsJyxcclxuICAgICAgICB2YWxpZGF0b3IgKHZhbHVlKSB7XHJcbiAgICAgICAgICByZXR1cm4gWydob3Jpem9udGFsJywgJ3ZlcnRpY2FsJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBzY3JvbGxhYmxlOiB7XHJcbiAgICAgICAgdHlwZTogW0Jvb2xlYW5dLFxyXG4gICAgICAgIGRlZmF1bHQ6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgIHdyYXBwZXJDbGFzcyAoKSB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NBcnJheSA9IFsnd2VleC1zY3JvbGxlcicsICd3ZWV4LXNjcm9sbGVyLXdyYXBwZXInLCAnd2VleC1jdCddXHJcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsRGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAgIGNsYXNzQXJyYXkucHVzaCgnd2VleC1zY3JvbGxlci1ob3Jpem9udGFsJylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBjbGFzc0FycmF5LnB1c2goJ3dlZXgtc2Nyb2xsZXItdmVydGljYWwnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsYWJsZSkge1xyXG4gICAgICAgICAgY2xhc3NBcnJheS5wdXNoKCd3ZWV4LXNjcm9sbGVyLWRpc2FibGVkJylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzQXJyYXkuam9pbignICcpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBjcmVhdGVDaGlsZHJlbiAoaCkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbXVxyXG4gICAgICAgIHRoaXMuX2NlbGxzID0gc2xvdHMuZmlsdGVyKHZub2RlID0+IHtcclxuICAgICAgICAgIGlmICghdm5vZGUudGFnICYmICF2bm9kZS5jb21wb25lbnRPcHRpb25zKSByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgaCgnYXJ0aWNsZScsIHtcclxuICAgICAgICAgICAgcmVmOiAnaW5uZXInLFxyXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogJ3dlZXgtc2Nyb2xsZXItaW5uZXIgd2VleC1jdCdcclxuICAgICAgICAgIH0sIHRoaXMuX2NlbGxzKVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy53ZWV4VHlwZSA9ICdzY3JvbGxlcidcclxuXHJcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAvLyAgIHZhbGlkYXRlU3R5bGVzKCdzY3JvbGxlcicsIHRoaXMuJHZub2RlLmRhdGEgJiYgdGhpcy4kdm5vZGUuZGF0YS5zdGF0aWNTdHlsZSlcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgdGhpcy5fY2VsbHMgPSB0aGlzLiRzbG90cy5kZWZhdWx0IHx8IFtdXHJcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dCgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnbWFpbicsIHtcclxuICAgICAgICByZWY6ICd3cmFwcGVyJyxcclxuICAgICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ3Njcm9sbGVyJyB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICBzY3JvbGw6IHRoaXMuaGFuZGxlU2Nyb2xsLFxyXG4gICAgICAgICAgdG91Y2hzdGFydDogdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxyXG4gICAgICAgICAgdG91Y2htb3ZlOiB0aGlzLmhhbmRsZVRvdWNoTW92ZSxcclxuICAgICAgICAgIHRvdWNoZW5kOiB0aGlzLmhhbmRsZVRvdWNoRW5kXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGF0aWNDbGFzczogdGhpcy53cmFwcGVyQ2xhc3MsXHJcbiAgICAgICAgc3RhdGljU3R5bGU6IGV4dHJhY3RDb21wb25lbnRTdHlsZSh0aGlzKVxyXG4gICAgICB9LCB0aGlzLmNyZWF0ZUNoaWxkcmVuKGNyZWF0ZUVsZW1lbnQpKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQgKHdlZXgpIHtcclxuICAgIHdlZXgucmVnaXN0ZXJDb21wb25lbnQoJ3Njcm9sbGVyJywgZ2V0U2Nyb2xsZXIod2VleCkpXHJcbiAgfVxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsICBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKipcclxuICogQGZpbGVvdmVydmlldyB3YXRlcmZhbGxcclxuICogTk9URTogb25seSBzdXBwb3J0IGZ1bGwgc2NyZWVuIHdpZHRoIHdhdGVyZmFsbC5cclxuICovXHJcblxyXG5pbXBvcnQgeyBzY3JvbGxhYmxlIH0gZnJvbSAnLi9taXhpbnMnXHJcblxyXG5jb25zdCBOT1JNQUxfR0FQX1NJWkUgPSAzMlxyXG5jb25zdCBERUZBVUxUX0NPTFVNTl9DT1VOVCA9IDFcclxuXHJcbmZ1bmN0aW9uIGdldFdhdGVyZmFsbCAod2VleCkge1xyXG4gIGNvbnN0IHtcclxuICAgIGV4dHJhY3RDb21wb25lbnRTdHlsZVxyXG4gIH0gPSB3ZWV4XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnd2VleC13YXRlcmZhbGwnLFxyXG4gICAgbWl4aW5zOiBbc2Nyb2xsYWJsZV0sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAvKipcclxuICAgICAgICogc3BlY2lmaWVkIGdhcCBzaXplLlxyXG4gICAgICAgKiB2YWx1ZSBjYW4gYmUgbnVtYmVyIG9yICdub3JtYWwnLiAnbm9ybWFsJyAoMzJweCkgYnkgZGVmYXVsdC5cclxuICAgICAgICovXHJcbiAgICAgIGNvbHVtbkdhcDoge1xyXG4gICAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXHJcbiAgICAgICAgZGVmYXVsdDogJ25vcm1hbCcsXHJcbiAgICAgICAgdmFsaWRhdG9yICh2YWwpIHtcclxuICAgICAgICAgIGlmICghdmFsIHx8IHZhbCA9PT0gJ25vcm1hbCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhbCA9IHBhcnNlSW50KHZhbClcclxuICAgICAgICAgIHJldHVybiAhaXNOYU4odmFsKSAmJiB2YWwgPiAwXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAvKipcclxuICAgICAgICogdGhlIG1heGltdW0gY29sdW1uIGNvdW50cy5cclxuICAgICAgICogdmFsdWUgY2FuIGJlIG51bWJlciBvciAnYXV0bycuIDEgYnkgZGVmYXVsdC5cclxuICAgICAgICovXHJcbiAgICAgIGNvbHVtbkNvdW50OiB7XHJcbiAgICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcclxuICAgICAgICBkZWZhdWx0OiBERUZBVUxUX0NPTFVNTl9DT1VOVCxcclxuICAgICAgICB2YWxpZGF0b3IgKHZhbCkge1xyXG4gICAgICAgICAgdmFsID0gcGFyc2VJbnQodmFsKVxyXG4gICAgICAgICAgcmV0dXJuICFpc05hTih2YWwpICYmIHZhbCA+IDBcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiB0aGUgbWltaW11bSBjb2x1bW4gd2lkdGguXHJcbiAgICAgICAqIHZhbHVlIGNhbiBiZSBudW1iZXIgb3IgJ2F1dG8nLiAnYXV0bycgYnkgZGVmYXVsdC5cclxuICAgICAgICovXHJcbiAgICAgIGNvbHVtbldpZHRoOiB7XHJcbiAgICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcclxuICAgICAgICBkZWZhdWx0OiAnYXV0bycsXHJcbiAgICAgICAgdmFsaWRhdG9yICh2YWwpIHtcclxuICAgICAgICAgIGlmICghdmFsIHx8IHZhbCA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YWwgPSBwYXJzZUludCh2YWwpXHJcbiAgICAgICAgICByZXR1cm4gIWlzTmFOKHZhbCkgJiYgdmFsID4gMFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5fbmV4dFRpY2soKVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVkICgpIHtcclxuICAgICAgdGhpcy4kbmV4dFRpY2sodGhpcy5fbmV4dFRpY2soKSlcclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBfY3JlYXRlQ2hpbGRyZW4gKGgsIHJvb3RTdHlsZSkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gKHRoaXMuJHNsb3RzLmRlZmF1bHQgfHwgW10pLnNsaWNlKClcclxuICAgICAgICB0aGlzLl9oZWFkZXJzID0gW11cclxuICAgICAgICB0aGlzLl9mb290ZXJzID0gW11cclxuICAgICAgICB0aGlzLl9vdGhlcnMgPSBbXVxyXG4gICAgICAgIGNvbnN0IGxlbiA9IHNsb3RzLmxlbmd0aFxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICBjb25zdCB2bm9kZSA9IHNsb3RzW2ldXHJcbiAgICAgICAgICBjb25zdCB0YWcgPVxyXG4gICAgICAgICAgICB2bm9kZS5jb21wb25lbnRPcHRpb25zXHJcbiAgICAgICAgICAgICYmIHZub2RlLmNvbXBvbmVudE9wdGlvbnMudGFnXHJcbiAgICAgICAgICAgIHx8IHZub2RlLnRhZ1xyXG4gICAgICAgICAgaWYgKHRhZyA9PT0gJ3JlZnJlc2gnIHx8IHRhZyA9PT0gJ2xvYWRpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGFnID09PSAnc2VjdGlvbicpIHsgIC8vIGNlbGxcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0YWcgPT09ICdoZWFkZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlYWRlcnMucHVzaCh2bm9kZSlcclxuICAgICAgICAgICAgc2xvdHNbaV0gPSBudWxsIC8vIHNob3VsZCBub3QgaW5jbHVkZWQgaW4gZm9vdGVyLlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICBjb25zdCB2bm9kZSA9IHNsb3RzW2ldXHJcbiAgICAgICAgICBpZiAoIXZub2RlKSB7IGNvbnRpbnVlIH0gIC8vIGFscmVhZHkgdGFrZW4gYnkgaGVhZGVyLlxyXG4gICAgICAgICAgY29uc3QgdGFnID1cclxuICAgICAgICAgICAgdm5vZGUuY29tcG9uZW50T3B0aW9uc1xyXG4gICAgICAgICAgICAmJiB2bm9kZS5jb21wb25lbnRPcHRpb25zLnRhZ1xyXG4gICAgICAgICAgICB8fCB2bm9kZS50YWdcclxuICAgICAgICAgIGlmICh0YWcgPT09ICdyZWZyZXNoJyB8fCB0YWcgPT09ICdsb2FkaW5nJykge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRhZyA9PT0gJ3NlY3Rpb24nKSB7IC8vIGNlbGxcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0YWcgPT09ICdoZWFkZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zvb3RlcnMucHVzaCh2bm9kZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NlbGxzID0gc2xvdHMuZmlsdGVyKHZub2RlID0+IHtcclxuICAgICAgICAgIGlmICghdm5vZGUpIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgY29uc3QgY21wT3B0cyA9IHZub2RlLmNvbXBvbmVudE9wdGlvbnNcclxuICAgICAgICAgIGlmICghdm5vZGUudGFnICYmICFjbXBPcHRzKSByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIGNvbnN0IHRhZyA9IGNtcE9wdHMgJiYgY21wT3B0cy50YWcgfHwgdm5vZGUudGFnXHJcbiAgICAgICAgICBpZiAodGFnID09PSAncmVmcmVzaCcgfHwgdGFnID09PSAnbG9hZGluZycpIHtcclxuICAgICAgICAgICAgdGhpc1tgXyR7dGFnfWBdID0gdm5vZGVcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGFnICE9PSAnc2VjdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3RoZXJzLnB1c2godm5vZGUpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLl9yZUNhbGMocm9vdFN0eWxlKVxyXG4gICAgICAgIHRoaXMuX2dlbkNvbHVtbnMoaClcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbXVxyXG4gICAgICAgIHRoaXMuX3JlZnJlc2ggJiYgY2hpbGRyZW4ucHVzaCh0aGlzLl9yZWZyZXNoKVxyXG4gICAgICAgIGNoaWxkcmVuID0gY2hpbGRyZW4uY29uY2F0KHRoaXMuX2hlYWRlcnMpXHJcbiAgICAgICAgLy8gLmNvbmNhdCh0aGlzLl9vdGhlcnMpXHJcbiAgICAgICAgY2hpbGRyZW4ucHVzaChoKCdodG1sOmRpdicsIHtcclxuICAgICAgICAgIHJlZjogJ2NvbHVtbnMnLFxyXG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LXdhdGVyZmFsbC1pbm5lci1jb2x1bW5zIHdlZXgtY3QnXHJcbiAgICAgICAgfSwgdGhpcy5fY29sdW1ucykpXHJcbiAgICAgICAgY2hpbGRyZW4ucHVzaChoKCdodG1sOmRpdicsIHtcclxuICAgICAgICAgIHJlZjogJ2Zvb3RlcnMnLFxyXG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LXdhdGVyZmFsbC1mb290ZXJzIHdlZXgtY3QnXHJcbiAgICAgICAgfSwgdGhpcy5fZm9vdGVycykpXHJcbiAgICAgICAgdGhpcy5fbG9hZGluZyAmJiBjaGlsZHJlbi5wdXNoKHRoaXMuX2xvYWRpbmcpXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIGgoJ2FydGljbGUnLCB7XHJcbiAgICAgICAgICAgIHJlZjogJ2lubmVyJyxcclxuICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LXdhdGVyZmFsbC1pbm5lciB3ZWV4LWN0J1xyXG4gICAgICAgICAgfSwgY2hpbGRyZW4pXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgX3JlQ2FsYyAocm9vdFN0eWxlKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTk9URTogY29sdW1uR2FwIGFuZCBjb2x1bW5XaWR0aCBjYW4ndCBib3RoIGJlIGF1dG8uXHJcbiAgICAgICAgICogTk9URTogdGhlIGZvcm11bGE6XHJcbiAgICAgICAgICogIHRvdGFsV2lkdGggPSBuICogdyArIChuIC0gMSkgKiBnYXBcclxuICAgICAgICAgKiAxLiBpZiBjb2x1bW5Db3VudCA9IG4gdGhlbiBjYWxjIHdcclxuICAgICAgICAgKiAyLiBpZiBjb2x1bW5XaWR0aCA9IHcgdGhlbiBjYWxjIG5cclxuICAgICAgICAgKiAzLiBpZiBjb2x1bW5XaWR0aCA9IHcgYW5kIGNvbHVtbkNvdW50ID0gbiB0aGVuIGNhbGMgdG90YWxXaWR0aFxyXG4gICAgICAgICAqICAgIDMuMSBpZiB0b3RhbFdpZHRoIDwgY3RXaWR0aCB0aGVuIGluY3JlYXNlIGNvbHVtbldpZHRoXHJcbiAgICAgICAgICogICAgMy4yIGlmIHRvdGFsV2lkdGggPiBjdFdpZHRoIHRoZW4gZGVjcmVhc2UgY29sdW1uQ291bnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgd2lkdGgsIGdhcCwgY250LCBjdFdpZHRoXHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB3ZWV4LmNvbmZpZy5lbnYuc2NhbGVcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuJGVsXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Q3RXaWR0aCAod2lkdGgsIHN0eWxlKSB7XHJcbiAgICAgICAgICBjb25zdCBwYWRkaW5nID0gc3R5bGUucGFkZGluZ1xyXG4gICAgICAgICAgICA/IHBhcnNlSW50KHN0eWxlLnBhZGRpbmcpICogMlxyXG4gICAgICAgICAgICA6IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdMZWZ0IHx8IDApICsgcGFyc2VJbnQoc3R5bGUucGFkZGluZ1JpZ2h0IHx8IDApXHJcbiAgICAgICAgICByZXR1cm4gd2lkdGggLSBwYWRkaW5nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSkgeyAvLyBhbHJlYWR5IG1vdW50ZWRcclxuICAgICAgICAgIGNvbnN0IGNzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVxyXG4gICAgICAgICAgY3RXaWR0aCA9IGdldEN0V2lkdGgoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsIGNzdHlsZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IC8vIG5vdCBtb3VudGVkLlxyXG4gICAgICAgICAgLy8gb25seSBzdXBwb3J0IGZ1bGwgc2NyZWVuIHdpZHRoIGZvciB3YXRlcmZhbGwgY29tcG9uZW50LlxyXG4gICAgICAgICAgY3RXaWR0aCA9IGdldEN0V2lkdGgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCByb290U3R5bGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnYXAgPSB0aGlzLmNvbHVtbkdhcFxyXG4gICAgICAgIGlmIChnYXAgJiYgZ2FwICE9PSAnbm9ybWFsJykge1xyXG4gICAgICAgICAgZ2FwID0gcGFyc2VJbnQoZ2FwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGdhcCA9IE5PUk1BTF9HQVBfU0laRVxyXG4gICAgICAgIH1cclxuICAgICAgICBnYXAgPSBnYXAgKiBzY2FsZVxyXG5cclxuICAgICAgICB3aWR0aCA9IHRoaXMuY29sdW1uV2lkdGhcclxuICAgICAgICBjbnQgPSB0aGlzLmNvbHVtbkNvdW50XHJcbiAgICAgICAgaWYgKHdpZHRoICYmIHdpZHRoICE9PSAnYXV0bycpIHtcclxuICAgICAgICAgIHdpZHRoID0gcGFyc2VJbnQod2lkdGgpICogc2NhbGVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNudCAmJiBjbnQgIT09ICdhdXRvJykge1xyXG4gICAgICAgICAgY250ID0gcGFyc2VJbnQoY250KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMC4gaWYgIWNvbHVtbkNvdW50ICYmICFjb2x1bW5XaWR0aFxyXG4gICAgICAgIGlmIChjbnQgPT09ICdhdXRvJyAmJiB3aWR0aCA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBbdnVlLXJlbmRlcl0gd2F0ZXJmYWxsJ3MgY29sdW1uV2lkdGggYW5kIGNvbHVtbkNvdW50IHNob3VsZG4ndGBcclxuICAgICAgICAgICAgKyBgIGJvdGggYmUgYXV0byBhdCB0aGUgc2FtZSB0aW1lLmApXHJcbiAgICAgICAgICAgIGNudCA9IERFRkFVTFRfQ09MVU1OX0NPVU5UXHJcbiAgICAgICAgICAgIHdpZHRoID0gY3RXaWR0aFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAxLiBpZiBjb2x1bW5Db3VudCA9IG4gdGhlbiBjYWxjIHcuXHJcbiAgICAgICAgZWxzZSBpZiAoY250ICE9PSAnYXV0bycgJiYgd2lkdGggPT09ICdhdXRvJykge1xyXG4gICAgICAgICAgd2lkdGggPSAoY3RXaWR0aCAtIChjbnQgLSAxKSAqIGdhcCkgLyBjbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gMi4gaWYgY29sdW1uV2lkdGggPSB3IHRoZW4gY2FsYyBuLlxyXG4gICAgICAgIGVsc2UgaWYgKGNudCA9PT0gJ2F1dG8nICYmIHdpZHRoICE9PSAnYXV0bycpIHtcclxuICAgICAgICAgIGNudCA9IChjdFdpZHRoICsgZ2FwKSAvICh3aWR0aCArIGdhcClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gMy4gaWYgY29sdW1uV2lkdGggPSB3IGFuZCBjb2x1bW5Db3VudCA9IG4gdGhlbiBjYWxjIHRvdGFsV2lkdGhcclxuICAgICAgICBlbHNlIGlmIChjbnQgIT09ICdhdXRvJyAmJiB3aWR0aCAhPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICBsZXQgdG90YWxXaWR0aFxyXG4gICAgICAgICAgY29uc3QgYWRqdXN0Q291bnRBbmRXaWR0aCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdG90YWxXaWR0aCA9IGNudCAqIHdpZHRoICsgKGNudCAtIDEpICogZ2FwXHJcbiAgICAgICAgICAgIGlmICh0b3RhbFdpZHRoIDwgY3RXaWR0aCkge1xyXG4gICAgICAgICAgICAgIHdpZHRoICs9IChjdFdpZHRoIC0gdG90YWxXaWR0aCkgLyBjbnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0b3RhbFdpZHRoID4gY3RXaWR0aCAmJiBjbnQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgY250LS1cclxuICAgICAgICAgICAgICBhZGp1c3RDb3VudEFuZFdpZHRoKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0b3RhbFdpZHRoID4gY3RXaWR0aCkgeyAgLy8gY250ID09PSAxXHJcbiAgICAgICAgICAgICAgd2lkdGggPSBjdFdpZHRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGFkanVzdENvdW50QW5kV2lkdGgoKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jb2x1bW5Db3VudCA9IGNudFxyXG4gICAgICAgIHRoaXMuX2NvbHVtbldpZHRoID0gd2lkdGhcclxuICAgICAgICB0aGlzLl9jb2x1bW5HYXAgPSBnYXBcclxuICAgICAgfSxcclxuXHJcbiAgICAgIF9nZW5Db2x1bW5zIChjcmVhdGVFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IFtdXHJcbiAgICAgICAgY29uc3QgY2VsbHMgPSB0aGlzLl9jZWxsc1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkNudCA9IHRoaXMuX2NvbHVtbkNvdW50XHJcbiAgICAgICAgY29uc3QgbGVuID0gY2VsbHMubGVuZ3RoXHJcbiAgICAgICAgY29uc3QgY29sdW1uQ2VsbHMgPSB0aGlzLl9jb2x1bW5DZWxscyA9IEFycmF5KGNvbHVtbkNudCkuam9pbignLicpLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdIH0pXHJcbiAgICAgICAgLy8gc3ByZWFkIGNlbGxzIHRvIHRoZSBjb2x1bW5zIHVzaW5nIHNpbXBvbGUgcG9sbGluZyBhbGdvcml0aG0uXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgKGNlbGxzW2ldLmRhdGEuYXR0cnMgfHwgKGNlbGxzW2ldLmRhdGEuYXR0cnMgPSB7fSkpWydkYXRhLWNlbGwnXSA9IGlcclxuICAgICAgICAgIGNvbHVtbkNlbGxzW2kgJSBjb2x1bW5DbnRdLnB1c2goY2VsbHNbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1uQ250OyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuX2NvbHVtbnMucHVzaChjcmVhdGVFbGVtZW50KCdodG1sOmRpdicsIHtcclxuICAgICAgICAgICAgcmVmOiBgY29sdW1uJHtpfWAsXHJcbiAgICAgICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICAgJ2RhdGEtY29sdW1uJzogaVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogJ3dlZXgtY3QnLFxyXG4gICAgICAgICAgICBzdGF0aWNTdHlsZToge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9jb2x1bW5XaWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgbWFyZ2luTGVmdDogaSA9PT0gMCA/IDAgOiB0aGlzLl9jb2x1bW5HYXAgKyAncHgnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIGNvbHVtbkNlbGxzW2ldKSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBfbmV4dFRpY2sgKCkge1xyXG4gICAgICAgIHRoaXMuX3JlTGF5b3V0Q2hpbGRyZW4oKVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgX3JlTGF5b3V0Q2hpbGRyZW4gKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRyZWF0IHRoZSBzaG9ydGVzdCBjb2x1bW4gYm90dG9tIGFzIHRoZSBtYXRjaCBzdGFuZGFyZC5cclxuICAgICAgICAgKiB3aGljaGV2ZXIgY2VsbCBleGNlZWRlZCBpdCB3b3VsZCBiZSByZWFycmFuZ2VkLlxyXG4gICAgICAgICAqIDEuIG0gPSBzaG9ydGVzdCBjb2x1bW4gYm90dG9tLlxyXG4gICAgICAgICAqIDIuIGdldCBhbGwgY2VsbCBpZHMgd2hvIGlzIGJlbG93IG0uXHJcbiAgICAgICAgICogMy4gY2FsY3VsYXRlIHdoaWNoIGNlbGwgc2hvdWxkIGJlIGluIHdoaWNoIGNvbHVtbi5cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdCBjb2x1bW5DbnQgPSB0aGlzLl9jb2x1bW5Db3VudFxyXG4gICAgICAgIGNvbnN0IGNvbHVtbkRvbXMgPSBbXVxyXG4gICAgICAgIGNvbnN0IGNvbHVtbkFwcGVuZEZyYWdtZW50cyA9IFtdXHJcbiAgICAgICAgY29uc3QgY29sdW1uQm90dG9tcyA9IFtdXHJcbiAgICAgICAgbGV0IG1pbkJvdHRvbSA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXHJcbiAgICAgICAgbGV0IG1pbkJvdHRvbUNvbHVtbkluZGV4ID0gMFxyXG5cclxuICAgICAgICAvLyAxLiBmaW5kIHRoZSBzaG9ydGVzdCBjb2x1bW4gYm90dG9tLlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1uQ250OyBpKyspIHtcclxuICAgICAgICAgIGNvbnN0IGNvbHVtbkRvbSA9IHRoaXMuX2NvbHVtbnNbaV0uZWxtXHJcbiAgICAgICAgICBjb25zdCBsYXN0Q2hpbGQgPSBjb2x1bW5Eb20ubGFzdEVsZW1lbnRDaGlsZFxyXG4gICAgICAgICAgY29uc3QgYm90dG9tID0gbGFzdENoaWxkID8gbGFzdENoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA6IDBcclxuICAgICAgICAgIGNvbHVtbkRvbXMucHVzaChjb2x1bW5Eb20pXHJcbiAgICAgICAgICBjb2x1bW5Cb3R0b21zW2ldID0gYm90dG9tXHJcbiAgICAgICAgICBjb2x1bW5BcHBlbmRGcmFnbWVudHMucHVzaChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpXHJcbiAgICAgICAgICBpZiAoYm90dG9tIDwgbWluQm90dG9tKSB7XHJcbiAgICAgICAgICAgIG1pbkJvdHRvbSA9IGJvdHRvbVxyXG4gICAgICAgICAgICBtaW5Cb3R0b21Db2x1bW5JbmRleCA9IGlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDIuIGdldCBhbGwgY2VsbCBpZHMgd2hvIGlzIGJlbG93IG0uXHJcbiAgICAgICAgY29uc3QgYmVsb3dDZWxsSWRzID0gW11cclxuICAgICAgICBjb25zdCBiZWxvd0NlbGxzID0ge31cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbkNudDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoaSA9PT0gbWluQm90dG9tQ29sdW1uSW5kZXgpIHtcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IGNvbHVtbkRvbSA9IGNvbHVtbkRvbXNbaV1cclxuICAgICAgICAgIGNvbnN0IGNlbGxzSW5Db2x1bW4gPSBjb2x1bW5Eb20ucXVlcnlTZWxlY3RvckFsbCgnc2VjdGlvbi53ZWV4LWNlbGwnKVxyXG4gICAgICAgICAgY29uc3QgbGVuID0gY2VsbHNJbkNvbHVtbi5sZW5ndGhcclxuICAgICAgICAgIGZvciAobGV0IGogPSBsZW4gLSAxOyBqID49IDA7IGotLSkge1xyXG4gICAgICAgICAgICBjb25zdCBjZWxsRG9tID0gY2VsbHNJbkNvbHVtbltqXVxyXG4gICAgICAgICAgICBjb25zdCBjZWxsUmVjdCA9IGNlbGxEb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgICAgaWYgKGNlbGxSZWN0LnRvcCA+IG1pbkJvdHRvbSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGlkID0gfn5jZWxsRG9tLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsJylcclxuICAgICAgICAgICAgICBiZWxvd0NlbGxJZHMucHVzaChpZClcclxuICAgICAgICAgICAgICBiZWxvd0NlbGxzW2lkXSA9IHsgZWxtOiBjZWxsRG9tLCBoZWlnaHQ6IGNlbGxSZWN0LmhlaWdodCB9XHJcbiAgICAgICAgICAgICAgY29sdW1uQm90dG9tc1tpXSAtPSBjZWxsUmVjdC5oZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMy4gY2FsY3VsYXRlIHdoaWNoIGNlbGwgc2hvdWxkIGJlIGluIHdoaWNoIGNvbHVtbiBhbmQgcmVhcnJhbmdlIHRoZW1cclxuICAgICAgICAvLyAgaW4gdGhlIGRvbSB0cmVlLlxyXG4gICAgICAgIGJlbG93Q2VsbElkcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhID4gYiB9KVxyXG4gICAgICAgIGNvbnN0IGNlbGxJZHNMZW4gPSBiZWxvd0NlbGxJZHMubGVuZ3RoXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkVG9TaG9ydGVzdENvbHVtbiAoYmVsb3dDZWxsKSB7XHJcbiAgICAgICAgICAvLyBmaW5kIHNob3J0ZXN0IGJvdHRvbS5cclxuICAgICAgICAgIG1pbkJvdHRvbSA9IE1hdGgubWluKC4uLmNvbHVtbkJvdHRvbXMpXHJcbiAgICAgICAgICBtaW5Cb3R0b21Db2x1bW5JbmRleCA9IGNvbHVtbkJvdHRvbXMuaW5kZXhPZihtaW5Cb3R0b20pXHJcbiAgICAgICAgICBjb25zdCB7IGVsbTogY2VsbEVsbSwgaGVpZ2h0OiBjZWxsSGVpZ2h0IH0gPSBiZWxvd0NlbGxcclxuICAgICAgICAgIGNvbHVtbkFwcGVuZEZyYWdtZW50c1ttaW5Cb3R0b21Db2x1bW5JbmRleF0uYXBwZW5kQ2hpbGQoY2VsbEVsbSlcclxuICAgICAgICAgIGNvbHVtbkJvdHRvbXNbbWluQm90dG9tQ29sdW1uSW5kZXhdICs9IGNlbGxIZWlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWxsSWRzTGVuOyBpKyspIHtcclxuICAgICAgICAgIGFkZFRvU2hvcnRlc3RDb2x1bW4oYmVsb3dDZWxsc1tiZWxvd0NlbGxJZHNbaV1dKVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbkNudDsgaSsrKSB7XHJcbiAgICAgICAgICBjb2x1bW5Eb21zW2ldLmFwcGVuZENoaWxkKGNvbHVtbkFwcGVuZEZyYWdtZW50c1tpXSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMud2VleFR5cGUgPSAnd2F0ZXJmYWxsJ1xyXG4gICAgICB0aGlzLl9jZWxscyA9IHRoaXMuJHNsb3RzLmRlZmF1bHQgfHwgW11cclxuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGF5b3V0KClcclxuICAgICAgfSlcclxuICAgICAgY29uc3QgbWVyZ2VkU3R5bGUgPSBleHRyYWN0Q29tcG9uZW50U3R5bGUodGhpcylcclxuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ21haW4nLCB7XHJcbiAgICAgICAgcmVmOiAnd3JhcHBlcicsXHJcbiAgICAgICAgYXR0cnM6IHsgJ3dlZXgtdHlwZSc6ICd3YXRlcmZhbGwnIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgIHNjcm9sbDogdGhpcy5oYW5kbGVTY3JvbGwsXHJcbiAgICAgICAgICB0b3VjaHN0YXJ0OiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXHJcbiAgICAgICAgICB0b3VjaG1vdmU6IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLFxyXG4gICAgICAgICAgdG91Y2hlbmQ6IHRoaXMuaGFuZGxlVG91Y2hFbmRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC13YXRlcmZhbGwgd2VleC13YXRlcmZhbGwtd3JhcHBlciB3ZWV4LWN0JyxcclxuICAgICAgICBzdGF0aWNTdHlsZTogbWVyZ2VkU3R5bGVcclxuICAgICAgfSwgdGhpcy5fY3JlYXRlQ2hpbGRyZW4oY3JlYXRlRWxlbWVudCwgbWVyZ2VkU3R5bGUpKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQgKHdlZXgpIHtcclxuICAgIHdlZXgucmVnaXN0ZXJDb21wb25lbnQoJ3dhdGVyZmFsbCcsIGdldFdhdGVyZmFsbCh3ZWV4KSlcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZ2V0SGVhZGVyICh3ZWV4KSB7XHJcbiAgY29uc3QgeyBleHRyYWN0Q29tcG9uZW50U3R5bGUgfSA9IHdlZXhcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJlbmRlciAoY3JlYXRlRWxlbWVudCkge1xyXG4gICAgICBjb25zdCBhdHRycyA9IHRoaXMuJHZub2RlLmRhdGEuYXR0cnNcclxuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2h0bWw6aGVhZGVyJywge1xyXG4gICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAnd2VleC10eXBlJzogJ2hlYWRlcicsXHJcbiAgICAgICAgICBzdGlja3k6IChcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LndlZXhUeXBlID09PSAnd2F0ZXJmYWxsJ1xyXG4gICAgICAgICAgICAmJiB0eXBlb2YgYXR0cnMuc3RpY2t5ID09PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgKSA/IHVuZGVmaW5lZCA6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWY6ICdoZWFkZXInLFxyXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1oZWFkZXIgd2VleC1jdCcsXHJcbiAgICAgICAgc3RhdGljU3R5bGU6IGV4dHJhY3RDb21wb25lbnRTdHlsZSh0aGlzKVxyXG4gICAgICB9LCB0aGlzLiRzbG90cy5kZWZhdWx0KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQgKHdlZXgpIHtcclxuICAgIHdlZXgucmVnaXN0ZXJDb21wb25lbnQoJ2hlYWRlcicsIGdldEhlYWRlcih3ZWV4KSlcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZ2V0TG9hZGluZyAoKSB7XHJcbiAgY29uc3QgeyBleHRyYWN0Q29tcG9uZW50U3R5bGUgfSA9IHdlZXhcclxuICBjb25zdCB7IGRpc3BhdGNoTmF0aXZlRXZlbnQgfSA9IHdlZXgudXRpbHNcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICd3ZWV4LWxvYWRpbmcnLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgZGlzcGxheToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0OiAnc2hvdycsXHJcbiAgICAgICAgdmFsaWRhdG9yICh2YWx1ZSkge1xyXG4gICAgICAgICAgcmV0dXJuIFsnc2hvdycsICdoaWRlJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YSAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaGVpZ2h0OiAtMSxcclxuICAgICAgICB2aWV3SGVpZ2h0OiAwXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy52aWV3SGVpZ2h0ID0gdGhpcy4kZWwub2Zmc2V0SGVpZ2h0XHJcbiAgICAgIGlmICh0aGlzLmRpc3BsYXkgPT09ICdoaWRlJykge1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMFxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy52aWV3SGVpZ2h0XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICBoZWlnaHQgKHZhbCkge1xyXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IGAke3ZhbH1weGBcclxuICAgICAgICB0aGlzLiRlbC5zdHlsZS5oZWlnaHQgPSBvZmZzZXRcclxuICAgICAgICB0aGlzLiRlbC5zdHlsZS5ib3R0b20gPSBvZmZzZXRcclxuICAgICAgfSxcclxuICAgICAgZGlzcGxheSAodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gJ2hpZGUnKSB7XHJcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMudmlld0hlaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgcHVsbGluZyAob2Zmc2V0WSA9IDApIHtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IG9mZnNldFlcclxuICAgICAgfSxcclxuICAgICAgcHVsbGluZ1VwIChvZmZzZXRZKSB7XHJcbiAgICAgICAgdGhpcy4kZWwuc3R5bGUudHJhbnNpdGlvbiA9IGBoZWlnaHQgMHNgXHJcbiAgICAgICAgdGhpcy5wdWxsaW5nKG9mZnNldFkpXHJcbiAgICAgIH0sXHJcbiAgICAgIHB1bGxpbmdFbmQgKCkge1xyXG4gICAgICAgIHRoaXMuJGVsICYmICh0aGlzLiRlbC5zdHlsZS50cmFuc2l0aW9uID0gYGhlaWdodCAuMnNgKVxyXG4gICAgICAgIGlmICh0aGlzLmhlaWdodCA+PSB0aGlzLnZpZXdIZWlnaHQpIHtcclxuICAgICAgICAgIHRoaXMucHVsbGluZyh0aGlzLnZpZXdIZWlnaHQpXHJcbiAgICAgICAgICBpZiAodGhpcy4kZWwpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2hOYXRpdmVFdmVudCh0aGlzLiRlbCwgJ2xvYWRpbmcnKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucHVsbGluZygwKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZ2V0Q2hpbGRyZW4gKCkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbXVxyXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXkgPT09ICdzaG93Jykge1xyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkcmVuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGlsZHJlbi5maWx0ZXIodm5vZGUgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuICEodm5vZGUuY29tcG9uZW50T3B0aW9uc1xyXG4gICAgICAgICAgICAmJiB2bm9kZS5jb21wb25lbnRPcHRpb25zLnRhZyA9PT0gJ2xvYWRpbmctaW5kaWNhdG9yJylcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuJHBhcmVudC5fbG9hZGluZyA9IHRoaXNcclxuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2FzaWRlJywge1xyXG4gICAgICAgIHJlZjogJ2xvYWRpbmcnLFxyXG4gICAgICAgIGF0dHJzOiB7ICd3ZWV4LXR5cGUnOiAnbG9hZGluZycgfSxcclxuICAgICAgICBzdGF0aWNDbGFzczogJ3dlZXgtbG9hZGluZyB3ZWV4LWN0JyxcclxuICAgICAgICBzdGF0aWNTdHlsZTogZXh0cmFjdENvbXBvbmVudFN0eWxlKHRoaXMpXHJcbiAgICAgIH0sIHRoaXMuZ2V0Q2hpbGRyZW4oKSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0ICh3ZWV4KSB7XHJcbiAgICB3ZWV4LnJlZ2lzdGVyQ29tcG9uZW50KCdsb2FkaW5nJywgZ2V0TG9hZGluZyh3ZWV4KSlcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZ2V0UmVmcmVzaCAod2VleCkge1xyXG4gIGNvbnN0IHsgZXh0cmFjdENvbXBvbmVudFN0eWxlIH0gPSB3ZWV4XHJcbiAgY29uc3QgeyBkaXNwYXRjaE5hdGl2ZUV2ZW50IH0gPSB3ZWV4LnV0aWxzXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnd2VleC1yZWZyZXNoJyxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgIGRpc3BsYXk6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgZGVmYXVsdDogJ3Nob3cnLFxyXG4gICAgICAgIHZhbGlkYXRvciAodmFsdWUpIHtcclxuICAgICAgICAgIHJldHVybiBbJ3Nob3cnLCAnaGlkZSddLmluZGV4T2YodmFsdWUpICE9PSAtMVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGxhc3REeTogMCxcclxuICAgICAgICB2aWV3SGVpZ2h0OiAwLFxyXG4gICAgICAgIGhlaWdodDogLTFcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdW50ZWQgKCkge1xyXG4gICAgICB0aGlzLnZpZXdIZWlnaHQgPSB0aGlzLiRlbC5vZmZzZXRIZWlnaHRcclxuICAgICAgaWYgKHRoaXMuZGlzcGxheSA9PT0gJ2hpZGUnKSB7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLnZpZXdIZWlnaHRcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgIGhlaWdodCAodmFsKSB7XHJcbiAgICAgICAgdGhpcy4kZWwuc3R5bGUuaGVpZ2h0ID0gYCR7dmFsfXB4YFxyXG4gICAgICB9LFxyXG4gICAgICBkaXNwbGF5ICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsID09PSAnaGlkZScpIHtcclxuICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy52aWV3SGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBwdWxsaW5nIChvZmZzZXRZID0gMCkge1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gb2Zmc2V0WVxyXG4gICAgICAgIGlmICh0aGlzLiRlbCkge1xyXG4gICAgICAgICAgZGlzcGF0Y2hOYXRpdmVFdmVudCh0aGlzLiRlbCwgJ3B1bGxpbmdkb3duJywge1xyXG4gICAgICAgICAgICBkeTogb2Zmc2V0WSAtIHRoaXMubGFzdER5LFxyXG4gICAgICAgICAgICBwdWxsaW5nRGlzdGFuY2U6IG9mZnNldFksXHJcbiAgICAgICAgICAgIHZpZXdIZWlnaHQ6IHRoaXMudmlld0hlaWdodFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0RHkgPSBvZmZzZXRZXHJcbiAgICAgIH0sXHJcbiAgICAgIHB1bGxpbmdEb3duIChvZmZzZXRZKSB7XHJcbiAgICAgICAgdGhpcy4kZWwuc3R5bGUudHJhbnNpdGlvbiA9IGBoZWlnaHQgMHNgXHJcbiAgICAgICAgdGhpcy5wdWxsaW5nKG9mZnNldFkpXHJcbiAgICAgIH0sXHJcbiAgICAgIHB1bGxpbmdFbmQgKCkge1xyXG4gICAgICAgIHRoaXMuJGVsICYmICh0aGlzLiRlbC5zdHlsZS50cmFuc2l0aW9uID0gYGhlaWdodCAuMnNgKVxyXG4gICAgICAgIGlmICh0aGlzLmhlaWdodCA+PSB0aGlzLnZpZXdIZWlnaHQpIHtcclxuICAgICAgICAgIHRoaXMucHVsbGluZyh0aGlzLnZpZXdIZWlnaHQpXHJcbiAgICAgICAgICBpZiAodGhpcy4kZWwpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2hOYXRpdmVFdmVudCh0aGlzLiRlbCwgJ3JlZnJlc2gnKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucHVsbGluZygwKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZ2V0Q2hpbGRyZW4gKCkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbXVxyXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXkgPT09ICdzaG93Jykge1xyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkcmVuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGlsZHJlbi5maWx0ZXIodm5vZGUgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuICEodm5vZGUuY29tcG9uZW50T3B0aW9uc1xyXG4gICAgICAgICAgICAmJiB2bm9kZS5jb21wb25lbnRPcHRpb25zLnRhZyA9PT0gJ2xvYWRpbmctaW5kaWNhdG9yJylcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuJHBhcmVudC5fcmVmcmVzaCA9IHRoaXNcclxuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2FzaWRlJywge1xyXG4gICAgICAgIHJlZjogJ3JlZnJlc2gnLFxyXG4gICAgICAgIGF0dHJzOiB7ICd3ZWV4LXR5cGUnOiAncmVmcmVzaCcgfSxcclxuICAgICAgICBzdGF0aWNDbGFzczogJ3dlZXgtcmVmcmVzaCB3ZWV4LWN0JyxcclxuICAgICAgICBzdGF0aWNTdHlsZTogZXh0cmFjdENvbXBvbmVudFN0eWxlKHRoaXMpXHJcbiAgICAgIH0sIHRoaXMuZ2V0Q2hpbGRyZW4oKSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0ICh3ZWV4KSB7XHJcbiAgICB3ZWV4LnJlZ2lzdGVyQ29tcG9uZW50KCdyZWZyZXNoJywgZ2V0UmVmcmVzaCh3ZWV4KSlcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5sZXQgZXh0cmFjdENvbXBvbmVudFN0eWxlLCBnZXRSZ2IsIGxvb3BBcnJheSwgZ2V0U3R5bGVTaGVldEJ5SWRcclxuXHJcbmNvbnN0IF9jc3MgPSBgXHJcbi53ZWV4LXJlZnJlc2gtaW5kaWNhdG9yLFxyXG4ud2VleC1sb2FkaW5nLWluZGljYXRvciB7XHJcbiAgd2lkdGg6IDFyZW0gIWltcG9ydGFudDtcclxuICBoZWlnaHQ6IDFyZW0gIWltcG9ydGFudDtcclxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xyXG4gIC1tb3otYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XHJcbiAgLW1vei1ib3gtcGFjazogY2VudGVyO1xyXG4gIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbn1cclxuLndlZXgtcmVmcmVzaC1pbmRpY2F0b3I6YmVmb3JlLFxyXG4ud2VleC1sb2FkaW5nLWluZGljYXRvcjpiZWZvcmUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIGZvbnQtc2l6ZTogMC4xNnJlbTtcclxuICB3aWR0aDogMC41ZW07XHJcbiAgaGVpZ2h0OiAwLjVlbTtcclxuICBsZWZ0OiAwO1xyXG4gIHRvcDogMDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRleHQtaW5kZW50OiAtOTk5OWVtO1xyXG4gIC13ZWJraXQtYW5pbWF0aW9uOiB3ZWV4LXNwaW5uZXIgMS4xcyBpbmZpbml0ZSBlYXNlO1xyXG4gIC1tb3otYW5pbWF0aW9uOiB3ZWV4LXNwaW5uZXIgMS4xcyBpbmZpbml0ZSBlYXNlO1xyXG4gIGFuaW1hdGlvbjogd2VleC1zcGlubmVyIDEuMXMgaW5maW5pdGUgZWFzZTtcclxufVxyXG5cclxuQC13ZWJraXQta2V5ZnJhbWVzIHdlZXgtc3Bpbm5lciB7XHJcbiAgMCUsXHJcbiAgMTAwJSB7XHJcbiAgICBib3gtc2hhZG93OiAwZW0gLTEuM2VtIDBlbSAwZW0gI2ZmZmZmZiwgMC45ZW0gLTAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgMS4yNWVtIDBlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDAuODc1ZW0gMC44NzVlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDBlbSAxLjI1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMC45ZW0gMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMS4zZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSwgLTAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XHJcbiAgfVxyXG4gIDExLjI1JSB7XHJcbiAgICBib3gtc2hhZG93OiAwZW0gLTEuM2VtIDBlbSAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpLCAwLjllbSAtMC45ZW0gMCAwZW0gI2ZmZmZmZiwgMS4yNWVtIDBlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDAuODc1ZW0gMC44NzVlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDBlbSAxLjI1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMC45ZW0gMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMS4zZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XHJcbiAgfVxyXG4gIDI1JSB7XHJcbiAgICBib3gtc2hhZG93OiAwZW0gLTEuM2VtIDBlbSAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpLCAwLjllbSAtMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpLCAxLjI1ZW0gMGVtIDAgMGVtICNmZmZmZmYsIDAuODc1ZW0gMC44NzVlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDBlbSAxLjI1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMC45ZW0gMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMS4zZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XHJcbiAgfVxyXG4gIDM3LjUlIHtcclxuICAgIGJveC1zaGFkb3c6IDBlbSAtMS4zZW0gMGVtIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSksIDEuMjVlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpLCAwLjg3NWVtIDAuODc1ZW0gMCAwZW0gI2ZmZmZmZiwgMGVtIDEuMjVlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIC0wLjllbSAwLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIC0xLjNlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMC45ZW0gLTAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxuICB9XHJcbiAgNTAlIHtcclxuICAgIGJveC1zaGFkb3c6IDBlbSAtMS4zZW0gMGVtIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDEuMjVlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpLCAwLjg3NWVtIDAuODc1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpLCAwZW0gMS4yNWVtIDAgMGVtICNmZmZmZmYsIC0wLjllbSAwLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIC0xLjNlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMC45ZW0gLTAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxuICB9XHJcbiAgNjEuMjUlIHtcclxuICAgIGJveC1zaGFkb3c6IDBlbSAtMS4zZW0gMGVtIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDEuMjVlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwLjg3NWVtIDAuODc1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpLCAwZW0gMS4yNWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSwgLTAuOWVtIDAuOWVtIDAgMGVtICNmZmZmZmYsIC0xLjNlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMC45ZW0gLTAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxuICB9XHJcbiAgNzUlIHtcclxuICAgIGJveC1zaGFkb3c6IDBlbSAtMS4zZW0gMGVtIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDEuMjVlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwLjg3NWVtIDAuODc1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwZW0gMS4yNWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSwgLTAuOWVtIDAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSwgLTEuM2VtIDBlbSAwIDBlbSAjZmZmZmZmLCAtMC45ZW0gLTAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxuICB9XHJcbiAgODcuNSUge1xyXG4gICAgYm94LXNoYWRvdzogMGVtIC0xLjNlbSAwZW0gMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgMC45ZW0gLTAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgMS4yNWVtIDBlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDAuODc1ZW0gMC44NzVlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDBlbSAxLjI1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMC45ZW0gMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpLCAtMS4zZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSwgLTAuOWVtIC0wLjllbSAwIDBlbSAjZmZmZmZmO1xyXG4gIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyB3ZWV4LXNwaW5uZXIge1xyXG4gIDAlLFxyXG4gIDEwMCUge1xyXG4gICAgYm94LXNoYWRvdzogMGVtIC0xLjNlbSAwZW0gMGVtICNmZmZmZmYsIDAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDEuMjVlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwLjg3NWVtIDAuODc1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwZW0gMS4yNWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTAuOWVtIDAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTEuM2VtIDBlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSksIC0wLjllbSAtMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xyXG4gIH1cclxuICAxMS4yNSUge1xyXG4gICAgYm94LXNoYWRvdzogMGVtIC0xLjNlbSAwZW0gMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSwgMC45ZW0gLTAuOWVtIDAgMGVtICNmZmZmZmYsIDEuMjVlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwLjg3NWVtIDAuODc1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwZW0gMS4yNWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTAuOWVtIDAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTEuM2VtIDBlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIC0wLjllbSAtMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xyXG4gIH1cclxuICAyNSUge1xyXG4gICAgYm94LXNoYWRvdzogMGVtIC0xLjNlbSAwZW0gMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSwgMC45ZW0gLTAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSwgMS4yNWVtIDBlbSAwIDBlbSAjZmZmZmZmLCAwLjg3NWVtIDAuODc1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwZW0gMS4yNWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTAuOWVtIDAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTEuM2VtIDBlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIC0wLjllbSAtMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xyXG4gIH1cclxuICAzNy41JSB7XHJcbiAgICBib3gtc2hhZG93OiAwZW0gLTEuM2VtIDBlbSAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwLjllbSAtMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpLCAxLjI1ZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSwgMC44NzVlbSAwLjg3NWVtIDAgMGVtICNmZmZmZmYsIDBlbSAxLjI1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMC45ZW0gMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMS4zZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XHJcbiAgfVxyXG4gIDUwJSB7XHJcbiAgICBib3gtc2hhZG93OiAwZW0gLTEuM2VtIDBlbSAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwLjllbSAtMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAxLjI1ZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSwgMC44NzVlbSAwLjg3NWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSwgMGVtIDEuMjVlbSAwIDBlbSAjZmZmZmZmLCAtMC45ZW0gMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAtMS4zZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XHJcbiAgfVxyXG4gIDYxLjI1JSB7XHJcbiAgICBib3gtc2hhZG93OiAwZW0gLTEuM2VtIDBlbSAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwLjllbSAtMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAxLjI1ZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgMC44NzVlbSAwLjg3NWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSwgMGVtIDEuMjVlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyksIC0wLjllbSAwLjllbSAwIDBlbSAjZmZmZmZmLCAtMS4zZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XHJcbiAgfVxyXG4gIDc1JSB7XHJcbiAgICBib3gtc2hhZG93OiAwZW0gLTEuM2VtIDBlbSAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwLjllbSAtMC45ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAxLjI1ZW0gMGVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgMC44NzVlbSAwLjg3NWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgMGVtIDEuMjVlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSksIC0wLjllbSAwLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyksIC0xLjNlbSAwZW0gMCAwZW0gI2ZmZmZmZiwgLTAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XHJcbiAgfVxyXG4gIDg3LjUlIHtcclxuICAgIGJveC1zaGFkb3c6IDBlbSAtMS4zZW0gMGVtIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDAuOWVtIC0wLjllbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiksIDEuMjVlbSAwZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwLjg3NWVtIDAuODc1ZW0gMCAwZW0gcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpLCAwZW0gMS4yNWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSwgLTAuOWVtIDAuOWVtIDAgMGVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSwgLTEuM2VtIDBlbSAwIDBlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyksIC0wLjllbSAtMC45ZW0gMCAwZW0gI2ZmZmZmZjtcclxuICB9XHJcbn1cclxuYFxyXG5cclxuZnVuY3Rpb24gZ2V0U3R5bGVTaGVldCAoc3Bpbm5lclZtKSB7XHJcbiAgaWYgKHNwaW5uZXJWbS5fc3R5bGVTaGVldCkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIHNwaW5uZXJWbS5fc3R5bGVTaGVldCA9IGdldFN0eWxlU2hlZXRCeUlkKCd3ZWV4LWNtcC1sb2FkaW5nLWluZGljYXRvcicpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEtleWZyYW1lQ29sb3IgKHNwaW5uZXJWbSwgdmFsKSB7XHJcbiAgZ2V0U3R5bGVTaGVldChzcGlubmVyVm0pXHJcbiAgY29uc3Qga2V5ZnJhbWVSdWxlcyA9IGNvbXB1dGVLZXlGcmFtZVJ1bGVzKHZhbClcclxuICBjb25zdCBydWxlcyA9IHNwaW5uZXJWbS5fc3R5bGVTaGVldC5ydWxlcyB8fCBzcGlubmVyVm0uX3N0eWxlU2hlZXQuY3NzUnVsZXNcclxuICBmb3IgKGxldCBpID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgY29uc3QgaXRlbSA9IHJ1bGVzLml0ZW0oaSlcclxuICAgIGlmICgoaXRlbS50eXBlID09PSBDU1NSdWxlLktFWUZSQU1FU19SVUxFXHJcbiAgICAgICAgICB8fCBpdGVtLnR5cGUgPT09IENTU1J1bGUuV0VCS0lUX0tFWUZSQU1FU19SVUxFKVxyXG4gICAgICAgICYmIGl0ZW0ubmFtZSA9PT0gJ3dlZXgtc3Bpbm5lcicpIHtcclxuICAgICAgY29uc3QgY3NzUnVsZXMgPSBpdGVtLmNzc1J1bGVzXHJcbiAgICAgIGZvciAobGV0IGogPSAwLCBtID0gY3NzUnVsZXMubGVuZ3RoOyBqIDwgbTsgaisrKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ZnJhbWUgPSBjc3NSdWxlc1tqXVxyXG4gICAgICAgIGlmIChrZXlmcmFtZS50eXBlID09PSBDU1NSdWxlLktFWUZSQU1FX1JVTEVcclxuICAgICAgICAgIHx8IGtleWZyYW1lLnR5cGUgPT09IENTU1J1bGUuV0VCS0lUX0tFWUZSQU1FX1JVTEUpIHtcclxuICAgICAgICAgIGtleWZyYW1lLnN0eWxlLmJveFNoYWRvdyA9IGtleWZyYW1lUnVsZXNbal1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVLZXlGcmFtZVJ1bGVzIChyZ2IpIHtcclxuICBpZiAoIXJnYikge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIGNvbnN0IHNjYWxlQXJyID0gW1xyXG4gICAgJzBlbSAtMS4zZW0gMGVtIDBlbScsXHJcbiAgICAnMC45ZW0gLTAuOWVtIDAgMGVtJyxcclxuICAgICcxLjI1ZW0gMGVtIDAgMGVtJyxcclxuICAgICcwLjg3NWVtIDAuODc1ZW0gMCAwZW0nLFxyXG4gICAgJzBlbSAxLjI1ZW0gMCAwZW0nLFxyXG4gICAgJy0wLjllbSAwLjllbSAwIDBlbScsXHJcbiAgICAnLTEuM2VtIDBlbSAwIDBlbScsXHJcbiAgICAnLTAuOWVtIC0wLjllbSAwIDBlbSddXHJcbiAgY29uc3QgY29sb3JBcnIgPSBbXHJcbiAgICAnMScsXHJcbiAgICAnMC4yJyxcclxuICAgICcwLjInLFxyXG4gICAgJzAuMicsXHJcbiAgICAnMC4yJyxcclxuICAgICcwLjInLFxyXG4gICAgJzAuNScsXHJcbiAgICAnMC43J11cclxuICAgIC5tYXAoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgcmV0dXJuICdyZ2JhKCcgKyByZ2IuciArICcsJyArIHJnYi5nICsgJywnICsgcmdiLmIgKyAnLCcgKyBlICsgJyknXHJcbiAgICB9KVxyXG4gIGNvbnN0IHJ1bGVzID0gW11cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNjYWxlQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCB0bXBDb2xvckFyciA9IGxvb3BBcnJheShjb2xvckFyciwgaSwgJ3InKVxyXG4gICAgcnVsZXMucHVzaChzY2FsZUFyci5tYXAoZnVuY3Rpb24gKHNjYWxlU3RyLCBpKSB7XHJcbiAgICAgIHJldHVybiBzY2FsZVN0ciArICcgJyArIHRtcENvbG9yQXJyW2ldXHJcbiAgICB9KS5qb2luKCcsICcpKVxyXG4gIH1cclxuICByZXR1cm4gcnVsZXNcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1N0eWxlICh2bSkge1xyXG4gIGNvbnN0IHN0eWxlID0gZXh0cmFjdENvbXBvbmVudFN0eWxlKHZtKVxyXG4gIGNvbnN0IGNvbG9yID0gc3R5bGUuY29sb3JcclxuICBjb25zdCByZ2IgPSBjb2xvciAmJiBnZXRSZ2IoY29sb3IpXHJcbiAgaWYgKHJnYikge1xyXG4gICAgc2V0S2V5ZnJhbWVDb2xvcih2bSwgcmdiKVxyXG4gIH1cclxuICByZXR1cm4gc3R5bGVcclxufVxyXG5cclxuY29uc3QgbG9hZGluZ0luZGljYXRvciA9IHtcclxuICBuYW1lOiAnd2VleC1sb2FkaW5nLWluZGljYXRvcicsXHJcbiAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XHJcbiAgICB0aGlzLndlZXhUeXBlID0gJ2xvYWRpbmctaW5kaWNhdG9yJ1xyXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ21hcmsnLCB7XHJcbiAgICAgIGF0dHJzOiB7ICd3ZWV4LXR5cGUnOiAnbG9hZGluZy1pbmRpY2F0b3InIH0sXHJcbiAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1sb2FkaW5nLWluZGljYXRvciB3ZWV4LWN0JyxcclxuICAgICAgc3RhdGljU3R5bGU6IHByb2Nlc3NTdHlsZSh0aGlzKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIF9jc3NcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQgKHdlZXgpIHtcclxuICAgIGV4dHJhY3RDb21wb25lbnRTdHlsZSA9IHdlZXguZXh0cmFjdENvbXBvbmVudFN0eWxlXHJcbiAgICBnZXRSZ2IgPSB3ZWV4LnV0aWxzLmdldFJnYlxyXG4gICAgbG9vcEFycmF5ID0gd2VleC51dGlscy5sb29wQXJyYXlcclxuICAgIGdldFN0eWxlU2hlZXRCeUlkID0gd2VleC51dGlscy5nZXRTdHlsZVNoZWV0QnlJZFxyXG4gICAgd2VleC5yZWdpc3RlckNvbXBvbmVudCgnbG9hZGluZy1pbmRpY2F0b3InLCBsb2FkaW5nSW5kaWNhdG9yKVxyXG4gIH1cclxufVxyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmltcG9ydCB7IHNjcm9sbGFibGUgfSBmcm9tICcuL21peGlucydcclxuXHJcbmZ1bmN0aW9uIGdldExpc3QgKHdlZXgpIHtcclxuICBjb25zdCB7XHJcbiAgICBleHRyYWN0Q29tcG9uZW50U3R5bGVcclxuICB9ID0gd2VleFxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3dlZXgtcmVjeWNsZS1saXN0JyxcclxuICAgIG1peGluczogW3Njcm9sbGFibGVdLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgc2Nyb2xsRGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdHlwZTogW1N0cmluZ10sXHJcbiAgICAgICAgZGVmYXVsdDogJ3ZlcnRpY2FsJyxcclxuICAgICAgICB2YWxpZGF0b3IgKHZhbHVlKSB7XHJcbiAgICAgICAgICByZXR1cm4gWydob3Jpem9udGFsJywgJ3ZlcnRpY2FsJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBfaXRlbXM6IEFycmF5LFxyXG4gICAgICBfc3dpdGNoOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICB3cmFwcGVyQ2xhc3MgKCkge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzQXJyYXkgPSBbJ3dlZXgtcmVjeWNsZScsICd3ZWV4LXJlY3ljbGUtd3JhcHBlcicsICd3ZWV4LWN0J11cclxuICAgICAgICB0aGlzLl9yZWZyZXNoICYmIGNsYXNzQXJyYXkucHVzaCgnd2l0aC1yZWZyZXNoJylcclxuICAgICAgICB0aGlzLl9sb2FkaW5nICYmIGNsYXNzQXJyYXkucHVzaCgnd2l0aC1sb2FkaW5nJylcclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgY2xhc3NBcnJheS5wdXNoKCd3ZWV4LXJlY3ljbGUtaG9yaXpvbnRhbCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgY2xhc3NBcnJheS5wdXNoKCd3ZWV4LXJlY3ljbGUtdmVydGljYWwnKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2xhc3NBcnJheS5qb2luKCcgJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGNyZWF0ZUNoaWxkcmVuIChoKSB7XHJcbiAgICAgICAgY29uc3QgX3ZtID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBoKCdhcnRpY2xlJywge1xyXG4gICAgICAgICAgICByZWY6ICdpbm5lcicsXHJcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1yZWN5Y2xlLWlubmVyIHdlZXgtY3QnXHJcbiAgICAgICAgICB9LCBbXHJcbiAgICAgICAgICAgIF92bS5fbChfdm0uX2l0ZW1zLCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgX3ZtLl90KF92bS5zbG90ZU5hbWUoaXRlbSksIG51bGwsIHtcclxuICAgICAgICAgICAgICAgICAgaXRlbTogaXRlbSxcclxuICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBzbG90ZU5hbWUgKGl0ZW0pIHtcclxuICAgICAgICBpZiAodGhpcy5fc3dpdGNoICYmIGl0ZW1bdGhpcy5fc3dpdGNoXSkge1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1bdGhpcy5fc3dpdGNoXVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAnZGVmYXVsdCdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMud2VleFR5cGUgPSAnbGlzdCdcclxuXHJcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dCgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnbWFpbicsIHtcclxuICAgICAgICByZWY6ICd3cmFwcGVyJyxcclxuICAgICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ3JlY3ljbGUtbGlzdCcgfSxcclxuICAgICAgICBzdGF0aWNDbGFzczogdGhpcy53cmFwcGVyQ2xhc3MsXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgIHNjcm9sbDogdGhpcy5oYW5kbGVTY3JvbGwsXHJcbiAgICAgICAgICB0b3VjaHN0YXJ0OiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXHJcbiAgICAgICAgICB0b3VjaG1vdmU6IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLFxyXG4gICAgICAgICAgdG91Y2hlbmQ6IHRoaXMuaGFuZGxlVG91Y2hFbmRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXRpY1N0eWxlOiBleHRyYWN0Q29tcG9uZW50U3R5bGUodGhpcylcclxuICAgICAgfSwgdGhpcy5jcmVhdGVDaGlsZHJlbihjcmVhdGVFbGVtZW50KSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0ICh3ZWV4KSB7XHJcbiAgICB3ZWV4LnJlZ2lzdGVyQ29tcG9uZW50KCdyZWN5Y2xlLWxpc3QnLCBnZXRMaXN0KHdlZXgpKVxyXG4gIH1cclxufVxyXG4iLCIvKlxyXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXHJcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxyXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXHJcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcclxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXHJcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxyXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcclxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xyXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgbGlzdCBmcm9tICcuL2xpc3QnXHJcbmltcG9ydCBzY3JvbGxlciBmcm9tICcuL3Njcm9sbGVyJ1xyXG5pbXBvcnQgd2F0ZXJmYWxsIGZyb20gJy4vd2F0ZXJmYWxsJ1xyXG4vLyBpbXBvcnQgY2VsbCBmcm9tICcuL2NlbGwnXHJcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9oZWFkZXInXHJcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4vbG9hZGluZydcclxuaW1wb3J0IHJlZnJlc2ggZnJvbSAnLi9yZWZyZXNoJ1xyXG5pbXBvcnQgbG9hZGluZ0luZGljYXRvciBmcm9tICcuL2xvYWRpbmctaW5kaWNhdG9yJ1xyXG5pbXBvcnQgcmVjeWNsZUxpc3QgZnJvbSAnLi9yZWN5Y2xlLWxpc3QnXHJcblxyXG5pbXBvcnQgJy4vc3R5bGUuY3NzJ1xyXG5cclxuY29uc3QgbW9kdWxlcyA9IFtcclxuICBsaXN0LFxyXG4gIHNjcm9sbGVyLFxyXG4gIHdhdGVyZmFsbCxcclxuICAvLyBjZWxsLFxyXG4gIGhlYWRlcixcclxuICBsb2FkaW5nLFxyXG4gIHJlZnJlc2gsXHJcbiAgbG9hZGluZ0luZGljYXRvcixcclxuICByZWN5Y2xlTGlzdFxyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCAod2VleCkge1xyXG4gICAgbW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2QpIHtcclxuICAgICAgd2VleC5pbnN0YWxsKG1vZClcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuY29uc3QgdmFsTWFwID0ge1xyXG4gIGNvbnRhaW46ICdjb250YWluJyxcclxuICBjb3ZlcjogJ2NvdmVyJyxcclxuICBzdHJldGNoOiAnMTAwJSAxMDAlJ1xyXG59XHJcbmNvbnN0IHZhbHMgPSBPYmplY3Qua2V5cyh2YWxNYXApXHJcbmNvbnN0IGRlZmF1bHRWYWwgPSAnc3RyZXRjaCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0ICh3ZWV4KSB7XHJcbiAgICB3ZWV4Ll9fdnVlX18uZGlyZWN0aXZlKCd3ZWV4LXJlc2l6ZScsIGZ1bmN0aW9uIChlbCwgYmluZGluZykge1xyXG4gICAgICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnZmlndXJlJykge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGxldCB2YWx1ZSA9IGJpbmRpbmcudmFsdWVcclxuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBiaW5kaW5nLm9sZHZhbHVlXHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gb2xkVmFsdWUpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAodmFscy5pbmRleE9mKHZhbHVlKSA8PSAtMSkge1xyXG4gICAgICAgIHZhbHVlID0gZGVmYXVsdFZhbFxyXG4gICAgICB9XHJcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gdmFsTWFwW3ZhbHVlXVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxyXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcclxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxyXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXHJcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxyXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcclxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXHJcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcclxuICogdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5pbXBvcnQgcmVzaXplIGZyb20gJy4vcmVzaXplJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHJlc2l6ZVxyXG59XHJcbiIsIi8qXHJcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcclxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXHJcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXHJcbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcclxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxyXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcclxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXHJcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxyXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXHJcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IHJlc2V0Vmlld3BvcnQgfSBmcm9tICcuLi93ZWV4L3ZpZXdwb3J0J1xyXG5cclxuY29uc3QgbWV0YSA9IHtcclxuICAvKipcclxuICAgKiBzZXRWaWV3cG9ydC5cclxuICAgKiBDaGFuZ2luZyB2aWV3cG9ydCBkZXNpZ24gd2lkdGggYXQgcnVudGltZS5cclxuICAgKi9cclxuICBzZXRWaWV3cG9ydCAob3B0aW9ucykge1xyXG4gICAgaWYgKCFvcHRpb25zKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFt2dWUtcmVuZGVyXSBzZXQgdmlld3BvcnQgd2lkdGggaW52YWxpZCBvcHRpb25zOiAke29wdGlvbnN9YClcclxuICAgIH1cclxuICAgIGNvbnN0IG5ld1dpZHRoID0gcGFyc2VJbnQob3B0aW9ucy53aWR0aClcclxuICAgIGlmICghaXNOYU4obmV3V2lkdGgpICYmIG5ld1dpZHRoID4gMCkge1xyXG4gICAgICByZXNldFZpZXdwb3J0KG9wdGlvbnMud2lkdGgpXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgW3Z1ZS1yZW5kZXJdIHNldCB2aWV3cG9ydCB3aWR0aCBpbnZhbGlkIG9wdGlvbnMud2lkdGg6ICR7b3B0aW9ucy53aWR0aH1gKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQgKHdlZXgpIHtcclxuICAgIHdlZXgucmVnaXN0ZXJNb2R1bGUoJ21ldGEnLCBtZXRhKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgd2VleCBmcm9tICcuLi8uLi8uLi9zcmMnXHJcbmltcG9ydCBzY3JvbGxhYmxlIGZyb20gJy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3Njcm9sbGFibGUnXHJcbmltcG9ydCBkaXJlY3RpdmVzIGZyb20gJy4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzJ1xyXG5pbXBvcnQgbWV0YSBmcm9tICcuLi8uLi8uLi9zcmMvbW9kdWxlcy9tZXRhJ1xyXG5cclxuY29uc3QgcHJlSW5pdCA9IHdlZXguaW5pdFxyXG5cclxud2VleC5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gIHByZUluaXQuYXBwbHkod2VleCwgYXJndW1lbnRzKVxyXG4gIHdlZXguaW5zdGFsbChzY3JvbGxhYmxlKVxyXG4gIHdlZXguaW5zdGFsbChtZXRhKVxyXG4gIGZvciAoY29uc3QgayBpbiBkaXJlY3RpdmVzKSB7XHJcbiAgICB3ZWV4Lmluc3RhbGwoZGlyZWN0aXZlc1trXSlcclxuICB9XHJcbn1cclxuXHJcbmlmIChnbG9iYWwuVnVlKSB7XHJcbiAgd2VleC5pbml0KGdsb2JhbC5WdWUpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlZXhcclxuIl0sIm5hbWVzIjpbImRlZmluZWQiLCJ0b0ludGVnZXIiLCJpc09iamVjdCIsInJlcXVpcmUkJDAiLCJkb2N1bWVudCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwiYW5PYmplY3QiLCJ0b1ByaW1pdGl2ZSIsIklFOF9ET01fREVGSU5FIiwiZFAiLCJjcmVhdGVEZXNjIiwiaGFzIiwiaGlkZSIsImdsb2JhbCIsImFGdW5jdGlvbiIsImNvcmUiLCJjdHgiLCJyZWRlZmluZSIsImNvZiIsIklPYmplY3QiLCJtaW4iLCJ0b0lPYmplY3QiLCJ0b0xlbmd0aCIsInRvQWJzb2x1dGVJbmRleCIsInVpZCIsIklFX1BST1RPIiwiJGtleXMiLCJlbnVtQnVnS2V5cyIsImdldEtleXMiLCJQUk9UT1RZUEUiLCJkUHMiLCJjcmVhdGUiLCJkZXNjcmlwdG9yIiwic2V0VG9TdHJpbmdUYWciLCJ0b09iamVjdCIsIiRpdGVyQ3JlYXRlIiwiZ2V0UHJvdG90eXBlT2YiLCJMSUJSQVJZIiwiSXRlcmF0b3JzIiwiJGV4cG9ydCIsIklURVJBVE9SIiwiJGRlZmluZVByb3BlcnR5IiwiVEFHIiwiY2xhc3NvZiIsImdldEl0ZXJGbiIsImlzQXJyYXlJdGVyIiwiY3JlYXRlUHJvcGVydHkiLCJjYWxsIiwiZ09QUyIsInBJRSIsImFyZ3VtZW50cyIsIkFycmF5UHJvdG8iLCJzdGVwIiwiYWRkVG9VbnNjb3BhYmxlcyIsIndrcyIsIiRpdGVyYXRvcnMiLCJwcm9jZXNzIiwiaW52b2tlIiwiY2VsIiwiaHRtbCIsImlzTm9kZSIsIm5hdmlnYXRvciIsIm5ld1Byb21pc2VDYXBhYmlsaXR5IiwiU1BFQ0lFUyIsIkRFU0NSSVBUT1JTIiwiVHlwZUVycm9yIiwibmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUiLCJ1c2VyQWdlbnQiLCJwZXJmb3JtIiwiYW5JbnN0YW5jZSIsInJlcXVpcmUkJDMiLCJzcGVjaWVzQ29uc3RydWN0b3IiLCJyZXF1aXJlJCQ0IiwicmVxdWlyZSQkNSIsInJlcXVpcmUkJDYiLCJwcm9taXNlUmVzb2x2ZSIsInJlcXVpcmUkJDciLCJmb3JPZiIsImNvbnN0IiwibGliIiwibGV0IiwiZW52IiwiaSIsInRvU3RyaW5nIiwiaW5pdCIsImV4dGVuZCIsImV2ZW50IiwiX3VpZCIsImluaXRWaWV3cG9ydCIsIndlZXgiLCJ1dGlscy5hcHBlbmRDc3MiLCJ0YWdNYXAiLCJnZXRUcmFuc2Zvcm1lciIsImJpbmRpbmdTdHlsZU5hbWVzRm9yUHgyUmVtIiwidGhpcyIsIl9pbml0ZWQiLCJyZWN0Iiwic2Nyb2xsYWJsZSIsInZub2RlIiwidGFnIiwiY29sdW1uRG9tIiwiZXh0cmFjdENvbXBvbmVudFN0eWxlIiwiZ2V0UmdiIiwibG9vcEFycmF5IiwiZ2V0U3R5bGVTaGVldEJ5SWQiLCJnZXRMaXN0IiwibG9hZGluZ0luZGljYXRvciIsIm1ldGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkIsY0FBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0VBQzdCLE9BQU8sS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztDQUMxRDs7QUNMRDtBQUNBLFlBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtFQUM3QixJQUFJLEVBQUUsSUFBSSxTQUFTLElBQUUsTUFBTSxTQUFTLENBQUMsd0JBQXdCLEdBQUcsRUFBRSxDQUFDLEdBQUM7RUFDcEUsT0FBTyxFQUFFLENBQUM7Q0FDWDs7OztBQ0FELGFBQWMsR0FBRyxVQUFVLFNBQVMsRUFBRTtFQUNwQyxPQUFPLFVBQVUsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUMxQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUNBLFFBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxHQUFHQyxVQUFTLENB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QUFFLEVBQUU7d0JBQ0osRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNYLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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
