// NPM community 'express' package: Fast, minimalist web framework for Nodejs.
import express from 'express'

// Create an express router.
const router = express.Router()

router.get('/', async (req, res) => {
  return res.status(200).send('OK!')
})

router.head('/', (req, res) => {
  return res.status(200).end()
})

export default router
