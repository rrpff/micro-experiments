const micro = require('micro')
const { fork } = require('child_process')
const { apps } = require('./config')

function start (app) {
  const server = fork('./start', [], { silent: true })

  server.send(app)

  server.stdout.on('data', (data) => {
    console.log(`[${app.name}] [${server.pid}] ${data}`)
  })

  server.stderr.on('data', (data) => {
    console.error(`[${app.name}] [${server.pid}] ${data}`)
  })

  return server
}

const servers = apps.map(start)

process.on('exit', function () {
  servers.forEach(server => server.kill())
})
