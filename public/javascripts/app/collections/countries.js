define(['jquery', 'underscore', 'backbone', 'app/models/country'], function($, _, Backbone) {
    Countries = Backbone.Collection.extend({
      model: Country,
      url: '/deals/get_all_countries',
      optionList: function() {
        var optionList = new Array();
        for(var i=0; i<this.models.length; i++) {
          optionList.push("<option value='" + this.models[i].get('key') + "'>" + this.models[i].get('name') + "</option>");
        }
        return optionList;
      },
    })
})

