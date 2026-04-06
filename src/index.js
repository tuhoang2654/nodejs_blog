const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const { log } = require('console')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

//HTTP logger
app.use(morgan('combined'))

//template engine
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resources/views'))

console.log(__dirname);


app.get('/', (req, res) => {
  res.render('home')
})

app.get('/news', (req, res) => {
  res.render('news')
})

app.get('/search', (req, res) => {
  console.log(req.query.author);
  res.render('search')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
