// Setup Associations
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Claim = sequelize.define("claim", {
  name_of_item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_claim: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resolution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Claim;
