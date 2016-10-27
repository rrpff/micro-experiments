const cluster = require('cluster')
const { join } = require('path')
const micro = require('micro')

function startWorker (app) {
  const instance = cluster.fork()
  instance.send(app)
  return instance
}

process.on('message', function (app) {
  if (cluster.isMaster) {
    for (let i = 0; i < app.instances; i++) {
      startWorker(app)
    }

    cluster.on('exit', (worker, code, signal) => {
      console.info(`Worker ${worker.process.pid} died`)
      startWorker(app)
    })
  } else {
    const action = require(join(__dirname, app.name))
    const server = micro(action)
    server.listen(app.port, err => {
      if (err) console.error(`There was an error starting ${app.name} on PID ${process.pid}`)
      console.log(`Booting ${app.name} on http://localhost:${app.port}`)
    })
  }
})
