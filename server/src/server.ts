import express from 'express'
import router from './router'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5002

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())
app.use('/images', express.static('public/images'))
app.use('/api', router)

if (process.env.NODE_ENV !== 'production') {
  console.info(`✅ Serveur lancé sur http://localhost:${PORT}`)
}

app.listen(PORT)
