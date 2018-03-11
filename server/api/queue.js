const express = require('express');
const router = express.Router();
const Songs = require('../db/models/songs.js');
const axios = require('axios');
require("../../secrets.js");

module.exports = router;

const user_id = "alex.weis25";
const playlist_id = "0yo2PnRNNFGN4TM5vLSg7u"; //For 'votify' playlist
const bearer = process.env.SPOTIFY_CLIENT_BEARER;


//Get songs in order
router.get('/', (req, res, next) => {
  Songs.findAll()
  .then(songs => {
    const updatedOrder = [];
    songs.map(song => {
      for(var i = 0; i< songs.length; i++){
        if(!updatedOrder[i] || song.score >= updatedOrder[i].score){
          updatedOrder.splice(i, 0, song);
          break;
        }
      }
    })
    return updatedOrder
  })
  .then(newList => {
    // console.log('newList: ', newList);
    res.json(newList);
  })
  .catch(next);
})

router.post('/', (req, res, next) => {
  console.log("in the queue post route")
})


//Send songs to spotify
router.delete('/', (req, res, next) => {
  Songs.findAll()
  .then(songs => {
    const updatedOrder = [];
    songs.map(song => {
      for(var i = 0; i< songs.length; i++){
        if(!updatedOrder[i] || song.score >= updatedOrder[i].score){
          updatedOrder.splice(i, 0, song);
          break;
        }
      }
    })
    return updatedOrder
  })
  .then(newList => {
    const topSong = {
      name: newList[0].name,
      artist: newList[0].artist,
      songId: newList[0].songId,
      score: newList[0].score
    }
    return topSong
  })
  .then(topSong => {
    const songUrl = topSong.songId || "1UGD3lW3tDmgZfAVDh6w7r";
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks?uris=spotify%3Atrack%3A${songUrl}`;
    console.log("add track url: ", url);
    axios({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`
      }
    })
    .catch(error => console.log(error))
    return topSong
  })
  .then(songToDelete => {
    // console.log("access to top song: ", songToDelete)
    return Songs.destroy({ where: {
      name: songToDelete.name
    }})
  })
  .then(deleted => {

    console.log("deleted from db: ", deleted)
  })
  .catch(next);
})





router.put('/', (req, res, next) => {
  console.log('in voted route')
  Songs.find({ where: {
    name: req.body.name
  }})
  .then(song => {
    let score = song.score + req.body.value;
    console.log("new score", score)
    Songs.update(
      { score: score},
      { where: {name: req.body.name} })
  })
  .then(() => {
    console.log('finished vote update')
    res.send('updated')
  })
  .catch(next);
})

