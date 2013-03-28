define(['jquery', 'underscore', 'backbone', 'app/router'], function($, _, Backbone, AppRouter) {
  var initialize = function () {
    $(document).ready(function() {
      //Figure out which page we are on and highlight the link
      var controller = document.URL.split('/')[3];
      $('.main-nav li').each(function(index, li) {
        if ($(li).attr('id') == controller) {
          $(li).addClass('nav-selected');
        } else {
          $(li).removeClass();
        }
      })
    
      //Backbone stuff
      AppRouter.initialize();
      Backbone.history.start();
    });
  };

  return {
    initialize: initialize
  };
});
