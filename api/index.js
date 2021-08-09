// NPM Dependencies
import { Router } from 'express'

// Routes dependencies
import status from './routes/status.js'
import user from './routes/user.js'

const router = Router()

// Export all api endpoints
router.use('/status', status)
router.use('/user', user)

export default router
