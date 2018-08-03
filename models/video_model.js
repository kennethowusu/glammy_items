const Sequelize = require('sequelize');
const sequelize = require('../classes/database');
const bcrypt = require('bcrypt');

require('dotenv').config();


const Video = sequelize.define(('video'),{

 video:{
   type:Sequelize.STRING
 }
})

module.exports = Video;
