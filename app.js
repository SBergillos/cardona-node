// NPM Dependencies
import express from 'express'
import compression from 'compression'

// Loaders Dependencies
import expressLoader from './loaders/express.js'

// Routes Dependencies
import statusRoutes from './api/routes/status.js'

const startApp = async () => {
  // Create Express APP
  const app = express()
  // Add gzip compression for optimization
  app.use(compression())

  // Mount API endpoints
  app.use('/status', statusRoutes)
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  // Wait for Loaders
  await expressLoader(app)
}

startApp()
