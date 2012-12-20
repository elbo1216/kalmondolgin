define(['jquery', 'underscore', 'backbone', 'app/models/property'], function($, _, Backbone) {
    PropertyList = Backbone.Collection.extend({
      model: Property,
      url: '/deals/get_properties',
    })
})
