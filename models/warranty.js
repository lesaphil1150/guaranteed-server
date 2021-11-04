// create individual files for your models and import them here

// Setup Associations

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Warranty = sequelize.define("warranty", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_purchased: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  warranty_expiration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serial_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receipt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Warranty;
