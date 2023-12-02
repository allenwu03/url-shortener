const mongoose = require('mongoose')
const URL = require('../url')
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
  console.log('mongodb connected!')
  URL.create({
    originURL: `https://www.google.com/`,
    shortURL: `https://myproject/12fgw`
  })
  URL.create({
    originURL: `https://www.youtube.com/`,
    shortURL: `https://myproject/4t86j`
  })

  console.log('done')
})
