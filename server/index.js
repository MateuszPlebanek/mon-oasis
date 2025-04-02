const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

const plantsRoutes = require('./routes/plants')

app.use(cors())
app.use(express.json())

app.use('/images', express.static('public/images'))

app.use('/api/plants', plantsRoutes)

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`)
})
