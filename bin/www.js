// NPM Dependencies
import http from 'http'

// App Dependency
import app from '../app.js'

// Loaders Dependencies
import { logger } from '../loaders/logger.js'

// Configuration Dependencies
import config from '../config/index.js'

// Set port
const port = normalizePort(config.port)
app.set('port', port)

// Create HTTP Server
logger.info('Starting HTTP server on ' + port)
const server = http.createServer(app)

// HTTP Server listen on port
server.listen(config.port)
logger.info('HTTP server started successfully')

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
