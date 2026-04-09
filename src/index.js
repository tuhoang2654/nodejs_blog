const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const { log } = require('console')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

//XMLHttpRequest, fetch, axios

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
  res.render('search')
})

app.post('/search', (req, res) => {
  console.log("result " + req.body.gender);
  
  res.send('')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
