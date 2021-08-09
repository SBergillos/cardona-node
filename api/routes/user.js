// NPM dependencies
import { Router } from 'express'

// Schema dependencies
import {
  userCreationSchema,
  userLoginSchema
} from '../schemas/user.js'

// Middleware dependencies
import validateInput from '../middlewares/input_validation.js'

const router = Router()

// Create user account
router.post('/register', validateInput(userCreationSchema), (req, res) => {
  return res.status(200).send('user creation validated')
})

// Login user
router.post('/login', validateInput(userLoginSchema), (req, res) => {
  return res.status(200).send('user login validated')
})

export default router
