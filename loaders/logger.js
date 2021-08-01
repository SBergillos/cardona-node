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
  level: config.log.level,
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

// The logger destination: write on STDOUT and async
const destination = pino.destination({
  sync: true
})

// Add new options or destination when in development
if (config.env === 'development') {
  options.timestamp = pino.stdTimeFunctions.isoTime
  options.prettyPrint = { colorize: true }
}

// Add new options or destination when in production
if (config.env === 'production') {
  destination.minLength = 4096
}

// Create pino logger
export const logger = pino(options, destination)

// Create pino-http logger for Express
export const serverLogger = pinoHttp(options, destination)

// asynchronously flush every 10 seconds to keep the buffer empty
// in periods of low activity
setInterval(function () {
  logger.flush()
}, 10000).unref()

// use pino.final to create a special logger that
// guarantees final tick writes
const handler = pino.final(logger, (error, finalLogger, event) => {
  finalLogger.info(
    event + " caught on pino.final to make sure to flush all logs' registries")
  if (error) finalLogger.fatal(error, 'error caused exit')
  process.exit(error ? 1 : 0)
})

// catch all the ways node might exit
process.on('beforeExit', () => handler(null, 'beforeExit'))
process.on('exit', () => handler(null, 'exit'))
process.on('uncaughtException', (err) => handler(err, 'uncaughtException'))
process.on('unhandledRejection', () => handler(null, 'unhandledRejection'))
process.on('SIGINT', () => handler(null, 'SIGINT'))
process.on('SIGQUIT', () => handler(null, 'SIGQUIT'))
process.on('SIGTERM', () => handler(null, 'SIGTERM'))
