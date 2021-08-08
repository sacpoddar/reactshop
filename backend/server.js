import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

// allow to accept JSON in body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running.. ')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// these will not be called if above route handlers complete resquest/response cycle
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT | 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
