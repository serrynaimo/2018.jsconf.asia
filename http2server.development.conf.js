module.exports = {
  hosts: [
    {
      domain: 'localhost',
      manifest: [
        {
          glob: '/index.html',
          push: '**/*'
        }
      ]
    }
  ]
}
