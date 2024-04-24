const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const db = require('./db/connection')
const bodyParser = require('body-parser')
const Job = require('./models/Job')

const PORT = 3000

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }))

// handlebars
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', '.hbs')

// static folder
app.use(express.static(path.join(__dirname, 'public')))

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
  Job.findAll({ order: [['createdAt', 'DESC']] }).then((jobs) => {
    res.render('index', {
      jobs,
    })
  })
})

// job routes
app.use('/jobs', require('./routes/jobs'))
