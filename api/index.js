import { Router } from 'express'
import status from './routes/status.js'

const router = Router()

// Export all api endpoints
router.use('/status', status)

export default router
