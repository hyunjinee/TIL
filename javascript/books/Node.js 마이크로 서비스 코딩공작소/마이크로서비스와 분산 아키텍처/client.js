"use strict"
const net = require("net")

class tcpClient {
  constructor(host, port, onCreate, onRead, onEnd, onError) {
    this.options = {
      host: host,
      port: port,
    }
    this.onCreate = onCreate
    this.onRead = onRead
    this.onEnd = onEnd
    this.onError = onError
  }

  connect() {
    this.client = net.connect(this.options, () => {
      if (this.onCreate) this.onCreate(this.options)
    })
    this.client.on("data", (data) => {
      let sz = this.merge ? this.merge + data.toString() : data.toString()
      let arr = sz.split("")
      for (let n in arr) {
        if (sz.charAt(sz.length - 1) != "" && n == arr.length - 1) {
          this.merge = arr[n]
          break
        }
      }
    })
  }
}

module.exports = tcpClient
