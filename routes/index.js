var express = require('express');
var router = express.Router();
var itemController = require('../controllers/itemsController');


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


module.exports = router;
