define(['jquery', 'underscore', 'backbone', 'app/models/broker'], function($, _, Backbone) {
    Brokers = Backbone.Collection.extend({
      model: Broker,
      url: '/deals/get_all_brokers',
      optionList: function() {
        var optionList = new Array();
        for(var i=0; i<this.models.length; i++) {
          optionList.push("<option value='" + this.models[i].get('id') + "'>" + this.models[i].get('name') + "</option>");
        }
        return optionList;
      },
    })
})

