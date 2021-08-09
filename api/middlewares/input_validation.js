// NPM Dependencies
import createHttpError from 'http-errors'

// Input validation middleware
const inputValidation = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
      throw createHttpError.BadRequest(error.message)
    }
    res.locals.value = value
    next()
  }
}

export default inputValidation
