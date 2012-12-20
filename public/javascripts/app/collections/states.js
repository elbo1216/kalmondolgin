define(['jquery', 'underscore', 'backbone', 'app/models/state'], function($, _, Backbone) {
  States = Backbone.Collection.extend({
    model: State,
    url: '/deals/get_states',
    optionList: function() {
      var optionList = new Array();
      for(var i=0; i<this.models.length; i++) {
        optionList.push("<option value='" + this.models[i].get('code') + "'>" + this.models[i].get('code') + "</option>");
      }
      return optionList;
    }
  })
});
