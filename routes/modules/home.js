const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const codeGenerator = require('../../tools/codeGenerator')

// router.use(jc)

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const original = req.body.fullUrl
  let shorten = 'shorten1'
  let short = 'short1'

  Url.find()
    .lean()
    .then(() => {
      let short = ''
      short = codeGenarator()
    })


  Url.create({ original, shorten, short })

    .then(() => res.render('index'))
    .catch(error => console.log(error))
})

function jc(req, res, next) {
  shortenCode = codeGenerator()
  console.log('original', shortenCode)
  next()
}

module.exports = router