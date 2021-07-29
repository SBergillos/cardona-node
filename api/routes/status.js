// NPM dependencies
import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  return res.status(200).send('OK!')
})

router.head('/', (req, res) => {
  return res.status(200).end()
})

export default router
