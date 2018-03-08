'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

module.exports = app;

// logging middleware
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

// 404 middleware
app.use((req, res, next) =>
path.extname(req.path).length > 0 ?
  res.status(404).send('Not found') :
  next()
);

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/index.html"))
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if(err) throw err;
  console.log(`Coming in HOT on port ${PORT}`);
});


app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
