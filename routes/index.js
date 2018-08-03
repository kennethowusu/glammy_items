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

// router.put('/items/:item_id/variants/',itemController.create);

//delete item
router.delete('/items/:item_id',itemController.deleteItem);


//update items

//update item price
router.put('/items/:item_id/name',itemController.updateItemName);

//update item price
router.put('/items/:item_id/price',itemController.updateItemPrice);

//update item orignal price
router.put('/items/:item_id/original_price',itemController.updateItemOriginalPrice);


//update item main category
router.put('/items/:item_id/main_category',itemController.updateItemMaincategory);

//update item main category
router.put('/items/:item_id/sub_category',itemController.updateItemSubcategory);

//update item category
router.put('/items/:item_id/category',itemController.updateItemCategory);

//activate item
router.put('/items/:item_id/activate',itemController.activateItem);

//deactivate item
router.put('/items/:item_id/deactivate',itemController.deactivateItem);

// router.put('/items/:item_id/descriptions/images',itemController.updateItemImages);
module.exports = router;
