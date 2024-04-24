const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

// detalhe da vaga
router.get('/view/:id', (req, res) => {
  Job.findOne({
    where: { id: req.params.id },
  })
    .then((job) => {
      res.render('view', {
        job,
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

// form da rota de envio
router.get('/add', (req, res) => {
  res.render('add')
})

// add job via post
router.post('/add', (req, res) => {
  const { title, salary, company, description, email, new_job } = req.body
  console.log(email)

  // insert
  Job.create({
    title,
    salary,
    company,
    description,
    email,
    new_job,
  })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
