define(['jquery', 'underscore', 'backbone', 'app/router', 'app/views/sidebar'], function($, _, Backbone, AppRouter) {
  var initialize = function () {
    $(document).ready(function() {
      //Backbone stuff
      AppRouter.initialize();
      Backbone.history.start();

      var sidebar = new SidebarView();
      sidebar.initialize();
    });
  };

  return {
    initialize: initialize
  };
});
