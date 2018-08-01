const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


//models
const Item = require('../models/item_model');
module.exports = {
  generateId: () => {
    return crypto.randomBytes(15).toString('hex');
  },
  generateItemNumber: ()=> {
    var itemNumber = Math.floor(Math.random() * 899999 + 100000);
    return itemNumber;
  }
}
