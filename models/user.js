const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = User;
