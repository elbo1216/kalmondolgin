define(['jquery', 'underscore', 'backbone', 'app/models/country'], function($, _, Backbone) {
    Countries = Backbone.Collection.extend({
      model: Country,
      url: '/deals/get_all_countries',
      countryList: function() {
        var list = new Array();
        for(var i=0; i<this.models.length; i++) {
          list.push({'id': this.models[i].get('id'), 'name': this.models[i].get('name')});
        }
        return list;
      },
    })
})

