const express = require('express')
const dbConfig = require('./dbConfig')
const app = express()
const port = 3000
app.use(express.json())
require('dotenv').config()
dbConfig()


app.listen(port, () => {
  console.log(`server is running`)
})
