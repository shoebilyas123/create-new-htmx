import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('HTMX Javascript Server Running on PORT:3000');
});
