const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const URL = require('./models/url')
const shortenURL = require('./utils/shortenURL')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  if (!req.body.url) {
    return res.redirect('/')
  }

  const shortURL = shortenURL(5)
  URL.findOne({ originalURL: req.body.url })
    .then((data) =>
      data ? data : URL.create({ shortURL, originURL: req.body.url })
    )
    .then((data) =>
      res.render('index', {
        origin: req.headers.origin,
        shortURL: data.shortURL
      })
    )
    .catch((error) => console.error(error))
})

app.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params
  URL.findOne({ shortURL })
    .then((data) => {
      if (!data) {
        return res.render('error', {
          errorMsg: "Can't found the URL",
          errorURL: req.header.host + '/' + shortURL
        })
      }
      res.redirect(data.originalURL)
    })
    .catch((error) => console.error(error))
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
