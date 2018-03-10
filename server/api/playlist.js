const express = require("express");
const router = express.Router();
const axios = require("axios");
require("../../secrets.js");

module.exports = router;

//API requirements
const user_id = "alex.weis25";
const playlist_id = "0yo2PnRNNFGN4TM5vLSg7u"; //For 'votify' playlist
const bearer = process.env.SPOTIFY_CLIENT_BEARER;

router.get("/", (req, res, next) => {
  console.log("in the playlist get route");
});

//Add song to playlist on spotify
router.post("/", (req, res, next) => {
  const songUrl = req.body.songId || "1UGD3lW3tDmgZfAVDh6w7r";
  const url = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks?uris=spotify%3Atrack%3A${songUrl}`;
  console.log("add track url: ", url);
  console.log("Song reqbody ", req.body);
  axios({
    method: "POST",
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer BQBbZZKKtp8KAjDc3WsZPCSRsJjS_4L9LhvDnChy6EiVRVz301Vqw9KSeI8lnGSSLN8MaSOdQOR7i3Vh9umJ_Kdei0vaHRBhy_0CTBQartk-oCk-xi6wovo2Ovc6p6mq5knjHLfyKTgZQLu71fSQTVfmCut_XJErUt4N_RZY9lz1sdo0_uh1TJ5nwLYvTeabypg"
    }
  })
    .then(results => {
      console.log("SUCCESS!!!", results.data);
      res.json(results);
    })
    .catch(error => {
      console.log("error in search", error);
    });
});

router.delete("/", (req, res, next) => {
  console.log("in the playlist delete route");
});

router.put("/", (req, res, next) => {
  console.log("in the playlist put route");
});
