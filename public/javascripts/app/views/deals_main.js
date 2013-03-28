define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  $(document).ready(function() {
    var form = document.URL.split("/")[4];

    if (form == 'search') {
      $('.form-buttons').hide();
    }
  
    // Get selected subnav
    $('.sub-nav-deals li').each(function(index, li) {
      if ($(li).attr('id') == form) {
        $(li).addClass('subnav-selected');
      } else {
        $($(li).attr('class').split(' ')).each(function(index, clazz) {
          if (clazz == 'subnav-selected') {
            $(li).removeClass(clazz);
          }
        });
      }
    });
  
    if ($.inArray(form, ['sale', 'lease', 'appraisal', 'tax_protest']) > -1) {
      $('#new').addClass('subnav-selected');
      $('#' + form + ' span').addClass('subnav-selected');
      $('.new-deal-container').show();
      
    }
  });
})
