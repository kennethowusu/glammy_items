//models
const Item = require('../models/item_model');
const Description = require('../models/description_model');

//fucntions
const item = require('../functions/itemFunction');
require('dotenv').config();

//require .env
//for amazon s3
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

//create new new s3 instance
module.exports.s3 = new aws.S3({
 apiVersion: '2006-03-01',
 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
 secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})

module.exports.upload = multer({
  storage: multerS3({
    s3: module.exports.s3,
    bucket: process.env.S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

//add new item
module.exports.addNewItem = function(req, res, next) {

  const newItem = {
    id: item.generateId(),
    item_number: item.generateItemNumber(),
    name: req.body.name,
    main_category: req.body.main_category,
    sub_category: req.body.sub_category,
    category: req.body.category,
    original_price: req.body.original_price,
    price: req.body.price,
  }

  Item.sync({
      force: true
    })
    .then(() => {
      return Item.create({
        id: newItem.id,
        item_number: newItem.item_number,
        name: newItem.name,
        main_category: newItem.main_category,
        sub_category: newItem.sub_category,
        category: newItem.category,
        original_price: newItem.original_price,
        price: newItem.price
      })
    })
    .then(() => {
      Description.sync({
          force: true
        })
        .then((returnedItem) => {
          console.log(returnedItem);
          return Description.create({
            item_id: newItem.id
          })

        })
        .then((description) => {
          return res.send("item and its description created");
        })//descripton then
        .catch((err)=>{
          res.send(err);
        })//description catch
    })
    .catch(err => {
      return res.send(err);
    })



}

//update Item about
module.exports.updateAbout = (req,res,next)=>{
  const item_id = req.query.item_id;
  const about = req.query.about;

  Description.update({
    about : about,
  }, {
    where: {
      item_id : item_id
    }
  })
  .then(()=>{
      return res.send("Description about updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}


//update Item ingredients
module.exports.updateIngredients = (req,res,next)=>{
  const item_id = req.query.item_id;
  const ingredients = req.query.ingredients;

  Description.update({
    ingredients : ingredients,
  }, {
    where: {
      item_id : item_id
    }
  })
  .then(()=>{
      return res.send("Ingredients about updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}


//update Item how_to_use
module.exports.updateHow_to_use = (req,res,next)=>{
  const item_id = req.query.item_id;
  const how_to_use = req.query.how_to_use

  Description.update({
    how_to_use : how_to_use,
  }, {
    where: {
      item_id : item_id
    }
  })
  .then(()=>{
      return res.send("How to use about updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}




//update Item images
module.exports.updateItemImages = (req,res,next)=>{
// 
//   //get image
//   //get imgae file name
// console.log(process.env.AWS_ACCESS_KEY_ID);
// console.log(process.env.AWS_SECRET_ACCESS_KEY);
}
