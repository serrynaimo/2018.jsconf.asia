module.exports = {
  hosts: [
    {
      domain: '2018-jsconf-asia.http2.live',
      manifest: [
        {
          glob: '/index.html',
          push: '**/*'
        }
      ]
    }
  ]
}
