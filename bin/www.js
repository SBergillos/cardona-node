// NPM Dependencies
import http from 'http'
import https from 'https'
import fs from 'fs'

// App Dependency
import app from '../app.js'

// Loaders Dependencies
import { logger } from '../loaders/logger.js'

// Configuration Dependencies
import config from '../config/index.js'

// Set port
const port = normalizePort(config.port)
app.set('port', port)

// Create server
let server

if (config.https) {
  if (config.env === 'production') {
    // In production, we have to set a dummy HTTP server to redirect to HTTPS
    logger.info('Creating dummy HTTP server to redirect to HTTPS')
    http.createServer((req, res) => {
      res.writeHead(307, {
        Location: 'https://' + req.headers.host + req.url
      })
      res.end()
    }).listen(80)
  }

  // Get TLS data: certificate and key.
  logger.info('Reading TLS Certificate')
  const tls = {
    cert: fs.readFileSync(config.cert.file),
    key: fs.readFileSync(config.cert.key)
  }

  // Create HTTPS Server
  logger.info('Starting HTTPS server on ' + port)
  server = https.createServer(tls, app)
} else {
  // Create HTTP Server
  logger.info('Starting HTTP server on ' + port)
  server = http.createServer(app)
}
// HTTP Server listen on port
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

// Normalize port value
function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

// Event listener for HTTP server "error" event
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.fatal(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      logger.fatal(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

// Event listener for HTTP server "listening" event.
function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  logger.info('HTTP server listening on ' + bind)
}
