const micro = require('micro')

const apps = [
  { name: 'Hello World', port: 3000, server: micro(require('./hello-world')) },
  { name: 'Tinyurl', port: 3001, server: micro(require('./tinyurl')) },
]

apps.forEach(app => {
  app.server.listen(app.port, () => {
    console.log(`Booted ${app.name} on ${app.port}...`)
  })
})
