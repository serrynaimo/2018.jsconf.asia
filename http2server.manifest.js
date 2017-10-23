module.exports = [
  {
    glob: '/index.html',
    push: [
      '/**/*',
      '!/lunch/**/*'
    ]
  },
  {
    glob: '/lunch/index.html',
    push: [
      '/favicon.png',
      '/lunch/**/*'
    ]
  }
]
