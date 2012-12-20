define(['jquery', 'underscore', 'backbone', 'models/customer'], function($, _, Backbone) {
  var sale = Backbone.Model.extend({
    urlRoot: 'deals/create_sale',
  })
});
