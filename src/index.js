const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const { log } = require('console');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//XMLHttpRequest, fetch, axios

//HTTP logger
app.use(morgan('combined'));

//template engine
app.engine(
  'handlebars', 
  handlebars.engine({
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
