define(['jquery', 'underscore', 'backbone', 'app/models/customer'], function($, _, Backbone) {
    CustomerList = Backbone.Collection.extend({
      model: Customer,
      url: '/deals/get_customers',
    })
})
