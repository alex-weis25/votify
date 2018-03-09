const Sequelize = require("sequelize");
const databaseName = "votify";

const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
  logging: false
});
module.exports = db;
