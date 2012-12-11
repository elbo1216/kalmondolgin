$(document).ready(function() {
  //Figure out which page we are on and highlight the link
  var controller = document.URL.split('/')[3];
  $('.main-nav li').each(function(index, li) {
    $(li).removeClass();
    if ($(li).attr('id') == controller) {
      $(li).addClass('nav-selected');
    }
  })
});
