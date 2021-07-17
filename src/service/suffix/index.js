/* eslint-disable prefer-const */
import md5 from '../md5'

const signConfig = {
  signStr: 'kl4w3hbbh7jp5ocu9n', // 设置签名key
}
function _sign(map) {
  let json = null
  let keys = Object.keys(map)
  let count = keys.length
  keys.sort()
  let signStr = signConfig.signStr
  for (let i = 0; i < count; i++) {
    let k = keys[i]
    let v = map[k]
    if (k === 'json') {
      json = v
    } else {
      signStr = signStr + k + v
    }
  }
  if (json) {
    signStr = signStr + json
  }
  return md5(signStr)
}

export function suffix(map) {
  const timestamp = Math.round(new Date().getTime())
  map.timestamp = timestamp

  const signStr = _sign(map)
  delete map.json
  return {
    ...map,
    sign: signStr,
  }
}
