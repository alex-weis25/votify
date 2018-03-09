'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
let request = require('request')
let querystring = require('querystring')
const path = require('path');
const db = require('./db/index.js');

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



///////

let redirect_uri =
process.env.REDIRECT_URI ||
'http://localhost:3000/callback'

app.get('/login', function(req, res) {
res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: 'user-read-private user-read-email',
    redirect_uri
  }))
})

app.get('/callback', function(req, res) {
let code = req.query.code || null
let authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  form: {
    code: code,
    redirect_uri,
    grant_type: 'authorization_code'
  },
  headers: {
    'Authorization': 'Basic ' + (new Buffer(
      process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
    ).toString('base64'))
  },
  json: true
}
request.post(authOptions, function(error, response, body) {
  var access_token = body.access_token
  let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
  res.redirect(uri + '?access_token=' + access_token)
})
})
////

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/index.html"))
});

const PORT = process.env.PORT || 3000;

db.sync().then(() => {
  console.log("syncing database...")
  app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Coming in HOT on port ${PORT}`);
  });
})


app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

