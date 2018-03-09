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
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Songs;
