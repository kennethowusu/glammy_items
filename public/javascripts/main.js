var about;
var how_to_use;
var ingredients;
var item_id = $('#item_id').val();
var variant_id = $('#variant_id').val();
var image =  document.getElementById('image');

// var image = document.getElementById('image');

ClassicEditor.create(document.querySelector('#about')).then(editor => {
  about = editor;
}).catch(error => {
  console.error(error);
});

ClassicEditor.create(document.querySelector('#how_to_use')).then(editor => {
  how_to_use = editor;
}).catch(error => {
  console.error(error);
});

ClassicEditor.create(document.querySelector('#ingredients')).then(editor => {
  ingredients = editor;
}).catch(error => {
  console.error(error);
});

//update item description about
$('div,p').on('focusout', (e) => {
  if ($(e.target).parents().is('#about-field')) {
    updateDescription();
  }
})

$('div,p').on('focusout', (e) => {
  if ($(e.target).parents().is('#ingredients-field')) {
    updateIngredients();
  }
})


$('div,p').on('focusout', (e) => {
  if ($(e.target).parents().is('#how_to_use-field')) {
    updateHow_to_use();
  }
})

//update description
const updateDescription = () => {
  let url = `/items/${item_id}/descriptions/about`;
  let data = {
    about: about.getData()
  };
  showSaving();
  $.ajax({url: url, type: "put", data: data}).done(() => {
    showSaved();
  })
}
//update ingredients
const updateIngredients = () => {
  let url = `/items/${item_id}/descriptions/ingredients`;
  let data = {
    ingredients: ingredients.getData()
  };
  showSaving();
  $.ajax({url: url, type: "put", data: data}).done(() => {
    showSaved();
  })
}

//update how to use
const updateHow_to_use = () => {
  let url = `/items/${item_id}/descriptions/how_to_use`;
  let data = {
    how_to_use: how_to_use.getData()
  };
  showSaving();
  $.ajax({url: url, type: "put", data: data}).done(() => {
    showSaved();
  })
}


//item update
 $('#name').change(()=>{
   updateItemName();
 })

 //item price
  $('#price').change(()=>{
    updateItemPrice();
  })
  //item original price
   $('#original_price').change(()=>{
     updateItemOriginalPrice();
   })

   // //item main_category
   // $('').change(()=>{
   //   updateItemMaincategory();
   // })

//update item name
const updateItemName = ()=>{
  showSaving();
  const url = `/items/${item_id}/name`;
  const data = {name:$('#name').val()};
  $.ajax({
    url:url,
    data:data,
    type:'put'
  }).done(()=>{
    showSaved();
  })
}

const updateItemPrice = ()=>{
  showSaving();
  const url = `/items/${item_id}/price`;
  const data = {price:$('#price').val()};
  $.ajax({
    url:url,
    data:data,
    type:'put'
  }).done(()=>{
    showSaved();
  })
}

const updateItemOriginalPrice = ()=>{
  showSaving();
  const url = `/items/${item_id}/original_price`;
  const data = {original_price:$('#original_price').val()};
  $.ajax({
    url:url,
    data:data,
    type:'put'
  }).done(()=>{
    showSaved();
  })
}

// const updateItemMaincategory = ()=>{}
//show notification

function showSaving() {
  $('.saving').show();
}
function showSaved() {
  $('.saving').hide();
  $('.saved').show();
  if ($('.saved').is(':visible')) {
    $('.saved').fadeOut(4000);
  }
}


//==================UPLOAD IMAGE ==================//

