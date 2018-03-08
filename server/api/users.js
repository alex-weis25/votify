const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
  console.log("in the users get route")
})

router.post('/', (req, res, next) => {
  console.log("in the users post route")
})

router.delete('/', (req, res, next) => {
  console.log("in the users delete route")
})

router.put('/', (req, res, next) => {
  console.log("in the users put route")
})
