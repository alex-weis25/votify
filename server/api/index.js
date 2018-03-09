const express = require('express');
const router = express.Router();
const axios = require('axios');

require('../../secrets.js')

module.exports = router;

const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
const callback = process.env.SPOTIFY_CLIENT_REDIRECT;
const authUri = 'https://accounts.spotify.com/authorize';

// router.use('/', (req, res, next) => {
//   axios.get(`${authUri}?client_id=${id}&response_type=code&redirect_uri=${callback}`)
//   .then(results => {
//     // console.log(results)
//     console.log('log in successful')
//   })
//   .then(next)
//   .catch(error => console.log("error: ", error))
// })


router.use('/users', require('./users'));
router.use('/playlist', require('./playlist'));
router.use('/search', require('./search'));
router.use('/queue', require('./queue'));

// router.use('*', (req, res, next, err) => {
//   console.log(err);
// })
