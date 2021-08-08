// NPM Dependencies
import { RateLimiterMemory } from 'rate-limiter-flexible'
import createHttpError from 'http-errors'

// Loader dependencies
import { logger } from './logger.js'

// Rate limiter options
// Points: number of HTTP requests
// Duration: size of the fixed window in seconds
const opts = {
  points: 6,
  duration: 1
}

// Create rate limiter
const rateLimiter = new RateLimiterMemory(opts)

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then((rateLimiterRes) => {
      res.set('X-RateLimit-Limit', opts.points)
      res.set('X-RateLimit-Remaining', rateLimiterRes.remainingPoints)
      res.set('X-RateLimit-Reset',
        new Date(Date.now() + rateLimiterRes.msBeforeNext))
      next()
    })
    .catch((rateLimiterRes) => {
      res.set('Retry-After', rateLimiterRes.msBeforeNext / 1000)
      logger.warn({
        ip: req.ip, 
        msg: 'Has exceded the number of requests allowed'
      })
      next(createHttpError.TooManyRequests('Too many requests!'))
    })
}

export default rateLimiterMiddleware
