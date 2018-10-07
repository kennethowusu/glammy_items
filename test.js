
    //=============get item images file names in array=======//
    Image.findAll({where:{item_id:item_id}})
      .then((itemImages)=>{

       //========convert item images to array if length of items > 0=====//
       const images = [];
       if(itemImages.length > 0){
         itemImages.forEach((itemimages)=>{
           images.push(itemimages.image);
         });


         //===========convert images array to a format for s3 ===============//
         const imagesArray = [];
          images.forEach(function(image){
            imagesArray.push({"Key":image});
          });

          //==========params for s3==================//
         var params = {
                         Bucket: process.env.S3_BUCKET,
                         Delete: {
                           Objects: imagesArray
                         }
                      };

         //============delete images from amazon s3===========//
         s3func.s3.deleteObjects(params, function(err, data){
            if(err){return res.send("here is the error")}
            else{
              //=========delete item images in db============//
              Image.destroy({where:{item_id:item_id}});
            }

           })//s3func.s3


      }//if statement of item images
