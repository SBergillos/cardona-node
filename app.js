// NPM Dependencies
import express from 'express'
import compression from 'compression'

// Loaders Dependencies
import { logger, serverLogger } from './loaders/logger.js'
import { transactionIdMiddleware } from './loaders/transaction_id_middleware.js'

// Configuration Dependencies
import config from './config/index.js'

// Routes Dependencies
import routes from './api/index.js'

logger.info('Starting Cardona')

// Create Express APP
logger.info('Starting Express app')
const app = express()

// Add Express Middlewares
logger.info('Adding middlewares to Express')
app.use(serverLogger)
app.use(transactionIdMiddleware)
app.use(compression())

// Mount API endpoints
logger.info('Mounting API endpoints to Express')
const baseEndpoint = config.api.prefix + config.api.version
app.use(baseEndpoint, routes)
app.get(baseEndpoint, (req, res) => {
  logger.info('Doing operation 1 of transaction X')
  logger.info('Doing operation 2 of transaction X')
  logger.info('Doing operation 3 of transaction X')
  res.send('Hello World!')
})

export default app
