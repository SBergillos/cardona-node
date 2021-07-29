// NPM Dependencies
import pino from 'pino'
import pinoHttp from 'pino-http'
import os from 'os'

// Configuration Dependencies
import config from '../config/index.js'

// Loader Dependencies
import { asyncLocalStorage } from './transaction_id_middleware.js'

// The logger options: add appId and transactionId to each log
const options = {
  base: {
    pid: process.pid,
    hostname: os.hostname(),
    app: config.app
  },
  mixin () {
    let transactionId
    if (asyncLocalStorage.getStore()) {
      transactionId = asyncLocalStorage.getStore().get('transactionId')
    }
    return { transactionId: transactionId }
  }
}
// Add new options when in development
if (config.env === 'development') {
  options.level = 'debug'
  options.timestamp = pino.stdTimeFunctions.isoTime
  options.prettyPrint = { colorize: true }
}

// The logger destination: write on STDOUT and async
const destination = pino.destination({ sync: false })

// Create pino logger
export const logger = pino(options, destination)

// Create pino-http logger for Express
export const serverLogger = pinoHttp(options, destination)
