import express from 'express'
import router from './router'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5002
app.use(cors())
app.use(express.json())
app.use('/images', express.static('public/images'))
app.use('/api', router)

app.listen(PORT, () => {
 
})
