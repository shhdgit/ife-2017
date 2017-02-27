class Observer {
  constructor (data) {
    this.data = data
    this.watcher = function () {}
    this.walk(data)
  }

  walk (data) {
    Object.keys(data).forEach(key => {
      const val = data[key]

      if (typeof val === 'object') {
        new Observer(val)
      }

      this.convert(key, val)
    })
  }

  convert (key, val) {
    Object.defineProperty(this.data, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        console.log(`你访问了: ${key}: ${ val }`)
        return val
      },
      set: newVal => {
        if (typeof newVal === 'object') new Observer(newVal)
        this.watcher(key, newVal, val)

        console.log(`你设置了: ${ key }: ${ newVal }`)
        if (newVal === val) return
        val = newVal
      },
    })
  }

  $watch (key, fn) {
    this.watcher = (dataKey, newVal, oldVal) => {
      if (dataKey === key) fn(newVal, oldVal)
    }
  }
}
