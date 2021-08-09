// NPM Dependencies
import createHttpError from 'http-errors'

// Loader Dependencies
import { logger } from './logger.js'

// Custom Error handler
const errorHandler = (err, res) => {
  // If it is not an HttpError, it probably is an unexpected error due a bug
  // so the best way to deal with it, it's to log the error and crash the app
  if (!createHttpError.isHttpError(err)) {
    logger.fatal(err)
    process.exit(1)
  }

  // Log the api error as a warning
  logger.warn(err)

  // Return the error response to the client.
  return res.status(err.statusCode).send({
    name: err.name,
    message: err.message
  })
}

export default errorHandler
