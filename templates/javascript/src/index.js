const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pug = require('pug');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hello World! Welcome to HTMX!',
  });
});
app.post('/click-me', (req, res) => {
  const clickedMarkup = pug.compileFile(
    path.join(__dirname, 'views/includes/clicked-label.pug')
  )();

  res.send(clickedMarkup);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('HTMX Javascript Server Running on PORT:3000');
});
