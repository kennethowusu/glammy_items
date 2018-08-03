
require('dotenv').config();

//require .env
//for amazon s3
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

//create new new s3 instance
module.exports.s3 = new aws.S3({
 apiVersion: '2006-03-01',
 endpoint:'https://s3.eu-west-2.amazonaws.com/',
 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
 secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
 region:'eu-west-2'
})



  module.exports.upload = multer({
      storage: multerS3({
        s3: module.exports.s3,
        bucket: process.env.S3_BUCKET,
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null,Date.now()+file.originalname);
        }
      })
    }).single('image');
