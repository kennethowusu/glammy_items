const Sequelize = require('sequelize');
const sequelize = require('../classes/database');
const bcrypt = require('bcrypt');

require('dotenv').config();


const Image = sequelize.define(('image'),{

 image:{
   type:Sequelize.STRING
 }
})

module.exports = Image;
