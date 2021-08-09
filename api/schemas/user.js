// NPM Dependencies
import Joi from 'joi'

// Definition of user's schemas
export const userCreationSchema = Joi.object({
  username: Joi.string()
    .trim()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .trim()
    .email({
      tlds: { allow: false }
    })
    .required(),
  password: Joi.string()
    .min(8)
    .required()
})

export const userLoginSchema = Joi.object({
  username: Joi.string()
    .trim(),
  email: Joi.string()
    .trim()
    .email({
      tlds: { allow: false }
    }),
  password: Joi.string()
    .required()
})
  .xor('username', 'email')
