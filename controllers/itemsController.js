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

//=====================GET ROUTES===================//




//GET ALL ITEMS
module.exports.getAllItems = (req,res,next)=>{
  Item.findAndCountAll()
  .then((items)=>{
     console.log(items);
     return res.render('index',{title: "Upload Items",items:items.rows,items_count:items.count});
  });
}

//GET NEW ITEM FORM
module.exports.getNewItemForm = (req,res,next)=>{
  return res.render('newitem',{title: "Add new Item"});
}

//GET MEW ITEM DESCRIPTION
module.exports.getNewItemDescription = (req,res,next)=>{
  const item_id = req.params.item_id;
  Item.find({
    where:{id:item_id},
    include:[
      {model:Image,where:{item_id:item_id},required:false},
      {model:Description,where:{item_id:item_id}}
    ]
  }).then((item)=>{
    console.log(item.description);
    return res.render('itemdescription',{title:"Item description",item_id:item_id,description:item.description,images:item.images });
  })


}


// //GET NEW VARIANT
module.exports.getVariantDescription = (req,res,next)=>{
  const item_id = req.params.item_id;
  const variant_id  = req.params.variant_id;
  Variant.findOne({
    where:{variant_id:variant_id},
    include:[
            {model:Variant_Image,where:{variant_id:variant_id},required:false}
          ]
  })
  .then((variant)=>{
    return res.render('variantdescription',{title:"Item Variant",variant:variant,images:variant.images,item_id:item_id});
  })

}

//GET ITEM VARIANTS
 module.exports.getItemVariants = (req,res,next)=>{
   const item_id = req.params.item_id;
   Item.find({
     where:{id:item_id},
     include:[
       {model:Variant,where:{item_id:item_id},required:false,
       include:[
         {model:Variant_Image}
       ]
     },
       {model:Description,where:{item_id:item_id}}

     ]
   }).then((item)=>{

     return res.render('variants',{title:`Variants|${item.name}`,item:item,item_id:item_id,variants:item.variants,variants_count:item.variants.length});

   })
 }
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
      force: false
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
          force: false
        })
        .then((returnedItem) => {
          console.log(returnedItem);
          return Description.create({
            item_id: newItem.id
          })

        })
        .then((description) => {
          return res.send({
            created: "yes",
            descriptionUrl:`/items/${newItem.id}/descriptions`
          });
        })//descripton then
        .catch((err)=>{
          res.send(err);
        })//description catch
    })
    .catch(err => {
      return res.redirect(err);
    })

}

