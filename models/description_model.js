const Sequelize = require('sequelize');
const sequelize = require('../classes/database');
const bcrypt = require('bcrypt');

require('dotenv').config();


const Description = sequelize.define(('description'),{

  about:{
    type:Sequelize.TEXT
  },
  ingredients:{
    type:Sequelize.TEXT
  },
  how_to_use:{
    type:Sequelize.TEXT
  }

})

module.exports = Description;
