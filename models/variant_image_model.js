const Sequelize = require('sequelize');
const sequelize = require('../classes/database');
const bcrypt = require('bcrypt');

require('dotenv').config();


const Variant_Image = sequelize.define(('variant_image'),{

 image:{
   type:Sequelize.STRING
 }
})

module.exports = Variant_Image;
