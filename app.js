// NPM Dependencies
import express from 'express'
import compression from 'compression'
import createHttpError from 'http-errors'
import helmet from 'helmet'

// Loaders Dependencies
import { logger, serverLogger } from './loaders/logger.js'
import { transactionIdMiddleware } from './loaders/transaction_id_middleware.js'
import errorHandler from './loaders/error_handler.js'
import rateLimiterMiddleware from './loaders/rate_limiter.js'

// Configuration Dependencies
import config from './config/index.js'

// Routes Dependencies
import routes from './api/index.js'

// API base endpoint
const baseEndpoint = config.api.prefix + config.api.version

// Start APP
logger.info("Starting 'cardona-node'")

// Create Express APP
logger.info('Starting Express app')
const app = express()

// Enable trust proxy
app.enable('trust proxy')

// Add Express Middlewares
logger.info('Adding middlewares to Express')
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      'default-src': ["'none'"],
      'frame-ancestors': ["'self'"],
      'script-src': ["'self'"],
      'style-src': ["'self'"],
      'img-src': ["'self'"],
      'connect-src': ["'self'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'upgrade-insecure-requests': [],
      'block-all-mixed-content': []
    }
  }
}))
app.use(express.json())
app.use(transactionIdMiddleware)
app.use(baseEndpoint, rateLimiterMiddleware)
app.use(compression())
app.use(serverLogger)

// Mount API endpoints
logger.info('Mounting API endpoints to Express')
app.use(baseEndpoint, routes)

// When no API endpoint is called, return an HTTP 404
app.use(function (req, res, next) {
  throw createHttpError.NotFound("The URL doesn't exist!")
})

// Custom error handler
app.use(function (err, req, res, next) {
  errorHandler(err, res)
})

export default app
