define(['jquery', 'underscore', 'backbone', 'app/collections/customers'], function($, _, Backbone) {
  BaseViewForm = Backbone.View.extend({
    getValues: function() { return {}; },
    validateForm: function() { return []; },
  })
});
