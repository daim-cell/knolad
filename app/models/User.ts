// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/Database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'teacher', 'student'),
    defaultValue: 'student'
  }
});

module.exports = User;
