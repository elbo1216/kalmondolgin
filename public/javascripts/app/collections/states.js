define(['jquery', 'underscore', 'backbone', 'app/models/state'], function($, _, Backbone) {
  States = Backbone.Collection.extend({
    model: State,
    url: '/deals/get_states',
    stateCodeList: function() {
      var stateList = new Array();
      for(var i=0; i<this.models.length; i++) {
        stateList.push({'id': this.models[i].get('id'), 'name': this.models[i].get('name')});
      }
      return stateList;
    }
  })
});
