const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const codeGenerator = require('../../tools/codeGenerator')
const hostUrl = process.env.mainUrl || 'http://localhost:3000/'

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:shortCode', (req, res) => {
  const shortCode = req.params.shortCode
  Url.findOne({ shortCode })
    .lean()
    .then(url => {
      if (url) {
        res.redirect(url.originalUrl)
      } else {
        res.render('index', { shortCode })
      }
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const originalUrl = req.body.fullUrl

  Url.find()
    .lean()
    .then(allUrls => {
      //檢查網址是否存在
      const existUrl = allUrls.filter(eachUrl => eachUrl.originalUrl === originalUrl)
      if (existUrl.length === 1) {
        shortCode = existUrl[0].shortCode
      } else {
        shortCode = codeGenerator()
        shortUrl = hostUrl + shortCode
        //檢查short code 是否存在
        while (allUrls.some(eachUrl => eachUrl.shortCode === shortCode)) {
          shortCode = codeGenerator()
          shortUrl = hostUrl + shortCode
        }
        Url.create({ originalUrl, shortUrl, shortCode })
      }
    })
    .then(() => res.render('success', { shortUrl }))
    .catch(error => console.log(error))
})

module.exports = router