const express = require('express')
require('dotenv').config()
const dbConfig = require('./dbConfig')
const route = require('./routes')


const app = express()
const port = 8000
app.use(express.json())

dbConfig()
app.use(route)


app.listen(port, () => {
  console.log(`server is running`)
})
