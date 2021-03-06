﻿/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */
var OktaAuth = (function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 33))
  );
})([
  function (e, t) {
    e.exports = function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  },
  function (e, t) {
    e.exports = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    };
  },
  function (e, t, r) {
    "use strict";
    function n(e) {
      return e.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    function o(e) {
      return e.replace(/-/g, "+").replace(/_/g, "/");
    }
    function i(e) {
      return /^(?:[a-z]+:)?\/\//i.test(e);
    }
    function a(e) {
      if (e) {
        var t = JSON.stringify(e);
        if (t) return JSON.parse(t);
      }
      return e;
    }
    function s() {
      return "undefined" != typeof window
        ? window.console
        : "undefined" != typeof console
        ? console
        : void 0;
    }
    function u() {
      var e = s();
      return e && e.log
        ? e
        : {
            log: function () {},
            warn: function () {},
            group: function () {},
            groupEnd: function () {},
          };
    }
    function c(e) {
      u().warn("[okta-auth-sdk] DEPRECATION: " + e);
    }
    function f(e) {
      if (e) {
        var t = e.replace(/^\s+|\s+$/gm, "");
        return (t = t.replace(/\/+$/, ""));
      }
    }
    (t.stringToBase64Url =
      /*!
       * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       */
      function (e) {
        return n(btoa(e));
      }),
      (t.base64ToBase64Url = n),
      (t.base64UrlToBase64 = o),
      (t.base64UrlToString = function (e) {
        var t = o(e);
        switch (t.length % 4) {
          case 0:
            break;
          case 2:
            t += "==";
            break;
          case 3:
            t += "=";
            break;
          default:
            throw "Not a valid Base64Url";
        }
        var r = atob(t);
        try {
          return decodeURIComponent(escape(r));
        } catch (e) {
          return r;
        }
      }),
      (t.stringToBuffer = function (e) {
        for (var t = new Uint8Array(e.length), r = 0; r < e.length; r++)
          t[r] = e.charCodeAt(r);
        return t;
      }),
      (t.base64UrlDecode = function (e) {
        return atob(o(e));
      }),
      (t.bind = function (e, t) {
        var r = Array.prototype.slice.call(arguments, 2);
        return function () {
          var n = Array.prototype.slice.call(arguments);
          return (n = r.concat(n)), e.apply(t, n);
        };
      }),
      (t.isAbsoluteUrl = i),
      (t.toAbsoluteUrl = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          t = arguments.length > 1 ? arguments[1] : void 0;
        if (i(e)) return e;
        return (
          (t = f(t)),
          "/" === e[0] ? "".concat(t).concat(e) : "".concat(t, "/").concat(e)
        );
      }),
      (t.toRelativeUrl = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          t = arguments.length > 1 ? arguments[1] : void 0;
        i(e) && (e = e.substring(t.length));
        return "/" === e[0] ? e : "/".concat(e);
      }),
      (t.isString = function (e) {
        return "[object String]" === Object.prototype.toString.call(e);
      }),
      (t.isObject = function (e) {
        return "[object Object]" === Object.prototype.toString.call(e);
      }),
      (t.isNumber = function (e) {
        return "[object Number]" === Object.prototype.toString.call(e);
      }),
      (t.isoToUTCString = function (e) {
        var t = e.match(/\d+/g),
          r = Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        return new Date(r).toUTCString();
      }),
      (t.toQueryString = function (e) {
        var t = [];
        if (null !== e)
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              void 0 !== e[r] &&
              null !== e[r] &&
              t.push(r + "=" + encodeURIComponent(e[r]));
        return t.length ? "?" + t.join("&") : "";
      }),
      (t.genRandomString = function (e) {
        for (
          var t =
              "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            r = "",
            n = 0,
            o = t.length;
          n < e;
          ++n
        )
          r += t[Math.floor(Math.random() * o)];
        return r;
      }),
      (t.extend = function () {
        var e = arguments[0],
          t = [].slice.call(arguments, 1);
        return (
          t.forEach(function (t) {
            for (var r in t)
              Object.prototype.hasOwnProperty.call(t, r) &&
                void 0 !== t[r] &&
                (e[r] = t[r]);
          }),
          e
        );
      }),
      (t.removeNils = function (e) {
        var t = {};
        for (var r in e)
          if (Object.prototype.hasOwnProperty.call(e, r)) {
            var n = e[r];
            null != n && (t[r] = n);
          }
        return t;
      }),
      (t.clone = a),
      (t.omit = function (e) {
        for (
          var t = {},
            r = arguments.length,
            n = new Array(r > 1 ? r - 1 : 0),
            o = 1;
          o < r;
          o++
        )
          n[o - 1] = arguments[o];
        for (var i in e)
          Object.prototype.hasOwnProperty.call(e, i) &&
            -1 == n.indexOf(i) &&
            (t[i] = e[i]);
        return a(t);
      }),
      (t.find = function (e, t) {
        var r = e.length;
        for (; r--; ) {
          var n = e[r],
            o = !0;
          for (var i in t)
            if (Object.prototype.hasOwnProperty.call(t, i) && n[i] !== t[i]) {
              o = !1;
              break;
            }
          if (o) return n;
        }
      }),
      (t.getLink = function (e, t, r) {
        if (!e || !e._links) return;
        var n = a(e._links[t]);
        if (!(n && n.name && r)) return n;
        if (n.name === r) return n;
      }),
      (t.getNativeConsole = s),
      (t.getConsole = u),
      (t.warn = function (e) {
        u().warn("[okta-auth-sdk] WARN: " + e);
      }),
      (t.deprecate = c),
      (t.deprecateWrap = function (e, t) {
        return function () {
          return c(e), t.apply(null, arguments);
        };
      }),
      (t.removeTrailingSlash = f),
      (t.isIE11OrLess = function () {
        return !!document.documentMode && document.documentMode <= 11;
      }),
      (t.isFunction = function (e) {
        return !!e && "[object Function]" === {}.toString.call(e);
      }),
      (t.delay = function (e) {
        return new Promise(function (t) {
          setTimeout(t, e);
        });
      }),
      (t.isPromise = function (e) {
        return e && e.finally && "function" == typeof e.finally;
      });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(1)),
      i = n(r(6)),
      a = n(r(7)),
      s = n(r(4));
    function u(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var r,
          n = (0, s.default)(e);
        if (t) {
          var o = (0, s.default)(this).constructor;
          r = Reflect.construct(n, arguments, o);
        } else r = n.apply(this, arguments);
        return (0, a.default)(this, r);
      };
    }
    var c = (function (e) {
      (0, i.default)(r, e);
      var t = u(r);
      function r(e, n) {
        var i;
        return (
          (0, o.default)(this, r),
          ((i = t.call(this, e)).name = "AuthSdkError"),
          (i.errorCode = "INTERNAL"),
          (i.errorSummary = e),
          (i.errorLink = "INTERNAL"),
          (i.errorId = "INTERNAL"),
          (i.errorCauses = []),
          n && (i.xhr = n),
          i
        );
      }
      return r;
    })(n(r(11)).default);
    (t.default = c), (e.exports = t.default);
  },
  function (e, t) {
    function r(t) {
      return (
        (e.exports = r = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            }),
        r(t)
      );
    }
    e.exports = r;
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = r(2),
      i = n(r(24)),
      a = r(8);
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     *
     */
    function s(e, t) {
      var r = (t = t || {}).url,
        n = t.method,
        s = t.args,
        u = t.saveAuthnState,
        c = t.accessToken,
        f = !1 !== t.withCredentials,
        l = e.options.storageUtil,
        d = l.storage,
        h = l.getHttpCache(e.options.cookies);
      if (t.cacheResponse) {
        var p = h.getStorage()[r];
        if (p && Date.now() / 1e3 < p.expiresAt)
          return Promise.resolve(p.response);
      }
      var g = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Okta-User-Agent-Extended": e.userAgent,
      };
      Object.assign(g, e.options.headers, t.headers),
        (g = (0, o.removeNils)(g)),
        c && (0, o.isString)(c) && (g.Authorization = "Bearer " + c);
      var v,
        y,
        m = { headers: g, data: s || void 0, withCredentials: f };
      return e.options
        .httpRequestClient(n, r, m)
        .then(function (n) {
          return (
            (y = n.responseText) && (0, o.isString)(y) && (y = JSON.parse(y)),
            u && (y.stateToken || d.delete(a.STATE_TOKEN_KEY_NAME)),
            y &&
              y.stateToken &&
              y.expiresAt &&
              d.set(
                a.STATE_TOKEN_KEY_NAME,
                y.stateToken,
                y.expiresAt,
                e.options.cookies
              ),
            y &&
              t.cacheResponse &&
              h.updateStorage(r, {
                expiresAt:
                  Math.floor(Date.now() / 1e3) + a.DEFAULT_CACHE_DURATION,
                response: y,
              }),
            y
          );
        })
        .catch(function (t) {
          var r = t.responseText || {};
          if ((0, o.isString)(r))
            try {
              r = JSON.parse(r);
            } catch (e) {
              r = { errorSummary: "Unknown error" };
            }
          throw (
            (t.status >= 500 && (r.errorSummary = "Unknown error"),
            e.options.transformErrorXHR &&
              (t = e.options.transformErrorXHR((0, o.clone)(t))),
            "E0000011" === (v = new i.default(r, t)).errorCode &&
              d.delete(a.STATE_TOKEN_KEY_NAME),
            v)
          );
        });
    }
    var u = {
      get: function (e, t, r) {
        var n = {
          url: (t = (0, o.isAbsoluteUrl)(t) ? t : e.getIssuerOrigin() + t),
          method: "GET",
        };
        return Object.assign(n, r), s(e, n);
      },
      post: function (e, t, r, n) {
        var i = {
          url: (t = (0, o.isAbsoluteUrl)(t) ? t : e.getIssuerOrigin() + t),
          method: "POST",
          args: r,
          saveAuthnState: !0,
        };
        return Object.assign(i, n), s(e, i);
      },
      httpRequest: s,
    };
    (t.default = u), (e.exports = t.default);
  },
  function (e, t, r) {
    var n = r(15);
    e.exports = function (e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        t && n(e, t);
    };
  },
  function (e, t, r) {
    var n = r(10),
      o = r(14);
    e.exports = function (e, t) {
      return !t || ("object" !== n(t) && "function" != typeof t) ? o(e) : t;
    };
  },
  function (e, t, r) {
    "use strict";
    t.REFERRER_PATH_STORAGE_KEY = t.REFRESH_TOKEN_STORAGE_KEY = t.ID_TOKEN_STORAGE_KEY = t.ACCESS_TOKEN_STORAGE_KEY = t.PKCE_STORAGE_NAME = t.CACHE_STORAGE_NAME = t.TOKEN_STORAGE_NAME = t.REDIRECT_NONCE_COOKIE_NAME = t.REDIRECT_STATE_COOKIE_NAME = t.REDIRECT_OAUTH_PARAMS_NAME = t.DEFAULT_CACHE_DURATION = t.DEFAULT_MAX_CLOCK_SKEW = t.DEFAULT_POLLING_DELAY = t.STATE_TOKEN_KEY_NAME = void 0;
    t.STATE_TOKEN_KEY_NAME = "oktaStateToken";
    t.DEFAULT_POLLING_DELAY = 500;
    t.DEFAULT_MAX_CLOCK_SKEW = 300;
    t.DEFAULT_CACHE_DURATION = 86400;
    t.REDIRECT_OAUTH_PARAMS_NAME = "okta-oauth-redirect-params";
    t.REDIRECT_STATE_COOKIE_NAME = "okta-oauth-state";
    t.REDIRECT_NONCE_COOKIE_NAME = "okta-oauth-nonce";
    t.TOKEN_STORAGE_NAME = "okta-token-storage";
    t.CACHE_STORAGE_NAME = "okta-cache-storage";
    t.PKCE_STORAGE_NAME = "okta-pkce-storage";
    t.ACCESS_TOKEN_STORAGE_KEY = "accessToken";
    t.ID_TOKEN_STORAGE_KEY = "idToken";
    t.REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
    t.REFERRER_PATH_STORAGE_KEY = "referrerPath";
  },
  function (e, t) {
    function r(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    e.exports = function (e, t, n) {
      return t && r(e.prototype, t), n && r(e, n), e;
    };
  },
  function (e, t) {
    function r(t) {
      return (
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? (e.exports = r = function (e) {
              return typeof e;
            })
          : (e.exports = r = function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
        r(t)
      );
    }
    e.exports = r;
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(1)),
      i = n(r(14)),
      a = n(r(6)),
      s = n(r(7)),
      u = n(r(4));
    function c(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      /*!
       * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       */
      return function () {
        var r,
          n = (0, u.default)(e);
        if (t) {
          var o = (0, u.default)(this).constructor;
          r = Reflect.construct(n, arguments, o);
        } else r = n.apply(this, arguments);
        return (0, s.default)(this, r);
      };
    }
    var f = (function (e) {
      (0, a.default)(r, e);
      var t = c(r);
      function r(e) {
        var n;
        return (
          (0, o.default)(this, r),
          (n = t.call(this, e)),
          Object.setPrototypeOf(
            (0, i.default)(n),
            (this instanceof r ? this.constructor : void 0).prototype
          ),
          n
        );
      }
      return r;
    })((0, n(r(21)).default)(Error));
    (t.default = f), (e.exports = t.default);
  },
  function (e, t, r) {
    "use strict";
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     *
     */
    function n(e, t) {
      var r = {};
      return (
        Object.assign(r, t),
        !r.stateToken && e.stateToken && (r.stateToken = e.stateToken),
        r
      );
    }
    (t.addStateToken = n),
      (t.getStateToken = function (e) {
        return n(e);
      });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(28)),
      i = r(8),
      a = n(r(3)),
      s = r(42),
      u = {
        browserHasLocalStorage: function () {
          try {
            var e = u.getLocalStorage();
            return u.testStorage(e);
          } catch (e) {
            return !1;
          }
        },
        browserHasSessionStorage: function () {
          try {
            var e = u.getSessionStorage();
            return u.testStorage(e);
          } catch (e) {
            return !1;
          }
        },
        getPKCEStorage: function (e) {
          return !(e = e || {}).preferLocalStorage &&
            u.browserHasSessionStorage()
            ? (0, o.default)(u.getSessionStorage(), i.PKCE_STORAGE_NAME)
            : u.browserHasLocalStorage()
            ? (0, o.default)(u.getLocalStorage(), i.PKCE_STORAGE_NAME)
            : (0, o.default)(u.getCookieStorage(e), i.PKCE_STORAGE_NAME);
        },
        getHttpCache: function (e) {
          return u.browserHasLocalStorage()
            ? (0, o.default)(u.getLocalStorage(), i.CACHE_STORAGE_NAME)
            : u.browserHasSessionStorage()
            ? (0, o.default)(u.getSessionStorage(), i.CACHE_STORAGE_NAME)
            : (0, o.default)(u.getCookieStorage(e), i.CACHE_STORAGE_NAME);
        },
        getLocalStorage: function () {
          return localStorage;
        },
        getSessionStorage: function () {
          return sessionStorage;
        },
        getCookieStorage: function (e) {
          var t = e.secure,
            r = e.sameSite;
          if (void 0 === t || void 0 === r)
            throw new a.default(
              'getCookieStorage: "secure" and "sameSite" options must be provided'
            );
          return {
            getItem: u.storage.get,
            setItem: function (e, n) {
              u.storage.set(e, n, "2200-01-01T00:00:00.000Z", {
                secure: t,
                sameSite: r,
              });
            },
          };
        },
        getInMemoryStorage: function () {
          var e = {};
          return {
            getItem: function (t) {
              return e[t];
            },
            setItem: function (t, r) {
              e[t] = r;
            },
          };
        },
        testStorage: function (e) {
          var t = "okta-test-storage";
          try {
            return e.setItem(t, t), e.removeItem(t), !0;
          } catch (e) {
            return !1;
          }
        },
        storage: {
          set: function (e, t, r, n) {
            var o = n.secure,
              i = n.sameSite;
            if (void 0 === o || void 0 === i)
              throw new a.default(
                'storage.set: "secure" and "sameSite" options must be provided'
              );
            var c = { path: n.path || "/", secure: o, sameSite: i };
            return (
              Date.parse(r) && (c.expires = new Date(r)),
              s.set(e, t, c),
              u.storage.get(e)
            );
          },
          get: function (e) {
            return s.get(e);
          },
          delete: function (e) {
            return s.remove(e, { path: "/" });
          },
        },
      },
      c = u;
    (t.default = c), (e.exports = t.default);
  },
  function (e, t) {
    e.exports = function (e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    };
  },
  function (e, t) {
    function r(t, n) {
      return (
        (e.exports = r =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          }),
        r(t, n)
      );
    }
    e.exports = r;
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.AuthTransaction = void 0;
    var o = n(r(1)),
      i = n(r(5)),
      a = r(2),
      s = n(r(3)),
      u = r(12),
      c = r(25),
      f = r(23);
    function l(e, t, r, n, o) {
      if (Array.isArray(n))
        return function (i, u) {
          if (!i) throw new s.default("Must provide a link name");
          var c = (0, a.find)(n, { name: i });
          if (!c) throw new s.default("No link found for that name");
          return l(e, t, r, c, o)(u);
        };
      if (n.hints && n.hints.allow && 1 === n.hints.allow.length)
        switch (n.hints.allow[0]) {
          case "GET":
            return function () {
              return i.default.get(e, n.href);
            };
          case "POST":
            return function (i) {
              o && o.isPolling && (o.isPolling = !1);
              var c = (0, u.addStateToken)(t, i);
              ("MFA_ENROLL" !== t.status && "FACTOR_ENROLL" !== t.status) ||
                Object.assign(c, {
                  factorType: r.factorType,
                  provider: r.provider,
                });
              var l = {},
                d = c.autoPush;
              if (void 0 !== d) {
                if ("function" == typeof d)
                  try {
                    l.autoPush = !!d();
                  } catch (e) {
                    return Promise.reject(
                      new s.default("AutoPush resulted in an error.")
                    );
                  }
                else null !== d && (l.autoPush = !!d);
                c = (0, a.omit)(c, "autoPush");
              }
              var h = c.rememberDevice;
              if (void 0 !== h) {
                if ("function" == typeof h)
                  try {
                    l.rememberDevice = !!h();
                  } catch (e) {
                    return Promise.reject(
                      new s.default("RememberDevice resulted in an error.")
                    );
                  }
                else null !== h && (l.rememberDevice = !!h);
                c = (0, a.omit)(c, "rememberDevice");
              } else
                c.profile &&
                  void 0 !== c.profile.updatePhone &&
                  (c.profile.updatePhone && (l.updatePhone = !0),
                  (c.profile = (0, a.omit)(c.profile, "updatePhone")));
              var p = n.href + (0, a.toQueryString)(l);
              return (0, f.postToTransaction)(e, p, c);
            };
        }
    }
    function d(e, t, r, n) {
      if (((r = r || t), (r = (0, a.clone)(r)), Array.isArray(r))) {
        for (var o = [], i = 0, s = r.length; i < s; i++)
          o.push(d(e, t, r[i], n));
        return o;
      }
      var u = r._embedded || {};
      for (var f in u)
        Object.prototype.hasOwnProperty.call(u, f) &&
          ((0, a.isObject)(u[f]) || Array.isArray(u[f])) &&
          (u[f] = d(e, t, u[f], n));
      var h = (function (e, t, r, n) {
        var o = {};
        for (var i in r._links)
          if (Object.prototype.hasOwnProperty.call(r._links, i)) {
            var a = r._links[i];
            if (("next" === i && (i = a.name), a.type)) o[i] = a;
            else
              switch (i) {
                case "poll":
                  o.poll = (0, c.getPollFn)(e, t, n);
                  break;
                default:
                  var s = l(e, t, r, a, n);
                  s && (o[i] = s);
              }
          }
        return o;
      })(e, t, r, n);
      return (
        Object.assign(u, h),
        (r = (0, a.omit)(r, "_embedded", "_links")),
        Object.assign(r, u),
        r
      );
    }
    t.AuthTransaction = function e(t) {
      var r =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      (0, o.default)(this, e),
        r &&
          ((this.data = r),
          Object.assign(this, d(t, r, r, {})),
          delete this.stateToken,
          "RECOVERY_CHALLENGE" !== r.status ||
            r._links ||
            (this.cancel = function () {
              return Promise.resolve(new e(t));
            }));
    };
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    (t.generateState =
      /*!
       * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       *
       */
      function () {
        return (0, i.genRandomString)(64);
      }),
      (t.generateNonce = function () {
        return (0, i.genRandomString)(64);
      }),
      (t.getWellKnown = u),
      (t.getKey = function (e, t, r) {
        var n = a.default.getHttpCache(e.options.cookies);
        return u(e, t).then(function (t) {
          var a = t.jwks_uri,
            u = n.getStorage()[a];
          if (u && Date.now() / 1e3 < u.expiresAt) {
            var c = (0, i.find)(u.response.keys, { kid: r });
            if (c) return c;
          }
          return (
            n.clearStorage(a),
            o.default.get(e, a, { cacheResponse: !0 }).then(function (e) {
              var t = (0, i.find)(e.keys, { kid: r });
              if (t) return t;
              throw new s.default(
                "The key id, " + r + ", was not found in the server's keys"
              );
            })
          );
        });
      }),
      (t.validateClaims = function (e, t, r) {
        var n = r.clientId,
          o = r.issuer,
          i = r.nonce;
        if (!t || !o || !n)
          throw new s.default(
            "The jwt, iss, and aud arguments are all required"
          );
        if (i && t.nonce !== i)
          throw new s.default(
            "OAuth flow response nonce doesn't match request nonce"
          );
        var a = Math.floor(Date.now() / 1e3);
        if (t.iss !== o)
          throw new s.default(
            "The issuer [" + t.iss + "] does not match [" + o + "]"
          );
        if (t.aud !== n)
          throw new s.default(
            "The audience [" + t.aud + "] does not match [" + n + "]"
          );
        if (t.iat > t.exp)
          throw new s.default("The JWT expired before it was issued");
        if (a - e.options.maxClockSkew > t.exp)
          throw new s.default("The JWT expired and is no longer valid");
        if (t.iat > a + e.options.maxClockSkew)
          throw new s.default("The JWT was issued in the future");
      }),
      (t.getOAuthUrls = function (e, t) {
        if (arguments.length > 2)
          throw new s.default(
            'As of version 3.0, "getOAuthUrls" takes only a single set of options'
          );
        t = t || {};
        var r =
            (0, i.removeTrailingSlash)(t.authorizeUrl) ||
            e.options.authorizeUrl,
          n = (0, i.removeTrailingSlash)(t.issuer) || e.options.issuer,
          o =
            (0, i.removeTrailingSlash)(t.userinfoUrl) || e.options.userinfoUrl,
          a = (0, i.removeTrailingSlash)(t.tokenUrl) || e.options.tokenUrl,
          u = (0, i.removeTrailingSlash)(t.logoutUrl) || e.options.logoutUrl,
          c = (0, i.removeTrailingSlash)(t.revokeUrl) || e.options.revokeUrl,
          f = n.indexOf("/oauth2") > 0 ? n : n + "/oauth2";
        return {
          issuer: n,
          authorizeUrl: (r = r || f + "/v1/authorize"),
          userinfoUrl: (o = o || f + "/v1/userinfo"),
          tokenUrl: (a = a || f + "/v1/token"),
          revokeUrl: (c = c || f + "/v1/revoke"),
          logoutUrl: (u = u || f + "/v1/logout"),
        };
      }),
      (t.loadFrame = function (e) {
        var t = document.createElement("iframe");
        return (
          (t.style.display = "none"), (t.src = e), document.body.appendChild(t)
        );
      }),
      (t.loadPopup = function (e, t) {
        var r =
            t.popupTitle || "External Identity Provider User Authentication",
          n =
            "toolbar=no, scrollbars=yes, resizable=yes, top=100, left=500, width=600, height=600";
        if ((0, i.isIE11OrLess)()) {
          var o = window.open("/", r, n);
          return (o.location.href = e), o;
        }
        return window.open(e, r, n);
      }),
      (t.urlParamsToObject = function (e) {
        var t = /\+/g,
          r = /([^&=]+)=?([^&]*)/g,
          n = e;
        "#" === n.charAt(0) && "/" === n.charAt(1) && (n = n.substring(2));
        ("#" !== n.charAt(0) && "?" !== n.charAt(0)) || (n = n.substring(1));
        var o,
          i = {};
        for (; (o = r.exec(n)); ) {
          var a = o[1],
            s = o[2];
          i[a] =
            "id_token" === a || "access_token" === a || "code" === a
              ? s
              : decodeURIComponent(s.replace(t, " "));
        }
        return i;
      }),
      (t.isLoginRedirect = function (e) {
        var t = e.options;
        if (t.pkce || "code" === t.responseType || "query" === t.responseMode) {
          var r =
            "fragment" === t.responseMode
              ? c(window.location.hash)
              : c(window.location.search);
          return (
            (function (e, t) {
              var r = t.options;
              return e && 0 == e.indexOf(r.redirectUri);
            })(window.location.href, e) && r
          );
        }
        return (n = window.location.hash), /((id|access)_token=)/i.test(n);
        var n;
      }),
      (t.addListener = function (e, t, r) {
        e.addEventListener
          ? e.addEventListener(t, r)
          : e.attachEvent("on" + t, r);
      }),
      (t.removeListener = function (e, t, r) {
        e.removeEventListener
          ? e.removeEventListener(t, r)
          : e.detachEvent("on" + t, r);
      });
    var o = n(r(5)),
      i = r(2),
      a = n(r(13)),
      s = n(r(3));
    function u(e, t) {
      var r = t || e.options.issuer;
      return o.default.get(e, r + "/.well-known/openid-configuration", {
        cacheResponse: !0,
      });
    }
    function c(e) {
      return /(code=)/i.test(e);
    }
  },
  function (e, t, r) {
    var n = r(10);
    function o() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap();
      return (
        (o = function () {
          return e;
        }),
        e
      );
    }
    e.exports = function (e) {
      if (e && e.__esModule) return e;
      if (null === e || ("object" !== n(e) && "function" != typeof e))
        return { default: e };
      var t = o();
      if (t && t.has(e)) return t.get(e);
      var r = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var a in e)
        if (Object.prototype.hasOwnProperty.call(e, a)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, a) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, a, s)
            : (r[a] = e[a]);
        }
      return (r.default = e), t && t.set(e, r), r;
    };
  },
  function (e, t, r) {
    e.exports = r(34);
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    (t.assertValidConfig =
      /*!
       * Copyright (c) 2018-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       */
      function (e) {
        var t = (e = e || {}).issuer;
        if (!t)
          throw new o.default(
            'No issuer passed to constructor. Required usage: new OktaAuth({issuer: "https://{yourOktaDomain}.com/oauth2/{authServerId}"})'
          );
        if (!new RegExp("^http?s?://.+").test(e.issuer))
          throw new o.default(
            'Issuer must be a valid URL. Required usage: new OktaAuth({issuer: "https://{yourOktaDomain}.com/oauth2/{authServerId}"})'
          );
        if (-1 !== t.indexOf("-admin."))
          throw new o.default(
            'Issuer URL passed to constructor contains "-admin" in subdomain. Required usage: new OktaAuth({issuer: "https://{yourOktaDomain}.com})'
          );
        var r = e.userAgent;
        if (r && r.template && -1 === r.template.indexOf("$OKTA_AUTH_JS"))
          throw new o.default(
            'UserAgentTemplate must include "$OKTA_AUTH_JS" placeholder. Required usage: new OktaAuth({userAgentTemplate: "xxx $OKTA_AUTH_JS xxx"})'
          );
      }),
      (t.getUserAgent = function (e, t) {
        var r = e.userAgent || {};
        if (r.value) return r.value;
        if (r.template) return r.template.replace("$OKTA_AUTH_JS", t);
        return t;
      });
    var o = n(r(3));
  },
  function (e, t, r) {
    var n = r(4),
      o = r(15),
      i = r(36),
      a = r(37);
    function s(t) {
      var r = "function" == typeof Map ? new Map() : void 0;
      return (
        (e.exports = s = function (e) {
          if (null === e || !i(e)) return e;
          if ("function" != typeof e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          if (void 0 !== r) {
            if (r.has(e)) return r.get(e);
            r.set(e, t);
          }
          function t() {
            return a(e, arguments, n(this).constructor);
          }
          return (
            (t.prototype = Object.create(e.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            o(t, e)
          );
        }),
        s(t)
      );
    }
    e.exports = s;
  },
  function (e, t, r) {
    "use strict";
    var n = r(23);
    Object.keys(n).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return n[e];
          },
        });
    });
    var o = r(16);
    Object.keys(o).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return o[e];
          },
        });
    });
    var i = r(25);
    Object.keys(i).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return i[e];
          },
        });
    });
    var a = r(39);
    Object.keys(a).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return a[e];
          },
        });
    });
    var s = r(12);
    Object.keys(s).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return s[e];
          },
        });
    });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    (t.transactionStatus =
      /*!
       * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       *
       */
      function (e, t) {
        return (
          (t = (0, s.addStateToken)(e, t)),
          o.default.post(e, e.getIssuerOrigin() + "/api/v1/authn", t)
        );
      }),
      (t.resumeTransaction = function (e, t) {
        if (!t || !t.stateToken) {
          var r = e.tx.exists._get(a.STATE_TOKEN_KEY_NAME);
          if (!r)
            return Promise.reject(new i.default("No transaction to resume"));
          t = { stateToken: r };
        }
        return e.tx.status(t).then(function (t) {
          return new u.AuthTransaction(e, t);
        });
      }),
      (t.transactionExists = function (e) {
        return !!e.tx.exists._get(a.STATE_TOKEN_KEY_NAME);
      }),
      (t.postToTransaction = function (e, t, r, n) {
        return o.default.post(e, t, r, n).then(function (t) {
          return new u.AuthTransaction(e, t);
        });
      }),
      (t.introspect = function (e, t) {
        if (!t || !t.stateToken) {
          var r = e.tx.exists._get(a.STATE_TOKEN_KEY_NAME);
          if (!r)
            return Promise.reject(new i.default("No transaction to evaluate"));
          t = { stateToken: r };
        }
        return (function (e, t) {
          return (
            (t = (0, s.addStateToken)(e, t)),
            o.default.post(
              e,
              e.getIssuerOrigin() + "/api/v1/authn/introspect",
              t
            )
          );
        })(e, t).then(function (t) {
          return new u.AuthTransaction(e, t);
        });
      });
    var o = n(r(5)),
      i = n(r(3)),
      a = r(8),
      s = r(12),
      u = r(16);
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(1)),
      i = n(r(6)),
      a = n(r(7)),
      s = n(r(4));
    function u(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var r,
          n = (0, s.default)(e);
        if (t) {
          var o = (0, s.default)(this).constructor;
          r = Reflect.construct(n, arguments, o);
        } else r = n.apply(this, arguments);
        return (0, a.default)(this, r);
      };
    }
    var c = (function (e) {
      (0, i.default)(r, e);
      var t = u(r);
      function r(e, n) {
        var i;
        (0, o.default)(this, r);
        var a = e.errorSummary;
        return (
          ((i = t.call(this, a)).name = "AuthApiError"),
          (i.errorSummary = e.errorSummary),
          (i.errorCode = e.errorCode),
          (i.errorLink = e.errorLink),
          (i.errorId = e.errorId),
          (i.errorCauses = e.errorCauses),
          n && (i.xhr = n),
          i
        );
      }
      return r;
    })(n(r(11)).default);
    (t.default = c), (e.exports = t.default);
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.getPollFn =
      /*!
       * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       *
       */
      function (e, t, r) {
        return function (n) {
          var l, d, h, p;
          (0, i.isNumber)(n)
            ? (l = n)
            : (0, i.isObject)(n) &&
              ((l = (n = n).delay),
              (d = n.rememberDevice),
              (h = n.autoPush),
              (p = n.transactionCallBack)),
            l || 0 === l || (l = a.DEFAULT_POLLING_DELAY);
          var g = (0, i.getLink)(t, "next", "poll");
          r.isPolling = !0;
          var v = 0;
          return (function n() {
            return r.isPolling
              ? (function () {
                  var r = {};
                  if ("function" == typeof h)
                    try {
                      r.autoPush = !!h();
                    } catch (e) {
                      return Promise.reject(
                        new s.default("AutoPush resulted in an error.")
                      );
                    }
                  else null != h && (r.autoPush = !!h);
                  if ("function" == typeof d)
                    try {
                      r.rememberDevice = !!d();
                    } catch (e) {
                      return Promise.reject(
                        new s.default("RememberDevice resulted in an error.")
                      );
                    }
                  else null != d && (r.rememberDevice = !!d);
                  var n = g.href + (0, i.toQueryString)(r);
                  return o.default.post(e, n, (0, f.getStateToken)(t), {
                    saveAuthnState: !1,
                  });
                })()
                  .then(function (t) {
                    if (
                      ((v = 0), t.factorResult && "WAITING" === t.factorResult)
                    ) {
                      if (!r.isPolling) throw new u.default();
                      return (
                        "function" == typeof p && p(t), (0, i.delay)(l).then(n)
                      );
                    }
                    return (r.isPolling = !1), new c.AuthTransaction(e, t);
                  })
                  .catch(function (e) {
                    if (
                      e.xhr &&
                      (0 === e.xhr.status || 429 === e.xhr.status) &&
                      v <= 4
                    ) {
                      var t = 1e3 * Math.pow(2, v);
                      return v++, (0, i.delay)(t).then(n);
                    }
                    throw e;
                  })
              : Promise.reject(new u.default());
          })().catch(function (e) {
            throw ((r.isPolling = !1), e);
          });
        };
      };
    var o = n(r(5)),
      i = r(2),
      a = r(8),
      s = n(r(3)),
      u = n(r(26)),
      c = r(16),
      f = r(12);
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(1)),
      i = n(r(6)),
      a = n(r(7)),
      s = n(r(4));
    function u(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var r,
          n = (0, s.default)(e);
        if (t) {
          var o = (0, s.default)(this).constructor;
          r = Reflect.construct(n, arguments, o);
        } else r = n.apply(this, arguments);
        return (0, a.default)(this, r);
      };
    }
    var c = (function (e) {
      (0, i.default)(r, e);
      var t = u(r);
      function r() {
        (0, o.default)(this, r);
        return t.call(this, "The poll was stopped by the sdk");
      }
      return r;
    })(n(r(11)).default);
    (t.default = c), (e.exports = t.default);
  },
  function (e, t, r) {
    "use strict";
    (t.getUserAgent = o),
      (t.isFingerprintSupported = function () {
        var e = o();
        return e && !n.test(e);
      }),
      (t.isPopupPostMessageSupported = function () {
        var e = document.documentMode && document.documentMode < 10;
        if (window.postMessage && !e) return !0;
        return !1;
      }),
      (t.isTokenVerifySupported = i),
      (t.hasTextEncoder = a),
      (t.isPKCESupported = function () {
        return i() && a();
      }),
      (t.isHTTPS = function () {
        return "https:" === window.location.protocol;
      }),
      (t.isLocalhost = function () {
        return "localhost" === window.location.hostname;
      });
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     */
    var n = /windows phone|iemobile|wpdesktop/i;
    function o() {
      return navigator.userAgent;
    }
    function i() {
      return (
        "undefined" != typeof crypto &&
        crypto.subtle &&
        "undefined" != typeof Uint8Array
      );
    }
    function a() {
      return "undefined" != typeof TextEncoder;
    }
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(3));
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     *
     */ var i = function (e, t) {
      if ("string" != typeof t || !t.length)
        throw new o.default('"storageName" is required');
      function r() {
        var r = e.getItem(t);
        r = r || "{}";
        try {
          return JSON.parse(r);
        } catch (e) {
          throw new o.default("Unable to parse storage string: " + t);
        }
      }
      function n(r) {
        try {
          var n = JSON.stringify(r);
          e.setItem(t, n);
        } catch (e) {
          throw new o.default("Unable to set storage: " + t);
        }
      }
      return {
        getStorage: r,
        setStorage: n,
        clearStorage: function (e) {
          if (!e) return n({});
          var t = r();
          delete t[e], n(t);
        },
        updateStorage: function (e, t) {
          var o = r();
          (o[e] = t), n(o);
        },
      };
    };
    (t.default = i), (e.exports = t.default);
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(1)),
      i = n(r(6)),
      a = n(r(7)),
      s = n(r(4));
    function u(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var r,
          n = (0, s.default)(e);
        if (t) {
          var o = (0, s.default)(this).constructor;
          r = Reflect.construct(n, arguments, o);
        } else r = n.apply(this, arguments);
        return (0, a.default)(this, r);
      };
    }
    var c = (function (e) {
      (0, i.default)(r, e);
      var t = u(r);
      function r(e, n) {
        var i;
        return (
          (0, o.default)(this, r),
          ((i = t.call(this, n)).name = "OAuthError"),
          (i.errorCode = e),
          (i.errorSummary = n),
          i
        );
      }
      return r;
    })(n(r(11)).default);
    (t.default = c), (e.exports = t.default);
  },
  function (e, t, r) {
    "use strict";
    var n = r(53);
    Object.keys(n).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return n[e];
          },
        });
    });
    var o = r(54);
    Object.keys(o).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return o[e];
          },
        });
    });
    var i = r(55);
    Object.keys(i).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return i[e];
          },
        });
    });
    var a = r(56);
    Object.keys(a).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return a[e];
          },
        });
    });
    var s = r(57);
    Object.keys(s).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return s[e];
          },
        });
    });
    var u = r(58);
    Object.keys(u).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return u[e];
          },
        });
    });
    var c = r(59);
    Object.keys(c).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return c[e];
          },
        });
    });
    var f = r(60);
    Object.keys(f).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return f[e];
          },
        });
    });
    var l = r(61);
    Object.keys(l).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return l[e];
          },
        });
    });
    var d = r(62);
    Object.keys(d).forEach(function (e) {
      "default" !== e &&
        "__esModule" !== e &&
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: function () {
            return d[e];
          },
        });
    });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.TokenManager = t.EVENT_ERROR = t.EVENT_REMOVED = t.EVENT_ADDED = t.EVENT_RENEWED = t.EVENT_EXPIRED = void 0;
    var o = n(r(10)),
      i = n(r(1)),
      a = n(r(63)),
      s = r(2),
      u = n(r(3)),
      c = n(r(13)),
      f = r(8),
      l = n(r(28)),
      d = n(r(64)),
      h = r(30),
      p = {
        autoRenew: !0,
        autoRemove: !0,
        storage: "localStorage",
        expireEarlySeconds: 30,
        storageKey: f.TOKEN_STORAGE_NAME,
        _storageEventDelay: 0,
      };
    t.EVENT_EXPIRED = "expired";
    t.EVENT_RENEWED = "renewed";
    t.EVENT_ADDED = "added";
    t.EVENT_REMOVED = "removed";
    function g(e, t) {
      return t.expiresAt - e.options.expireEarlySeconds;
    }
    function v(e, t) {
      return g(e, t) <= e.clock.now();
    }
    function y(e, t, r, n) {
      e.emitter.emit("renewed", t, r, n);
    }
    function m(e, t, r) {
      e.emitter.emit("added", t, r);
    }
    function k(e, t, r) {
      e.emitter.emit("removed", t, r);
    }
    function T(e, t) {
      e.emitter.emit("error", t);
    }
    function w(e, t, r) {
      var n = L(r),
        o = L(t);
      Object.keys(o).forEach(function (t) {
        var r = n[t],
          i = o[t];
        JSON.stringify(r) !== JSON.stringify(i) && m(e, t, i);
      }),
        Object.keys(n).forEach(function (t) {
          var r = n[t];
          o[t] || k(e, t, r);
        });
    }
    function b(e, t) {
      clearTimeout(e.expireTimeouts[t]),
        delete e.expireTimeouts[t],
        delete e.renewPromise[t];
    }
    function E(e) {
      var t = e.expireTimeouts;
      for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && b(e, r);
    }
    function _(e, t, r, n) {
      var o = g(t, n),
        i = 1e3 * Math.max(o - t.clock.now(), 0);
      b(t, r);
      var a = setTimeout(function () {
        !(function (e, t, r) {
          e.emitter.emit("expired", t, r);
        })(t, r, n);
      }, i);
      t.expireTimeouts[r] = a;
    }
    function S(e, t, r) {
      try {
        var n = r.getStorage();
      } catch (e) {
        return void T(t, e);
      }
      for (var o in n) {
        if (Object.prototype.hasOwnProperty.call(n, o)) _(0, t, o, n[o]);
      }
    }
    function O(e, t, r) {
      E(t), S(0, t, r);
    }
    function A(e) {
      if (
        !(0, s.isObject)(e) ||
        !e.scopes ||
        (!e.expiresAt && 0 !== e.expiresAt) ||
        (!(0, h.isIDToken)(e) &&
          !(0, h.isAccessToken)(e) &&
          !(0, h.isRefreshToken)(e))
      )
        throw new u.default(
          "Token must be an Object with scopes, expiresAt, and one of: an idToken, accessToken, or refreshToken property"
        );
    }
    function x(e, t, r, n, o) {
      e.features.isLocalhost() &&
        (0, s.warn)(
          "Use setTokens() instead if you want to add a set of tokens at same time.\nIt prevents current tab from emitting unnecessary StorageEvent,\nwhich may cause false-positive authState change cross tabs."
        );
      var i = r.getStorage();
      A(o), (i[n] = o), r.setStorage(i), m(t, n, o), _(0, t, n, o);
    }
    function R(e, t) {
      return e.getStorage()[t];
    }
    function P(e, t) {
      var r = e.getStorage();
      return Object.keys(r).filter(function (e) {
        var n = r[e];
        return (
          ((0, h.isAccessToken)(n) && "accessToken" === t) ||
          ((0, h.isIDToken)(n) && "idToken" === t) ||
          ((0, h.isRefreshToken)(n) && "refreshToken" === t)
        );
      })[0];
    }
    function U(e, t) {
      return new Promise(function (r) {
        return r(R(e, t));
      });
    }
    function j(e) {
      var t = {},
        r = e.getStorage();
      return (
        Object.keys(r).forEach(function (e) {
          var n = r[e];
          (0, h.isAccessToken)(n)
            ? (t.accessToken = n)
            : (0, h.isIDToken)(n)
            ? (t.idToken = n)
            : (0, h.isRefreshToken)(n) && (t.refreshToken = n);
        }),
        t
      );
    }
    function C(e) {
      return new Promise(function (t) {
        return t(j(e));
      });
    }
    function M(e, t, r, n, o, i, s) {
      var u = n.accessToken,
        c = n.idToken,
        l = n.refreshToken,
        d = function (e, r, n) {
          m(t, e, r), _(0, t, e, r), n && n(e, r);
        },
        h = function (e, r, n) {
          b(t, e), k(t, e, r), n && n(e, r);
        };
      c && A(c), u && A(u);
      var p = P(r, "idToken") || f.ID_TOKEN_STORAGE_KEY,
        g = P(r, "accessToken") || f.ACCESS_TOKEN_STORAGE_KEY,
        v = P(r, "refreshToken") || f.REFRESH_TOKEN_STORAGE_KEY,
        y = Object.assign(
          Object.assign(
            Object.assign({}, c && (0, a.default)({}, p, c)),
            u && (0, a.default)({}, g, u)
          ),
          l && (0, a.default)({}, v, l)
        );
      r.setStorage(y);
      var T = j(r);
      c ? d(p, c, i) : T.idToken && h(p, T.idToken, i),
        u ? d(g, u, o) : T.accessToken && h(g, T.accessToken, o),
        l ? d(v, l, s) : T.refreshToken && h(v, T.refreshToken, s);
    }
    function I(e, t, r) {
      b(e, r);
      var n = t.getStorage(),
        o = n[r];
      delete n[r], t.setStorage(n), k(e, r, o);
    }
    function N(e, t, r, n) {
      var o = t.renewPromise[n];
      if (o) return o;
      try {
        var i = R(r, n);
        if (!i)
          throw new u.default(
            "The tokenManager has no token for the key: " + n
          );
      } catch (e) {
        return Promise.reject(e);
      }
      return (
        E(t),
        (t.renewPromise[n] = e.token
          .renewTokens({ scopes: i.scopes })
          .then(function (e) {
            var o = r.getStorage();
            return (
              M(
                0,
                t,
                r,
                e,
                function (e, r) {
                  return y(t, e, r, o[e]);
                },
                function (e, r) {
                  return y(t, e, r, o[e]);
                }
              ),
              R(r, n)
            );
          })
          .catch(function (e) {
            if ("OAuthError" === e.name || "AuthSdkError" === e.name) {
              var o = [],
                i = r.getStorage();
              Object.keys(i).forEach(function (e) {
                var r = i[e];
                r &&
                  v(t, r) &&
                  (delete i[e], o.push({ key: e, token: r }), b(t, e));
              }),
                r.setStorage(i),
                o.length
                  ? o.forEach(function (e, r) {
                      return k(t, e, r);
                    })
                  : (k(t, f.ID_TOKEN_STORAGE_KEY),
                    k(t, f.ACCESS_TOKEN_STORAGE_KEY)),
                (e.tokenKey = n),
                T(t, e);
            }
            throw e;
          })
          .finally(function () {
            delete t.renewPromise[n];
          })),
        t.renewPromise[n]
      );
    }
    function D(e, t) {
      E(e), t.clearStorage();
    }
    function L(e) {
      var t;
      try {
        t = JSON.parse(e) || {};
      } catch (e) {
        t = {};
      }
      return t;
    }
    t.EVENT_ERROR = "error";
    t.TokenManager = function e(t, r) {
      var n,
        a = this;
      if (
        ((0, i.default)(this, e),
        (r = Object.assign({}, p, (0, s.removeNils)(r))),
        !t.emitter)
      )
        throw new u.default(
          "Emitter should be initialized before TokenManager"
        );
      if (
        ("localStorage" !== r.storage ||
          c.default.browserHasLocalStorage() ||
          ((0, s.warn)(
            "This browser doesn't support localStorage. Switching to sessionStorage."
          ),
          (r.storage = "sessionStorage")),
        "sessionStorage" !== r.storage ||
          c.default.browserHasSessionStorage() ||
          ((0, s.warn)(
            "This browser doesn't support sessionStorage. Switching to cookie-based storage."
          ),
          (r.storage = "cookie")),
        (0, s.isIE11OrLess)() &&
          (r._storageEventDelay = r._storageEventDelay || 1e3),
        "object" === (0, o.default)(r.storage))
      )
        n = r.storage;
      else
        switch (r.storage) {
          case "localStorage":
            n = localStorage;
            break;
          case "sessionStorage":
            n = sessionStorage;
            break;
          case "cookie":
            n = (function (e) {
              var t = c.default.getCookieStorage(e);
              return {
                getItem: function (e) {
                  var r = t.getItem(),
                    n = {};
                  return (
                    Object.keys(r).forEach(function (t) {
                      0 === t.indexOf(e) &&
                        (n[t.replace("".concat(e, "_"), "")] = JSON.parse(
                          r[t]
                        ));
                    }),
                    JSON.stringify(n)
                  );
                },
                setItem: function (e, r) {
                  var n = JSON.parse(this.getItem(e));
                  (r = JSON.parse(r)),
                    Object.keys(r).forEach(function (o) {
                      var i = e + "_" + o,
                        a = JSON.stringify(r[o]);
                      t.setItem(i, a), delete n[o];
                    }),
                    Object.keys(n).forEach(function (t) {
                      c.default.storage.delete(e + "_" + t);
                    });
                },
              };
            })(t.options.cookies);
            break;
          case "memory":
            n = c.default.getInMemoryStorage();
            break;
          default:
            throw new u.default("Unrecognized storage option");
        }
      var f = (0, l.default)(n, r.storageKey),
        h = {
          clock: d.default.create(),
          options: r,
          emitter: t.emitter,
          expireTimeouts: {},
          renewPromise: {},
        };
      (this.add = x.bind(this, t, h, f)),
        (this.get = U.bind(this, f)),
        (this.remove = I.bind(this, h, f)),
        (this.clear = D.bind(this, h, f)),
        (this.renew = N.bind(this, t, h, f)),
        (this.on = h.emitter.on.bind(h.emitter)),
        (this.off = h.emitter.off.bind(h.emitter)),
        (this.hasExpired = v.bind(this, h)),
        (this.getTokens = C.bind(this, f)),
        (this.setTokens = M.bind(this, t, h, f)),
        (this._getStorageKeyByType = P.bind(this, f)),
        (this._clearExpireEventTimeoutAll = E.bind(this, h)),
        (this._getOptions = function () {
          return (0, s.clone)(r);
        }),
        (this._resetExpireEventTimeoutAll = O.bind(this, t, h, f)),
        (this._emitEventsForCrossTabsStorageUpdate = w.bind(this, h));
      var g = [];
      this.on("expired", function (e) {
        if (r.autoRenew)
          if (
            (function (e) {
              var t = !1;
              if ((e.push(Date.now()), e.length >= 10)) {
                var r = e.shift();
                t = e[e.length - 1] - r < 3e4;
              }
              return t;
            })(g)
          ) {
            var t = new u.default("Too many token renew requests");
            T(h, t);
          } else a.renew(e).catch(function () {});
        else r.autoRemove && a.remove(e);
      }),
        S(0, h, f),
        window.addEventListener("storage", function (e) {
          var t = e.key,
            n = e.newValue,
            o = e.oldValue;
          (!t || (t === r.storageKey && n !== o)) &&
            setTimeout(function () {
              return (
                a._resetExpireEventTimeoutAll(),
                void a._emitEventsForCrossTabsStorageUpdate(n, o)
              );
            }, r._storageEventDelay);
        });
    };
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    Object.defineProperty(t, "AuthApiError", {
      enumerable: !0,
      get: function () {
        return o.default;
      },
    }),
      Object.defineProperty(t, "AuthPollStopError", {
        enumerable: !0,
        get: function () {
          return i.default;
        },
      }),
      Object.defineProperty(t, "AuthSdkError", {
        enumerable: !0,
        get: function () {
          return a.default;
        },
      }),
      Object.defineProperty(t, "OAuthError", {
        enumerable: !0,
        get: function () {
          return s.default;
        },
      });
    var o = n(r(24)),
      i = n(r(26)),
      a = n(r(3)),
      s = n(r(29));
  },
  function (e, t, r) {
    "use strict";
    var n = r(18),
      o = r(0);
    t.default = void 0;
    var i = o(r(19)),
      a = o(r(1)),
      s = o(r(9)),
      u = o(r(14)),
      c = o(r(6)),
      f = o(r(7)),
      l = o(r(4)),
      d = o(r(35)),
      h = n(r(27)),
      p = o(r(40)),
      g = o(r(13)),
      v = r(2),
      y = r(20),
      m = r(8),
      k = r(43),
      T = r(44),
      w = r(31),
      b = r(17),
      E = o(r(5)),
      _ = o(r(65)),
      S = o(r(66)),
      O = r(22),
      A = r(67);
    function x(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      /*!
       * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       */
      return function () {
        var r,
          n = (0, l.default)(e);
        if (t) {
          var o = (0, l.default)(this).constructor;
          r = Reflect.construct(n, arguments, o);
        } else r = n.apply(this, arguments);
        return (0, f.default)(this, r);
      };
    }
    var R = function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              u(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              u(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          u((n = n.apply(e, t || [])).next());
        });
      },
      P = function (e, t) {
        var r = {};
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) &&
            t.indexOf(n) < 0 &&
            (r[n] = e[n]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var o = 0;
          for (n = Object.getOwnPropertySymbols(e); o < n.length; o++)
            t.indexOf(n[o]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
              (r[n[o]] = e[n[o]]);
        }
        return r;
      },
      U = r(69);
    function j(e, t) {
      var r = t.cookies || {};
      return (
        void 0 === r.secure && (r.secure = e.features.isHTTPS()),
        void 0 === r.sameSite && (r.sameSite = r.secure ? "none" : "lax"),
        r.secure &&
          !e.features.isHTTPS() &&
          ((0, v.warn)(
            'The current page is not being served with the HTTPS protocol.\nFor security reasons, we strongly recommend using HTTPS.\nIf you cannot use HTTPS, set "cookies.secure" option to false.'
          ),
          (r.secure = !1)),
        "none" !== r.sameSite || r.secure || (r.sameSite = "lax"),
        r
      );
    }
    var C = (function (e) {
      (0, c.default)(r, e);
      var t = x(r);
      function r(e) {
        var n;
        (0, a.default)(this, r),
          ((n = t.call(
            this,
            Object.assign(
              { httpRequestClient: p.default, storageUtil: g.default },
              e
            )
          ))._pending = { handleLogin: !1 }),
          (n.options = Object.assign(n.options, {
            clientId: e.clientId,
            authorizeUrl: (0, v.removeTrailingSlash)(e.authorizeUrl),
            userinfoUrl: (0, v.removeTrailingSlash)(e.userinfoUrl),
            tokenUrl: (0, v.removeTrailingSlash)(e.tokenUrl),
            revokeUrl: (0, v.removeTrailingSlash)(e.revokeUrl),
            logoutUrl: (0, v.removeTrailingSlash)(e.logoutUrl),
            pkce: !1 !== e.pkce,
            redirectUri: (0, v.toAbsoluteUrl)(
              e.redirectUri,
              window.location.origin
            ),
            postLogoutRedirectUri: e.postLogoutRedirectUri,
            responseMode: e.responseMode,
            responseType: e.responseType,
            transformErrorXHR: e.transformErrorXHR,
            cookies: j((0, u.default)(n), e),
            scopes: e.scopes,
            transformAuthState: e.transformAuthState,
            restoreOriginalUri: e.restoreOriginalUri,
          })),
          (n.userAgent = (0, y.getUserAgent)(
            e,
            "okta-auth-js/".concat("4.2.0")
          )),
          e.maxClockSkew || 0 === e.maxClockSkew
            ? (n.options.maxClockSkew = e.maxClockSkew)
            : (n.options.maxClockSkew = m.DEFAULT_MAX_CLOCK_SKEW),
          (n.options.ignoreSignature = !!e.ignoreSignature),
          (n.session = {
            close: k.closeSession.bind(null, (0, u.default)(n)),
            exists: k.sessionExists.bind(null, (0, u.default)(n)),
            get: k.getSession.bind(null, (0, u.default)(n)),
            refresh: k.refreshSession.bind(null, (0, u.default)(n)),
            setCookieAndRedirect: k.setCookieAndRedirect.bind(
              null,
              (0, u.default)(n)
            ),
          }),
          (n._tokenQueue = new _.default()),
          (n.token = {
            getWithoutPrompt: T.getWithoutPrompt.bind(null, (0, u.default)(n)),
            getWithPopup: T.getWithPopup.bind(null, (0, u.default)(n)),
            getWithRedirect: T.getWithRedirect.bind(null, (0, u.default)(n)),
            parseFromUrl: T.parseFromUrl.bind(null, (0, u.default)(n)),
            decode: T.decodeToken,
            revoke: T.revokeToken.bind(null, (0, u.default)(n)),
            renew: T.renewToken.bind(null, (0, u.default)(n)),
            renewTokens: T.renewTokens.bind(null, (0, u.default)(n)),
            getUserInfo: T.getUserInfo.bind(null, (0, u.default)(n)),
            verify: T.verifyToken.bind(null, (0, u.default)(n)),
            isLoginRedirect: b.isLoginRedirect.bind(null, (0, u.default)(n)),
          });
        var o = ["decode", "isLoginRedirect"];
        return (
          Object.keys(n.token).forEach(function (e) {
            if (!(o.indexOf(e) >= 0)) {
              var t = n.token[e];
              n.token[e] = _.default.prototype.push.bind(
                n._tokenQueue,
                t,
                null
              );
            }
          }),
          Object.assign(n.token.getWithRedirect, {
            _setLocation: function (e) {
              window.location = e;
            },
          }),
          Object.assign(n.token.parseFromUrl, {
            _getHistory: function () {
              return window.history;
            },
            _getLocation: function () {
              return window.location;
            },
            _getDocument: function () {
              return window.document;
            },
          }),
          (n.fingerprint = S.default.bind(null, (0, u.default)(n))),
          (n.emitter = new U()),
          (n.tokenManager = new w.TokenManager(
            (0, u.default)(n),
            e.tokenManager
          )),
          (n.authStateManager = new A.AuthStateManager((0, u.default)(n))),
          n
        );
      }
      return (
        (0, s.default)(r, [
          {
            key: "signIn",
            value: function (e) {
              return (
                this.features.isLocalhost() &&
                  (0, v.deprecate)(
                    "This method has been deprecated, please use signInWithCredentials() instead."
                  ),
                this.signInWithCredentials(e)
              );
            },
          },
          {
            key: "signInWithCredentials",
            value: function (e) {
              var t = this;
              e = (0, v.clone)(e || {});
              var r = function (r) {
                return (
                  delete e.sendFingerprint,
                  (0, O.postToTransaction)(t, "/api/v1/authn", e, r)
                );
              };
              return e.sendFingerprint
                ? this.fingerprint().then(function (e) {
                    return r({ headers: { "X-Device-Fingerprint": e } });
                  })
                : r();
            },
          },
          {
            key: "signInWithRedirect",
            value: function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                t = e.originalUri,
                r = P(e, ["originalUri"]);
              return R(
                this,
                void 0,
                void 0,
                i.default.mark(function e() {
                  var n;
                  return i.default.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this._pending.handleLogin) {
                              e.next = 2;
                              break;
                            }
                            return e.abrupt("return");
                          case 2:
                            return (
                              (this._pending.handleLogin = !0),
                              (e.prev = 3),
                              t && this.setOriginalUri(t),
                              (n = Object.assign(
                                {
                                  scopes: this.options.scopes || [
                                    "openid",
                                    "email",
                                    "profile",
                                  ],
                                },
                                r
                              )),
                              (e.next = 8),
                              this.token.getWithRedirect(n)
                            );
                          case 8:
                            return (
                              (e.prev = 8),
                              (this._pending.handleLogin = !1),
                              e.finish(8)
                            );
                          case 11:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[3, , 8, 11]]
                  );
                })
              );
            },
          },
          {
            key: "closeSession",
            value: function () {
              return (
                this.tokenManager.clear(),
                this.session.close().catch(function (e) {
                  if ("AuthApiError" !== e.name || "E0000007" !== e.errorCode)
                    throw e;
                })
              );
            },
          },
          {
            key: "revokeAccessToken",
            value: function (e) {
              return R(
                this,
                void 0,
                void 0,
                i.default.mark(function t() {
                  var r;
                  return i.default.wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (e) {
                              t.next = 6;
                              break;
                            }
                            return (t.next = 3), this.tokenManager.getTokens();
                          case 3:
                            (e = t.sent.accessToken),
                              (r = this.tokenManager._getStorageKeyByType(
                                "accessToken"
                              )),
                              this.tokenManager.remove(r);
                          case 6:
                            if (e) {
                              t.next = 8;
                              break;
                            }
                            return t.abrupt("return", Promise.resolve());
                          case 8:
                            return t.abrupt("return", this.token.revoke(e));
                          case 9:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this
                  );
                })
              );
            },
          },
          {
            key: "revokeRefreshToken",
            value: function (e) {
              return R(
                this,
                void 0,
                void 0,
                i.default.mark(function t() {
                  var r;
                  return i.default.wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (e) {
                              t.next = 6;
                              break;
                            }
                            return (t.next = 3), this.tokenManager.getTokens();
                          case 3:
                            (e = t.sent.refreshToken),
                              (r = this.tokenManager._getStorageKeyByType(
                                "refreshToken"
                              )),
                              this.tokenManager.remove(r);
                          case 6:
                            if (e) {
                              t.next = 8;
                              break;
                            }
                            return t.abrupt("return", Promise.resolve());
                          case 8:
                            return t.abrupt("return", this.token.revoke(e));
                          case 9:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this
                  );
                })
              );
            },
          },
          {
            key: "signOut",
            value: function (e) {
              return R(
                this,
                void 0,
                void 0,
                i.default.mark(function t() {
                  var r, n, o, a, s, u, c, f, l, d, h;
                  return i.default.wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              ((e = Object.assign({}, e)),
                              (r = window.location.origin),
                              (n = window.location.href),
                              (o =
                                e.postLogoutRedirectUri ||
                                this.options.postLogoutRedirectUri ||
                                r),
                              (a = e.accessToken),
                              (s = e.refreshToken),
                              (u = !1 !== e.revokeAccessToken),
                              (c = e.idToken),
                              (f = (0, b.getOAuthUrls)(this).logoutUrl),
                              void 0 !== c)
                            ) {
                              t.next = 13;
                              break;
                            }
                            return (t.next = 12), this.tokenManager.getTokens();
                          case 12:
                            c = t.sent.idToken;
                          case 13:
                            if (!u || void 0 !== s) {
                              t.next = 17;
                              break;
                            }
                            return (t.next = 16), this.tokenManager.getTokens();
                          case 16:
                            s = t.sent.refreshToken;
                          case 17:
                            if (!u || void 0 !== a) {
                              t.next = 21;
                              break;
                            }
                            return (t.next = 20), this.tokenManager.getTokens();
                          case 20:
                            a = t.sent.accessToken;
                          case 21:
                            if ((this.tokenManager.clear(), !u || !s)) {
                              t.next = 25;
                              break;
                            }
                            return (t.next = 25), this.revokeRefreshToken(s);
                          case 25:
                            if (!u || !a) {
                              t.next = 28;
                              break;
                            }
                            return (t.next = 28), this.revokeAccessToken(a);
                          case 28:
                            if (c) {
                              t.next = 30;
                              break;
                            }
                            return t.abrupt(
                              "return",
                              this.closeSession().then(function () {
                                o === n
                                  ? window.location.reload()
                                  : window.location.assign(o);
                              })
                            );
                          case 30:
                            (l = e.state),
                              (d = c.idToken),
                              (h =
                                f +
                                "?id_token_hint=" +
                                encodeURIComponent(d) +
                                "&post_logout_redirect_uri=" +
                                encodeURIComponent(o)),
                              l && (h += "&state=" + encodeURIComponent(l)),
                              window.location.assign(h);
                          case 35:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this
                  );
                })
              );
            },
          },
          {
            key: "webfinger",
            value: function (e) {
              var t = "/.well-known/webfinger" + (0, v.toQueryString)(e);
              return E.default.get(this, t, {
                headers: { Accept: "application/jrd+json" },
              });
            },
          },
          {
            key: "isAuthenticated",
            value: function (e) {
              return R(
                this,
                void 0,
                void 0,
                i.default.mark(function t() {
                  var r,
                    n,
                    o,
                    a,
                    s = this;
                  return i.default.wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              (r = this.authStateManager.getAuthState())
                                .isPending
                            ) {
                              t.next = 3;
                              break;
                            }
                            return t.abrupt(
                              "return",
                              Promise.resolve(r.isAuthenticated)
                            );
                          case 3:
                            return t.abrupt(
                              "return",
                              new Promise(function (t) {
                                (n = function () {
                                  s.authStateManager.unsubscribe(o),
                                    clearTimeout(a);
                                }),
                                  (o = function (e) {
                                    var r = e.isAuthenticated;
                                    e.isPending || (t(r), n());
                                  }),
                                  (a = setTimeout(function () {
                                    t(!1), n();
                                  }, e || 6e4)),
                                  s.authStateManager.subscribe(o),
                                  s.authStateManager.updateAuthState();
                              })
                            );
                          case 4:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this
                  );
                })
              );
            },
          },
          {
            key: "getUser",
            value: function () {
              return R(
                this,
                void 0,
                void 0,
                i.default.mark(function e() {
                  var t, r, n;
                  return i.default.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (t = this.authStateManager.getAuthState()),
                              (r = t.idToken),
                              (n = t.accessToken),
                              e.abrupt("return", this.token.getUserInfo(n, r))
                            );
                          case 2:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
            },
          },
          {
            key: "getIdToken",
            value: function () {
              var e = this.authStateManager.getAuthState().idToken;
              return e ? e.idToken : void 0;
            },
          },
          {
            key: "getAccessToken",
            value: function () {
              var e = this.authStateManager.getAuthState().accessToken;
              return e ? e.accessToken : void 0;
            },
          },
          {
            key: "getRefreshToken",
            value: function () {
              var e = this.authStateManager.getAuthState().refreshToken;
              return e ? e.refreshToken : void 0;
            },
          },
          {
            key: "storeTokensFromRedirect",
            value: function () {
              return R(
                this,
                void 0,
                void 0,
                i.default.mark(function e() {
                  var t, r;
                  return i.default.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), this.token.parseFromUrl();
                          case 2:
                            (t = e.sent),
                              (r = t.tokens),
                              this.tokenManager.setTokens(r);
                          case 5:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
            },
          },
          {
            key: "setOriginalUri",
            value: function (e) {
              (e = e || window.location.href),
                g.default
                  .getSessionStorage()
                  .setItem(m.REFERRER_PATH_STORAGE_KEY, e);
            },
          },
          {
            key: "getOriginalUri",
            value: function () {
              return (
                g.default
                  .getSessionStorage()
                  .getItem(m.REFERRER_PATH_STORAGE_KEY) ||
                window.location.origin
              );
            },
          },
          {
            key: "removeOriginalUri",
            value: function () {
              g.default
                .getSessionStorage()
                .removeItem(m.REFERRER_PATH_STORAGE_KEY);
            },
          },
          {
            key: "isLoginRedirect",
            value: function () {
              return (0, b.isLoginRedirect)(this);
            },
          },
          {
            key: "handleLoginRedirect",
            value: function (e) {
              return R(
                this,
                void 0,
                void 0,
                i.default.mark(function t() {
                  var r,
                    n = this;
                  return i.default.wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              ((r = function e(t) {
                                var r = t.isPending;
                                return R(
                                  n,
                                  void 0,
                                  void 0,
                                  i.default.mark(function t() {
                                    var n, o;
                                    return i.default.wrap(
                                      function (t) {
                                        for (;;)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              if (!r) {
                                                t.next = 2;
                                                break;
                                              }
                                              return t.abrupt("return");
                                            case 2:
                                              if (
                                                (this.authStateManager.unsubscribe(
                                                  e
                                                ),
                                                (n = this.getOriginalUri()),
                                                this.removeOriginalUri(),
                                                !(o = this.options
                                                  .restoreOriginalUri))
                                              ) {
                                                t.next = 11;
                                                break;
                                              }
                                              return (t.next = 9), o(this, n);
                                            case 9:
                                              t.next = 12;
                                              break;
                                            case 11:
                                              window.location.replace(n);
                                            case 12:
                                            case "end":
                                              return t.stop();
                                          }
                                      },
                                      t,
                                      this
                                    );
                                  })
                                );
                              }),
                              this.authStateManager.subscribe(r),
                              !e)
                            ) {
                              t.next = 6;
                              break;
                            }
                            this.tokenManager.setTokens(e), (t.next = 12);
                            break;
                          case 6:
                            if (!this.isLoginRedirect()) {
                              t.next = 11;
                              break;
                            }
                            return (t.next = 9), this.storeTokensFromRedirect();
                          case 9:
                            t.next = 12;
                            break;
                          case 11:
                            this.authStateManager.unsubscribe(r);
                          case 12:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this
                  );
                })
              );
            },
          },
          {
            key: "isPKCE",
            value: function () {
              return !!this.options.pkce;
            },
          },
          {
            key: "hasResponseType",
            value: function (e) {
              var t = !1;
              return (
                (t =
                  Array.isArray(this.options.responseType) &&
                  this.options.responseType.length
                    ? this.options.responseType.indexOf(e) >= 0
                    : this.options.responseType === e),
                t
              );
            },
          },
          {
            key: "isAuthorizationCodeFlow",
            value: function () {
              return this.hasResponseType("code");
            },
          },
        ]),
        r
      );
    })(d.default);
    C.features = C.prototype.features = h;
    var M = C;
    (t.default = M), (e.exports = t.default);
  },
  function (e, t, r) {
    var n = (function (e) {
      "use strict";
      var t = Object.prototype,
        r = t.hasOwnProperty,
        n = "function" == typeof Symbol ? Symbol : {},
        o = n.iterator || "@@iterator",
        i = n.asyncIterator || "@@asyncIterator",
        a = n.toStringTag || "@@toStringTag";
      function s(e, t, r, n) {
        var o = t && t.prototype instanceof f ? t : f,
          i = Object.create(o.prototype),
          a = new b(n || []);
        return (
          (i._invoke = (function (e, t, r) {
            var n = "suspendedStart";
            return function (o, i) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === o) throw i;
                return _();
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate;
                if (a) {
                  var s = k(a, r);
                  if (s) {
                    if (s === c) continue;
                    return s;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var f = u(e, t, r);
                if ("normal" === f.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), f.arg === c)
                  )
                    continue;
                  return { value: f.arg, done: r.done };
                }
                "throw" === f.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = f.arg));
              }
            };
          })(e, r, a)),
          i
        );
      }
      function u(e, t, r) {
        try {
          return { type: "normal", arg: e.call(t, r) };
        } catch (e) {
          return { type: "throw", arg: e };
        }
      }
      e.wrap = s;
      var c = {};
      function f() {}
      function l() {}
      function d() {}
      var h = {};
      h[o] = function () {
        return this;
      };
      var p = Object.getPrototypeOf,
        g = p && p(p(E([])));
      g && g !== t && r.call(g, o) && (h = g);
      var v = (d.prototype = f.prototype = Object.create(h));
      function y(e) {
        ["next", "throw", "return"].forEach(function (t) {
          e[t] = function (e) {
            return this._invoke(t, e);
          };
        });
      }
      function m(e, t) {
        var n;
        this._invoke = function (o, i) {
          function a() {
            return new t(function (n, a) {
              !(function n(o, i, a, s) {
                var c = u(e[o], e, i);
                if ("throw" !== c.type) {
                  var f = c.arg,
                    l = f.value;
                  return l && "object" == typeof l && r.call(l, "__await")
                    ? t.resolve(l.__await).then(
                        function (e) {
                          n("next", e, a, s);
                        },
                        function (e) {
                          n("throw", e, a, s);
                        }
                      )
                    : t.resolve(l).then(
                        function (e) {
                          (f.value = e), a(f);
                        },
                        function (e) {
                          return n("throw", e, a, s);
                        }
                      );
                }
                s(c.arg);
              })(o, i, n, a);
            });
          }
          return (n = n ? n.then(a, a) : a());
        };
      }
      function k(e, t) {
        var r = e.iterator[t.method];
        if (void 0 === r) {
          if (((t.delegate = null), "throw" === t.method)) {
            if (
              e.iterator.return &&
              ((t.method = "return"),
              (t.arg = void 0),
              k(e, t),
              "throw" === t.method)
            )
              return c;
            (t.method = "throw"),
              (t.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return c;
        }
        var n = u(r, e.iterator, t.arg);
        if ("throw" === n.type)
          return (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), c;
        var o = n.arg;
        return o
          ? o.done
            ? ((t[e.resultName] = o.value),
              (t.next = e.nextLoc),
              "return" !== t.method && ((t.method = "next"), (t.arg = void 0)),
              (t.delegate = null),
              c)
            : o
          : ((t.method = "throw"),
            (t.arg = new TypeError("iterator result is not an object")),
            (t.delegate = null),
            c);
      }
      function T(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t);
      }
      function w(e) {
        var t = e.completion || {};
        (t.type = "normal"), delete t.arg, (e.completion = t);
      }
      function b(e) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          e.forEach(T, this),
          this.reset(!0);
      }
      function E(e) {
        if (e) {
          var t = e[o];
          if (t) return t.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var n = -1,
              i = function t() {
                for (; ++n < e.length; )
                  if (r.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                return (t.value = void 0), (t.done = !0), t;
              };
            return (i.next = i);
          }
        }
        return { next: _ };
      }
      function _() {
        return { value: void 0, done: !0 };
      }
      return (
        (l.prototype = v.constructor = d),
        (d.constructor = l),
        (d[a] = l.displayName = "GeneratorFunction"),
        (e.isGeneratorFunction = function (e) {
          var t = "function" == typeof e && e.constructor;
          return (
            !!t &&
            (t === l || "GeneratorFunction" === (t.displayName || t.name))
          );
        }),
        (e.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, d)
              : ((e.__proto__ = d), a in e || (e[a] = "GeneratorFunction")),
            (e.prototype = Object.create(v)),
            e
          );
        }),
        (e.awrap = function (e) {
          return { __await: e };
        }),
        y(m.prototype),
        (m.prototype[i] = function () {
          return this;
        }),
        (e.AsyncIterator = m),
        (e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new m(s(t, r, n, o), i);
          return e.isGeneratorFunction(r)
            ? a
            : a.next().then(function (e) {
                return e.done ? e.value : a.next();
              });
        }),
        y(v),
        (v[a] = "Generator"),
        (v[o] = function () {
          return this;
        }),
        (v.toString = function () {
          return "[object Generator]";
        }),
        (e.keys = function (e) {
          var t = [];
          for (var r in e) t.push(r);
          return (
            t.reverse(),
            function r() {
              for (; t.length; ) {
                var n = t.pop();
                if (n in e) return (r.value = n), (r.done = !1), r;
              }
              return (r.done = !0), r;
            }
          );
        }),
        (e.values = E),
        (b.prototype = {
          constructor: b,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = void 0),
              this.tryEntries.forEach(w),
              !e)
            )
              for (var t in this)
                "t" === t.charAt(0) &&
                  r.call(this, t) &&
                  !isNaN(+t.slice(1)) &&
                  (this[t] = void 0);
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ("throw" === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var t = this;
            function n(r, n) {
              return (
                (a.type = "throw"),
                (a.arg = e),
                (t.next = r),
                n && ((t.method = "next"), (t.arg = void 0)),
                !!n
              );
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var i = this.tryEntries[o],
                a = i.completion;
              if ("root" === i.tryLoc) return n("end");
              if (i.tryLoc <= this.prev) {
                var s = r.call(i, "catchLoc"),
                  u = r.call(i, "finallyLoc");
                if (s && u) {
                  if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                  if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                } else if (s) {
                  if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                } else {
                  if (!u)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var o = this.tryEntries[n];
              if (
                o.tryLoc <= this.prev &&
                r.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var i = o;
                break;
              }
            }
            i &&
              ("break" === e || "continue" === e) &&
              i.tryLoc <= t &&
              t <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = e),
              (a.arg = t),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), c)
                : this.complete(a)
            );
          },
          complete: function (e, t) {
            if ("throw" === e.type) throw e.arg;
            return (
              "break" === e.type || "continue" === e.type
                ? (this.next = e.arg)
                : "return" === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === e.type && t && (this.next = t),
              c
            );
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.finallyLoc === e)
                return this.complete(r.completion, r.afterLoc), w(r), c;
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.tryLoc === e) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  w(r);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (e, t, r) {
            return (
              (this.delegate = { iterator: E(e), resultName: t, nextLoc: r }),
              "next" === this.method && (this.arg = void 0),
              c
            );
          },
        }),
        e
      );
    })(e.exports);
    try {
      regeneratorRuntime = n;
    } catch (e) {
      Function("r", "regeneratorRuntime = r")(n);
    }
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(1)),
      i = n(r(9)),
      a = r(20),
      s = r(2),
      u = r(22),
      c = (function () {
        function e(t) {
          var r = this;
          (0, o.default)(this, e),
            (0, a.assertValidConfig)(t),
            (this.options = {
              issuer: (0, s.removeTrailingSlash)(t.issuer),
              httpRequestClient: t.httpRequestClient,
              transformErrorXHR: t.transformErrorXHR,
              storageUtil: t.storageUtil,
              headers: t.headers,
              devMode: t.devMode || !1,
            }),
            (this.tx = {
              status: u.transactionStatus.bind(null, this),
              resume: u.resumeTransaction.bind(null, this),
              exists: Object.assign(u.transactionExists.bind(null, this), {
                _get: function (e) {
                  return r.options.storageUtil.storage.get(e);
                },
              }),
              introspect: u.introspect.bind(null, this),
            });
        }
        return (
          (0, i.default)(e, [
            {
              key: "signIn",
              value: function (e) {
                return (0, u.postToTransaction)(this, "/api/v1/authn", e);
              },
            },
            {
              key: "getIssuerOrigin",
              value: function () {
                return this.options.issuer.split("/oauth2/")[0];
              },
            },
            {
              key: "forgotPassword",
              value: function (e) {
                return (0, u.postToTransaction)(
                  this,
                  "/api/v1/authn/recovery/password",
                  e
                );
              },
            },
            {
              key: "unlockAccount",
              value: function (e) {
                return (0, u.postToTransaction)(
                  this,
                  "/api/v1/authn/recovery/unlock",
                  e
                );
              },
            },
            {
              key: "verifyRecoveryToken",
              value: function (e) {
                return (0, u.postToTransaction)(
                  this,
                  "/api/v1/authn/recovery/token",
                  e
                );
              },
            },
          ]),
          e
        );
      })();
    (t.default = c), (e.exports = t.default);
  },
  function (e, t) {
    e.exports = function (e) {
      return -1 !== Function.toString.call(e).indexOf("[native code]");
    };
  },
  function (e, t, r) {
    var n = r(15),
      o = r(38);
    function i(t, r, a) {
      return (
        o()
          ? (e.exports = i = Reflect.construct)
          : (e.exports = i = function (e, t, r) {
              var o = [null];
              o.push.apply(o, t);
              var i = new (Function.bind.apply(e, o))();
              return r && n(i, r.prototype), i;
            }),
        i.apply(null, arguments)
      );
    }
    e.exports = i;
  },
  function (e, t) {
    e.exports = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    };
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.TransactionState = void 0;
    var o = n(r(1));
    t.TransactionState = function e() {
      (0, o.default)(this, e);
    };
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(10)),
      i = n(r(41));
    var a = function (e, t, r) {
      var n = r.data,
        a = r.headers || {};
      return (
        "application/json" === (a["Content-Type"] || a["content-type"] || "") &&
          n &&
          "string" != typeof n &&
          (n = JSON.stringify(n)),
        (0, i.default)(t, {
          method: e,
          headers: r.headers,
          body: n,
          credentials: r.withCredentials ? "include" : "omit",
        }).then(function (e) {
          var t = !e.ok,
            r = e.status;
          /*!
           * Copyright (c) 2018-present, Okta, Inc. and/or its affiliates. All rights reserved.
           * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
           *
           * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
           * Unless required by applicable law or agreed to in writing, software
           * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
           * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
           *
           * See the License for the specific language governing permissions and limitations under the License.
           */
          return (function (e) {
            return e.headers.get("Content-Type") &&
              e.headers
                .get("Content-Type")
                .toLowerCase()
                .indexOf("application/json") >= 0
              ? e.json().catch(function (e) {
                  return {
                    error: e,
                    errorSummary: "Could not parse server response",
                  };
                })
              : e.text();
          })(e)
            .then(function (e) {
              return (function (e, t) {
                var r = "object" === (0, o.default)(t),
                  n = { responseText: r ? JSON.stringify(t) : t, status: e };
                return (
                  r && ((n.responseType = "json"), (n.responseJSON = t)), n
                );
              })(r, e);
            })
            .then(function (e) {
              if (t) throw e;
              return e;
            });
        })
      );
    };
    (t.default = a), (e.exports = t.default);
  },
  function (e, t) {
    var r = (function (e) {
      function t() {
        (this.fetch = !1), (this.DOMException = e.DOMException);
      }
      return (t.prototype = e), new t();
    })("undefined" != typeof self ? self : this);
    !(function (e) {
      !(function (t) {
        var r = "URLSearchParams" in e,
          n = "Symbol" in e && "iterator" in Symbol,
          o =
            "FileReader" in e &&
            "Blob" in e &&
            (function () {
              try {
                return new Blob(), !0;
              } catch (e) {
                return !1;
              }
            })(),
          i = "FormData" in e,
          a = "ArrayBuffer" in e;
        if (a)
          var s = [
              "[object Int8Array]",
              "[object Uint8Array]",
              "[object Uint8ClampedArray]",
              "[object Int16Array]",
              "[object Uint16Array]",
              "[object Int32Array]",
              "[object Uint32Array]",
              "[object Float32Array]",
              "[object Float64Array]",
            ],
            u =
              ArrayBuffer.isView ||
              function (e) {
                return e && s.indexOf(Object.prototype.toString.call(e)) > -1;
              };
        function c(e) {
          if (
            ("string" != typeof e && (e = String(e)),
            /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))
          )
            throw new TypeError("Invalid character in header field name");
          return e.toLowerCase();
        }
        function f(e) {
          return "string" != typeof e && (e = String(e)), e;
        }
        function l(e) {
          var t = {
            next: function () {
              var t = e.shift();
              return { done: void 0 === t, value: t };
            },
          };
          return (
            n &&
              (t[Symbol.iterator] = function () {
                return t;
              }),
            t
          );
        }
        function d(e) {
          (this.map = {}),
            e instanceof d
              ? e.forEach(function (e, t) {
                  this.append(t, e);
                }, this)
              : Array.isArray(e)
              ? e.forEach(function (e) {
                  this.append(e[0], e[1]);
                }, this)
              : e &&
                Object.getOwnPropertyNames(e).forEach(function (t) {
                  this.append(t, e[t]);
                }, this);
        }
        function h(e) {
          if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
          e.bodyUsed = !0;
        }
        function p(e) {
          return new Promise(function (t, r) {
            (e.onload = function () {
              t(e.result);
            }),
              (e.onerror = function () {
                r(e.error);
              });
          });
        }
        function g(e) {
          var t = new FileReader(),
            r = p(t);
          return t.readAsArrayBuffer(e), r;
        }
        function v(e) {
          if (e.slice) return e.slice(0);
          var t = new Uint8Array(e.byteLength);
          return t.set(new Uint8Array(e)), t.buffer;
        }
        function y() {
          return (
            (this.bodyUsed = !1),
            (this._initBody = function (e) {
              var t;
              (this._bodyInit = e),
                e
                  ? "string" == typeof e
                    ? (this._bodyText = e)
                    : o && Blob.prototype.isPrototypeOf(e)
                    ? (this._bodyBlob = e)
                    : i && FormData.prototype.isPrototypeOf(e)
                    ? (this._bodyFormData = e)
                    : r && URLSearchParams.prototype.isPrototypeOf(e)
                    ? (this._bodyText = e.toString())
                    : a && o && (t = e) && DataView.prototype.isPrototypeOf(t)
                    ? ((this._bodyArrayBuffer = v(e.buffer)),
                      (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                    : a && (ArrayBuffer.prototype.isPrototypeOf(e) || u(e))
                    ? (this._bodyArrayBuffer = v(e))
                    : (this._bodyText = e = Object.prototype.toString.call(e))
                  : (this._bodyText = ""),
                this.headers.get("content-type") ||
                  ("string" == typeof e
                    ? this.headers.set(
                        "content-type",
                        "text/plain;charset=UTF-8"
                      )
                    : this._bodyBlob && this._bodyBlob.type
                    ? this.headers.set("content-type", this._bodyBlob.type)
                    : r &&
                      URLSearchParams.prototype.isPrototypeOf(e) &&
                      this.headers.set(
                        "content-type",
                        "application/x-www-form-urlencoded;charset=UTF-8"
                      ));
            }),
            o &&
              ((this.blob = function () {
                var e = h(this);
                if (e) return e;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer)
                  return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData)
                  throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]));
              }),
              (this.arrayBuffer = function () {
                return this._bodyArrayBuffer
                  ? h(this) || Promise.resolve(this._bodyArrayBuffer)
                  : this.blob().then(g);
              })),
            (this.text = function () {
              var e,
                t,
                r,
                n = h(this);
              if (n) return n;
              if (this._bodyBlob)
                return (
                  (e = this._bodyBlob),
                  (t = new FileReader()),
                  (r = p(t)),
                  t.readAsText(e),
                  r
                );
              if (this._bodyArrayBuffer)
                return Promise.resolve(
                  (function (e) {
                    for (
                      var t = new Uint8Array(e), r = new Array(t.length), n = 0;
                      n < t.length;
                      n++
                    )
                      r[n] = String.fromCharCode(t[n]);
                    return r.join("");
                  })(this._bodyArrayBuffer)
                );
              if (this._bodyFormData)
                throw new Error("could not read FormData body as text");
              return Promise.resolve(this._bodyText);
            }),
            i &&
              (this.formData = function () {
                return this.text().then(T);
              }),
            (this.json = function () {
              return this.text().then(JSON.parse);
            }),
            this
          );
        }
        (d.prototype.append = function (e, t) {
          (e = c(e)), (t = f(t));
          var r = this.map[e];
          this.map[e] = r ? r + ", " + t : t;
        }),
          (d.prototype.delete = function (e) {
            delete this.map[c(e)];
          }),
          (d.prototype.get = function (e) {
            return (e = c(e)), this.has(e) ? this.map[e] : null;
          }),
          (d.prototype.has = function (e) {
            return this.map.hasOwnProperty(c(e));
          }),
          (d.prototype.set = function (e, t) {
            this.map[c(e)] = f(t);
          }),
          (d.prototype.forEach = function (e, t) {
            for (var r in this.map)
              this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
          }),
          (d.prototype.keys = function () {
            var e = [];
            return (
              this.forEach(function (t, r) {
                e.push(r);
              }),
              l(e)
            );
          }),
          (d.prototype.values = function () {
            var e = [];
            return (
              this.forEach(function (t) {
                e.push(t);
              }),
              l(e)
            );
          }),
          (d.prototype.entries = function () {
            var e = [];
            return (
              this.forEach(function (t, r) {
                e.push([r, t]);
              }),
              l(e)
            );
          }),
          n && (d.prototype[Symbol.iterator] = d.prototype.entries);
        var m = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function k(e, t) {
          var r,
            n,
            o = (t = t || {}).body;
          if (e instanceof k) {
            if (e.bodyUsed) throw new TypeError("Already read");
            (this.url = e.url),
              (this.credentials = e.credentials),
              t.headers || (this.headers = new d(e.headers)),
              (this.method = e.method),
              (this.mode = e.mode),
              (this.signal = e.signal),
              o ||
                null == e._bodyInit ||
                ((o = e._bodyInit), (e.bodyUsed = !0));
          } else this.url = String(e);
          if (
            ((this.credentials =
              t.credentials || this.credentials || "same-origin"),
            (!t.headers && this.headers) || (this.headers = new d(t.headers)),
            (this.method =
              ((r = t.method || this.method || "GET"),
              (n = r.toUpperCase()),
              m.indexOf(n) > -1 ? n : r)),
            (this.mode = t.mode || this.mode || null),
            (this.signal = t.signal || this.signal),
            (this.referrer = null),
            ("GET" === this.method || "HEAD" === this.method) && o)
          )
            throw new TypeError("Body not allowed for GET or HEAD requests");
          this._initBody(o);
        }
        function T(e) {
          var t = new FormData();
          return (
            e
              .trim()
              .split("&")
              .forEach(function (e) {
                if (e) {
                  var r = e.split("="),
                    n = r.shift().replace(/\+/g, " "),
                    o = r.join("=").replace(/\+/g, " ");
                  t.append(decodeURIComponent(n), decodeURIComponent(o));
                }
              }),
            t
          );
        }
        function w(e, t) {
          t || (t = {}),
            (this.type = "default"),
            (this.status = void 0 === t.status ? 200 : t.status),
            (this.ok = this.status >= 200 && this.status < 300),
            (this.statusText = "statusText" in t ? t.statusText : "OK"),
            (this.headers = new d(t.headers)),
            (this.url = t.url || ""),
            this._initBody(e);
        }
        (k.prototype.clone = function () {
          return new k(this, { body: this._bodyInit });
        }),
          y.call(k.prototype),
          y.call(w.prototype),
          (w.prototype.clone = function () {
            return new w(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new d(this.headers),
              url: this.url,
            });
          }),
          (w.error = function () {
            var e = new w(null, { status: 0, statusText: "" });
            return (e.type = "error"), e;
          });
        var b = [301, 302, 303, 307, 308];
        (w.redirect = function (e, t) {
          if (-1 === b.indexOf(t)) throw new RangeError("Invalid status code");
          return new w(null, { status: t, headers: { location: e } });
        }),
          (t.DOMException = e.DOMException);
        try {
          new t.DOMException();
        } catch (e) {
          (t.DOMException = function (e, t) {
            (this.message = e), (this.name = t);
            var r = Error(e);
            this.stack = r.stack;
          }),
            (t.DOMException.prototype = Object.create(Error.prototype)),
            (t.DOMException.prototype.constructor = t.DOMException);
        }
        function E(e, r) {
          return new Promise(function (n, i) {
            var a = new k(e, r);
            if (a.signal && a.signal.aborted)
              return i(new t.DOMException("Aborted", "AbortError"));
            var s = new XMLHttpRequest();
            function u() {
              s.abort();
            }
            (s.onload = function () {
              var e,
                t,
                r = {
                  status: s.status,
                  statusText: s.statusText,
                  headers:
                    ((e = s.getAllResponseHeaders() || ""),
                    (t = new d()),
                    e
                      .replace(/\r?\n[\t ]+/g, " ")
                      .split(/\r?\n/)
                      .forEach(function (e) {
                        var r = e.split(":"),
                          n = r.shift().trim();
                        if (n) {
                          var o = r.join(":").trim();
                          t.append(n, o);
                        }
                      }),
                    t),
                };
              r.url =
                "responseURL" in s
                  ? s.responseURL
                  : r.headers.get("X-Request-URL");
              var o = "response" in s ? s.response : s.responseText;
              n(new w(o, r));
            }),
              (s.onerror = function () {
                i(new TypeError("Network request failed"));
              }),
              (s.ontimeout = function () {
                i(new TypeError("Network request failed"));
              }),
              (s.onabort = function () {
                i(new t.DOMException("Aborted", "AbortError"));
              }),
              s.open(a.method, a.url, !0),
              "include" === a.credentials
                ? (s.withCredentials = !0)
                : "omit" === a.credentials && (s.withCredentials = !1),
              "responseType" in s && o && (s.responseType = "blob"),
              a.headers.forEach(function (e, t) {
                s.setRequestHeader(t, e);
              }),
              a.signal &&
                (a.signal.addEventListener("abort", u),
                (s.onreadystatechange = function () {
                  4 === s.readyState &&
                    a.signal.removeEventListener("abort", u);
                })),
              s.send(void 0 === a._bodyInit ? null : a._bodyInit);
          });
        }
        (E.polyfill = !0),
          e.fetch ||
            ((e.fetch = E), (e.Headers = d), (e.Request = k), (e.Response = w)),
          (t.Headers = d),
          (t.Request = k),
          (t.Response = w),
          (t.fetch = E);
      })({});
    })(r),
      delete r.fetch.polyfill,
      ((t = r.fetch).default = r.fetch),
      (t.fetch = r.fetch),
      (t.Headers = r.Headers),
      (t.Request = r.Request),
      (t.Response = r.Response),
      (e.exports = t);
  },
  function (e, t, r) {
    var n, o;
    /*!
     * JavaScript Cookie v2.2.0
     * https://github.com/js-cookie/js-cookie
     *
     * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
     * Released under the MIT license
     */ !(function (i) {
      if (
        (void 0 ===
          (o = "function" == typeof (n = i) ? n.call(t, r, t, e) : n) ||
          (e.exports = o),
        !0,
        (e.exports = i()),
        !!0)
      ) {
        var a = window.Cookies,
          s = (window.Cookies = i());
        s.noConflict = function () {
          return (window.Cookies = a), s;
        };
      }
    })(function () {
      function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
          var r = arguments[e];
          for (var n in r) t[n] = r[n];
        }
        return t;
      }
      return (function t(r) {
        function n(t, o, i) {
          var a;
          if ("undefined" != typeof document) {
            if (arguments.length > 1) {
              if (
                "number" == typeof (i = e({ path: "/" }, n.defaults, i)).expires
              ) {
                var s = new Date();
                s.setMilliseconds(s.getMilliseconds() + 864e5 * i.expires),
                  (i.expires = s);
              }
              i.expires = i.expires ? i.expires.toUTCString() : "";
              try {
                (a = JSON.stringify(o)), /^[\{\[]/.test(a) && (o = a);
              } catch (e) {}
              (o = r.write
                ? r.write(o, t)
                : encodeURIComponent(String(o)).replace(
                    /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                    decodeURIComponent
                  )),
                (t = (t = (t = encodeURIComponent(String(t))).replace(
                  /%(23|24|26|2B|5E|60|7C)/g,
                  decodeURIComponent
                )).replace(/[\(\)]/g, escape));
              var u = "";
              for (var c in i)
                i[c] && ((u += "; " + c), !0 !== i[c] && (u += "=" + i[c]));
              return (document.cookie = t + "=" + o + u);
            }
            t || (a = {});
            for (
              var f = document.cookie ? document.cookie.split("; ") : [],
                l = /(%[0-9A-Z]{2})+/g,
                d = 0;
              d < f.length;
              d++
            ) {
              var h = f[d].split("="),
                p = h.slice(1).join("=");
              this.json || '"' !== p.charAt(0) || (p = p.slice(1, -1));
              try {
                var g = h[0].replace(l, decodeURIComponent);
                if (
                  ((p = r.read
                    ? r.read(p, g)
                    : r(p, g) || p.replace(l, decodeURIComponent)),
                  this.json)
                )
                  try {
                    p = JSON.parse(p);
                  } catch (e) {}
                if (t === g) {
                  a = p;
                  break;
                }
                t || (a[g] = p);
              } catch (e) {}
            }
            return a;
          }
        }
        return (
          (n.set = n),
          (n.get = function (e) {
            return n.call(n, e);
          }),
          (n.getJSON = function () {
            return n.apply({ json: !0 }, [].slice.call(arguments));
          }),
          (n.defaults = {}),
          (n.remove = function (t, r) {
            n(t, "", e(r, { expires: -1 }));
          }),
          (n.withConverter = t),
          n
        );
      })(function () {});
    });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    (t.sessionExists =
      /*!
       * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       *
       */
      function (e) {
        return e.session
          .get()
          .then(function (e) {
            return "ACTIVE" === e.status;
          })
          .catch(function () {
            return !1;
          });
      }),
      (t.getSession = function (e) {
        return i.default
          .get(e, "/api/v1/sessions/me")
          .then(function (t) {
            var r = (0, o.omit)(t, "_links");
            return (
              (r.refresh = function () {
                return i.default.post(e, (0, o.getLink)(t, "refresh").href);
              }),
              (r.user = function () {
                return i.default.get(e, (0, o.getLink)(t, "user").href);
              }),
              r
            );
          })
          .catch(function () {
            return { status: "INACTIVE" };
          });
      }),
      (t.closeSession = function (e) {
        return i.default.httpRequest(e, {
          url: e.getIssuerOrigin() + "/api/v1/sessions/me",
          method: "DELETE",
        });
      }),
      (t.refreshSession = function (e) {
        return i.default.post(e, "/api/v1/sessions/me/lifecycle/refresh");
      }),
      (t.setCookieAndRedirect = function (e, t, r) {
        (r = r || window.location.href),
          window.location.assign(
            e.getIssuerOrigin() +
              "/login/sessionCookieRedirect" +
              (0, o.toQueryString)({
                checkAccountSetupComplete: !0,
                token: t,
                redirectUrl: r,
              })
          );
      });
    var o = r(2),
      i = n(r(5));
  },
  function (e, t, r) {
    "use strict";
    var n = r(18),
      o = r(0);
    (t.revokeToken = function (e, t) {
      return Promise.resolve().then(function () {
        var r, n;
        if ((t && ((r = t.accessToken), (n = t.refreshToken)), !r && !n))
          throw new l.default(
            "A valid access or refresh token object is required"
          );
        var o = e.options.clientId;
        if (!o)
          throw new l.default(
            "A clientId must be specified in the OktaAuth constructor to revoke a token"
          );
        var i = (0, c.getOAuthUrls)(e).revokeUrl,
          a = (0, u.toQueryString)({
            token_type_hint: n ? "refresh_token" : "access_token",
            token: n || r,
          }).slice(1),
          f = btoa(o);
        return s.default.post(e, i, a, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + f,
          },
        });
      });
    }),
      (t.getToken = S),
      (t.getWithoutPrompt = O),
      (t.getWithPopup = function (e, t) {
        if (arguments.length > 2)
          return Promise.reject(
            new l.default(
              'As of version 3.0, "getWithPopup" takes only a single set of options'
            )
          );
        return (
          (t = (0, u.clone)(t) || {}),
          Object.assign(t, {
            display: "popup",
            responseMode: "okta_post_message",
          }),
          S(e, t)
        );
      }),
      (t.getWithRedirect = function (e, t) {
        if (arguments.length > 2)
          return Promise.reject(
            new l.default(
              'As of version 3.0, "getWithRedirect" takes only a single set of options'
            )
          );
        return (
          (t = (0, u.clone)(t) || {}),
          A(e, t).then(function (r) {
            var n = (0, c.getOAuthUrls)(e, t),
              o = n.authorizeUrl + _(r);
            x(e, r, n),
              m.set(
                h.REDIRECT_NONCE_COOKIE_NAME,
                r.nonce,
                null,
                e.options.cookies
              ),
              m.set(
                h.REDIRECT_STATE_COOKIE_NAME,
                r.state,
                null,
                e.options.cookies
              ),
              e.token.getWithRedirect._setLocation(o);
          })
        );
      }),
      (t.parseFromUrl = function (e, t) {
        (t = t || {}), (t = (0, u.isString)(t) ? { url: t } : t);
        var r,
          n = e.options.pkce ? "query" : "fragment",
          o = t.url,
          i = t.responseMode || e.options.responseMode || n,
          a = e.token.parseFromUrl._getLocation();
        r =
          "query" === i
            ? o
              ? o.substring(o.indexOf("?"))
              : a.search
            : o
            ? o.substring(o.indexOf("#"))
            : a.hash;
        if (!r)
          return Promise.reject(
            new l.default("Unable to parse a token from the url")
          );
        var s = R();
        if (!s)
          return Promise.reject(
            new l.default(
              "Unable to retrieve OAuth redirect params from storage"
            )
          );
        try {
          var f = JSON.parse(s),
            d = f.urls;
          delete f.urls;
        } catch (e) {
          return Promise.reject(
            new l.default(
              "Unable to parse the " +
                h.REDIRECT_OAUTH_PARAMS_NAME +
                " value from storage: " +
                e.message
            )
          );
        }
        return Promise.resolve((0, c.urlParamsToObject)(r)).then(function (t) {
          return (
            o ||
              ("query" === i
                ? (function (e) {
                    var t = e.token.parseFromUrl._getHistory(),
                      r = e.token.parseFromUrl._getDocument(),
                      n = e.token.parseFromUrl._getLocation();
                    t && t.replaceState
                      ? t.replaceState(null, r.title, n.pathname + n.hash)
                      : (n.search = "");
                  })(e)
                : (function (e) {
                    var t = e.token.parseFromUrl._getHistory(),
                      r = e.token.parseFromUrl._getDocument(),
                      n = e.token.parseFromUrl._getLocation();
                    t && t.replaceState
                      ? t.replaceState(null, r.title, n.pathname + n.search)
                      : (n.hash = "");
                  })(e)),
            E(e, f, t, d)
          );
        });
      }),
      (t.decodeToken = k),
      (t.renewToken = function (e, t) {
        if (!(0, v.isToken)(t))
          return Promise.reject(
            new l.default(
              "Renew must be passed a token with an array of scopes and an accessToken or idToken"
            )
          );
        var r;
        r = e.options.pkce
          ? "code"
          : (0, v.isAccessToken)(t)
          ? "token"
          : "id_token";
        var n = t.scopes,
          o = t.authorizeUrl,
          i = t.userinfoUrl,
          a = t.issuer;
        return O(e, {
          responseType: r,
          scopes: n,
          authorizeUrl: o,
          userinfoUrl: i,
          issuer: a,
        }).then(function (e) {
          var r = e.tokens;
          return (0, v.isIDToken)(t) ? r.idToken : r.accessToken;
        });
      }),
      (t.renewTokens = function (e, t) {
        return e.tokenManager
          .getTokens()
          .then(function (e) {
            return e.refreshToken;
          })
          .then(function (r) {
            return r
              ? (function (e, t, r) {
                  return y(
                    this,
                    void 0,
                    void 0,
                    i.default.mark(function n() {
                      var o, u, f;
                      return i.default.wrap(
                        function (n) {
                          for (;;)
                            switch ((n.prev = n.next)) {
                              case 0:
                                if ((o = e.options.clientId)) {
                                  n.next = 3;
                                  break;
                                }
                                throw new l.default(
                                  "A clientId must be specified in the OktaAuth constructor to revoke a token"
                                );
                              case 3:
                                return (
                                  (u = (0, c.getOAuthUrls)(e, t)),
                                  (n.prev = 4),
                                  (n.next = 7),
                                  s.default.httpRequest(e, {
                                    url: r.tokenUrl,
                                    method: "POST",
                                    withCredentials: !1,
                                    headers: {
                                      "Content-Type":
                                        "application/x-www-form-urlencoded",
                                    },
                                    args: Object.entries({
                                      client_id: o,
                                      grant_type: "refresh_token",
                                      scope: r.scopes.join(" "),
                                      refresh_token: r.refreshToken,
                                    })
                                      .map(function (e) {
                                        var t = (0, a.default)(e, 2),
                                          r = t[0],
                                          n = t[1];
                                        return r + "=" + encodeURIComponent(n);
                                      })
                                      .join("&"),
                                  })
                                );
                              case 7:
                                return (
                                  (f = n.sent),
                                  n.abrupt(
                                    "return",
                                    E(e, t, f, u).then(function (e) {
                                      return e.tokens;
                                    })
                                  )
                                );
                              case 11:
                                (n.prev = 11),
                                  (n.t0 = n.catch(4)),
                                  console.log({ err: n.t0 });
                              case 14:
                              case "end":
                                return n.stop();
                            }
                        },
                        n,
                        null,
                        [[4, 11]]
                      );
                    })
                  );
                })(e, t, r)
              : ((t = Object.assign(
                  {
                    scopes: e.options.scopes,
                    authorizeUrl: e.options.authorizeUrl,
                    userinfoUrl: e.options.userinfoUrl,
                    issuer: e.options.issuer,
                  },
                  t
                )),
                e.options.pkce
                  ? (t.responseType = "code")
                  : (t.responseType = ["token", "id_token"]),
                O(e, t).then(function (e) {
                  return e.tokens;
                }));
          });
      }),
      (t.getUserInfo = function (e, t, r) {
        return y(
          this,
          void 0,
          void 0,
          i.default.mark(function n() {
            return i.default.wrap(function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (t) {
                      n.next = 4;
                      break;
                    }
                    return (n.next = 3), e.tokenManager.getTokens();
                  case 3:
                    t = n.sent.accessToken;
                  case 4:
                    if (r) {
                      n.next = 8;
                      break;
                    }
                    return (n.next = 7), e.tokenManager.getTokens();
                  case 7:
                    r = n.sent.idToken;
                  case 8:
                    if (t && (0, v.isAccessToken)(t)) {
                      n.next = 10;
                      break;
                    }
                    return n.abrupt(
                      "return",
                      Promise.reject(
                        new l.default(
                          "getUserInfo requires an access token object"
                        )
                      )
                    );
                  case 10:
                    if (r && (0, v.isIDToken)(r)) {
                      n.next = 12;
                      break;
                    }
                    return n.abrupt(
                      "return",
                      Promise.reject(
                        new l.default("getUserInfo requires an ID token object")
                      )
                    );
                  case 12:
                    return n.abrupt(
                      "return",
                      s.default
                        .httpRequest(e, {
                          url: t.userinfoUrl,
                          method: "GET",
                          accessToken: t.accessToken,
                        })
                        .then(function (e) {
                          return e.sub === r.claims.sub
                            ? e
                            : Promise.reject(
                                new l.default(
                                  "getUserInfo request was rejected due to token mismatch"
                                )
                              );
                        })
                        .catch(function (e) {
                          var t;
                          if (
                            e.xhr &&
                            (401 === e.xhr.status || 403 === e.xhr.status) &&
                            (e.xhr.headers &&
                            (0, u.isFunction)(e.xhr.headers.get) &&
                            e.xhr.headers.get("WWW-Authenticate")
                              ? (t = e.xhr.headers.get("WWW-Authenticate"))
                              : (0, u.isFunction)(e.xhr.getResponseHeader) &&
                                (t = e.xhr.getResponseHeader(
                                  "WWW-Authenticate"
                                )),
                            t)
                          ) {
                            var r = t.match(/error="(.*?)"/) || [],
                              n = t.match(/error_description="(.*?)"/) || [],
                              o = r[1],
                              i = n[1];
                            o && i && (e = new d.default(o, i));
                          }
                          throw e;
                        })
                    );
                  case 13:
                  case "end":
                    return n.stop();
                }
            }, n);
          })
        );
      }),
      (t.verifyToken = T),
      (t.handleOAuthResponse = E),
      (t.prepareTokenParams = A),
      (t._addOAuthParamsToStorage = x),
      (t._getOAuthParamsStrFromStorage = R);
    var i = o(r(19)),
      a = o(r(45)),
      s = o(r(5)),
      u = r(2),
      c = r(17),
      f = n(r(51)),
      l = o(r(3)),
      d = o(r(29)),
      h = r(8),
      p = o(r(13)),
      g = o(r(52)),
      v = r(30),
      y = function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              u(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              u(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          u((n = n.apply(e, t || [])).next());
        });
      },
      m = p.default.storage;
    function k(e) {
      var t,
        r = e.split(".");
      try {
        t = {
          header: JSON.parse((0, u.base64UrlToString)(r[0])),
          payload: JSON.parse((0, u.base64UrlToString)(r[1])),
          signature: r[2],
        };
      } catch (e) {
        throw new l.default("Malformed token");
      }
      return t;
    }
    function T(e, t, r) {
      return Promise.resolve().then(function () {
        if (!t || !t.idToken)
          throw new l.default("Only idTokens may be verified");
        var n = k(t.idToken),
          o = {
            clientId: e.options.clientId,
            issuer: e.options.issuer,
            ignoreSignature: e.options.ignoreSignature,
          };
        return (
          Object.assign(o, r),
          (0, c.validateClaims)(e, n.payload, o),
          1 != o.ignoreSignature && e.features.isTokenVerifySupported()
            ? (0, c.getKey)(e, t.issuer, n.header.kid)
                .then(function (e) {
                  return f.verifyToken(t.idToken, e);
                })
                .then(function (e) {
                  if (!e)
                    throw new l.default("The token signature is not valid");
                  if (r && r.accessToken && t.claims.at_hash)
                    return f.getOidcHash(r.accessToken).then(function (e) {
                      if (e !== t.claims.at_hash)
                        throw new l.default("Token hash verification failed");
                    });
                })
                .then(function () {
                  return t;
                })
            : t
        );
      });
    }
    function w(e, t, r) {
      var n, o;
      return new Promise(function (i, a) {
        (n = function (t) {
          if (t.data && t.data.state === r)
            return t.origin !== e.getIssuerOrigin()
              ? a(
                  new l.default(
                    "The request does not match client configuration"
                  )
                )
              : void i(t.data);
        }),
          (0, c.addListener)(window, "message", n),
          (o = setTimeout(function () {
            a(new l.default("OAuth flow timed out"));
          }, t || 12e4));
      }).finally(function () {
        clearTimeout(o), (0, c.removeListener)(window, "message", n);
      });
    }
    function b(e, t) {
      if (e.error || e.error_description)
        throw new d.default(e.error, e.error_description);
      if (e.state !== t.state)
        throw new l.default(
          "OAuth flow response state doesn't match request state"
        );
    }
    function E(e, t, r, n) {
      n = n || {};
      var o = (t = t || {}).responseType;
      Array.isArray(o) || (o = [o]);
      var i = (0, u.clone)(t.scopes),
        a = t.clientId || e.options.clientId,
        s = !1 !== e.options.pkce;
      return Promise.resolve()
        .then(function () {
          return (
            b(r, t),
            r.code && s
              ? ((o = ["token"]),
                -1 !== i.indexOf("openid") && o.push("id_token"),
                (function (e, t, r, n) {
                  var o = g.default.loadMeta(e),
                    i = {
                      clientId: t.clientId,
                      authorizationCode: r,
                      codeVerifier: o.codeVerifier,
                      redirectUri: o.redirectUri,
                    };
                  return g.default
                    .getToken(e, i, n)
                    .then(function (e) {
                      return b(e, i), e;
                    })
                    .finally(function () {
                      g.default.clearMeta(e);
                    });
                })(e, t, r.code, n))
              : r
          );
        })
        .then(function (r) {
          var o = {},
            s = r.expires_in,
            u = r.token_type,
            c = r.access_token,
            f = r.id_token,
            l = r.refresh_token;
          if (
            (c &&
              (o.accessToken = {
                value: c,
                accessToken: c,
                expiresAt: Number(s) + Math.floor(Date.now() / 1e3),
                tokenType: u,
                scopes: i,
                authorizeUrl: n.authorizeUrl,
                userinfoUrl: n.userinfoUrl,
              }),
            l &&
              (o.refreshToken = {
                value: l,
                refreshToken: l,
                expiresAt: Number(s) + Math.floor(Date.now() / 1e3),
                scopes: i,
                tokenUrl: n.tokenUrl,
                authorizeUrl: n.authorizeUrl,
                issuer: n.issuer,
              }),
            f)
          ) {
            var d = e.token.decode(f),
              h = {
                value: f,
                idToken: f,
                claims: d.payload,
                expiresAt: d.payload.exp,
                scopes: i,
                authorizeUrl: n.authorizeUrl,
                issuer: n.issuer,
                clientId: a,
              },
              p = {
                clientId: a,
                issuer: n.issuer,
                nonce: t.nonce,
                accessToken: c,
              };
            return (
              void 0 !== t.ignoreSignature &&
                (p.ignoreSignature = t.ignoreSignature),
              T(e, h, p).then(function () {
                return (o.idToken = h), o;
              })
            );
          }
          return o;
        })
        .then(function (e) {
          if (-1 !== o.indexOf("token") && !e.accessToken)
            throw new l.default(
              'Unable to parse OAuth flow response: response type "token" was requested but "access_token" was not returned.'
            );
          if (-1 !== o.indexOf("id_token") && !e.idToken)
            throw new l.default(
              'Unable to parse OAuth flow response: response type "id_token" was requested but "id_token" was not returned.'
            );
          return { tokens: e, state: r.state, code: r.code };
        });
    }
    function _(e) {
      var t = (function (e) {
        if (!e.clientId)
          throw new l.default(
            "A clientId must be specified in the OktaAuth constructor to get a token"
          );
        if (
          (0, u.isString)(e.responseType) &&
          -1 !== e.responseType.indexOf(" ")
        )
          throw new l.default(
            "Multiple OAuth responseTypes must be defined as an array"
          );
        var t = {
          client_id: e.clientId,
          code_challenge: e.codeChallenge,
          code_challenge_method: e.codeChallengeMethod,
          display: e.display,
          idp: e.idp,
          idp_scope: e.idpScope,
          login_hint: e.loginHint,
          max_age: e.maxAge,
          nonce: e.nonce,
          prompt: e.prompt,
          redirect_uri: e.redirectUri,
          response_mode: e.responseMode,
          response_type: e.responseType,
          sessionToken: e.sessionToken,
          state: e.state,
        };
        if (
          ((t = (0, u.removeNils)(t)),
          ["idp_scope", "response_type"].forEach(function (e) {
            Array.isArray(t[e]) && (t[e] = t[e].join(" "));
          }),
          -1 !== e.responseType.indexOf("id_token") &&
            -1 === e.scopes.indexOf("openid"))
        )
          throw new l.default(
            "openid scope must be specified in the scopes argument when requesting an id_token"
          );
        return (t.scope = e.scopes.join(" ")), t;
      })(e);
      return (0, u.toQueryString)(t);
    }
    function S(e, t) {
      return arguments.length > 2
        ? Promise.reject(
            new l.default(
              'As of version 3.0, "getToken" takes only a single set of options'
            )
          )
        : A(e, (t = t || {}))
            .then(function (r) {
              var n, o;
              switch (
                (t.sessionToken
                  ? Object.assign(r, {
                      prompt: "none",
                      responseMode: "okta_post_message",
                      display: null,
                    })
                  : t.idp && Object.assign(r, { display: "popup" }),
                (o = (0, c.getOAuthUrls)(e, r)),
                (n = (t.codeVerifier ? o.tokenUrl : o.authorizeUrl) + _(r)),
                r.sessionToken || null === r.display
                  ? "IFRAME"
                  : "popup" === r.display
                  ? "POPUP"
                  : "IMPLICIT")
              ) {
                case "IFRAME":
                  var i = w(e, t.timeout, r.state),
                    a = (0, c.loadFrame)(n);
                  return i
                    .then(function (t) {
                      return E(e, r, t, o);
                    })
                    .finally(function () {
                      document.body.contains(a) &&
                        a.parentElement.removeChild(a);
                    });
                case "POPUP":
                  var s;
                  if ("okta_post_message" === r.responseMode) {
                    if (!e.features.isPopupPostMessageSupported())
                      throw new l.default(
                        "This browser doesn't have full postMessage support"
                      );
                    s = w(e, t.timeout, r.state);
                  }
                  var u = { popupTitle: t.popupTitle },
                    f = (0, c.loadPopup)(n, u);
                  return new Promise(function (e, t) {
                    var r = setInterval(function () {
                      (f && !f.closed) ||
                        (clearInterval(r),
                        t(
                          new l.default("Unable to parse OAuth flow response")
                        ));
                    }, 100);
                    s.then(function (t) {
                      clearInterval(r), e(t);
                    }).catch(function (e) {
                      clearInterval(r), t(e);
                    });
                  })
                    .then(function (t) {
                      return E(e, r, t, o);
                    })
                    .finally(function () {
                      f && !f.closed && f.close();
                    });
                default:
                  throw new l.default(
                    "The full page redirect flow is not supported"
                  );
              }
            })
            .catch(function (t) {
              throw (e.options.pkce && g.default.clearMeta(e), t);
            });
    }
    function O(e, t) {
      return arguments.length > 2
        ? Promise.reject(
            new l.default(
              'As of version 3.0, "getWithoutPrompt" takes only a single set of options'
            )
          )
        : ((t = (0, u.clone)(t) || {}),
          Object.assign(t, {
            prompt: "none",
            responseMode: "okta_post_message",
            display: null,
          }),
          S(e, t));
    }
    function A(e, t) {
      if ((0, c.isLoginRedirect)(e))
        return Promise.reject(
          new l.default(
            "The app should not attempt to call getToken on callback. Authorize flow is already in process. Use parseFromUrl() to receive tokens."
          )
        );
      t = (0, u.clone)(t) || {};
      var r = (function (e) {
        var t = e.options,
          r = t.pkce,
          n = t.clientId,
          o = t.redirectUri,
          i = t.responseType,
          a = t.responseMode,
          s = t.scopes,
          u = t.ignoreSignature;
        return {
          pkce: r,
          clientId: n,
          redirectUri: o || window.location.href,
          responseType: i || ["token", "id_token"],
          responseMode: a,
          state: (0, c.generateState)(),
          nonce: (0, c.generateNonce)(),
          scopes: s || ["openid", "email"],
          ignoreSignature: u,
        };
      })(e);
      if ((Object.assign(r, t), !1 === r.pkce)) return Promise.resolve(r);
      if (!e.features.isPKCESupported()) {
        var n =
          "PKCE requires a modern browser with encryption support running in a secure context.";
        return (
          e.features.isHTTPS() ||
            (n +=
              "\nThe current page is not being served with HTTPS protocol. PKCE requires secure HTTPS protocol."),
          e.features.hasTextEncoder() ||
            (n +=
              '\n"TextEncoder" is not defined. To use PKCE, you may need to include a polyfill/shim for this browser.'),
          Promise.reject(new l.default(n))
        );
      }
      return (
        r.codeChallengeMethod ||
          (r.codeChallengeMethod = g.default.DEFAULT_CODE_CHALLENGE_METHOD),
        (r.responseType = "code"),
        (0, c.getWellKnown)(e, null)
          .then(function (e) {
            if (
              -1 ===
              (e.code_challenge_methods_supported || []).indexOf(
                r.codeChallengeMethod
              )
            )
              throw new l.default("Invalid code_challenge_method");
          })
          .then(function () {
            var t = g.default.generateVerifier(r.codeVerifier),
              n = { codeVerifier: t, redirectUri: r.redirectUri };
            return g.default.saveMeta(e, n), g.default.computeChallenge(t);
          })
          .then(function (e) {
            var t = (0, u.clone)(r) || {};
            return Object.assign(t, r, { codeChallenge: e }), t;
          })
      );
    }
    function x(e, t, r) {
      var n = t.responseType,
        o = t.state,
        i = t.nonce,
        a = t.scopes,
        s = t.clientId,
        u = t.ignoreSignature,
        c = JSON.stringify({
          responseType: n,
          state: o,
          nonce: i,
          scopes: a,
          clientId: s,
          urls: r,
          ignoreSignature: u,
        });
      m.set(h.REDIRECT_OAUTH_PARAMS_NAME, c, null, e.options.cookies),
        p.default.browserHasSessionStorage() &&
          p.default
            .getSessionStorage()
            .setItem(h.REDIRECT_OAUTH_PARAMS_NAME, c);
    }
    function R() {
      var e;
      return (
        p.default.browserHasSessionStorage() &&
          (e = p.default
            .getSessionStorage()
            .getItem(h.REDIRECT_OAUTH_PARAMS_NAME)),
        e || (e = m.get(h.REDIRECT_OAUTH_PARAMS_NAME)),
        p.default.browserHasSessionStorage() &&
          p.default
            .getSessionStorage()
            .removeItem(h.REDIRECT_OAUTH_PARAMS_NAME),
        m.delete(h.REDIRECT_OAUTH_PARAMS_NAME),
        e
      );
    }
  },
  function (e, t, r) {
    var n = r(46),
      o = r(47),
      i = r(48),
      a = r(50);
    e.exports = function (e, t) {
      return n(e) || o(e, t) || i(e, t) || a();
    };
  },
  function (e, t) {
    e.exports = function (e) {
      if (Array.isArray(e)) return e;
    };
  },
  function (e, t) {
    e.exports = function (e, t) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
        var r = [],
          n = !0,
          o = !1,
          i = void 0;
        try {
          for (
            var a, s = e[Symbol.iterator]();
            !(n = (a = s.next()).done) &&
            (r.push(a.value), !t || r.length !== t);
            n = !0
          );
        } catch (e) {
          (o = !0), (i = e);
        } finally {
          try {
            n || null == s.return || s.return();
          } finally {
            if (o) throw i;
          }
        }
        return r;
      }
    };
  },
  function (e, t, r) {
    var n = r(49);
    e.exports = function (e, t) {
      if (e) {
        if ("string" == typeof e) return n(e, t);
        var r = Object.prototype.toString.call(e).slice(8, -1);
        return (
          "Object" === r && e.constructor && (r = e.constructor.name),
          "Map" === r || "Set" === r
            ? Array.from(e)
            : "Arguments" === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            ? n(e, t)
            : void 0
        );
      }
    };
  },
  function (e, t) {
    e.exports = function (e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    };
  },
  function (e, t) {
    e.exports = function () {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    };
  },
  function (e, t, r) {
    "use strict";
    (t.getOidcHash =
      /*!
       * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       */
      function (e) {
        var t = new TextEncoder().encode(e);
        return crypto.subtle.digest("SHA-256", t).then(function (e) {
          var t = new Uint8Array(e).slice(0, 16),
            r = String.fromCharCode.apply(null, t);
          return (0, n.stringToBase64Url)(r);
        });
      }),
      (t.verifyToken = function (e, t) {
        t = (0, n.clone)(t);
        var r = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
        return (
          delete t.use,
          crypto.subtle
            .importKey("jwk", t, r, !0, ["verify"])
            .then(function (t) {
              var o = e.split("."),
                i = (0, n.stringToBuffer)(o[0] + "." + o[1]),
                a = (0, n.base64UrlDecode)(o[2]),
                s = (0, n.stringToBuffer)(a);
              return crypto.subtle.verify(r, t, s, i);
            })
        );
      });
    var n = r(2);
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(3)),
      i = n(r(5)),
      a = r(2);
    function s(e) {
      return ("0" + e.toString(16)).substr(-2);
    }
    function u(e, t) {
      return (
        (t = Object.assign({}, e.options.cookies, t)),
        e.options.storageUtil.getPKCEStorage(t)
      );
    }
    function c(e) {
      var t = u(e);
      t.clearStorage(), (t = u(e, { preferLocalStorage: !0 })).clearStorage();
    }
    var f = {
      DEFAULT_CODE_CHALLENGE_METHOD: "S256",
      generateVerifier: function (e) {
        var t,
          r,
          n = e || "";
        return (
          n.length < 43 &&
            (n +=
              ((t = 43 - n.length),
              (r = new Uint8Array(Math.ceil(t / 2))),
              crypto.getRandomValues(r),
              Array.from(r, s).join("").slice(0, t))),
          encodeURIComponent(n).slice(0, 128)
        );
      },
      clearMeta: c,
      saveMeta: function (e, t) {
        var r = u(e, { preferLocalStorage: !0 }),
          n = r.getStorage();
        n.codeVerifier &&
          (0, a.warn)(
            "saveMeta: PKCE codeVerifier exists in localStorage. This may indicate an auth flow is already in progress."
          ),
          (n = (r = u(e)).getStorage()).codeVerifier &&
            (0, a.warn)(
              "saveMeta: PKCE codeVerifier exists in sessionStorage. This may indicate an auth flow is already in progress."
            ),
          c(e),
          r.setStorage(t);
      },
      loadMeta: function (e) {
        var t = u(e, { preferLocalStorage: !0 }),
          r = t.getStorage();
        if (
          !r.codeVerifier &&
          !(r = (t = u(e, { preferLocalStorage: !1 })).getStorage())
            .codeVerifier
        )
          throw new o.default(
            "Could not load PKCE codeVerifier from storage. This may indicate the auth flow has already completed or multiple auth flows are executing concurrently.",
            null
          );
        return r;
      },
      computeChallenge: function (e) {
        var t = new TextEncoder().encode(e);
        return crypto.subtle.digest("SHA-256", t).then(function (e) {
          var t = String.fromCharCode.apply(null, new Uint8Array(e));
          return (0, a.stringToBase64Url)(t);
        });
      },
      getToken: function (e, t, r) {
        !(function (e) {
          if (!e.clientId)
            throw new o.default(
              "A clientId must be specified in the OktaAuth constructor to get a token"
            );
          if (!e.redirectUri)
            throw new o.default(
              "The redirectUri passed to /authorize must also be passed to /token"
            );
          if (!e.authorizationCode)
            throw new o.default(
              "An authorization code (returned from /authorize) must be passed to /token"
            );
          if (!e.codeVerifier)
            throw new o.default(
              'The "codeVerifier" (generated and saved by your app) must be passed to /token'
            );
        })(t);
        var n = (function (e) {
          var t = (0, a.removeNils)({
            client_id: e.clientId,
            redirect_uri: e.redirectUri,
            grant_type: "authorization_code",
            code: e.authorizationCode,
            code_verifier: e.codeVerifier,
          });
          return (0, a.toQueryString)(t).slice(1);
        })(t);
        return i.default.httpRequest(e, {
          url: r.tokenUrl,
          method: "POST",
          args: n,
          withCredentials: !1,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
      },
    };
    (t.default = f), (e.exports = t.default);
  },
  function (e, t) {
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     */
  },
  function (e, t) {
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     */
  },
  function (e, t) {},
  function (e, t) {
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     */
  },
  function (e, t) {
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     */
  },
  function (e, t) {
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     */
  },
  function (e, t) {
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     */
  },
  function (e, t, r) {
    "use strict";
    (t.isToken =
      /*!
       * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
       * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
       *
       * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
       * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       *
       * See the License for the specific language governing permissions and limitations under the License.
       */
      function (e) {
        if (
          e &&
          (e.accessToken || e.idToken || e.refreshToken) &&
          Array.isArray(e.scopes)
        )
          return !0;
        return !1;
      }),
      (t.isAccessToken = function (e) {
        return e && e.accessToken;
      }),
      (t.isIDToken = function (e) {
        return e && e.idToken;
      }),
      (t.isRefreshToken = function (e) {
        return e && e.refreshToken;
      });
  },
  function (e, t) {
    /*!
     * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
     * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
     *
     * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
     * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *
     * See the License for the specific language governing permissions and limitations under the License.
     */
  },
  function (e, t) {},
  function (e, t) {
    e.exports = function (e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    };
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(1)),
      i = n(r(9)),
      a = (function () {
        function e(t) {
          (0, o.default)(this, e), (this.localOffset = parseInt(t || 0));
        }
        return (
          (0, i.default)(
            e,
            [
              {
                key: "now",
                value: function () {
                  var e = (Date.now() + this.localOffset) / 1e3;
                  return e;
                },
              },
            ],
            [
              {
                key: "create",
                value: function () {
                  return new e(0);
                },
              },
            ]
          ),
          e
        );
      })();
    (t.default = a), (e.exports = t.default);
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.default = void 0;
    var o = n(r(1)),
      i = n(r(9)),
      a = r(2),
      s = (function () {
        function e() {
          (0, o.default)(this, e), (this.queue = []), (this.running = !1);
        }
        return (
          (0, i.default)(e, [
            {
              key: "push",
              value: function (e, t) {
                for (
                  var r = this,
                    n = arguments.length,
                    o = new Array(n > 2 ? n - 2 : 0),
                    i = 2;
                  i < n;
                  i++
                )
                  o[i - 2] = arguments[i];
                return new Promise(function (n, i) {
                  r.queue.push({
                    method: e,
                    thisObject: t,
                    args: o,
                    resolve: n,
                    reject: i,
                  }),
                    r.run();
                });
              },
            },
            {
              key: "run",
              value: function () {
                var e = this;
                if (!this.running && 0 !== this.queue.length) {
                  this.running = !0;
                  var t = this.queue.shift(),
                    r = t.method.apply(t.thisObject, t.args);
                  (0, a.isPromise)(r)
                    ? r.then(t.resolve, t.reject).finally(function () {
                        (e.running = !1), e.run();
                      })
                    : (t.resolve(r), (this.running = !1), this.run());
                }
              },
            },
          ]),
          e
        );
      })();
    (t.default = s), (e.exports = t.default);
  },
  function (e, t, r) {
    "use strict";
    t.default = function (e, t) {
      if (((t = t || {}), !(0, o.isFingerprintSupported)()))
        return Promise.reject(
          new n.AuthSdkError("Fingerprinting is not supported on this device")
        );
      var r, a, s;
      return new Promise(function (o, u) {
        ((a = document.createElement("iframe")).style.display = "none"),
          (s = function (t) {
            if (t && t.data && t.origin === e.getIssuerOrigin()) {
              try {
                var r = JSON.parse(t.data);
              } catch (e) {
                return;
              }
              if (r)
                return "FingerprintAvailable" === r.type
                  ? o(r.fingerprint)
                  : void (
                      "FingerprintServiceReady" === r.type &&
                      t.source.postMessage(
                        JSON.stringify({ type: "GetFingerprint" }),
                        t.origin
                      )
                    );
            }
          }),
          (0, i.addListener)(window, "message", s),
          (a.src = e.getIssuerOrigin() + "/auth/services/devicefingerprint"),
          document.body.appendChild(a),
          (r = setTimeout(function () {
            u(new n.AuthSdkError("Fingerprinting timed out"));
          }, t.timeout || 15e3));
      }).finally(function () {
        clearTimeout(r),
          (0, i.removeListener)(window, "message", s),
          document.body.contains(a) && a.parentElement.removeChild(a);
      });
    };
    var n = r(32),
      o = r(27),
      i = r(17);
    e.exports = t.default;
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    t.AuthStateManager = t.DEFAULT_AUTH_STATE = void 0;
    var o = n(r(1)),
      i = n(r(9)),
      a = r(32),
      s = r(2),
      u = r(31),
      c = r(68),
      f = {
        isPending: !0,
        isAuthenticated: !1,
        idToken: null,
        accessToken: null,
        refreshToken: null,
      };
    t.DEFAULT_AUTH_STATE = f;
    var l = { updateAuthStatePromise: null, canceledTimes: 0 },
      d = (function () {
        function e(t) {
          var r = this;
          if (((0, o.default)(this, e), !t.emitter))
            throw new a.AuthSdkError(
              "Emitter should be initialized before AuthStateManager"
            );
          (this._sdk = t),
            (this._pending = Object.assign({}, l)),
            (this._authState = Object.assign({}, f)),
            (this._logOptions = {}),
            t.tokenManager.on(u.EVENT_ADDED, function (e, t) {
              r._setLogOptions({ event: u.EVENT_ADDED, key: e, token: t }),
                r.updateAuthState();
            }),
            t.tokenManager.on(u.EVENT_REMOVED, function (e, t) {
              r._setLogOptions({ event: u.EVENT_REMOVED, key: e, token: t }),
                r.updateAuthState();
            });
        }
        return (
          (0, i.default)(e, [
            {
              key: "_setLogOptions",
              value: function (e) {
                this._logOptions = e;
              },
            },
            {
              key: "getAuthState",
              value: function () {
                return this._authState;
              },
            },
            {
              key: "updateAuthState",
              value: function () {
                var e = this;
                (this._sdk.emitter.e &&
                  this._sdk.emitter.e.authStateChange &&
                  this._sdk.emitter.e.authStateChange.length) ||
                  (0, s.warn)(
                    "updateAuthState is an asynchronous method with no return, please subscribe to the latest authState update with authStateManager.subscribe(handler) method before calling updateAuthState."
                  );
                var t = this._sdk.options,
                  r = t.transformAuthState,
                  n = t.devMode,
                  o = this._sdk.tokenManager._getOptions(),
                  i = o.autoRenew,
                  a = o.autoRemove,
                  u = function (t) {
                    var r = e._logOptions,
                      n = r.event,
                      o = r.key,
                      i = r.token;
                    (0, s.getConsole)().group(
                      "OKTA-AUTH-JS:updateAuthState: Event:"
                        .concat(n, " Status:")
                        .concat(t)
                    ),
                      (0, s.getConsole)().log(o, i),
                      (0, s.getConsole)().log(
                        "Current authState",
                        e._authState
                      ),
                      (0, s.getConsole)().groupEnd(),
                      (e._logOptions = {});
                  },
                  f = function (t) {
                    var r, o;
                    ((r = e._authState),
                    (o = t),
                    r.isPending !== o.isPending ||
                      r.isAuthenticated !== o.isAuthenticated ||
                      JSON.stringify(r.idToken) !== JSON.stringify(o.idToken) ||
                      JSON.stringify(r.accessToken) !==
                        JSON.stringify(o.accessToken) ||
                      r.error !== o.error)
                      ? ((e._authState = t),
                        e._sdk.emitter.emit(
                          "authStateChange",
                          Object.assign({}, t)
                        ),
                        n && u("emitted"))
                      : n && u("unchanged");
                  },
                  d = function () {
                    return i || a;
                  };
                if (this._pending.updateAuthStatePromise) {
                  if (this._pending.canceledTimes >= 10)
                    return void (n && u("terminated"));
                  this._pending.updateAuthStatePromise.cancel();
                }
                var h = new c(function (t, o, i) {
                  (i.shouldReject = !1),
                    i(function () {
                      (e._pending.updateAuthStatePromise = null),
                        (e._pending.canceledTimes =
                          e._pending.canceledTimes + 1),
                        n && u("canceled");
                    });
                  var a = function (r) {
                    h.isCanceled || (f(r), (e._pending = Object.assign({}, l))),
                      t();
                  };
                  e._sdk.tokenManager.getTokens().then(function (n) {
                    var o = n.accessToken,
                      i = n.idToken,
                      s = n.refreshToken;
                    if (h.isCanceled) t();
                    else {
                      var u = !1;
                      o &&
                        e._sdk.tokenManager.hasExpired(o) &&
                        ((o = null), (u = d())),
                        i &&
                          e._sdk.tokenManager.hasExpired(i) &&
                          ((i = null), (u = d()));
                      var c = {
                        accessToken: o,
                        idToken: i,
                        refreshToken: s,
                        isPending: u,
                        isAuthenticated: !(!o || !i),
                      };
                      (r ? r(e._sdk, c) : Promise.resolve(c))
                        .then(function (e) {
                          return a(e);
                        })
                        .catch(function (e) {
                          return a({
                            accessToken: o,
                            idToken: i,
                            refreshToken: s,
                            isAuthenticated: !1,
                            isPending: !1,
                            error: e,
                          });
                        });
                    }
                  });
                });
                this._pending.updateAuthStatePromise = h;
              },
            },
            {
              key: "subscribe",
              value: function (e) {
                this._sdk.emitter.on("authStateChange", e);
              },
            },
            {
              key: "unsubscribe",
              value: function (e) {
                this._sdk.emitter.off("authStateChange", e);
              },
            },
          ]),
          e
        );
      })();
    t.AuthStateManager = d;
  },
  function (e, t, r) {
    "use strict";
    var n = r(1),
      o = r(9),
      i = r(6),
      a = r(7),
      s = r(4);
    function u(e, t) {
      var r;
      if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
        if (
          Array.isArray(e) ||
          (r = (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return c(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === r && e.constructor && (r = e.constructor.name);
            if ("Map" === r || "Set" === r) return Array.from(e);
            if (
              "Arguments" === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            )
              return c(e, t);
          })(e)) ||
          (t && e && "number" == typeof e.length)
        ) {
          r && (e = r);
          var n = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
            },
            e: function (e) {
              throw e;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var i,
        a = !0,
        s = !1;
      return {
        s: function () {
          r = e[Symbol.iterator]();
        },
        n: function () {
          var e = r.next();
          return (a = e.done), e;
        },
        e: function (e) {
          (s = !0), (i = e);
        },
        f: function () {
          try {
            a || null == r.return || r.return();
          } finally {
            if (s) throw i;
          }
        },
      };
    }
    function c(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    function f(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var r,
          n = s(e);
        if (t) {
          var o = s(this).constructor;
          r = Reflect.construct(n, arguments, o);
        } else r = n.apply(this, arguments);
        return a(this, r);
      };
    }
    var l = (function (e) {
        i(r, e);
        var t = f(r);
        function r(e) {
          var o;
          return (
            n(this, r),
            ((o = t.call(this, e || "Promise was canceled")).name =
              "CancelError"),
            o
          );
        }
        return (
          o(r, [
            {
              key: "isCanceled",
              get: function () {
                return !0;
              },
            },
          ]),
          r
        );
      })(r(21)(Error)),
      d = (function () {
        function e(t) {
          var r = this;
          n(this, e),
            (this._cancelHandlers = []),
            (this._isPending = !0),
            (this._isCanceled = !1),
            (this._rejectOnCancel = !0),
            (this._promise = new Promise(function (e, n) {
              r._reject = n;
              var o = function (e) {
                if (!r._isPending)
                  throw new Error(
                    "The `onCancel` handler was attached after the promise settled."
                  );
                r._cancelHandlers.push(e);
              };
              return (
                Object.defineProperties(o, {
                  shouldReject: {
                    get: function () {
                      return r._rejectOnCancel;
                    },
                    set: function (e) {
                      r._rejectOnCancel = e;
                    },
                  },
                }),
                t(
                  function (t) {
                    (r._isPending = !1), e(t);
                  },
                  function (e) {
                    (r._isPending = !1), n(e);
                  },
                  o
                )
              );
            }));
        }
        return (
          o(e, null, [
            {
              key: "fn",
              value: function (t) {
                return function () {
                  for (
                    var r = arguments.length, n = new Array(r), o = 0;
                    o < r;
                    o++
                  )
                    n[o] = arguments[o];
                  return new e(function (e, r, o) {
                    n.push(o), t.apply(void 0, n).then(e, r);
                  });
                };
              },
            },
          ]),
          o(e, [
            {
              key: "then",
              value: function (e, t) {
                return this._promise.then(e, t);
              },
            },
            {
              key: "catch",
              value: function (e) {
                return this._promise.catch(e);
              },
            },
            {
              key: "finally",
              value: function (e) {
                return this._promise.finally(e);
              },
            },
            {
              key: "cancel",
              value: function (e) {
                if (this._isPending && !this._isCanceled) {
                  if (this._cancelHandlers.length > 0)
                    try {
                      var t,
                        r = u(this._cancelHandlers);
                      try {
                        for (r.s(); !(t = r.n()).done; ) {
                          (0, t.value)();
                        }
                      } catch (e) {
                        r.e(e);
                      } finally {
                        r.f();
                      }
                    } catch (e) {
                      this._reject(e);
                    }
                  (this._isCanceled = !0),
                    this._rejectOnCancel && this._reject(new l(e));
                }
              },
            },
            {
              key: "isCanceled",
              get: function () {
                return this._isCanceled;
              },
            },
          ]),
          e
        );
      })();
    Object.setPrototypeOf(d.prototype, Promise.prototype),
      (e.exports = d),
      (e.exports.CancelError = l);
  },
  function (e, t) {
    function r() {}
    (r.prototype = {
      on: function (e, t, r) {
        var n = this.e || (this.e = {});
        return (n[e] || (n[e] = [])).push({ fn: t, ctx: r }), this;
      },
      once: function (e, t, r) {
        var n = this;
        function o() {
          n.off(e, o), t.apply(r, arguments);
        }
        return (o._ = t), this.on(e, o, r);
      },
      emit: function (e) {
        for (
          var t = [].slice.call(arguments, 1),
            r = ((this.e || (this.e = {}))[e] || []).slice(),
            n = 0,
            o = r.length;
          n < o;
          n++
        )
          r[n].fn.apply(r[n].ctx, t);
        return this;
      },
      off: function (e, t) {
        var r = this.e || (this.e = {}),
          n = r[e],
          o = [];
        if (n && t)
          for (var i = 0, a = n.length; i < a; i++)
            n[i].fn !== t && n[i].fn._ !== t && o.push(n[i]);
        return o.length ? (r[e] = o) : delete r[e], this;
      },
    }),
      (e.exports = r);
  },
]);
//# sourceMappingURL=okta-auth-js.min.js.map
