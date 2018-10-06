$('.js-add-new-item').on('click',()=>{
  $('.js-new-item-overlay').fadeIn(300);
})

$('.js-new-item-cancel').on('click',()=>{
  $('.js-new-item-overlay').hide(300);
})


//==============CREATE NEW ITEM
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

$('body').on('click',function(){
  $.ajax({
    type:'get',
    url : '/includes/send-new-item-form'
  }).done(function(result){
    $('html').append(result);
  })

})
