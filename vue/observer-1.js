class Observer {
  constructor (data) {
    this.data = data
    this._data = {}
    const keys = Object.keys(data)
    const _this = this

    keys.forEach(key => {
      this._data[key] = data[key]

      this.addObserve.call(this, this.data, key)
    })
  }

  addObserve (val, key) {
    const _that = this

    Object.defineProperty(val, key, {
      get () {
        console.log(`你访问了 ${ key }`)
        return _that._data[key]
      },
      set (val) {
        console.log(`你设置了 ${ key }, 新的值为 ${ val }`)
        _that._data[key] = val
      }
    })
  }
}
