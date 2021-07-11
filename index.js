const express = require('express')
require('dotenv').config()

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! Changed')
})

app.listen(process.env.PORT ||port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})