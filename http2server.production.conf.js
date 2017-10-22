const manifest = require('./http2server.manifest')

module.exports = {
  hosts: [
    {
      domain: '2018-jsconf-asia.http2.live',
      manifest
    }
  ]
}
