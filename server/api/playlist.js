const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
  console.log("in the playlist get route")
})

router.post('/', (req, res, next) => {
  console.log("in the playlist post route")
})

router.delete('/', (req, res, next) => {
  console.log("in the playlist delete route")
})

router.put('/', (req, res, next) => {
  console.log("in the playlist put route")
})
