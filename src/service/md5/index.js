/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable one-var */
function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff)
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xffff)
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bitRol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5Cmn(q, a, b, x, s, t) {
  return safeAdd(bitRol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
}
function md5Ff(a, b, c, d, x, s, t) {
  return md5Cmn((b & c) | (~b & d), a, b, x, s, t)
}
function md5Gg(a, b, c, d, x, s, t) {
  return md5Cmn((b & d) | (c & ~d), a, b, x, s, t)
}
function md5Hh(a, b, c, d, x, s, t) {
  return md5Cmn(b ^ c ^ d, a, b, x, s, t)
}
function md5Ii(a, b, c, d, x, s, t) {
  return md5Cmn(c ^ (b | ~d), a, b, x, s, t)
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binlMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32
  x[(((len + 64) >>> 9) << 4) + 14] = len

  let i,
    olda,
    oldb,
    oldc,
    oldd,
    a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878

  for (i = 0; i < x.length; i += 16) {
    olda = a
    oldb = b
    oldc = c
    oldd = d

    a = md5Ff(a, b, c, d, x[i], 7, -680876936)
    d = md5Ff(d, a, b, c, x[i + 1], 12, -389564586)
    c = md5Ff(c, d, a, b, x[i + 2], 17, 606105819)
    b = md5Ff(b, c, d, a, x[i + 3], 22, -1044525330)
    a = md5Ff(a, b, c, d, x[i + 4], 7, -176418897)
    d = md5Ff(d, a, b, c, x[i + 5], 12, 1200080426)
    c = md5Ff(c, d, a, b, x[i + 6], 17, -1473231341)
    b = md5Ff(b, c, d, a, x[i + 7], 22, -45705983)
    a = md5Ff(a, b, c, d, x[i + 8], 7, 1770035416)
    d = md5Ff(d, a, b, c, x[i + 9], 12, -1958414417)
    c = md5Ff(c, d, a, b, x[i + 10], 17, -42063)
    b = md5Ff(b, c, d, a, x[i + 11], 22, -1990404162)
    a = md5Ff(a, b, c, d, x[i + 12], 7, 1804603682)
    d = md5Ff(d, a, b, c, x[i + 13], 12, -40341101)
    c = md5Ff(c, d, a, b, x[i + 14], 17, -1502002290)
    b = md5Ff(b, c, d, a, x[i + 15], 22, 1236535329)

    a = md5Gg(a, b, c, d, x[i + 1], 5, -165796510)
    d = md5Gg(d, a, b, c, x[i + 6], 9, -1069501632)
    c = md5Gg(c, d, a, b, x[i + 11], 14, 643717713)
    b = md5Gg(b, c, d, a, x[i], 20, -373897302)
    a = md5Gg(a, b, c, d, x[i + 5], 5, -701558691)
    d = md5Gg(d, a, b, c, x[i + 10], 9, 38016083)
    c = md5Gg(c, d, a, b, x[i + 15], 14, -660478335)
    b = md5Gg(b, c, d, a, x[i + 4], 20, -405537848)
    a = md5Gg(a, b, c, d, x[i + 9], 5, 568446438)
    d = md5Gg(d, a, b, c, x[i + 14], 9, -1019803690)
    c = md5Gg(c, d, a, b, x[i + 3], 14, -187363961)
    b = md5Gg(b, c, d, a, x[i + 8], 20, 1163531501)
    a = md5Gg(a, b, c, d, x[i + 13], 5, -1444681467)
    d = md5Gg(d, a, b, c, x[i + 2], 9, -51403784)
    c = md5Gg(c, d, a, b, x[i + 7], 14, 1735328473)
    b = md5Gg(b, c, d, a, x[i + 12], 20, -1926607734)

    a = md5Hh(a, b, c, d, x[i + 5], 4, -378558)
    d = md5Hh(d, a, b, c, x[i + 8], 11, -2022574463)
    c = md5Hh(c, d, a, b, x[i + 11], 16, 1839030562)
    b = md5Hh(b, c, d, a, x[i + 14], 23, -35309556)
    a = md5Hh(a, b, c, d, x[i + 1], 4, -1530992060)
    d = md5Hh(d, a, b, c, x[i + 4], 11, 1272893353)
    c = md5Hh(c, d, a, b, x[i + 7], 16, -155497632)
    b = md5Hh(b, c, d, a, x[i + 10], 23, -1094730640)
    a = md5Hh(a, b, c, d, x[i + 13], 4, 681279174)
    d = md5Hh(d, a, b, c, x[i], 11, -358537222)
    c = md5Hh(c, d, a, b, x[i + 3], 16, -722521979)
    b = md5Hh(b, c, d, a, x[i + 6], 23, 76029189)
    a = md5Hh(a, b, c, d, x[i + 9], 4, -640364487)
    d = md5Hh(d, a, b, c, x[i + 12], 11, -421815835)
    c = md5Hh(c, d, a, b, x[i + 15], 16, 530742520)
    b = md5Hh(b, c, d, a, x[i + 2], 23, -995338651)

    a = md5Ii(a, b, c, d, x[i], 6, -198630844)
    d = md5Ii(d, a, b, c, x[i + 7], 10, 1126891415)
    c = md5Ii(c, d, a, b, x[i + 14], 15, -1416354905)
    b = md5Ii(b, c, d, a, x[i + 5], 21, -57434055)
    a = md5Ii(a, b, c, d, x[i + 12], 6, 1700485571)
    d = md5Ii(d, a, b, c, x[i + 3], 10, -1894986606)
    c = md5Ii(c, d, a, b, x[i + 10], 15, -1051523)
    b = md5Ii(b, c, d, a, x[i + 1], 21, -2054922799)
    a = md5Ii(a, b, c, d, x[i + 8], 6, 1873313359)
    d = md5Ii(d, a, b, c, x[i + 15], 10, -30611744)
    c = md5Ii(c, d, a, b, x[i + 6], 15, -1560198380)
    b = md5Ii(b, c, d, a, x[i + 13], 21, 1309151649)
    a = md5Ii(a, b, c, d, x[i + 4], 6, -145523070)
    d = md5Ii(d, a, b, c, x[i + 11], 10, -1120210379)
    c = md5Ii(c, d, a, b, x[i + 2], 15, 718787259)
    b = md5Ii(b, c, d, a, x[i + 9], 21, -343485551)

    a = safeAdd(a, olda)
    b = safeAdd(b, oldb)
    c = safeAdd(c, oldc)
    d = safeAdd(d, oldd)
  }
  return [a, b, c, d]
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
  let i,
    output = ''
  for (i = 0; i < input.length * 32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff)
  }
  return output
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
  let i
  const output = []
  output[(input.length >> 2) - 1] = undefined
  for (i = 0; i < output.length; i += 1) {
    output[i] = 0
  }
  for (i = 0; i < input.length * 8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32
  }
  return output
}

