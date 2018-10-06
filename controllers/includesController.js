

module.exports.sendNewVariantNotice = (req,res,next)=>{
return res.render('includes/newVariantNotice');
}


module.exports.sendDeleteNotice = (req,res,next)=>{
 return res.render('includes/deleteItemNotice');
}

module.exports.sendNewItemForm = (req,res,next)=>{
  return  res.render('includes/newItemForm');
}