//update Item about
module.exports.updateAbout = (req,res,next)=>{
  const item_id = req.params.item_id;
  const about = req.body.about;
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

module.exports.getEditItemDetail = (req,res,next)=>{
  const item_id =  req.params.item_id;
  Item.find({
    where:{id:item_id}
  }).then((item)=>{
    return res.render('edititemdetail',{title:"Edit Item Detail",item_id:item_id,item:item});
  })

}

//update Item ingredients
module.exports.updateIngredients = (req,res,next)=>{
  const item_id = req.params.item_id;
  const ingredients = req.body.ingredients;

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
  const item_id = req.params.item_id;
  const how_to_use = req.body.how_to_use

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
  const item_id =  req.params.item_id;

  s3func.upload(req,res,function(err,file){
    if(err){return res.send(err)};
   console.log(req.file)
    //if no error, store in image table
    Image.sync({force: false})
    .then(function(){
        return Image.create({
          item_id : item_id,
          image  : req.file.key
        })
    })
    .then(function(){
        return res.send(req.file.key);
    }).catch(function(err){
      return res.send(err);
    })

  })

}


//create new variant
module.exports.createNewVariant = (req,res,next)=>{
  const  item_id = req.params.item_id;
  const  variant_id = item.generateId();
  const  variant_num = item.generateItemNumber();

  Variant.sync({force: false})
  .then(()=>{
    return Variant.create({
       item_id : item_id,
       variant_id : variant_id,
       variant_num : variant_num
    })
    .then(()=>{
      return res.redirect(`/items/${item_id}/variants/${variant_id}`);
    })
    .catch((err)=>{
      return res.send(err);
    })
  })

}

//crate new variant image
module.exports.updateVariantImages = (req,res,next)=>{
  const item_id  = req.params.item_id;
  const variant_id = req.params.variant_id;
  s3func.upload(req,res,function(err,file){
    if(err){return res.send(err)};

    //if no error, store in image table
    Variant_Image.sync({force: false})
    .then(function(){
        return Variant_Image.create({
          item_id : item_id,
          variant_id : variant_id,
          image  : req.file.key
        })
    })
    .then(function(){
        return res.send(req.file.key);
    }).catch(function(err){
      return res.send(err);
    })

  })

}


//delete routes

//delete item image
module.exports.deleteItemImage = (req,res,next)=>{
  const image = req.body.image;
  const item_id = req.params.item_id;


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
  const image = req.body.image;
  const variant_id = req.params.variant_id;


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


//delete  item
module.exports.deleteItem = (req,res,next)=>{
    const item_id = req.params.item_id;



    //delete item
    Item.destroy({where:{id:item_id}})
    .then(function(){

    //delete item description

    Description.destroy({where:{item_id:item_id}})
    .then(function(){

    //get item images
    Image.findAll({where:{item_id:item_id}})
    .then((itemImages)=>{
      const images = [];
     itemImages.forEach((itemimages)=>{
       images.push(itemimages.image);
     });//foreach itemimages
      //convert images to a form required by amazon s3
     const imagesArray = [];
      images.forEach(function(image){
        imagesArray.push({"Key":image});
      })

      //delete all item images after finding them
      var params = {
       Bucket: process.env.S3_BUCKET,
       Delete: {
        Objects: imagesArray

       }
      };
      s3func.s3.deleteObjects(params, function(err, data){
        if(err){return res.send(err)
        }else{





                      //delete item images
                      Image.destroy({where:{item_id:item_id}}).
                      then(function(){


                        //delete variant images
                        const variantImages = [];
                        const variantImageArray = [];
                        Variant_Image.findAll({where:{item_id:item_id}})
                        .then(function(variantimages){

                           variantimages.forEach(function(variant){
                             variantImages.push(variant.image);
                           })

                           variantImages.forEach(function(variant_image){
                             variantImageArray.push({"Key":variant_image});
                           })
                           //delete all item images after finding them
                           var variant_params = {
                            Bucket: process.env.S3_BUCKET,
                            Delete: {
                             Objects: variantImageArray

                            }
                           };
                           s3func.s3.deleteObjects(variant_params, function(err, data){
                             if(err){return res.send(err);}

                          //delete variant images from database
                          Variant_Image.destroy({where:{item_id:item_id}})
                          .then(function(){

                            //delete variants from database;
                            Variant.destroy({where:{item_id:item_id}})
                            .then(function(){

                              return res.send("All done you can continue");

                            })



                          })



                    })

                      })
                      .catch(function(err){

                      })//catch delete Image
                    })











    }//s3func else

      })//s3func.s3
    })
    .catch(()=>{
      return res.send(err);
    })


    })//description
    })

}


//delete variant
module.exports.deleteVariant  = (req,res,next)=>{
  const variant_id = req.params.variant_id;


  Variant_Image.findAll({where:{variant_id:variant_id}})
  .then(function(variantimages){
      const variantImages = [];
      const imagesArray = [];
      variantimages.forEach(function(vimages){
        variantImages.push(vimages.image);

      })//forEach

      variantImages.forEach(function(vImages){
        imagesArray.push({"Key":vImages});
      })

      return imagesArray;
  })
  .then(function(returnedvariantimages){
    //images founded and s3 format created
    //delete variant images
      Variant_Image.destroy({where:{variant_id:variant_id}})
      .then(function(){
          //delete variant
          Variant.destroy({where:{variant_id:variant_id}})
          .then(function(){

            //delete from se
            const params = {
             Bucket: process.env.S3_BUCKET,
             Delete: {
              Objects: returnedvariantimages
             }};


             s3func.s3.deleteObjects(params, function(err, data){
               if(err){return res.send(err)
               }else{
                 return res.send("All done");
             }
           })//s3func
          })//variant destroy



      })//variant image
    //delete images
    //delete from s3


  })

}

//============UPDATE ITEM==========================//
//update Item price
module.exports.updateItemName = (req,res,next)=>{
  const item_id = req.params.item_id;
  const name = req.body.name;

  Item.update({
    name : name,
  }, {
    where: {
      id : item_id
    }
  })
  .then(()=>{
      return res.send("Price updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })

}


//update Item price
module.exports.updateItemPrice = (req,res,next)=>{
  const item_id = req.params.item_id;
  const price = req.body.price;

  Item.update({
    price : price,
  }, {
    where: {
      id : item_id
    }
  })
  .then(()=>{
      return res.send("Price to use about updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}


//update Item original_price
module.exports.updateItemOriginalPrice = (req,res,next)=>{
  const item_id = req.params.item_id;
  const original_price = req.body.original_price

  Item.update({
    original_price :original_price,
  }, {
    where: {
      id : item_id
    }
  })
  .then(()=>{
      return res.send("original_price to use about updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}

//update Item main_category
module.exports.updateItemMaincategory = (req,res,next)=>{
  const item_id = req.params.item_id;
  const main_category = req.query.main_category

  Item.update({
    main_category : main_category,
  }, {
    where: {
      id : item_id
    }
  })
  .then(()=>{
      return res.send("original_price to use about updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}



//update Item sub_category
module.exports.updateItemSubcategory = (req,res,next)=>{
  const item_id = req.params.item_id;
  const sub_category = req.query.sub_category;

  Item.update({
    sub_category : sub_category,
  }, {
    where: {
      id : item_id
    }
  })
  .then(()=>{
      return res.send("original_price to use about updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}


//update Item sub_category
module.exports.updateItemCategory = (req,res,next)=>{
  const item_id = req.params.item_id;
  const category = req.query.category;

  Item.update({
    category : category,
  }, {
    where: {
      id : item_id
    }
  })
  .then(()=>{
      return res.send("Category  updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}




//activate item
module.exports.activateItem = (req,res,next)=>{
  const item_id = req.params.item_id;
  Item.update({
    is_active : "yes",
  }, {
    where: {
      id : item_id
    }
  })
  .then(()=>{
      return res.send("Item activated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}




//activate item
module.exports.deactivateItem = (req,res,next)=>{
  const item_id = req.params.item_id;
  Item.update({
    is_active : "no",
  }, {
    where: {
      id : item_id
    }
  })
  .then(()=>{
      return res.send("Item deactivated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}
//=================UPDATE ITEM DONE==============//

//==================UPDATE VARIANT ==============//

module.exports.updateVariantName = (req,res,next)=>{
  const variant_id = req.params.variant_id;
  const name = req.body.name;

  Variant.update({
    name : name,
  }, {
    where: {
      variant_id : variant_id
    }
  })
  .then(()=>{
      return res.send("Variant Name updated successfully");
    }).catch((err)=>{
      return res.send(err);
    });
}

//update variant color
module.exports.updateVariantColor = (req,res,next)=>{
  const variant_id = req.params.variant_id;
  const color = req.body.color;

  Variant.update({
    color : color,
  }, {
    where: {
      variant_id : variant_id
    }
  })
  .then(()=>{
      return res.send("Variant Color updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })

}


//update variant color type
module.exports.updateVariantColortype = (req,res,next)=>{
  const variant_id = req.params.variant_id;
  const color_type = req.body.color_type;

  Variant.update({
    color_type : color_type,
  }, {
    where: {
      variant_id : variant_id
    }
  })
  .then(()=>{
      return res.send("Variant Color type  updated successfully");
    }).catch((err)=>{
      return res.send(err);
    })
}


//activate variant
module.exports.activateVariant = (req,res,next)=>{
  const variant_id = req.params.variant_id;

  Variant.update({
    is_active : "yes",
  }, {
    where: {
      variant_id : variant_id
    }
  })
  .then(()=>{
      return res.send("Variant successfully activated");
    }).catch((err)=>{
      return res.send(err);
    })
}

//activate variant
module.exports.deactivateVariant = (req,res,next)=>{
  const variant_id = req.params.variant_id;

  Variant.update({
    is_active : "no",
  }, {
    where: {
      variant_id : variant_id
    }
  })
  .then(()=>{
      return res.send("Variant successfully deactivated");
    }).catch((err)=>{
      return res.send(err);
    })
}
