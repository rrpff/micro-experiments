const micro = require('micro')
const { spawn } = require('child_process')

function start (app) {
  const server = spawn('micro', [app.name, '-p', app.port])

  server.stdout.on('data', (data) => {
    console.log(`[${app.name}] ${data}`);
  });

  server.stderr.on('data', (data) => {
    console.error(`[${app.name}] ${data}`);
  });

  return server
}

const apps = [
  { name: 'tinyurl', port: 3000 },
  { name: 'hello-world', port: 3001 }
]

const servers = apps.map(start)

process.on('exit', function () {
  servers.forEach(server => server.kill())
})
