const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/plantList.json')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier plantList.json:', err)
      return res.status(500).json({ error: 'Erreur serveur' })
    }

    try {
      const plants = JSON.parse(data)
      res.json(plants)
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError)
      res.status(500).json({ error: 'Erreur de format JSON' })
    }
  })
})

module.exports = router
