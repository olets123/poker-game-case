import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import pokerRoutes from './routes/pokerRoutes'
import dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/../.env' })

const mongoURI = process.env.MONGO_DB_URI

if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in the .env file')
}

const start = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
  }
}

start()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4000

app.use(cors())

app.use('/api', pokerRoutes)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})

export default app
