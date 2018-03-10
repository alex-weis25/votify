const Sequelize = require('sequelize');
const db = require('../db')

const Queue = db.define('queue', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING
  },
  albumImg: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Queue;
