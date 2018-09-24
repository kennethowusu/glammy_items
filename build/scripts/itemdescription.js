var about;
var how_to_use;
var ingredients;
var item_id = $('#item_id').val();
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
