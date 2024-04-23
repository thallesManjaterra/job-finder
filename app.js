const express = require('express')
const app = express()
const db = require('./db/connection')
const bodyParser = require('body-parser')

const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(PORT, () => {
  console.log(`O Express está rodando na porta ${PORT}`)
})

// db connection
db.authenticate()
  .then(() => {
    console.log('Conectou banco com succeeso')
  })
  .catch((err) => {
    console.log('Ocorreu um erro ao connectar', err)
  })

// routes
app.get('/', (req, res) => {
  res.send('Está funcionando')
})

// job routes
app.use('/jobs', require('./routes/jobs'))
