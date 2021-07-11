const express = require('express')
require('dotenv').config()

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(process.env.DB_URI)
})

app.listen(process.env.PORT ||port, () => {
  console.log(process.env.DB_URI)
})