image.onchange = ()=>{
  var formdata = new FormData();
  var files = image.files;
  var file = files[0];
  formdata.append('image',file);

  if(image.dataset.type == 'parent'){
  updateItemImages(formdata,file.name);
   }else{
   updateVariantImages(formdata,file.name);
   }

}


 const updateItemImages = (formdata,file)=>{
   const url = `/items/${item_id}/descriptions/images`;
     var xhr = new XMLHttpRequest();
     xhr.open('put',url);
     xhr.onreadystatechange = function(){
       $('.image-upload-progress').css('display','flex');
       if(xhr.readyState == 4 && xhr.status == 200){
         $('.image-upload-progress').css('display','none');
         var result = xhr.responseText;
         appendItemImage(result);
         // // addImageToProduct(product_id,result.key);
         // var image = $('<div class="image-preview"> <div class="image-preview__img"><img src="'+result.location+'" alt="" class="control"></div><div class="image-preview__action"><input class="image_key" type="hidden" value="'+result.key+'"><input class="image_id" type="hidden" value="'+result.image_id+'"><button  type="button" class="image-preview__btn">Delete photo</button></div></div>');
         // $('.uploaded-photos').append(image);

       }
     }
     xhr.send(formdata);
 }

 const updateVariantImages = (formdata,file)=>{
   const url = `'/items/${item_id}/variants/${variant_id}/images`;
     var xhr = new XMLHttpRequest();
     xhr.open('put',url);
     xhr.onreadystatechange = function(){
       $('.image-upload-progress').css('display','flex');
       if(xhr.readyState == 4 && xhr.status == 200){
         $('.image-upload-progress').css('display','none');
         var result = xhr.responseText;
         appendItemImage(result);
         // // addImageToProduct(product_id,result.key);
         // var image = $('<div class="image-preview"> <div class="image-preview__img"><img src="'+result.location+'" alt="" class="control"></div><div class="image-preview__action"><input class="image_key" type="hidden" value="'+result.key+'"><input class="image_id" type="hidden" value="'+result.image_id+'"><button  type="button" class="image-preview__btn">Delete photo</button></div></div>');
         // $('.uploaded-photos').append(image);

       }
     }
     xhr.send(formdata);
 }


//append uploaded images to item descriptions
const appendItemImage = (image_key)=>{
  let html = `
    <div class="uploaded-image flex">
          <div class="uploaded-image__img__cont">
            <img src="https://s3.eu-west-2.amazonaws.com/glammycare/${image_key}" alt="" class="w-100 ">
          </div>
          <div class="flex align-items-center">
            <img src="/images/svg/cancel.svg" alt="" image_id="${image_key}" class="uploaded-image__cancel pointer">
            <p class="pointer">Delete</p>
          </div>
        </div>`;
    $('.image-upload').append(html);
}

//======================DELETE IMAGE ===========================//

$('.image-upload').on('click','.uploaded-image__cancel ',(e)=>{
  let image_id = $(e.target).attr('image_id');
  let domImage = $(e.target).parents('.uploaded-image');
  if($(e.target).parents().is('.item-uploaded-images')){
    deleteItemImage(image_id,domImage);
  }
})
const deleteItemImage = (image_id,domImage)=>{
  let url = `/items/${item_id}/descriptions/images`;
  let data = {image:image_id};
  $.ajax({
    type:'delete',
    url:url,
    data:data
  }).done(()=>{
     domImage.remove();
  })
}


//==================FOR ITEM VARIANT =======================//
//update variant name
$('#variant_name').change(()=>{

  updateVariantName();
})

//update variant color
$('#variant_color').change(()=>{
  updateVariantColor();
})
const updateVariantName = ()=>{
    showSaving();
  let name = $('#variant_name').val();
  let url  = `/items/${item_id}/variants/${variant_id}/name`;
  let data = {name:name};
  $.ajax({
    url : url,
    type:"put",
    data : data
  })
  .done(()=>{
    showSaved();
  })
}

const updateVariantColor = ()=>{
  showSaving();
  let color = $('#variant_color').val();
  let data = {color:color};
  let url  = `/items/${item_id}/variants/${variant_id}/color`;
  $.ajax({
    type:'put',
    url : url,
    data:data
  }).done(()=>{
    showSaved();
  })
}