/*
 * Calculate the MD5 of a raw string
 */
function rstrMd5(s) {
  return binl2rstr(binlMd5(rstr2binl(s), s.length * 8))
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data) {
  let i,
    bkey = rstr2binl(key),
    ipad = [],
    opad = [],
    hash
  ipad[15] = opad[15] = undefined
  if (bkey.length > 16) {
    bkey = binlMd5(bkey, key.length * 8)
  }
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636
    opad[i] = bkey[i] ^ 0x5c5c5c5c
  }
  hash = binlMd5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
  return binl2rstr(binlMd5(opad.concat(hash), 512 + 128))
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
  let hex_tab = '0123456789abcdef',
    output = '',
    x,
    i
  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i)
    output += hex_tab.charAt((x >>> 4) & 0x0f) + hex_tab.charAt(x & 0x0f)
  }
  return output
}

/*
 * Encode a string as utf-8
 */
function str2rstr_utf8(input) {
  return unescape(encodeURIComponent(input))
}

/*
 * Take string arguments and return either raw or hex encoded strings
 */
function raw_md5(s) {
  return rstrMd5(str2rstr_utf8(s))
}
function hex_md5(s) {
  return rstr2hex(raw_md5(s))
}
function raw_hmac_md5(k, d) {
  return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
}
function hex_hmac_md5(k, d) {
  return rstr2hex(raw_hmac_md5(k, d))
}

export default function md5(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hex_md5(string)
    }
    return raw_md5(string)
  }
  if (!raw) {
    return hex_hmac_md5(key, string)
  }
  return raw_hmac_md5(key, string)
}
