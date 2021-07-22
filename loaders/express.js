// NPM Dependencies
import http from 'http'

const expressLoader = async (app) => {
  // Get port
  const port = 8000
  app.set('port', port)

  // Create HTTP Server
  const server = http.createServer(app)

  // Listen on port
  server.listen(port)
}

export default expressLoader
