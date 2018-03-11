const express = require("express");
const router = express.Router();
const axios = require("axios");
require("../../secrets.js");

module.exports = router;

//API requirements
const user_id = "alex.weis25";
const playlist_id = "0yo2PnRNNFGN4TM5vLSg7u"; //For 'votify' playlist
const bearer = process.env.SPOTIFY_CLIENT_BEARER;

//Get playlist
router.get("/playlist", (req, res, next) => {
  axios({
    method: "GET",
    url: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        `Bearer ${bearer}`
    }
  })
  .then(playlist => {
    // console.log('Votify playlist: ', playlist.data)
    res.status(200).send(playlist.data);
  })
  .catch(next);
});

//Get current track
router.get("/currentTrack", (req, res, next) => {
  axios({
    method: "GET",
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    headers: {
      "Content-Type": "application/json",
      Authorization:
        `Bearer ${bearer}`
    }
  })
  .then(playlist => {
    // console.log('Votify playlist: ', playlist.data)
    res.status(200).send(playlist.data);
  })
  .catch(next);
});



//Add song to playlist on spotify
// router.post("/", (req, res, next) => {
//   const songUrl = req.body.songId;
//   const url = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks?uris=spotify%3Atrack%3A${songUrl}`;
//   console.log("add track url: ", url);
//   console.log("Song reqbody ", req.body);
//   axios({
//     method: "POST",
//     url: url,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//       `Bearer ${bearer}`
//     }
//   })
//     .then(results => {
//       console.log("SUCCESS!!!", results.data);
//       res.json(results);
//     })
//     .catch(error => {
//       console.log("error in search", error);
//     });
// });

router.delete("/", (req, res, next) => {
  console.log("in the playlist delete route");
});

router.put("/", (req, res, next) => {
  console.log("in the playlist put route");
});
