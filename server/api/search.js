const express = require('express');
const router = express.Router();
const axios = require('axios');
const Songs = require('../db/models/songs.js')
// const io = require('../index.js')

const Spotify = require('machinepack-spotify');
require('../../secrets.js')

const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
const callback = process.env.SPOTIFY_CLIENT_REDIRECT;
const bearer = process.env.SPOTIFY_CLIENT_BEARER;
// const authUri = 'https://accounts.spotify.com/authorize';

module.exports = router;

let url = 'https://api.spotify.com/v1/search?q='

router.get('/artist', (req, res, next) => {
  let searchUrl = `${url}beatles&type=artist`

  console.log("req body in artist post", req.body, searchUrl);
  const sendData = {
    Host: 'api.spotify.com',
    Accept: 'application/json',
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${bearer}`
  }
  const authData = {
    authorization: `Bearer ${id}`
  };

  axios.get(searchUrl, sendData)
  .then(results => {
    console.log("SUCCESS!!!", results.data)
    res.json(results)
  })
  .catch(error => {
    console.log('SendData: ', sendData)
    console.log("error in search", error)
  })
})

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

