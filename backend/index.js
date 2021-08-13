const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
require('./config/mongodb')


app.db = db
app.mongoose = mongoose

consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./schedule')
  .then('./config/routes.js')
  .into(app)

app.get('/', (req, res) => {
  res.send('Hello World')
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Servidor Executando na Porta ' + PORT))