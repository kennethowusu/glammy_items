var express = require('express');
var router = express.Router();
var includesController = require('../controllers/includesController');

//send create new variant notice
router.get('/send-new-variant-notice',includesController.sendNewVariantNotice);


//send delete notice
router.get('/send-delete-item-notice',includesController.sendDeleteNotice);
module.exports = router;

//send new item form
router.get('/send-new-item-form',includesController.sendNewItemForm);
