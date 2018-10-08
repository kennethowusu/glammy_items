




//=============RESUABLE FUNCTIONS============================//
//get Html
var getHtml = (selector,url,callback=null)=>{
  $(selector).on('click',function(e){
    if($(e.target).attr('type') == 'link'){
      e.preventDefault();
    }
    $.ajax({
      type:'get',
      url : url
    }).done(function(result){
      $('html').append(result);
      if(callback){
        callback(e);
      }
    })
  })
}

//remove Html
var removeHtml = (selector,dom)=>{
  $('html').on('click',selector,()=>{
    $(dom).remove();
  })
}

//show new variant loader
var showNewVariantLoader = ()=>{
    $('.new-variant-loader-cont').css('display','inline-block');
}

var showItemDeleteLoader = ()=>{
  $('.delete-note-loader-cont').css('display','inline-block');
}
//==============CREATE NEW ITEM================================//

  getHtml('.js-add-new-item','/includes/send-new-item-form');


  removeHtml('.js-new-item-cancel','.js-new-item-overlay');

//process new item creation
$('html').on('click','.js-new-item-button-create',(e)=>{
  let data = $("#new-item-form").serialize();
  $(e.target).css('opacity','0.8');
  $('.new-item-loader-cont').css("display",'inline-block');


  $.ajax({
    type: "post",
    url : '/items',
    data : data
  }).done((result)=>{
    if(result.created == "yes"){
      window.location.href = `${result.descriptionUrl}`;
    }

  })
})

//==================DELETE ITEM==============================//
var insertItemIdinDeleteNotice = (e)=>{
  let itemId = $(e.target).attr('item_id');
  let itemName = $(e.target).attr('item_name');
  $('input[name=item_id]').val(itemId);
  $('.item-delete-name').html(itemName);

}
//get delete item notice
getHtml('.js-delete-item-link','/includes/send-delete-item-notice',insertItemIdinDeleteNotice);

//remove delete item notice from dom
removeHtml('.js-delete-item-cancel-btn','.delete-note-overlay');

//handle item delete process
$('html').on('click','.js-delete-item-btn',(e)=>{
  showNewVariantLoader();
  let btn = $(e.target);
  let itemId = btn.prev().val();
  let url = `/items/${itemId}`;
  $.ajax({
    type : 'delete',
    url  : url
  }).done((result)=>{
    if(result.isDeleted == 1){
      btn.parents('.delete-note-overlay').remove();
      $('.item-grid.'+itemId).remove();
      $('.items-count-num').html($('.items-count-num').html() - 1);
    }
  })
})
//=================CREATE NEW VARIANT=========================//

var insertVariantItemId = (e)=>{
  let itemId = $(e.target).attr('item_id');
  let itemName = $(e.target).attr('item_name');
  $('input[name=item_id]').val(itemId);
  $('.new-variant-item-name').html(itemName);
}
//get new variant notice
getHtml('.js-new-variant-btn','/includes/send-new-variant-notice',insertVariantItemId);

//remove new variant notice
removeHtml('.new-variant-cancel-btn','.new-variant-overlay');

//handle variant creation process
$('html').on('click','.new-variant-create-btn',(e)=>{
  showNewVariantLoader();
  let btn = $(e.target);
  let itemId = btn.prev().val();
  let url = `/items/${itemId}/variants`
  $.ajax({
    type : 'post',
    url  : url
  }).done((result)=>{
    if(result.created == 'yes'){
      window.location.href = result.redirectUrl;
    }
  })
})

//============================DELETE VARIANT NOTICE===========================//

 var insertVariantIdInDeleteNotice = (e)=>{
   let itemId    = $(e.target).attr('item_id');
   let variantId = $(e.target).attr('variant_id');
   let variantName = $(e.target).attr('variant_name');
   $('input[name=item_id]').val(itemId);
   $('input[variant_id]').val(variantId);
   $('.variant-delete-name').html(variantName);
 }

 $('html').on('click','.js-delete-variant-btn',(e)=>{
   showNewVariantLoader();
   let btn = $(e.target);
   let variantId = btn.prevAll('input[variant_id]').val();
   let itemId = btn.prev().val();
   let url = `/items/${itemId}/variants/${variantId}`;
   $.ajax({
     type : 'delete',
     url  : url
   }).done((result)=>{
     if(result.isDeleted == 1){
       btn.parents('.delete-note-overlay').remove();
       $('.item-grid.'+variantId).remove();
       $('.items-count-num').html($('.items-count-num').html() - 1);
     }
   })
 })
 //get variant delete html
 getHtml('.delete-variant-link','/includes/send-delete-variant-notice',insertVariantIdInDeleteNotice);
