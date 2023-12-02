const mongoose = require('mongoose')
const URL = require('../url')
const shortenURL = require('../../utils/shortenURL')
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  let shortURL = shortenURL(5)
  console.log('mongodb connected!')
  URL.create({
    originURL: `https://www.google.com/`,
    shortURL: `https://myproject/${shortURL}`
  })
  shortURL = shortenURL(5)
  URL.create({
    originURL: `https://www.youtube.com/`,
    shortURL: `https://myproject/${shortURL}`
  })

  console.log('done')
})
