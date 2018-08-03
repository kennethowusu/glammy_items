var express = require('express');
var router = express.Router();
var itemController = require('../controllers/itemsController');



//functions
const s3func = require('../functions/s3func');
//get all items


//create new item
router.post('/items',itemController.addNewItem);


//update item about
router.put('/items/:item_id/descriptions/about',itemController.updateAbout);

//update item ingredients
router.put('/items/:item_id/descriptions/ingredients',itemController.updateIngredients);

//update item how_to_use
router.put('/items/:item_id/descriptions/how_to_use',itemController.updateHow_to_use);

//update item images
router.put('/items/:item_id/descriptions/images',itemController.updateItemImages);


//create new item variant
router.get('/items/:item_id/variants/new',itemController.createNewVariant);

//create variant image
router.put('/items/:item_id/variants/:variant_id/images',itemController.updateVariantImages);

// delete item image
router.delete('/items/:item_id/descriptions/images',itemController.deleteItemImage);


//delete variant image
router.delete('/items/:item_id/variants/:variant_id/images',itemController.deleteVariantImage);

// router.put('/items/:item_id/variants/',itemController.create)

// router.put('/items/:item_id/descriptions/images',itemController.updateItemImages);
module.exports = router;
