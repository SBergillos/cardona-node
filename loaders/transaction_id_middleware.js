// NPM Dependencies
import { AsyncLocalStorage } from 'async_hooks'
import { v4 as uuidv4 } from 'uuid'

export const asyncLocalStorage = new AsyncLocalStorage()

// Set incoming requests TransactionId
export const transactionIdMiddleware = (req, res, next) => {
  // The first asyncLocalStorage.run argument is the initialization of the store state, the second argument is the function that has access to that store
  asyncLocalStorage.run(new Map(), () => {
    // Try to extract the TransactionId from the request header, or generate a new one if it doesn't exist
    const transactionId = req.get('x-transaction-id') || uuidv4()

    // Set the TransactionId inside the store and as a response header
    asyncLocalStorage.getStore().set('transactionId', transactionId)
    res.set('X-Transaction-Id', transactionId)
    next()
  })
}
