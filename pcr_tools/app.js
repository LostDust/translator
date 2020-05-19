!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 25));
})([
  function (e, t, n) {
    "use strict";
    e.exports = n(12);
  },
  function (e, t, n) {
    e.exports = n(20)();
  },
  ,
  function (e, t) {
    e.exports = function (e, t) {
      (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        (e.__proto__ = t);
    };
  },
  function (e, t, n) {
    var r = n(23);
    (e.exports = p),
      (e.exports.parse = a),
      (e.exports.compile = function (e, t) {
        return l(a(e, t), t);
      }),
      (e.exports.tokensToFunction = l),
      (e.exports.tokensToRegExp = d);
    var o = new RegExp(
      [
        "(\\\\.)",
        "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))",
      ].join("|"),
      "g"
    );
    function a(e, t) {
      for (
        var n, r = [], a = 0, i = 0, l = "", s = (t && t.delimiter) || "/";
        null != (n = o.exec(e));

      ) {
        var f = n[0],
          d = n[1],
          p = n.index;
        if (((l += e.slice(i, p)), (i = p + f.length), d)) l += d[1];
        else {
          var m = e[i],
            h = n[2],
            v = n[3],
            y = n[4],
            g = n[5],
            b = n[6],
            w = n[7];
          l && (r.push(l), (l = ""));
          var x = null != h && null != m && m !== h,
            E = "+" === b || "*" === b,
            k = "?" === b || "*" === b,
            T = n[2] || s,
            S = y || g;
          r.push({
            name: v || a++,
            prefix: h || "",
            delimiter: T,
            optional: k,
            repeat: E,
            partial: x,
            asterisk: !!w,
            pattern: S ? c(S) : w ? ".*" : "[^" + u(T) + "]+?",
          });
        }
      }
      return i < e.length && (l += e.substr(i)), l && r.push(l), r;
    }
    function i(e) {
      return encodeURI(e).replace(/[\/?#]/g, function (e) {
        return "%" + e.charCodeAt(0).toString(16).toUpperCase();
      });
    }
    function l(e, t) {
      for (var n = new Array(e.length), o = 0; o < e.length; o++)
        "object" == typeof e[o] &&
          (n[o] = new RegExp("^(?:" + e[o].pattern + ")$", f(t)));
      return function (t, o) {
        for (
          var a = "",
            l = t || {},
            u = (o || {}).pretty ? i : encodeURIComponent,
            c = 0;
          c < e.length;
          c++
        ) {
          var s = e[c];
          if ("string" != typeof s) {
            var f,
              d = l[s.name];
            if (null == d) {
              if (s.optional) {
                s.partial && (a += s.prefix);
                continue;
              }
              throw new TypeError('Expected "' + s.name + '" to be defined');
            }
            if (r(d)) {
              if (!s.repeat)
                throw new TypeError(
                  'Expected "' +
                    s.name +
                    '" to not repeat, but received `' +
                    JSON.stringify(d) +
                    "`"
                );
              if (0 === d.length) {
                if (s.optional) continue;
                throw new TypeError(
                  'Expected "' + s.name + '" to not be empty'
                );
              }
              for (var p = 0; p < d.length; p++) {
                if (((f = u(d[p])), !n[c].test(f)))
                  throw new TypeError(
                    'Expected all "' +
                      s.name +
                      '" to match "' +
                      s.pattern +
                      '", but received `' +
                      JSON.stringify(f) +
                      "`"
                  );
                a += (0 === p ? s.prefix : s.delimiter) + f;
              }
            } else {
              if (
                ((f = s.asterisk
                  ? encodeURI(d).replace(/[?#]/g, function (e) {
                      return "%" + e.charCodeAt(0).toString(16).toUpperCase();
                    })
                  : u(d)),
                !n[c].test(f))
              )
                throw new TypeError(
                  'Expected "' +
                    s.name +
                    '" to match "' +
                    s.pattern +
                    '", but received "' +
                    f +
                    '"'
                );
              a += s.prefix + f;
            }
          } else a += s;
        }
        return a;
      };
    }
    function u(e) {
      return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
    }
    function c(e) {
      return e.replace(/([=!:$\/()])/g, "\\$1");
    }
    function s(e, t) {
      return (e.keys = t), e;
    }
    function f(e) {
      return e && e.sensitive ? "" : "i";
    }
    function d(e, t, n) {
      r(t) || ((n = t || n), (t = []));
      for (
        var o = (n = n || {}).strict, a = !1 !== n.end, i = "", l = 0;
        l < e.length;
        l++
      ) {
        var c = e[l];
        if ("string" == typeof c) i += u(c);
        else {
          var d = u(c.prefix),
            p = "(?:" + c.pattern + ")";
          t.push(c),
            c.repeat && (p += "(?:" + d + p + ")*"),
            (i += p = c.optional
              ? c.partial
                ? d + "(" + p + ")?"
                : "(?:" + d + "(" + p + "))?"
              : d + "(" + p + ")");
        }
      }
      var m = u(n.delimiter || "/"),
        h = i.slice(-m.length) === m;
      return (
        o || (i = (h ? i.slice(0, -m.length) : i) + "(?:" + m + "(?=$))?"),
        (i += a ? "$" : o && h ? "" : "(?=" + m + "|$)"),
        s(new RegExp("^" + i, f(n)), t)
      );
    }
    function p(e, t, n) {
      return (
        r(t) || ((n = t || n), (t = [])),
        (n = n || {}),
        e instanceof RegExp
          ? (function (e, t) {
              var n = e.source.match(/\((?!\?)/g);
              if (n)
                for (var r = 0; r < n.length; r++)
                  t.push({
                    name: r,
                    prefix: null,
                    delimiter: null,
                    optional: !1,
                    repeat: !1,
                    partial: !1,
                    asterisk: !1,
                    pattern: null,
                  });
              return s(e, t);
            })(e, t)
          : r(e)
          ? (function (e, t, n) {
              for (var r = [], o = 0; o < e.length; o++)
                r.push(p(e[o], t, n).source);
              return s(new RegExp("(?:" + r.join("|") + ")", f(n)), t);
            })(e, t, n)
          : (function (e, t, n) {
              return d(a(e, n), t, n);
            })(e, t, n)
      );
    }
  },
  function (e, t, n) {
    "use strict";
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r =
        Object.getOwnPropertySymbols,
      o = Object.prototype.hasOwnProperty,
      a = Object.prototype.propertyIsEnumerable;
    function i(e) {
      if (null == e)
        throw new TypeError(
          "Object.assign cannot be called with null or undefined"
        );
      return Object(e);
    }
    e.exports = (function () {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
          return !1;
        for (var t = {}, n = 0; n < 10; n++)
          t["_" + String.fromCharCode(n)] = n;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(t)
            .map(function (e) {
              return t[e];
            })
            .join("")
        )
          return !1;
        var r = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function (e) {
            r[e] = e;
          }),
          "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        );
      } catch (e) {
        return !1;
      }
    })()
      ? Object.assign
      : function (e, t) {
          for (var n, l, u = i(e), c = 1; c < arguments.length; c++) {
            for (var s in (n = Object(arguments[c])))
              o.call(n, s) && (u[s] = n[s]);
            if (r) {
              l = r(n);
              for (var f = 0; f < l.length; f++)
                a.call(n, l[f]) && (u[l[f]] = n[l[f]]);
            }
          }
          return u;
        };
  },
  function (e, t, n) {
    "use strict";
    e.exports = n(24);
  },
  function (e, t, n) {
    "use strict";
    !(function e() {
      if (
        "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
      ) {
        0;
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
        } catch (e) {
          console.error(e);
        }
      }
    })(),
      (e.exports = n(13));
  },
  function (e) {
    e.exports = JSON.parse(
      '[{"name":"黑骑","color":"#b2bec3","effect":12,"active":true,"timing":["122","109","052","036","019","002"],"axis":[]},{"name":"狼吼","color":"#74b9ff","effect":12,"active":true,"timing":["122","109","051","035","018","001"],"axis":[]},{"name":"深月","color":"#a29bfe","effect":8,"active":true,"timing":["122","108","050","034","017"],"axis":[]},{"name":"狼ub","color":"#70a1ff","effect":18,"active":false,"timing":["122","108","050","034"],"axis":[]}]'
    );
  },
  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
      react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
        react__WEBPACK_IMPORTED_MODULE_0__
      );
    function _slicedToArray(e, t) {
      return (
        _arrayWithHoles(e) ||
        _iterableToArrayLimit(e, t) ||
        _unsupportedIterableToArray(e, t) ||
        _nonIterableRest()
      );
    }
    function _nonIterableRest() {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }
    function _unsupportedIterableToArray(e, t) {
      if (e) {
        if ("string" == typeof e) return _arrayLikeToArray(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return (
          "Object" === n && e.constructor && (n = e.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(n)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? _arrayLikeToArray(e, t)
            : void 0
        );
      }
    }
    function _arrayLikeToArray(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function _iterableToArrayLimit(e, t) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
        var n = [],
          r = !0,
          o = !1,
          a = void 0;
        try {
          for (
            var i, l = e[Symbol.iterator]();
            !(r = (i = l.next()).done) &&
            (n.push(i.value), !t || n.length !== t);
            r = !0
          );
        } catch (e) {
          (o = !0), (a = e);
        } finally {
          try {
            r || null == l.return || l.return();
          } finally {
            if (o) throw a;
          }
        }
        return n;
      }
    }
    function _arrayWithHoles(e) {
      if (Array.isArray(e)) return e;
    }
    function Computed(props) {
      var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
        _useState2 = _slicedToArray(_useState, 2),
        margin = _useState2[0],
        setMargin = _useState2[1],
        _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
        _useState4 = _slicedToArray(_useState3, 2),
        amount = _useState4[0],
        setAmount = _useState4[1];
      function onUpdate(name, e) {
        eval("set".concat(name, "(Number(e.target.value))"));
      }
      function _onBlur(e) {
        switch (e) {
          case "Margin":
            setAmount(9 * margin);
            break;
          case "Amount":
            setMargin(amount / 9);
        }
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "section",
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "p",
          null,
          "剩余血量"
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "text",
          placeholder: "剩余血量",
          value: margin,
          onChange: function (e) {
            return onUpdate("Margin", e);
          },
          onBlur: function () {
            return _onBlur("Margin");
          },
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "span",
          null,
          "W"
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "p",
          null,
          "伤害量"
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "text",
          placeholder: "伤害",
          value: amount,
          onChange: function (e) {
            return onUpdate("Amount", e);
          },
          onBlur: function () {
            return _onBlur("Amount");
          },
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "span",
          null,
          "W"
        )
      );
    }
    __webpack_exports__.a = Computed;
  },
  function (e, t, n) {
    "use strict";
    (function (t) {
      var n = "__global_unique_id__";
      e.exports = function () {
        return (t[n] = (t[n] || 0) + 1);
      };
    }.call(this, n(22)));
  },
  function (e, t, n) {
    "use strict";
    var r = n(6),
      o = {
        childContextTypes: !0,
        contextType: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromError: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0,
      },
      a = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0,
      },
      i = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0,
      },
      l = {};
    function u(e) {
      return r.isMemo(e) ? i : l[e.$$typeof] || o;
    }
    (l[r.ForwardRef] = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
    }),
      (l[r.Memo] = i);
    var c = Object.defineProperty,
      s = Object.getOwnPropertyNames,
      f = Object.getOwnPropertySymbols,
      d = Object.getOwnPropertyDescriptor,
      p = Object.getPrototypeOf,
      m = Object.prototype;
    e.exports = function e(t, n, r) {
      if ("string" != typeof n) {
        if (m) {
          var o = p(n);
          o && o !== m && e(t, o, r);
        }
        var i = s(n);
        f && (i = i.concat(f(n)));
        for (var l = u(t), h = u(n), v = 0; v < i.length; ++v) {
          var y = i[v];
          if (!(a[y] || (r && r[y]) || (h && h[y]) || (l && l[y]))) {
            var g = d(n, y);
            try {
              c(t, y, g);
            } catch (e) {}
          }
        }
      }
      return t;
    };
  },
  function (e, t, n) {
    "use strict";
    /** @license React v16.13.1
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(5),
      o = "function" == typeof Symbol && Symbol.for,
      a = o ? Symbol.for("react.element") : 60103,
      i = o ? Symbol.for("react.portal") : 60106,
      l = o ? Symbol.for("react.fragment") : 60107,
      u = o ? Symbol.for("react.strict_mode") : 60108,
      c = o ? Symbol.for("react.profiler") : 60114,
      s = o ? Symbol.for("react.provider") : 60109,
      f = o ? Symbol.for("react.context") : 60110,
      d = o ? Symbol.for("react.forward_ref") : 60112,
      p = o ? Symbol.for("react.suspense") : 60113,
      m = o ? Symbol.for("react.memo") : 60115,
      h = o ? Symbol.for("react.lazy") : 60116,
      v = "function" == typeof Symbol && Symbol.iterator;
    function y(e) {
      for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
      return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    var g = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      b = {};
    function w(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = b),
        (this.updater = n || g);
    }
    function x() {}
    function E(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = b),
        (this.updater = n || g);
    }
    (w.prototype.isReactComponent = {}),
      (w.prototype.setState = function (e, t) {
        if ("object" != typeof e && "function" != typeof e && null != e)
          throw Error(y(85));
        this.updater.enqueueSetState(this, e, t, "setState");
      }),
      (w.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      }),
      (x.prototype = w.prototype);
    var k = (E.prototype = new x());
    (k.constructor = E), r(k, w.prototype), (k.isPureReactComponent = !0);
    var T = { current: null },
      S = Object.prototype.hasOwnProperty,
      _ = { key: !0, ref: !0, __self: !0, __source: !0 };
    function C(e, t, n) {
      var r,
        o = {},
        i = null,
        l = null;
      if (null != t)
        for (r in (void 0 !== t.ref && (l = t.ref),
        void 0 !== t.key && (i = "" + t.key),
        t))
          S.call(t, r) && !_.hasOwnProperty(r) && (o[r] = t[r]);
      var u = arguments.length - 2;
      if (1 === u) o.children = n;
      else if (1 < u) {
        for (var c = Array(u), s = 0; s < u; s++) c[s] = arguments[s + 2];
        o.children = c;
      }
      if (e && e.defaultProps)
        for (r in (u = e.defaultProps)) void 0 === o[r] && (o[r] = u[r]);
      return {
        $$typeof: a,
        type: e,
        key: i,
        ref: l,
        props: o,
        _owner: T.current,
      };
    }
    function P(e) {
      return "object" == typeof e && null !== e && e.$$typeof === a;
    }
    var O = /\/+/g,
      A = [];
    function N(e, t, n, r) {
      if (A.length) {
        var o = A.pop();
        return (
          (o.result = e),
          (o.keyPrefix = t),
          (o.func = n),
          (o.context = r),
          (o.count = 0),
          o
        );
      }
      return { result: e, keyPrefix: t, func: n, context: r, count: 0 };
    }
    function M(e) {
      (e.result = null),
        (e.keyPrefix = null),
        (e.func = null),
        (e.context = null),
        (e.count = 0),
        10 > A.length && A.push(e);
    }
    function R(e, t, n) {
      return null == e
        ? 0
        : (function e(t, n, r, o) {
            var l = typeof t;
            ("undefined" !== l && "boolean" !== l) || (t = null);
            var u = !1;
            if (null === t) u = !0;
            else
              switch (l) {
                case "string":
                case "number":
                  u = !0;
                  break;
                case "object":
                  switch (t.$$typeof) {
                    case a:
                    case i:
                      u = !0;
                  }
              }
            if (u) return r(o, t, "" === n ? "." + I(t, 0) : n), 1;
            if (((u = 0), (n = "" === n ? "." : n + ":"), Array.isArray(t)))
              for (var c = 0; c < t.length; c++) {
                var s = n + I((l = t[c]), c);
                u += e(l, s, r, o);
              }
            else if (
              (null === t || "object" != typeof t
                ? (s = null)
                : (s =
                    "function" == typeof (s = (v && t[v]) || t["@@iterator"])
                      ? s
                      : null),
              "function" == typeof s)
            )
              for (t = s.call(t), c = 0; !(l = t.next()).done; )
                u += e((l = l.value), (s = n + I(l, c++)), r, o);
            else if ("object" === l)
              throw (
                ((r = "" + t),
                Error(
                  y(
                    31,
                    "[object Object]" === r
                      ? "object with keys {" + Object.keys(t).join(", ") + "}"
                      : r,
                    ""
                  )
                ))
              );
            return u;
          })(e, "", t, n);
    }
    function I(e, t) {
      return "object" == typeof e && null !== e && null != e.key
        ? (function (e) {
            var t = { "=": "=0", ":": "=2" };
            return (
              "$" +
              ("" + e).replace(/[=:]/g, function (e) {
                return t[e];
              })
            );
          })(e.key)
        : t.toString(36);
    }
    function z(e, t) {
      e.func.call(e.context, t, e.count++);
    }
    function D(e, t, n) {
      var r = e.result,
        o = e.keyPrefix;
      (e = e.func.call(e.context, t, e.count++)),
        Array.isArray(e)
          ? L(e, r, n, function (e) {
              return e;
            })
          : null != e &&
            (P(e) &&
              (e = (function (e, t) {
                return {
                  $$typeof: a,
                  type: e.type,
                  key: t,
                  ref: e.ref,
                  props: e.props,
                  _owner: e._owner,
                };
              })(
                e,
                o +
                  (!e.key || (t && t.key === e.key)
                    ? ""
                    : ("" + e.key).replace(O, "$&/") + "/") +
                  n
              )),
            r.push(e));
    }
    function L(e, t, n, r, o) {
      var a = "";
      null != n && (a = ("" + n).replace(O, "$&/") + "/"),
        R(e, D, (t = N(t, a, r, o))),
        M(t);
    }
    var j = { current: null };
    function F() {
      var e = j.current;
      if (null === e) throw Error(y(321));
      return e;
    }
    var U = {
      ReactCurrentDispatcher: j,
      ReactCurrentBatchConfig: { suspense: null },
      ReactCurrentOwner: T,
      IsSomeRendererActing: { current: !1 },
      assign: r,
    };
    (t.Children = {
      map: function (e, t, n) {
        if (null == e) return e;
        var r = [];
        return L(e, r, null, t, n), r;
      },
      forEach: function (e, t, n) {
        if (null == e) return e;
        R(e, z, (t = N(null, null, t, n))), M(t);
      },
      count: function (e) {
        return R(
          e,
          function () {
            return null;
          },
          null
        );
      },
      toArray: function (e) {
        var t = [];
        return (
          L(e, t, null, function (e) {
            return e;
          }),
          t
        );
      },
      only: function (e) {
        if (!P(e)) throw Error(y(143));
        return e;
      },
    }),
      (t.Component = w),
      (t.Fragment = l),
      (t.Profiler = c),
      (t.PureComponent = E),
      (t.StrictMode = u),
      (t.Suspense = p),
      (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = U),
      (t.cloneElement = function (e, t, n) {
        if (null == e) throw Error(y(267, e));
        var o = r({}, e.props),
          i = e.key,
          l = e.ref,
          u = e._owner;
        if (null != t) {
          if (
            (void 0 !== t.ref && ((l = t.ref), (u = T.current)),
            void 0 !== t.key && (i = "" + t.key),
            e.type && e.type.defaultProps)
          )
            var c = e.type.defaultProps;
          for (s in t)
            S.call(t, s) &&
              !_.hasOwnProperty(s) &&
              (o[s] = void 0 === t[s] && void 0 !== c ? c[s] : t[s]);
        }
        var s = arguments.length - 2;
        if (1 === s) o.children = n;
        else if (1 < s) {
          c = Array(s);
          for (var f = 0; f < s; f++) c[f] = arguments[f + 2];
          o.children = c;
        }
        return {
          $$typeof: a,
          type: e.type,
          key: i,
          ref: l,
          props: o,
          _owner: u,
        };
      }),
      (t.createContext = function (e, t) {
        return (
          void 0 === t && (t = null),
          ((e = {
            $$typeof: f,
            _calculateChangedBits: t,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }).Provider = { $$typeof: s, _context: e }),
          (e.Consumer = e)
        );
      }),
      (t.createElement = C),
      (t.createFactory = function (e) {
        var t = C.bind(null, e);
        return (t.type = e), t;
      }),
      (t.createRef = function () {
        return { current: null };
      }),
      (t.forwardRef = function (e) {
        return { $$typeof: d, render: e };
      }),
      (t.isValidElement = P),
      (t.lazy = function (e) {
        return { $$typeof: h, _ctor: e, _status: -1, _result: null };
      }),
      (t.memo = function (e, t) {
        return { $$typeof: m, type: e, compare: void 0 === t ? null : t };
      }),
      (t.useCallback = function (e, t) {
        return F().useCallback(e, t);
      }),
      (t.useContext = function (e, t) {
        return F().useContext(e, t);
      }),
      (t.useDebugValue = function () {}),
      (t.useEffect = function (e, t) {
        return F().useEffect(e, t);
      }),
      (t.useImperativeHandle = function (e, t, n) {
        return F().useImperativeHandle(e, t, n);
      }),
      (t.useLayoutEffect = function (e, t) {
        return F().useLayoutEffect(e, t);
      }),
      (t.useMemo = function (e, t) {
        return F().useMemo(e, t);
      }),
      (t.useReducer = function (e, t, n) {
        return F().useReducer(e, t, n);
      }),
      (t.useRef = function (e) {
        return F().useRef(e);
      }),
      (t.useState = function (e) {
        return F().useState(e);
      }),
      (t.version = "16.13.1");
  },
  function (e, t, n) {
    "use strict";
    /** @license React v16.13.1
     * react-dom.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(0),
      o = n(5),
      a = n(14);
    function i(e) {
      for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
      return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    if (!r) throw Error(i(227));
    function l(e, t, n, r, o, a, i, l, u) {
      var c = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, c);
      } catch (e) {
        this.onError(e);
      }
    }
    var u = !1,
      c = null,
      s = !1,
      f = null,
      d = {
        onError: function (e) {
          (u = !0), (c = e);
        },
      };
    function p(e, t, n, r, o, a, i, s, f) {
      (u = !1), (c = null), l.apply(d, arguments);
    }
    var m = null,
      h = null,
      v = null;
    function y(e, t, n) {
      var r = e.type || "unknown-event";
      (e.currentTarget = v(n)),
        (function (e, t, n, r, o, a, l, d, m) {
          if ((p.apply(this, arguments), u)) {
            if (!u) throw Error(i(198));
            var h = c;
            (u = !1), (c = null), s || ((s = !0), (f = h));
          }
        })(r, t, void 0, e),
        (e.currentTarget = null);
    }
    var g = null,
      b = {};
    function w() {
      if (g)
        for (var e in b) {
          var t = b[e],
            n = g.indexOf(e);
          if (!(-1 < n)) throw Error(i(96, e));
          if (!E[n]) {
            if (!t.extractEvents) throw Error(i(97, e));
            for (var r in ((E[n] = t), (n = t.eventTypes))) {
              var o = void 0,
                a = n[r],
                l = t,
                u = r;
              if (k.hasOwnProperty(u)) throw Error(i(99, u));
              k[u] = a;
              var c = a.phasedRegistrationNames;
              if (c) {
                for (o in c) c.hasOwnProperty(o) && x(c[o], l, u);
                o = !0;
              } else
                a.registrationName
                  ? (x(a.registrationName, l, u), (o = !0))
                  : (o = !1);
              if (!o) throw Error(i(98, r, e));
            }
          }
        }
    }
    function x(e, t, n) {
      if (T[e]) throw Error(i(100, e));
      (T[e] = t), (S[e] = t.eventTypes[n].dependencies);
    }
    var E = [],
      k = {},
      T = {},
      S = {};
    function _(e) {
      var t,
        n = !1;
      for (t in e)
        if (e.hasOwnProperty(t)) {
          var r = e[t];
          if (!b.hasOwnProperty(t) || b[t] !== r) {
            if (b[t]) throw Error(i(102, t));
            (b[t] = r), (n = !0);
          }
        }
      n && w();
    }
    var C = !(
        "undefined" == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      ),
      P = null,
      O = null,
      A = null;
    function N(e) {
      if ((e = h(e))) {
        if ("function" != typeof P) throw Error(i(280));
        var t = e.stateNode;
        t && ((t = m(t)), P(e.stateNode, e.type, t));
      }
    }
    function M(e) {
      O ? (A ? A.push(e) : (A = [e])) : (O = e);
    }
    function R() {
      if (O) {
        var e = O,
          t = A;
        if (((A = O = null), N(e), t)) for (e = 0; e < t.length; e++) N(t[e]);
      }
    }
    function I(e, t) {
      return e(t);
    }
    function z(e, t, n, r, o) {
      return e(t, n, r, o);
    }
    function D() {}
    var L = I,
      j = !1,
      F = !1;
    function U() {
      (null === O && null === A) || (D(), R());
    }
    function B(e, t, n) {
      if (F) return e(t, n);
      F = !0;
      try {
        return L(e, t, n);
      } finally {
        (F = !1), U();
      }
    }
    var W = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      V = Object.prototype.hasOwnProperty,
      $ = {},
      H = {};
    function Q(e, t, n, r, o, a) {
      (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
        (this.attributeName = r),
        (this.attributeNamespace = o),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = a);
    }
    var K = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (e) {
        K[e] = new Q(e, 0, !1, e, null, !1);
      }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
      ].forEach(function (e) {
        var t = e[0];
        K[t] = new Q(t, 1, !1, e[1], null, !1);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
        e
      ) {
        K[e] = new Q(e, 2, !1, e.toLowerCase(), null, !1);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha",
      ].forEach(function (e) {
        K[e] = new Q(e, 2, !1, e, null, !1);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function (e) {
          K[e] = new Q(e, 3, !1, e.toLowerCase(), null, !1);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function (e) {
        K[e] = new Q(e, 3, !0, e, null, !1);
      }),
      ["capture", "download"].forEach(function (e) {
        K[e] = new Q(e, 4, !1, e, null, !1);
      }),
      ["cols", "rows", "size", "span"].forEach(function (e) {
        K[e] = new Q(e, 6, !1, e, null, !1);
      }),
      ["rowSpan", "start"].forEach(function (e) {
        K[e] = new Q(e, 5, !1, e.toLowerCase(), null, !1);
      });
    var q = /[\-:]([a-z])/g;
    function X(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(q, X);
        K[t] = new Q(t, 1, !1, e, null, !1);
      }),
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(q, X);
          K[t] = new Q(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
        var t = e.replace(q, X);
        K[t] = new Q(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
      }),
      ["tabIndex", "crossOrigin"].forEach(function (e) {
        K[e] = new Q(e, 1, !1, e.toLowerCase(), null, !1);
      }),
      (K.xlinkHref = new Q(
        "xlinkHref",
        1,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0
      )),
      ["src", "href", "action", "formAction"].forEach(function (e) {
        K[e] = new Q(e, 1, !1, e.toLowerCase(), null, !0);
      });
    var Y = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function G(e, t, n, r) {
      var o = K.hasOwnProperty(t) ? K[t] : null;
      (null !== o
        ? 0 === o.type
        : !r &&
          2 < t.length &&
          ("o" === t[0] || "O" === t[0]) &&
          ("n" === t[1] || "N" === t[1])) ||
        ((function (e, t, n, r) {
          if (
            null == t ||
            (function (e, t, n, r) {
              if (null !== n && 0 === n.type) return !1;
              switch (typeof t) {
                case "function":
                case "symbol":
                  return !0;
                case "boolean":
                  return (
                    !r &&
                    (null !== n
                      ? !n.acceptsBooleans
                      : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                        "aria-" !== e)
                  );
                default:
                  return !1;
              }
            })(e, t, n, r)
          )
            return !0;
          if (r) return !1;
          if (null !== n)
            switch (n.type) {
              case 3:
                return !t;
              case 4:
                return !1 === t;
              case 5:
                return isNaN(t);
              case 6:
                return isNaN(t) || 1 > t;
            }
          return !1;
        })(t, n, o, r) && (n = null),
        r || null === o
          ? (function (e) {
              return (
                !!V.call(H, e) ||
                (!V.call($, e) && (W.test(e) ? (H[e] = !0) : (($[e] = !0), !1)))
              );
            })(t) &&
            (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
          : o.mustUseProperty
          ? (e[o.propertyName] = null === n ? 3 !== o.type && "" : n)
          : ((t = o.attributeName),
            (r = o.attributeNamespace),
            null === n
              ? e.removeAttribute(t)
              : ((n =
                  3 === (o = o.type) || (4 === o && !0 === n) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    Y.hasOwnProperty("ReactCurrentDispatcher") ||
      (Y.ReactCurrentDispatcher = { current: null }),
      Y.hasOwnProperty("ReactCurrentBatchConfig") ||
        (Y.ReactCurrentBatchConfig = { suspense: null });
    var J = /^(.*)[\\\/]/,
      Z = "function" == typeof Symbol && Symbol.for,
      ee = Z ? Symbol.for("react.element") : 60103,
      te = Z ? Symbol.for("react.portal") : 60106,
      ne = Z ? Symbol.for("react.fragment") : 60107,
      re = Z ? Symbol.for("react.strict_mode") : 60108,
      oe = Z ? Symbol.for("react.profiler") : 60114,
      ae = Z ? Symbol.for("react.provider") : 60109,
      ie = Z ? Symbol.for("react.context") : 60110,
      le = Z ? Symbol.for("react.concurrent_mode") : 60111,
      ue = Z ? Symbol.for("react.forward_ref") : 60112,
      ce = Z ? Symbol.for("react.suspense") : 60113,
      se = Z ? Symbol.for("react.suspense_list") : 60120,
      fe = Z ? Symbol.for("react.memo") : 60115,
      de = Z ? Symbol.for("react.lazy") : 60116,
      pe = Z ? Symbol.for("react.block") : 60121,
      me = "function" == typeof Symbol && Symbol.iterator;
    function he(e) {
      return null === e || "object" != typeof e
        ? null
        : "function" == typeof (e = (me && e[me]) || e["@@iterator"])
        ? e
        : null;
    }
    function ve(e) {
      if (null == e) return null;
      if ("function" == typeof e) return e.displayName || e.name || null;
      if ("string" == typeof e) return e;
      switch (e) {
        case ne:
          return "Fragment";
        case te:
          return "Portal";
        case oe:
          return "Profiler";
        case re:
          return "StrictMode";
        case ce:
          return "Suspense";
        case se:
          return "SuspenseList";
      }
      if ("object" == typeof e)
        switch (e.$$typeof) {
          case ie:
            return "Context.Consumer";
          case ae:
            return "Context.Provider";
          case ue:
            var t = e.render;
            return (
              (t = t.displayName || t.name || ""),
              e.displayName ||
                ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef")
            );
          case fe:
            return ve(e.type);
          case pe:
            return ve(e.render);
          case de:
            if ((e = 1 === e._status ? e._result : null)) return ve(e);
        }
      return null;
    }
    function ye(e) {
      var t = "";
      do {
        e: switch (e.tag) {
          case 3:
          case 4:
          case 6:
          case 7:
          case 10:
          case 9:
            var n = "";
            break e;
          default:
            var r = e._debugOwner,
              o = e._debugSource,
              a = ve(e.type);
            (n = null),
              r && (n = ve(r.type)),
              (r = a),
              (a = ""),
              o
                ? (a =
                    " (at " +
                    o.fileName.replace(J, "") +
                    ":" +
                    o.lineNumber +
                    ")")
                : n && (a = " (created by " + n + ")"),
              (n = "\n    in " + (r || "Unknown") + a);
        }
        (t += n), (e = e.return);
      } while (e);
      return t;
    }
    function ge(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "object":
        case "string":
        case "undefined":
          return e;
        default:
          return "";
      }
    }
    function be(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        "input" === e.toLowerCase() &&
        ("checkbox" === t || "radio" === t)
      );
    }
    function we(e) {
      e._valueTracker ||
        (e._valueTracker = (function (e) {
          var t = be(e) ? "checked" : "value",
            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            r = "" + e[t];
          if (
            !e.hasOwnProperty(t) &&
            void 0 !== n &&
            "function" == typeof n.get &&
            "function" == typeof n.set
          ) {
            var o = n.get,
              a = n.set;
            return (
              Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                  return o.call(this);
                },
                set: function (e) {
                  (r = "" + e), a.call(this, e);
                },
              }),
              Object.defineProperty(e, t, { enumerable: n.enumerable }),
              {
                getValue: function () {
                  return r;
                },
                setValue: function (e) {
                  r = "" + e;
                },
                stopTracking: function () {
                  (e._valueTracker = null), delete e[t];
                },
              }
            );
          }
        })(e));
    }
    function xe(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = "";
      return (
        e && (r = be(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r) !== n && (t.setValue(e), !0)
      );
    }
    function Ee(e, t) {
      var n = t.checked;
      return o({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: null != n ? n : e._wrapperState.initialChecked,
      });
    }
    function ke(e, t) {
      var n = null == t.defaultValue ? "" : t.defaultValue,
        r = null != t.checked ? t.checked : t.defaultChecked;
      (n = ge(null != t.value ? t.value : n)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            "checkbox" === t.type || "radio" === t.type
              ? null != t.checked
              : null != t.value,
        });
    }
    function Te(e, t) {
      null != (t = t.checked) && G(e, "checked", t, !1);
    }
    function Se(e, t) {
      Te(e, t);
      var n = ge(t.value),
        r = t.type;
      if (null != n)
        "number" === r
          ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
          : e.value !== "" + n && (e.value = "" + n);
      else if ("submit" === r || "reset" === r)
        return void e.removeAttribute("value");
      t.hasOwnProperty("value")
        ? Ce(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && Ce(e, t.type, ge(t.defaultValue)),
        null == t.checked &&
          null != t.defaultChecked &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function _e(e, t, n) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
          !(
            ("submit" !== r && "reset" !== r) ||
            (void 0 !== t.value && null !== t.value)
          )
        )
          return;
        (t = "" + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t);
      }
      "" !== (n = e.name) && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        "" !== n && (e.name = n);
    }
    function Ce(e, t, n) {
      ("number" === t && e.ownerDocument.activeElement === e) ||
        (null == n
          ? (e.defaultValue = "" + e._wrapperState.initialValue)
          : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
    }
    function Pe(e, t) {
      return (
        (e = o({ children: void 0 }, t)),
        (t = (function (e) {
          var t = "";
          return (
            r.Children.forEach(e, function (e) {
              null != e && (t += e);
            }),
            t
          );
        })(t.children)) && (e.children = t),
        e
      );
    }
    function Oe(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
        for (n = 0; n < e.length; n++)
          (o = t.hasOwnProperty("$" + e[n].value)),
            e[n].selected !== o && (e[n].selected = o),
            o && r && (e[n].defaultSelected = !0);
      } else {
        for (n = "" + ge(n), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === n)
            return (
              (e[o].selected = !0), void (r && (e[o].defaultSelected = !0))
            );
          null !== t || e[o].disabled || (t = e[o]);
        }
        null !== t && (t.selected = !0);
      }
    }
    function Ae(e, t) {
      if (null != t.dangerouslySetInnerHTML) throw Error(i(91));
      return o({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
      });
    }
    function Ne(e, t) {
      var n = t.value;
      if (null == n) {
        if (((n = t.children), (t = t.defaultValue), null != n)) {
          if (null != t) throw Error(i(92));
          if (Array.isArray(n)) {
            if (!(1 >= n.length)) throw Error(i(93));
            n = n[0];
          }
          t = n;
        }
        null == t && (t = ""), (n = t);
      }
      e._wrapperState = { initialValue: ge(n) };
    }
    function Me(e, t) {
      var n = ge(t.value),
        r = ge(t.defaultValue);
      null != n &&
        ((n = "" + n) !== e.value && (e.value = n),
        null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
        null != r && (e.defaultValue = "" + r);
    }
    function Re(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        "" !== t &&
        null !== t &&
        (e.value = t);
    }
    var Ie = "http://www.w3.org/1999/xhtml",
      ze = "http://www.w3.org/2000/svg";
    function De(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function Le(e, t) {
      return null == e || "http://www.w3.org/1999/xhtml" === e
        ? De(t)
        : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
        ? "http://www.w3.org/1999/xhtml"
        : e;
    }
    var je,
      Fe = (function (e) {
        return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, o) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== ze || "innerHTML" in e) e.innerHTML = t;
        else {
          for (
            (je = je || document.createElement("div")).innerHTML =
              "<svg>" + t.valueOf().toString() + "</svg>",
              t = je.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function Ue(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && 3 === n.nodeType)
          return void (n.nodeValue = t);
      }
      e.textContent = t;
    }
    function Be(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
      );
    }
    var We = {
        animationend: Be("Animation", "AnimationEnd"),
        animationiteration: Be("Animation", "AnimationIteration"),
        animationstart: Be("Animation", "AnimationStart"),
        transitionend: Be("Transition", "TransitionEnd"),
      },
      Ve = {},
      $e = {};
    function He(e) {
      if (Ve[e]) return Ve[e];
      if (!We[e]) return e;
      var t,
        n = We[e];
      for (t in n) if (n.hasOwnProperty(t) && t in $e) return (Ve[e] = n[t]);
      return e;
    }
    C &&
      (($e = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete We.animationend.animation,
        delete We.animationiteration.animation,
        delete We.animationstart.animation),
      "TransitionEvent" in window || delete We.transitionend.transition);
    var Qe = He("animationend"),
      Ke = He("animationiteration"),
      qe = He("animationstart"),
      Xe = He("transitionend"),
      Ye = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
      Ge = new ("function" == typeof WeakMap ? WeakMap : Map)();
    function Je(e) {
      var t = Ge.get(e);
      return void 0 === t && ((t = new Map()), Ge.set(e, t)), t;
    }
    function Ze(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do {
          0 != (1026 & (t = e).effectTag) && (n = t.return), (e = t.return);
        } while (e);
      }
      return 3 === t.tag ? n : null;
    }
    function et(e) {
      if (13 === e.tag) {
        var t = e.memoizedState;
        if (
          (null === t && null !== (e = e.alternate) && (t = e.memoizedState),
          null !== t)
        )
          return t.dehydrated;
      }
      return null;
    }
    function tt(e) {
      if (Ze(e) !== e) throw Error(i(188));
    }
    function nt(e) {
      if (
        !(e = (function (e) {
          var t = e.alternate;
          if (!t) {
            if (null === (t = Ze(e))) throw Error(i(188));
            return t !== e ? null : e;
          }
          for (var n = e, r = t; ; ) {
            var o = n.return;
            if (null === o) break;
            var a = o.alternate;
            if (null === a) {
              if (null !== (r = o.return)) {
                n = r;
                continue;
              }
              break;
            }
            if (o.child === a.child) {
              for (a = o.child; a; ) {
                if (a === n) return tt(o), e;
                if (a === r) return tt(o), t;
                a = a.sibling;
              }
              throw Error(i(188));
            }
            if (n.return !== r.return) (n = o), (r = a);
            else {
              for (var l = !1, u = o.child; u; ) {
                if (u === n) {
                  (l = !0), (n = o), (r = a);
                  break;
                }
                if (u === r) {
                  (l = !0), (r = o), (n = a);
                  break;
                }
                u = u.sibling;
              }
              if (!l) {
                for (u = a.child; u; ) {
                  if (u === n) {
                    (l = !0), (n = a), (r = o);
                    break;
                  }
                  if (u === r) {
                    (l = !0), (r = a), (n = o);
                    break;
                  }
                  u = u.sibling;
                }
                if (!l) throw Error(i(189));
              }
            }
            if (n.alternate !== r) throw Error(i(190));
          }
          if (3 !== n.tag) throw Error(i(188));
          return n.stateNode.current === n ? e : t;
        })(e))
      )
        return null;
      for (var t = e; ; ) {
        if (5 === t.tag || 6 === t.tag) return t;
        if (t.child) (t.child.return = t), (t = t.child);
        else {
          if (t === e) break;
          for (; !t.sibling; ) {
            if (!t.return || t.return === e) return null;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }
      return null;
    }
    function rt(e, t) {
      if (null == t) throw Error(i(30));
      return null == e
        ? t
        : Array.isArray(e)
        ? Array.isArray(t)
          ? (e.push.apply(e, t), e)
          : (e.push(t), e)
        : Array.isArray(t)
        ? [e].concat(t)
        : [e, t];
    }
    function ot(e, t, n) {
      Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
    }
    var at = null;
    function it(e) {
      if (e) {
        var t = e._dispatchListeners,
          n = e._dispatchInstances;
        if (Array.isArray(t))
          for (var r = 0; r < t.length && !e.isPropagationStopped(); r++)
            y(e, t[r], n[r]);
        else t && y(e, t, n);
        (e._dispatchListeners = null),
          (e._dispatchInstances = null),
          e.isPersistent() || e.constructor.release(e);
      }
    }
    function lt(e) {
      if ((null !== e && (at = rt(at, e)), (e = at), (at = null), e)) {
        if ((ot(e, it), at)) throw Error(i(95));
        if (s) throw ((e = f), (s = !1), (f = null), e);
      }
    }
    function ut(e) {
      return (
        (e = e.target || e.srcElement || window).correspondingUseElement &&
          (e = e.correspondingUseElement),
        3 === e.nodeType ? e.parentNode : e
      );
    }
    function ct(e) {
      if (!C) return !1;
      var t = (e = "on" + e) in document;
      return (
        t ||
          ((t = document.createElement("div")).setAttribute(e, "return;"),
          (t = "function" == typeof t[e])),
        t
      );
    }
    var st = [];
    function ft(e) {
      (e.topLevelType = null),
        (e.nativeEvent = null),
        (e.targetInst = null),
        (e.ancestors.length = 0),
        10 > st.length && st.push(e);
    }
    function dt(e, t, n, r) {
      if (st.length) {
        var o = st.pop();
        return (
          (o.topLevelType = e),
          (o.eventSystemFlags = r),
          (o.nativeEvent = t),
          (o.targetInst = n),
          o
        );
      }
      return {
        topLevelType: e,
        eventSystemFlags: r,
        nativeEvent: t,
        targetInst: n,
        ancestors: [],
      };
    }
    function pt(e) {
      var t = e.targetInst,
        n = t;
      do {
        if (!n) {
          e.ancestors.push(n);
          break;
        }
        var r = n;
        if (3 === r.tag) r = r.stateNode.containerInfo;
        else {
          for (; r.return; ) r = r.return;
          r = 3 !== r.tag ? null : r.stateNode.containerInfo;
        }
        if (!r) break;
        (5 !== (t = n.tag) && 6 !== t) || e.ancestors.push(n), (n = Cn(r));
      } while (n);
      for (n = 0; n < e.ancestors.length; n++) {
        t = e.ancestors[n];
        var o = ut(e.nativeEvent);
        r = e.topLevelType;
        var a = e.nativeEvent,
          i = e.eventSystemFlags;
        0 === n && (i |= 64);
        for (var l = null, u = 0; u < E.length; u++) {
          var c = E[u];
          c && (c = c.extractEvents(r, t, a, o, i)) && (l = rt(l, c));
        }
        lt(l);
      }
    }
    function mt(e, t, n) {
      if (!n.has(e)) {
        switch (e) {
          case "scroll":
            qt(t, "scroll", !0);
            break;
          case "focus":
          case "blur":
            qt(t, "focus", !0),
              qt(t, "blur", !0),
              n.set("blur", null),
              n.set("focus", null);
            break;
          case "cancel":
          case "close":
            ct(e) && qt(t, e, !0);
            break;
          case "invalid":
          case "submit":
          case "reset":
            break;
          default:
            -1 === Ye.indexOf(e) && Kt(e, t);
        }
        n.set(e, null);
      }
    }
    var ht,
      vt,
      yt,
      gt = !1,
      bt = [],
      wt = null,
      xt = null,
      Et = null,
      kt = new Map(),
      Tt = new Map(),
      St = [],
      _t = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(
        " "
      ),
      Ct = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(
        " "
      );
    function Pt(e, t, n, r, o) {
      return {
        blockedOn: e,
        topLevelType: t,
        eventSystemFlags: 32 | n,
        nativeEvent: o,
        container: r,
      };
    }
    function Ot(e, t) {
      switch (e) {
        case "focus":
        case "blur":
          wt = null;
          break;
        case "dragenter":
        case "dragleave":
          xt = null;
          break;
        case "mouseover":
        case "mouseout":
          Et = null;
          break;
        case "pointerover":
        case "pointerout":
          kt.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Tt.delete(t.pointerId);
      }
    }
    function At(e, t, n, r, o, a) {
      return null === e || e.nativeEvent !== a
        ? ((e = Pt(t, n, r, o, a)),
          null !== t && null !== (t = Pn(t)) && vt(t),
          e)
        : ((e.eventSystemFlags |= r), e);
    }
    function Nt(e) {
      var t = Cn(e.target);
      if (null !== t) {
        var n = Ze(t);
        if (null !== n)
          if (13 === (t = n.tag)) {
            if (null !== (t = et(n)))
              return (
                (e.blockedOn = t),
                void a.unstable_runWithPriority(e.priority, function () {
                  yt(n);
                })
              );
          } else if (3 === t && n.stateNode.hydrate)
            return void (e.blockedOn =
              3 === n.tag ? n.stateNode.containerInfo : null);
      }
      e.blockedOn = null;
    }
    function Mt(e) {
      if (null !== e.blockedOn) return !1;
      var t = Jt(
        e.topLevelType,
        e.eventSystemFlags,
        e.container,
        e.nativeEvent
      );
      if (null !== t) {
        var n = Pn(t);
        return null !== n && vt(n), (e.blockedOn = t), !1;
      }
      return !0;
    }
    function Rt(e, t, n) {
      Mt(e) && n.delete(t);
    }
    function It() {
      for (gt = !1; 0 < bt.length; ) {
        var e = bt[0];
        if (null !== e.blockedOn) {
          null !== (e = Pn(e.blockedOn)) && ht(e);
          break;
        }
        var t = Jt(
          e.topLevelType,
          e.eventSystemFlags,
          e.container,
          e.nativeEvent
        );
        null !== t ? (e.blockedOn = t) : bt.shift();
      }
      null !== wt && Mt(wt) && (wt = null),
        null !== xt && Mt(xt) && (xt = null),
        null !== Et && Mt(Et) && (Et = null),
        kt.forEach(Rt),
        Tt.forEach(Rt);
    }
    function zt(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        gt ||
          ((gt = !0),
          a.unstable_scheduleCallback(a.unstable_NormalPriority, It)));
    }
    function Dt(e) {
      function t(t) {
        return zt(t, e);
      }
      if (0 < bt.length) {
        zt(bt[0], e);
        for (var n = 1; n < bt.length; n++) {
          var r = bt[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        null !== wt && zt(wt, e),
          null !== xt && zt(xt, e),
          null !== Et && zt(Et, e),
          kt.forEach(t),
          Tt.forEach(t),
          n = 0;
        n < St.length;
        n++
      )
        (r = St[n]).blockedOn === e && (r.blockedOn = null);
      for (; 0 < St.length && null === (n = St[0]).blockedOn; )
        Nt(n), null === n.blockedOn && St.shift();
    }
    var Lt = {},
      jt = new Map(),
      Ft = new Map(),
      Ut = [
        "abort",
        "abort",
        Qe,
        "animationEnd",
        Ke,
        "animationIteration",
        qe,
        "animationStart",
        "canplay",
        "canPlay",
        "canplaythrough",
        "canPlayThrough",
        "durationchange",
        "durationChange",
        "emptied",
        "emptied",
        "encrypted",
        "encrypted",
        "ended",
        "ended",
        "error",
        "error",
        "gotpointercapture",
        "gotPointerCapture",
        "load",
        "load",
        "loadeddata",
        "loadedData",
        "loadedmetadata",
        "loadedMetadata",
        "loadstart",
        "loadStart",
        "lostpointercapture",
        "lostPointerCapture",
        "playing",
        "playing",
        "progress",
        "progress",
        "seeking",
        "seeking",
        "stalled",
        "stalled",
        "suspend",
        "suspend",
        "timeupdate",
        "timeUpdate",
        Xe,
        "transitionEnd",
        "waiting",
        "waiting",
      ];
    function Bt(e, t) {
      for (var n = 0; n < e.length; n += 2) {
        var r = e[n],
          o = e[n + 1],
          a = "on" + (o[0].toUpperCase() + o.slice(1));
        (a = {
          phasedRegistrationNames: { bubbled: a, captured: a + "Capture" },
          dependencies: [r],
          eventPriority: t,
        }),
          Ft.set(r, t),
          jt.set(r, a),
          (Lt[o] = a);
      }
    }
    Bt(
      "blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(
        " "
      ),
      0
    ),
      Bt(
        "drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(
          " "
        ),
        1
      ),
      Bt(Ut, 2);
    for (
      var Wt = "change selectionchange textInput compositionstart compositionend compositionupdate".split(
          " "
        ),
        Vt = 0;
      Vt < Wt.length;
      Vt++
    )
      Ft.set(Wt[Vt], 0);
    var $t = a.unstable_UserBlockingPriority,
      Ht = a.unstable_runWithPriority,
      Qt = !0;
    function Kt(e, t) {
      qt(t, e, !1);
    }
    function qt(e, t, n) {
      var r = Ft.get(t);
      switch (void 0 === r ? 2 : r) {
        case 0:
          r = Xt.bind(null, t, 1, e);
          break;
        case 1:
          r = Yt.bind(null, t, 1, e);
          break;
        default:
          r = Gt.bind(null, t, 1, e);
      }
      n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
    }
    function Xt(e, t, n, r) {
      j || D();
      var o = Gt,
        a = j;
      j = !0;
      try {
        z(o, e, t, n, r);
      } finally {
        (j = a) || U();
      }
    }
    function Yt(e, t, n, r) {
      Ht($t, Gt.bind(null, e, t, n, r));
    }
    function Gt(e, t, n, r) {
      if (Qt)
        if (0 < bt.length && -1 < _t.indexOf(e))
          (e = Pt(null, e, t, n, r)), bt.push(e);
        else {
          var o = Jt(e, t, n, r);
          if (null === o) Ot(e, r);
          else if (-1 < _t.indexOf(e)) (e = Pt(o, e, t, n, r)), bt.push(e);
          else if (
            !(function (e, t, n, r, o) {
              switch (t) {
                case "focus":
                  return (wt = At(wt, e, t, n, r, o)), !0;
                case "dragenter":
                  return (xt = At(xt, e, t, n, r, o)), !0;
                case "mouseover":
                  return (Et = At(Et, e, t, n, r, o)), !0;
                case "pointerover":
                  var a = o.pointerId;
                  return kt.set(a, At(kt.get(a) || null, e, t, n, r, o)), !0;
                case "gotpointercapture":
                  return (
                    (a = o.pointerId),
                    Tt.set(a, At(Tt.get(a) || null, e, t, n, r, o)),
                    !0
                  );
              }
              return !1;
            })(o, e, t, n, r)
          ) {
            Ot(e, r), (e = dt(e, r, null, t));
            try {
              B(pt, e);
            } finally {
              ft(e);
            }
          }
        }
    }
    function Jt(e, t, n, r) {
      if (null !== (n = Cn((n = ut(r))))) {
        var o = Ze(n);
        if (null === o) n = null;
        else {
          var a = o.tag;
          if (13 === a) {
            if (null !== (n = et(o))) return n;
            n = null;
          } else if (3 === a) {
            if (o.stateNode.hydrate)
              return 3 === o.tag ? o.stateNode.containerInfo : null;
            n = null;
          } else o !== n && (n = null);
        }
      }
      e = dt(e, r, n, t);
      try {
        B(pt, e);
      } finally {
        ft(e);
      }
      return null;
    }
    var Zt = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      en = ["Webkit", "ms", "Moz", "O"];
    function tn(e, t, n) {
      return null == t || "boolean" == typeof t || "" === t
        ? ""
        : n ||
          "number" != typeof t ||
          0 === t ||
          (Zt.hasOwnProperty(e) && Zt[e])
        ? ("" + t).trim()
        : t + "px";
    }
    function nn(e, t) {
      for (var n in ((e = e.style), t))
        if (t.hasOwnProperty(n)) {
          var r = 0 === n.indexOf("--"),
            o = tn(n, t[n], r);
          "float" === n && (n = "cssFloat"),
            r ? e.setProperty(n, o) : (e[n] = o);
        }
    }
    Object.keys(Zt).forEach(function (e) {
      en.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Zt[t] = Zt[e]);
      });
    });
    var rn = o(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      }
    );
    function on(e, t) {
      if (t) {
        if (rn[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
          throw Error(i(137, e, ""));
        if (null != t.dangerouslySetInnerHTML) {
          if (null != t.children) throw Error(i(60));
          if (
            "object" != typeof t.dangerouslySetInnerHTML ||
            !("__html" in t.dangerouslySetInnerHTML)
          )
            throw Error(i(61));
        }
        if (null != t.style && "object" != typeof t.style)
          throw Error(i(62, ""));
      }
    }
    function an(e, t) {
      if (-1 === e.indexOf("-")) return "string" == typeof t.is;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var ln = Ie;
    function un(e, t) {
      var n = Je(
        (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument)
      );
      t = S[t];
      for (var r = 0; r < t.length; r++) mt(t[r], e, n);
    }
    function cn() {}
    function sn(e) {
      if (
        void 0 ===
        (e = e || ("undefined" != typeof document ? document : void 0))
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch (t) {
        return e.body;
      }
    }
    function fn(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function dn(e, t) {
      var n,
        r = fn(e);
      for (e = 0; r; ) {
        if (3 === r.nodeType) {
          if (((n = e + r.textContent.length), e <= t && n >= t))
            return { node: r, offset: t - e };
          e = n;
        }
        e: {
          for (; r; ) {
            if (r.nextSibling) {
              r = r.nextSibling;
              break e;
            }
            r = r.parentNode;
          }
          r = void 0;
        }
        r = fn(r);
      }
    }
    function pn() {
      for (var e = window, t = sn(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = "string" == typeof t.contentWindow.location.href;
        } catch (e) {
          n = !1;
        }
        if (!n) break;
        t = sn((e = t.contentWindow).document);
      }
      return t;
    }
    function mn(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        (("input" === t &&
          ("text" === e.type ||
            "search" === e.type ||
            "tel" === e.type ||
            "url" === e.type ||
            "password" === e.type)) ||
          "textarea" === t ||
          "true" === e.contentEditable)
      );
    }
    var hn = null,
      vn = null;
    function yn(e, t) {
      switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!t.autoFocus;
      }
      return !1;
    }
    function gn(e, t) {
      return (
        "textarea" === e ||
        "option" === e ||
        "noscript" === e ||
        "string" == typeof t.children ||
        "number" == typeof t.children ||
        ("object" == typeof t.dangerouslySetInnerHTML &&
          null !== t.dangerouslySetInnerHTML &&
          null != t.dangerouslySetInnerHTML.__html)
      );
    }
    var bn = "function" == typeof setTimeout ? setTimeout : void 0,
      wn = "function" == typeof clearTimeout ? clearTimeout : void 0;
    function xn(e) {
      for (; null != e; e = e.nextSibling) {
        var t = e.nodeType;
        if (1 === t || 3 === t) break;
      }
      return e;
    }
    function En(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (8 === e.nodeType) {
          var n = e.data;
          if ("$" === n || "$!" === n || "$?" === n) {
            if (0 === t) return e;
            t--;
          } else "/$" === n && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var kn = Math.random().toString(36).slice(2),
      Tn = "__reactInternalInstance$" + kn,
      Sn = "__reactEventHandlers$" + kn,
      _n = "__reactContainere$" + kn;
    function Cn(e) {
      var t = e[Tn];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[_n] || n[Tn])) {
          if (
            ((n = t.alternate),
            null !== t.child || (null !== n && null !== n.child))
          )
            for (e = En(e); null !== e; ) {
              if ((n = e[Tn])) return n;
              e = En(e);
            }
          return t;
        }
        n = (e = n).parentNode;
      }
      return null;
    }
    function Pn(e) {
      return !(e = e[Tn] || e[_n]) ||
        (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
        ? null
        : e;
    }
    function On(e) {
      if (5 === e.tag || 6 === e.tag) return e.stateNode;
      throw Error(i(33));
    }
    function An(e) {
      return e[Sn] || null;
    }
    function Nn(e) {
      do {
        e = e.return;
      } while (e && 5 !== e.tag);
      return e || null;
    }
    function Mn(e, t) {
      var n = e.stateNode;
      if (!n) return null;
      var r = m(n);
      if (!r) return null;
      n = r[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (r = !r.disabled) ||
            (r = !(
              "button" === (e = e.type) ||
              "input" === e ||
              "select" === e ||
              "textarea" === e
            )),
            (e = !r);
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && "function" != typeof n) throw Error(i(231, t, typeof n));
      return n;
    }
    function Rn(e, t, n) {
      (t = Mn(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
        ((n._dispatchListeners = rt(n._dispatchListeners, t)),
        (n._dispatchInstances = rt(n._dispatchInstances, e)));
    }
    function In(e) {
      if (e && e.dispatchConfig.phasedRegistrationNames) {
        for (var t = e._targetInst, n = []; t; ) n.push(t), (t = Nn(t));
        for (t = n.length; 0 < t--; ) Rn(n[t], "captured", e);
        for (t = 0; t < n.length; t++) Rn(n[t], "bubbled", e);
      }
    }
    function zn(e, t, n) {
      e &&
        n &&
        n.dispatchConfig.registrationName &&
        (t = Mn(e, n.dispatchConfig.registrationName)) &&
        ((n._dispatchListeners = rt(n._dispatchListeners, t)),
        (n._dispatchInstances = rt(n._dispatchInstances, e)));
    }
    function Dn(e) {
      e && e.dispatchConfig.registrationName && zn(e._targetInst, null, e);
    }
    function Ln(e) {
      ot(e, In);
    }
    var jn = null,
      Fn = null,
      Un = null;
    function Bn() {
      if (Un) return Un;
      var e,
        t,
        n = Fn,
        r = n.length,
        o = "value" in jn ? jn.value : jn.textContent,
        a = o.length;
      for (e = 0; e < r && n[e] === o[e]; e++);
      var i = r - e;
      for (t = 1; t <= i && n[r - t] === o[a - t]; t++);
      return (Un = o.slice(e, 1 < t ? 1 - t : void 0));
    }
    function Wn() {
      return !0;
    }
    function Vn() {
      return !1;
    }
    function $n(e, t, n, r) {
      for (var o in ((this.dispatchConfig = e),
      (this._targetInst = t),
      (this.nativeEvent = n),
      (e = this.constructor.Interface)))
        e.hasOwnProperty(o) &&
          ((t = e[o])
            ? (this[o] = t(n))
            : "target" === o
            ? (this.target = r)
            : (this[o] = n[o]));
      return (
        (this.isDefaultPrevented = (
          null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue
        )
          ? Wn
          : Vn),
        (this.isPropagationStopped = Vn),
        this
      );
    }
    function Hn(e, t, n, r) {
      if (this.eventPool.length) {
        var o = this.eventPool.pop();
        return this.call(o, e, t, n, r), o;
      }
      return new this(e, t, n, r);
    }
    function Qn(e) {
      if (!(e instanceof this)) throw Error(i(279));
      e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
    }
    function Kn(e) {
      (e.eventPool = []), (e.getPooled = Hn), (e.release = Qn);
    }
    o($n.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e &&
          (e.preventDefault
            ? e.preventDefault()
            : "unknown" != typeof e.returnValue && (e.returnValue = !1),
          (this.isDefaultPrevented = Wn));
      },
      stopPropagation: function () {
        var e = this.nativeEvent;
        e &&
          (e.stopPropagation
            ? e.stopPropagation()
            : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
          (this.isPropagationStopped = Wn));
      },
      persist: function () {
        this.isPersistent = Wn;
      },
      isPersistent: Vn,
      destructor: function () {
        var e,
          t = this.constructor.Interface;
        for (e in t) this[e] = null;
        (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
          (this.isPropagationStopped = this.isDefaultPrevented = Vn),
          (this._dispatchInstances = this._dispatchListeners = null);
      },
    }),
      ($n.Interface = {
        type: null,
        target: null,
        currentTarget: function () {
          return null;
        },
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null,
      }),
      ($n.extend = function (e) {
        function t() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        t.prototype = r.prototype;
        var a = new t();
        return (
          o(a, n.prototype),
          (n.prototype = a),
          (n.prototype.constructor = n),
          (n.Interface = o({}, r.Interface, e)),
          (n.extend = r.extend),
          Kn(n),
          n
        );
      }),
      Kn($n);
    var qn = $n.extend({ data: null }),
      Xn = $n.extend({ data: null }),
      Yn = [9, 13, 27, 32],
      Gn = C && "CompositionEvent" in window,
      Jn = null;
    C && "documentMode" in document && (Jn = document.documentMode);
    var Zn = C && "TextEvent" in window && !Jn,
      er = C && (!Gn || (Jn && 8 < Jn && 11 >= Jn)),
      tr = String.fromCharCode(32),
      nr = {
        beforeInput: {
          phasedRegistrationNames: {
            bubbled: "onBeforeInput",
            captured: "onBeforeInputCapture",
          },
          dependencies: ["compositionend", "keypress", "textInput", "paste"],
        },
        compositionEnd: {
          phasedRegistrationNames: {
            bubbled: "onCompositionEnd",
            captured: "onCompositionEndCapture",
          },
          dependencies: "blur compositionend keydown keypress keyup mousedown".split(
            " "
          ),
        },
        compositionStart: {
          phasedRegistrationNames: {
            bubbled: "onCompositionStart",
            captured: "onCompositionStartCapture",
          },
          dependencies: "blur compositionstart keydown keypress keyup mousedown".split(
            " "
          ),
        },
        compositionUpdate: {
          phasedRegistrationNames: {
            bubbled: "onCompositionUpdate",
            captured: "onCompositionUpdateCapture",
          },
          dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(
            " "
          ),
        },
      },
      rr = !1;
    function or(e, t) {
      switch (e) {
        case "keyup":
          return -1 !== Yn.indexOf(t.keyCode);
        case "keydown":
          return 229 !== t.keyCode;
        case "keypress":
        case "mousedown":
        case "blur":
          return !0;
        default:
          return !1;
      }
    }
    function ar(e) {
      return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
    }
    var ir = !1;
    var lr = {
        eventTypes: nr,
        extractEvents: function (e, t, n, r) {
          var o;
          if (Gn)
            e: {
              switch (e) {
                case "compositionstart":
                  var a = nr.compositionStart;
                  break e;
                case "compositionend":
                  a = nr.compositionEnd;
                  break e;
                case "compositionupdate":
                  a = nr.compositionUpdate;
                  break e;
              }
              a = void 0;
            }
          else
            ir
              ? or(e, n) && (a = nr.compositionEnd)
              : "keydown" === e &&
                229 === n.keyCode &&
                (a = nr.compositionStart);
          return (
            a
              ? (er &&
                  "ko" !== n.locale &&
                  (ir || a !== nr.compositionStart
                    ? a === nr.compositionEnd && ir && (o = Bn())
                    : ((Fn = "value" in (jn = r) ? jn.value : jn.textContent),
                      (ir = !0))),
                (a = qn.getPooled(a, t, n, r)),
                o ? (a.data = o) : null !== (o = ar(n)) && (a.data = o),
                Ln(a),
                (o = a))
              : (o = null),
            (e = Zn
              ? (function (e, t) {
                  switch (e) {
                    case "compositionend":
                      return ar(t);
                    case "keypress":
                      return 32 !== t.which ? null : ((rr = !0), tr);
                    case "textInput":
                      return (e = t.data) === tr && rr ? null : e;
                    default:
                      return null;
                  }
                })(e, n)
              : (function (e, t) {
                  if (ir)
                    return "compositionend" === e || (!Gn && or(e, t))
                      ? ((e = Bn()), (Un = Fn = jn = null), (ir = !1), e)
                      : null;
                  switch (e) {
                    case "paste":
                      return null;
                    case "keypress":
                      if (
                        !(t.ctrlKey || t.altKey || t.metaKey) ||
                        (t.ctrlKey && t.altKey)
                      ) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which);
                      }
                      return null;
                    case "compositionend":
                      return er && "ko" !== t.locale ? null : t.data;
                    default:
                      return null;
                  }
                })(e, n))
              ? (((t = Xn.getPooled(nr.beforeInput, t, n, r)).data = e), Ln(t))
              : (t = null),
            null === o ? t : null === t ? o : [o, t]
          );
        },
      },
      ur = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
      };
    function cr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return "input" === t ? !!ur[e.type] : "textarea" === t;
    }
    var sr = {
      change: {
        phasedRegistrationNames: {
          bubbled: "onChange",
          captured: "onChangeCapture",
        },
        dependencies: "blur change click focus input keydown keyup selectionchange".split(
          " "
        ),
      },
    };
    function fr(e, t, n) {
      return (
        ((e = $n.getPooled(sr.change, e, t, n)).type = "change"), M(n), Ln(e), e
      );
    }
    var dr = null,
      pr = null;
    function mr(e) {
      lt(e);
    }
    function hr(e) {
      if (xe(On(e))) return e;
    }
    function vr(e, t) {
      if ("change" === e) return t;
    }
    var yr = !1;
    function gr() {
      dr && (dr.detachEvent("onpropertychange", br), (pr = dr = null));
    }
    function br(e) {
      if ("value" === e.propertyName && hr(pr))
        if (((e = fr(pr, e, ut(e))), j)) lt(e);
        else {
          j = !0;
          try {
            I(mr, e);
          } finally {
            (j = !1), U();
          }
        }
    }
    function wr(e, t, n) {
      "focus" === e
        ? (gr(), (pr = n), (dr = t).attachEvent("onpropertychange", br))
        : "blur" === e && gr();
    }
    function xr(e) {
      if ("selectionchange" === e || "keyup" === e || "keydown" === e)
        return hr(pr);
    }
    function Er(e, t) {
      if ("click" === e) return hr(t);
    }
    function kr(e, t) {
      if ("input" === e || "change" === e) return hr(t);
    }
    C &&
      (yr =
        ct("input") && (!document.documentMode || 9 < document.documentMode));
    var Tr = {
        eventTypes: sr,
        _isInputEventSupported: yr,
        extractEvents: function (e, t, n, r) {
          var o = t ? On(t) : window,
            a = o.nodeName && o.nodeName.toLowerCase();
          if ("select" === a || ("input" === a && "file" === o.type))
            var i = vr;
          else if (cr(o))
            if (yr) i = kr;
            else {
              i = xr;
              var l = wr;
            }
          else
            (a = o.nodeName) &&
              "input" === a.toLowerCase() &&
              ("checkbox" === o.type || "radio" === o.type) &&
              (i = Er);
          if (i && (i = i(e, t))) return fr(i, n, r);
          l && l(e, o, t),
            "blur" === e &&
              (e = o._wrapperState) &&
              e.controlled &&
              "number" === o.type &&
              Ce(o, "number", o.value);
        },
      },
      Sr = $n.extend({ view: null, detail: null }),
      _r = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function Cr(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : !!(e = _r[e]) && !!t[e];
    }
    function Pr() {
      return Cr;
    }
    var Or = 0,
      Ar = 0,
      Nr = !1,
      Mr = !1,
      Rr = Sr.extend({
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        pageX: null,
        pageY: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        getModifierState: Pr,
        button: null,
        buttons: null,
        relatedTarget: function (e) {
          return (
            e.relatedTarget ||
            (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
          );
        },
        movementX: function (e) {
          if ("movementX" in e) return e.movementX;
          var t = Or;
          return (
            (Or = e.screenX),
            Nr ? ("mousemove" === e.type ? e.screenX - t : 0) : ((Nr = !0), 0)
          );
        },
        movementY: function (e) {
          if ("movementY" in e) return e.movementY;
          var t = Ar;
          return (
            (Ar = e.screenY),
            Mr ? ("mousemove" === e.type ? e.screenY - t : 0) : ((Mr = !0), 0)
          );
        },
      }),
      Ir = Rr.extend({
        pointerId: null,
        width: null,
        height: null,
        pressure: null,
        tangentialPressure: null,
        tiltX: null,
        tiltY: null,
        twist: null,
        pointerType: null,
        isPrimary: null,
      }),
      zr = {
        mouseEnter: {
          registrationName: "onMouseEnter",
          dependencies: ["mouseout", "mouseover"],
        },
        mouseLeave: {
          registrationName: "onMouseLeave",
          dependencies: ["mouseout", "mouseover"],
        },
        pointerEnter: {
          registrationName: "onPointerEnter",
          dependencies: ["pointerout", "pointerover"],
        },
        pointerLeave: {
          registrationName: "onPointerLeave",
          dependencies: ["pointerout", "pointerover"],
        },
      },
      Dr = {
        eventTypes: zr,
        extractEvents: function (e, t, n, r, o) {
          var a = "mouseover" === e || "pointerover" === e,
            i = "mouseout" === e || "pointerout" === e;
          if (
            (a && 0 == (32 & o) && (n.relatedTarget || n.fromElement)) ||
            (!i && !a)
          )
            return null;
          ((a =
            r.window === r
              ? r
              : (a = r.ownerDocument)
              ? a.defaultView || a.parentWindow
              : window),
          i)
            ? ((i = t),
              null !==
                (t = (t = n.relatedTarget || n.toElement) ? Cn(t) : null) &&
                (t !== Ze(t) || (5 !== t.tag && 6 !== t.tag)) &&
                (t = null))
            : (i = null);
          if (i === t) return null;
          if ("mouseout" === e || "mouseover" === e)
            var l = Rr,
              u = zr.mouseLeave,
              c = zr.mouseEnter,
              s = "mouse";
          else
            ("pointerout" !== e && "pointerover" !== e) ||
              ((l = Ir),
              (u = zr.pointerLeave),
              (c = zr.pointerEnter),
              (s = "pointer"));
          if (
            ((e = null == i ? a : On(i)),
            (a = null == t ? a : On(t)),
            ((u = l.getPooled(u, i, n, r)).type = s + "leave"),
            (u.target = e),
            (u.relatedTarget = a),
            ((n = l.getPooled(c, t, n, r)).type = s + "enter"),
            (n.target = a),
            (n.relatedTarget = e),
            (s = t),
            (r = i) && s)
          )
            e: {
              for (c = s, i = 0, e = l = r; e; e = Nn(e)) i++;
              for (e = 0, t = c; t; t = Nn(t)) e++;
              for (; 0 < i - e; ) (l = Nn(l)), i--;
              for (; 0 < e - i; ) (c = Nn(c)), e--;
              for (; i--; ) {
                if (l === c || l === c.alternate) break e;
                (l = Nn(l)), (c = Nn(c));
              }
              l = null;
            }
          else l = null;
          for (
            c = l, l = [];
            r && r !== c && (null === (i = r.alternate) || i !== c);

          )
            l.push(r), (r = Nn(r));
          for (
            r = [];
            s && s !== c && (null === (i = s.alternate) || i !== c);

          )
            r.push(s), (s = Nn(s));
          for (s = 0; s < l.length; s++) zn(l[s], "bubbled", u);
          for (s = r.length; 0 < s--; ) zn(r[s], "captured", n);
          return 0 == (64 & o) ? [u] : [u, n];
        },
      };
    var Lr =
        "function" == typeof Object.is
          ? Object.is
          : function (e, t) {
              return (
                (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
              );
            },
      jr = Object.prototype.hasOwnProperty;
    function Fr(e, t) {
      if (Lr(e, t)) return !0;
      if (
        "object" != typeof e ||
        null === e ||
        "object" != typeof t ||
        null === t
      )
        return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++)
        if (!jr.call(t, n[r]) || !Lr(e[n[r]], t[n[r]])) return !1;
      return !0;
    }
    var Ur = C && "documentMode" in document && 11 >= document.documentMode,
      Br = {
        select: {
          phasedRegistrationNames: {
            bubbled: "onSelect",
            captured: "onSelectCapture",
          },
          dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
            " "
          ),
        },
      },
      Wr = null,
      Vr = null,
      $r = null,
      Hr = !1;
    function Qr(e, t) {
      var n =
        t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
      return Hr || null == Wr || Wr !== sn(n)
        ? null
        : ("selectionStart" in (n = Wr) && mn(n)
            ? (n = { start: n.selectionStart, end: n.selectionEnd })
            : (n = {
                anchorNode: (n = (
                  (n.ownerDocument && n.ownerDocument.defaultView) ||
                  window
                ).getSelection()).anchorNode,
                anchorOffset: n.anchorOffset,
                focusNode: n.focusNode,
                focusOffset: n.focusOffset,
              }),
          $r && Fr($r, n)
            ? null
            : (($r = n),
              ((e = $n.getPooled(Br.select, Vr, e, t)).type = "select"),
              (e.target = Wr),
              Ln(e),
              e));
    }
    var Kr = {
        eventTypes: Br,
        extractEvents: function (e, t, n, r, o, a) {
          if (
            !(a = !(o =
              a ||
              (r.window === r
                ? r.document
                : 9 === r.nodeType
                ? r
                : r.ownerDocument)))
          ) {
            e: {
              (o = Je(o)), (a = S.onSelect);
              for (var i = 0; i < a.length; i++)
                if (!o.has(a[i])) {
                  o = !1;
                  break e;
                }
              o = !0;
            }
            a = !o;
          }
          if (a) return null;
          switch (((o = t ? On(t) : window), e)) {
            case "focus":
              (cr(o) || "true" === o.contentEditable) &&
                ((Wr = o), (Vr = t), ($r = null));
              break;
            case "blur":
              $r = Vr = Wr = null;
              break;
            case "mousedown":
              Hr = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              return (Hr = !1), Qr(n, r);
            case "selectionchange":
              if (Ur) break;
            case "keydown":
            case "keyup":
              return Qr(n, r);
          }
          return null;
        },
      },
      qr = $n.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null,
      }),
      Xr = $n.extend({
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      }),
      Yr = Sr.extend({ relatedTarget: null });
    function Gr(e) {
      var t = e.keyCode;
      return (
        "charCode" in e
          ? 0 === (e = e.charCode) && 13 === t && (e = 13)
          : (e = t),
        10 === e && (e = 13),
        32 <= e || 13 === e ? e : 0
      );
    }
    var Jr = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      Zr = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      eo = Sr.extend({
        key: function (e) {
          if (e.key) {
            var t = Jr[e.key] || e.key;
            if ("Unidentified" !== t) return t;
          }
          return "keypress" === e.type
            ? 13 === (e = Gr(e))
              ? "Enter"
              : String.fromCharCode(e)
            : "keydown" === e.type || "keyup" === e.type
            ? Zr[e.keyCode] || "Unidentified"
            : "";
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: Pr,
        charCode: function (e) {
          return "keypress" === e.type ? Gr(e) : 0;
        },
        keyCode: function (e) {
          return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
        },
        which: function (e) {
          return "keypress" === e.type
            ? Gr(e)
            : "keydown" === e.type || "keyup" === e.type
            ? e.keyCode
            : 0;
        },
      }),
      to = Rr.extend({ dataTransfer: null }),
      no = Sr.extend({
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: Pr,
      }),
      ro = $n.extend({
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null,
      }),
      oo = Rr.extend({
        deltaX: function (e) {
          return "deltaX" in e
            ? e.deltaX
            : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
        },
        deltaY: function (e) {
          return "deltaY" in e
            ? e.deltaY
            : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
        },
        deltaZ: null,
        deltaMode: null,
      }),
      ao = {
        eventTypes: Lt,
        extractEvents: function (e, t, n, r) {
          var o = jt.get(e);
          if (!o) return null;
          switch (e) {
            case "keypress":
              if (0 === Gr(n)) return null;
            case "keydown":
            case "keyup":
              e = eo;
              break;
            case "blur":
            case "focus":
              e = Yr;
              break;
            case "click":
              if (2 === n.button) return null;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              e = Rr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              e = to;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              e = no;
              break;
            case Qe:
            case Ke:
            case qe:
              e = qr;
              break;
            case Xe:
              e = ro;
              break;
            case "scroll":
              e = Sr;
              break;
            case "wheel":
              e = oo;
              break;
            case "copy":
            case "cut":
            case "paste":
              e = Xr;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              e = Ir;
              break;
            default:
              e = $n;
          }
          return Ln((t = e.getPooled(o, t, n, r))), t;
        },
      };
    if (g) throw Error(i(101));
    (g = Array.prototype.slice.call(
      "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
        " "
      )
    )),
      w(),
      (m = An),
      (h = Pn),
      (v = On),
      _({
        SimpleEventPlugin: ao,
        EnterLeaveEventPlugin: Dr,
        ChangeEventPlugin: Tr,
        SelectEventPlugin: Kr,
        BeforeInputEventPlugin: lr,
      });
    var io = [],
      lo = -1;
    function uo(e) {
      0 > lo || ((e.current = io[lo]), (io[lo] = null), lo--);
    }
    function co(e, t) {
      lo++, (io[lo] = e.current), (e.current = t);
    }
    var so = {},
      fo = { current: so },
      po = { current: !1 },
      mo = so;
    function ho(e, t) {
      var n = e.type.contextTypes;
      if (!n) return so;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var o,
        a = {};
      for (o in n) a[o] = t[o];
      return (
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = a)),
        a
      );
    }
    function vo(e) {
      return null != (e = e.childContextTypes);
    }
    function yo() {
      uo(po), uo(fo);
    }
    function go(e, t, n) {
      if (fo.current !== so) throw Error(i(168));
      co(fo, t), co(po, n);
    }
    function bo(e, t, n) {
      var r = e.stateNode;
      if (((e = t.childContextTypes), "function" != typeof r.getChildContext))
        return n;
      for (var a in (r = r.getChildContext()))
        if (!(a in e)) throw Error(i(108, ve(t) || "Unknown", a));
      return o({}, n, {}, r);
    }
    function wo(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          so),
        (mo = fo.current),
        co(fo, e),
        co(po, po.current),
        !0
      );
    }
    function xo(e, t, n) {
      var r = e.stateNode;
      if (!r) throw Error(i(169));
      n
        ? ((e = bo(e, t, mo)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          uo(po),
          uo(fo),
          co(fo, e))
        : uo(po),
        co(po, n);
    }
    var Eo = a.unstable_runWithPriority,
      ko = a.unstable_scheduleCallback,
      To = a.unstable_cancelCallback,
      So = a.unstable_requestPaint,
      _o = a.unstable_now,
      Co = a.unstable_getCurrentPriorityLevel,
      Po = a.unstable_ImmediatePriority,
      Oo = a.unstable_UserBlockingPriority,
      Ao = a.unstable_NormalPriority,
      No = a.unstable_LowPriority,
      Mo = a.unstable_IdlePriority,
      Ro = {},
      Io = a.unstable_shouldYield,
      zo = void 0 !== So ? So : function () {},
      Do = null,
      Lo = null,
      jo = !1,
      Fo = _o(),
      Uo =
        1e4 > Fo
          ? _o
          : function () {
              return _o() - Fo;
            };
    function Bo() {
      switch (Co()) {
        case Po:
          return 99;
        case Oo:
          return 98;
        case Ao:
          return 97;
        case No:
          return 96;
        case Mo:
          return 95;
        default:
          throw Error(i(332));
      }
    }
    function Wo(e) {
      switch (e) {
        case 99:
          return Po;
        case 98:
          return Oo;
        case 97:
          return Ao;
        case 96:
          return No;
        case 95:
          return Mo;
        default:
          throw Error(i(332));
      }
    }
    function Vo(e, t) {
      return (e = Wo(e)), Eo(e, t);
    }
    function $o(e, t, n) {
      return (e = Wo(e)), ko(e, t, n);
    }
    function Ho(e) {
      return null === Do ? ((Do = [e]), (Lo = ko(Po, Ko))) : Do.push(e), Ro;
    }
    function Qo() {
      if (null !== Lo) {
        var e = Lo;
        (Lo = null), To(e);
      }
      Ko();
    }
    function Ko() {
      if (!jo && null !== Do) {
        jo = !0;
        var e = 0;
        try {
          var t = Do;
          Vo(99, function () {
            for (; e < t.length; e++) {
              var n = t[e];
              do {
                n = n(!0);
              } while (null !== n);
            }
          }),
            (Do = null);
        } catch (t) {
          throw (null !== Do && (Do = Do.slice(e + 1)), ko(Po, Qo), t);
        } finally {
          jo = !1;
        }
      }
    }
    function qo(e, t, n) {
      return (
        1073741821 - (1 + (((1073741821 - e + t / 10) / (n /= 10)) | 0)) * n
      );
    }
    function Xo(e, t) {
      if (e && e.defaultProps)
        for (var n in ((t = o({}, t)), (e = e.defaultProps)))
          void 0 === t[n] && (t[n] = e[n]);
      return t;
    }
    var Yo = { current: null },
      Go = null,
      Jo = null,
      Zo = null;
    function ea() {
      Zo = Jo = Go = null;
    }
    function ta(e) {
      var t = Yo.current;
      uo(Yo), (e.type._context._currentValue = t);
    }
    function na(e, t) {
      for (; null !== e; ) {
        var n = e.alternate;
        if (e.childExpirationTime < t)
          (e.childExpirationTime = t),
            null !== n &&
              n.childExpirationTime < t &&
              (n.childExpirationTime = t);
        else {
          if (!(null !== n && n.childExpirationTime < t)) break;
          n.childExpirationTime = t;
        }
        e = e.return;
      }
    }
    function ra(e, t) {
      (Go = e),
        (Zo = Jo = null),
        null !== (e = e.dependencies) &&
          null !== e.firstContext &&
          (e.expirationTime >= t && (Ai = !0), (e.firstContext = null));
    }
    function oa(e, t) {
      if (Zo !== e && !1 !== t && 0 !== t)
        if (
          (("number" == typeof t && 1073741823 !== t) ||
            ((Zo = e), (t = 1073741823)),
          (t = { context: e, observedBits: t, next: null }),
          null === Jo)
        ) {
          if (null === Go) throw Error(i(308));
          (Jo = t),
            (Go.dependencies = {
              expirationTime: 0,
              firstContext: t,
              responders: null,
            });
        } else Jo = Jo.next = t;
      return e._currentValue;
    }
    var aa = !1;
    function ia(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        baseQueue: null,
        shared: { pending: null },
        effects: null,
      };
    }
    function la(e, t) {
      (e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            baseQueue: e.baseQueue,
            shared: e.shared,
            effects: e.effects,
          });
    }
    function ua(e, t) {
      return ((e = {
        expirationTime: e,
        suspenseConfig: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      }).next = e);
    }
    function ca(e, t) {
      if (null !== (e = e.updateQueue)) {
        var n = (e = e.shared).pending;
        null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
          (e.pending = t);
      }
    }
    function sa(e, t) {
      var n = e.alternate;
      null !== n && la(n, e),
        null === (n = (e = e.updateQueue).baseQueue)
          ? ((e.baseQueue = t.next = t), (t.next = t))
          : ((t.next = n.next), (n.next = t));
    }
    function fa(e, t, n, r) {
      var a = e.updateQueue;
      aa = !1;
      var i = a.baseQueue,
        l = a.shared.pending;
      if (null !== l) {
        if (null !== i) {
          var u = i.next;
          (i.next = l.next), (l.next = u);
        }
        (i = l),
          (a.shared.pending = null),
          null !== (u = e.alternate) &&
            null !== (u = u.updateQueue) &&
            (u.baseQueue = l);
      }
      if (null !== i) {
        u = i.next;
        var c = a.baseState,
          s = 0,
          f = null,
          d = null,
          p = null;
        if (null !== u)
          for (var m = u; ; ) {
            if ((l = m.expirationTime) < r) {
              var h = {
                expirationTime: m.expirationTime,
                suspenseConfig: m.suspenseConfig,
                tag: m.tag,
                payload: m.payload,
                callback: m.callback,
                next: null,
              };
              null === p ? ((d = p = h), (f = c)) : (p = p.next = h),
                l > s && (s = l);
            } else {
              null !== p &&
                (p = p.next = {
                  expirationTime: 1073741823,
                  suspenseConfig: m.suspenseConfig,
                  tag: m.tag,
                  payload: m.payload,
                  callback: m.callback,
                  next: null,
                }),
                au(l, m.suspenseConfig);
              e: {
                var v = e,
                  y = m;
                switch (((l = t), (h = n), y.tag)) {
                  case 1:
                    if ("function" == typeof (v = y.payload)) {
                      c = v.call(h, c, l);
                      break e;
                    }
                    c = v;
                    break e;
                  case 3:
                    v.effectTag = (-4097 & v.effectTag) | 64;
                  case 0:
                    if (
                      null ==
                      (l =
                        "function" == typeof (v = y.payload)
                          ? v.call(h, c, l)
                          : v)
                    )
                      break e;
                    c = o({}, c, l);
                    break e;
                  case 2:
                    aa = !0;
                }
              }
              null !== m.callback &&
                ((e.effectTag |= 32),
                null === (l = a.effects) ? (a.effects = [m]) : l.push(m));
            }
            if (null === (m = m.next) || m === u) {
              if (null === (l = a.shared.pending)) break;
              (m = i.next = l.next),
                (l.next = u),
                (a.baseQueue = i = l),
                (a.shared.pending = null);
            }
          }
        null === p ? (f = c) : (p.next = d),
          (a.baseState = f),
          (a.baseQueue = p),
          iu(s),
          (e.expirationTime = s),
          (e.memoizedState = c);
      }
    }
    function da(e, t, n) {
      if (((e = t.effects), (t.effects = null), null !== e))
        for (t = 0; t < e.length; t++) {
          var r = e[t],
            o = r.callback;
          if (null !== o) {
            if (((r.callback = null), (r = o), (o = n), "function" != typeof r))
              throw Error(i(191, r));
            r.call(o);
          }
        }
    }
    var pa = Y.ReactCurrentBatchConfig,
      ma = new r.Component().refs;
    function ha(e, t, n, r) {
      (n = null == (n = n(r, (t = e.memoizedState))) ? t : o({}, t, n)),
        (e.memoizedState = n),
        0 === e.expirationTime && (e.updateQueue.baseState = n);
    }
    var va = {
      isMounted: function (e) {
        return !!(e = e._reactInternalFiber) && Ze(e) === e;
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternalFiber;
        var r = Ql(),
          o = pa.suspense;
        ((o = ua((r = Kl(r, e, o)), o)).payload = t),
          null != n && (o.callback = n),
          ca(e, o),
          ql(e, r);
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternalFiber;
        var r = Ql(),
          o = pa.suspense;
        ((o = ua((r = Kl(r, e, o)), o)).tag = 1),
          (o.payload = t),
          null != n && (o.callback = n),
          ca(e, o),
          ql(e, r);
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternalFiber;
        var n = Ql(),
          r = pa.suspense;
        ((r = ua((n = Kl(n, e, r)), r)).tag = 2),
          null != t && (r.callback = t),
          ca(e, r),
          ql(e, n);
      },
    };
    function ya(e, t, n, r, o, a, i) {
      return "function" == typeof (e = e.stateNode).shouldComponentUpdate
        ? e.shouldComponentUpdate(r, a, i)
        : !t.prototype ||
            !t.prototype.isPureReactComponent ||
            !Fr(n, r) ||
            !Fr(o, a);
    }
    function ga(e, t, n) {
      var r = !1,
        o = so,
        a = t.contextType;
      return (
        "object" == typeof a && null !== a
          ? (a = oa(a))
          : ((o = vo(t) ? mo : fo.current),
            (a = (r = null != (r = t.contextTypes)) ? ho(e, o) : so)),
        (t = new t(n, a)),
        (e.memoizedState =
          null !== t.state && void 0 !== t.state ? t.state : null),
        (t.updater = va),
        (e.stateNode = t),
        (t._reactInternalFiber = e),
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = o),
          (e.__reactInternalMemoizedMaskedChildContext = a)),
        t
      );
    }
    function ba(e, t, n, r) {
      (e = t.state),
        "function" == typeof t.componentWillReceiveProps &&
          t.componentWillReceiveProps(n, r),
        "function" == typeof t.UNSAFE_componentWillReceiveProps &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && va.enqueueReplaceState(t, t.state, null);
    }
    function wa(e, t, n, r) {
      var o = e.stateNode;
      (o.props = n), (o.state = e.memoizedState), (o.refs = ma), ia(e);
      var a = t.contextType;
      "object" == typeof a && null !== a
        ? (o.context = oa(a))
        : ((a = vo(t) ? mo : fo.current), (o.context = ho(e, a))),
        fa(e, n, o, r),
        (o.state = e.memoizedState),
        "function" == typeof (a = t.getDerivedStateFromProps) &&
          (ha(e, t, a, n), (o.state = e.memoizedState)),
        "function" == typeof t.getDerivedStateFromProps ||
          "function" == typeof o.getSnapshotBeforeUpdate ||
          ("function" != typeof o.UNSAFE_componentWillMount &&
            "function" != typeof o.componentWillMount) ||
          ((t = o.state),
          "function" == typeof o.componentWillMount && o.componentWillMount(),
          "function" == typeof o.UNSAFE_componentWillMount &&
            o.UNSAFE_componentWillMount(),
          t !== o.state && va.enqueueReplaceState(o, o.state, null),
          fa(e, n, o, r),
          (o.state = e.memoizedState)),
        "function" == typeof o.componentDidMount && (e.effectTag |= 4);
    }
    var xa = Array.isArray;
    function Ea(e, t, n) {
      if (
        null !== (e = n.ref) &&
        "function" != typeof e &&
        "object" != typeof e
      ) {
        if (n._owner) {
          if ((n = n._owner)) {
            if (1 !== n.tag) throw Error(i(309));
            var r = n.stateNode;
          }
          if (!r) throw Error(i(147, e));
          var o = "" + e;
          return null !== t &&
            null !== t.ref &&
            "function" == typeof t.ref &&
            t.ref._stringRef === o
            ? t.ref
            : (((t = function (e) {
                var t = r.refs;
                t === ma && (t = r.refs = {}),
                  null === e ? delete t[o] : (t[o] = e);
              })._stringRef = o),
              t);
        }
        if ("string" != typeof e) throw Error(i(284));
        if (!n._owner) throw Error(i(290, e));
      }
      return e;
    }
    function ka(e, t) {
      if ("textarea" !== e.type)
        throw Error(
          i(
            31,
            "[object Object]" === Object.prototype.toString.call(t)
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : t,
            ""
          )
        );
    }
    function Ta(e) {
      function t(t, n) {
        if (e) {
          var r = t.lastEffect;
          null !== r
            ? ((r.nextEffect = n), (t.lastEffect = n))
            : (t.firstEffect = t.lastEffect = n),
            (n.nextEffect = null),
            (n.effectTag = 8);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; null !== r; ) t(n, r), (r = r.sibling);
        return null;
      }
      function r(e, t) {
        for (e = new Map(); null !== t; )
          null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
        return e;
      }
      function o(e, t) {
        return ((e = _u(e, t)).index = 0), (e.sibling = null), e;
      }
      function a(t, n, r) {
        return (
          (t.index = r),
          e
            ? null !== (r = t.alternate)
              ? (r = r.index) < n
                ? ((t.effectTag = 2), n)
                : r
              : ((t.effectTag = 2), n)
            : n
        );
      }
      function l(t) {
        return e && null === t.alternate && (t.effectTag = 2), t;
      }
      function u(e, t, n, r) {
        return null === t || 6 !== t.tag
          ? (((t = Ou(n, e.mode, r)).return = e), t)
          : (((t = o(t, n)).return = e), t);
      }
      function c(e, t, n, r) {
        return null !== t && t.elementType === n.type
          ? (((r = o(t, n.props)).ref = Ea(e, t, n)), (r.return = e), r)
          : (((r = Cu(n.type, n.key, n.props, null, e.mode, r)).ref = Ea(
              e,
              t,
              n
            )),
            (r.return = e),
            r);
      }
      function s(e, t, n, r) {
        return null === t ||
          4 !== t.tag ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? (((t = Au(n, e.mode, r)).return = e), t)
          : (((t = o(t, n.children || [])).return = e), t);
      }
      function f(e, t, n, r, a) {
        return null === t || 7 !== t.tag
          ? (((t = Pu(n, e.mode, r, a)).return = e), t)
          : (((t = o(t, n)).return = e), t);
      }
      function d(e, t, n) {
        if ("string" == typeof t || "number" == typeof t)
          return ((t = Ou("" + t, e.mode, n)).return = e), t;
        if ("object" == typeof t && null !== t) {
          switch (t.$$typeof) {
            case ee:
              return (
                ((n = Cu(t.type, t.key, t.props, null, e.mode, n)).ref = Ea(
                  e,
                  null,
                  t
                )),
                (n.return = e),
                n
              );
            case te:
              return ((t = Au(t, e.mode, n)).return = e), t;
          }
          if (xa(t) || he(t))
            return ((t = Pu(t, e.mode, n, null)).return = e), t;
          ka(e, t);
        }
        return null;
      }
      function p(e, t, n, r) {
        var o = null !== t ? t.key : null;
        if ("string" == typeof n || "number" == typeof n)
          return null !== o ? null : u(e, t, "" + n, r);
        if ("object" == typeof n && null !== n) {
          switch (n.$$typeof) {
            case ee:
              return n.key === o
                ? n.type === ne
                  ? f(e, t, n.props.children, r, o)
                  : c(e, t, n, r)
                : null;
            case te:
              return n.key === o ? s(e, t, n, r) : null;
          }
          if (xa(n) || he(n)) return null !== o ? null : f(e, t, n, r, null);
          ka(e, n);
        }
        return null;
      }
      function m(e, t, n, r, o) {
        if ("string" == typeof r || "number" == typeof r)
          return u(t, (e = e.get(n) || null), "" + r, o);
        if ("object" == typeof r && null !== r) {
          switch (r.$$typeof) {
            case ee:
              return (
                (e = e.get(null === r.key ? n : r.key) || null),
                r.type === ne
                  ? f(t, e, r.props.children, o, r.key)
                  : c(t, e, r, o)
              );
            case te:
              return s(
                t,
                (e = e.get(null === r.key ? n : r.key) || null),
                r,
                o
              );
          }
          if (xa(r) || he(r)) return f(t, (e = e.get(n) || null), r, o, null);
          ka(t, r);
        }
        return null;
      }
      function h(o, i, l, u) {
        for (
          var c = null, s = null, f = i, h = (i = 0), v = null;
          null !== f && h < l.length;
          h++
        ) {
          f.index > h ? ((v = f), (f = null)) : (v = f.sibling);
          var y = p(o, f, l[h], u);
          if (null === y) {
            null === f && (f = v);
            break;
          }
          e && f && null === y.alternate && t(o, f),
            (i = a(y, i, h)),
            null === s ? (c = y) : (s.sibling = y),
            (s = y),
            (f = v);
        }
        if (h === l.length) return n(o, f), c;
        if (null === f) {
          for (; h < l.length; h++)
            null !== (f = d(o, l[h], u)) &&
              ((i = a(f, i, h)),
              null === s ? (c = f) : (s.sibling = f),
              (s = f));
          return c;
        }
        for (f = r(o, f); h < l.length; h++)
          null !== (v = m(f, o, h, l[h], u)) &&
            (e && null !== v.alternate && f.delete(null === v.key ? h : v.key),
            (i = a(v, i, h)),
            null === s ? (c = v) : (s.sibling = v),
            (s = v));
        return (
          e &&
            f.forEach(function (e) {
              return t(o, e);
            }),
          c
        );
      }
      function v(o, l, u, c) {
        var s = he(u);
        if ("function" != typeof s) throw Error(i(150));
        if (null == (u = s.call(u))) throw Error(i(151));
        for (
          var f = (s = null), h = l, v = (l = 0), y = null, g = u.next();
          null !== h && !g.done;
          v++, g = u.next()
        ) {
          h.index > v ? ((y = h), (h = null)) : (y = h.sibling);
          var b = p(o, h, g.value, c);
          if (null === b) {
            null === h && (h = y);
            break;
          }
          e && h && null === b.alternate && t(o, h),
            (l = a(b, l, v)),
            null === f ? (s = b) : (f.sibling = b),
            (f = b),
            (h = y);
        }
        if (g.done) return n(o, h), s;
        if (null === h) {
          for (; !g.done; v++, g = u.next())
            null !== (g = d(o, g.value, c)) &&
              ((l = a(g, l, v)),
              null === f ? (s = g) : (f.sibling = g),
              (f = g));
          return s;
        }
        for (h = r(o, h); !g.done; v++, g = u.next())
          null !== (g = m(h, o, v, g.value, c)) &&
            (e && null !== g.alternate && h.delete(null === g.key ? v : g.key),
            (l = a(g, l, v)),
            null === f ? (s = g) : (f.sibling = g),
            (f = g));
        return (
          e &&
            h.forEach(function (e) {
              return t(o, e);
            }),
          s
        );
      }
      return function (e, r, a, u) {
        var c =
          "object" == typeof a && null !== a && a.type === ne && null === a.key;
        c && (a = a.props.children);
        var s = "object" == typeof a && null !== a;
        if (s)
          switch (a.$$typeof) {
            case ee:
              e: {
                for (s = a.key, c = r; null !== c; ) {
                  if (c.key === s) {
                    switch (c.tag) {
                      case 7:
                        if (a.type === ne) {
                          n(e, c.sibling),
                            ((r = o(c, a.props.children)).return = e),
                            (e = r);
                          break e;
                        }
                        break;
                      default:
                        if (c.elementType === a.type) {
                          n(e, c.sibling),
                            ((r = o(c, a.props)).ref = Ea(e, c, a)),
                            (r.return = e),
                            (e = r);
                          break e;
                        }
                    }
                    n(e, c);
                    break;
                  }
                  t(e, c), (c = c.sibling);
                }
                a.type === ne
                  ? (((r = Pu(a.props.children, e.mode, u, a.key)).return = e),
                    (e = r))
                  : (((u = Cu(
                      a.type,
                      a.key,
                      a.props,
                      null,
                      e.mode,
                      u
                    )).ref = Ea(e, r, a)),
                    (u.return = e),
                    (e = u));
              }
              return l(e);
            case te:
              e: {
                for (c = a.key; null !== r; ) {
                  if (r.key === c) {
                    if (
                      4 === r.tag &&
                      r.stateNode.containerInfo === a.containerInfo &&
                      r.stateNode.implementation === a.implementation
                    ) {
                      n(e, r.sibling),
                        ((r = o(r, a.children || [])).return = e),
                        (e = r);
                      break e;
                    }
                    n(e, r);
                    break;
                  }
                  t(e, r), (r = r.sibling);
                }
                ((r = Au(a, e.mode, u)).return = e), (e = r);
              }
              return l(e);
          }
        if ("string" == typeof a || "number" == typeof a)
          return (
            (a = "" + a),
            null !== r && 6 === r.tag
              ? (n(e, r.sibling), ((r = o(r, a)).return = e), (e = r))
              : (n(e, r), ((r = Ou(a, e.mode, u)).return = e), (e = r)),
            l(e)
          );
        if (xa(a)) return h(e, r, a, u);
        if (he(a)) return v(e, r, a, u);
        if ((s && ka(e, a), void 0 === a && !c))
          switch (e.tag) {
            case 1:
            case 0:
              throw (
                ((e = e.type),
                Error(i(152, e.displayName || e.name || "Component")))
              );
          }
        return n(e, r);
      };
    }
    var Sa = Ta(!0),
      _a = Ta(!1),
      Ca = {},
      Pa = { current: Ca },
      Oa = { current: Ca },
      Aa = { current: Ca };
    function Na(e) {
      if (e === Ca) throw Error(i(174));
      return e;
    }
    function Ma(e, t) {
      switch ((co(Aa, t), co(Oa, e), co(Pa, Ca), (e = t.nodeType))) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : Le(null, "");
          break;
        default:
          t = Le(
            (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
            (e = e.tagName)
          );
      }
      uo(Pa), co(Pa, t);
    }
    function Ra() {
      uo(Pa), uo(Oa), uo(Aa);
    }
    function Ia(e) {
      Na(Aa.current);
      var t = Na(Pa.current),
        n = Le(t, e.type);
      t !== n && (co(Oa, e), co(Pa, n));
    }
    function za(e) {
      Oa.current === e && (uo(Pa), uo(Oa));
    }
    var Da = { current: 0 };
    function La(e) {
      for (var t = e; null !== t; ) {
        if (13 === t.tag) {
          var n = t.memoizedState;
          if (
            null !== n &&
            (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)
          )
            return t;
        } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
          if (0 != (64 & t.effectTag)) return t;
        } else if (null !== t.child) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break;
        for (; null === t.sibling; ) {
          if (null === t.return || t.return === e) return null;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
      return null;
    }
    function ja(e, t) {
      return { responder: e, props: t };
    }
    var Fa = Y.ReactCurrentDispatcher,
      Ua = Y.ReactCurrentBatchConfig,
      Ba = 0,
      Wa = null,
      Va = null,
      $a = null,
      Ha = !1;
    function Qa() {
      throw Error(i(321));
    }
    function Ka(e, t) {
      if (null === t) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!Lr(e[n], t[n])) return !1;
      return !0;
    }
    function qa(e, t, n, r, o, a) {
      if (
        ((Ba = a),
        (Wa = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.expirationTime = 0),
        (Fa.current = null === e || null === e.memoizedState ? yi : gi),
        (e = n(r, o)),
        t.expirationTime === Ba)
      ) {
        a = 0;
        do {
          if (((t.expirationTime = 0), !(25 > a))) throw Error(i(301));
          (a += 1),
            ($a = Va = null),
            (t.updateQueue = null),
            (Fa.current = bi),
            (e = n(r, o));
        } while (t.expirationTime === Ba);
      }
      if (
        ((Fa.current = vi),
        (t = null !== Va && null !== Va.next),
        (Ba = 0),
        ($a = Va = Wa = null),
        (Ha = !1),
        t)
      )
        throw Error(i(300));
      return e;
    }
    function Xa() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return null === $a ? (Wa.memoizedState = $a = e) : ($a = $a.next = e), $a;
    }
    function Ya() {
      if (null === Va) {
        var e = Wa.alternate;
        e = null !== e ? e.memoizedState : null;
      } else e = Va.next;
      var t = null === $a ? Wa.memoizedState : $a.next;
      if (null !== t) ($a = t), (Va = e);
      else {
        if (null === e) throw Error(i(310));
        (e = {
          memoizedState: (Va = e).memoizedState,
          baseState: Va.baseState,
          baseQueue: Va.baseQueue,
          queue: Va.queue,
          next: null,
        }),
          null === $a ? (Wa.memoizedState = $a = e) : ($a = $a.next = e);
      }
      return $a;
    }
    function Ga(e, t) {
      return "function" == typeof t ? t(e) : t;
    }
    function Ja(e) {
      var t = Ya(),
        n = t.queue;
      if (null === n) throw Error(i(311));
      n.lastRenderedReducer = e;
      var r = Va,
        o = r.baseQueue,
        a = n.pending;
      if (null !== a) {
        if (null !== o) {
          var l = o.next;
          (o.next = a.next), (a.next = l);
        }
        (r.baseQueue = o = a), (n.pending = null);
      }
      if (null !== o) {
        (o = o.next), (r = r.baseState);
        var u = (l = a = null),
          c = o;
        do {
          var s = c.expirationTime;
          if (s < Ba) {
            var f = {
              expirationTime: c.expirationTime,
              suspenseConfig: c.suspenseConfig,
              action: c.action,
              eagerReducer: c.eagerReducer,
              eagerState: c.eagerState,
              next: null,
            };
            null === u ? ((l = u = f), (a = r)) : (u = u.next = f),
              s > Wa.expirationTime && ((Wa.expirationTime = s), iu(s));
          } else
            null !== u &&
              (u = u.next = {
                expirationTime: 1073741823,
                suspenseConfig: c.suspenseConfig,
                action: c.action,
                eagerReducer: c.eagerReducer,
                eagerState: c.eagerState,
                next: null,
              }),
              au(s, c.suspenseConfig),
              (r = c.eagerReducer === e ? c.eagerState : e(r, c.action));
          c = c.next;
        } while (null !== c && c !== o);
        null === u ? (a = r) : (u.next = l),
          Lr(r, t.memoizedState) || (Ai = !0),
          (t.memoizedState = r),
          (t.baseState = a),
          (t.baseQueue = u),
          (n.lastRenderedState = r);
      }
      return [t.memoizedState, n.dispatch];
    }
    function Za(e) {
      var t = Ya(),
        n = t.queue;
      if (null === n) throw Error(i(311));
      n.lastRenderedReducer = e;
      var r = n.dispatch,
        o = n.pending,
        a = t.memoizedState;
      if (null !== o) {
        n.pending = null;
        var l = (o = o.next);
        do {
          (a = e(a, l.action)), (l = l.next);
        } while (l !== o);
        Lr(a, t.memoizedState) || (Ai = !0),
          (t.memoizedState = a),
          null === t.baseQueue && (t.baseState = a),
          (n.lastRenderedState = a);
      }
      return [a, r];
    }
    function ei(e) {
      var t = Xa();
      return (
        "function" == typeof e && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = (e = t.queue = {
          pending: null,
          dispatch: null,
          lastRenderedReducer: Ga,
          lastRenderedState: e,
        }).dispatch = hi.bind(null, Wa, e)),
        [t.memoizedState, e]
      );
    }
    function ti(e, t, n, r) {
      return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        null === (t = Wa.updateQueue)
          ? ((t = { lastEffect: null }),
            (Wa.updateQueue = t),
            (t.lastEffect = e.next = e))
          : null === (n = t.lastEffect)
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
        e
      );
    }
    function ni() {
      return Ya().memoizedState;
    }
    function ri(e, t, n, r) {
      var o = Xa();
      (Wa.effectTag |= e),
        (o.memoizedState = ti(1 | t, n, void 0, void 0 === r ? null : r));
    }
    function oi(e, t, n, r) {
      var o = Ya();
      r = void 0 === r ? null : r;
      var a = void 0;
      if (null !== Va) {
        var i = Va.memoizedState;
        if (((a = i.destroy), null !== r && Ka(r, i.deps)))
          return void ti(t, n, a, r);
      }
      (Wa.effectTag |= e), (o.memoizedState = ti(1 | t, n, a, r));
    }
    function ai(e, t) {
      return ri(516, 4, e, t);
    }
    function ii(e, t) {
      return oi(516, 4, e, t);
    }
    function li(e, t) {
      return oi(4, 2, e, t);
    }
    function ui(e, t) {
      return "function" == typeof t
        ? ((e = e()),
          t(e),
          function () {
            t(null);
          })
        : null != t
        ? ((e = e()),
          (t.current = e),
          function () {
            t.current = null;
          })
        : void 0;
    }
    function ci(e, t, n) {
      return (
        (n = null != n ? n.concat([e]) : null), oi(4, 2, ui.bind(null, t, e), n)
      );
    }
    function si() {}
    function fi(e, t) {
      return (Xa().memoizedState = [e, void 0 === t ? null : t]), e;
    }
    function di(e, t) {
      var n = Ya();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && Ka(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
    }
    function pi(e, t) {
      var n = Ya();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && Ka(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
    }
    function mi(e, t, n) {
      var r = Bo();
      Vo(98 > r ? 98 : r, function () {
        e(!0);
      }),
        Vo(97 < r ? 97 : r, function () {
          var r = Ua.suspense;
          Ua.suspense = void 0 === t ? null : t;
          try {
            e(!1), n();
          } finally {
            Ua.suspense = r;
          }
        });
    }
    function hi(e, t, n) {
      var r = Ql(),
        o = pa.suspense;
      o = {
        expirationTime: (r = Kl(r, e, o)),
        suspenseConfig: o,
        action: n,
        eagerReducer: null,
        eagerState: null,
        next: null,
      };
      var a = t.pending;
      if (
        (null === a ? (o.next = o) : ((o.next = a.next), (a.next = o)),
        (t.pending = o),
        (a = e.alternate),
        e === Wa || (null !== a && a === Wa))
      )
        (Ha = !0), (o.expirationTime = Ba), (Wa.expirationTime = Ba);
      else {
        if (
          0 === e.expirationTime &&
          (null === a || 0 === a.expirationTime) &&
          null !== (a = t.lastRenderedReducer)
        )
          try {
            var i = t.lastRenderedState,
              l = a(i, n);
            if (((o.eagerReducer = a), (o.eagerState = l), Lr(l, i))) return;
          } catch (e) {}
        ql(e, r);
      }
    }
    var vi = {
        readContext: oa,
        useCallback: Qa,
        useContext: Qa,
        useEffect: Qa,
        useImperativeHandle: Qa,
        useLayoutEffect: Qa,
        useMemo: Qa,
        useReducer: Qa,
        useRef: Qa,
        useState: Qa,
        useDebugValue: Qa,
        useResponder: Qa,
        useDeferredValue: Qa,
        useTransition: Qa,
      },
      yi = {
        readContext: oa,
        useCallback: fi,
        useContext: oa,
        useEffect: ai,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = null != n ? n.concat([e]) : null),
            ri(4, 2, ui.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return ri(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Xa();
          return (
            (t = void 0 === t ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = Xa();
          return (
            (t = void 0 !== n ? n(t) : t),
            (r.memoizedState = r.baseState = t),
            (e = (e = r.queue = {
              pending: null,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: t,
            }).dispatch = hi.bind(null, Wa, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          return (e = { current: e }), (Xa().memoizedState = e);
        },
        useState: ei,
        useDebugValue: si,
        useResponder: ja,
        useDeferredValue: function (e, t) {
          var n = ei(e),
            r = n[0],
            o = n[1];
          return (
            ai(
              function () {
                var n = Ua.suspense;
                Ua.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  Ua.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = ei(!1),
            n = t[0];
          return (t = t[1]), [fi(mi.bind(null, t, e), [t, e]), n];
        },
      },
      gi = {
        readContext: oa,
        useCallback: di,
        useContext: oa,
        useEffect: ii,
        useImperativeHandle: ci,
        useLayoutEffect: li,
        useMemo: pi,
        useReducer: Ja,
        useRef: ni,
        useState: function () {
          return Ja(Ga);
        },
        useDebugValue: si,
        useResponder: ja,
        useDeferredValue: function (e, t) {
          var n = Ja(Ga),
            r = n[0],
            o = n[1];
          return (
            ii(
              function () {
                var n = Ua.suspense;
                Ua.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  Ua.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Ja(Ga),
            n = t[0];
          return (t = t[1]), [di(mi.bind(null, t, e), [t, e]), n];
        },
      },
      bi = {
        readContext: oa,
        useCallback: di,
        useContext: oa,
        useEffect: ii,
        useImperativeHandle: ci,
        useLayoutEffect: li,
        useMemo: pi,
        useReducer: Za,
        useRef: ni,
        useState: function () {
          return Za(Ga);
        },
        useDebugValue: si,
        useResponder: ja,
        useDeferredValue: function (e, t) {
          var n = Za(Ga),
            r = n[0],
            o = n[1];
          return (
            ii(
              function () {
                var n = Ua.suspense;
                Ua.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  Ua.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Za(Ga),
            n = t[0];
          return (t = t[1]), [di(mi.bind(null, t, e), [t, e]), n];
        },
      },
      wi = null,
      xi = null,
      Ei = !1;
    function ki(e, t) {
      var n = Tu(5, null, null, 0);
      (n.elementType = "DELETED"),
        (n.type = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (n.effectTag = 8),
        null !== e.lastEffect
          ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
          : (e.firstEffect = e.lastEffect = n);
    }
    function Ti(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            null !==
              (t =
                1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase()
                  ? null
                  : t) && ((e.stateNode = t), !0)
          );
        case 6:
          return (
            null !==
              (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
            ((e.stateNode = t), !0)
          );
        case 13:
        default:
          return !1;
      }
    }
    function Si(e) {
      if (Ei) {
        var t = xi;
        if (t) {
          var n = t;
          if (!Ti(e, t)) {
            if (!(t = xn(n.nextSibling)) || !Ti(e, t))
              return (
                (e.effectTag = (-1025 & e.effectTag) | 2),
                (Ei = !1),
                void (wi = e)
              );
            ki(wi, n);
          }
          (wi = e), (xi = xn(t.firstChild));
        } else (e.effectTag = (-1025 & e.effectTag) | 2), (Ei = !1), (wi = e);
      }
    }
    function _i(e) {
      for (
        e = e.return;
        null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

      )
        e = e.return;
      wi = e;
    }
    function Ci(e) {
      if (e !== wi) return !1;
      if (!Ei) return _i(e), (Ei = !0), !1;
      var t = e.type;
      if (
        5 !== e.tag ||
        ("head" !== t && "body" !== t && !gn(t, e.memoizedProps))
      )
        for (t = xi; t; ) ki(e, t), (t = xn(t.nextSibling));
      if ((_i(e), 13 === e.tag)) {
        if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
          throw Error(i(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if ("/$" === n) {
                if (0 === t) {
                  xi = xn(e.nextSibling);
                  break e;
                }
                t--;
              } else ("$" !== n && "$!" !== n && "$?" !== n) || t++;
            }
            e = e.nextSibling;
          }
          xi = null;
        }
      } else xi = wi ? xn(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Pi() {
      (xi = wi = null), (Ei = !1);
    }
    var Oi = Y.ReactCurrentOwner,
      Ai = !1;
    function Ni(e, t, n, r) {
      t.child = null === e ? _a(t, null, n, r) : Sa(t, e.child, n, r);
    }
    function Mi(e, t, n, r, o) {
      n = n.render;
      var a = t.ref;
      return (
        ra(t, o),
        (r = qa(e, t, n, r, a, o)),
        null === e || Ai
          ? ((t.effectTag |= 1), Ni(e, t, r, o), t.child)
          : ((t.updateQueue = e.updateQueue),
            (t.effectTag &= -517),
            e.expirationTime <= o && (e.expirationTime = 0),
            qi(e, t, o))
      );
    }
    function Ri(e, t, n, r, o, a) {
      if (null === e) {
        var i = n.type;
        return "function" != typeof i ||
          Su(i) ||
          void 0 !== i.defaultProps ||
          null !== n.compare ||
          void 0 !== n.defaultProps
          ? (((e = Cu(n.type, null, r, null, t.mode, a)).ref = t.ref),
            (e.return = t),
            (t.child = e))
          : ((t.tag = 15), (t.type = i), Ii(e, t, i, r, o, a));
      }
      return (
        (i = e.child),
        o < a &&
        ((o = i.memoizedProps),
        (n = null !== (n = n.compare) ? n : Fr)(o, r) && e.ref === t.ref)
          ? qi(e, t, a)
          : ((t.effectTag |= 1),
            ((e = _u(i, r)).ref = t.ref),
            (e.return = t),
            (t.child = e))
      );
    }
    function Ii(e, t, n, r, o, a) {
      return null !== e &&
        Fr(e.memoizedProps, r) &&
        e.ref === t.ref &&
        ((Ai = !1), o < a)
        ? ((t.expirationTime = e.expirationTime), qi(e, t, a))
        : Di(e, t, n, r, a);
    }
    function zi(e, t) {
      var n = t.ref;
      ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
        (t.effectTag |= 128);
    }
    function Di(e, t, n, r, o) {
      var a = vo(n) ? mo : fo.current;
      return (
        (a = ho(t, a)),
        ra(t, o),
        (n = qa(e, t, n, r, a, o)),
        null === e || Ai
          ? ((t.effectTag |= 1), Ni(e, t, n, o), t.child)
          : ((t.updateQueue = e.updateQueue),
            (t.effectTag &= -517),
            e.expirationTime <= o && (e.expirationTime = 0),
            qi(e, t, o))
      );
    }
    function Li(e, t, n, r, o) {
      if (vo(n)) {
        var a = !0;
        wo(t);
      } else a = !1;
      if ((ra(t, o), null === t.stateNode))
        null !== e &&
          ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
          ga(t, n, r),
          wa(t, n, r, o),
          (r = !0);
      else if (null === e) {
        var i = t.stateNode,
          l = t.memoizedProps;
        i.props = l;
        var u = i.context,
          c = n.contextType;
        "object" == typeof c && null !== c
          ? (c = oa(c))
          : (c = ho(t, (c = vo(n) ? mo : fo.current)));
        var s = n.getDerivedStateFromProps,
          f =
            "function" == typeof s ||
            "function" == typeof i.getSnapshotBeforeUpdate;
        f ||
          ("function" != typeof i.UNSAFE_componentWillReceiveProps &&
            "function" != typeof i.componentWillReceiveProps) ||
          ((l !== r || u !== c) && ba(t, i, r, c)),
          (aa = !1);
        var d = t.memoizedState;
        (i.state = d),
          fa(t, r, i, o),
          (u = t.memoizedState),
          l !== r || d !== u || po.current || aa
            ? ("function" == typeof s &&
                (ha(t, n, s, r), (u = t.memoizedState)),
              (l = aa || ya(t, n, l, r, d, u, c))
                ? (f ||
                    ("function" != typeof i.UNSAFE_componentWillMount &&
                      "function" != typeof i.componentWillMount) ||
                    ("function" == typeof i.componentWillMount &&
                      i.componentWillMount(),
                    "function" == typeof i.UNSAFE_componentWillMount &&
                      i.UNSAFE_componentWillMount()),
                  "function" == typeof i.componentDidMount &&
                    (t.effectTag |= 4))
                : ("function" == typeof i.componentDidMount &&
                    (t.effectTag |= 4),
                  (t.memoizedProps = r),
                  (t.memoizedState = u)),
              (i.props = r),
              (i.state = u),
              (i.context = c),
              (r = l))
            : ("function" == typeof i.componentDidMount && (t.effectTag |= 4),
              (r = !1));
      } else
        (i = t.stateNode),
          la(e, t),
          (l = t.memoizedProps),
          (i.props = t.type === t.elementType ? l : Xo(t.type, l)),
          (u = i.context),
          "object" == typeof (c = n.contextType) && null !== c
            ? (c = oa(c))
            : (c = ho(t, (c = vo(n) ? mo : fo.current))),
          (f =
            "function" == typeof (s = n.getDerivedStateFromProps) ||
            "function" == typeof i.getSnapshotBeforeUpdate) ||
            ("function" != typeof i.UNSAFE_componentWillReceiveProps &&
              "function" != typeof i.componentWillReceiveProps) ||
            ((l !== r || u !== c) && ba(t, i, r, c)),
          (aa = !1),
          (u = t.memoizedState),
          (i.state = u),
          fa(t, r, i, o),
          (d = t.memoizedState),
          l !== r || u !== d || po.current || aa
            ? ("function" == typeof s &&
                (ha(t, n, s, r), (d = t.memoizedState)),
              (s = aa || ya(t, n, l, r, u, d, c))
                ? (f ||
                    ("function" != typeof i.UNSAFE_componentWillUpdate &&
                      "function" != typeof i.componentWillUpdate) ||
                    ("function" == typeof i.componentWillUpdate &&
                      i.componentWillUpdate(r, d, c),
                    "function" == typeof i.UNSAFE_componentWillUpdate &&
                      i.UNSAFE_componentWillUpdate(r, d, c)),
                  "function" == typeof i.componentDidUpdate &&
                    (t.effectTag |= 4),
                  "function" == typeof i.getSnapshotBeforeUpdate &&
                    (t.effectTag |= 256))
                : ("function" != typeof i.componentDidUpdate ||
                    (l === e.memoizedProps && u === e.memoizedState) ||
                    (t.effectTag |= 4),
                  "function" != typeof i.getSnapshotBeforeUpdate ||
                    (l === e.memoizedProps && u === e.memoizedState) ||
                    (t.effectTag |= 256),
                  (t.memoizedProps = r),
                  (t.memoizedState = d)),
              (i.props = r),
              (i.state = d),
              (i.context = c),
              (r = s))
            : ("function" != typeof i.componentDidUpdate ||
                (l === e.memoizedProps && u === e.memoizedState) ||
                (t.effectTag |= 4),
              "function" != typeof i.getSnapshotBeforeUpdate ||
                (l === e.memoizedProps && u === e.memoizedState) ||
                (t.effectTag |= 256),
              (r = !1));
      return ji(e, t, n, r, a, o);
    }
    function ji(e, t, n, r, o, a) {
      zi(e, t);
      var i = 0 != (64 & t.effectTag);
      if (!r && !i) return o && xo(t, n, !1), qi(e, t, a);
      (r = t.stateNode), (Oi.current = t);
      var l =
        i && "function" != typeof n.getDerivedStateFromError
          ? null
          : r.render();
      return (
        (t.effectTag |= 1),
        null !== e && i
          ? ((t.child = Sa(t, e.child, null, a)), (t.child = Sa(t, null, l, a)))
          : Ni(e, t, l, a),
        (t.memoizedState = r.state),
        o && xo(t, n, !0),
        t.child
      );
    }
    function Fi(e) {
      var t = e.stateNode;
      t.pendingContext
        ? go(0, t.pendingContext, t.pendingContext !== t.context)
        : t.context && go(0, t.context, !1),
        Ma(e, t.containerInfo);
    }
    var Ui,
      Bi,
      Wi,
      Vi = { dehydrated: null, retryTime: 0 };
    function $i(e, t, n) {
      var r,
        o = t.mode,
        a = t.pendingProps,
        i = Da.current,
        l = !1;
      if (
        ((r = 0 != (64 & t.effectTag)) ||
          (r = 0 != (2 & i) && (null === e || null !== e.memoizedState)),
        r
          ? ((l = !0), (t.effectTag &= -65))
          : (null !== e && null === e.memoizedState) ||
            void 0 === a.fallback ||
            !0 === a.unstable_avoidThisFallback ||
            (i |= 1),
        co(Da, 1 & i),
        null === e)
      ) {
        if ((void 0 !== a.fallback && Si(t), l)) {
          if (
            ((l = a.fallback),
            ((a = Pu(null, o, 0, null)).return = t),
            0 == (2 & t.mode))
          )
            for (
              e = null !== t.memoizedState ? t.child.child : t.child,
                a.child = e;
              null !== e;

            )
              (e.return = a), (e = e.sibling);
          return (
            ((n = Pu(l, o, n, null)).return = t),
            (a.sibling = n),
            (t.memoizedState = Vi),
            (t.child = a),
            n
          );
        }
        return (
          (o = a.children),
          (t.memoizedState = null),
          (t.child = _a(t, null, o, n))
        );
      }
      if (null !== e.memoizedState) {
        if (((o = (e = e.child).sibling), l)) {
          if (
            ((a = a.fallback),
            ((n = _u(e, e.pendingProps)).return = t),
            0 == (2 & t.mode) &&
              (l = null !== t.memoizedState ? t.child.child : t.child) !==
                e.child)
          )
            for (n.child = l; null !== l; ) (l.return = n), (l = l.sibling);
          return (
            ((o = _u(o, a)).return = t),
            (n.sibling = o),
            (n.childExpirationTime = 0),
            (t.memoizedState = Vi),
            (t.child = n),
            o
          );
        }
        return (
          (n = Sa(t, e.child, a.children, n)),
          (t.memoizedState = null),
          (t.child = n)
        );
      }
      if (((e = e.child), l)) {
        if (
          ((l = a.fallback),
          ((a = Pu(null, o, 0, null)).return = t),
          (a.child = e),
          null !== e && (e.return = a),
          0 == (2 & t.mode))
        )
          for (
            e = null !== t.memoizedState ? t.child.child : t.child, a.child = e;
            null !== e;

          )
            (e.return = a), (e = e.sibling);
        return (
          ((n = Pu(l, o, n, null)).return = t),
          (a.sibling = n),
          (n.effectTag |= 2),
          (a.childExpirationTime = 0),
          (t.memoizedState = Vi),
          (t.child = a),
          n
        );
      }
      return (t.memoizedState = null), (t.child = Sa(t, e, a.children, n));
    }
    function Hi(e, t) {
      e.expirationTime < t && (e.expirationTime = t);
      var n = e.alternate;
      null !== n && n.expirationTime < t && (n.expirationTime = t),
        na(e.return, t);
    }
    function Qi(e, t, n, r, o, a) {
      var i = e.memoizedState;
      null === i
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailExpiration: 0,
            tailMode: o,
            lastEffect: a,
          })
        : ((i.isBackwards = t),
          (i.rendering = null),
          (i.renderingStartTime = 0),
          (i.last = r),
          (i.tail = n),
          (i.tailExpiration = 0),
          (i.tailMode = o),
          (i.lastEffect = a));
    }
    function Ki(e, t, n) {
      var r = t.pendingProps,
        o = r.revealOrder,
        a = r.tail;
      if ((Ni(e, t, r.children, n), 0 != (2 & (r = Da.current))))
        (r = (1 & r) | 2), (t.effectTag |= 64);
      else {
        if (null !== e && 0 != (64 & e.effectTag))
          e: for (e = t.child; null !== e; ) {
            if (13 === e.tag) null !== e.memoizedState && Hi(e, n);
            else if (19 === e.tag) Hi(e, n);
            else if (null !== e.child) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break e;
            for (; null === e.sibling; ) {
              if (null === e.return || e.return === t) break e;
              e = e.return;
            }
            (e.sibling.return = e.return), (e = e.sibling);
          }
        r &= 1;
      }
      if ((co(Da, r), 0 == (2 & t.mode))) t.memoizedState = null;
      else
        switch (o) {
          case "forwards":
            for (n = t.child, o = null; null !== n; )
              null !== (e = n.alternate) && null === La(e) && (o = n),
                (n = n.sibling);
            null === (n = o)
              ? ((o = t.child), (t.child = null))
              : ((o = n.sibling), (n.sibling = null)),
              Qi(t, !1, o, n, a, t.lastEffect);
            break;
          case "backwards":
            for (n = null, o = t.child, t.child = null; null !== o; ) {
              if (null !== (e = o.alternate) && null === La(e)) {
                t.child = o;
                break;
              }
              (e = o.sibling), (o.sibling = n), (n = o), (o = e);
            }
            Qi(t, !0, n, null, a, t.lastEffect);
            break;
          case "together":
            Qi(t, !1, null, null, void 0, t.lastEffect);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function qi(e, t, n) {
      null !== e && (t.dependencies = e.dependencies);
      var r = t.expirationTime;
      if ((0 !== r && iu(r), t.childExpirationTime < n)) return null;
      if (null !== e && t.child !== e.child) throw Error(i(153));
      if (null !== t.child) {
        for (
          n = _u((e = t.child), e.pendingProps), t.child = n, n.return = t;
          null !== e.sibling;

        )
          (e = e.sibling), ((n = n.sibling = _u(e, e.pendingProps)).return = t);
        n.sibling = null;
      }
      return t.child;
    }
    function Xi(e, t) {
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; null !== t; )
            null !== t.alternate && (n = t), (t = t.sibling);
          null === n ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; null !== n; )
            null !== n.alternate && (r = n), (n = n.sibling);
          null === r
            ? t || null === e.tail
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
    }
    function Yi(e, t, n) {
      var r = t.pendingProps;
      switch (t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return null;
        case 1:
          return vo(t.type) && yo(), null;
        case 3:
          return (
            Ra(),
            uo(po),
            uo(fo),
            (n = t.stateNode).pendingContext &&
              ((n.context = n.pendingContext), (n.pendingContext = null)),
            (null !== e && null !== e.child) || !Ci(t) || (t.effectTag |= 4),
            null
          );
        case 5:
          za(t), (n = Na(Aa.current));
          var a = t.type;
          if (null !== e && null != t.stateNode)
            Bi(e, t, a, r, n), e.ref !== t.ref && (t.effectTag |= 128);
          else {
            if (!r) {
              if (null === t.stateNode) throw Error(i(166));
              return null;
            }
            if (((e = Na(Pa.current)), Ci(t))) {
              (r = t.stateNode), (a = t.type);
              var l = t.memoizedProps;
              switch (((r[Tn] = t), (r[Sn] = l), a)) {
                case "iframe":
                case "object":
                case "embed":
                  Kt("load", r);
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < Ye.length; e++) Kt(Ye[e], r);
                  break;
                case "source":
                  Kt("error", r);
                  break;
                case "img":
                case "image":
                case "link":
                  Kt("error", r), Kt("load", r);
                  break;
                case "form":
                  Kt("reset", r), Kt("submit", r);
                  break;
                case "details":
                  Kt("toggle", r);
                  break;
                case "input":
                  ke(r, l), Kt("invalid", r), un(n, "onChange");
                  break;
                case "select":
                  (r._wrapperState = { wasMultiple: !!l.multiple }),
                    Kt("invalid", r),
                    un(n, "onChange");
                  break;
                case "textarea":
                  Ne(r, l), Kt("invalid", r), un(n, "onChange");
              }
              for (var u in (on(a, l), (e = null), l))
                if (l.hasOwnProperty(u)) {
                  var c = l[u];
                  "children" === u
                    ? "string" == typeof c
                      ? r.textContent !== c && (e = ["children", c])
                      : "number" == typeof c &&
                        r.textContent !== "" + c &&
                        (e = ["children", "" + c])
                    : T.hasOwnProperty(u) && null != c && un(n, u);
                }
              switch (a) {
                case "input":
                  we(r), _e(r, l, !0);
                  break;
                case "textarea":
                  we(r), Re(r);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  "function" == typeof l.onClick && (r.onclick = cn);
              }
              (n = e), (t.updateQueue = n), null !== n && (t.effectTag |= 4);
            } else {
              switch (
                ((u = 9 === n.nodeType ? n : n.ownerDocument),
                e === ln && (e = De(a)),
                e === ln
                  ? "script" === a
                    ? (((e = u.createElement("div")).innerHTML =
                        "<script></script>"),
                      (e = e.removeChild(e.firstChild)))
                    : "string" == typeof r.is
                    ? (e = u.createElement(a, { is: r.is }))
                    : ((e = u.createElement(a)),
                      "select" === a &&
                        ((u = e),
                        r.multiple
                          ? (u.multiple = !0)
                          : r.size && (u.size = r.size)))
                  : (e = u.createElementNS(e, a)),
                (e[Tn] = t),
                (e[Sn] = r),
                Ui(e, t),
                (t.stateNode = e),
                (u = an(a, r)),
                a)
              ) {
                case "iframe":
                case "object":
                case "embed":
                  Kt("load", e), (c = r);
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < Ye.length; c++) Kt(Ye[c], e);
                  c = r;
                  break;
                case "source":
                  Kt("error", e), (c = r);
                  break;
                case "img":
                case "image":
                case "link":
                  Kt("error", e), Kt("load", e), (c = r);
                  break;
                case "form":
                  Kt("reset", e), Kt("submit", e), (c = r);
                  break;
                case "details":
                  Kt("toggle", e), (c = r);
                  break;
                case "input":
                  ke(e, r), (c = Ee(e, r)), Kt("invalid", e), un(n, "onChange");
                  break;
                case "option":
                  c = Pe(e, r);
                  break;
                case "select":
                  (e._wrapperState = { wasMultiple: !!r.multiple }),
                    (c = o({}, r, { value: void 0 })),
                    Kt("invalid", e),
                    un(n, "onChange");
                  break;
                case "textarea":
                  Ne(e, r), (c = Ae(e, r)), Kt("invalid", e), un(n, "onChange");
                  break;
                default:
                  c = r;
              }
              on(a, c);
              var s = c;
              for (l in s)
                if (s.hasOwnProperty(l)) {
                  var f = s[l];
                  "style" === l
                    ? nn(e, f)
                    : "dangerouslySetInnerHTML" === l
                    ? null != (f = f ? f.__html : void 0) && Fe(e, f)
                    : "children" === l
                    ? "string" == typeof f
                      ? ("textarea" !== a || "" !== f) && Ue(e, f)
                      : "number" == typeof f && Ue(e, "" + f)
                    : "suppressContentEditableWarning" !== l &&
                      "suppressHydrationWarning" !== l &&
                      "autoFocus" !== l &&
                      (T.hasOwnProperty(l)
                        ? null != f && un(n, l)
                        : null != f && G(e, l, f, u));
                }
              switch (a) {
                case "input":
                  we(e), _e(e, r, !1);
                  break;
                case "textarea":
                  we(e), Re(e);
                  break;
                case "option":
                  null != r.value && e.setAttribute("value", "" + ge(r.value));
                  break;
                case "select":
                  (e.multiple = !!r.multiple),
                    null != (n = r.value)
                      ? Oe(e, !!r.multiple, n, !1)
                      : null != r.defaultValue &&
                        Oe(e, !!r.multiple, r.defaultValue, !0);
                  break;
                default:
                  "function" == typeof c.onClick && (e.onclick = cn);
              }
              yn(a, r) && (t.effectTag |= 4);
            }
            null !== t.ref && (t.effectTag |= 128);
          }
          return null;
        case 6:
          if (e && null != t.stateNode) Wi(0, t, e.memoizedProps, r);
          else {
            if ("string" != typeof r && null === t.stateNode)
              throw Error(i(166));
            (n = Na(Aa.current)),
              Na(Pa.current),
              Ci(t)
                ? ((n = t.stateNode),
                  (r = t.memoizedProps),
                  (n[Tn] = t),
                  n.nodeValue !== r && (t.effectTag |= 4))
                : (((n = (9 === n.nodeType
                    ? n
                    : n.ownerDocument
                  ).createTextNode(r))[Tn] = t),
                  (t.stateNode = n));
          }
          return null;
        case 13:
          return (
            uo(Da),
            (r = t.memoizedState),
            0 != (64 & t.effectTag)
              ? ((t.expirationTime = n), t)
              : ((n = null !== r),
                (r = !1),
                null === e
                  ? void 0 !== t.memoizedProps.fallback && Ci(t)
                  : ((r = null !== (a = e.memoizedState)),
                    n ||
                      null === a ||
                      (null !== (a = e.child.sibling) &&
                        (null !== (l = t.firstEffect)
                          ? ((t.firstEffect = a), (a.nextEffect = l))
                          : ((t.firstEffect = t.lastEffect = a),
                            (a.nextEffect = null)),
                        (a.effectTag = 8)))),
                n &&
                  !r &&
                  0 != (2 & t.mode) &&
                  ((null === e &&
                    !0 !== t.memoizedProps.unstable_avoidThisFallback) ||
                  0 != (1 & Da.current)
                    ? Cl === wl && (Cl = xl)
                    : ((Cl !== wl && Cl !== xl) || (Cl = El),
                      0 !== Ml && null !== Tl && (Ru(Tl, _l), Iu(Tl, Ml)))),
                (n || r) && (t.effectTag |= 4),
                null)
          );
        case 4:
          return Ra(), null;
        case 10:
          return ta(t), null;
        case 17:
          return vo(t.type) && yo(), null;
        case 19:
          if ((uo(Da), null === (r = t.memoizedState))) return null;
          if (((a = 0 != (64 & t.effectTag)), null === (l = r.rendering))) {
            if (a) Xi(r, !1);
            else if (Cl !== wl || (null !== e && 0 != (64 & e.effectTag)))
              for (l = t.child; null !== l; ) {
                if (null !== (e = La(l))) {
                  for (
                    t.effectTag |= 64,
                      Xi(r, !1),
                      null !== (a = e.updateQueue) &&
                        ((t.updateQueue = a), (t.effectTag |= 4)),
                      null === r.lastEffect && (t.firstEffect = null),
                      t.lastEffect = r.lastEffect,
                      r = t.child;
                    null !== r;

                  )
                    (l = n),
                      ((a = r).effectTag &= 2),
                      (a.nextEffect = null),
                      (a.firstEffect = null),
                      (a.lastEffect = null),
                      null === (e = a.alternate)
                        ? ((a.childExpirationTime = 0),
                          (a.expirationTime = l),
                          (a.child = null),
                          (a.memoizedProps = null),
                          (a.memoizedState = null),
                          (a.updateQueue = null),
                          (a.dependencies = null))
                        : ((a.childExpirationTime = e.childExpirationTime),
                          (a.expirationTime = e.expirationTime),
                          (a.child = e.child),
                          (a.memoizedProps = e.memoizedProps),
                          (a.memoizedState = e.memoizedState),
                          (a.updateQueue = e.updateQueue),
                          (l = e.dependencies),
                          (a.dependencies =
                            null === l
                              ? null
                              : {
                                  expirationTime: l.expirationTime,
                                  firstContext: l.firstContext,
                                  responders: l.responders,
                                })),
                      (r = r.sibling);
                  return co(Da, (1 & Da.current) | 2), t.child;
                }
                l = l.sibling;
              }
          } else {
            if (!a)
              if (null !== (e = La(l))) {
                if (
                  ((t.effectTag |= 64),
                  (a = !0),
                  null !== (n = e.updateQueue) &&
                    ((t.updateQueue = n), (t.effectTag |= 4)),
                  Xi(r, !0),
                  null === r.tail && "hidden" === r.tailMode && !l.alternate)
                )
                  return (
                    null !== (t = t.lastEffect = r.lastEffect) &&
                      (t.nextEffect = null),
                    null
                  );
              } else
                2 * Uo() - r.renderingStartTime > r.tailExpiration &&
                  1 < n &&
                  ((t.effectTag |= 64),
                  (a = !0),
                  Xi(r, !1),
                  (t.expirationTime = t.childExpirationTime = n - 1));
            r.isBackwards
              ? ((l.sibling = t.child), (t.child = l))
              : (null !== (n = r.last) ? (n.sibling = l) : (t.child = l),
                (r.last = l));
          }
          return null !== r.tail
            ? (0 === r.tailExpiration && (r.tailExpiration = Uo() + 500),
              (n = r.tail),
              (r.rendering = n),
              (r.tail = n.sibling),
              (r.lastEffect = t.lastEffect),
              (r.renderingStartTime = Uo()),
              (n.sibling = null),
              (t = Da.current),
              co(Da, a ? (1 & t) | 2 : 1 & t),
              n)
            : null;
      }
      throw Error(i(156, t.tag));
    }
    function Gi(e) {
      switch (e.tag) {
        case 1:
          vo(e.type) && yo();
          var t = e.effectTag;
          return 4096 & t ? ((e.effectTag = (-4097 & t) | 64), e) : null;
        case 3:
          if ((Ra(), uo(po), uo(fo), 0 != (64 & (t = e.effectTag))))
            throw Error(i(285));
          return (e.effectTag = (-4097 & t) | 64), e;
        case 5:
          return za(e), null;
        case 13:
          return (
            uo(Da),
            4096 & (t = e.effectTag)
              ? ((e.effectTag = (-4097 & t) | 64), e)
              : null
          );
        case 19:
          return uo(Da), null;
        case 4:
          return Ra(), null;
        case 10:
          return ta(e), null;
        default:
          return null;
      }
    }
    function Ji(e, t) {
      return { value: e, source: t, stack: ye(t) };
    }
    (Ui = function (e, t) {
      for (var n = t.child; null !== n; ) {
        if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
        else if (4 !== n.tag && null !== n.child) {
          (n.child.return = n), (n = n.child);
          continue;
        }
        if (n === t) break;
        for (; null === n.sibling; ) {
          if (null === n.return || n.return === t) return;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
    }),
      (Bi = function (e, t, n, r, a) {
        var i = e.memoizedProps;
        if (i !== r) {
          var l,
            u,
            c = t.stateNode;
          switch ((Na(Pa.current), (e = null), n)) {
            case "input":
              (i = Ee(c, i)), (r = Ee(c, r)), (e = []);
              break;
            case "option":
              (i = Pe(c, i)), (r = Pe(c, r)), (e = []);
              break;
            case "select":
              (i = o({}, i, { value: void 0 })),
                (r = o({}, r, { value: void 0 })),
                (e = []);
              break;
            case "textarea":
              (i = Ae(c, i)), (r = Ae(c, r)), (e = []);
              break;
            default:
              "function" != typeof i.onClick &&
                "function" == typeof r.onClick &&
                (c.onclick = cn);
          }
          for (l in (on(n, r), (n = null), i))
            if (!r.hasOwnProperty(l) && i.hasOwnProperty(l) && null != i[l])
              if ("style" === l)
                for (u in (c = i[l]))
                  c.hasOwnProperty(u) && (n || (n = {}), (n[u] = ""));
              else
                "dangerouslySetInnerHTML" !== l &&
                  "children" !== l &&
                  "suppressContentEditableWarning" !== l &&
                  "suppressHydrationWarning" !== l &&
                  "autoFocus" !== l &&
                  (T.hasOwnProperty(l)
                    ? e || (e = [])
                    : (e = e || []).push(l, null));
          for (l in r) {
            var s = r[l];
            if (
              ((c = null != i ? i[l] : void 0),
              r.hasOwnProperty(l) && s !== c && (null != s || null != c))
            )
              if ("style" === l)
                if (c) {
                  for (u in c)
                    !c.hasOwnProperty(u) ||
                      (s && s.hasOwnProperty(u)) ||
                      (n || (n = {}), (n[u] = ""));
                  for (u in s)
                    s.hasOwnProperty(u) &&
                      c[u] !== s[u] &&
                      (n || (n = {}), (n[u] = s[u]));
                } else n || (e || (e = []), e.push(l, n)), (n = s);
              else
                "dangerouslySetInnerHTML" === l
                  ? ((s = s ? s.__html : void 0),
                    (c = c ? c.__html : void 0),
                    null != s && c !== s && (e = e || []).push(l, s))
                  : "children" === l
                  ? c === s ||
                    ("string" != typeof s && "number" != typeof s) ||
                    (e = e || []).push(l, "" + s)
                  : "suppressContentEditableWarning" !== l &&
                    "suppressHydrationWarning" !== l &&
                    (T.hasOwnProperty(l)
                      ? (null != s && un(a, l), e || c === s || (e = []))
                      : (e = e || []).push(l, s));
          }
          n && (e = e || []).push("style", n),
            (a = e),
            (t.updateQueue = a) && (t.effectTag |= 4);
        }
      }),
      (Wi = function (e, t, n, r) {
        n !== r && (t.effectTag |= 4);
      });
    var Zi = "function" == typeof WeakSet ? WeakSet : Set;
    function el(e, t) {
      var n = t.source,
        r = t.stack;
      null === r && null !== n && (r = ye(n)),
        null !== n && ve(n.type),
        (t = t.value),
        null !== e && 1 === e.tag && ve(e.type);
      try {
        console.error(t);
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function tl(e) {
      var t = e.ref;
      if (null !== t)
        if ("function" == typeof t)
          try {
            t(null);
          } catch (t) {
            gu(e, t);
          }
        else t.current = null;
    }
    function nl(e, t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return;
        case 1:
          if (256 & t.effectTag && null !== e) {
            var n = e.memoizedProps,
              r = e.memoizedState;
            (t = (e = t.stateNode).getSnapshotBeforeUpdate(
              t.elementType === t.type ? n : Xo(t.type, n),
              r
            )),
              (e.__reactInternalSnapshotBeforeUpdate = t);
          }
          return;
        case 3:
        case 5:
        case 6:
        case 4:
        case 17:
          return;
      }
      throw Error(i(163));
    }
    function rl(e, t) {
      if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
        var n = (t = t.next);
        do {
          if ((n.tag & e) === e) {
            var r = n.destroy;
            (n.destroy = void 0), void 0 !== r && r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function ol(e, t) {
      if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
        var n = (t = t.next);
        do {
          if ((n.tag & e) === e) {
            var r = n.create;
            n.destroy = r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function al(e, t, n) {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return void ol(3, n);
        case 1:
          if (((e = n.stateNode), 4 & n.effectTag))
            if (null === t) e.componentDidMount();
            else {
              var r =
                n.elementType === n.type
                  ? t.memoizedProps
                  : Xo(n.type, t.memoizedProps);
              e.componentDidUpdate(
                r,
                t.memoizedState,
                e.__reactInternalSnapshotBeforeUpdate
              );
            }
          return void (null !== (t = n.updateQueue) && da(n, t, e));
        case 3:
          if (null !== (t = n.updateQueue)) {
            if (((e = null), null !== n.child))
              switch (n.child.tag) {
                case 5:
                  e = n.child.stateNode;
                  break;
                case 1:
                  e = n.child.stateNode;
              }
            da(n, t, e);
          }
          return;
        case 5:
          return (
            (e = n.stateNode),
            void (
              null === t &&
              4 & n.effectTag &&
              yn(n.type, n.memoizedProps) &&
              e.focus()
            )
          );
        case 6:
        case 4:
        case 12:
          return;
        case 13:
          return void (
            null === n.memoizedState &&
            ((n = n.alternate),
            null !== n &&
              ((n = n.memoizedState),
              null !== n && ((n = n.dehydrated), null !== n && Dt(n))))
          );
        case 19:
        case 17:
        case 20:
        case 21:
          return;
      }
      throw Error(i(163));
    }
    function il(e, t, n) {
      switch (("function" == typeof Eu && Eu(t), t.tag)) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
            var r = e.next;
            Vo(97 < n ? 97 : n, function () {
              var e = r;
              do {
                var n = e.destroy;
                if (void 0 !== n) {
                  var o = t;
                  try {
                    n();
                  } catch (e) {
                    gu(o, e);
                  }
                }
                e = e.next;
              } while (e !== r);
            });
          }
          break;
        case 1:
          tl(t),
            "function" == typeof (n = t.stateNode).componentWillUnmount &&
              (function (e, t) {
                try {
                  (t.props = e.memoizedProps),
                    (t.state = e.memoizedState),
                    t.componentWillUnmount();
                } catch (t) {
                  gu(e, t);
                }
              })(t, n);
          break;
        case 5:
          tl(t);
          break;
        case 4:
          sl(e, t, n);
      }
    }
    function ll(e) {
      var t = e.alternate;
      (e.return = null),
        (e.child = null),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.dependencies = null),
        (e.alternate = null),
        (e.firstEffect = null),
        (e.lastEffect = null),
        (e.pendingProps = null),
        (e.memoizedProps = null),
        (e.stateNode = null),
        null !== t && ll(t);
    }
    function ul(e) {
      return 5 === e.tag || 3 === e.tag || 4 === e.tag;
    }
    function cl(e) {
      e: {
        for (var t = e.return; null !== t; ) {
          if (ul(t)) {
            var n = t;
            break e;
          }
          t = t.return;
        }
        throw Error(i(160));
      }
      switch (((t = n.stateNode), n.tag)) {
        case 5:
          var r = !1;
          break;
        case 3:
        case 4:
          (t = t.containerInfo), (r = !0);
          break;
        default:
          throw Error(i(161));
      }
      16 & n.effectTag && (Ue(t, ""), (n.effectTag &= -17));
      e: t: for (n = e; ; ) {
        for (; null === n.sibling; ) {
          if (null === n.return || ul(n.return)) {
            n = null;
            break e;
          }
          n = n.return;
        }
        for (
          n.sibling.return = n.return, n = n.sibling;
          5 !== n.tag && 6 !== n.tag && 18 !== n.tag;

        ) {
          if (2 & n.effectTag) continue t;
          if (null === n.child || 4 === n.tag) continue t;
          (n.child.return = n), (n = n.child);
        }
        if (!(2 & n.effectTag)) {
          n = n.stateNode;
          break e;
        }
      }
      r
        ? (function e(t, n, r) {
            var o = t.tag,
              a = 5 === o || 6 === o;
            if (a)
              (t = a ? t.stateNode : t.stateNode.instance),
                n
                  ? 8 === r.nodeType
                    ? r.parentNode.insertBefore(t, n)
                    : r.insertBefore(t, n)
                  : (8 === r.nodeType
                      ? (n = r.parentNode).insertBefore(t, r)
                      : (n = r).appendChild(t),
                    (null !== (r = r._reactRootContainer) && void 0 !== r) ||
                      null !== n.onclick ||
                      (n.onclick = cn));
            else if (4 !== o && null !== (t = t.child))
              for (e(t, n, r), t = t.sibling; null !== t; )
                e(t, n, r), (t = t.sibling);
          })(e, n, t)
        : (function e(t, n, r) {
            var o = t.tag,
              a = 5 === o || 6 === o;
            if (a)
              (t = a ? t.stateNode : t.stateNode.instance),
                n ? r.insertBefore(t, n) : r.appendChild(t);
            else if (4 !== o && null !== (t = t.child))
              for (e(t, n, r), t = t.sibling; null !== t; )
                e(t, n, r), (t = t.sibling);
          })(e, n, t);
    }
    function sl(e, t, n) {
      for (var r, o, a = t, l = !1; ; ) {
        if (!l) {
          l = a.return;
          e: for (;;) {
            if (null === l) throw Error(i(160));
            switch (((r = l.stateNode), l.tag)) {
              case 5:
                o = !1;
                break e;
              case 3:
              case 4:
                (r = r.containerInfo), (o = !0);
                break e;
            }
            l = l.return;
          }
          l = !0;
        }
        if (5 === a.tag || 6 === a.tag) {
          e: for (var u = e, c = a, s = n, f = c; ; )
            if ((il(u, f, s), null !== f.child && 4 !== f.tag))
              (f.child.return = f), (f = f.child);
            else {
              if (f === c) break e;
              for (; null === f.sibling; ) {
                if (null === f.return || f.return === c) break e;
                f = f.return;
              }
              (f.sibling.return = f.return), (f = f.sibling);
            }
          o
            ? ((u = r),
              (c = a.stateNode),
              8 === u.nodeType ? u.parentNode.removeChild(c) : u.removeChild(c))
            : r.removeChild(a.stateNode);
        } else if (4 === a.tag) {
          if (null !== a.child) {
            (r = a.stateNode.containerInfo),
              (o = !0),
              (a.child.return = a),
              (a = a.child);
            continue;
          }
        } else if ((il(e, a, n), null !== a.child)) {
          (a.child.return = a), (a = a.child);
          continue;
        }
        if (a === t) break;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === t) return;
          4 === (a = a.return).tag && (l = !1);
        }
        (a.sibling.return = a.return), (a = a.sibling);
      }
    }
    function fl(e, t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          return void rl(3, t);
        case 1:
          return;
        case 5:
          var n = t.stateNode;
          if (null != n) {
            var r = t.memoizedProps,
              o = null !== e ? e.memoizedProps : r;
            e = t.type;
            var a = t.updateQueue;
            if (((t.updateQueue = null), null !== a)) {
              for (
                n[Sn] = r,
                  "input" === e &&
                    "radio" === r.type &&
                    null != r.name &&
                    Te(n, r),
                  an(e, o),
                  t = an(e, r),
                  o = 0;
                o < a.length;
                o += 2
              ) {
                var l = a[o],
                  u = a[o + 1];
                "style" === l
                  ? nn(n, u)
                  : "dangerouslySetInnerHTML" === l
                  ? Fe(n, u)
                  : "children" === l
                  ? Ue(n, u)
                  : G(n, l, u, t);
              }
              switch (e) {
                case "input":
                  Se(n, r);
                  break;
                case "textarea":
                  Me(n, r);
                  break;
                case "select":
                  (t = n._wrapperState.wasMultiple),
                    (n._wrapperState.wasMultiple = !!r.multiple),
                    null != (e = r.value)
                      ? Oe(n, !!r.multiple, e, !1)
                      : t !== !!r.multiple &&
                        (null != r.defaultValue
                          ? Oe(n, !!r.multiple, r.defaultValue, !0)
                          : Oe(n, !!r.multiple, r.multiple ? [] : "", !1));
              }
            }
          }
          return;
        case 6:
          if (null === t.stateNode) throw Error(i(162));
          return void (t.stateNode.nodeValue = t.memoizedProps);
        case 3:
          return void (
            (t = t.stateNode).hydrate && ((t.hydrate = !1), Dt(t.containerInfo))
          );
        case 12:
          return;
        case 13:
          if (
            ((n = t),
            null === t.memoizedState
              ? (r = !1)
              : ((r = !0), (n = t.child), (Il = Uo())),
            null !== n)
          )
            e: for (e = n; ; ) {
              if (5 === e.tag)
                (a = e.stateNode),
                  r
                    ? "function" == typeof (a = a.style).setProperty
                      ? a.setProperty("display", "none", "important")
                      : (a.display = "none")
                    : ((a = e.stateNode),
                      (o =
                        null != (o = e.memoizedProps.style) &&
                        o.hasOwnProperty("display")
                          ? o.display
                          : null),
                      (a.style.display = tn("display", o)));
              else if (6 === e.tag)
                e.stateNode.nodeValue = r ? "" : e.memoizedProps;
              else {
                if (
                  13 === e.tag &&
                  null !== e.memoizedState &&
                  null === e.memoizedState.dehydrated
                ) {
                  ((a = e.child.sibling).return = e), (e = a);
                  continue;
                }
                if (null !== e.child) {
                  (e.child.return = e), (e = e.child);
                  continue;
                }
              }
              if (e === n) break;
              for (; null === e.sibling; ) {
                if (null === e.return || e.return === n) break e;
                e = e.return;
              }
              (e.sibling.return = e.return), (e = e.sibling);
            }
          return void dl(t);
        case 19:
          return void dl(t);
        case 17:
          return;
      }
      throw Error(i(163));
    }
    function dl(e) {
      var t = e.updateQueue;
      if (null !== t) {
        e.updateQueue = null;
        var n = e.stateNode;
        null === n && (n = e.stateNode = new Zi()),
          t.forEach(function (t) {
            var r = wu.bind(null, e, t);
            n.has(t) || (n.add(t), t.then(r, r));
          });
      }
    }
    var pl = "function" == typeof WeakMap ? WeakMap : Map;
    function ml(e, t, n) {
      ((n = ua(n, null)).tag = 3), (n.payload = { element: null });
      var r = t.value;
      return (
        (n.callback = function () {
          Dl || ((Dl = !0), (Ll = r)), el(e, t);
        }),
        n
      );
    }
    function hl(e, t, n) {
      (n = ua(n, null)).tag = 3;
      var r = e.type.getDerivedStateFromError;
      if ("function" == typeof r) {
        var o = t.value;
        n.payload = function () {
          return el(e, t), r(o);
        };
      }
      var a = e.stateNode;
      return (
        null !== a &&
          "function" == typeof a.componentDidCatch &&
          (n.callback = function () {
            "function" != typeof r &&
              (null === jl ? (jl = new Set([this])) : jl.add(this), el(e, t));
            var n = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: null !== n ? n : "",
            });
          }),
        n
      );
    }
    var vl,
      yl = Math.ceil,
      gl = Y.ReactCurrentDispatcher,
      bl = Y.ReactCurrentOwner,
      wl = 0,
      xl = 3,
      El = 4,
      kl = 0,
      Tl = null,
      Sl = null,
      _l = 0,
      Cl = wl,
      Pl = null,
      Ol = 1073741823,
      Al = 1073741823,
      Nl = null,
      Ml = 0,
      Rl = !1,
      Il = 0,
      zl = null,
      Dl = !1,
      Ll = null,
      jl = null,
      Fl = !1,
      Ul = null,
      Bl = 90,
      Wl = null,
      Vl = 0,
      $l = null,
      Hl = 0;
    function Ql() {
      return 0 != (48 & kl)
        ? 1073741821 - ((Uo() / 10) | 0)
        : 0 !== Hl
        ? Hl
        : (Hl = 1073741821 - ((Uo() / 10) | 0));
    }
    function Kl(e, t, n) {
      if (0 == (2 & (t = t.mode))) return 1073741823;
      var r = Bo();
      if (0 == (4 & t)) return 99 === r ? 1073741823 : 1073741822;
      if (0 != (16 & kl)) return _l;
      if (null !== n) e = qo(e, 0 | n.timeoutMs || 5e3, 250);
      else
        switch (r) {
          case 99:
            e = 1073741823;
            break;
          case 98:
            e = qo(e, 150, 100);
            break;
          case 97:
          case 96:
            e = qo(e, 5e3, 250);
            break;
          case 95:
            e = 2;
            break;
          default:
            throw Error(i(326));
        }
      return null !== Tl && e === _l && --e, e;
    }
    function ql(e, t) {
      if (50 < Vl) throw ((Vl = 0), ($l = null), Error(i(185)));
      if (null !== (e = Xl(e, t))) {
        var n = Bo();
        1073741823 === t
          ? 0 != (8 & kl) && 0 == (48 & kl)
            ? Zl(e)
            : (Gl(e), 0 === kl && Qo())
          : Gl(e),
          0 == (4 & kl) ||
            (98 !== n && 99 !== n) ||
            (null === Wl
              ? (Wl = new Map([[e, t]]))
              : (void 0 === (n = Wl.get(e)) || n > t) && Wl.set(e, t));
      }
    }
    function Xl(e, t) {
      e.expirationTime < t && (e.expirationTime = t);
      var n = e.alternate;
      null !== n && n.expirationTime < t && (n.expirationTime = t);
      var r = e.return,
        o = null;
      if (null === r && 3 === e.tag) o = e.stateNode;
      else
        for (; null !== r; ) {
          if (
            ((n = r.alternate),
            r.childExpirationTime < t && (r.childExpirationTime = t),
            null !== n &&
              n.childExpirationTime < t &&
              (n.childExpirationTime = t),
            null === r.return && 3 === r.tag)
          ) {
            o = r.stateNode;
            break;
          }
          r = r.return;
        }
      return (
        null !== o && (Tl === o && (iu(t), Cl === El && Ru(o, _l)), Iu(o, t)), o
      );
    }
    function Yl(e) {
      var t = e.lastExpiredTime;
      if (0 !== t) return t;
      if (!Mu(e, (t = e.firstPendingTime))) return t;
      var n = e.lastPingedTime;
      return 2 >= (e = n > (e = e.nextKnownPendingLevel) ? n : e) && t !== e
        ? 0
        : e;
    }
    function Gl(e) {
      if (0 !== e.lastExpiredTime)
        (e.callbackExpirationTime = 1073741823),
          (e.callbackPriority = 99),
          (e.callbackNode = Ho(Zl.bind(null, e)));
      else {
        var t = Yl(e),
          n = e.callbackNode;
        if (0 === t)
          null !== n &&
            ((e.callbackNode = null),
            (e.callbackExpirationTime = 0),
            (e.callbackPriority = 90));
        else {
          var r = Ql();
          if (
            (1073741823 === t
              ? (r = 99)
              : 1 === t || 2 === t
              ? (r = 95)
              : (r =
                  0 >= (r = 10 * (1073741821 - t) - 10 * (1073741821 - r))
                    ? 99
                    : 250 >= r
                    ? 98
                    : 5250 >= r
                    ? 97
                    : 95),
            null !== n)
          ) {
            var o = e.callbackPriority;
            if (e.callbackExpirationTime === t && o >= r) return;
            n !== Ro && To(n);
          }
          (e.callbackExpirationTime = t),
            (e.callbackPriority = r),
            (t =
              1073741823 === t
                ? Ho(Zl.bind(null, e))
                : $o(r, Jl.bind(null, e), {
                    timeout: 10 * (1073741821 - t) - Uo(),
                  })),
            (e.callbackNode = t);
        }
      }
    }
    function Jl(e, t) {
      if (((Hl = 0), t)) return zu(e, (t = Ql())), Gl(e), null;
      var n = Yl(e);
      if (0 !== n) {
        if (((t = e.callbackNode), 0 != (48 & kl))) throw Error(i(327));
        if ((hu(), (e === Tl && n === _l) || nu(e, n), null !== Sl)) {
          var r = kl;
          kl |= 16;
          for (var o = ou(); ; )
            try {
              uu();
              break;
            } catch (t) {
              ru(e, t);
            }
          if ((ea(), (kl = r), (gl.current = o), 1 === Cl))
            throw ((t = Pl), nu(e, n), Ru(e, n), Gl(e), t);
          if (null === Sl)
            switch (
              ((o = e.finishedWork = e.current.alternate),
              (e.finishedExpirationTime = n),
              (r = Cl),
              (Tl = null),
              r)
            ) {
              case wl:
              case 1:
                throw Error(i(345));
              case 2:
                zu(e, 2 < n ? 2 : n);
                break;
              case xl:
                if (
                  (Ru(e, n),
                  n === (r = e.lastSuspendedTime) &&
                    (e.nextKnownPendingLevel = fu(o)),
                  1073741823 === Ol && 10 < (o = Il + 500 - Uo()))
                ) {
                  if (Rl) {
                    var a = e.lastPingedTime;
                    if (0 === a || a >= n) {
                      (e.lastPingedTime = n), nu(e, n);
                      break;
                    }
                  }
                  if (0 !== (a = Yl(e)) && a !== n) break;
                  if (0 !== r && r !== n) {
                    e.lastPingedTime = r;
                    break;
                  }
                  e.timeoutHandle = bn(du.bind(null, e), o);
                  break;
                }
                du(e);
                break;
              case El:
                if (
                  (Ru(e, n),
                  n === (r = e.lastSuspendedTime) &&
                    (e.nextKnownPendingLevel = fu(o)),
                  Rl && (0 === (o = e.lastPingedTime) || o >= n))
                ) {
                  (e.lastPingedTime = n), nu(e, n);
                  break;
                }
                if (0 !== (o = Yl(e)) && o !== n) break;
                if (0 !== r && r !== n) {
                  e.lastPingedTime = r;
                  break;
                }
                if (
                  (1073741823 !== Al
                    ? (r = 10 * (1073741821 - Al) - Uo())
                    : 1073741823 === Ol
                    ? (r = 0)
                    : ((r = 10 * (1073741821 - Ol) - 5e3),
                      0 > (r = (o = Uo()) - r) && (r = 0),
                      (n = 10 * (1073741821 - n) - o) <
                        (r =
                          (120 > r
                            ? 120
                            : 480 > r
                            ? 480
                            : 1080 > r
                            ? 1080
                            : 1920 > r
                            ? 1920
                            : 3e3 > r
                            ? 3e3
                            : 4320 > r
                            ? 4320
                            : 1960 * yl(r / 1960)) - r) && (r = n)),
                  10 < r)
                ) {
                  e.timeoutHandle = bn(du.bind(null, e), r);
                  break;
                }
                du(e);
                break;
              case 5:
                if (1073741823 !== Ol && null !== Nl) {
                  a = Ol;
                  var l = Nl;
                  if (
                    (0 >= (r = 0 | l.busyMinDurationMs)
                      ? (r = 0)
                      : ((o = 0 | l.busyDelayMs),
                        (r =
                          (a =
                            Uo() -
                            (10 * (1073741821 - a) -
                              (0 | l.timeoutMs || 5e3))) <= o
                            ? 0
                            : o + r - a)),
                    10 < r)
                  ) {
                    Ru(e, n), (e.timeoutHandle = bn(du.bind(null, e), r));
                    break;
                  }
                }
                du(e);
                break;
              default:
                throw Error(i(329));
            }
          if ((Gl(e), e.callbackNode === t)) return Jl.bind(null, e);
        }
      }
      return null;
    }
    function Zl(e) {
      var t = e.lastExpiredTime;
      if (((t = 0 !== t ? t : 1073741823), 0 != (48 & kl))) throw Error(i(327));
      if ((hu(), (e === Tl && t === _l) || nu(e, t), null !== Sl)) {
        var n = kl;
        kl |= 16;
        for (var r = ou(); ; )
          try {
            lu();
            break;
          } catch (t) {
            ru(e, t);
          }
        if ((ea(), (kl = n), (gl.current = r), 1 === Cl))
          throw ((n = Pl), nu(e, t), Ru(e, t), Gl(e), n);
        if (null !== Sl) throw Error(i(261));
        (e.finishedWork = e.current.alternate),
          (e.finishedExpirationTime = t),
          (Tl = null),
          du(e),
          Gl(e);
      }
      return null;
    }
    function eu(e, t) {
      var n = kl;
      kl |= 1;
      try {
        return e(t);
      } finally {
        0 === (kl = n) && Qo();
      }
    }
    function tu(e, t) {
      var n = kl;
      (kl &= -2), (kl |= 8);
      try {
        return e(t);
      } finally {
        0 === (kl = n) && Qo();
      }
    }
    function nu(e, t) {
      (e.finishedWork = null), (e.finishedExpirationTime = 0);
      var n = e.timeoutHandle;
      if ((-1 !== n && ((e.timeoutHandle = -1), wn(n)), null !== Sl))
        for (n = Sl.return; null !== n; ) {
          var r = n;
          switch (r.tag) {
            case 1:
              null != (r = r.type.childContextTypes) && yo();
              break;
            case 3:
              Ra(), uo(po), uo(fo);
              break;
            case 5:
              za(r);
              break;
            case 4:
              Ra();
              break;
            case 13:
            case 19:
              uo(Da);
              break;
            case 10:
              ta(r);
          }
          n = n.return;
        }
      (Tl = e),
        (Sl = _u(e.current, null)),
        (_l = t),
        (Cl = wl),
        (Pl = null),
        (Al = Ol = 1073741823),
        (Nl = null),
        (Ml = 0),
        (Rl = !1);
    }
    function ru(e, t) {
      for (;;) {
        try {
          if ((ea(), (Fa.current = vi), Ha))
            for (var n = Wa.memoizedState; null !== n; ) {
              var r = n.queue;
              null !== r && (r.pending = null), (n = n.next);
            }
          if (
            ((Ba = 0),
            ($a = Va = Wa = null),
            (Ha = !1),
            null === Sl || null === Sl.return)
          )
            return (Cl = 1), (Pl = t), (Sl = null);
          e: {
            var o = e,
              a = Sl.return,
              i = Sl,
              l = t;
            if (
              ((t = _l),
              (i.effectTag |= 2048),
              (i.firstEffect = i.lastEffect = null),
              null !== l && "object" == typeof l && "function" == typeof l.then)
            ) {
              var u = l;
              if (0 == (2 & i.mode)) {
                var c = i.alternate;
                c
                  ? ((i.updateQueue = c.updateQueue),
                    (i.memoizedState = c.memoizedState),
                    (i.expirationTime = c.expirationTime))
                  : ((i.updateQueue = null), (i.memoizedState = null));
              }
              var s = 0 != (1 & Da.current),
                f = a;
              do {
                var d;
                if ((d = 13 === f.tag)) {
                  var p = f.memoizedState;
                  if (null !== p) d = null !== p.dehydrated;
                  else {
                    var m = f.memoizedProps;
                    d =
                      void 0 !== m.fallback &&
                      (!0 !== m.unstable_avoidThisFallback || !s);
                  }
                }
                if (d) {
                  var h = f.updateQueue;
                  if (null === h) {
                    var v = new Set();
                    v.add(u), (f.updateQueue = v);
                  } else h.add(u);
                  if (0 == (2 & f.mode)) {
                    if (
                      ((f.effectTag |= 64), (i.effectTag &= -2981), 1 === i.tag)
                    )
                      if (null === i.alternate) i.tag = 17;
                      else {
                        var y = ua(1073741823, null);
                        (y.tag = 2), ca(i, y);
                      }
                    i.expirationTime = 1073741823;
                    break e;
                  }
                  (l = void 0), (i = t);
                  var g = o.pingCache;
                  if (
                    (null === g
                      ? ((g = o.pingCache = new pl()),
                        (l = new Set()),
                        g.set(u, l))
                      : void 0 === (l = g.get(u)) &&
                        ((l = new Set()), g.set(u, l)),
                    !l.has(i))
                  ) {
                    l.add(i);
                    var b = bu.bind(null, o, u, i);
                    u.then(b, b);
                  }
                  (f.effectTag |= 4096), (f.expirationTime = t);
                  break e;
                }
                f = f.return;
              } while (null !== f);
              l = Error(
                (ve(i.type) || "A React component") +
                  " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                  ye(i)
              );
            }
            5 !== Cl && (Cl = 2), (l = Ji(l, i)), (f = a);
            do {
              switch (f.tag) {
                case 3:
                  (u = l),
                    (f.effectTag |= 4096),
                    (f.expirationTime = t),
                    sa(f, ml(f, u, t));
                  break e;
                case 1:
                  u = l;
                  var w = f.type,
                    x = f.stateNode;
                  if (
                    0 == (64 & f.effectTag) &&
                    ("function" == typeof w.getDerivedStateFromError ||
                      (null !== x &&
                        "function" == typeof x.componentDidCatch &&
                        (null === jl || !jl.has(x))))
                  ) {
                    (f.effectTag |= 4096),
                      (f.expirationTime = t),
                      sa(f, hl(f, u, t));
                    break e;
                  }
              }
              f = f.return;
            } while (null !== f);
          }
          Sl = su(Sl);
        } catch (e) {
          t = e;
          continue;
        }
        break;
      }
    }
    function ou() {
      var e = gl.current;
      return (gl.current = vi), null === e ? vi : e;
    }
    function au(e, t) {
      e < Ol && 2 < e && (Ol = e),
        null !== t && e < Al && 2 < e && ((Al = e), (Nl = t));
    }
    function iu(e) {
      e > Ml && (Ml = e);
    }
    function lu() {
      for (; null !== Sl; ) Sl = cu(Sl);
    }
    function uu() {
      for (; null !== Sl && !Io(); ) Sl = cu(Sl);
    }
    function cu(e) {
      var t = vl(e.alternate, e, _l);
      return (
        (e.memoizedProps = e.pendingProps),
        null === t && (t = su(e)),
        (bl.current = null),
        t
      );
    }
    function su(e) {
      Sl = e;
      do {
        var t = Sl.alternate;
        if (((e = Sl.return), 0 == (2048 & Sl.effectTag))) {
          if (((t = Yi(t, Sl, _l)), 1 === _l || 1 !== Sl.childExpirationTime)) {
            for (var n = 0, r = Sl.child; null !== r; ) {
              var o = r.expirationTime,
                a = r.childExpirationTime;
              o > n && (n = o), a > n && (n = a), (r = r.sibling);
            }
            Sl.childExpirationTime = n;
          }
          if (null !== t) return t;
          null !== e &&
            0 == (2048 & e.effectTag) &&
            (null === e.firstEffect && (e.firstEffect = Sl.firstEffect),
            null !== Sl.lastEffect &&
              (null !== e.lastEffect &&
                (e.lastEffect.nextEffect = Sl.firstEffect),
              (e.lastEffect = Sl.lastEffect)),
            1 < Sl.effectTag &&
              (null !== e.lastEffect
                ? (e.lastEffect.nextEffect = Sl)
                : (e.firstEffect = Sl),
              (e.lastEffect = Sl)));
        } else {
          if (null !== (t = Gi(Sl))) return (t.effectTag &= 2047), t;
          null !== e &&
            ((e.firstEffect = e.lastEffect = null), (e.effectTag |= 2048));
        }
        if (null !== (t = Sl.sibling)) return t;
        Sl = e;
      } while (null !== Sl);
      return Cl === wl && (Cl = 5), null;
    }
    function fu(e) {
      var t = e.expirationTime;
      return t > (e = e.childExpirationTime) ? t : e;
    }
    function du(e) {
      var t = Bo();
      return Vo(99, pu.bind(null, e, t)), null;
    }
    function pu(e, t) {
      do {
        hu();
      } while (null !== Ul);
      if (0 != (48 & kl)) throw Error(i(327));
      var n = e.finishedWork,
        r = e.finishedExpirationTime;
      if (null === n) return null;
      if (
        ((e.finishedWork = null),
        (e.finishedExpirationTime = 0),
        n === e.current)
      )
        throw Error(i(177));
      (e.callbackNode = null),
        (e.callbackExpirationTime = 0),
        (e.callbackPriority = 90),
        (e.nextKnownPendingLevel = 0);
      var o = fu(n);
      if (
        ((e.firstPendingTime = o),
        r <= e.lastSuspendedTime
          ? (e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0)
          : r <= e.firstSuspendedTime && (e.firstSuspendedTime = r - 1),
        r <= e.lastPingedTime && (e.lastPingedTime = 0),
        r <= e.lastExpiredTime && (e.lastExpiredTime = 0),
        e === Tl && ((Sl = Tl = null), (_l = 0)),
        1 < n.effectTag
          ? null !== n.lastEffect
            ? ((n.lastEffect.nextEffect = n), (o = n.firstEffect))
            : (o = n)
          : (o = n.firstEffect),
        null !== o)
      ) {
        var a = kl;
        (kl |= 32), (bl.current = null), (hn = Qt);
        var l = pn();
        if (mn(l)) {
          if ("selectionStart" in l)
            var u = { start: l.selectionStart, end: l.selectionEnd };
          else
            e: {
              var c =
                (u = ((u = l.ownerDocument) && u.defaultView) || window)
                  .getSelection && u.getSelection();
              if (c && 0 !== c.rangeCount) {
                u = c.anchorNode;
                var s = c.anchorOffset,
                  f = c.focusNode;
                c = c.focusOffset;
                try {
                  u.nodeType, f.nodeType;
                } catch (e) {
                  u = null;
                  break e;
                }
                var d = 0,
                  p = -1,
                  m = -1,
                  h = 0,
                  v = 0,
                  y = l,
                  g = null;
                t: for (;;) {
                  for (
                    var b;
                    y !== u || (0 !== s && 3 !== y.nodeType) || (p = d + s),
                      y !== f || (0 !== c && 3 !== y.nodeType) || (m = d + c),
                      3 === y.nodeType && (d += y.nodeValue.length),
                      null !== (b = y.firstChild);

                  )
                    (g = y), (y = b);
                  for (;;) {
                    if (y === l) break t;
                    if (
                      (g === u && ++h === s && (p = d),
                      g === f && ++v === c && (m = d),
                      null !== (b = y.nextSibling))
                    )
                      break;
                    g = (y = g).parentNode;
                  }
                  y = b;
                }
                u = -1 === p || -1 === m ? null : { start: p, end: m };
              } else u = null;
            }
          u = u || { start: 0, end: 0 };
        } else u = null;
        (vn = {
          activeElementDetached: null,
          focusedElem: l,
          selectionRange: u,
        }),
          (Qt = !1),
          (zl = o);
        do {
          try {
            mu();
          } catch (e) {
            if (null === zl) throw Error(i(330));
            gu(zl, e), (zl = zl.nextEffect);
          }
        } while (null !== zl);
        zl = o;
        do {
          try {
            for (l = e, u = t; null !== zl; ) {
              var w = zl.effectTag;
              if ((16 & w && Ue(zl.stateNode, ""), 128 & w)) {
                var x = zl.alternate;
                if (null !== x) {
                  var E = x.ref;
                  null !== E &&
                    ("function" == typeof E ? E(null) : (E.current = null));
                }
              }
              switch (1038 & w) {
                case 2:
                  cl(zl), (zl.effectTag &= -3);
                  break;
                case 6:
                  cl(zl), (zl.effectTag &= -3), fl(zl.alternate, zl);
                  break;
                case 1024:
                  zl.effectTag &= -1025;
                  break;
                case 1028:
                  (zl.effectTag &= -1025), fl(zl.alternate, zl);
                  break;
                case 4:
                  fl(zl.alternate, zl);
                  break;
                case 8:
                  sl(l, (s = zl), u), ll(s);
              }
              zl = zl.nextEffect;
            }
          } catch (e) {
            if (null === zl) throw Error(i(330));
            gu(zl, e), (zl = zl.nextEffect);
          }
        } while (null !== zl);
        if (
          ((E = vn),
          (x = pn()),
          (w = E.focusedElem),
          (u = E.selectionRange),
          x !== w &&
            w &&
            w.ownerDocument &&
            (function e(t, n) {
              return (
                !(!t || !n) &&
                (t === n ||
                  ((!t || 3 !== t.nodeType) &&
                    (n && 3 === n.nodeType
                      ? e(t, n.parentNode)
                      : "contains" in t
                      ? t.contains(n)
                      : !!t.compareDocumentPosition &&
                        !!(16 & t.compareDocumentPosition(n)))))
              );
            })(w.ownerDocument.documentElement, w))
        ) {
          null !== u &&
            mn(w) &&
            ((x = u.start),
            void 0 === (E = u.end) && (E = x),
            "selectionStart" in w
              ? ((w.selectionStart = x),
                (w.selectionEnd = Math.min(E, w.value.length)))
              : (E =
                  ((x = w.ownerDocument || document) && x.defaultView) ||
                  window).getSelection &&
                ((E = E.getSelection()),
                (s = w.textContent.length),
                (l = Math.min(u.start, s)),
                (u = void 0 === u.end ? l : Math.min(u.end, s)),
                !E.extend && l > u && ((s = u), (u = l), (l = s)),
                (s = dn(w, l)),
                (f = dn(w, u)),
                s &&
                  f &&
                  (1 !== E.rangeCount ||
                    E.anchorNode !== s.node ||
                    E.anchorOffset !== s.offset ||
                    E.focusNode !== f.node ||
                    E.focusOffset !== f.offset) &&
                  ((x = x.createRange()).setStart(s.node, s.offset),
                  E.removeAllRanges(),
                  l > u
                    ? (E.addRange(x), E.extend(f.node, f.offset))
                    : (x.setEnd(f.node, f.offset), E.addRange(x))))),
            (x = []);
          for (E = w; (E = E.parentNode); )
            1 === E.nodeType &&
              x.push({ element: E, left: E.scrollLeft, top: E.scrollTop });
          for (
            "function" == typeof w.focus && w.focus(), w = 0;
            w < x.length;
            w++
          )
            ((E = x[w]).element.scrollLeft = E.left),
              (E.element.scrollTop = E.top);
        }
        (Qt = !!hn), (vn = hn = null), (e.current = n), (zl = o);
        do {
          try {
            for (w = e; null !== zl; ) {
              var k = zl.effectTag;
              if ((36 & k && al(w, zl.alternate, zl), 128 & k)) {
                x = void 0;
                var T = zl.ref;
                if (null !== T) {
                  var S = zl.stateNode;
                  switch (zl.tag) {
                    case 5:
                      x = S;
                      break;
                    default:
                      x = S;
                  }
                  "function" == typeof T ? T(x) : (T.current = x);
                }
              }
              zl = zl.nextEffect;
            }
          } catch (e) {
            if (null === zl) throw Error(i(330));
            gu(zl, e), (zl = zl.nextEffect);
          }
        } while (null !== zl);
        (zl = null), zo(), (kl = a);
      } else e.current = n;
      if (Fl) (Fl = !1), (Ul = e), (Bl = t);
      else
        for (zl = o; null !== zl; )
          (t = zl.nextEffect), (zl.nextEffect = null), (zl = t);
      if (
        (0 === (t = e.firstPendingTime) && (jl = null),
        1073741823 === t ? (e === $l ? Vl++ : ((Vl = 0), ($l = e))) : (Vl = 0),
        "function" == typeof xu && xu(n.stateNode, r),
        Gl(e),
        Dl)
      )
        throw ((Dl = !1), (e = Ll), (Ll = null), e);
      return 0 != (8 & kl) || Qo(), null;
    }
    function mu() {
      for (; null !== zl; ) {
        var e = zl.effectTag;
        0 != (256 & e) && nl(zl.alternate, zl),
          0 == (512 & e) ||
            Fl ||
            ((Fl = !0),
            $o(97, function () {
              return hu(), null;
            })),
          (zl = zl.nextEffect);
      }
    }
    function hu() {
      if (90 !== Bl) {
        var e = 97 < Bl ? 97 : Bl;
        return (Bl = 90), Vo(e, vu);
      }
    }
    function vu() {
      if (null === Ul) return !1;
      var e = Ul;
      if (((Ul = null), 0 != (48 & kl))) throw Error(i(331));
      var t = kl;
      for (kl |= 32, e = e.current.firstEffect; null !== e; ) {
        try {
          var n = e;
          if (0 != (512 & n.effectTag))
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
              case 22:
                rl(5, n), ol(5, n);
            }
        } catch (t) {
          if (null === e) throw Error(i(330));
          gu(e, t);
        }
        (n = e.nextEffect), (e.nextEffect = null), (e = n);
      }
      return (kl = t), Qo(), !0;
    }
    function yu(e, t, n) {
      ca(e, (t = ml(e, (t = Ji(n, t)), 1073741823))),
        null !== (e = Xl(e, 1073741823)) && Gl(e);
    }
    function gu(e, t) {
      if (3 === e.tag) yu(e, e, t);
      else
        for (var n = e.return; null !== n; ) {
          if (3 === n.tag) {
            yu(n, e, t);
            break;
          }
          if (1 === n.tag) {
            var r = n.stateNode;
            if (
              "function" == typeof n.type.getDerivedStateFromError ||
              ("function" == typeof r.componentDidCatch &&
                (null === jl || !jl.has(r)))
            ) {
              ca(n, (e = hl(n, (e = Ji(t, e)), 1073741823))),
                null !== (n = Xl(n, 1073741823)) && Gl(n);
              break;
            }
          }
          n = n.return;
        }
    }
    function bu(e, t, n) {
      var r = e.pingCache;
      null !== r && r.delete(t),
        Tl === e && _l === n
          ? Cl === El || (Cl === xl && 1073741823 === Ol && Uo() - Il < 500)
            ? nu(e, _l)
            : (Rl = !0)
          : Mu(e, n) &&
            ((0 !== (t = e.lastPingedTime) && t < n) ||
              ((e.lastPingedTime = n), Gl(e)));
    }
    function wu(e, t) {
      var n = e.stateNode;
      null !== n && n.delete(t),
        0 === (t = 0) && (t = Kl((t = Ql()), e, null)),
        null !== (e = Xl(e, t)) && Gl(e);
    }
    vl = function (e, t, n) {
      var r = t.expirationTime;
      if (null !== e) {
        var o = t.pendingProps;
        if (e.memoizedProps !== o || po.current) Ai = !0;
        else {
          if (r < n) {
            switch (((Ai = !1), t.tag)) {
              case 3:
                Fi(t), Pi();
                break;
              case 5:
                if ((Ia(t), 4 & t.mode && 1 !== n && o.hidden))
                  return (t.expirationTime = t.childExpirationTime = 1), null;
                break;
              case 1:
                vo(t.type) && wo(t);
                break;
              case 4:
                Ma(t, t.stateNode.containerInfo);
                break;
              case 10:
                (r = t.memoizedProps.value),
                  (o = t.type._context),
                  co(Yo, o._currentValue),
                  (o._currentValue = r);
                break;
              case 13:
                if (null !== t.memoizedState)
                  return 0 !== (r = t.child.childExpirationTime) && r >= n
                    ? $i(e, t, n)
                    : (co(Da, 1 & Da.current),
                      null !== (t = qi(e, t, n)) ? t.sibling : null);
                co(Da, 1 & Da.current);
                break;
              case 19:
                if (
                  ((r = t.childExpirationTime >= n), 0 != (64 & e.effectTag))
                ) {
                  if (r) return Ki(e, t, n);
                  t.effectTag |= 64;
                }
                if (
                  (null !== (o = t.memoizedState) &&
                    ((o.rendering = null), (o.tail = null)),
                  co(Da, Da.current),
                  !r)
                )
                  return null;
            }
            return qi(e, t, n);
          }
          Ai = !1;
        }
      } else Ai = !1;
      switch (((t.expirationTime = 0), t.tag)) {
        case 2:
          if (
            ((r = t.type),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (e = t.pendingProps),
            (o = ho(t, fo.current)),
            ra(t, n),
            (o = qa(null, t, r, e, o, n)),
            (t.effectTag |= 1),
            "object" == typeof o &&
              null !== o &&
              "function" == typeof o.render &&
              void 0 === o.$$typeof)
          ) {
            if (
              ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              vo(r))
            ) {
              var a = !0;
              wo(t);
            } else a = !1;
            (t.memoizedState =
              null !== o.state && void 0 !== o.state ? o.state : null),
              ia(t);
            var l = r.getDerivedStateFromProps;
            "function" == typeof l && ha(t, r, l, e),
              (o.updater = va),
              (t.stateNode = o),
              (o._reactInternalFiber = t),
              wa(t, r, e, n),
              (t = ji(null, t, r, !0, a, n));
          } else (t.tag = 0), Ni(null, t, o, n), (t = t.child);
          return t;
        case 16:
          e: {
            if (
              ((o = t.elementType),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (e = t.pendingProps),
              (function (e) {
                if (-1 === e._status) {
                  e._status = 0;
                  var t = e._ctor;
                  (t = t()),
                    (e._result = t),
                    t.then(
                      function (t) {
                        0 === e._status &&
                          ((t = t.default), (e._status = 1), (e._result = t));
                      },
                      function (t) {
                        0 === e._status && ((e._status = 2), (e._result = t));
                      }
                    );
                }
              })(o),
              1 !== o._status)
            )
              throw o._result;
            switch (
              ((o = o._result),
              (t.type = o),
              (a = t.tag = (function (e) {
                if ("function" == typeof e) return Su(e) ? 1 : 0;
                if (null != e) {
                  if ((e = e.$$typeof) === ue) return 11;
                  if (e === fe) return 14;
                }
                return 2;
              })(o)),
              (e = Xo(o, e)),
              a)
            ) {
              case 0:
                t = Di(null, t, o, e, n);
                break e;
              case 1:
                t = Li(null, t, o, e, n);
                break e;
              case 11:
                t = Mi(null, t, o, e, n);
                break e;
              case 14:
                t = Ri(null, t, o, Xo(o.type, e), r, n);
                break e;
            }
            throw Error(i(306, o, ""));
          }
          return t;
        case 0:
          return (
            (r = t.type),
            (o = t.pendingProps),
            Di(e, t, r, (o = t.elementType === r ? o : Xo(r, o)), n)
          );
        case 1:
          return (
            (r = t.type),
            (o = t.pendingProps),
            Li(e, t, r, (o = t.elementType === r ? o : Xo(r, o)), n)
          );
        case 3:
          if ((Fi(t), (r = t.updateQueue), null === e || null === r))
            throw Error(i(282));
          if (
            ((r = t.pendingProps),
            (o = null !== (o = t.memoizedState) ? o.element : null),
            la(e, t),
            fa(t, r, null, n),
            (r = t.memoizedState.element) === o)
          )
            Pi(), (t = qi(e, t, n));
          else {
            if (
              ((o = t.stateNode.hydrate) &&
                ((xi = xn(t.stateNode.containerInfo.firstChild)),
                (wi = t),
                (o = Ei = !0)),
              o)
            )
              for (n = _a(t, null, r, n), t.child = n; n; )
                (n.effectTag = (-3 & n.effectTag) | 1024), (n = n.sibling);
            else Ni(e, t, r, n), Pi();
            t = t.child;
          }
          return t;
        case 5:
          return (
            Ia(t),
            null === e && Si(t),
            (r = t.type),
            (o = t.pendingProps),
            (a = null !== e ? e.memoizedProps : null),
            (l = o.children),
            gn(r, o)
              ? (l = null)
              : null !== a && gn(r, a) && (t.effectTag |= 16),
            zi(e, t),
            4 & t.mode && 1 !== n && o.hidden
              ? ((t.expirationTime = t.childExpirationTime = 1), (t = null))
              : (Ni(e, t, l, n), (t = t.child)),
            t
          );
        case 6:
          return null === e && Si(t), null;
        case 13:
          return $i(e, t, n);
        case 4:
          return (
            Ma(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            null === e ? (t.child = Sa(t, null, r, n)) : Ni(e, t, r, n),
            t.child
          );
        case 11:
          return (
            (r = t.type),
            (o = t.pendingProps),
            Mi(e, t, r, (o = t.elementType === r ? o : Xo(r, o)), n)
          );
        case 7:
          return Ni(e, t, t.pendingProps, n), t.child;
        case 8:
        case 12:
          return Ni(e, t, t.pendingProps.children, n), t.child;
        case 10:
          e: {
            (r = t.type._context),
              (o = t.pendingProps),
              (l = t.memoizedProps),
              (a = o.value);
            var u = t.type._context;
            if ((co(Yo, u._currentValue), (u._currentValue = a), null !== l))
              if (
                ((u = l.value),
                0 ===
                  (a = Lr(u, a)
                    ? 0
                    : 0 |
                      ("function" == typeof r._calculateChangedBits
                        ? r._calculateChangedBits(u, a)
                        : 1073741823)))
              ) {
                if (l.children === o.children && !po.current) {
                  t = qi(e, t, n);
                  break e;
                }
              } else
                for (null !== (u = t.child) && (u.return = t); null !== u; ) {
                  var c = u.dependencies;
                  if (null !== c) {
                    l = u.child;
                    for (var s = c.firstContext; null !== s; ) {
                      if (s.context === r && 0 != (s.observedBits & a)) {
                        1 === u.tag && (((s = ua(n, null)).tag = 2), ca(u, s)),
                          u.expirationTime < n && (u.expirationTime = n),
                          null !== (s = u.alternate) &&
                            s.expirationTime < n &&
                            (s.expirationTime = n),
                          na(u.return, n),
                          c.expirationTime < n && (c.expirationTime = n);
                        break;
                      }
                      s = s.next;
                    }
                  } else l = 10 === u.tag && u.type === t.type ? null : u.child;
                  if (null !== l) l.return = u;
                  else
                    for (l = u; null !== l; ) {
                      if (l === t) {
                        l = null;
                        break;
                      }
                      if (null !== (u = l.sibling)) {
                        (u.return = l.return), (l = u);
                        break;
                      }
                      l = l.return;
                    }
                  u = l;
                }
            Ni(e, t, o.children, n), (t = t.child);
          }
          return t;
        case 9:
          return (
            (o = t.type),
            (r = (a = t.pendingProps).children),
            ra(t, n),
            (r = r((o = oa(o, a.unstable_observedBits)))),
            (t.effectTag |= 1),
            Ni(e, t, r, n),
            t.child
          );
        case 14:
          return (
            (a = Xo((o = t.type), t.pendingProps)),
            Ri(e, t, o, (a = Xo(o.type, a)), r, n)
          );
        case 15:
          return Ii(e, t, t.type, t.pendingProps, r, n);
        case 17:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : Xo(r, o)),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (t.tag = 1),
            vo(r) ? ((e = !0), wo(t)) : (e = !1),
            ra(t, n),
            ga(t, r, o),
            wa(t, r, o, n),
            ji(null, t, r, !0, e, n)
          );
        case 19:
          return Ki(e, t, n);
      }
      throw Error(i(156, t.tag));
    };
    var xu = null,
      Eu = null;
    function ku(e, t, n, r) {
      (this.tag = e),
        (this.key = n),
        (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.effectTag = 0),
        (this.lastEffect = this.firstEffect = this.nextEffect = null),
        (this.childExpirationTime = this.expirationTime = 0),
        (this.alternate = null);
    }
    function Tu(e, t, n, r) {
      return new ku(e, t, n, r);
    }
    function Su(e) {
      return !(!(e = e.prototype) || !e.isReactComponent);
    }
    function _u(e, t) {
      var n = e.alternate;
      return (
        null === n
          ? (((n = Tu(e.tag, t, e.key, e.mode)).elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.effectTag = 0),
            (n.nextEffect = null),
            (n.firstEffect = null),
            (n.lastEffect = null)),
        (n.childExpirationTime = e.childExpirationTime),
        (n.expirationTime = e.expirationTime),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
          null === t
            ? null
            : {
                expirationTime: t.expirationTime,
                firstContext: t.firstContext,
                responders: t.responders,
              }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function Cu(e, t, n, r, o, a) {
      var l = 2;
      if (((r = e), "function" == typeof e)) Su(e) && (l = 1);
      else if ("string" == typeof e) l = 5;
      else
        e: switch (e) {
          case ne:
            return Pu(n.children, o, a, t);
          case le:
            (l = 8), (o |= 7);
            break;
          case re:
            (l = 8), (o |= 1);
            break;
          case oe:
            return (
              ((e = Tu(12, n, t, 8 | o)).elementType = oe),
              (e.type = oe),
              (e.expirationTime = a),
              e
            );
          case ce:
            return (
              ((e = Tu(13, n, t, o)).type = ce),
              (e.elementType = ce),
              (e.expirationTime = a),
              e
            );
          case se:
            return (
              ((e = Tu(19, n, t, o)).elementType = se),
              (e.expirationTime = a),
              e
            );
          default:
            if ("object" == typeof e && null !== e)
              switch (e.$$typeof) {
                case ae:
                  l = 10;
                  break e;
                case ie:
                  l = 9;
                  break e;
                case ue:
                  l = 11;
                  break e;
                case fe:
                  l = 14;
                  break e;
                case de:
                  (l = 16), (r = null);
                  break e;
                case pe:
                  l = 22;
                  break e;
              }
            throw Error(i(130, null == e ? e : typeof e, ""));
        }
      return (
        ((t = Tu(l, n, t, o)).elementType = e),
        (t.type = r),
        (t.expirationTime = a),
        t
      );
    }
    function Pu(e, t, n, r) {
      return ((e = Tu(7, e, r, t)).expirationTime = n), e;
    }
    function Ou(e, t, n) {
      return ((e = Tu(6, e, null, t)).expirationTime = n), e;
    }
    function Au(e, t, n) {
      return (
        ((t = Tu(
          4,
          null !== e.children ? e.children : [],
          e.key,
          t
        )).expirationTime = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function Nu(e, t, n) {
      (this.tag = t),
        (this.current = null),
        (this.containerInfo = e),
        (this.pingCache = this.pendingChildren = null),
        (this.finishedExpirationTime = 0),
        (this.finishedWork = null),
        (this.timeoutHandle = -1),
        (this.pendingContext = this.context = null),
        (this.hydrate = n),
        (this.callbackNode = null),
        (this.callbackPriority = 90),
        (this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0);
    }
    function Mu(e, t) {
      var n = e.firstSuspendedTime;
      return (e = e.lastSuspendedTime), 0 !== n && n >= t && e <= t;
    }
    function Ru(e, t) {
      var n = e.firstSuspendedTime,
        r = e.lastSuspendedTime;
      n < t && (e.firstSuspendedTime = t),
        (r > t || 0 === n) && (e.lastSuspendedTime = t),
        t <= e.lastPingedTime && (e.lastPingedTime = 0),
        t <= e.lastExpiredTime && (e.lastExpiredTime = 0);
    }
    function Iu(e, t) {
      t > e.firstPendingTime && (e.firstPendingTime = t);
      var n = e.firstSuspendedTime;
      0 !== n &&
        (t >= n
          ? (e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0)
          : t >= e.lastSuspendedTime && (e.lastSuspendedTime = t + 1),
        t > e.nextKnownPendingLevel && (e.nextKnownPendingLevel = t));
    }
    function zu(e, t) {
      var n = e.lastExpiredTime;
      (0 === n || n > t) && (e.lastExpiredTime = t);
    }
    function Du(e, t, n, r) {
      var o = t.current,
        a = Ql(),
        l = pa.suspense;
      a = Kl(a, o, l);
      e: if (n) {
        t: {
          if (Ze((n = n._reactInternalFiber)) !== n || 1 !== n.tag)
            throw Error(i(170));
          var u = n;
          do {
            switch (u.tag) {
              case 3:
                u = u.stateNode.context;
                break t;
              case 1:
                if (vo(u.type)) {
                  u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                  break t;
                }
            }
            u = u.return;
          } while (null !== u);
          throw Error(i(171));
        }
        if (1 === n.tag) {
          var c = n.type;
          if (vo(c)) {
            n = bo(n, c, u);
            break e;
          }
        }
        n = u;
      } else n = so;
      return (
        null === t.context ? (t.context = n) : (t.pendingContext = n),
        ((t = ua(a, l)).payload = { element: e }),
        null !== (r = void 0 === r ? null : r) && (t.callback = r),
        ca(o, t),
        ql(o, a),
        a
      );
    }
    function Lu(e) {
      if (!(e = e.current).child) return null;
      switch (e.child.tag) {
        case 5:
        default:
          return e.child.stateNode;
      }
    }
    function ju(e, t) {
      null !== (e = e.memoizedState) &&
        null !== e.dehydrated &&
        e.retryTime < t &&
        (e.retryTime = t);
    }
    function Fu(e, t) {
      ju(e, t), (e = e.alternate) && ju(e, t);
    }
    function Uu(e, t, n) {
      var r = new Nu(e, t, (n = null != n && !0 === n.hydrate)),
        o = Tu(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0);
      (r.current = o),
        (o.stateNode = r),
        ia(o),
        (e[_n] = r.current),
        n &&
          0 !== t &&
          (function (e, t) {
            var n = Je(t);
            _t.forEach(function (e) {
              mt(e, t, n);
            }),
              Ct.forEach(function (e) {
                mt(e, t, n);
              });
          })(0, 9 === e.nodeType ? e : e.ownerDocument),
        (this._internalRoot = r);
    }
    function Bu(e) {
      return !(
        !e ||
        (1 !== e.nodeType &&
          9 !== e.nodeType &&
          11 !== e.nodeType &&
          (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
      );
    }
    function Wu(e, t, n, r, o) {
      var a = n._reactRootContainer;
      if (a) {
        var i = a._internalRoot;
        if ("function" == typeof o) {
          var l = o;
          o = function () {
            var e = Lu(i);
            l.call(e);
          };
        }
        Du(t, i, e, o);
      } else {
        if (
          ((a = n._reactRootContainer = (function (e, t) {
            if (
              (t ||
                (t = !(
                  !(t = e
                    ? 9 === e.nodeType
                      ? e.documentElement
                      : e.firstChild
                    : null) ||
                  1 !== t.nodeType ||
                  !t.hasAttribute("data-reactroot")
                )),
              !t)
            )
              for (var n; (n = e.lastChild); ) e.removeChild(n);
            return new Uu(e, 0, t ? { hydrate: !0 } : void 0);
          })(n, r)),
          (i = a._internalRoot),
          "function" == typeof o)
        ) {
          var u = o;
          o = function () {
            var e = Lu(i);
            u.call(e);
          };
        }
        tu(function () {
          Du(t, i, e, o);
        });
      }
      return Lu(i);
    }
    function Vu(e, t, n) {
      var r =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: te,
        key: null == r ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function $u(e, t) {
      var n =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!Bu(t)) throw Error(i(200));
      return Vu(e, t, null, n);
    }
    (Uu.prototype.render = function (e) {
      Du(e, this._internalRoot, null, null);
    }),
      (Uu.prototype.unmount = function () {
        var e = this._internalRoot,
          t = e.containerInfo;
        Du(null, e, null, function () {
          t[_n] = null;
        });
      }),
      (ht = function (e) {
        if (13 === e.tag) {
          var t = qo(Ql(), 150, 100);
          ql(e, t), Fu(e, t);
        }
      }),
      (vt = function (e) {
        13 === e.tag && (ql(e, 3), Fu(e, 3));
      }),
      (yt = function (e) {
        if (13 === e.tag) {
          var t = Ql();
          ql(e, (t = Kl(t, e, null))), Fu(e, t);
        }
      }),
      (P = function (e, t, n) {
        switch (t) {
          case "input":
            if ((Se(e, n), (t = n.name), "radio" === n.type && null != t)) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
                ),
                  t = 0;
                t < n.length;
                t++
              ) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                  var o = An(r);
                  if (!o) throw Error(i(90));
                  xe(r), Se(r, o);
                }
              }
            }
            break;
          case "textarea":
            Me(e, n);
            break;
          case "select":
            null != (t = n.value) && Oe(e, !!n.multiple, t, !1);
        }
      }),
      (I = eu),
      (z = function (e, t, n, r, o) {
        var a = kl;
        kl |= 4;
        try {
          return Vo(98, e.bind(null, t, n, r, o));
        } finally {
          0 === (kl = a) && Qo();
        }
      }),
      (D = function () {
        0 == (49 & kl) &&
          ((function () {
            if (null !== Wl) {
              var e = Wl;
              (Wl = null),
                e.forEach(function (e, t) {
                  zu(t, e), Gl(t);
                }),
                Qo();
            }
          })(),
          hu());
      }),
      (L = function (e, t) {
        var n = kl;
        kl |= 2;
        try {
          return e(t);
        } finally {
          0 === (kl = n) && Qo();
        }
      });
    var Hu,
      Qu,
      Ku = {
        Events: [
          Pn,
          On,
          An,
          _,
          k,
          Ln,
          function (e) {
            ot(e, Dn);
          },
          M,
          R,
          Gt,
          lt,
          hu,
          { current: !1 },
        ],
      };
    (Qu = (Hu = {
      findFiberByHostInstance: Cn,
      bundleType: 0,
      version: "16.13.1",
      rendererPackageName: "react-dom",
    }).findFiberByHostInstance),
      (function (e) {
        if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
        var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (t.isDisabled || !t.supportsFiber) return !0;
        try {
          var n = t.inject(e);
          (xu = function (e) {
            try {
              t.onCommitFiberRoot(
                n,
                e,
                void 0,
                64 == (64 & e.current.effectTag)
              );
            } catch (e) {}
          }),
            (Eu = function (e) {
              try {
                t.onCommitFiberUnmount(n, e);
              } catch (e) {}
            });
        } catch (e) {}
      })(
        o({}, Hu, {
          overrideHookState: null,
          overrideProps: null,
          setSuspenseHandler: null,
          scheduleUpdate: null,
          currentDispatcherRef: Y.ReactCurrentDispatcher,
          findHostInstanceByFiber: function (e) {
            return null === (e = nt(e)) ? null : e.stateNode;
          },
          findFiberByHostInstance: function (e) {
            return Qu ? Qu(e) : null;
          },
          findHostInstancesForRefresh: null,
          scheduleRefresh: null,
          scheduleRoot: null,
          setRefreshHandler: null,
          getCurrentFiber: null,
        })
      ),
      (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ku),
      (t.createPortal = $u),
      (t.findDOMNode = function (e) {
        if (null == e) return null;
        if (1 === e.nodeType) return e;
        var t = e._reactInternalFiber;
        if (void 0 === t) {
          if ("function" == typeof e.render) throw Error(i(188));
          throw Error(i(268, Object.keys(e)));
        }
        return (e = null === (e = nt(t)) ? null : e.stateNode);
      }),
      (t.flushSync = function (e, t) {
        if (0 != (48 & kl)) throw Error(i(187));
        var n = kl;
        kl |= 1;
        try {
          return Vo(99, e.bind(null, t));
        } finally {
          (kl = n), Qo();
        }
      }),
      (t.hydrate = function (e, t, n) {
        if (!Bu(t)) throw Error(i(200));
        return Wu(null, e, t, !0, n);
      }),
      (t.render = function (e, t, n) {
        if (!Bu(t)) throw Error(i(200));
        return Wu(null, e, t, !1, n);
      }),
      (t.unmountComponentAtNode = function (e) {
        if (!Bu(e)) throw Error(i(40));
        return (
          !!e._reactRootContainer &&
          (tu(function () {
            Wu(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[_n] = null);
            });
          }),
          !0)
        );
      }),
      (t.unstable_batchedUpdates = eu),
      (t.unstable_createPortal = function (e, t) {
        return $u(
          e,
          t,
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null
        );
      }),
      (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
        if (!Bu(n)) throw Error(i(200));
        if (null == e || void 0 === e._reactInternalFiber) throw Error(i(38));
        return Wu(e, t, n, !1, r);
      }),
      (t.version = "16.13.1");
  },
  function (e, t, n) {
    "use strict";
    e.exports = n(15);
  },
  function (e, t, n) {
    "use strict";
    /** @license React v0.19.1
     * scheduler.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r, o, a, i, l;
    if ("undefined" == typeof window || "function" != typeof MessageChannel) {
      var u = null,
        c = null,
        s = function () {
          if (null !== u)
            try {
              var e = t.unstable_now();
              u(!0, e), (u = null);
            } catch (e) {
              throw (setTimeout(s, 0), e);
            }
        },
        f = Date.now();
      (t.unstable_now = function () {
        return Date.now() - f;
      }),
        (r = function (e) {
          null !== u ? setTimeout(r, 0, e) : ((u = e), setTimeout(s, 0));
        }),
        (o = function (e, t) {
          c = setTimeout(e, t);
        }),
        (a = function () {
          clearTimeout(c);
        }),
        (i = function () {
          return !1;
        }),
        (l = t.unstable_forceFrameRate = function () {});
    } else {
      var d = window.performance,
        p = window.Date,
        m = window.setTimeout,
        h = window.clearTimeout;
      if ("undefined" != typeof console) {
        var v = window.cancelAnimationFrame;
        "function" != typeof window.requestAnimationFrame &&
          console.error(
            "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
          ),
          "function" != typeof v &&
            console.error(
              "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
            );
      }
      if ("object" == typeof d && "function" == typeof d.now)
        t.unstable_now = function () {
          return d.now();
        };
      else {
        var y = p.now();
        t.unstable_now = function () {
          return p.now() - y;
        };
      }
      var g = !1,
        b = null,
        w = -1,
        x = 5,
        E = 0;
      (i = function () {
        return t.unstable_now() >= E;
      }),
        (l = function () {}),
        (t.unstable_forceFrameRate = function (e) {
          0 > e || 125 < e
            ? console.error(
                "forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"
              )
            : (x = 0 < e ? Math.floor(1e3 / e) : 5);
        });
      var k = new MessageChannel(),
        T = k.port2;
      (k.port1.onmessage = function () {
        if (null !== b) {
          var e = t.unstable_now();
          E = e + x;
          try {
            b(!0, e) ? T.postMessage(null) : ((g = !1), (b = null));
          } catch (e) {
            throw (T.postMessage(null), e);
          }
        } else g = !1;
      }),
        (r = function (e) {
          (b = e), g || ((g = !0), T.postMessage(null));
        }),
        (o = function (e, n) {
          w = m(function () {
            e(t.unstable_now());
          }, n);
        }),
        (a = function () {
          h(w), (w = -1);
        });
    }
    function S(e, t) {
      var n = e.length;
      e.push(t);
      e: for (;;) {
        var r = (n - 1) >>> 1,
          o = e[r];
        if (!(void 0 !== o && 0 < P(o, t))) break e;
        (e[r] = t), (e[n] = o), (n = r);
      }
    }
    function _(e) {
      return void 0 === (e = e[0]) ? null : e;
    }
    function C(e) {
      var t = e[0];
      if (void 0 !== t) {
        var n = e.pop();
        if (n !== t) {
          e[0] = n;
          e: for (var r = 0, o = e.length; r < o; ) {
            var a = 2 * (r + 1) - 1,
              i = e[a],
              l = a + 1,
              u = e[l];
            if (void 0 !== i && 0 > P(i, n))
              void 0 !== u && 0 > P(u, i)
                ? ((e[r] = u), (e[l] = n), (r = l))
                : ((e[r] = i), (e[a] = n), (r = a));
            else {
              if (!(void 0 !== u && 0 > P(u, n))) break e;
              (e[r] = u), (e[l] = n), (r = l);
            }
          }
        }
        return t;
      }
      return null;
    }
    function P(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return 0 !== n ? n : e.id - t.id;
    }
    var O = [],
      A = [],
      N = 1,
      M = null,
      R = 3,
      I = !1,
      z = !1,
      D = !1;
    function L(e) {
      for (var t = _(A); null !== t; ) {
        if (null === t.callback) C(A);
        else {
          if (!(t.startTime <= e)) break;
          C(A), (t.sortIndex = t.expirationTime), S(O, t);
        }
        t = _(A);
      }
    }
    function j(e) {
      if (((D = !1), L(e), !z))
        if (null !== _(O)) (z = !0), r(F);
        else {
          var t = _(A);
          null !== t && o(j, t.startTime - e);
        }
    }
    function F(e, n) {
      (z = !1), D && ((D = !1), a()), (I = !0);
      var r = R;
      try {
        for (
          L(n), M = _(O);
          null !== M && (!(M.expirationTime > n) || (e && !i()));

        ) {
          var l = M.callback;
          if (null !== l) {
            (M.callback = null), (R = M.priorityLevel);
            var u = l(M.expirationTime <= n);
            (n = t.unstable_now()),
              "function" == typeof u ? (M.callback = u) : M === _(O) && C(O),
              L(n);
          } else C(O);
          M = _(O);
        }
        if (null !== M) var c = !0;
        else {
          var s = _(A);
          null !== s && o(j, s.startTime - n), (c = !1);
        }
        return c;
      } finally {
        (M = null), (R = r), (I = !1);
      }
    }
    function U(e) {
      switch (e) {
        case 1:
          return -1;
        case 2:
          return 250;
        case 5:
          return 1073741823;
        case 4:
          return 1e4;
        default:
          return 5e3;
      }
    }
    var B = l;
    (t.unstable_IdlePriority = 5),
      (t.unstable_ImmediatePriority = 1),
      (t.unstable_LowPriority = 4),
      (t.unstable_NormalPriority = 3),
      (t.unstable_Profiling = null),
      (t.unstable_UserBlockingPriority = 2),
      (t.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (t.unstable_continueExecution = function () {
        z || I || ((z = !0), r(F));
      }),
      (t.unstable_getCurrentPriorityLevel = function () {
        return R;
      }),
      (t.unstable_getFirstCallbackNode = function () {
        return _(O);
      }),
      (t.unstable_next = function (e) {
        switch (R) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = R;
        }
        var n = R;
        R = t;
        try {
          return e();
        } finally {
          R = n;
        }
      }),
      (t.unstable_pauseExecution = function () {}),
      (t.unstable_requestPaint = B),
      (t.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = R;
        R = e;
        try {
          return t();
        } finally {
          R = n;
        }
      }),
      (t.unstable_scheduleCallback = function (e, n, i) {
        var l = t.unstable_now();
        if ("object" == typeof i && null !== i) {
          var u = i.delay;
          (u = "number" == typeof u && 0 < u ? l + u : l),
            (i = "number" == typeof i.timeout ? i.timeout : U(e));
        } else (i = U(e)), (u = l);
        return (
          (e = {
            id: N++,
            callback: n,
            priorityLevel: e,
            startTime: u,
            expirationTime: (i = u + i),
            sortIndex: -1,
          }),
          u > l
            ? ((e.sortIndex = u),
              S(A, e),
              null === _(O) && e === _(A) && (D ? a() : (D = !0), o(j, u - l)))
            : ((e.sortIndex = i), S(O, e), z || I || ((z = !0), r(F))),
          e
        );
      }),
      (t.unstable_shouldYield = function () {
        var e = t.unstable_now();
        L(e);
        var n = _(O);
        return (
          (n !== M &&
            null !== M &&
            null !== n &&
            null !== n.callback &&
            n.startTime <= e &&
            n.expirationTime < M.expirationTime) ||
          i()
        );
      }),
      (t.unstable_wrapCallback = function (e) {
        var t = R;
        return function () {
          var n = R;
          R = t;
          try {
            return e.apply(this, arguments);
          } finally {
            R = n;
          }
        };
      });
  },
  function (e, t, n) {
    var r = n(17),
      o = n(18);
    "string" == typeof (o = o.__esModule ? o.default : o) &&
      (o = [[e.i, o, ""]]);
    var a = { insert: "head", singleton: !1 };
    r(o, a);
    e.exports = o.locals || {};
  },
  function (e, t, n) {
    "use strict";
    var r,
      o = function () {
        return (
          void 0 === r &&
            (r = Boolean(window && document && document.all && !window.atob)),
          r
        );
      },
      a = (function () {
        var e = {};
        return function (t) {
          if (void 0 === e[t]) {
            var n = document.querySelector(t);
            if (
              window.HTMLIFrameElement &&
              n instanceof window.HTMLIFrameElement
            )
              try {
                n = n.contentDocument.head;
              } catch (e) {
                n = null;
              }
            e[t] = n;
          }
          return e[t];
        };
      })(),
      i = [];
    function l(e) {
      for (var t = -1, n = 0; n < i.length; n++)
        if (i[n].identifier === e) {
          t = n;
          break;
        }
      return t;
    }
    function u(e, t) {
      for (var n = {}, r = [], o = 0; o < e.length; o++) {
        var a = e[o],
          u = t.base ? a[0] + t.base : a[0],
          c = n[u] || 0,
          s = "".concat(u, " ").concat(c);
        n[u] = c + 1;
        var f = l(s),
          d = { css: a[1], media: a[2], sourceMap: a[3] };
        -1 !== f
          ? (i[f].references++, i[f].updater(d))
          : i.push({ identifier: s, updater: v(d, t), references: 1 }),
          r.push(s);
      }
      return r;
    }
    function c(e) {
      var t = document.createElement("style"),
        r = e.attributes || {};
      if (void 0 === r.nonce) {
        var o = n.nc;
        o && (r.nonce = o);
      }
      if (
        (Object.keys(r).forEach(function (e) {
          t.setAttribute(e, r[e]);
        }),
        "function" == typeof e.insert)
      )
        e.insert(t);
      else {
        var i = a(e.insert || "head");
        if (!i)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
          );
        i.appendChild(t);
      }
      return t;
    }
    var s,
      f =
        ((s = []),
        function (e, t) {
          return (s[e] = t), s.filter(Boolean).join("\n");
        });
    function d(e, t, n, r) {
      var o = n
        ? ""
        : r.media
        ? "@media ".concat(r.media, " {").concat(r.css, "}")
        : r.css;
      if (e.styleSheet) e.styleSheet.cssText = f(t, o);
      else {
        var a = document.createTextNode(o),
          i = e.childNodes;
        i[t] && e.removeChild(i[t]),
          i.length ? e.insertBefore(a, i[t]) : e.appendChild(a);
      }
    }
    function p(e, t, n) {
      var r = n.css,
        o = n.media,
        a = n.sourceMap;
      if (
        (o ? e.setAttribute("media", o) : e.removeAttribute("media"),
        a &&
          btoa &&
          (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(
            btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
            " */"
          )),
        e.styleSheet)
      )
        e.styleSheet.cssText = r;
      else {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(r));
      }
    }
    var m = null,
      h = 0;
    function v(e, t) {
      var n, r, o;
      if (t.singleton) {
        var a = h++;
        (n = m || (m = c(t))),
          (r = d.bind(null, n, a, !1)),
          (o = d.bind(null, n, a, !0));
      } else
        (n = c(t)),
          (r = p.bind(null, n, t)),
          (o = function () {
            !(function (e) {
              if (null === e.parentNode) return !1;
              e.parentNode.removeChild(e);
            })(n);
          });
      return (
        r(e),
        function (t) {
          if (t) {
            if (
              t.css === e.css &&
              t.media === e.media &&
              t.sourceMap === e.sourceMap
            )
              return;
            r((e = t));
          } else o();
        }
      );
    }
    e.exports = function (e, t) {
      (t = t || {}).singleton ||
        "boolean" == typeof t.singleton ||
        (t.singleton = o());
      var n = u((e = e || []), t);
      return function (e) {
        if (
          ((e = e || []),
          "[object Array]" === Object.prototype.toString.call(e))
        ) {
          for (var r = 0; r < n.length; r++) {
            var o = l(n[r]);
            i[o].references--;
          }
          for (var a = u(e, t), c = 0; c < n.length; c++) {
            var s = l(n[c]);
            0 === i[s].references && (i[s].updater(), i.splice(s, 1));
          }
          n = a;
        }
      };
    };
  },
  function (e, t, n) {
    (t = n(19)(!1)).push([
      e.i,
      "html,\nbody {\n  margin: 0;\n  padding: 0;\n}\ntable thead {\n  font-weight: bold;\n}\ntable thead td {\n  padding: 6px 10px;\n}\n#axis_table table tr td:first-child {\n  padding: 6px 10px;\n  max-width: 50px;\n  overflow: hidden;\n  white-space: nowrap;\n}\nbutton {\n  border: 2px solid;\n  padding: 6px 10px;\n  margin: 10px;\n  border-radius: 6px;\n  cursor: pointer;\n  outline: 0px;\n  background-color: #0779e454;\n  font-weight: bold;\n}\nbutton:active {\n  background-color: #0779e4;\n  color: blanchedalmond;\n}\ninput {\n  border: 2px solid;\n  padding: 6px 10px;\n  border-radius: 6px;\n  outline: 0px;\n}\ninput:focus {\n  border-color: #0779e4;\n}\n.img_icon {\n  cursor: pointer;\n  margin: 0 10px;\n}\nmain {\n  width: 1200px;\n  margin: 0 auto;\n  background: #dff9fb;\n}\nmain #axis .effect {\n  height: 36px;\n  display: inline-block;\n}\nmain #axis .pointer {\n  width: 2px;\n  position: absolute;\n  overflow: hidden;\n}\nmain #axis .label {\n  border: 2px solid;\n  padding: 6px 10px;\n  margin: 10px;\n  border-radius: 6px;\n  cursor: pointer;\n}\nmain #axis .active {\n  border-color: #0779e4;\n  font-weight: bold;\n}\nmain #axis .lazy {\n  border-color: #0779e454;\n}\nmain #axis .action {\n  width: 600px;\n}\n",
      "",
    ]),
      (e.exports = t);
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e) {
      var t = [];
      return (
        (t.toString = function () {
          return this.map(function (t) {
            var n = (function (e, t) {
              var n = e[1] || "",
                r = e[3];
              if (!r) return n;
              if (t && "function" == typeof btoa) {
                var o =
                    ((i = r),
                    (l = btoa(unescape(encodeURIComponent(JSON.stringify(i))))),
                    (u = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                      l
                    )),
                    "/*# ".concat(u, " */")),
                  a = r.sources.map(function (e) {
                    return "/*# sourceURL="
                      .concat(r.sourceRoot || "")
                      .concat(e, " */");
                  });
                return [n].concat(a).concat([o]).join("\n");
              }
              var i, l, u;
              return [n].join("\n");
            })(t, e);
            return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
          }).join("");
        }),
        (t.i = function (e, n, r) {
          "string" == typeof e && (e = [[null, e, ""]]);
          var o = {};
          if (r)
            for (var a = 0; a < this.length; a++) {
              var i = this[a][0];
              null != i && (o[i] = !0);
            }
          for (var l = 0; l < e.length; l++) {
            var u = [].concat(e[l]);
            (r && o[u[0]]) ||
              (n &&
                (u[2]
                  ? (u[2] = "".concat(n, " and ").concat(u[2]))
                  : (u[2] = n)),
              t.push(u));
          }
        }),
        t
      );
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(21);
    function o() {}
    function a() {}
    (a.resetWarningCache = o),
      (e.exports = function () {
        function e(e, t, n, o, a, i) {
          if (i !== r) {
            var l = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw ((l.name = "Invariant Violation"), l);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var n = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          elementType: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
          checkPropTypes: a,
          resetWarningCache: o,
        };
        return (n.PropTypes = n), n;
      });
  },
  function (e, t, n) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  },
  function (e, t) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function (e, t) {
    e.exports =
      Array.isArray ||
      function (e) {
        return "[object Array]" == Object.prototype.toString.call(e);
      };
  },
  function (e, t, n) {
    "use strict";
    /** @license React v16.13.1
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = "function" == typeof Symbol && Symbol.for,
      o = r ? Symbol.for("react.element") : 60103,
      a = r ? Symbol.for("react.portal") : 60106,
      i = r ? Symbol.for("react.fragment") : 60107,
      l = r ? Symbol.for("react.strict_mode") : 60108,
      u = r ? Symbol.for("react.profiler") : 60114,
      c = r ? Symbol.for("react.provider") : 60109,
      s = r ? Symbol.for("react.context") : 60110,
      f = r ? Symbol.for("react.async_mode") : 60111,
      d = r ? Symbol.for("react.concurrent_mode") : 60111,
      p = r ? Symbol.for("react.forward_ref") : 60112,
      m = r ? Symbol.for("react.suspense") : 60113,
      h = r ? Symbol.for("react.suspense_list") : 60120,
      v = r ? Symbol.for("react.memo") : 60115,
      y = r ? Symbol.for("react.lazy") : 60116,
      g = r ? Symbol.for("react.block") : 60121,
      b = r ? Symbol.for("react.fundamental") : 60117,
      w = r ? Symbol.for("react.responder") : 60118,
      x = r ? Symbol.for("react.scope") : 60119;
    function E(e) {
      if ("object" == typeof e && null !== e) {
        var t = e.$$typeof;
        switch (t) {
          case o:
            switch ((e = e.type)) {
              case f:
              case d:
              case i:
              case u:
              case l:
              case m:
                return e;
              default:
                switch ((e = e && e.$$typeof)) {
                  case s:
                  case p:
                  case y:
                  case v:
                  case c:
                    return e;
                  default:
                    return t;
                }
            }
          case a:
            return t;
        }
      }
    }
    function k(e) {
      return E(e) === d;
    }
    (t.AsyncMode = f),
      (t.ConcurrentMode = d),
      (t.ContextConsumer = s),
      (t.ContextProvider = c),
      (t.Element = o),
      (t.ForwardRef = p),
      (t.Fragment = i),
      (t.Lazy = y),
      (t.Memo = v),
      (t.Portal = a),
      (t.Profiler = u),
      (t.StrictMode = l),
      (t.Suspense = m),
      (t.isAsyncMode = function (e) {
        return k(e) || E(e) === f;
      }),
      (t.isConcurrentMode = k),
      (t.isContextConsumer = function (e) {
        return E(e) === s;
      }),
      (t.isContextProvider = function (e) {
        return E(e) === c;
      }),
      (t.isElement = function (e) {
        return "object" == typeof e && null !== e && e.$$typeof === o;
      }),
      (t.isForwardRef = function (e) {
        return E(e) === p;
      }),
      (t.isFragment = function (e) {
        return E(e) === i;
      }),
      (t.isLazy = function (e) {
        return E(e) === y;
      }),
      (t.isMemo = function (e) {
        return E(e) === v;
      }),
      (t.isPortal = function (e) {
        return E(e) === a;
      }),
      (t.isProfiler = function (e) {
        return E(e) === u;
      }),
      (t.isStrictMode = function (e) {
        return E(e) === l;
      }),
      (t.isSuspense = function (e) {
        return E(e) === m;
      }),
      (t.isValidElementType = function (e) {
        return (
          "string" == typeof e ||
          "function" == typeof e ||
          e === i ||
          e === d ||
          e === u ||
          e === l ||
          e === m ||
          e === h ||
          ("object" == typeof e &&
            null !== e &&
            (e.$$typeof === y ||
              e.$$typeof === v ||
              e.$$typeof === c ||
              e.$$typeof === s ||
              e.$$typeof === p ||
              e.$$typeof === b ||
              e.$$typeof === w ||
              e.$$typeof === x ||
              e.$$typeof === g))
        );
      }),
      (t.typeOf = E);
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0),
      o = n.n(r),
      a = n(7),
      i = n.n(a);
    function l(e, t) {
      (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        (e.__proto__ = t);
    }
    var u = n(1),
      c = n.n(u);
    function s() {
      return (s =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function f(e) {
      return "/" === e.charAt(0);
    }
    function d(e, t) {
      for (var n = t, r = n + 1, o = e.length; r < o; n += 1, r += 1)
        e[n] = e[r];
      e.pop();
    }
    var p = function (e, t) {
      void 0 === t && (t = "");
      var n,
        r = (e && e.split("/")) || [],
        o = (t && t.split("/")) || [],
        a = e && f(e),
        i = t && f(t),
        l = a || i;
      if (
        (e && f(e) ? (o = r) : r.length && (o.pop(), (o = o.concat(r))),
        !o.length)
      )
        return "/";
      if (o.length) {
        var u = o[o.length - 1];
        n = "." === u || ".." === u || "" === u;
      } else n = !1;
      for (var c = 0, s = o.length; s >= 0; s--) {
        var p = o[s];
        "." === p ? d(o, s) : ".." === p ? (d(o, s), c++) : c && (d(o, s), c--);
      }
      if (!l) for (; c--; c) o.unshift("..");
      !l || "" === o[0] || (o[0] && f(o[0])) || o.unshift("");
      var m = o.join("/");
      return n && "/" !== m.substr(-1) && (m += "/"), m;
    };
    function m(e) {
      return e.valueOf ? e.valueOf() : Object.prototype.valueOf.call(e);
    }
    var h = function e(t, n) {
      if (t === n) return !0;
      if (null == t || null == n) return !1;
      if (Array.isArray(t))
        return (
          Array.isArray(n) &&
          t.length === n.length &&
          t.every(function (t, r) {
            return e(t, n[r]);
          })
        );
      if ("object" == typeof t || "object" == typeof n) {
        var r = m(t),
          o = m(n);
        return r !== t || o !== n
          ? e(r, o)
          : Object.keys(Object.assign({}, t, n)).every(function (r) {
              return e(t[r], n[r]);
            });
      }
      return !1;
    };
    var v = function (e, t) {
      if (!e) throw new Error("Invariant failed");
    };
    function y(e) {
      return "/" === e.charAt(0) ? e : "/" + e;
    }
    function g(e) {
      return "/" === e.charAt(0) ? e.substr(1) : e;
    }
    function b(e, t) {
      return (function (e, t) {
        return (
          0 === e.toLowerCase().indexOf(t.toLowerCase()) &&
          -1 !== "/?#".indexOf(e.charAt(t.length))
        );
      })(e, t)
        ? e.substr(t.length)
        : e;
    }
    function w(e) {
      return "/" === e.charAt(e.length - 1) ? e.slice(0, -1) : e;
    }
    function x(e) {
      var t = e.pathname,
        n = e.search,
        r = e.hash,
        o = t || "/";
      return (
        n && "?" !== n && (o += "?" === n.charAt(0) ? n : "?" + n),
        r && "#" !== r && (o += "#" === r.charAt(0) ? r : "#" + r),
        o
      );
    }
    function E(e, t, n, r) {
      var o;
      "string" == typeof e
        ? ((o = (function (e) {
            var t = e || "/",
              n = "",
              r = "",
              o = t.indexOf("#");
            -1 !== o && ((r = t.substr(o)), (t = t.substr(0, o)));
            var a = t.indexOf("?");
            return (
              -1 !== a && ((n = t.substr(a)), (t = t.substr(0, a))),
              {
                pathname: t,
                search: "?" === n ? "" : n,
                hash: "#" === r ? "" : r,
              }
            );
          })(e)).state = t)
        : (void 0 === (o = s({}, e)).pathname && (o.pathname = ""),
          o.search
            ? "?" !== o.search.charAt(0) && (o.search = "?" + o.search)
            : (o.search = ""),
          o.hash
            ? "#" !== o.hash.charAt(0) && (o.hash = "#" + o.hash)
            : (o.hash = ""),
          void 0 !== t && void 0 === o.state && (o.state = t));
      try {
        o.pathname = decodeURI(o.pathname);
      } catch (e) {
        throw e instanceof URIError
          ? new URIError(
              'Pathname "' +
                o.pathname +
                '" could not be decoded. This is likely caused by an invalid percent-encoding.'
            )
          : e;
      }
      return (
        n && (o.key = n),
        r
          ? o.pathname
            ? "/" !== o.pathname.charAt(0) &&
              (o.pathname = p(o.pathname, r.pathname))
            : (o.pathname = r.pathname)
          : o.pathname || (o.pathname = "/"),
        o
      );
    }
    function k() {
      var e = null;
      var t = [];
      return {
        setPrompt: function (t) {
          return (
            (e = t),
            function () {
              e === t && (e = null);
            }
          );
        },
        confirmTransitionTo: function (t, n, r, o) {
          if (null != e) {
            var a = "function" == typeof e ? e(t, n) : e;
            "string" == typeof a
              ? "function" == typeof r
                ? r(a, o)
                : o(!0)
              : o(!1 !== a);
          } else o(!0);
        },
        appendListener: function (e) {
          var n = !0;
          function r() {
            n && e.apply(void 0, arguments);
          }
          return (
            t.push(r),
            function () {
              (n = !1),
                (t = t.filter(function (e) {
                  return e !== r;
                }));
            }
          );
        },
        notifyListeners: function () {
          for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
            n[r] = arguments[r];
          t.forEach(function (e) {
            return e.apply(void 0, n);
          });
        },
      };
    }
    var T = !(
      "undefined" == typeof window ||
      !window.document ||
      !window.document.createElement
    );
    function S(e, t) {
      t(window.confirm(e));
    }
    function _() {
      try {
        return window.history.state || {};
      } catch (e) {
        return {};
      }
    }
    function C(e) {
      void 0 === e && (e = {}), T || v(!1);
      var t,
        n = window.history,
        r =
          ((-1 === (t = window.navigator.userAgent).indexOf("Android 2.") &&
            -1 === t.indexOf("Android 4.0")) ||
            -1 === t.indexOf("Mobile Safari") ||
            -1 !== t.indexOf("Chrome") ||
            -1 !== t.indexOf("Windows Phone")) &&
          window.history &&
          "pushState" in window.history,
        o = !(-1 === window.navigator.userAgent.indexOf("Trident")),
        a = e,
        i = a.forceRefresh,
        l = void 0 !== i && i,
        u = a.getUserConfirmation,
        c = void 0 === u ? S : u,
        f = a.keyLength,
        d = void 0 === f ? 6 : f,
        p = e.basename ? w(y(e.basename)) : "";
      function m(e) {
        var t = e || {},
          n = t.key,
          r = t.state,
          o = window.location,
          a = o.pathname + o.search + o.hash;
        return p && (a = b(a, p)), E(a, r, n);
      }
      function h() {
        return Math.random().toString(36).substr(2, d);
      }
      var g = k();
      function C(e) {
        s(F, e), (F.length = n.length), g.notifyListeners(F.location, F.action);
      }
      function P(e) {
        (function (e) {
          return (
            void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS")
          );
        })(e) || N(m(e.state));
      }
      function O() {
        N(m(_()));
      }
      var A = !1;
      function N(e) {
        if (A) (A = !1), C();
        else {
          g.confirmTransitionTo(e, "POP", c, function (t) {
            t
              ? C({ action: "POP", location: e })
              : (function (e) {
                  var t = F.location,
                    n = R.indexOf(t.key);
                  -1 === n && (n = 0);
                  var r = R.indexOf(e.key);
                  -1 === r && (r = 0);
                  var o = n - r;
                  o && ((A = !0), z(o));
                })(e);
          });
        }
      }
      var M = m(_()),
        R = [M.key];
      function I(e) {
        return p + x(e);
      }
      function z(e) {
        n.go(e);
      }
      var D = 0;
      function L(e) {
        1 === (D += e) && 1 === e
          ? (window.addEventListener("popstate", P),
            o && window.addEventListener("hashchange", O))
          : 0 === D &&
            (window.removeEventListener("popstate", P),
            o && window.removeEventListener("hashchange", O));
      }
      var j = !1;
      var F = {
        length: n.length,
        action: "POP",
        location: M,
        createHref: I,
        push: function (e, t) {
          var o = E(e, t, h(), F.location);
          g.confirmTransitionTo(o, "PUSH", c, function (e) {
            if (e) {
              var t = I(o),
                a = o.key,
                i = o.state;
              if (r)
                if ((n.pushState({ key: a, state: i }, null, t), l))
                  window.location.href = t;
                else {
                  var u = R.indexOf(F.location.key),
                    c = R.slice(0, u + 1);
                  c.push(o.key), (R = c), C({ action: "PUSH", location: o });
                }
              else window.location.href = t;
            }
          });
        },
        replace: function (e, t) {
          var o = E(e, t, h(), F.location);
          g.confirmTransitionTo(o, "REPLACE", c, function (e) {
            if (e) {
              var t = I(o),
                a = o.key,
                i = o.state;
              if (r)
                if ((n.replaceState({ key: a, state: i }, null, t), l))
                  window.location.replace(t);
                else {
                  var u = R.indexOf(F.location.key);
                  -1 !== u && (R[u] = o.key),
                    C({ action: "REPLACE", location: o });
                }
              else window.location.replace(t);
            }
          });
        },
        go: z,
        goBack: function () {
          z(-1);
        },
        goForward: function () {
          z(1);
        },
        block: function (e) {
          void 0 === e && (e = !1);
          var t = g.setPrompt(e);
          return (
            j || (L(1), (j = !0)),
            function () {
              return j && ((j = !1), L(-1)), t();
            }
          );
        },
        listen: function (e) {
          var t = g.appendListener(e);
          return (
            L(1),
            function () {
              L(-1), t();
            }
          );
        },
      };
      return F;
    }
    var P = {
      hashbang: {
        encodePath: function (e) {
          return "!" === e.charAt(0) ? e : "!/" + g(e);
        },
        decodePath: function (e) {
          return "!" === e.charAt(0) ? e.substr(1) : e;
        },
      },
      noslash: { encodePath: g, decodePath: y },
      slash: { encodePath: y, decodePath: y },
    };
    function O(e) {
      var t = e.indexOf("#");
      return -1 === t ? e : e.slice(0, t);
    }
    function A() {
      var e = window.location.href,
        t = e.indexOf("#");
      return -1 === t ? "" : e.substring(t + 1);
    }
    function N(e) {
      window.location.replace(O(window.location.href) + "#" + e);
    }
    function M(e) {
      void 0 === e && (e = {}), T || v(!1);
      var t = window.history,
        n = (window.navigator.userAgent.indexOf("Firefox"), e),
        r = n.getUserConfirmation,
        o = void 0 === r ? S : r,
        a = n.hashType,
        i = void 0 === a ? "slash" : a,
        l = e.basename ? w(y(e.basename)) : "",
        u = P[i],
        c = u.encodePath,
        f = u.decodePath;
      function d() {
        var e = f(A());
        return l && (e = b(e, l)), E(e);
      }
      var p = k();
      function m(e) {
        s(F, e), (F.length = t.length), p.notifyListeners(F.location, F.action);
      }
      var h = !1,
        g = null;
      function _() {
        var e,
          t,
          n = A(),
          r = c(n);
        if (n !== r) N(r);
        else {
          var a = d(),
            i = F.location;
          if (
            !h &&
            ((t = a),
            (e = i).pathname === t.pathname &&
              e.search === t.search &&
              e.hash === t.hash)
          )
            return;
          if (g === x(a)) return;
          (g = null),
            (function (e) {
              if (h) (h = !1), m();
              else {
                p.confirmTransitionTo(e, "POP", o, function (t) {
                  t
                    ? m({ action: "POP", location: e })
                    : (function (e) {
                        var t = F.location,
                          n = I.lastIndexOf(x(t));
                        -1 === n && (n = 0);
                        var r = I.lastIndexOf(x(e));
                        -1 === r && (r = 0);
                        var o = n - r;
                        o && ((h = !0), z(o));
                      })(e);
                });
              }
            })(a);
        }
      }
      var C = A(),
        M = c(C);
      C !== M && N(M);
      var R = d(),
        I = [x(R)];
      function z(e) {
        t.go(e);
      }
      var D = 0;
      function L(e) {
        1 === (D += e) && 1 === e
          ? window.addEventListener("hashchange", _)
          : 0 === D && window.removeEventListener("hashchange", _);
      }
      var j = !1;
      var F = {
        length: t.length,
        action: "POP",
        location: R,
        createHref: function (e) {
          var t = document.querySelector("base"),
            n = "";
          return (
            t && t.getAttribute("href") && (n = O(window.location.href)),
            n + "#" + c(l + x(e))
          );
        },
        push: function (e, t) {
          var n = E(e, void 0, void 0, F.location);
          p.confirmTransitionTo(n, "PUSH", o, function (e) {
            if (e) {
              var t = x(n),
                r = c(l + t);
              if (A() !== r) {
                (g = t),
                  (function (e) {
                    window.location.hash = e;
                  })(r);
                var o = I.lastIndexOf(x(F.location)),
                  a = I.slice(0, o + 1);
                a.push(t), (I = a), m({ action: "PUSH", location: n });
              } else m();
            }
          });
        },
        replace: function (e, t) {
          var n = E(e, void 0, void 0, F.location);
          p.confirmTransitionTo(n, "REPLACE", o, function (e) {
            if (e) {
              var t = x(n),
                r = c(l + t);
              A() !== r && ((g = t), N(r));
              var o = I.indexOf(x(F.location));
              -1 !== o && (I[o] = t), m({ action: "REPLACE", location: n });
            }
          });
        },
        go: z,
        goBack: function () {
          z(-1);
        },
        goForward: function () {
          z(1);
        },
        block: function (e) {
          void 0 === e && (e = !1);
          var t = p.setPrompt(e);
          return (
            j || (L(1), (j = !0)),
            function () {
              return j && ((j = !1), L(-1)), t();
            }
          );
        },
        listen: function (e) {
          var t = p.appendListener(e);
          return (
            L(1),
            function () {
              L(-1), t();
            }
          );
        },
      };
      return F;
    }
    function R(e, t, n) {
      return Math.min(Math.max(e, t), n);
    }
    function I(e) {
      void 0 === e && (e = {});
      var t = e,
        n = t.getUserConfirmation,
        r = t.initialEntries,
        o = void 0 === r ? ["/"] : r,
        a = t.initialIndex,
        i = void 0 === a ? 0 : a,
        l = t.keyLength,
        u = void 0 === l ? 6 : l,
        c = k();
      function f(e) {
        s(y, e),
          (y.length = y.entries.length),
          c.notifyListeners(y.location, y.action);
      }
      function d() {
        return Math.random().toString(36).substr(2, u);
      }
      var p = R(i, 0, o.length - 1),
        m = o.map(function (e) {
          return E(e, void 0, "string" == typeof e ? d() : e.key || d());
        }),
        h = x;
      function v(e) {
        var t = R(y.index + e, 0, y.entries.length - 1),
          r = y.entries[t];
        c.confirmTransitionTo(r, "POP", n, function (e) {
          e ? f({ action: "POP", location: r, index: t }) : f();
        });
      }
      var y = {
        length: m.length,
        action: "POP",
        location: m[p],
        index: p,
        entries: m,
        createHref: h,
        push: function (e, t) {
          var r = E(e, t, d(), y.location);
          c.confirmTransitionTo(r, "PUSH", n, function (e) {
            if (e) {
              var t = y.index + 1,
                n = y.entries.slice(0);
              n.length > t ? n.splice(t, n.length - t, r) : n.push(r),
                f({ action: "PUSH", location: r, index: t, entries: n });
            }
          });
        },
        replace: function (e, t) {
          var r = E(e, t, d(), y.location);
          c.confirmTransitionTo(r, "REPLACE", n, function (e) {
            e &&
              ((y.entries[y.index] = r), f({ action: "REPLACE", location: r }));
          });
        },
        go: v,
        goBack: function () {
          v(-1);
        },
        goForward: function () {
          v(1);
        },
        canGo: function (e) {
          var t = y.index + e;
          return t >= 0 && t < y.entries.length;
        },
        block: function (e) {
          return void 0 === e && (e = !1), c.setPrompt(e);
        },
        listen: function (e) {
          return c.appendListener(e);
        },
      };
      return y;
    }
    var z = n(3),
      D = n.n(z),
      L = n(10),
      j = n.n(L);
    function F(e) {
      var t = [];
      return {
        on: function (e) {
          t.push(e);
        },
        off: function (e) {
          t = t.filter(function (t) {
            return t !== e;
          });
        },
        get: function () {
          return e;
        },
        set: function (n, r) {
          (e = n),
            t.forEach(function (t) {
              return t(e, r);
            });
        },
      };
    }
    var U =
        o.a.createContext ||
        function (e, t) {
          var n,
            o,
            a = "__create-react-context-" + j()() + "__",
            i = (function (e) {
              function n() {
                var t;
                return (
                  ((t = e.apply(this, arguments) || this).emitter = F(
                    t.props.value
                  )),
                  t
                );
              }
              D()(n, e);
              var r = n.prototype;
              return (
                (r.getChildContext = function () {
                  var e;
                  return ((e = {})[a] = this.emitter), e;
                }),
                (r.componentWillReceiveProps = function (e) {
                  if (this.props.value !== e.value) {
                    var n,
                      r = this.props.value,
                      o = e.value;
                    (
                      (a = r) === (i = o)
                        ? 0 !== a || 1 / a == 1 / i
                        : a != a && i != i
                    )
                      ? (n = 0)
                      : ((n = "function" == typeof t ? t(r, o) : 1073741823),
                        0 !== (n |= 0) && this.emitter.set(e.value, n));
                  }
                  var a, i;
                }),
                (r.render = function () {
                  return this.props.children;
                }),
                n
              );
            })(r.Component);
          i.childContextTypes = (((n = {})[a] = c.a.object.isRequired), n);
          var l = (function (t) {
            function n() {
              var e;
              return (
                ((e = t.apply(this, arguments) || this).state = {
                  value: e.getValue(),
                }),
                (e.onUpdate = function (t, n) {
                  0 != ((0 | e.observedBits) & n) &&
                    e.setState({ value: e.getValue() });
                }),
                e
              );
            }
            D()(n, t);
            var r = n.prototype;
            return (
              (r.componentWillReceiveProps = function (e) {
                var t = e.observedBits;
                this.observedBits = null == t ? 1073741823 : t;
              }),
              (r.componentDidMount = function () {
                this.context[a] && this.context[a].on(this.onUpdate);
                var e = this.props.observedBits;
                this.observedBits = null == e ? 1073741823 : e;
              }),
              (r.componentWillUnmount = function () {
                this.context[a] && this.context[a].off(this.onUpdate);
              }),
              (r.getValue = function () {
                return this.context[a] ? this.context[a].get() : e;
              }),
              (r.render = function () {
                return ((e = this.props.children), Array.isArray(e) ? e[0] : e)(
                  this.state.value
                );
                var e;
              }),
              n
            );
          })(r.Component);
          return (
            (l.contextTypes = (((o = {})[a] = c.a.object), o)),
            { Provider: i, Consumer: l }
          );
        },
      B = n(4),
      W = n.n(B);
    n(6);
    function V(e, t) {
      if (null == e) return {};
      var n,
        r,
        o = {},
        a = Object.keys(e);
      for (r = 0; r < a.length; r++)
        (n = a[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
      return o;
    }
    n(11);
    var $ = (function (e) {
        var t = U();
        return (t.displayName = e), t;
      })("Router"),
      H = (function (e) {
        function t(t) {
          var n;
          return (
            ((n = e.call(this, t) || this).state = {
              location: t.history.location,
            }),
            (n._isMounted = !1),
            (n._pendingLocation = null),
            t.staticContext ||
              (n.unlisten = t.history.listen(function (e) {
                n._isMounted
                  ? n.setState({ location: e })
                  : (n._pendingLocation = e);
              })),
            n
          );
        }
        l(t, e),
          (t.computeRootMatch = function (e) {
            return { path: "/", url: "/", params: {}, isExact: "/" === e };
          });
        var n = t.prototype;
        return (
          (n.componentDidMount = function () {
            (this._isMounted = !0),
              this._pendingLocation &&
                this.setState({ location: this._pendingLocation });
          }),
          (n.componentWillUnmount = function () {
            this.unlisten && this.unlisten();
          }),
          (n.render = function () {
            return o.a.createElement($.Provider, {
              children: this.props.children || null,
              value: {
                history: this.props.history,
                location: this.state.location,
                match: t.computeRootMatch(this.state.location.pathname),
                staticContext: this.props.staticContext,
              },
            });
          }),
          t
        );
      })(o.a.Component);
    o.a.Component;
    var Q = (function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      l(t, e);
      var n = t.prototype;
      return (
        (n.componentDidMount = function () {
          this.props.onMount && this.props.onMount.call(this, this);
        }),
        (n.componentDidUpdate = function (e) {
          this.props.onUpdate && this.props.onUpdate.call(this, this, e);
        }),
        (n.componentWillUnmount = function () {
          this.props.onUnmount && this.props.onUnmount.call(this, this);
        }),
        (n.render = function () {
          return null;
        }),
        t
      );
    })(o.a.Component);
    var K = {},
      q = 0;
    function X(e, t) {
      return (
        void 0 === e && (e = "/"),
        void 0 === t && (t = {}),
        "/" === e
          ? e
          : (function (e) {
              if (K[e]) return K[e];
              var t = W.a.compile(e);
              return q < 1e4 && ((K[e] = t), q++), t;
            })(e)(t, { pretty: !0 })
      );
    }
    function Y(e) {
      var t = e.computedMatch,
        n = e.to,
        r = e.push,
        a = void 0 !== r && r;
      return o.a.createElement($.Consumer, null, function (e) {
        e || v(!1);
        var r = e.history,
          i = e.staticContext,
          l = a ? r.push : r.replace,
          u = E(
            t
              ? "string" == typeof n
                ? X(n, t.params)
                : s({}, n, { pathname: X(n.pathname, t.params) })
              : n
          );
        return i
          ? (l(u), null)
          : o.a.createElement(Q, {
              onMount: function () {
                l(u);
              },
              onUpdate: function (e, t) {
                var n,
                  r,
                  o = E(t.to);
                (n = o),
                  (r = s({}, u, { key: o.key })),
                  (n.pathname === r.pathname &&
                    n.search === r.search &&
                    n.hash === r.hash &&
                    n.key === r.key &&
                    h(n.state, r.state)) ||
                    l(u);
              },
              to: n,
            });
      });
    }
    var G = {},
      J = 0;
    function Z(e, t) {
      void 0 === t && (t = {}),
        ("string" == typeof t || Array.isArray(t)) && (t = { path: t });
      var n = t,
        r = n.path,
        o = n.exact,
        a = void 0 !== o && o,
        i = n.strict,
        l = void 0 !== i && i,
        u = n.sensitive,
        c = void 0 !== u && u;
      return [].concat(r).reduce(function (t, n) {
        if (!n && "" !== n) return null;
        if (t) return t;
        var r = (function (e, t) {
            var n = "" + t.end + t.strict + t.sensitive,
              r = G[n] || (G[n] = {});
            if (r[e]) return r[e];
            var o = [],
              a = { regexp: W()(e, o, t), keys: o };
            return J < 1e4 && ((r[e] = a), J++), a;
          })(n, { end: a, strict: l, sensitive: c }),
          o = r.regexp,
          i = r.keys,
          u = o.exec(e);
        if (!u) return null;
        var s = u[0],
          f = u.slice(1),
          d = e === s;
        return a && !d
          ? null
          : {
              path: n,
              url: "/" === n && "" === s ? "/" : s,
              isExact: d,
              params: i.reduce(function (e, t, n) {
                return (e[t.name] = f[n]), e;
              }, {}),
            };
      }, null);
    }
    var ee = (function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (
        l(t, e),
        (t.prototype.render = function () {
          var e = this;
          return o.a.createElement($.Consumer, null, function (t) {
            t || v(!1);
            var n = e.props.location || t.location,
              r = s({}, t, {
                location: n,
                match: e.props.computedMatch
                  ? e.props.computedMatch
                  : e.props.path
                  ? Z(n.pathname, e.props)
                  : t.match,
              }),
              a = e.props,
              i = a.children,
              l = a.component,
              u = a.render;
            return (
              Array.isArray(i) && 0 === i.length && (i = null),
              o.a.createElement(
                $.Provider,
                { value: r },
                r.match
                  ? i
                    ? "function" == typeof i
                      ? i(r)
                      : i
                    : l
                    ? o.a.createElement(l, r)
                    : u
                    ? u(r)
                    : null
                  : "function" == typeof i
                  ? i(r)
                  : null
              )
            );
          });
        }),
        t
      );
    })(o.a.Component);
    function te(e) {
      return "/" === e.charAt(0) ? e : "/" + e;
    }
    function ne(e, t) {
      if (!e) return t;
      var n = te(e);
      return 0 !== t.pathname.indexOf(n)
        ? t
        : s({}, t, { pathname: t.pathname.substr(n.length) });
    }
    function re(e) {
      return "string" == typeof e ? e : x(e);
    }
    function oe(e) {
      return function () {
        v(!1);
      };
    }
    function ae() {}
    o.a.Component;
    var ie = (function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (
        l(t, e),
        (t.prototype.render = function () {
          var e = this;
          return o.a.createElement($.Consumer, null, function (t) {
            t || v(!1);
            var n,
              r,
              a = e.props.location || t.location;
            return (
              o.a.Children.forEach(e.props.children, function (e) {
                if (null == r && o.a.isValidElement(e)) {
                  n = e;
                  var i = e.props.path || e.props.from;
                  r = i ? Z(a.pathname, s({}, e.props, { path: i })) : t.match;
                }
              }),
              r ? o.a.cloneElement(n, { location: a, computedMatch: r }) : null
            );
          });
        }),
        t
      );
    })(o.a.Component);
    o.a.useContext;
    o.a.Component;
    var le = (function (e) {
      function t() {
        for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++)
          r[o] = arguments[o];
        return (
          ((t = e.call.apply(e, [this].concat(r)) || this).history = M(
            t.props
          )),
          t
        );
      }
      return (
        l(t, e),
        (t.prototype.render = function () {
          return o.a.createElement(H, {
            history: this.history,
            children: this.props.children,
          });
        }),
        t
      );
    })(o.a.Component);
    var ue = function (e, t) {
        return "function" == typeof e ? e(t) : e;
      },
      ce = function (e, t) {
        return "string" == typeof e ? E(e, null, null, t) : e;
      },
      se = function (e) {
        return e;
      },
      fe = o.a.forwardRef;
    void 0 === fe && (fe = se);
    var de = fe(function (e, t) {
      var n = e.innerRef,
        r = e.navigate,
        a = e.onClick,
        i = V(e, ["innerRef", "navigate", "onClick"]),
        l = i.target,
        u = s({}, i, {
          onClick: function (e) {
            try {
              a && a(e);
            } catch (t) {
              throw (e.preventDefault(), t);
            }
            e.defaultPrevented ||
              0 !== e.button ||
              (l && "_self" !== l) ||
              (function (e) {
                return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
              })(e) ||
              (e.preventDefault(), r());
          },
        });
      return (u.ref = (se !== fe && t) || n), o.a.createElement("a", u);
    });
    var pe = fe(function (e, t) {
        var n = e.component,
          r = void 0 === n ? de : n,
          a = e.replace,
          i = e.to,
          l = e.innerRef,
          u = V(e, ["component", "replace", "to", "innerRef"]);
        return o.a.createElement($.Consumer, null, function (e) {
          e || v(!1);
          var n = e.history,
            c = ce(ue(i, e.location), e.location),
            f = c ? n.createHref(c) : "",
            d = s({}, u, {
              href: f,
              navigate: function () {
                var t = ue(i, e.location);
                (a ? n.replace : n.push)(t);
              },
            });
          return (
            se !== fe ? (d.ref = t || l) : (d.innerRef = l),
            o.a.createElement(r, d)
          );
        });
      }),
      me = function (e) {
        return e;
      },
      he = o.a.forwardRef;
    void 0 === he && (he = me);
    he(function (e, t) {
      var n = e["aria-current"],
        r = void 0 === n ? "page" : n,
        a = e.activeClassName,
        i = void 0 === a ? "active" : a,
        l = e.activeStyle,
        u = e.className,
        c = e.exact,
        f = e.isActive,
        d = e.location,
        p = e.strict,
        m = e.style,
        h = e.to,
        y = e.innerRef,
        g = V(e, [
          "aria-current",
          "activeClassName",
          "activeStyle",
          "className",
          "exact",
          "isActive",
          "location",
          "strict",
          "style",
          "to",
          "innerRef",
        ]);
      return o.a.createElement($.Consumer, null, function (e) {
        e || v(!1);
        var n = d || e.location,
          a = ce(ue(h, n), n),
          b = a.pathname,
          w = b && b.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"),
          x = w ? Z(n.pathname, { path: w, exact: c, strict: p }) : null,
          E = !!(f ? f(x, n) : x),
          k = E
            ? (function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                return t
                  .filter(function (e) {
                    return e;
                  })
                  .join(" ");
              })(u, i)
            : u,
          T = E ? s({}, m, {}, l) : m,
          S = s(
            { "aria-current": (E && r) || null, className: k, style: T, to: a },
            g
          );
        return (
          me !== he ? (S.ref = t || y) : (S.innerRef = y),
          o.a.createElement(pe, S)
        );
      });
    });
    var ve = Object(r.createContext)(),
      ye = { token: "hello" };
    function ge(e, t) {
      var n = Object.assign({}, e);
      switch (t.type) {
        case "UPDATE":
          return (n[t.value] = t[t.value]), n;
        default:
          return e;
      }
    }
    var be = function () {
        var e = Object(r.useContext)(ve),
          t = e.token,
          n = e.dispatch;
        function a(e, t) {
          var r = (function (e, t, n) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = n),
              e
            );
          })({ type: "UPDATE", value: t }, t, e.target.value);
          n(r);
        }
        return o.a.createElement(
          "div",
          null,
          o.a.createElement("br", null),
          o.a.createElement("input", {
            type: "text",
            value: t,
            onChange: function (e) {
              return a(e, "token");
            },
            placeholder: "password",
          }),
          o.a.createElement("p", null, t)
        );
      },
      we = (n(16), n(8));
    function xe(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            o = !1,
            a = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (o = !0), (a = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (o) throw a;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return Ee(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Ee(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Ee(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var ke = [
      { path: "/", exact: !0, redirect: "/home" },
      { path: "/home", component: be },
      {
        path: "/axis",
        component: function (e) {
          var t = xe(Object(r.useState)(!1), 2),
            n = t[0],
            a = t[1],
            i = xe(Object(r.useState)(170), 2),
            l = i[0],
            u = i[1],
            c = xe(Object(r.useState)(we), 2),
            s = c[0],
            f = c[1],
            d = xe(
              Object(r.useState)([{ time: "130", focus: !1, offset: 0 }]),
              2
            ),
            p = d[0],
            m = d[1];
          function h(e) {
            var t = e.timing.map(function (e) {
              var t = 0;
              return (
                "1" === e[0] && (t += 60), 90 - (t += Number(e.slice(1, 3)))
              );
            });
            (e.axis = []),
              t.forEach(function (t, n, r) {
                var o = 0;
                (o = n ? t - r[n - 1] - e.effect : t) < 0 && (o = 0);
                var a = e.effect;
                n + 1 === r.length
                  ? (a = 90 - t)
                  : a > r[n + 1] - t && (a = r[n + 1] - t),
                  e.axis.push({ state: !1, width: o }),
                  e.axis.push({
                    state: !0,
                    width: a > e.effect ? e.effect : a,
                  }),
                  a > e.effect &&
                    e.axis.push({ state: !1, width: a - e.effect });
              });
          }
          function v(e) {
            var t = Object.assign([], p);
            (t[e].focus = !t[e].focus), m(t);
          }
          function y(e) {
            var t,
              n = Object.assign([], s);
            (n[e].active = !n[e].active),
              f(n),
              (t = 0),
              s.forEach(function (e) {
                h(e), e.active && t++;
              }),
              u(45 * t + 35);
          }
          return (
            s.forEach(function (e) {
              h(e);
            }),
            Object(r.useEffect)(function () {}, []),
            o.a.createElement(
              "section",
              { id: "axis" },
              o.a.createElement(
                "section",
                { id: "axis_menu" },
                s.map(function (e, t) {
                  return o.a.createElement(
                    "span",
                    {
                      className: [
                        "label ".concat(e.active ? "active" : "lazy"),
                      ],
                      key: e.name,
                      onClick: function () {
                        return y(t);
                      },
                    },
                    e.name
                  );
                }),
                o.a.createElement(
                  "button",
                  {
                    onClick: function () {
                      var e = prompt("输入时间轴名称：");
                      if (e) {
                        var t = prompt("输入持续时长：");
                        if (t) {
                          var n = Object.assign([], s);
                          n.push({
                            name: e,
                            color: "#ff5200",
                            effect: Number(t),
                            timing: ["122", "000"],
                            active: !0,
                            axis: [],
                          }),
                            f(n),
                            u(l + 45);
                        }
                      }
                    },
                  },
                  "添加时间轴"
                ),
                o.a.createElement(
                  "button",
                  {
                    onClick: function () {
                      var e = Object.assign([], p);
                      e.push({ time: "130", focus: !1, offset: 0 }), m(e);
                    },
                  },
                  "添加时间点"
                ),
                o.a.createElement(
                  "button",
                  { onClick: function () {} },
                  "校准基准点"
                )
              ),
              o.a.createElement(
                "section",
                { id: "axis_pointer" },
                p.map(function (e, t) {
                  return o.a.createElement("div", {
                    key: t,
                    className: "pointer",
                    style: {
                      transform: "translateX(".concat(
                        75 + 10 * e.offset,
                        "px)"
                      ),
                      background: e.focus ? "#d63031" : "#2d3436",
                      height: "".concat(l, "px"),
                    },
                  });
                })
              ),
              o.a.createElement(
                "section",
                { id: "axis_table" },
                o.a.createElement(
                  "table",
                  null,
                  o.a.createElement(
                    "thead",
                    null,
                    o.a.createElement(
                      "tr",
                      null,
                      o.a.createElement(
                        "td",
                        { style: { width: "50px" } },
                        "角色"
                      ),
                      o.a.createElement("td", null, "时间轴"),
                      o.a.createElement("td", null, "调整")
                    )
                  ),
                  o.a.createElement(
                    "tbody",
                    null,
                    s.map(function (e, t) {
                      var r = "";
                      return (
                        (r = e.active ? "table-row" : "none"),
                        o.a.createElement(
                          "tr",
                          { key: e.name, style: { display: r } },
                          o.a.createElement("td", null, e.name),
                          o.a.createElement(
                            "td",
                            null,
                            o.a.createElement(
                              "div",
                              null,
                              e.axis.map(function (t, n) {
                                return o.a.createElement("span", {
                                  key: n,
                                  className: "effect",
                                  style: {
                                    background: t.state ? e.color : "#81ecec",
                                    width: 10 * t.width,
                                  },
                                });
                              })
                            )
                          ),
                          o.a.createElement(
                            "td",
                            null,
                            o.a.createElement("img", {
                              src:
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABgUlEQVRYR92W/zVEMRCFv+1ACTqgA6sCOkAFbAWoABWgAlTAdkAFdIAOnLtn4sx7L3k/k/Mc+WuT3c13506SmQUzj8XMfP6tgEPgHNgFXoFL4DHmdgkH7oCjCOwGOKuv5xbg4SeA5sfArYH3gRcvIqcAD783cGBdWEqUCn3+HbkExGwPDggWXGikIYeAuu1LdwYkQofwGdgCvKiNC1MFxHKuff36l8HXgMRVxhQBKXgA6Nod2OTN4BKTRUAXXPc/2J6Ej01BNvgYAVnhQwVkhw8RUATeV0AxeB8B18Cp3ZvGI2LVrtdpT/Udbe+ASupDSXiXA3pCd4AVICf86H3PU5GH9ZQD28A78G3PaBF4mwNqHK6AelnNFnmXA2oa9lz1UhHRXMJU1Vqf1y7b/fexFAjwaT/SOVDUfjxZfW8UliHgNgcUra6WH4pYYvQmVFqqMdA+DujUfxhM4CzRxsRO6QemBr/5f11AOHxZNk9sIoa649kEVFqzP5eCktZH957dgR/OOGwhtLHJNgAAAABJRU5ErkJggg==",
                              alt: "adjust",
                              onClick: function () {
                                return (function (e) {
                                  var t = s[e].timing.join("-"),
                                    r = prompt("输入新时间轴：", t);
                                  if (r) {
                                    var o = r.split("-");
                                    (s[e].timing = o), a(!n);
                                  }
                                })(t);
                              },
                              className: "img_icon",
                            })
                          )
                        )
                      );
                    })
                  )
                )
              ),
              o.a.createElement(
                "section",
                { id: "axis_action" },
                o.a.createElement(
                  "table",
                  null,
                  o.a.createElement(
                    "thead",
                    null,
                    o.a.createElement(
                      "tr",
                      null,
                      o.a.createElement("td", null, "时间点"),
                      o.a.createElement("td", null, "行动"),
                      o.a.createElement("td", null, "移除")
                    )
                  ),
                  o.a.createElement(
                    "tbody",
                    null,
                    p.map(function (e, t) {
                      return o.a.createElement(
                        "tr",
                        { key: t },
                        o.a.createElement(
                          "td",
                          null,
                          o.a.createElement("input", {
                            type: "text",
                            value: e.time,
                            onChange: function (e) {
                              return (function (e, t) {
                                var n = Object.assign([], p);
                                if (
                                  ((n[t].time = e.target.value),
                                  3 === e.target.value.length)
                                ) {
                                  var r = 0;
                                  "1" === n[t].time[0] && (r += 60),
                                    (r += Number(n[t].time.slice(1, 3))),
                                    (n[t].offset = 90 - r);
                                }
                                m(n);
                              })(e, t);
                            },
                            onFocus: function () {
                              return v(t);
                            },
                            onBlur: function () {
                              return v(t);
                            },
                            className: "time",
                          })
                        ),
                        o.a.createElement(
                          "td",
                          null,
                          o.a.createElement("input", {
                            type: "text",
                            onFocus: function () {
                              return v(t);
                            },
                            onBlur: function () {
                              return v(t);
                            },
                            className: "action",
                          })
                        ),
                        o.a.createElement(
                          "td",
                          null,
                          o.a.createElement("img", {
                            src:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACTElEQVRYR82WjTEEQRCF30WACBABIkAEiAARIAJEgAgQASJABIgAGRAB9V1Nb83OTe+226s6XbVVt3sz3a+7X/+MNGcZzdm+hgDYkvSTOfA8jTN/AbAiaV/SrqR1x9irpHtJt5I+IoAiABYlXUg6yBR+S8JYLpvF+6Wkc0lfXUD6AODpoyRAIHiGhzw1ITo8RArB+HYFbHO3CwAeX6eT5Jf3UFglka4bSRaVw/Q+AdoDgOcv6fSVpONIPitnSMNR+r5Ri0QNAOF+T2EfYtzwGAjSsVpyogaA0JHDh5TPKZ1vXXtK6ZhwqARA7vAeAW00530gXb0lgDNJp4ntednlBmA5HpXlReogHZGriUWW0sTOWEoA1PaapD2n1DB+l8hEeRkIjFOukDdyF0JWAdBaaTJW96UnfMd7QAIWEIgZf5NEi/aaj7XuxvE8AlxEETXPb09KEJzD8z7jnDMyApzfrRREAXAvB8F7xPjMAVjYUWzp6Oz7s4pATjg8R3JOdIGgrJcTdyZSgCJIgoIlhwClceNKScw+EqJ/fGbaMixznnPCK0Pj2GcaVtUyHNqIMOKNar7vSGq143/XigmLtUzyao2moy2E/rLdgoWm1eK9cQxbF8pwhUz5h6ozJLKQMM9PBhp3r0dXMtLBWhUdz4xfI1wn9shSinHSYfyAzd7IpQpYwQg30vR8D0UfAOv7lKftdqZr3MmS4DGPCRMVoN5O0RyMAMiNoBDvaL01ocnAGSqpby6M7/8FQGkwH9lwI8qPlp4hADrJFf1z7gB+AbEdlyG5xIUjAAAAAElFTkSuQmCC",
                            alt: "delete",
                            className: "img_icon",
                            onClick: function () {
                              return (function (e) {
                                var t = Object.assign([], p);
                                t.splice(e, 1), m(t);
                              })(t);
                            },
                          })
                        )
                      );
                    })
                  )
                )
              )
            )
          );
        },
      },
      { path: "/computed", component: n(9).a },
    ];
    var Te = function (e) {
      var t = e.match,
        n = e.routes,
        a = void 0 === n ? ke : n,
        i = Object(r.useContext)(ve).token,
        l = t ? "".concat(t.url, "/") : "";
      return o.a.createElement(
        ie,
        null,
        a.map(function (e, t) {
          return o.a.createElement(ee, {
            key: t,
            path: "".concat(l).concat(e.path),
            exact: !!e.exact,
            render: function (t) {
              return (function (e, t) {
                return t.redirect
                  ? o.a.createElement(Y, { to: t.redirect })
                  : t.auth && "hello" != i
                  ? o.a.createElement(Y, { to: "/home" })
                  : ((e.routes = t.children),
                    o.a.createElement(t.component, e));
              })(t, e);
            },
          });
        })
      );
    };
    var Se = function () {
      return o.a.createElement(
        "main",
        null,
        o.a.createElement(
          le,
          null,
          o.a.createElement(pe, { to: "/home" }, "Home"),
          o.a.createElement("span", null, " || "),
          o.a.createElement(pe, { to: "/axis" }, "Axis"),
          o.a.createElement("span", null, " || "),
          o.a.createElement(pe, { to: "/computed" }, "Computed"),
          o.a.createElement("div", { style: { height: "100px" } }),
          o.a.createElement(Te, null)
        )
      );
    };
    function _e(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Ce(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? _e(Object(n), !0).forEach(function (t) {
              Pe(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : _e(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function Pe(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function Oe(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            o = !1,
            a = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (o = !0), (a = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (o) throw a;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return Ae(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Ae(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Ae(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var Ne = function (e) {
      var t = e.children,
        n = Oe(Object(r.useReducer)(ge, ye), 2),
        a = n[0],
        i = n[1];
      return o.a.createElement(
        ve.Provider,
        { value: Ce({}, a, { dispatch: i }) },
        t
      );
    };
    i.a.render(
      o.a.createElement(Ne, null, o.a.createElement(Se, null)),
      document.querySelector("#app")
    );
  },
]);
