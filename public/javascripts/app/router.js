define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'dashboard': 'dashboard',
      'deals': 'deals'
    },

  });

  var initialize = function() {
    var router = new AppRouter();
  };

  return {
    initialize: initialize
  };
});
