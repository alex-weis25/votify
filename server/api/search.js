const express = require('express');
const router = express.Router();
const axios = require('axios');
const Songs = require('../db/models/songs.js')

require('../../secrets.js')

const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
const callback = process.env.SPOTIFY_CLIENT_REDIRECT;
const bearer = process.env.SPOTIFY_CLIENT_BEARER;
// const authUri = 'https://accounts.spotify.com/authorize';

module.exports = router;

let url = 'https://api.spotify.com/v1/search?q='


router.post('/', (req, res, next) => {
  console.log('in post route:', req.body)
  Songs.create(req.body)
  .then(created => {
    res.json(created.data)
    // console.log('io: ', io)
    // io.emit('addSong')
  })
  .catch(next);
})

