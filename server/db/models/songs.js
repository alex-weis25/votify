const Sequelize = require('sequelize');
const db = require('../db')

const Songs = db.define('songs', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING
  },
  songId: {
    type: Sequelize.TEXT
  },
  albumImg: {
    type: Sequelize.TEXT
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Songs;
