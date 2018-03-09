const express = require('express');
const router = express.Router();
const Songs = require('../db/models/songs.js')

module.exports = router;

router.get('/', (req, res, next) => {
  console.log("In queue GET!!!")
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

router.delete('/', (req, res, next) => {
  console.log("in the queue delete route")
})

router.put('/', (req, res, next) => {
  Songs.find({ where: {
    name: req.body.name
  }})
  .then(song => {
    let score = song.score + req.body.value;
    console.log("new score", score)
    return Songs.update(
      { score: score},
      { where: {name: req.body.name} })
  })
  .catch(next);
})

