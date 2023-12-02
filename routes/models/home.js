const express = require('express')
const router = express.Router()

const url = require('../../models/url')

router.get('/', (req, res) => {
  url
    .find()
    .lean()
    .then((urls) => res.render('index', { urls }))
    .catch((error) => console.log(error))
})

module.exports = router
