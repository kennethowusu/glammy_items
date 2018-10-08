var express = require('express');
var router = express.Router();
var includesController = require('../controllers/includesController');


//send create new variant notice
router.get('/send-new-variant-notice',includesController.isAjaxRequest,includesController.sendNewVariantNotice);


//send delete notice
router.get('/send-delete-item-notice',includesController.isAjaxRequest,includesController.sendDeleteNotice);
module.exports = router;

//send new item form
router.get('/send-new-item-form',includesController.isAjaxRequest,includesController.sendNewItemForm);

//send variant delete notice
router.get('/send-delete-variant-notice',includesController.isAjaxRequest,includesController.sendVariantDeleteNotice);
