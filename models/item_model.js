const Sequelize = require('sequelize');
const sequelize = require('../classes/database');
const bcrypt = require('bcrypt');

require('dotenv').config();
//models

const Description = require('../models/description_model');
const Image = require('./images_model');
const Variant = require('./variant_model');
const Variant_Image = require('./variant_image_model');
const Video = require('./video_model');

const Item = sequelize.define(('item'),{

  id:{
    type:Sequelize.STRING,
    primaryKey:true
  },
  item_number : {
    type: Sequelize.INTEGER,
    primaryKey : true
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  main_category :{
    type:Sequelize.STRING,
    allowNull:false
  },
  sub_category:{
    type:Sequelize.STRING,
    allowNull:false
  },
  category:{
    type:Sequelize.STRING,
    allowNull:false
  },
  price:{
    type:Sequelize.STRING,
    allowNull:false
  },
  original_price:{
    type:Sequelize.STRING,
    allowNull:false
  },
  is_active:{
    type:Sequelize.STRING,
    allowNull:false,
    defaultValue:"no"
  }
})


Item.hasOne(Description, {foreignKey: 'item_id', sourceKey: 'id'});
Item.hasMany(Image,{foreignKey:"item_id"});
Item.hasMany(Variant,{foreignKey:"item_id"});
Item.hasMany(Variant_Image,{foreignKey:"item_id"});
module.exports = Item;
