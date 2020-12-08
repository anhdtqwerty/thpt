import utils from './utils'

const _temp = {}

export default {
  data: _temp,
  // Add a snapshot of what returned from data for later comparision.
  // data should be a function and return the actual data
  set (key = 'default', data) {
    if (typeof data !== 'function') return
    _temp[key] = {
      snapshot: utils.clone(data()),
      data
    }
  },
  remove (key) {
    if (_temp.hasOwnProperty(key)) delete _temp[key]
  },
  reset (key) {
    if (typeof key === 'string') {
      if (_temp.hasOwnProperty(key) && typeof _temp[key].data === 'function') {
        _temp[key].snapshot = _temp[key].data()
      }
    } else {
      for (let key in _temp) {
        if (_temp.hasOwnProperty(key)) delete _temp[key]
      }
    }
  },
  // return false if at least 1 of snapshots taken earlier differ from it's source
  validate (key, newData) {
    if (key !== undefined) {
      if (_temp[key]) {
        const { snapshot, data } = _temp[key]
        return this._compareObjs(
          snapshot,
          newData !== undefined ? newData : data()
        )
      }
    } else {
      for (let key in _temp) {
        const { snapshot, data } = _temp[key]
        if (!this._compareObjs(snapshot, data())) {
          return false
        }
      }
    }
    return true
  },
  // check if two objs'content are the equal
  _compareObjs (src, tar) {
    if (typeof src !== 'object') {
      return src === tar
    } else if (typeof src === typeof tar) {
      for (let key in src) {
        if (!src.hasOwnProperty(key)) continue
        if (!this._compareObjs(src[key], tar[key])) return false
      }
      for (let key in tar) {
        if (tar.hasOwnProperty(key) && !src.hasOwnProperty(key)) return false
      }
      return true
    } else {
      return false
    }
  }
}
