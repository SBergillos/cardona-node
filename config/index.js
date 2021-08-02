// NPM Dependencies
import dotenv from 'dotenv'

// Read environment file
const envFound = dotenv.config()
if (envFound.error) {
  // This error should crash whole process and can't
  // be logged because config is a logger's dependency
  throw new Error("Couldn't find .env file")
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  // Environtment
  env: process.env.NODE_ENV,

  // Application
  app: {
    name: 'cardona-node',
    version: 'v0.3-alpha'
  },

  // Protocol
  https: process.env.HTTPS || false,

  // TLS Certificate
  cert: {
    file: process.env.SSL_CERT_FILE,
    key: process.env.SSL_CERT_KEY
  },

  // Port
  port: process.env.PORT || '8000',

  // API
  api: {
    prefix: '/api',
    version: '/v1'
  },

  // Log
  log: {
    level: process.env.LOG_LEVEL || 'info'
  }
}
