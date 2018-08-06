
$('.js-header--img__humburger').on 'click',->
  $('.js-navbar__overlay').addClass 'navbar__overlay--isvisible'
  $('body').addClass 'hide-content'


$('.js-navbar__overlay').on 'click',(e)->
 clicked = $ e.target
 if clicked.is('.js-navbar') || clicked.parents().is('.js-navbar')

 else
   $('.js-navbar__overlay').removeClass 'navbar__overlay--isvisible'
   $('body').removeClass 'hide-content'
