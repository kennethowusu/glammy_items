const Sequelize = require('sequelize');
const sequelize = require('../classes/database');
const bcrypt = require('bcrypt');
const Variant_Image = require('../models/variant_image_model');

require('dotenv').config();


const Variant = sequelize.define(('variant'),{

 variant_id : {
   type:Sequelize.STRING,
   primaryKey:true
 },
 variant_num :{
   type:Sequelize.STRING,
   allowNull:false,
   unique:true
 },
 name:{
   type:Sequelize.STRING

 },
 color:{
   type:Sequelize.STRING

 },
 color_type:{
   type:Sequelize.STRING

 },
 is_active:{
   type:Sequelize.STRING,
   allowNull:false,
   defaultValue : "no"
 }
})

Variant.hasMany(Variant_Image,{sourceKey:"variant_id",foreignKey:'variant_id'})
module.exports = Variant;
