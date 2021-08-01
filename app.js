// NPM Dependencies
import express from 'express'
import compression from 'compression'
import createHttpError from 'http-errors'
import helmet from 'helmet'

// Loaders Dependencies
import { logger, serverLogger } from './loaders/logger.js'
import { transactionIdMiddleware } from './loaders/transaction_id_middleware.js'
import errorHandler from './loaders/error.js'

// Configuration Dependencies
import config from './config/index.js'

// Routes Dependencies
import routes from './api/index.js'

logger.info('Starting Cardona')

// Create Express APP
logger.info('Starting Express app')
const app = express()

// Enable trust proxy
app.enable('trust proxy')

// Add Express Middlewares
logger.info('Adding middlewares to Express')
app.use(helmet())
app.use(serverLogger)
app.use(transactionIdMiddleware)
app.use(compression())

// Mount API endpoints
logger.info('Mounting API endpoints to Express')
const baseEndpoint = config.api.prefix + config.api.version
app.use(baseEndpoint, routes)
app.get(baseEndpoint + '/error', (req, res, next) => {
  Promise.resolve().then(function () {
    throw createHttpError.InternalServerError("That's not supposed to happen!")
  }).catch(next)
})
app.get(baseEndpoint + '/goodbye', (req, res, next) => {
  throw Error('Goodbye World!')
})

// When no API endpoint is called, return an HTTP 404
app.use(function (req, res, next) {
  throw createHttpError.NotFound("The URL doesn't exist!")
})

// Custom error handler
app.use(function (err, req, res, next) {
  errorHandler(err, res)
})

export default app
