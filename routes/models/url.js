const express = require('express')
const router = express.Router()
const url = require('../../models/url')

router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增
router.post('/', (req, res) => {
  const origin_url = req.body.origin_url
  return url
    .create({ origin_url }) //存入資料庫
    .then(() => res.redirect('/urls/new'))
    .catch((error) => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return url
    .findById(id)
    .lean()
    .then((url) => res.render('edit', { url }))
    .catch((error) => console.log(error))
})

module.exports = router
