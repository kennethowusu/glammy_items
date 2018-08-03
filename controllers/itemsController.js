//models
const Item = require('../models/item_model');
const Description = require('../models/description_model');
const Image = require('../models/images_model');
const Variant = require('../models/variant_model');
const Variant_Image = require('../models/variant_image_model');

const item = require('../functions/itemFunction');



const s3func = require('../functions/s3func');


//require dot env
require('dotenv').config();
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
  const item_id =  req.query.item_id;

  s3func.upload(req,res,function(err,file){
    if(err){return res.send(err)};

    //if no error, store in image table
    Image.sync({force:true})
    .then(function(){
        return Image.create({
          item_id : item_id,
          image  : req.file.key
        })
    })
    .then(function(){
        return res.send(`Image has been uploaded successfully and the file name is ${req.file.key}`);
    }).catch(function(err){
      return res.send(err);
    })

  })
}


//create new variant
module.exports.createNewVariant = (req,res,next)=>{
  const  item_id = req.query.item_id;
  const  variant_id = item.generateId();
  const  variant_num = item.generateItemNumber();

  Variant.sync({force:true})
  .then(()=>{
    return Variant.create({
       item_id : item_id,
       variant_id : variant_id,
       variant_num : variant_num
    })
    .then(()=>{
      return res.send("Variant created successfully");
    })
    .catch((err)=>{
      return res.send(err);
    })
  })

}

//crate new variant image
module.exports.updateVariantImages = (req,res,next)=>{
  const variant_id = req.query.variant_id;
  s3func.upload(req,res,function(err,file){
    if(err){return res.send(err)};

    //if no error, store in image table
    Variant_Image.sync({force:true})
    .then(function(){
        return Variant_Image.create({
          variant_id : variant_id,
          image  : req.file.key
        })
    })
    .then(function(){
        return res.send(`Varinat Image has been uploaded successfully and the file name is ${req.file.key}`);
    }).catch(function(err){
      return res.send(err);
    })

  })

}


//delete routes

//delete item image
module.exports.deleteItemImage = (req,res,next)=>{
  const image = req.query.image;
  const item_id = req.query.item_id;


 const  params = {
  Bucket: process.env.S3_BUCKET,
  Key: image
 };

 s3func.s3.deleteObject(params, function(err, data) {
  if(err){
    return res.send(err);
  }else{
    Image.destroy({where:{item_id:item_id,image:image}})
    .then(()=>{
      return res.send("Image successfully deleted");
    })
  }
});

}


//delete item image
module.exports.deleteVariantImage = (req,res,next)=>{
  const image = req.query.image;
  const variant_id = req.query.variant_id;


 const  params = {
  Bucket: process.env.S3_BUCKET,
  Key: image
 };

 s3func.s3.deleteObject(params, function(err, data) {
  if(err){
    return res.send(err);
  }else{
    Variant_Image.destroy({where:{variant_id:variant_id,image:image}})
    .then(()=>{
      return res.send(" Variant Image successfully deleted");
    })
  }
});

}
