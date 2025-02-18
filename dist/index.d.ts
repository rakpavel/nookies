import * as cookie from 'cookie'
import * as next from 'next'
/**
 *
 * Parses cookies.
 *
 * @param ctx
 * @param options
 */
export declare function parseCookies(
  ctx?: next.NextContext | null | undefined,
  options?: cookie.CookieParseOptions,
): {
  [key: string]: string
}
/**
 *
 * Sets a cookie.
 *
 * @param ctx
 * @param name
 * @param value
 * @param options
 */
export declare function setCookie(
  ctx: next.NextContext | null | undefined,
  name: string,
  value: string,
  options: cookie.CookieSerializeOptions,
): {}
/**
 *
 * Destroys a cookie with a particular name.
 *
 * @param ctx
 * @param name
 * @param options
 */
export declare function destroyCookie(
  ctx: next.NextConfig | null | undefined,
  name: string,
  options?: cookie.CookieSerializeOptions,
): {}
declare const _default: {
  set: typeof setCookie
  get: typeof parseCookies
  destroy: typeof destroyCookie
}
export default _default
