'use strict'
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
Object.defineProperty(exports, '__esModule', { value: true })
var cookie = require('cookie')
var setCookieParser = require('set-cookie-parser')
var isBrowser = function() {
  return typeof window !== 'undefined'
}
/**
 * Compare the cookie and return true if the cookies has equivalent
 * options and the cookies would be overwritten in the browser storage.
 *
 * @param a first Cookie for comparision
 * @param b second Cookie for comparision
 */
function areCookiesEqual(a, b) {
  return (
    a.name === b.name &&
    a.domain === b.domain &&
    a.path === b.path &&
    a.httpOnly === b.httpOnly &&
    a.secure === b.secure
  )
}
/**
 * Create an instance of the Cookie interface
 *
 * @param name name of the Cookie
 * @param value value of the Cookie
 * @param options Cookie options
 */
function createCookie(name, value, options) {
  return {
    name: name,
    expires: options.expires,
    maxAge: options.maxAge,
    secure: options.secure,
    httpOnly: options.httpOnly,
    domain: options.domain,
    value: value,
    path: options.path,
  }
}
/**
 *
 * Parses cookies.
 *
 * @param ctx
 * @param options
 */
function parseCookies(ctx, options) {
  if (ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
    var currentCookies = {}
    if (ctx.res && ctx.res.getHeader) {
      var cookies = ctx.res.getHeader('Set-Cookie') || []
      if (typeof cookies === 'string') cookies = [cookies]
      if (typeof cookies === 'number') cookies = []
      var parsedCookies = setCookieParser.parse(cookies)
      currentCookies = parsedCookies.reduce(function(acc, cookie) {
        var _a
        return __assign(
          __assign({}, acc),
          ((_a = {}), (_a[cookie.name] = cookie.value), _a),
        )
      }, {})
    }
    return Object.assign(
      cookie.parse(ctx.req.headers.cookie, options),
      currentCookies,
    )
  }
  if (isBrowser()) {
    return cookie.parse(document.cookie, options)
  }
  return {}
}
exports.parseCookies = parseCookies
/**
 *
 * Sets a cookie.
 *
 * @param ctx
 * @param name
 * @param value
 * @param options
 */
function setCookie(ctx, name, value, options) {
  if (ctx && ctx.res && ctx.res.getHeader && ctx.res.setHeader) {
    var cookies = ctx.res.getHeader('Set-Cookie') || []
    if (typeof cookies === 'string') cookies = [cookies]
    if (typeof cookies === 'number') cookies = []
    var parsedCookies = setCookieParser.parse(cookies)
    var cookiesToSet_1 = []
    parsedCookies.forEach(function(parsedCookie) {
      if (!areCookiesEqual(parsedCookie, createCookie(name, value, options))) {
        cookiesToSet_1.push(
          cookie.serialize(parsedCookie.name, parsedCookie.value, {
            domain: parsedCookie.domain,
            path: parsedCookie.path,
            httpOnly: parsedCookie.httpOnly,
            secure: parsedCookie.secure,
            maxAge: parsedCookie.maxAge,
            expires: parsedCookie.expires,
          }),
        )
      }
    })
    cookiesToSet_1.push(cookie.serialize(name, value, options))
    ctx.res.setHeader('Set-Cookie', cookiesToSet_1)
  }
  if (isBrowser()) {
    document.cookie = cookie.serialize(name, value, options)
  }
  return {}
}
exports.setCookie = setCookie
/**
 *
 * Destroys a cookie with a particular name.
 *
 * @param ctx
 * @param name
 * @param options
 */
function destroyCookie(ctx, name, options) {
  var opts = __assign(__assign({}, options || {}), { maxAge: -1 })
  if (ctx && ctx.res && ctx.res.setHeader && ctx.res.getHeader) {
    var cookies = ctx.res.getHeader('Set-Cookie') || []
    if (typeof cookies === 'string') cookies = [cookies]
    if (typeof cookies === 'number') cookies = []
    cookies.push(cookie.serialize(name, '', opts))
    ctx.res.setHeader('Set-Cookie', cookies)
  }
  if (isBrowser()) {
    document.cookie = cookie.serialize(name, '', opts)
  }
  return {}
}
exports.destroyCookie = destroyCookie
exports.default = {
  set: setCookie,
  get: parseCookies,
  destroy: destroyCookie,
}
//# sourceMappingURL=index.js.map
