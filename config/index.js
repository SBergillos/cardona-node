// NPM Dependencies
import dotenv from 'dotenv'

// Read environment file
const envFound = dotenv.config()
if (envFound.error) {
  // This error should crash whole process
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
    version: 'v0.1-alpha'
  },

  // Port
  port: process.env.PORT || '8000',

  // api config
  api: {
    prefix: '/api',
    version: '/v1'
  }
}
